#!/usr/bin/env tsx

import { Command } from 'commander'
import addCommand from './commands/add'
import completeCommand from './commands/complete'
import listCommand from './commands/list'
import suggestCommand from './commands/suggest'
import reviewCommand from './commands/review'
import logsCommand from './commands/logs'

const program = new Command()

program.name('my-task-manager').version('0.1.0').description('Task management CLI.')

program.addCommand(addCommand)
program.addCommand(completeCommand)
program.addCommand(listCommand)
program.addCommand(suggestCommand)
program.addCommand(reviewCommand)
program.addCommand(logsCommand)

export { program }
