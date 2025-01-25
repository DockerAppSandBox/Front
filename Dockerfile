FROM node:20.10.0-alpine AS builder 

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --frozen-lockfile

COPY . .

RUN npm run lint --if-present

RUN npm run build

RUN rm -rf node_modules src .git .next/cache

FROM node:20.10.0-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.next .next
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/package-lock.json package-lock.json
COPY --from=builder /app/public public

ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=http://172.28.0.2:8080

RUN npm ci --frozen-lockfile 
RUN npm cache clean --force

EXPOSE 3000

CMD ["npx", "next", "start"]