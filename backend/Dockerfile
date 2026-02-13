FROM oven/bun:1
WORKDIR /app
COPY . .
RUN bun install
EXPOSE 3005
CMD ["bun", "index.ts"]