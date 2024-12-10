import { Metadata } from 'next';

import AntdRootLayout from '@/components/client/AntdRootLayout';

export const metadata: Metadata = {
	title: {
		template: '%s | Ant Design Template demo pages',
		default: 'Ant Design Template', // a default is required when creating a template
	},
	description: 'Design template Nextjs with ant design',
};

export default function DemoLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <AntdRootLayout>{children}</AntdRootLayout>;
}
