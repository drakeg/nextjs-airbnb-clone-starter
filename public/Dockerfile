FROM node:24-bookworm-slim AS deps
WORKDIR /app
RUN corepack enable
ARG DATABASE_URL=postgresql://roost:roost@localhost:5432/roost
ENV DATABASE_URL=${DATABASE_URL}
COPY package.json yarn.lock ./
COPY prisma ./prisma
COPY prisma7.config.ts ./
RUN yarn install --frozen-lockfile

FROM node:24-bookworm-slim AS builder
WORKDIR /app
RUN corepack enable
ARG DATABASE_URL=postgresql://roost:roost@localhost:5432/roost
ENV DATABASE_URL=${DATABASE_URL}
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn prisma:generate
RUN yarn build

FROM node:24-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
RUN corepack enable
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma7.config.ts ./prisma7.config.ts
EXPOSE 3000
CMD ["sh", "-c", "yarn db:deploy && yarn start"]
