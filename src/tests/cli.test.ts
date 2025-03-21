import { program } from '../cli'

describe('cli.ts', () => {
  it('should set the program name', () => {
    expect(program.name()).toBe('my-task-manager')
  })

  it('should set the program version', () => {
    expect(program.version()).toBe('0.1.0')
  })

  it('should set the program description', () => {
    expect(program.description()).toBe('Task management CLI.')
  })

  it('should register the add command', () => {
    expect(program.commands).toEqual(expect.arrayContaining([expect.objectContaining({ _name: 'add' })]))
  })

  it('should register the complete command', () => {
    expect(program.commands).toEqual(expect.arrayContaining([expect.objectContaining({ _name: 'complete' })]))
  })

  it('should register the list command', () => {
    expect(program.commands).toEqual(expect.arrayContaining([expect.objectContaining({ _name: 'list' })]))
  })

  it('should register the suggest command', () => {
    expect(program.commands).toEqual(expect.arrayContaining([expect.objectContaining({ _name: 'suggest' })]))
  })

  it('should register the review command', () => {
    expect(program.commands).toEqual(expect.arrayContaining([expect.objectContaining({ _name: 'review' })]))
  })
})
