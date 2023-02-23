import { notFound } from 'next/navigation';
import GetImage from '@/util/ServerGetImage';

import Display from './Display';

interface Params {
  slug: string;
}

export default async function Page(
  { params }: { params: Params }
) {
  const { slug } = params;
  const Data = await GetImage(slug);

  if (!Data) return notFound();

  return (
    <main className='flex items-center justify-center | min-h-screen'>
      <Display
        image={Data}
      />
    </main>
  )
}