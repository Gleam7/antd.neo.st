'use client';

import React from 'react';

import {
	Button,
	//Card,
	//Descriptions,
	Segmented,
	Switch,
	theme,
	//Tooltip
} from 'antd';
import {
	//QuestionCircleOutlined,
	LeftOutlined,
	RightOutlined,
	MoonOutlined,
	SunOutlined,
	DesktopOutlined,
	//UpOutlined,
	//VerticalAlignTopOutlined,
	//VerticalAlignBottomOutlined,
	//VerticalAlignMiddleOutlined,
	//CheckOutlined,
	//CloseOutlined,
} from '@ant-design/icons';

import { useSettingActions, useSettings } from '@/stores/themeConfig';
//import { type ThemeColorPresets, ThemeLayout, ThemeMode } from '@/types';
import { ThemeMode } from '@/types';
import { GetEnumFromString } from '@/lib';
//import { SegmentedOptions } from 'antd/es/segmented';

export function useThemeToken() {
	const { token } = theme.useToken();
	return React.useMemo(() => token, [token]);
}

export const SegmentedOptionForThemeMode: {
	label: string;
	icon: JSX.Element;
	value: ThemeMode;
	title: string;
}[] = [];

Object.keys(ThemeMode).map((key) => {
	const value = key.toLowerCase();
	const segment_option_val = GetEnumFromString(ThemeMode, value.toLowerCase());

	const segment_option = {
		label: key,
		icon: value === 'light' ? <SunOutlined /> : value === 'dark' ? <MoonOutlined /> : <DesktopOutlined />,
		value: segment_option_val,
		title: value,
	};

	SegmentedOptionForThemeMode.push(segment_option);
});

