import { Command } from 'commander'
import { PrismaClient } from '@prisma/client'

jest.mock('@prisma/client', () => {
  const mockPrisma = {
    taskLog: {
      findMany: jest.fn(),
    },
    $disconnect: jest.fn(),
  }
  return { PrismaClient: jest.fn(() => mockPrisma) }
})

describe('logs command', () => {
  let prisma: PrismaClient
  let command: Command
  let logMock: jest.SpyInstance

  beforeEach(() => {
    prisma = new PrismaClient()
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    command = require('../../../src/commands/logs').default
    command.exitOverride()
    logMock = jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.clearAllMocks()
    logMock.mockRestore()
  })

  it('should print a message when no logs are found', async () => {
    ;(prisma.taskLog.findMany as jest.Mock).mockResolvedValue([])

    await command.parseAsync([], { from: 'user' })

    expect(logMock).toHaveBeenCalledWith('No recent task logs found.')
  })

  it('should print the 10 most recent task logs', async () => {
    const mockLogs = Array.from({ length: 10 }, (_, index) => ({
      timestamp: new Date(Date.now() - index * 1000),
      task: { title: `Task ${index + 1}` },
      action: 'completed',
    }))
    ;(prisma.taskLog.findMany as jest.Mock).mockResolvedValue(mockLogs)

    await command.parseAsync([], { from: 'user' })

    mockLogs.forEach((log) => {
      expect(logMock).toHaveBeenCalledWith(`- [${log.timestamp.toISOString()}] ${log.task.title}: ${log.action}`)
    })
  })
})
