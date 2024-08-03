//'use client';

import React, { useState } from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

import ResponsiveAntdLayout from '@/components/layouts/antd';

const BreadcrumbItem = [
	{
		href: '/',
		title: (
			<>
				<HomeOutlined />
				<span>Home</span>
			</>
		),
	},
	{
		href: '/examples',
		title: (
			<>
				<UserOutlined />
				<span>Examples</span>
			</>
		),
	},
];
const layoutProps = {};

let pageContents: any[] = [];
Array.from({ length: 300 }, (_, i) => i).forEach((value, i) => {
	let li_key = 'ul_long_content$_li_' + String(i);
	pageContents.push(
		<li key={li_key}>
			<React.Fragment key={i}>
				{i + 1}&nbsp;
				{i % 20 === 0 ? 'long contents' : '...'}
				<br />
			</React.Fragment>
		</li>
	);
});

const Page: React.FC = () => {
	return (
		<ResponsiveAntdLayout props={layoutProps} breadcrumbItems={BreadcrumbItem}>
			Examples
			<ul style={{ margin: '1rem' }} key="ul_long_content">
				{pageContents}
			</ul>
		</ResponsiveAntdLayout>
	);
};

export default Page;
