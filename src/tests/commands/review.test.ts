/* eslint-disable @typescript-eslint/no-require-imports */
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

describe('review command', () => {
  let prisma: PrismaClient
  let command: Command
  let logMock: jest.SpyInstance

  beforeEach(() => {
    prisma = new PrismaClient()
    command = require('../../../src/commands/review').default
    command.exitOverride()
    logMock = jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.clearAllMocks()
    logMock.mockRestore()
  })

  it('should print a message when no completed tasks are found', async () => {
    ;(prisma.task.findMany as jest.Mock).mockResolvedValue([])

    const mockInput = require('readline')
    jest.spyOn(mockInput, 'createInterface').mockReturnValue({
      question: (_q: string, cb: (a: string) => void) => cb(''),
      close: () => {},
    } as unknown)

    await command.parseAsync([], { from: 'user' })

    expect(logMock).toHaveBeenCalledWith(expect.stringContaining('No tasks completed'))
  })

  it('should list completed tasks from the past week', async () => {
    const mockTasks = [
      {
        id: 1,
        title: 'Complete blog post',
        status: 'completed',
        createdAt: new Date(),
        category: 'writing',
        goal: 'portfolio',
        project: 'blog',
      },
      {
        id: 1,
        title: 'lead code problem',
        status: 'completed',
        createdAt: new Date(),
      },
    ]
    ;(prisma.task.findMany as jest.Mock).mockResolvedValue(mockTasks)

    const mockInput = require('readline')
    jest.spyOn(mockInput, 'createInterface').mockReturnValue({
      question: (_q: string, cb: (a: string) => void) => cb('Test answer'),
      close: () => {},
    } as unknown)

    await command.parseAsync([], { from: 'user' })

    expect(logMock).toHaveBeenCalledWith(expect.stringContaining('Complete blog post'))
  })
})
