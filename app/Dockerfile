# Usa la imagen base de Node.js
FROM node:22-bookworm

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm ci && npm cache clean --force

# Copia el resto de la aplicación
COPY . .

# Compila el código TypeScript
RUN npm run build

# Exponer el puerto 8080 para que la app escuche
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["node", "index.js"]