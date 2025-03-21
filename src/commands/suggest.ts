import { PrismaClient } from '@prisma/client'
import { Command } from 'commander'
import { getTaskSuggestion } from '../lmstudio'

const prisma = new PrismaClient()
const command = new Command()

command
  .name('suggest')
  .description('Get AI-generated task suggestions')
  .action(async () => {
    // Fetch the last 5 completed tasks
    const completedTasks = await prisma.task.findMany({
      where: { status: 'completed' },
      orderBy: { createdAt: 'desc' },
      take: 5,
    })
    const formattedCompleted =
      completedTasks
        .map(
          (task) =>
            `- ${task.title} [${task.category ?? 'No category'} / ${task.goal ?? 'No goal'} / ${task.project ?? 'No project'}]`,
        )
        .join('\n') || 'None'

    // Fetch pending tasks with priorities
    const pendingTasks = await prisma.task.findMany({
      where: { status: 'pending' },
      orderBy: { dueDate: 'asc' }, // Prioritize tasks with deadlines
      take: 5,
    })
    const formattedPending =
      pendingTasks
        .map(
          (task) =>
            `- ${task.title} (Due: ${task.dueDate || 'No deadline'}) [${task.category ?? 'No category'} / ${task.goal ?? 'No goal'} / ${task.project ?? 'No project'}]`,
        )
        .join('\n') || 'None'

    // Call AI with better context
    const suggestion = await getTaskSuggestion(formattedCompleted, formattedPending)

    console.log(`🤖 AI Suggestion: ${suggestion}`)

    await prisma.$disconnect()
  })

export default command
