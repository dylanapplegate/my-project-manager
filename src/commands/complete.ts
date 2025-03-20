import { PrismaClient } from '@prisma/client'
import { Command } from 'commander'

const prisma = new PrismaClient()
const command = new Command()

command
  .name('complete')
  .description('Mark a task as completed')
  .argument('<id>', 'Task ID')
  .action(async (id) => {
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: { status: 'completed' },
    })
    console.log(`Task completed: ${task.title}`)
    await prisma.$disconnect()
  })

export default command
