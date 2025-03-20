import { Command } from 'commander'
import { PrismaClient } from '@prisma/client'
import addCommand from '../../commands/add'

jest.mock('@prisma/client', () => {
  const mockPrisma = {
    task: {
      create: jest.fn(),
      findMany: jest.fn().mockResolvedValue([]), // Default empty array
    },
    $disconnect: jest.fn(),
  }
  return { PrismaClient: jest.fn(() => mockPrisma) }
})

describe('add command', () => {
  let prisma: PrismaClient
  let command: Command
  let exitMock: jest.SpyInstance
  let errorMock: jest.SpyInstance
  let logMock: jest.SpyInstance

  beforeEach(() => {
    prisma = new PrismaClient()
    command = addCommand
    command.exitOverride()
    exitMock = jest.spyOn(process, 'exit').mockImplementation((code?: string | number | null | undefined) => {
      throw new Error(`process.exit called with code: ${code}`)
    }) // Prevent Jest from exiting
    errorMock = jest.spyOn(console, 'error').mockImplementation(() => {}) // Suppress CLI errors
    logMock = jest.spyOn(console, 'log').mockImplementation(() => {}) // Suppress CLI output
  })

  afterEach(() => {
    jest.clearAllMocks() // Reset mocks between tests
    exitMock.mockRestore()
    errorMock.mockRestore()
    logMock.mockRestore()
  })

  it('should add a task with title only', async () => {
    const title = 'Test Task'
    command.parse([title], { from: 'user' })

    expect(prisma.task.create).toHaveBeenCalledWith({
      data: { title, dueDate: null },
    })
  })

  it('should add a task with title and due date', async () => {
    const title = 'Test Task with Due Date'
    const dueDate = '2024-03-15'

    command.parse([title, '-d', dueDate], { from: 'user' })

    expect(prisma.task.create).toHaveBeenCalledWith({
      data: { title, dueDate: new Date(dueDate) },
    })
  })

  // it('should handle invalid due date gracefully', async () => {
  //   const title = 'Test Task with Invalid Due Date'
  //   const dueDate = 'invalid-date'
  //   expect(() => command.parse([title, '-d', dueDate], { from: 'user' })).toThrow()

  //   expect(prisma.task.create).not.toHaveBeenCalled() // Ensure no DB write happened
  // })

  it('should output a success message', async () => {
    const title = 'Test Output Message'

    await command.parse([title], { from: 'user' })

    expect(logMock).toHaveBeenCalledWith(`Task added: ${title}`)
  })

  it('should throw an error if title is missing', async () => {
    await expect(async () => {
      await command.parse([], { from: 'user' })
    }).rejects.toThrow("error: missing required argument 'title'")
  })
})
