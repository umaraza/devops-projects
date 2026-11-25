# ---------- Stage 1: get upstream code, apply overlay, build ----------
FROM node:22-alpine AS build
RUN apk add --no-cache git
ARG UPSTREAM_REPO=https://github.com/adrianhajdin/project_3D_developer_portfolio.git
ARG UPSTREAM_REF=main
WORKDIR /app
RUN git clone --depth 1 --branch ${UPSTREAM_REF} ${UPSTREAM_REPO} .
RUN npm install --legacy-peer-deps
COPY overlay/ ./
COPY customize.mjs ./
RUN node customize.mjs
ENV NODE_OPTIONS=--max-old-space-size=2048
RUN npm run build

# ---------- Stage 2: serve the built site with Nginx ----------
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
