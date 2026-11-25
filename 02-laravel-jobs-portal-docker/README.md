# Laravel Jobs Portal — Single Docker Container

A job listings web app (Laravel 9) packaged as **one self-contained Docker container**:
Nginx + PHP-FPM 8.5 on Alpine Linux, with an embedded **SQLite** database and pre-seeded demo data.
No Docker Compose, no external database — build the image, run one container, done.

> **Credit:** Application code is based on
> [faisikhan/jobs-portal-laravel](https://github.com/faisikhan/jobs-portal-laravel) (MIT license).
> Containerization, PHP 8.5 compatibility fixes and deployment guide by **Muhammad Umar Raza**.

![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel_9-FF2D20?logo=laravel&logoColor=white)
![PHP](https://img.shields.io/badge/PHP_8.5-777BB4?logo=php&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?logo=nginx&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white)

---

## Architecture

```
┌──────────────── Docker container (php:8.5-fpm-alpine) ────────────────┐
│                                                                        │
│   Port 80 ──► Nginx ──► PHP-FPM (127.0.0.1:9000) ──► Laravel app       │
│                                                        │               │
│                                       /var/www/html/storage            │
│                                       ├── database.sqlite  (data)      │
│                                       └── app/public/logos (uploads)   │
└────────────────────────────────────────────────┬───────────────────────┘
                                                 │
                                    Docker named volume: jobs_storage
```

## DevOps files in this project

| File | Purpose |
|---|---|
| `Dockerfile` | Builds the image: installs Nginx, runs Composer, creates and seeds the SQLite DB, caches config/routes/views |
| `docker/nginx.conf` | Nginx site config — serves `public/` and passes PHP to PHP-FPM |
| `docker/start.sh` | Container entrypoint — starts PHP-FPM in the background and Nginx in the foreground |
| `.env.docker` | Production environment template (copied to `.env` during the build) |
| `.dockerignore` | Keeps `vendor/`, `.env`, logs and caches out of the build context |

## Changes made to the original app

- **SQLite instead of MySQL** — the whole app runs in a single container with no database server.
- **PHP 8.5 support** — `composer.lock` updated (`composer update -W`) because the original lock only allowed PHP < 8.2.
- **Composer advisory policy** — `config.policy.advisories.block: false` in `composer.json`, because Composer 2.10+ blocks end-of-life Laravel 9 releases that have security advisories.
- **Demo data seeded at build time** — the image starts with a demo user and sample listings.

---

## Deploy with Docker

```bash
# 1. Get the code
git clone https://github.com/umaraza/devops-projects.git
cd devops-projects/02-laravel-jobs-portal-docker

# 2. Build the image
docker build -t jobs-portal:1.0 .

# 3. Run one container (host port 8000 -> container port 80)
docker run -d --name jobs-portal --restart unless-stopped \
  -p 8000:80 \
  -v jobs_storage:/var/www/html/storage \
  jobs-portal:1.0

# 4. Verify
docker ps                      # STATUS should show (healthy)
curl -I http://localhost:8000  # HTTP/1.1 200 OK
```

Open `http://SERVER_IP:8000`.

**Demo login** — find the seeded user's email:

```bash
docker exec jobs-portal php artisan tinker --execute='echo App\Models\User::pluck("email");'
```

Password: `password` — or simply click **Register** to create your own account.

---

## Data persistence

The database and uploaded logos live in the **`jobs_storage`** Docker volume, so they survive
`docker rm`, image rebuilds and server reboots.

```bash
docker volume inspect jobs_storage                         # where the data is stored
docker rm -f jobs-portal && docker volume rm jobs_storage  # full reset to fresh demo data
```

## Move the image to another machine (no registry)

```bash
# Source machine
docker save jobs-portal:1.0 | gzip > jobs-portal-1.0.tar.gz

# Copy the file (scp / SFTP), then on the target machine
docker load -i jobs-portal-1.0.tar.gz
docker run -d --name jobs-portal --restart unless-stopped \
  -p 8000:80 -v jobs_storage:/var/www/html/storage jobs-portal:1.0
```

## Update after code changes

```bash
git pull
docker build -t jobs-portal:1.1 .
docker rm -f jobs-portal
docker run -d --name jobs-portal --restart unless-stopped \
  -p 8000:80 -v jobs_storage:/var/www/html/storage jobs-portal:1.1
```

---

## Useful commands

| Task | Command |
|---|---|
| Container logs | `docker logs -f jobs-portal` |
| Shell inside container | `docker exec -it jobs-portal sh` |
| Laravel error log | `docker exec jobs-portal tail -50 /var/www/html/storage/logs/laravel.log` |
| Run artisan | `docker exec jobs-portal php artisan <command>` |

## Troubleshooting

| Problem | Fix |
|---|---|
| `bind: address already in use` | Port 8000 is taken — use another, e.g. `-p 8001:80` |
| `Conflict. The container name "/jobs-portal" is already in use` | `docker rm -f jobs-portal`, then run again |
| `500 Server Error` | Check the Laravel error log (see above) |
| Uploaded logos don't show | Make sure you ran the container with `-v jobs_storage:/var/www/html/storage` |

## Security notes

This project is for **learning and demos**:

- Laravel 9 is end-of-life and has known security advisories — upgrade to a supported Laravel version for real production use.
- The `APP_KEY` is generated at build time and baked into the image. In production, pass secrets at runtime (`docker run --env-file`) and never commit `.env`.
