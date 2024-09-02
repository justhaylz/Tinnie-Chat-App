# Backend
FROM node:14-alpine AS backend
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
EXPOSE 5000
CMD ["node", "server.js"]

# Frontend
FROM node:14-alpine AS frontend
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Final stage
FROM nginx:alpine
COPY --from=frontend /app/build /usr/share/nginx/html
COPY --from=backend /app /app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]