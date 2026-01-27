# Use the official Bun image
FROM oven/bun:1

# Set up the folder
WORKDIR /app

# Copy files and install dependencies
COPY . .
RUN bun install

# Open the port Render needs
EXPOSE 3000

# Start the server
CMD ["bun", "run", "src/index.ts"]