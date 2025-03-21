import { program } from '../cli'

describe('cli.ts', () => {
  it('should set the program name', () => {
    expect(program.name()).toBe('my-task-manager')
  })

  it('should set the program version', () => {
    expect(program.version).toBe('0.1.0')
  })

  it('should set the program description', () => {
    expect(program.description()).toBe('Task management CLI.')
  })

  it('should register the add command', () => {
    expect(program.commands).toContainEqual(expect.objectContaining({ name: 'add' }))
  })

  it('should register the complete command', () => {
    expect(program.commands).toContainEqual(expect.objectContaining({ name: 'complete' }))
  })

  it('should register the list command', () => {
    expect(program.commands).toContainEqual(expect.objectContaining({ name: 'list' }))
  })

  it('should register the suggest command', () => {
    expect(program.commands).toContainEqual(expect.objectContaining({ name: 'suggest' }))
  })

  //This test is optional and depends on your needs.  It's generally better to test command functionality in separate command-specific tests.
  // it('should parse arguments (integration test - consider moving to integration tests)', () => {
  //   const args = ['add', 'Test Task'];
  //   program.parse(args);
  //   // Add assertions here to check the program's state after parsing.  This is more of an integration test.
  // });
})
