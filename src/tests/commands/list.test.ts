import { Command } from 'commander'
import { PrismaClient } from '@prisma/client'

jest.mock('@prisma/client', () => {
  const mockPrisma = {
    task: {
      findMany: jest.fn(),
    },
    $disconnect: jest.fn(),
  }
  return { PrismaClient: jest.fn(() => mockPrisma) }
})

describe('list command', () => {
  let prisma: PrismaClient
  let command: Command
  let exitMock: jest.SpyInstance
  let logMock: jest.SpyInstance

  beforeEach(() => {
    prisma = new PrismaClient()
    command = require('../../commands/list').default // Adjust path if needed
    command.exitOverride()

    exitMock = jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit called')
    })
    logMock = jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.clearAllMocks()
    exitMock.mockRestore()
    logMock.mockRestore()
  })

  it('should list pending tasks by default', async () => {
    const mockTasks = [
      { id: 1, title: 'Task 1', status: 'pending' },
      { id: 2, title: 'Task 2', status: 'pending' },
    ]
    ;(prisma.task.findMany as jest.Mock).mockResolvedValue(mockTasks)

    await command.parseAsync([], { from: 'user' })

    expect(prisma.task.findMany).toHaveBeenCalledWith({ where: { status: 'pending' } })
    expect(logMock).toHaveBeenCalledWith(expect.stringContaining('1: Task 1 [pending]'))
    expect(logMock).toHaveBeenCalledWith(expect.stringContaining('2: Task 2 [pending]'))
  })

  it('should list completed tasks with --completed flag', async () => {
    const mockTasks = [{ id: 3, title: 'Task 3', status: 'completed' }]
    ;(prisma.task.findMany as jest.Mock).mockResolvedValue(mockTasks)

    await command.parseAsync(['--completed'], { from: 'user' })

    expect(prisma.task.findMany).toHaveBeenCalledWith({ where: { status: 'completed' } })
    expect(logMock).toHaveBeenCalledWith(expect.stringContaining('3: Task 3 [completed]'))
  })

  it('should handle empty task list gracefully', async () => {
    ;(prisma.task.findMany as jest.Mock).mockResolvedValue([])

    await command.parseAsync([], { from: 'user' })

    expect(logMock).toHaveBeenCalled() // Expect an empty string or a message indicating no tasks
    // You might need to adjust this expectation based on your console output in this case.
  })

  it('should handle errors during database query', async () => {
    const mockError = new Error('Database error')
    ;(prisma.task.findMany as jest.Mock).mockRejectedValue(mockError)

    await expect(async () => {
      await command.parseAsync([], { from: 'user' })
    }).rejects.toThrow(mockError)
  })
})
