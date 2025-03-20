# Getting Started

## Prerequisites

- Docker
- Docker Compose

## Running the application

1.  Clone the repository
2.  Navigate to the project directory: `cd /Users/dylanapplegate/Development/my-project-manager`
3.  Run the application using Docker Compose: `docker-compose up -d`

## Prisma Setup

This project uses Prisma for managing your database schema and migrations. Follow these key steps to work with Prisma:

1. **Generate the Prisma Client**

   Ensure your Prisma client is generated and up-to-date with your schema. The client is configured to be generated at `src/db/`.

   ```bash
   deno task generate
   ```

2. **Run Migrations**

   Apply any pending migrations to your PostgreSQL database with:

   ```bash
   deno task migrate
   ```

3. **Launch Prisma Studio**

   For a visual interface to inspect and manage your database, run:

   ```bash
   deno task studio
   ```

> **Note:** Make sure your Docker containers (especially the PostgreSQL container) are running before executing these commands.
