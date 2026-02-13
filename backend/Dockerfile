# 1. Use the official Bun image
FROM oven/bun:1

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy all files from your 'backend' folder into the container
COPY . .

# 4. Install dependencies
RUN bun install

# 5. Open the port (Render needs this)
EXPOSE 3005

# 6. Start the server
# Since your 'index.ts' is in the root of the backend folder, we use this:
CMD ["bun", "index.ts"]