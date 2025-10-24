# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace configuration files (build context should be workspace root)
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.base.json ./

# Copy shared packages
COPY packages/ ./packages/

# Copy API project files  
COPY apps/api/ ./apps/api/

# Install all dependencies
RUN pnpm install

# Build the application
WORKDIR /app/apps/api
RUN pnpm build

# Production stage
FROM node:20-alpine AS runtime

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace configuration needed for production dependencies
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/pnpm-lock.yaml ./

# Copy shared packages (needed for @lidz/shared dependency)
COPY --from=builder /app/packages/ ./packages/

# Create apps directory structure
RUN mkdir -p ./apps/api

# Copy built application and package.json
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/

# Install only production dependencies for the workspace
RUN pnpm install --prod --frozen-lockfile

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

USER nestjs

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", "apps/api/dist/main.js"]