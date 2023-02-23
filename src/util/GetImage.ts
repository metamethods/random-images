export interface Image {
  slug: string;

  name: string;
  description: string;
  author: string;
  image: string;
}

const HandleNotOK: { [key: number]: () => any } = {
  404: () => {
    return undefined;
  }
};

// Took this snippet from https://github.com/lukadev-0/random-quote-machine/blob/main/src/util/getQuote.ts
const GetBaseURL = () => {
  if (typeof window !== 'undefined') return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export default async function GetImage(
  slug: string,
  exclude?: string[] // all slugs to exclude when getting a random image
): Promise<Image | any | undefined> {
  const query = `?exclude=${encodeURIComponent(exclude ? exclude.join(',') : '')}`;
  const response = await fetch(
    `${GetBaseURL()}/api/images/${slug}.json${query}`
  );

  if (!response.ok) {
    const handler = HandleNotOK[response.status];
    if (handler) return handler();

    // If theres no handler for the status code, throw an error
    throw new Error(`Failed to get image`);
  };

  return response.json() as Promise<Image>;
};

export { GetBaseURL };
