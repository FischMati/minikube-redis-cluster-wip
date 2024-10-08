# Usa la imagen base de Microsoft DevContainers basada en Bullseye
FROM mcr.microsoft.com/devcontainers/base:bullseye

# Instala Nginx y otras dependencias necesarias
RUN apt-get update && \
  apt-get install -y nginx && \
  apt-get install -y redis-tools && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
  apt-get install -y nodejs && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*


RUN npm install -g typescript
RUN npm install -g @nestjs/cli
RUN npm install -g pnpm

# Copia la configuración de Nginx (puedes personalizarla si lo necesitas)
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 8080 para que Nginx escuche en este puerto
EXPOSE 8080

# Arranca Nginx en modo demonio
CMD ["nginx", "-g", "daemon off;"]