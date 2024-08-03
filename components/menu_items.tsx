import React, { useState, ComponentProps } from 'react';
import Image from 'next/image';

import {
	UploadOutlined,
	LaptopOutlined,
	UserOutlined,
	VideoCameraOutlined,
	NotificationOutlined,
	AndroidOutlined,
	AppleOutlined,
	WindowsOutlined,
	IeOutlined,
	ChromeOutlined,
	GithubOutlined,
} from '@ant-design/icons';

import type { MenuProps } from 'antd';
import Link from 'next/link';

const items: MenuProps['items'] = ['1', '2', '3', '4', '5'].map((key) => ({
	key,
	label: `Main menu ${key}`,
}));

const items2: MenuProps['items'] = [
	UploadOutlined,
	LaptopOutlined,
	UserOutlined,
	VideoCameraOutlined,
	NotificationOutlined,
	AndroidOutlined,
	AppleOutlined,
	WindowsOutlined,
	IeOutlined,
	ChromeOutlined,
	GithubOutlined,
].map((icon, index) => {
	const key = String(index + 1);
	const icon_name = String(icon);

	return {
		key: `SubMemnu_${key}`,
		icon: React.createElement(icon),
		label: `Sub Memnu ${key}`,

		children: new Array(5).fill(null).map((_, j) => {
			const subKey = `SubMemnu_${key}_${j + 1}`;
			return {
				key: subKey,
				label: `${subKey}`,
			};
		}),
	};
});

items2.push({
	key: `SubMemnu_${items2.length + 1}`,
	//icon: React.createElement(icon),
	label: <Link href="/examples">Examples</Link>,

	children: [
		{
			key: `SubMemnu_${items2.length + 1}_antd_grid`,
			//icon: React.createE
			label: <Link href="/examples/grid">Grid</Link>,
		},
		{
			key: `SubMemnu_${items2.length + 1}_antd_upload`,
			//icon: React.createE
			label: <Link href="/examples/upload">Upload</Link>,
		},
		{
			key: `SubMemnu_${items2.length + 1}_antd_table`,
			//icon: React.createE
			label: <Link href="/examples/table">Table</Link>,
		},
	],
});

export { items as MenuItems_Main, items2 as MenuItems_Sub };
