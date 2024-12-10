'use client';

import { useRef, useState } from 'react';

import type { NextPage } from 'next';

import { Tabs } from 'antd';

import { PageHeader } from '@/components';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';

const Page: NextPage = () => {
	const initialTabPanes = [
		{
			title: 'Tab 1',
			icon: <AppleOutlined />,
			content: 'Content of Tab 1',
			key: '1',
		},
		{
			title: 'Tab 2',
			content: 'Content of Tab 2',
			key: '2',
		},
		{
			title: 'Tab 3',
			content: 'Content of Tab 3',
			key: '3',
			closable: false,
		},
	];
	const [activeKey, setActiveKey] = useState(initialTabPanes[0].key);
	const [panes, setPanes] = useState(initialTabPanes);

	const newTabIndex = useRef(0);
	const TabPanes_add = () => {
		const newActiveKey = `newTab${newTabIndex.current++}`;
		const newPanes = [...panes];

		newPanes.push({ title: 'New Tab', content: 'Content of new Tab', key: newActiveKey });
		setPanes(newPanes);
		setActiveKey(newActiveKey);
	};
	const TabPanes_remove = (targetKey: string) => {
		let newActiveKey = activeKey;
		let lastIndex = -1;
		panes.forEach((pane, i) => {
			if (pane.key === targetKey) {
				lastIndex = i - 1;
			}
		});
		const newPanes = panes.filter((pane) => pane.key !== targetKey);

		if (newPanes.length && newActiveKey === targetKey) {
			if (lastIndex >= 0) {
				newActiveKey = newPanes[lastIndex].key;
			} else {
				newActiveKey = newPanes[0].key;
			}
		}

		setPanes(newPanes);
		setActiveKey(newActiveKey);
	};
	const TabPanes_onEdit = (targetKey: any, action: string) => {
		if (action === 'add') {
			TabPanes_add();
		} else {
			TabPanes_remove(targetKey);
		}
	};
	const TabPanes_onChange = (newActiveKey: string) => {
		setActiveKey(newActiveKey);
	};

	return (
		<>
			<PageHeader>Tabs</PageHeader>
			<h4 className="ant-typography">Tabs 1</h4>
			<div className="demo_example_wrap">
				<Tabs defaultActiveKey="1" type="editable-card" onChange={TabPanes_onChange} activeKey={activeKey} onEdit={TabPanes_onEdit}>
					{panes.map((pane) => (
						<Tabs.TabPane tab={pane.title} key={pane.key} closable={pane.closable} icon={pane.icon}>
							{pane.content}
						</Tabs.TabPane>
					))}
				</Tabs>
			</div>
			<h4 className="ant-typography">Tabs 2</h4>
			<div className="demo_example_wrap">
				<Tabs defaultActiveKey="2">
					<Tabs.TabPane key="1" tab={'Tab 1'} icon={<AppleOutlined />}>
						Tab 1
					</Tabs.TabPane>
					<Tabs.TabPane key="2" tab={'Tab 2'} icon={<AndroidOutlined />}>
						Tab 2
					</Tabs.TabPane>
				</Tabs>
			</div>
		</>
	);
};

export default Page;
