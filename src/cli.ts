#!/usr/bin/env tsx

import { Command } from 'commander'
import addCommand from './commands/add'
import completeCommand from './commands/complete'
      import listCommand from './commands/list'
import suggestCommand from './commands/suggest'

const program = new Command()

program.name('my-task-manager').version('0.1.0').description('Task management CLI.')

program.addCommand(addCommand)
program.addCommand(completeCommand)
program.addCommand(listCommand)
program.addCommand(suggestCommand)

if (process.argv[1].endsWith('cli.ts')) {
  program.parse(process.argv)
}




export { program }