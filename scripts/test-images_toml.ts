import { resolve } from 'path';
import { readFile } from 'fs/promises';

import toml from 'toml';
import chalk from 'chalk';

const Test = async () => {
  console.log(`${chalk.yellow('Testing:')} "images.toml"`);

  try {
    toml.parse(
      await readFile( resolve('./data/images.toml'), 'utf-8' )
    );
  } catch (
    error: { line: number, column: number, message: string } | any
  ) {
    console.log(chalk.bgRed('Failed') + chalk.red(` Parsing error on line ${chalk.bold(error.line)}, column ${chalk.bold(error.column)}: ${chalk.bold(error.message)}`));
    process.exit(1);
  }

  console.log(`${chalk.green('Success:')} "images.toml" is in valid TOML format!`);
  process.exit(0);
}

Test();

export {}