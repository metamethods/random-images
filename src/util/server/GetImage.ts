import { readdir, readFile } from "fs/promises";
import { join, resolve } from "path";
import type { Image } from "../GetImage";

const TemporaryDirectory = resolve("./data/temporary");

const GetRandomSlug = async (exclude: string[]) => {
  const Slugs = await readdir(TemporaryDirectory);
  const FilteredSlugs = Slugs.filter((slug) => !exclude.includes(slug));

  return FilteredSlugs[Math.floor(Math.random() * FilteredSlugs.length)]
    .slice(0, -'.json'.length);
};

export default async function GetImage(
  slug: string | "random",
  exclude: string[] = []
) {
  const SlugPath = `${slug === 'random' ? await GetRandomSlug(exclude) : slug}.json`
  const FilePath = join(
    TemporaryDirectory,
    SlugPath
  );

  const FileData = await readFile(FilePath, "utf-8")
    .then((data) => JSON.parse(data))
    .catch(() => undefined);

  if (!FileData) return undefined;

  FileData.slug = SlugPath.slice(0, -'.json'.length);

  return FileData as Image;
};