# Use the official Deno image from Docker Hub
FROM denoland/deno:2.2.4

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files first to leverage Docker cache
COPY deno.json deno.lock ./

# Pre-cache dependencies (adjust the entry file as needed)
RUN deno cache src/cli.ts

# Copy the rest of the application code
COPY . .

# Set necessary permissions: --allow-net for network access, --allow-read for file access, --allow-env for environment variables
CMD ["run", "--allow-net", "--allow-read", "--allow-env", "src/cli.ts"]