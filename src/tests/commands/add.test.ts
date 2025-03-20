import { Command } from 'commander'
import { PrismaClient } from '@prisma/client'
import addCommand from '../../commands/add' // Assuming the file is in a subdirectory

describe('add command', () => {
  let prisma: PrismaClient
  let command: Command

  beforeEach(() => {
    prisma = new PrismaClient()
    command = addCommand // Use the imported command
  })

  afterEach(async () => {
    await prisma.$disconnect()
  })

  it('should add a task with title only', async () => {
    const title = 'Test Task'
    await expect(command.parseAsync(['add', title])).resolves.not.toThrow()
    const tasks = await prisma.task.findMany()
    expect(tasks.length).toBe(1)
    expect(tasks[0].title).toBe(title)
    expect(tasks[0].dueDate).toBeNull()
  })

  it('should add a task with title and due date', async () => {
    const title = 'Test Task with Due Date'
    const dueDate = '2024-03-15'
    await expect(command.parseAsync(['add', title, '-d', dueDate])).resolves.not.toThrow()
    const tasks = await prisma.task.findMany()
    expect(tasks.length).toBe(1)
    expect(tasks[0].title).toBe(title)
    expect(tasks[0].dueDate).toEqual(new Date(dueDate))
  })

  it('should handle invalid due date gracefully', async () => {
    const title = 'Test Task with Invalid Due Date'
    const dueDate = 'invalid-date'
    await expect(command.parseAsync(['add', title, '-d', dueDate])).rejects.toThrow() //This might throw a different error depending on how Date handles invalid input.  Adjust as needed.

    //Check that no task was added despite the error.
    const tasks = await prisma.task.findMany()
    expect(tasks.length).toBe(0)
  })

  it('should output a success message', async () => {
    const title = 'Test Task'
    const logSpy = jest.spyOn(console, 'log')
    await command.parseAsync(['add', title])
    expect(logSpy).toHaveBeenCalledWith(`Task added: ${title}`)
  })

  it('should throw an error if title is missing', async () => {
    await expect(command.parseAsync(['add'])).rejects.toThrow()
  })

  // Add more tests as needed to cover edge cases and error handling.  For example:
  // - Test with very long titles.
  // - Test with special characters in the title.
  // - Test with a due date in a different format.
})
