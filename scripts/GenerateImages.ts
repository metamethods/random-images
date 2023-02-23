// Yes i've looked through your code lukadev, but just to get an idea on how I would do it (real!!)
import { join, resolve } from 'path';

import chalk from 'chalk';

const paths = {
  DataDirectory: resolve('./data'),
}

const consts = {
  TomlURL: 'https://github.com/metamethods/random-images/blob/main/data/images.toml',

  TemporaryDirectory: join(paths.DataDirectory, 'temporary'),
  ImagesFileTOML: join(paths.DataDirectory, 'images.toml'),
}

export {};