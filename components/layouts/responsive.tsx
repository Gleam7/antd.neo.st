'use client';

import React, { useState, ComponentProps } from 'react';
import Image from 'next/image';

import { Layout, Menu, theme, Breadcrumb, Space, Button } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

import { MenuItems_Main, MenuItems_Sub } from '@/components/menu_items';

const styleLayout = {
	backgroundColor: 'var(--background-nav-bar)',
};
const styleHeader: React.CSSProperties = {
	display: 'flex',
	backgroundColor: 'var(--background-nav-bar)',
};

const styleSider: React.CSSProperties = {
	overflow: 'hide',
	overflowX: 'auto',
	height: 'calc(100vh - 6rem)',
	scrollbarWidth: 'thin',
	scrollbarColor: 'unset',
	backgroundColor: 'var(--background-nav-bar)',
};
const styleFooter: React.CSSProperties = {
	padding: '.3rem 1rem',
	color: '#fff',
	backgroundColor: 'var(--background-nav-bar)',
};
const styleContentWrapper: React.CSSProperties = {
	margin: '.3rem',
	padding: '.3rem',
	borderRadius: '.5rem',
	height: '100%',
	overflow: 'none',
	//backgroundColor: '#ddd',
	scrollbarWidth: 'thin',
	scrollbarColor: 'unset',
	backgroundColor: '#fff',
};

const ResponsiveLayout = ({
	children,
	breadcrumbItems,
	props,
}: Readonly<{
	children: React.ReactNode;
	breadcrumbItems?: any;
	props?: ComponentProps<typeof Layout>;
}>) => {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};

	const styleContent: React.CSSProperties = {
		margin: '0',
		padding: '1rem',
		height: 'calc(100vh - 8.5rem)',
		overflow: 'auto',
		scrollbarWidth: 'thin',
		scrollbarColor: 'unset',
	};
	console.log(breadcrumbItems);

	return (
		<Layout {...props} style={styleLayout}>
			<Header style={styleHeader}>
				<div
					style={{
						minWidth: 200,
						height: '100%',
						overflow: 'hidden',
					}}
				>
					<Image
						src="https://placehold.co/153x50/333/eee@3x.png?text=Logo"
						alt="Site Logo"
						className="dark:invert"
						style={{
							display: 'inline-block',
							marginRight: '1rem',
							borderRadius: '0.5rem',
						}}
						width={153}
						height={50}
						priority
					/>
				</div>
				<Menu
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={['2']}
					items={MenuItems_Main}
					style={{ flex: 1, minWidth: 0, backgroundColor: 'var(--background-nav-bar)', justifyContent: 'flex-end' }}
				/>
			</Header>
			<Layout style={styleLayout}>
				<Sider
					width="253"
					style={styleSider}
					breakpoint="lg"
					collapsedWidth="0"
					onBreakpoint={(broken) => {
						console.log(broken);
					}}
					onCollapse={(collapsed, type) => {
						console.log(collapsed, type);
					}}
				>
					<Menu
						theme="dark"
						mode="inline"
						defaultSelectedKeys={['2']}
						items={MenuItems_Sub}
						style={{ flex: 1, minWidth: 0, backgroundColor: 'var(--background-nav-bar)', justifyContent: 'flex-end' }}
					/>
				</Sider>
				<Content style={styleContentWrapper}>
					<Breadcrumb style={{ margin: '0 1rem' }} items={breadcrumbItems || []} />
					<div style={styleContent}>{children}</div>
				</Content>
			</Layout>
			<Footer style={styleFooter}>Footer</Footer>
		</Layout>
	);
};

export default ResponsiveLayout;
