'use client';

import React, { ComponentProps } from 'react';
import ResponsiveLayout from '@/components/layouts/responsive';

import { Layout } from 'antd';

import '@/public/css/AntdLayout.css';

const ResponsiveAntdLayout = ({
	children,
	breadcrumbItems,
	props,
}: Readonly<{
	children: React.ReactNode;
	breadcrumbItems?: any;
	props?: ComponentProps<typeof Layout>;
}>) => {
	console.log(breadcrumbItems);
	return (
		<ResponsiveLayout props={props} breadcrumbItems={breadcrumbItems}>
			{children}
		</ResponsiveLayout>
	);
};

export default ResponsiveAntdLayout;
