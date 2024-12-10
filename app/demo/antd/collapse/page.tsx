'use client';

import { CSSProperties } from 'react';

import type { NextPage } from 'next';

import { Collapse, theme } from 'antd';

import { PageHeader } from '@/components';
import { CaretRightOutlined } from '@ant-design/icons';

import type { CollapseProps } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items = [
	{
		key: '1',
		label: 'This is panel header with arrow icon',
		children: (
			<p>
				This is panel 1<br />
				{text}
			</p>
		),
	},
	{
		key: '2',
		label: 'This is panel header with no arrow icon',
		children: (
			<p>
				This is panel 2<br />
				{text}
			</p>
		),
		showArrow: false,
	},
];

const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
	{
		key: '1',
		label: 'This is panel header 1',
		children: <p>{text}</p>,
		style: panelStyle,
	},
	{
		key: '2',
		label: 'This is panel header 2',
		children: <p>{text}</p>,
		style: panelStyle,
	},
	{
		key: '3',
		label: 'This is panel header 3',
		children: <p>{text}</p>,
		style: panelStyle,
	},
];

const Page: NextPage = () => {
	const { token } = theme.useToken();

	const panelStyle: React.CSSProperties = {
		marginBottom: 24,
		background: token.colorFillAlter,
		borderRadius: token.borderRadiusLG,
		border: 'none',
	};

	const onCollapseChange = (key: string[]) => {
		console.log(key);
	};
	return (
		<>
			<PageHeader>Collapse</PageHeader>
			<h4 className="ant-typography">Collapse panel</h4>
			<div className="demo_example_wrap">
				<Collapse defaultActiveKey={['1']} onChange={onCollapseChange} items={items} />
			</div>
			<h4 className="ant-typography">Custom styled panel</h4>
			<div className="demo_example_wrap">
				<Collapse
					bordered={false}
					defaultActiveKey={['1']}
					expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
					items={getItems(panelStyle)}
				/>
			</div>
		</>
	);
};

export default Page;
