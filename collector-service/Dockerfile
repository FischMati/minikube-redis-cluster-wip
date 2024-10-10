# Stage 1: Build the application
FROM node:22-bookworm AS builder

RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN pnpm run build

# Stage 2: Create the production image
FROM node:22-bookworm

RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --prod && pnpm store prune

# Copy the build output from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the desired port (adjust if necessary)
EXPOSE 8080

# Command to start the application
CMD ["node", "dist/main.js"]
