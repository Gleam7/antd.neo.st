'use client';

import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { usePathname, useServerInsertedHTML } from 'next/navigation';
import { SessionProvider, signOut } from 'next-auth/react';

import {
	App,
	Button,
	ConfigProvider,
	Flex,
	Layout,
	MappingAlgorithm,
	Menu,
	//MenuTheme,
	Popover,
	theme,
	ThemeConfig,
	Tooltip,
	Typography,
} from 'antd';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

import { FullscreenExitOutlined, FullscreenOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons';

import { useSettings } from '@/stores/themeConfig';
import { GetHeaderMenuItems, GetSubMenuItems } from '@/app/api/MenuItems';
import { ThemeSettings } from '@/components';
import ScrollTop from '@/components/server/ScrollTop';

import type Entity from '@ant-design/cssinjs/es/Cache';

import '@/public/style/globals.css';

const HeaderMenuItems = GetHeaderMenuItems();
export default function AntdRootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const current_path = usePathname();
	const settings = useSettings();
	const cache = React.useMemo<Entity>(() => createCache(), [settings]);
	const isServerInserted = React.useRef<boolean>(false);

	const [themeName, setThemeName] = React.useState('light');
	const [sidebar_collapsed, setSidebarCollapsed] = React.useState(false);
	const [isFullscreenMode, setFullscreenMode] = React.useState(false);

	const [themeAlgorithm, setThemeAlgorithm] = React.useState<MappingAlgorithm[]>([theme.defaultAlgorithm]);
	//const theme = useConfigStore((state) => state.themeConfig);

	const theme_config: ThemeConfig = {
		//cssVar: true,
		hashed: false,
		algorithm: themeAlgorithm,
		token: {
			fontSize: 14,
			fontWeightStrong: 100,
			fontFamily: 'Moneygraphy-Rounded, Jal_Haru, MonoplexKR-Regular, NanumGothic, "Noto Sans", sans-serif, "Apple Color Emoji"',
			//colorBgBase: '#fff',
			//colorTextBase: '#fff',
			//colorPrimary: '#52c41a',
		},
	};

	const LeftMenuItems = GetSubMenuItems(current_path);
	const OpenedLeftMenuItems = LeftMenuItems.flatMap((x) => [x.key]);

	React.useEffect(() => {
		if (
			current_path !== '/' &&
			(settings.themeMode === 'light' || (settings.themeMode === 'system' && !window.matchMedia('(prefers-color-scheme: dark)').matches))
		) {
			setThemeAlgorithm(settings.themeCompact ? [theme.defaultAlgorithm, theme.compactAlgorithm] : [theme.defaultAlgorithm]);
			document.body.classList.remove('dark');
			document.body.classList.add('light');
		} else {
			setThemeAlgorithm(settings.themeCompact ? [theme.darkAlgorithm, theme.compactAlgorithm] : [theme.darkAlgorithm]);
			document.body.classList.remove('light');
			document.body.classList.add('dark');
		}

		if (settings.themeMode === 'light' || (settings.themeMode === 'system' && !window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			setThemeName('light');
		} else {
			setThemeName('dark');
		}
		console.log(themeName);
	}, [current_path, sidebar_collapsed, settings]);

	useServerInsertedHTML(() => {
		// avoid duplicate css insert
		if (isServerInserted.current) {
			return;
		}
		isServerInserted.current = true;
		return <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />;
	});

	return (
		<>
			<SessionProvider>
				<ConfigProvider theme={theme_config}>
					<App>
						<StyleProvider>
							<ScrollTop>
								<Layout className={settings.themeCompact ? 'compact_mode' : ''}>
									<Layout.Header>
										<Link href="/" className="logo-link">
											<Flex gap="middle" align="center">
												<Image className="dark:invert" src="/img/next.svg" alt="logo" width={120} height={29} priority />
												<Typography.Title level={1} type="secondary">
													Title
												</Typography.Title>
											</Flex>
										</Link>
										<Flex gap="small" align="center" justify="flex-end" className="header_menus">
											<Menu mode="horizontal" defaultSelectedKeys={['1']} items={HeaderMenuItems} />
											{/* <HeaderMenu /> */}
											<Tooltip title={sidebar_collapsed ? 'Show Sidebar' : 'Hide Sidebar'}>
												<Button
													type="text"
													className="btnToggleSidebar"
													icon={sidebar_collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
													onClick={() => setSidebarCollapsed(!sidebar_collapsed)}
												/>
											</Tooltip>
											<Tooltip title={isFullscreenMode ? 'Exit Fullscreen' : 'Show in Fullscreen'}>
												<Button
													type="text"
													className="btnToggleFullscreen"
													icon={isFullscreenMode ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
													onClick={() => {
														setFullscreenMode(!isFullscreenMode);
														if (!document.fullscreenElement) {
															document.documentElement.requestFullscreen();
														} else {
															if (document.exitFullscreen) {
																document.exitFullscreen();
															}
														}
													}}
												/>
											</Tooltip>
											<Tooltip title={'Theme Setting'}>
												<Popover content={<ThemeSettings />} trigger="click">
													<Button type="text" className="btnThemeSetting" icon={<SettingOutlined />} onClick={() => {}} />
												</Popover>
											</Tooltip>
											<Tooltip title={'Signout'}>
												<Button type="text" className="btnSignout" icon={<LogoutOutlined />} onClick={() => signOut()} />
											</Tooltip>
										</Flex>
									</Layout.Header>
									<Layout>
										<Layout.Sider
											breakpoint="lg"
											collapsedWidth="0"
											collapsed={sidebar_collapsed}
											theme={settings.darkSidebar ? 'dark' : 'light'}
											onCollapse={(collapsed, type) => {
												console.log(collapsed, type);
												setSidebarCollapsed(collapsed);
											}}
										>
											<Menu
												theme={settings.darkSidebar ? 'dark' : 'light'}
												mode="inline"
												defaultOpenKeys={OpenedLeftMenuItems}
												forceSubMenuRender={true}
												defaultSelectedKeys={['1']}
												selectedKeys={[current_path]}
												items={LeftMenuItems}
											/>
										</Layout.Sider>
										<Layout.Content className={sidebar_collapsed ? 'w-full' : ''}>
											<div className={(settings.themeStretch ? '' : 'xl:max-w-screen-xl ') + 'main_content_wrapper'}>
												{settings.multiTab ? <div></div> : ''}
												{children}
											</div>
										</Layout.Content>
									</Layout>
									<Layout.Footer className={settings.darkSidebar ? 'dark' : 'light'}>
										<Link href="https://neostory.net/" target="_blank">
											Neostory Networks Inc.
										</Link>
										{` ©${new Date().getFullYear()}, Created by `}
										<Link href="https://nextjs.org/" target="_blank">
											Nextjs
										</Link>
										{' & '}
										<Link href="https://ant.design/" target="_blank">
											Ant UED
										</Link>
									</Layout.Footer>
								</Layout>
							</ScrollTop>
						</StyleProvider>
					</App>
				</ConfigProvider>
			</SessionProvider>
		</>
	);
}
/*
											<Tooltip title={themeName === 'light' ? 'Change to dark mode.' : 'Change to light'}>
												<Button
													type="text"
													className="btnSignout"
													icon={themeName === 'light' ? <MoonOutlined /> : <SunOutlined />}
													onClick={() => setThemeMode(themeName === 'light' ? ThemeMode.Dark : ThemeMode.Light)}
												/>
											</Tooltip>
*/
