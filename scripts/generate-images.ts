// Yes i've looked through your code lukadev, but just to get an idea on how I would do it (real!!)
// Credits to lukadev for mostly everything in here (as some stuff I written myself)

import { join, resolve } from 'path';
import { mkdir, readFile, rm, writeFile } from 'fs/promises';
import { BinaryLike, BinaryToTextEncoding, createHash } from 'crypto';

import chalk, { ChalkInstance } from 'chalk';
import toml from 'toml';
import slugify from 'slugify';

const Paths = {
  DataDirectory: resolve('./data'),
}

const Consts = {
  TomlURL: 'https://github.com/metamethods/random-images/blob/main/data/images.toml',

  TemporaryDirectory: join(Paths.DataDirectory, 'temporary'),
  ImagesFileTOML: join(Paths.DataDirectory, 'images.toml'),
}

let ValidatedImages: { [key: string]: string } = {};

// Types
interface AreTheyResult { 
  passed: boolean, 
  reason: string
}

interface ImageChunk {
  name: string,
  description: string,
  author: string,
  image: string,
}

// Functions
const Info = (headColor: ChalkInstance, bodyColor: ChalkInstance, head: string, body: string) => {
  console.log(`${headColor(head)} ${bodyColor(body)}`);
}

const GetImages = async () => {
  const TomlData = (await readFile(Consts.ImagesFileTOML)).toString();
  const ParasedToml = toml.parse(TomlData);

  return JSON.parse(JSON.stringify(ParasedToml));
}

const AreThey = (
  what: string,
  ...args: any[]
): AreTheyResult => {
  for (const arg of args) {
    if (typeof arg !== what) 
      return { passed: false, reason: `Expected ${what}, got ${typeof arg}` };
  };

  return { passed: true, reason: '' };
}

const ValidateChunk = (
  chunk: ImageChunk
): AreTheyResult => {
  const { name, description, author, image } = chunk;
  const result = AreThey('string', name, description, author, image);
  const length = Object.keys(chunk).length;

  if (length > 4) return { passed: false, reason: `Too many keys exist in a chunk. Got ${length}; required 4.` }
  if (ValidatedImages[ JSON.stringify(chunk) ]) return { passed: false, reason: `Duplicate chunk name` }

  return result;
}

const hashMd5 = (
  data: BinaryLike,
  encoding: BinaryToTextEncoding,
  length: number
): string => {
  const hash = createHash('md5');
  hash.update(data);
  return hash.digest(encoding).slice(0, length);
}

// Totally not stolen :troll:
const CreateSlug = ( 
  image: ImageChunk
): string => {
  const hash = hashMd5(image.image, 'hex', 8);
  const slug = slugify(image.name, {
    trim: true,
    lower: true,
    remove: /[^\w ]/g,
    replacement: ' ',
  })
    .replace(/^(.{40}[^\s]*).*/, '$1')
    .trim()
    .replace(/ /g, '-');
  
  return `${slug}-${hash}`;
}

const GenerateImages = async () => {
  Info(chalk.yellow, chalk.white, 'Creating:', 'Temporary Directory\n');

  await rm(Consts.TemporaryDirectory, { recursive: true, force: true });
  await mkdir(Consts.TemporaryDirectory, { recursive: true });

  const ParsedImages = await GetImages();

  for (const chunk of ParsedImages.image) {
    Info(chalk.yellow, chalk.white, 'Validating:', chunk.name);
    
    const result = ValidateChunk(chunk);

    if (!result.passed) {
      Info(chalk.red, chalk.white, 'Failed:', result.reason);
      continue; // We will just skip it
    }

    Info(chalk.green, chalk.white, 'Success:', 'Validated chunk');
    
    // On Validation Success, we will write the file
    const Slug = CreateSlug(chunk);
    const FileName = `${Slug}.json`;
    const FilePath = join(Consts.TemporaryDirectory, FileName);

    await writeFile(FilePath, JSON.stringify(chunk, null, 2));

    Info(chalk.gray, chalk.white, 'Wrote:', `${FileName}`);

    // Add to validated images
    ValidatedImages[ JSON.stringify(chunk) ] = Slug;
  }

  // When finished
  Info(chalk.magenta, chalk.white, '\nSuccess:', 'Generated images\n');
  process.exit(0);
}

// On Run
GenerateImages();

export {};