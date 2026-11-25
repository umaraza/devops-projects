FROM nginx:alpine
COPY index.html styles.css /usr/share/nginx/html/
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
