'use client';

import React, { useState } from 'react';
import { Col, Row, Slider, Collapse, Divider, Card } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

import ResponsiveAntdLayout from '@/components/layouts/antd';

const gutters: Record<PropertyKey, number> = {};
const vgutters: Record<PropertyKey, number> = {};
const colCounts: Record<PropertyKey, number> = {};
const rowCounts: Record<PropertyKey, number> = {};
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
	{ href: '/examples/grid', title: 'Grid' },
];

Array.from({ length: 11 }, (_, i) => i * 7).forEach((value, i) => {
	gutters[i] = value;
	vgutters[i] = value;
});
[1, 2, 3, 4, 6, 8, 12].forEach((value, i) => {
	colCounts[i] = value;
	rowCounts[i] = value;
});

const AntdGridDemo: React.FC = () => {
	const [gutterKey, setGutterKey] = useState(1);
	const [vgutterKey, setVgutterKey] = useState(1);
	const [colCountKey, setColCountKey] = useState(2);
	const [rowCountKey, setRowCountKey] = useState(2);

	const cols = [];
	const rows1 = [];
	const rows2 = [];
	const colCount = colCounts[colCountKey];
	const rowCount = rowCounts[rowCountKey];
	let colCode = '';
	let colCode1 = '';
	let colCode2 = '';
	for (let i = 0; i < colCount; i++) {
		cols.push(
			<Col key={i.toString()} span={24 / colCount}>
				<div>Column {i + 1}</div>
			</Col>
		);
		colCode += `  <Col span={${24 / colCount}} />\n`;
	}
	for (let j = 0; j < rowCount; j++) {
		rows1.push(cols);
		rows2.push(<Row gutter={[gutters[gutterKey], vgutters[vgutterKey]]}>{cols}</Row>);

		colCode1 += (j > 0 ? '\n' : '') + colCode;

		colCode2 += `<Row gutter={[${gutters[gutterKey]}, ${vgutters[vgutterKey]}]}>\n`;
		colCode2 += colCode;
		colCode2 += `</Row>\n`;
	}
	const layoutProps = {};

	const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
	return (
		<ResponsiveAntdLayout props={layoutProps} breadcrumbItems={BreadcrumbItem}>
			<h3>Options</h3>
			<Row gutter={[8, 8]}>
				<Col span={12}>
					<Card title="Horizontal Gutter (px)" size="small">
						<Slider
							min={0}
							max={Object.keys(gutters).length - 1}
							value={gutterKey}
							onChange={setGutterKey}
							marks={gutters}
							step={null}
							tooltip={{ formatter: (value) => gutters[value as number] }}
						/>
					</Card>
				</Col>
				<Col span={12}>
					<Card title="Vertical Gutter (px)" size="small">
						<Slider
							min={0}
							max={Object.keys(vgutters).length - 1}
							value={vgutterKey}
							onChange={setVgutterKey}
							marks={vgutters}
							step={null}
							tooltip={{ formatter: (value) => vgutters[value as number] }}
						/>
					</Card>
				</Col>
				<Col span={12}>
					<Card title="Column Count" size="small">
						<Slider
							min={0}
							max={Object.keys(colCounts).length - 1}
							value={colCountKey}
							onChange={setColCountKey}
							marks={colCounts}
							step={null}
							tooltip={{ formatter: (value) => colCounts[value as number] }}
						/>
					</Card>
				</Col>
				<Col span={12}>
					<Card title="Row Count" size="small">
						<Slider
							min={0}
							max={Object.keys(rowCounts).length - 1}
							value={rowCountKey}
							onChange={setRowCountKey}
							marks={rowCounts}
							step={null}
							tooltip={{ formatter: (value) => rowCounts[value as number] }}
						/>
					</Card>
				</Col>
			</Row>
			<hr style={{ margin: '1rem 0' }} />
			<h3>Result</h3>
			<div className="GridDemo">
				<Row gutter={[gutters[gutterKey], vgutters[vgutterKey]]}>{rows1}</Row>
				<Divider orientation="left">Another Row:</Divider>
				{rows2}
			</div>
			<h3>Code</h3>
			<Collapse
				size="small"
				defaultActiveKey={['1']}
				items={[
					{
						key: '1',
						label: 'Code of Row',
						children: (
							<>
								<pre className="demo-code">{`<Row gutter={[${gutters[gutterKey]}, ${vgutters[vgutterKey]}]}>\n${colCode1}</Row>`}</pre>
							</>
						),
					},
					{
						key: '2',
						label: 'Code of Another Row',
						children: (
							<>
								<pre className="demo-code">{`${colCode2}`}</pre>
							</>
						),
					},
				]}
			/>
		</ResponsiveAntdLayout>
	);
};

export default AntdGridDemo;
