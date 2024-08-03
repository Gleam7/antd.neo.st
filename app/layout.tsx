import type { Metadata } from 'next';
//import { Inter } from 'next/font/google';
import './globals.css';

//const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'antd.neo.st',
	description: 'This is Ant design examples page using Next.js + Tailwind CSS + Ant Design. You can see the live demo at https://antd.neo.st',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			{/*<body className={inter.className}>{children}</body>*/}
			<body>{children}</body>
		</html>
	);
}
