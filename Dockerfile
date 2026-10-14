# syntax=docker/dockerfile:1

# ---- Build: genera el sitio estático con Astro ----
FROM oven/bun:1.4 AS build
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

# URL pública final (canonical y Open Graph). Opcional.
ARG SITE_URL=""
ENV SITE_URL=$SITE_URL
RUN bun run build

# ---- Serve: nginx sirve /dist ----
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
	CMD wget -q --spider http://127.0.0.1/ || exit 1
