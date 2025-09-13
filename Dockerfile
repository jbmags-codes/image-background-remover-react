# Stage 1: Build the Vite React app
FROM node:22.19.0-alpine AS build

WORKDIR /app

# Copy package manifests first for caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the project
COPY . .

# Build the app for production
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:1.29.1-alpine AS runtime

# Clean out default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy built static files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
