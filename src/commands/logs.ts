import { PrismaClient } from '@prisma/client'
import { Command } from 'commander'

const prisma = new PrismaClient()
const command = new Command()

command
  .name('logs')
  .description('Show recent task logs')
  .action(async () => {
    const logs = await prisma.taskLog.findMany({
      orderBy: { timestamp: 'desc' },
      take: 10,
      include: { task: true },
    })

    if (logs.length === 0) {
      console.log('No recent task logs found.')
    } else {
      logs.forEach((log) => {
        console.log(`- [${log.timestamp.toISOString()}] ${log.task.title}: ${log.action}`)
      })
    }

    await prisma.$disconnect()
  })

export default command
