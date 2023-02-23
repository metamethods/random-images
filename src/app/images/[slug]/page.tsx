import { notFound } from 'next/navigation';

import Display from './Display';

interface Params {
  slug: string;
}

export default async function Page(
  { params }: { params: Params }
) {
  const { slug } = params;

  return (
    <main className='flex items-center justify-center | min-h-screen'>
      <Display
        image={{
          name: '',
          description: '',
          author: '',
          image: '',
        }}
      />
    </main>
  )
}