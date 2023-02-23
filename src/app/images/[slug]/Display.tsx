/* eslint-disable @next/next/no-img-element */
interface Props {
  name: string;
  description: string;
  author: string;
  image: string;
}

export default function Display(
  { image }: { image: Props }
) {
  return (
    <main className="w-full max-w-5xl | overflow-hidden | rounded-md">
      <figure className="bg-zinc-800 | p-8 | font-monstserrat">
        <h1 className=" text-4xl font-bold">Some Cool Title</h1>
        <p className=" text-2xl font-medium | opacity-50">Hello World!</p>

        {/* i need this to shut the hell up :ggggrgrgrgrgr: */}
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          src='/empty.png'
          className="w-full h-[450px] | rounded-md | mt-8 | border-2 border-opacity-5 border-white"
        ></img>

        <figcaption className="mt-8">
          <p className="text-xl text-center font-medium | opacity-50">- Some Cool Author</p>
        </figcaption>
      </figure>
    </main>
  )
}