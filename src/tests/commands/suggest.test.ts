import { Command } from 'commander'
import { PrismaClient } from '@prisma/client'
import { getTaskSuggestion } from '../../lmstudio' // Adjust path as needed

jest.mock('@prisma/client', () => {
  const mockPrisma = {
    task: {
      findMany: jest.fn(),
    },
    $disconnect: jest.fn(),
  }
  return { PrismaClient: jest.fn(() => mockPrisma) }
})

jest.mock('../../lmstudio', () => ({
  getTaskSuggestion: jest.fn(),
}))

describe('suggest command', () => {
  let prisma: PrismaClient
  let command: Command
  let getTaskSuggestionMock: jest.MockedFunction<typeof getTaskSuggestion>
  let exitMock: jest.SpyInstance
  let logMock: jest.SpyInstance

  beforeEach(() => {
    prisma = new PrismaClient()
    command = require('../../commands/suggest').default // Adjust path if needed
    command.exitOverride()
    getTaskSuggestionMock = getTaskSuggestion as jest.MockedFunction<typeof getTaskSuggestion>
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

  it('should fetch completed and pending tasks and call the AI', async () => {
    const completedTasks = [
      { id: 1, title: 'Completed Task 1', status: 'completed', createdAt: new Date() },
      { id: 2, title: 'Completed Task 2', status: 'completed', createdAt: new Date() },
    ]
    const pendingTasks = [{ id: 3, title: 'Pending Task 1', status: 'pending', dueDate: new Date() }]
    const aiSuggestion = 'Suggested Task'

    ;(prisma.task.findMany as jest.Mock).mockResolvedValueOnce(completedTasks)
    ;(prisma.task.findMany as jest.Mock).mockResolvedValueOnce(pendingTasks)
    getTaskSuggestionMock.mockResolvedValue(aiSuggestion)

    await command.parseAsync([], { from: 'user' })

    expect(prisma.task.findMany).toHaveBeenCalledWith({
      where: { status: 'completed' },
      orderBy: { createdAt: 'desc' },
      take: 5,
    })
    expect(prisma.task.findMany).toHaveBeenCalledWith({
      where: { status: 'pending' },
      orderBy: { dueDate: 'asc' },
      take: 5,
    })
    expect(getTaskSuggestionMock).toHaveBeenCalledWith(
      expect.stringContaining('Completed Task 1'),
      expect.stringContaining('Pending Task 1'),
    )
    expect(logMock).toHaveBeenCalledWith(`🤖 AI Suggestion: ${aiSuggestion}`)
  })

  it('should handle empty task lists gracefully', async () => {
    ;(prisma.task.findMany as jest.Mock).mockResolvedValueOnce([])
    ;(prisma.task.findMany as jest.Mock).mockResolvedValueOnce([])
    getTaskSuggestionMock.mockResolvedValue('Empty Suggestion')

    await command.parseAsync([], { from: 'user' })

    expect(getTaskSuggestionMock).toHaveBeenCalledWith('None', 'None')
    expect(logMock).toHaveBeenCalledWith('🤖 AI Suggestion: Empty Suggestion')
  })

  it('should handle errors during database query', async () => {
    const mockError = new Error('Database error')
    ;(prisma.task.findMany as jest.Mock).mockRejectedValueOnce(mockError)

    await expect(async () => {
      await command.parseAsync([], { from: 'user' })
    }).rejects.toThrow(mockError)
  })

  it('should handle errors from the AI suggestion function', async () => {
    const mockError = new Error('AI error')
    ;(prisma.task.findMany as jest.Mock).mockResolvedValueOnce([])
    ;(prisma.task.findMany as jest.Mock).mockResolvedValueOnce([])
    getTaskSuggestionMock.mockRejectedValueOnce(mockError)

    await expect(async () => {
      await command.parseAsync([], { from: 'user' })
    }).rejects.toThrow(mockError)
  })
})
