import { PrismaClient } from '@prisma/client'
import { Command } from 'commander'

const prisma = new PrismaClient()
const command = new Command()

command
  .name('add')
  .description('Add a new task')
  .argument('<title>', 'Task title')
  .option('-d, --due <dueDate>', 'Due date (YYYY-MM-DD)')
  .option('--category <category>', 'Task category')
  .option('--goal <goal>', 'Task goal')
  .option('--project <project>', 'Task project')
  .option('--type <type>', 'Task type') // Added the --type option
  .action(async (title, options) => {
    if (options.due) {
      const dueDate = new Date(options.due)

      if (isNaN(dueDate.getTime())) {
        command.error('Invalid date format. Please use YYYY-MM-DD.')
      }
    }

    const dueDate = options.due ? new Date(options.due) : null
    const category = options.category ?? null
    const goal = options.goal ?? null
    const project = options.project ?? null
    const type = options.type ?? null // Added type variable
    await prisma.task.create({
      data: { title, dueDate, category, goal, project, type }, // Included type in the data object
    })

    console.log(`Task added: ${title}`)
    await prisma.$disconnect()
  })

export default command
