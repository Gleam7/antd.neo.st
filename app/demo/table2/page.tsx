'use client';

import React from 'react';

import { Button, Form, Image, Input, Skeleton, Space, Table } from 'antd';

import { DownloadOutlined, FileExcelOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';

import { EnvVars, ExcelDownload } from '@/lib';
import { PageHeader } from '@/components';
import { GetSpaceflightNewsData } from '@/app/api/SpaceflightNewsData';

import type { TablePaginationConfig } from 'antd';

//type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

//export const metadata: Metadata = {
//	title: 'Admin Table',
//};

const PaginationConfig = {
	current: 1,
	pageSize: 10,
	total: 10,
	defaultPageSize: 10,
	hideOnSinglePage: true,
	pageSizeOptions: [10, 15, 20, 30, 50, 100],
	showTotal: (total: number, range: [number, number]): JSX.Element => (
		<>
			{range[0].toLocaleString()}-{range[1].toLocaleString()} of {total.toLocaleString()} items
		</>
	),
} as TablePaginationConfig;
const ColumnRender01 = (text: any, row: any) => {
	return (
		<a href={row.url} target="_blank">
			{text}
		</a>
	);
};
const ColumnRender02 = (text: any) => {
	const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간

	const date = new Date(text);

	return <>{new Date(date.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5)}</>;
};
const ColumnRender03 = (text: any, row: any) => {
	//return <img src={text} alt={row.title} />;
	return (
		<Image
			key={row.id}
			src={text}
			alt={row.title}
			style={{ objectFit: 'cover', borderRadius: '.3rem', overflow: 'hidden', maxWidth: '45px', maxHeight: '1.2rem' }}
			placeholder={<Skeleton.Image active={true} style={{ width: '30px', height: '1.2rem' }} />}
			fallback={EnvVars.ImgfallbackString}
		/>
	);
};

const Page = () => {
	const [frmListDataSearch] = Form.useForm();
	const [IsSearchResultLoading, setIsSearchResultLoading] = React.useState<boolean>(false);
	const [TableDataSource, setTableDataSource] = React.useState<any[]>([]);

	const [tablePaginationConfig, setTablePaginationConfig] = React.useState<TablePaginationConfig>(PaginationConfig);
	const onListDataSearchSubmit = (values: any) => {
		console.log('Received values of Cats search form: ', values);
		setIsSearchResultLoading(true);

		const limit = tablePaginationConfig.pageSize || 10;
		const offset = limit * ((tablePaginationConfig.current || 1) - 1); // pagesize * (page - 1)
		const keyword = values.keyword || '';
		console.log('limit: ', limit, ', offset: ', offset, ', keyword:', keyword, ', tablePaginationConfig:', tablePaginationConfig);

		GetSpaceflightNewsData(limit, offset, keyword)
			.then((data) => {
				//console.log(data);
				tablePaginationConfig.total = data.result_count;
				setTableDataSource(data.data);
			})
			.finally(() => {
				setIsSearchResultLoading(false);
				// Resetting window's offsetTop so as to display react-virtualized demo underfloor.
				// In real scene, you can using public method of react-virtualized:
				// https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
				window.dispatchEvent(new Event('resize'));
			});
	};

	const onTableChange = (pagination: TablePaginationConfig) => {
		console.log(pagination);
		pagination.showTotal = PaginationConfig.showTotal;
		setTablePaginationConfig(pagination);
		//onListDataSearchSubmit({ current: pagination.current });
		//onListDataSearchSubmit({});
	};

	React.useEffect(() => {
		onListDataSearchSubmit({});
	}, [tablePaginationConfig]);

	return (
		<>
			<PageHeader>Table with server side Search</PageHeader>
			<Form
				form={frmListDataSearch}
				name="frmListDataSearch"
				onFinish={onListDataSearchSubmit}
				layout="inline"
				labelAlign="right"
				className="search_form"
			>
				<Form.Item name="keyword" label="Search keyword">
					<Input placeholder="(Title) Search keyword" />
				</Form.Item>
				<Form.Item>
					<Space size="small">
						<Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
							Search
						</Button>
						<Button htmlType="reset" icon={<UndoOutlined />}>
							Reset
						</Button>
					</Space>
				</Form.Item>
			</Form>
			<Space style={{ width: '100%', justifyContent: 'end', margin: '1em 0 .5em 0' }} align="center">
				<Button icon={<DownloadOutlined />}>Download</Button>
				<Button icon={<FileExcelOutlined />} onClick={() => ExcelDownload(TableDataSource)}>
					Excel Download
				</Button>
			</Space>
			<Image.PreviewGroup>
				<Table
					size="middle"
					scroll={{ x: 'max-content', y: 'calc(100vh - 370px)' }}
					rowKey={(record) => record.id}
					loading={IsSearchResultLoading}
					dataSource={TableDataSource}
					pagination={tablePaginationConfig}
					expandable={{
						expandedRowRender: (row) => {
							const { title, image_url, ...new_row } = row;
							return (
								<p>
									<img src={image_url} alt={title} />
									{row.summary}
									<pre>{JSON.stringify(new_row, null, 4)}</pre>
								</p>
							);
						},
						rowExpandable: () => true,
					}}
					onChange={onTableChange}
				>
					<Table.Column width={100} fixed="left" dataIndex="id" key="id" title="ID" align="center" />
					<Table.Column render={ColumnRender03} width={50} fixed="left" dataIndex="image_url" key="image_url" title="-" align="center" />
					<Table.Column render={ColumnRender01} minWidth={300} dataIndex="title" key="title" title="Title" />
					<Table.Column render={ColumnRender02} width={150} dataIndex="updated_at" key="updated_at" title="Updated" align="center" />
				</Table>
			</Image.PreviewGroup>
		</>
	);
};

export default Page;
