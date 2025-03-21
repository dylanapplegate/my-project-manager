import { Command } from 'commander'
import { PrismaClient } from '@prisma/client'

jest.mock('@prisma/client', () => {
  const mockPrisma = {
    task: {
      update: jest.fn(),
    },
    $disconnect: jest.fn(),
  }
  return { PrismaClient: jest.fn(() => mockPrisma) }
})

describe('complete command', () => {
  let prisma: PrismaClient
  let command: Command
  let exitMock: jest.SpyInstance
  let errorMock: jest.SpyInstance
  let logMock: jest.SpyInstance

  beforeEach(() => {
    prisma = new PrismaClient()
    command = require('../../commands/complete').default // Adjust path if needed
    command.exitOverride() // Prevents Commander from exiting the process

    exitMock = jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit called')
    })
    errorMock = jest.spyOn(console, 'error').mockImplementation(() => {})
    logMock = jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.clearAllMocks()
    exitMock.mockRestore()
    errorMock.mockRestore()
    logMock.mockRestore()
  })

  it('should mark a task as completed', async () => {
    const taskId = '1'
    const mockTask = { id: 1, title: 'Test Task' } // Mock task data
    ;(prisma.task.update as jest.Mock).mockResolvedValue(mockTask)

    await command.parseAsync([taskId], { from: 'user' })

    expect(prisma.task.update).toHaveBeenCalledWith({
      where: { id: Number(taskId) },
      data: { status: 'completed' },
    })
    expect(logMock).toHaveBeenCalledWith(`Task completed: ${mockTask.title}`)
  })

  it('should handle invalid task ID gracefully', async () => {
    const invalidTaskId = 'abc'
    const mockError = new Error('Record not found') // Simulate error
    ;(prisma.task.update as jest.Mock).mockRejectedValue(mockError)

    await expect(async () => {
      await command.parseAsync([invalidTaskId], { from: 'user' })
    }).rejects.toThrow(mockError) // Or a more specific error if you know what's thrown

    expect(logMock).not.toHaveBeenCalledWith(expect.stringContaining('Task completed:'))
  })

  it('should throw an error if ID is missing', async () => {
    await expect(async () => {
      await command.parseAsync([], { from: 'user' })
    }).rejects.toThrow("error: missing required argument 'id'")
  })
})
