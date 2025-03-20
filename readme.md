# Getting Started

## Prerequisites

- Docker
- Docker Compose

## Running the application

1.  Clone the repository
2.  Navigate to the project directory: `cd /Users/dylanapplegate/Development/my-project-manager`
3.  Run the application using Docker Compose: `docker-compose up -d`

## Prisma

### Running Prisma tasks

1.  Make sure the docker containers are running
2.  Execute Prisma commands using Docker Compose:

    \`\`\`bash
    docker-compose exec -T app npx prisma migrate dev
    docker-compose exec -T app npx prisma studio
    \`\`\`
