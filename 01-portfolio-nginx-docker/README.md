# Muhammad Umar Raza — DevOps Portfolio

A fast, single-page portfolio website for a DevOps & Cloud Infrastructure Engineer.
Pure HTML + CSS with an inline SVG architecture diagram — no frameworks, no build step,
no external images. Served by **Nginx**, deployable **manually** or as a **Docker container**.

![Nginx](https://img.shields.io/badge/Nginx-009639?logo=nginx&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

---

## Project structure

```
01-portfolio-nginx-docker/
├── index.html      # Page content: hero, skills, experience, projects, certifications, contact
├── styles.css      # Dark theme, responsive layout, terminal-style components
├── Dockerfile      # Container image based on nginx:alpine
├── .dockerignore   # Files excluded from the Docker build
└── README.md       # This guide
```

---

## Option 1 — Run locally (no server)

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

---

## Option 2 — Manual deployment with Nginx (Debian / Ubuntu)

```bash
# 1. Install Nginx and Git
sudo apt update
sudo apt install -y nginx git

# 2. Get the code
git clone https://github.com/umaraza/devops-projects.git
sudo mkdir -p /var/www/umar-portfolio
sudo cp devops-projects/01-portfolio-nginx-docker/index.html devops-projects/01-portfolio-nginx-docker/styles.css /var/www/umar-portfolio/
sudo chown -R www-data:www-data /var/www/umar-portfolio

# 3. Create the Nginx site
sudo tee /etc/nginx/sites-available/umar-portfolio > /dev/null <<'NGINX'
server {
    listen 80;
    listen [::]:80;
    server_name _;
    root /var/www/umar-portfolio;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
NGINX

# 4. Enable it and reload Nginx
sudo ln -s /etc/nginx/sites-available/umar-portfolio /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

Open `http://SERVER_IP`.

**Update later:**

```bash
cd devops-projects/01-portfolio-nginx-docker && git pull
sudo cp index.html styles.css /var/www/umar-portfolio/
```

---

## Option 3 — Docker deployment

```bash
git clone https://github.com/umaraza/devops-projects.git
cd devops-projects/01-portfolio-nginx-docker

# Build the image
docker build -t umar-portfolio:1.0 .

# Run the container (host port 8090 -> container port 80)
docker run -d --name umar-portfolio --restart unless-stopped -p 8090:80 umar-portfolio:1.0

# Verify
docker ps                      # STATUS should show (healthy)
curl -I http://localhost:8090  # HTTP/1.1 200 OK
```

Open `http://SERVER_IP:8090`.

**Update later:**

```bash
git pull
docker build -t umar-portfolio:1.1 .
docker rm -f umar-portfolio
docker run -d --name umar-portfolio --restart unless-stopped -p 8090:80 umar-portfolio:1.1
```

**Move the image to another machine without a registry:**

```bash
docker save umar-portfolio:1.0 | gzip > umar-portfolio-1.0.tar.gz   # on the source machine
docker load -i umar-portfolio-1.0.tar.gz                            # on the target machine
```

---

## Useful commands

| Task | Command |
|---|---|
| Container logs | `docker logs -f umar-portfolio` |
| Shell inside container | `docker exec -it umar-portfolio sh` |
| Test Nginx config (manual) | `sudo nginx -t` |
| Nginx error log (manual) | `sudo tail -f /var/log/nginx/error.log` |

## Troubleshooting

| Problem | Fix |
|---|---|
| `bind: address already in use` | Port is taken — use another, e.g. `-p 8091:80` |
| Page loads but no styling | Make sure `styles.css` is in the same folder as `index.html` |
| Can't reach the site from another PC | Open the port in the firewall / cloud security group |
| `403 Forbidden` (manual) | `sudo chown -R www-data:www-data /var/www/umar-portfolio` |

---

## Contact

- Email: m.umaraza@gmail.com
- LinkedIn: [muhammad-umar-raza-devops](https://linkedin.com/in/muhammad-umar-raza-devops)
