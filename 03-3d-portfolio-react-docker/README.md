# 3D Developer Portfolio — React, Three.js & Docker (Overlay Build)

A 3D animated developer portfolio — rotating desktop model, floating 3D skill balls, animated
timeline and a 3D Earth — customized for a DevOps engineer and delivered as a
**multi-stage Docker image** served by Nginx.

This project uses the **overlay pattern**: the repository contains only *my* customizations.
The Docker build clones the original open-source project from GitHub, applies the overlay on top,
builds it, and ships only the static result in a small Nginx image.

> **Credit:** Original 3D portfolio by
> [adrianhajdin/project_3D_developer_portfolio](https://github.com/adrianhajdin/project_3D_developer_portfolio)
> (JavaScript Mastery). Its source code is **not** copied into this repository — it is fetched
> at build time. Customization, overlay build and deployment by **Muhammad Umar Raza**.
> Skill icons from [Devicon](https://devicon.dev).

![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?logo=threedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?logo=nginx&logoColor=white)

---

## How the build works

```
 Stage 1: node:22-alpine                                Stage 2: nginx:alpine
┌──────────────────────────────────────────────┐       ┌──────────────────────────┐
│ 1. git clone upstream repo (GitHub)           │       │                          │
│ 2. npm install                                │       │  /usr/share/nginx/html   │
│ 3. COPY overlay/  → replaces content & images │ dist/ │  (static site only)      │
│ 4. node customize.mjs → edits name/hero/about │ ────► │                          │
│ 5. npm run build  (Vite)                      │       │  Port 80, health check   │
└──────────────────────────────────────────────┘       └──────────────────────────┘
        ~1 GB of build tools — thrown away                 final image ≈ 95 MB
```

`customize.mjs` **fails the build** if any expected text is missing, so an upstream change
can never silently produce the wrong site.

## Project structure

```
03-3d-portfolio-react-docker/
├── Dockerfile          # Multi-stage build: clone upstream → overlay → build → Nginx
├── nginx.conf          # SPA routing, gzip, 30-day caching for assets and 3D models
├── customize.mjs       # Text edits: name, hero, about, contact, page title
├── .dockerignore
└── overlay/            # Files copied over the upstream source
    ├── public/logo.svg
    └── src/
        ├── constants/index.js          # Skills, experience, projects
        └── assets/
            ├── logo.svg                # "UR" logo
            ├── tech/*.png              # 13 DevOps skill icons
            └── projects/*.svg          # 4 project cover images
```

---

## Build and run

```bash
git clone https://github.com/umaraza/devops-projects.git
cd devops-projects/03-3d-portfolio-react-docker

# Build (needs internet access to GitHub and npm)
docker build -t portfolio-3d:2.0 .

# Run (host port 3001 -> container port 80)
docker run -d --name portfolio-3d --restart unless-stopped -p 3001:80 portfolio-3d:2.0

# Verify
docker ps --filter name=portfolio-3d   # STATUS should show (healthy)
curl -I http://localhost:3001          # HTTP/1.1 200 OK
```

Open `http://SERVER_IP:3001`.

See the customization results during the build:

```bash
docker build --progress=plain -t portfolio-3d:2.0 . 2>&1 | grep -E "OK |MISS|customizations"
```

## Customize it for yourself

1. Edit `overlay/src/constants/index.js` — your skills, jobs and projects.
2. Replace icons in `overlay/src/assets/tech/` and covers in `overlay/src/assets/projects/`.
3. Edit the text replacements in `customize.mjs` — your name, hero line and about text.
4. Rebuild with a new tag and replace the container:

```bash
docker build -t portfolio-3d:2.1 .
docker rm -f portfolio-3d
docker run -d --name portfolio-3d --restart unless-stopped -p 3001:80 portfolio-3d:2.1
```

## Reproducible builds — pin the upstream version

By default the build uses the upstream `main` branch. To lock it to an exact commit:

```bash
docker build --build-arg UPSTREAM_REF=<branch-or-tag> -t portfolio-3d:2.0 .
```

## Move the image to another machine (no registry)

```bash
docker save portfolio-3d:2.0 | gzip > portfolio-3d-2.0.tar.gz   # source machine
docker load -i portfolio-3d-2.0.tar.gz                          # target machine
docker run -d --name portfolio-3d --restart unless-stopped -p 3001:80 portfolio-3d:2.0
```

---

## Troubleshooting

| Problem | Cause / Fix |
|---|---|
| Build stops with `MISS ...` | Upstream code changed — update the matching pattern in `customize.mjs` |
| `JavaScript heap out of memory` | Small server — add swap (`fallocate -l 2G /swapfile`…) or build on a bigger machine |
| `npm ERR! ERESOLVE` | The Dockerfile already uses `--legacy-peer-deps`; check you didn't remove it |
| Some 3D skill balls are blank | Browsers allow ~16 WebGL canvases per page — keep 12 or fewer skills |
| Page stays black on first load | Large 3D models are still downloading — wait, or check the network speed |
| Container shows `unhealthy` | Check `docker logs portfolio-3d`; the health check uses `127.0.0.1` inside the container |

## Useful commands

| Task | Command |
|---|---|
| Logs | `docker logs -f portfolio-3d` |
| Shell inside container | `docker exec -it portfolio-3d sh` |
| Image size | `docker images portfolio-3d` |
| Stop / start | `docker stop portfolio-3d` / `docker start portfolio-3d` |
