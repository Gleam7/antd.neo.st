'use client';

import React from 'react';

//import type { Metadata } from 'next';

import { Button, Drawer, Form, Input, Space, Table, Typography } from 'antd';
import { AnyObject } from 'antd/es/_util/type';

//import { NoSSR } from '@/components/common/NoSSR';

import { SampleSearchResult } from '@/types';
import { GetSampleSearchResultData } from '@/app/api/SampleSearch';
import { CloseOutlined, DownloadOutlined, SaveOutlined, UndoOutlined } from '@ant-design/icons';

import { PageHeader } from '@/components';

//export const metadata: Metadata = {
//	title: 'Admin Table',
//};

//const ColumnRender01 = (text: AnyObject, record: SampleSearchResult) => {
const ColumnRender01 = (text: any) => {
	return <span>{text}</span>; //<NoSSR></NoSSR>;
};
const ColumnRender02 = (text: any) => {
	return (
		<a>{text}</a> //<NoSSR></NoSSR>
	);
};

const Page = () => {
	const [IsShowDetail, setIsShowDetail] = React.useState<boolean>(false);
	const [IsSearchResult, setIsSearchResult] = React.useState<boolean>(false);
	const [IsDetailLoading, setIsDetailLoading] = React.useState<boolean>(false);
	const [TableDataSource, setTableDataSource] = React.useState<SampleSearchResult[]>([] as SampleSearchResult[]);
	const [SelectedDetailItem, setSelectedDetailItem] = React.useState<SampleSearchResult>({} as SampleSearchResult);

	//const [frmSearch] = Form.useForm();
	const [frmDetailEdit] = Form.useForm();

	const breadcrumbItems = [
		{
			title: 'Home',
		},
		{
			title: <a href="/demo/about">Demo Pages</a>,
		},
		{
			title: 'Table',
		},
	];

	const onTableRowActions = (row: AnyObject, idx: number | undefined) => {
		return {
			onClick: () => {
				console.log('row: ', row, ', idx: ', idx);

				setIsDetailLoading(true);
				setSelectedDetailItem(row as SampleSearchResult);

				// Simple loading mock. You should add cleanup logic in real world.
				setTimeout(() => {
					setIsDetailLoading(false);
					setIsShowDetail(true);
				}, 500);
			},
		};
	};
	const onDetailCloseButtonClick = () => {
		setSelectedDetailItem({} as SampleSearchResult);
		setIsDetailLoading(false);
		setIsShowDetail(false);
	};

	React.useEffect(() => {
		setIsSearchResult(true);
		setTimeout(() => {
			GetSampleSearchResultData()
				.then((data) => setTableDataSource(data.data))
				.finally(() => setIsSearchResult(false));
		}, 1000);
	}, []);

	return (
		<>
			<PageHeader breadcrumbProps={{ items: breadcrumbItems }}>Page Header</PageHeader>
			<Space style={{ width: '100%', justifyContent: 'end', margin: '1em 0 .5em 0' }} align="center">
				<Button icon={<DownloadOutlined />}>Download</Button>
			</Space>
			<Table size="middle" scroll={{ x: 'max-content', y: 500 }} loading={IsSearchResult} dataSource={TableDataSource} onRow={onTableRowActions}>
				<Table.Column render={ColumnRender01} width={150} dataIndex="key" key="key" title="Key" align="center" />
				<Table.Column render={ColumnRender01} width={150} dataIndex="Column01" key="Column01" title="Column01" />
				<Table.Column render={ColumnRender02} width={150} dataIndex="Column02" key="Column02" title="Column02" />
				<Table.Column render={ColumnRender01} width={150} dataIndex="Column03" key="Column03" title="Column03" />
				<Table.Column render={ColumnRender01} width={150} dataIndex="Column04" key="Column04" title="Column04" />
				<Table.Column render={ColumnRender01} width={150} dataIndex="Column05" key="Column05" title="Column05" />
				<Table.Column render={ColumnRender01} minWidth={300} dataIndex="description" key="description" title="설명" />
			</Table>
			<Drawer
				closable={false}
				destroyOnClose
				width={'50%'}
				title={
					<Space align="center" wrap={true} style={{ margin: '.5em 0' }}>
						<Typography.Title level={4}>Data Modify</Typography.Title>
						<Typography.Text disabled>{SelectedDetailItem?.Column01}</Typography.Text>
					</Space>
				}
				placement="right"
				open={IsShowDetail}
				loading={IsDetailLoading}
				extra={
					<Space>
						<Button
							type="primary"
							onClick={() => {
								frmDetailEdit.submit();
							}}
							icon={<SaveOutlined />}
						>
							Save
						</Button>
						<Button
							htmlType="reset"
							icon={<UndoOutlined />}
							onClick={() => {
								frmDetailEdit.resetFields();
							}}
						>
							Reset
						</Button>
						<Button icon={<CloseOutlined />} onClick={onDetailCloseButtonClick}>
							Cancel
						</Button>
					</Space>
				}
			>
				<Form
					form={frmDetailEdit}
					name="frmDetailEdit"
					labelAlign="right"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					onFinish={onDetailCloseButtonClick}
					initialValues={SelectedDetailItem}
				>
					<Form.Item name="key" label="Key" required rules={[{ required: true, message: 'key is required item' }]}>
						<Input placeholder="Key" readOnly />
					</Form.Item>
					<Form.Item name="Column01" label="Column01" required rules={[{ required: true, message: 'Column01 is required item' }]}>
						<Input placeholder="Column01" readOnly />
					</Form.Item>
					<Form.Item name="Column02" label="Column02">
						<Input placeholder="Column02" />
					</Form.Item>
					<Form.Item name="Column03" label="Column03">
						<Input placeholder="Column03" />
					</Form.Item>
					<Form.Item name="Column04" label="Column04">
						<Input placeholder="Column04" />
					</Form.Item>
					<Form.Item name="Column05" label="Column05">
						<Input placeholder="Column05" />
					</Form.Item>
					<Form.Item name="description" label="Description">
						<Input.TextArea rows={5} placeholder="Description" />
					</Form.Item>
				</Form>
			</Drawer>
		</>
	);
};

export default Page;
