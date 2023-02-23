import GetImage from '@/util/ServerGetImage';

import type { NextApiRequest, NextApiResponse } from 'next'

type Gets = {
  name: string;
  exclude: string[];
}

type Returns = {
  slug: string;

  name: string;
  description: string;
  author: string;
  image: string;
}

const NotFound = (result: NextApiResponse) => {
  return result.status(404).json({ message: "Not Found" });
}

// Taken regex from https://github.com/lukadev-0/random-quote-machine/blob/main/src/pages/api/quotes/%5Bname%5D.ts
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Returns>
) {
  const { name, exclude } = request.query as Gets;
  const Match = name.match(/^(.*)\.(\w+)$/);
  if (!Match) return NotFound(response);

  const Slug = Match[1];

  const Image = await GetImage(Slug, exclude);
  if (!Image) return NotFound(response);

  response.status(200).json(Image);
}
