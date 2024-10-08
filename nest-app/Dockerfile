# Stage 1: Build the application
FROM node:22-bookworm AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Create the production image
FROM node:22-bookworm

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev && npm cache clean --force

# Copy the build output from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the desired port (adjust if necessary)
EXPOSE 8080

# Command to start the application
CMD ["node", "dist/main.js"]
