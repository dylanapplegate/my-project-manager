import { PrismaClient } from '@prisma/client'
import { Command } from 'commander'
import readline from 'readline'

const prisma = new PrismaClient()
const command = new Command()

command
  .name('review')
  .description('Generate a weekly reflection summary')
  .action(async () => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const completedTasks = await prisma.task.findMany({
      where: {
        status: 'completed',
        createdAt: { gte: oneWeekAgo },
      },
      orderBy: { createdAt: 'asc' },
    })

    console.log('\n📝 Weekly Review Summary')
    console.log('--------------------------')
    if (completedTasks.length === 0) {
      console.log('No tasks completed in the past 7 days.')
    } else {
      completedTasks.forEach((task) => {
        console.log(
          `- ${task.title} [${task.category ?? 'No category'} / ${task.goal ?? 'No goal'} / ${task.project ?? 'No project'}]`,
        )
      })
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    const ask = (question: string) => new Promise<string>((resolve) => rl.question(question, resolve))

    const reflectionQuestions = [
      'What worked well this week? ',
      'What slowed you down? ',
      'How can you improve your workflow? ',
    ]

    const answers: string[] = []

    for (const q of reflectionQuestions) {
      const answer = await ask(`\n${q}`)
      answers.push(answer)
    }

    rl.close()

    console.log('\n💬 Reflection Summary')
    reflectionQuestions.forEach((q, i) => {
      console.log(`\n${q}\n→ ${answers[i]}`)
    })

    await prisma.$disconnect()
  })

export default command
