'use client';

import React, { useRef, useState } from 'react';

import { Table, TablePaginationConfig, Divider, Tag, TableProps, UploadProps, Upload, Button, message, Tabs } from 'antd';
import { Col, Row } from 'antd/lib/grid';
import { ColumnsType, FilterValue } from 'antd/lib/table/interface';
import { UploadOutlined, InboxOutlined, AppleOutlined, AndroidOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';

import Image from 'next/image';
import ResponsiveAntdLayout from '@/components/layouts/antd';
import Dragger from 'antd/lib/upload/Dragger';

export default function Antd() {
	const { TabPane } = Tabs;

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
		{ href: '/examples/antd', title: 'Ant Design' },
	];
	const dummy_html = Array(150)
		.fill(null)
		.map((name, idx) => <div key="{idx}">Anted dummy html {idx + 1}</div>);

	const Upload_onChange = (info: any) => {
		if (info.file.status !== 'uploading') {
			console.log(info.file, info.fileList);
		}
		if (info.file.status === 'done') {
			message.success(`${info.file.name} file uploaded successfully`);
		} else if (info.file.status === 'error') {
			message.error(`${info.file.name} file upload failed.`);
		}
	};

	const upload_props: UploadProps = {
		name: 'file',
		//action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
		action: 'https://run.mocky.io/v3/1b049468-0a25-4998-95fe-e6942bb0e2b9',
		headers: {
			authorization: 'authorization-text',
		},
		onChange: Upload_onChange,
	};
	const upload_props_2: UploadProps = {
		name: 'file2',
		multiple: true,
		action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
		onChange: Upload_onChange,
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files);
		},
	};

	const columns = [
		{
			key: 'name',
			title: 'Name',
			dataIndex: 'name',
			render: (text: any) => <a>{text}</a>,
			filters: [
				{ text: 'Joe', value: 'Joe' },
				{ text: 'Jim', value: 'Jim' },
				{
					text: 'Submenu',
					value: 'Submenu',
					children: [
						{ text: 'Green', value: 'Green' },
						{ text: 'Black', value: 'Black' },
					],
				},
			],
			// specify the condition of filtering result
			// here is that finding the name started with `value`
			onFilter: (value: string, record: any) => record.name.indexOf(value) === 0,
			sorter: (a: any, b: any) => a.name.length - b.name.length,
			sortDirections: ['descend'],
		},
		{
			title: 'Age',
			dataIndex: 'age',
			key: 'age',
			defaultSortOrder: 'descend',
			sorter: (a: any, b: any) => a.age - b.age,
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
			filters: [
				{
					text: 'London',
					value: 'London',
				},
				{
					text: 'New York',
					value: 'New York',
				},
			],
			filterMultiple: false,
			onFilter: (value: string, record: any) => record.address.indexOf(value) === 0,
			sorter: (a: any, b: any) => a.address.length - b.address.length,
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Tags',
			key: 'tags',
			dataIndex: 'tags',
			render: (tags: any) => (
				<span>
					{tags.map((tag: string) => {
						let color = tag.length > 5 ? 'geekblue' : 'green';
						if (tag === 'loser') {
							color = 'volcano';
						}
						return (
							<Tag color={color} key={tag}>
								{tag.toUpperCase()}
							</Tag>
						);
					})}
				</span>
			),
		},
		{
			title: 'Action',
			key: 'action',
			render: (text: string, record: any) => (
				<span>
					<a>Invite {record.name}</a>
					<Divider type="vertical" />
					<a>Delete</a>
				</span>
			),
		},
	];

	const data = [
		{
			key: '1',
			name: 'John Brown',
			age: 32,
			address: 'New York No. 1 Lake Park',
			tags: ['nice', 'developer'],
		},
		{
			key: '2',
			name: 'Jim Green',
			age: 42,
			address: 'London No. 1 Lake Park',
			tags: ['loser'],
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sidney No. 1 Lake Park',
			tags: ['cool', 'teacher'],
		},
	];

	const Table_onChange = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any | any[], extra: any) => {
		console.log('params', pagination, filters, sorter, extra);
	};

	const initialTabPanes = [
		{
			title: '<span><AppleOutlined />Tab 1</span>',
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
		action === 'add' ? TabPanes_add() : TabPanes_remove(targetKey);
	};
	const TabPanes_onChange = (newActiveKey: string) => {
		setActiveKey(newActiveKey);
	};

	return (
		<ResponsiveAntdLayout breadcrumbItems={BreadcrumbItem}>
			<h2>Anted</h2>
			<ul>
				<li>
					<a className="" href="https://ant.design/">
						<span>https://ant.design/</span>
					</a>
				</li>
				<li>
					<a className="" href="https://ant.design/docs/react/introduce/">
						<span>Docs</span>
					</a>
				</li>
				<li>
					<a className="" href="https://ant.design/components/overview/">
						<span>Components</span>
					</a>
				</li>
			</ul>

			<div className="GridDemo">
				<h3>Grid</h3>
				<Row gutter={[8, 8]}>
					<Col span={8} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }}>
						1
					</Col>
					<Col span={8} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }}>
						2
					</Col>
					<Col span={8} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }}>
						3
					</Col>
					<Col span={8} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }}>
						4
					</Col>
					<Col span={8} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }}>
						5
					</Col>
					<Col span={8} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }}>
						6
					</Col>
				</Row>
				<Row gutter={[8, 8]}>
					<Col span={8} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }}>
						1
					</Col>
					<Col span={8} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }}>
						2
					</Col>
					<Col span={8} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }}>
						3
					</Col>
					<Col span={8} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }}>
						4
					</Col>
					<Col span={8} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }}>
						5
					</Col>
					<Col span={8} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }}>
						6
					</Col>
				</Row>
				<Row gutter={[8, 8]}>
					<Col span={8} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }}>
						1
					</Col>
					<Col span={8} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }}>
						2
					</Col>
					<Col span={8} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }}>
						3
					</Col>
					<Col span={8} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }}>
						4
					</Col>
					<Col span={8} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }}>
						5
					</Col>
					<Col span={8} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }}>
						6
					</Col>
				</Row>
			</div>

			<h3>Upload with button</h3>
			<Upload {...upload_props}>
				<Button icon={<UploadOutlined />}>Click to Upload</Button>
			</Upload>

			<h3>Upload with drag&drop</h3>
			<Dragger {...upload_props_2}>
				<p className="ant-upload-drag-icon">
					<InboxOutlined />
				</p>
				<p className="ant-upload-text">Click or drag file to this area to upload</p>
				<p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
			</Dragger>

			<h3>Table</h3>
			<Table columns={columns as ColumnsType<any>} dataSource={data} onChange={Table_onChange} size="small" />

			<h3>Tabs</h3>
			<Tabs defaultActiveKey="0" type="editable-card" onChange={TabPanes_onChange} activeKey={activeKey} onEdit={TabPanes_onEdit}>
				{panes.map((pane) => (
					<TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
						{pane.content}
					</TabPane>
				))}
			</Tabs>
			<hr />
			<Tabs defaultActiveKey="2">
				<TabPane
					key="1"
					tab={
						<span>
							<AppleOutlined />
							Tab 1
						</span>
					}
				>
					Tab 1
				</TabPane>
				<TabPane
					key="2"
					tab={
						<span>
							<AndroidOutlined />
							Tab 2
						</span>
					}
				>
					Tab 2
				</TabPane>
			</Tabs>

			{/*{dummy_html && (<>{dummy_html}</>)}*/}
		</ResponsiveAntdLayout>
	);
}
