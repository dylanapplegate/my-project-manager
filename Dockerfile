# Use the official Node.js image as the base image
FROM node:23-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install --omit=optional

# Copy the rest of the application code into the container
COPY . .

# Define the command to run your application
CMD ["node", "src/cli.ts"]
