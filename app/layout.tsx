import React from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: {
		template: '%s | Ant Design Template',
		default: 'Ant Design Template', // a default is required when creating a template
	},
	description: 'Design template Nextjs with ant design',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>{children}</body>
		</html>
	);
}
