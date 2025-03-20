import { PrismaClient } from '@prisma/client'
import { Command } from 'commander'

const prisma = new PrismaClient()
const command = new Command()

command
  .name('list')
  .description('List tasks')
  .option('--completed', 'Show completed tasks')
  .action(async (options) => {
    const filter = options.completed ? { status: 'completed' } : { status: 'pending' }
    const tasks = await prisma.task.findMany({ where: filter })

    console.log(tasks.map((task) => `${task.id}: ${task.title} [${task.status}]`).join('\n'))
    await prisma.$disconnect()
  })

export default command
