# ---- builder ----
FROM node:18-alpine AS builder
WORKDIR /app

# Install deps based on lockfile (faster/consistent)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ---- runner ----
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

# Copy package.json so node knows deps (optional but keeps sincle layer)
COPY package*.json ./
# Copy only what runtime needs: node_modules, .next, public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 8080
CMD ["node_modules/.bin/next", "start", "-p", "8080"]
