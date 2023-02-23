import GetImage from "@/util/ServerGetImage";

interface Params {
  slug: string;
}

const GetBaseURL = () => {
  if (typeof window !== 'undefined') return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export default async function Head(
  { params }: { params: Params }
) {
  const { slug } = params;
  const Data = await GetImage(slug);

  if (!Data) return null;

  const { name, description, author, image } = Data;

  return (
    <>
      <title>{Data.name}</title>

      <meta name="description" content={description} />

      <meta property="og:title" content={name} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={name} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1920" />
      <meta property="og:image:height" content="1080" />
      
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Random Image Machine" />
      <meta property="og:url" content={`${GetBaseURL()}/quotes/${slug}`} />
      <meta property="og:description" content={description} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={name} />
      <meta name="twitter:description" content={description} />
    </>
  );
}