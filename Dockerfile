# syntax=docker/dockerfile:1

############################
# 1 — Build Stage
############################
FROM node:20.18.0-alpine AS build
ENV NODE_ENV=production

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source
COPY . .

# Build Vite app
RUN npm run build


############################
# 2 — Production Stage
############################
FROM nginx:stable-alpine AS production

# Copy Vite build output to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: custom nginx config (SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf
