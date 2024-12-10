'use client';
import React, { CSSProperties, HTMLProps, ReactNode } from 'react';

import { usePathname } from 'next/navigation';

import { Breadcrumb, BreadcrumbProps } from 'antd';
import { GetBreadcrumbItems } from '@/app/api/MenuItems';

type PageHeaderProps = {
	children: ReactNode;
	style?: CSSProperties;
	useDefaultBreadcrumbItems?: boolean;
	breadcrumbProps?: BreadcrumbProps;
} & HTMLProps<HTMLDivElement>;

export function PageHeader({ children, style, useDefaultBreadcrumbItems, breadcrumbProps, ...others }: PageHeaderProps) {
	const current_path = usePathname();
	let title_style: CSSProperties = {};

	others.className = `page_header ${others.className || ''}`;

	useDefaultBreadcrumbItems = useDefaultBreadcrumbItems || !(breadcrumbProps && (breadcrumbProps.items?.length || -1) > 0);

	if (breadcrumbProps) {
		title_style = {
			marginTop: '.5em',
		};

		if (useDefaultBreadcrumbItems) {
			breadcrumbProps.items = GetBreadcrumbItems(current_path);
		}
	} else {
		if (useDefaultBreadcrumbItems) {
			breadcrumbProps = {
				items: GetBreadcrumbItems(current_path),
			};
		}
	}

	//theme
	return (
		<header {...others} style={{ ...style }}>
			{breadcrumbProps && <Breadcrumb {...breadcrumbProps}></Breadcrumb>}
			<h3 className="ant-typography" style={title_style}>
				{children}
			</h3>
		</header>
	);
}
