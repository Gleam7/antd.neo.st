import React from 'react';
import Link from 'next/link';

import { getServerSession } from 'next-auth';

import { SubMenuType } from 'antd/es/menu/interface';

import { AntDesignOutlined, ControlOutlined, ExperimentOutlined, HomeOutlined } from '@ant-design/icons';

import type { ItemType as BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';

import { authOptions } from '@/lib/auth';

/*****************************************************************************/
export interface SubMenuTypeWithRoles extends SubMenuType {
	roles?: string[];
}
const setLabelLink = (items: SubMenuTypeWithRoles[]): SubMenuTypeWithRoles[] => {
	//console.log('setLabelLink::items: ', items);
	items = items.map((data) => {
		//console.log('idx: ', idx, 'data:', data);

		if (data) {
			switch (data.key) {
				case '/admin':
					data.label = <Link href={'/admin'}>{data.label}</Link>;
					break;
				case '/demo':
					data.label = <Link href={'/demo/about'}>{data.label}</Link>;
					break;
				case '/admin/system':
					data.label = data.label;
					break;
				default:
					data.label = <Link href={data.key}>{data.label}</Link>;
					break;
			}

			if (data.children) {
				data.children = setLabelLink(data.children as SubMenuType[]);
			}
		}

		return data;
	});

	return items;
};
const findMenuItemWithParents = (menuItems: SubMenuTypeWithRoles[], targetKey: string): BreadcrumbItemType[] | null => {
	for (const item of menuItems) {
		if (item) {
			if (item.key === targetKey) {
				return [item as BreadcrumbItemType]; // 찾은 항목을 배열로 반환
			}
			if (item.children) {
				const result = findMenuItemWithParents(item.children as SubMenuType[], targetKey);
				if (result) {
					return [item as BreadcrumbItemType, ...result]; // 부모 항목 포함해서 반환
				}
			}
		}
	}
	return null; // 해당 key가 없으면 null 반환
};
/*****************************************************************************/
export const GetMenuItemsSources = () => {
	return [
		{
			key: '/',
			label: 'Home',
			title: 'Home',
			value: 'Home',
			icon: <HomeOutlined />,
			children: [
				{
					key: '/admin',
					label: 'Admin',
					title: 'Admin',
					value: 'Admin',
					icon: <ControlOutlined />,
					roles: ['admin'],
					children: [
						{
							key: '/admin/system',
							label: 'System Management',
							title: 'System Management',
							value: 'System Management',
							children: [{ key: '/admin/system/auth-group', label: 'Auth Group', title: 'Auth Group', value: 'Auth Group' }],
						},
					],
				},
				{
					key: '/demo',
					label: 'Demo Pages',
					title: 'Demo Pages',
					value: 'Demo Pages',
					icon: <ExperimentOutlined />,
					children: [
						{ key: '/demo/about', label: 'About', title: 'About', value: 'About' },
						{
							key: '/demo/antd',
							label: 'Anted',
							title: 'Anted',
							value: 'Anted',
							icon: <AntDesignOutlined />,
							children: [
								{ key: '/demo/antd/collapse', label: 'Collapse', title: 'Collapse', value: 'Collapse' },
								{ key: '/demo/antd/tabs', label: 'Tabs', title: 'Tabs', value: 'Tabs' },
								{ key: '/demo/antd/upload', label: 'Upload', title: 'Upload', value: 'Upload' },
							],
						},
						{ key: '/demo/font', label: 'Font styles', title: 'Font styles', value: 'Font styles' },
						{ key: '/demo/table', label: 'Table', title: 'Table', value: 'Table' },
						{
							key: '/demo/table2',
							label: 'Table with Search',
							title: 'Table with Search',
							value: 'Table with Search',
						},
						{ key: '/demo/movies', label: 'Movies', title: 'Movies', value: 'Movies' },
						{ key: '/demo/lazy', label: 'Lazy', title: 'Lazy', value: 'Lazy' },
						{ key: '/demo/image', label: 'Image', title: 'Image', value: 'Image' },
					],
				},
			],
		},
		/*
	
				{
					key: '/system-management',
					label: '시스템 관리',
					title: '시스템 관리',
					value: '시스템 관리',
					icon: <ControlOutlined />,
					children: [
						{
							key: '/system-management/auth-group-management',
							label: '권한 그룹 관리',
							title: '권한 그룹 관리',
							value: '권한 그룹 관리',
							icon: <AntDesignOutlined />,
						},
						{
							key: '/system-management/billcode-management',
							label: '사건 번호 (Billcode) 관리',
							title: '사건 번호 (Billcode) 관리',
							value: '사건 번호 (Billcode) 관리',
							icon: <AntDesignOutlined />,
						},
					],
				},
				{ key: '/search', label: '검색', title: '검색', value: '검색', icon: <SearchOutlined /> },
				
				{
					key: '/demo',
					label: 'Demo Pages',
					title: 'Demo Pages',
					value: 'Demo Pages',
					icon: <AntDesignOutlined />,
					children: [{ key: '/demo/movies', label: 'Movies', title: 'Movies', value: 'Movies', icon: <AntDesignOutlined /> }],
				},
		{ key: 'demo∋antd', label: 'Antd', icon: <AntDesignOutlined /> },
		{ key: 'demo∋chart', label: 'ChartDemo', icon: <AntDesignOutlined /> },
		{ key: 'demo∋loadingpage', label: 'Loading', icon: <LoadingOutlined /> },
		{ key: 'demo∋api_test', label: 'API Demo', icon: <ApiOutlined /> },
		
		{ key: 'header_menu_item_02', label: 'Header Menu 02', icon: <AntDesignOutlined /> },
		{ key: 'header_menu_item_03', label: 'Header Menu 03', icon: <AntDesignOutlined /> },
		{ key: 'header_menu_item_04', label: 'Header Menu 04', icon: <AntDesignOutlined /> },
		{ key: 'header_menu_item_05', label: 'Header Menu 05', icon: <AntDesignOutlined /> },
		{ key: 'header_menu_item_06', label: 'Header Menu 06', icon: <AntDesignOutlined /> },
		{ key: 'header_menu_item_07', label: 'Header Menu 07', icon: <AntDesignOutlined /> },
		{ key: 'header_menu_item_08', label: 'Header Menu 08', icon: <AntDesignOutlined /> },
		{ key: 'header_menu_item_09', label: 'Header Menu 09', icon: <AntDesignOutlined /> },
		{ key: 'header_menu_item_10', label: 'Header Menu 10', icon: <AntDesignOutlined /> },
		*/
	];
};
export const GetMenuItems = (): SubMenuTypeWithRoles[] => {
	return setLabelLink(GetMenuItemsSources());
};
export const GetHeaderMenuItems = (): SubMenuType[] => {
	const menu_items: SubMenuType = GetMenuItems()[0];
	//console.log('GetHeaderMenuItems::menu_items: ', menu_items);

	const fist_child_items = Object.assign([], menu_items.children).map((data: SubMenuType) => {
		const item = { ...data };
		item.key = `header_menu_items_${item.key.split('/').join('_')}`;
		item.children = undefined!;
		//const session = getServerSession(authOptions);
		//item.onClick = HeaderMenuItem_onClick;
		return item;
	});
	return fist_child_items;
};
export const GetAsyncHeaderMenuItems = async (): Promise<SubMenuType[]> => {
	const session = await getServerSession(authOptions);
	const menu_items: SubMenuType = GetMenuItems()[0];
	//console.log('GetHeaderMenuItems::menu_items: ', menu_items);

	const fist_child_items = Object.assign([], menu_items.children).map((data: SubMenuTypeWithRoles): SubMenuType => {
		const item = { ...data };
		item.key = `header_menu_items_${item.key.split('/').join('_')}`;
		item.children = undefined!;
		return item.roles?.some((role: string) => session?.user.roles.includes(role)) !== false ? item : ({} as SubMenuType);
	});
	return fist_child_items;
};
export const GetSubMenuItems = (current_path: string): SubMenuType[] => {
	const menu_items: SubMenuType = GetMenuItems()[0];
	let sub_menu_items: SubMenuType[];

	current_path = current_path || '/';
	//console.log('GetSubMenuItems::current_path: ', current_path);
	//console.log('GetSubMenuItems::menu_items: ', menu_items);

	if (current_path === '/') {
		menu_items.children = null!;
		sub_menu_items = [menu_items];
	} else {
		//console.log('GetSubMenuItems::menu_items.children: ', menu_items.children);
		sub_menu_items = Object.assign([], menu_items.children);

		if (current_path.startsWith('/demo') || current_path.startsWith('/admin')) {
			const current_path_key = current_path.split('/')[1];
			sub_menu_items = sub_menu_items.filter((item) => item !== undefined && item?.key === `/${current_path_key}`)[0].children as SubMenuType[];
		} else {
			sub_menu_items = sub_menu_items.filter((item) => item !== undefined && item?.key === current_path);
		}
	}

	sub_menu_items = sub_menu_items.map((data: SubMenuType) => {
		const item = { ...data };
		item.key = `sub_menu_items_${item.key.split('/').join('_')}`;
		return item;
	});

	//console.log('GetSubMenuItems::sub_menu_items: ', sub_menu_items);

	return sub_menu_items;
};
export const GetBreadcrumbItems = (current_path: string): BreadcrumbItemType[] => {
	const menu_items: SubMenuType[] = GetMenuItems();
	let breadcrumb_items: BreadcrumbItemType[];
	current_path = current_path || '/';

	breadcrumb_items = findMenuItemWithParents(menu_items, current_path) as BreadcrumbItemType[];

	breadcrumb_items = breadcrumb_items
		.map((data) => {
			if (data && data.children) {
				data.children = undefined!;
			}
			return data;
		})
		.filter((item) => {
			return item != null;
		});

	//console.log('GetBreadcrumbItems::breadcrumb_items: ', breadcrumb_items);

	return breadcrumb_items;
};
