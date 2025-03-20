#!/usr/bin/env node

const { Command } = require('commander')

const program = new Command()

program.name('my-task-manager').version('0.1.0').description('A test CLI client for verifying Docker Compose setup.')

program
  .command('test')
  .description('Test command to check Docker Compose setup')
  .action(() => {
    console.log('Docker Compose setup is working!')
  })

program.parse(process.argv)

if (process.argv.length === 2) {
  console.log("Welcome to my-task-manager CLI! Use the 'test' command to check the Docker Compose setup.")
}
