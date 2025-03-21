# Use the official Node.js image as the base image
FROM node:23.10.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the prisma code into the container
COPY prisma prisma

# # Install dependencies
# RUN npm install --omit=optional

# Run npx prisma migrate dev as the default command
CMD ["npx", "prisma", "migrate", "dev"]