export const ThemeSettings: React.FC = () => {
	//const { colorPrimary, colorBgBase, colorTextSecondary, colorTextTertiary, colorBgContainer } = useThemeToken();

	const settings = useSettings();
	//const { themeMode, themeColorPresets, themeLayout, themeCompact, themeStretch, breadCrumb, multiTab, darkSidebar } = settings;
	const { themeMode, themeCompact, themeStretch, breadCrumb, multiTab, darkSidebar } = settings;
	const { setSettings } = useSettingActions();

	const setThemeMode = (themeMode: ThemeMode) => {
		setSettings({
			...settings,
			themeMode,
		});
	};

	//const setThemeColorPresets = (themeColorPresets: ThemeColorPresets) => {
	//	setSettings({
	//		...settings,
	//		themeColorPresets,
	//	});
	//};

	//const setThemeLayout = (themeLayout: ThemeLayout) => {
	//	setSettings({
	//		...settings,
	//		themeLayout,
	//	});
	//};

	const setThemeStretch = (themeStretch: boolean) => {
		setSettings({
			...settings,
			themeStretch,
		});
	};

	const setThemeCompact = (themeCompact: boolean) => {
		setSettings({
			...settings,
			themeCompact,
		});
	};

	const setBreadCrumn = (checked: boolean) => {
		setSettings({
			...settings,
			breadCrumb: checked,
		});
	};

	const setMultiTab = (checked: boolean) => {
		setSettings({
			...settings,
			multiTab: checked,
		});
	};

	const setDarkSidebar = (checked: boolean) => {
		setSettings({
			...settings,
			darkSidebar: checked,
		});
	};

	//const style: React.CSSProperties = {
	//	backdropFilter: 'blur(20px)',
	//	//backgroundImage: `url("${CyanBlur}"), url("${RedBlur}")`,
	//	backgroundRepeat: 'no-repeat, no-repeat',
	//	//backgroundColor: Color(colorBgContainer).alpha(0.9).toString(),
	//	backgroundPosition: 'right top, left bottom',
	//	backgroundSize: '50, 50%',
	//};

	//const [isFullscreen, setIsFullscreen] = React.useState(screenfull.isFullscreen);
	//const toggleFullScreen = () => {
	//	if (screenfull.isEnabled) {
	//		screenfull.toggle();
	//		setIsFullscreen(!isFullscreen);
	//	}
	//};
	//
	//const layoutBackground = (layout: ThemeLayout) =>
	//	themeLayout === layout ? `linear-gradient(135deg, ${colorBgBase} 0%, ${colorPrimary} 100%)` : '#919eab';

	return (
		<>
			<div className="flex flex-col">
				<dl className="theme_setting">
					<dt>Mode</dt>
					<dd>
						<Segmented
							onChange={(val: string) => setThemeMode(GetEnumFromString(ThemeMode, val))}
							options={SegmentedOptionForThemeMode}
							value={themeMode}
						/>
					</dd>

					<dt>Stretch</dt>
					<dd>
						<Button color="default" variant="outlined" className="w-28" onClick={() => setThemeStretch(!themeStretch)}>
							{themeStretch ? (
								<div className="flex w-full items-center justify-between cursor-pointer transition_with_1">
									<LeftOutlined />
									<div className="flex flex-grow border-b border-dashed" />
									<RightOutlined />
								</div>
							) : (
								<div className="flex w-1/2 items-center justify-between cursor-pointer transition_with_1">
									<RightOutlined />
									<div className="flex-grow border-b border-dashed" />
									<LeftOutlined />
								</div>
							)}
						</Button>
					</dd>

					<dt>Compact</dt>
					<dd>
						<Switch
							checked={themeCompact}
							onChange={(checked) => setThemeCompact(checked)}
							checkedChildren="Use compact mode"
							unCheckedChildren="Don't use compact mode"
						/>
					</dd>

					<dt>Dark Sidebar & Footer</dt>
					<dd>
						<Switch
							checked={darkSidebar}
							onChange={(checked) => setDarkSidebar(checked)}
							checkedChildren="Use dark sidebar"
							unCheckedChildren="Don't use dark sidebar"
						/>
					</dd>

					<dt>Breadcrumb</dt>
					<dd>
						<Switch
							checked={breadCrumb}
							onChange={(checked) => setBreadCrumn(checked)}
							checkedChildren="Use breadcrumb"
							unCheckedChildren="Don't use breadcrumb"
						/>
					</dd>
					<dt>Multi Tab</dt>
					<dd>
						<Switch
							checked={multiTab}
							onChange={(checked) => setMultiTab(checked)}
							checkedChildren="Use multi tab"
							unCheckedChildren="Don't use multi tab"
						/>
					</dd>

					{/*
					<dt>Layout</dt>
					<dd>
						<div className="grid grid-cols-3 gap-4">
							<Card
								onClick={() => setThemeLayout(ThemeLayout.Vertical)}
								className="h-14 cursor-pointer"
								style={{ flexGrow: 1, flexShrink: 0 }}
								styles={{
									body: {
										padding: 0,
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										height: '100%',
									},
								}}
							>
								<div className="flex h-full w-7 flex-shrink-0 flex-col gap-1 p-1">
									<div
										className="h-2 w-2 flex-shrink-0 rounded"
										style={{
											background: layoutBackground(ThemeLayout.Vertical),
										}}
									/>
									<div
										className="h-1 w-full flex-shrink-0 rounded opacity-50"
										style={{
											background: layoutBackground(ThemeLayout.Vertical),
										}}
									/>
									<div
										className="h-1 max-w-[12px] flex-shrink-0 rounded opacity-20"
										style={{
											background: layoutBackground(ThemeLayout.Vertical),
										}}
									/>
								</div>
								<div className="h-full w-full flex-1 flex-grow p-1">
									<div
										className="h-full w-full rounded opacity-20"
										style={{
											background: layoutBackground(ThemeLayout.Vertical),
										}}
									/>
								</div>
							</Card>
							<Card
								onClick={() => setThemeLayout(ThemeLayout.Horizontal)}
								className="h-14 cursor-pointer"
								style={{ flexGrow: 1, flexShrink: 0 }}
								styles={{
									body: {
										padding: 0,
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										alignItems: 'center',
										height: '100%',
									},
								}}
							>
								<div className="flex h-4 w-full items-center gap-1  p-1">
									<div
										className="h-2 w-2 flex-shrink-0 rounded"
										style={{
											background: layoutBackground(ThemeLayout.Horizontal),
										}}
									/>
									<div
										className="h-1 w-4 flex-shrink-0 rounded opacity-50"
										style={{
											background: layoutBackground(ThemeLayout.Horizontal),
										}}
									/>
									<div
										className="h-1 w-3 flex-shrink-0 rounded opacity-20"
										style={{
											background: layoutBackground(ThemeLayout.Horizontal),
										}}
									/>
								</div>
								<div className="h-full w-full flex-1 flex-grow p-1">
									<div
										className="h-full w-full rounded opacity-20"
										style={{
											background: layoutBackground(ThemeLayout.Horizontal),
										}}
									/>
								</div>
							</Card>
							<Card
								onClick={() => setThemeLayout(ThemeLayout.Mini)}
								className="h-14 cursor-pointer"
								style={{ flexGrow: 1, flexShrink: 0 }}
								styles={{
									body: {
										padding: 0,
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										height: '100%',
									},
								}}
							>
								<div className="flex h-full flex-shrink-0 flex-col gap-1 p-1">
									<div className="h-2 w-2 flex-shrink-0 rounded" style={{ background: layoutBackground(ThemeLayout.Mini) }} />
									<div
										className="h-1 w-full flex-shrink-0 rounded opacity-50"
										style={{ background: layoutBackground(ThemeLayout.Mini) }}
									/>
									<div
										className="h-1 max-w-[12px] flex-shrink-0 rounded opacity-20"
										style={{ background: layoutBackground(ThemeLayout.Mini) }}
									/>
								</div>
								<div className="h-full w-full flex-1 flex-grow p-1">
									<div className="h-full w-full rounded opacity-20" style={{ background: layoutBackground(ThemeLayout.Mini) }} />
								</div>
							</Card>
						</div>
					</dd>
					*/}

					{/*
					<dt>Color</dt>
					<dd>
						{Object.entries(colorPrimarys).map(([preset, color]) => (
							<Card
								key={preset}
								className="flex h-14 w-full cursor-pointer items-center justify-center"
								style={{
									backgroundColor: themeColorPresets === preset ? `${color}14` : '',
								}}
								onClick={() => setThemeColorPresets(preset as ThemeColorPresets)}
							>
								<div style={{ color }}>
									<MdCircle
										style={{
											fontSize: themeColorPresets === preset ? 24 : 12,
										}}
									/>
								</div>
							</Card>
						))}
					</dd>
					*/}
				</dl>
				{/* theme presets 
				<div>
					<div className="mb-3 text-base font-semibold" style={{ color: colorTextSecondary }}>
						Presets
					</div>
					<div className="grid grid-cols-3 gap-x-4 gap-y-3">
					</div>
				</div>*/}
			</div>
		</>
	);
};
