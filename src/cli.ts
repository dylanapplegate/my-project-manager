#!/usr/bin/env -S deno run --allow-net --allow-read --allow-env

import { Command } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";

const program = new Command()
  .name("my-task-manager")
  .version("0.1.0")
  .description("A test CLI client for verifying Docker Compose setup.")
  .command(
    "test",
    new Command()
      .description("Test command to check Docker Compose setup")
      .action(() => {
        console.log("Docker Compose setup is working!");
      }),
  )
  .parse(Deno.args);

if (Deno.args.length === 0) {
  console.log(
    "Welcome to my-task-manager CLI! Use the 'test' command to check the Docker Compose setup.",
  );
}
