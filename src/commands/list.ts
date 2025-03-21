import { PrismaClient } from '@prisma/client'
import { Command } from 'commander'

const prisma = new PrismaClient()
const command = new Command()

command
  .name('list')
  .description('List tasks')
  .option('--completed', 'Show completed tasks')
  .option('--category <category>', 'Filter by category')
  .option('--goal <goal>', 'Filter by goal')
  .option('--project <project>', 'Filter by project')
  .action(async (options) => {
    const filter: {
      status: string
      category?: string
      goal?: string
      project?: string
    } = {
      status: options.completed ? 'completed' : 'pending',
    }

    if (options.category) filter.category = options.category
    if (options.goal) filter.goal = options.goal
    if (options.project) filter.project = options.project

    const tasks = await prisma.task.findMany({ where: filter })

    console.log(tasks.map((task) => `${task.id}: ${task.title} [${task.status}]`).join('\n'))
    await prisma.$disconnect()
  })

export default command
