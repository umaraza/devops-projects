# DevOps Projects

Hands-on DevOps projects: Linux, Nginx, Docker, CI/CD, AWS, Terraform, Ansible and Kubernetes —
each with source code, a Dockerfile and a step-by-step deployment guide.

**Author:** Muhammad Umar Raza — DevOps & Cloud Infrastructure Engineer
[LinkedIn](https://linkedin.com/in/muhammad-umar-raza-devops) · m.umaraza@gmail.com

---

## Projects

| # | Project | Stack | Deployment |
|---|---|---|---|
| 01 | [Portfolio — Nginx & Docker](01-portfolio-nginx-docker/) | HTML, CSS, Nginx | Manual Nginx · Docker (`nginx:alpine`) |
| 02 | [Laravel Jobs Portal — single Docker container](02-laravel-jobs-portal-docker/) | Laravel 9, PHP 8.5, SQLite, Nginx, PHP-FPM | Docker single container (`php:8.5-fpm-alpine`) |
| 03 | [3D Portfolio — React, Three.js & Docker overlay build](03-3d-portfolio-react-docker/) | React, Three.js, Vite, Nginx | Multi-stage Docker (`node:22-alpine` → `nginx:alpine`) |

More projects coming soon.

---

## How to use this repository

```bash
git clone https://github.com/umaraza/devops-projects.git
cd devops-projects/<project-folder>
```

Each project folder has its own `README.md` with full deployment steps.

