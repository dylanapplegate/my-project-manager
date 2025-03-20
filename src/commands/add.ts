import { PrismaClient } from '@prisma/client'
import { Command } from 'commander'

const prisma = new PrismaClient()
const command = new Command()

command
  .name('add')
  .description('Add a new task')
  .argument('<title>', 'Task title')
  .option('-d, --due <dueDate>', 'Due date (YYYY-MM-DD)')
  .action(async (title, options) => {
    const dueDate = options.due ? new Date(options.due) : null
    await prisma.task.create({
      data: { title, dueDate },
    })
    console.log(`Task added: ${title}`)
    await prisma.$disconnect()
  })

export default command
