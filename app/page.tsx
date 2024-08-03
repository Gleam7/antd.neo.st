import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<main className="flex justify-center items-center h-screen bg-zinc-950	">
			<div className="flex justify-center items-center max-w-5xl mx-auto rounded-xl border border-zinc-800 shadow-inner shadow overflow-hidden min-w-[640px] min-h-[480px]">
				<div className="flex flex-col items-start p-8">
					<h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-500 mb-8 w-full text-center">Ant design examples page</h2>

					<p className="leading-relaxed w-full">
						This is Ant design examples page using
						<Link href={'https://nextjs.org'} target="_blank" title="Next.js" className="mx-2">
							Next.js
						</Link>
						+
						<Link href={'https://tailwindcss.com'} target="_blank" title="Tailwind CSS" className="mx-2">
							Tailwind CSS
						</Link>
						+
						<Link href={'https://tailwindcss.com'} target="_blank" title="Ant Design" className="mx-2">
							Ant Design
						</Link>
					</p>
					<p className="leading-relaxed w-full mt-4">
						You can see the live demo at
						<Link href={'https://antd.neo.st'} target="_blank" title="https://antd.neo.st" className="mx-2">
							https://antd.neo.st
						</Link>
					</p>
					<p className="leading-relaxed w-full mt-4">
						Go to examples
						<Link href={'/examples'} title="examples" className="mx-2">
							/examples
						</Link>
					</p>
				</div>
			</div>
		</main>
	);
}
