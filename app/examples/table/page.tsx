'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';

import { Space, Button, Table, Form, Radio, Switch, Popconfirm, Input } from 'antd';
import type { TableColumnsType, GetProp, RadioChangeEvent, TableProps, GetRef, InputRef } from 'antd';

import { HomeOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';

import ResponsiveAntdLayout from '@/components/layouts/antd';
/*****************************************************************************/
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
	{ href: '/examples/antd/table', title: 'Table' },
];
const layoutProps = {};
/*****************************************************************************/
interface DataType {
	key: string;
	name: string;
	age: number;
	address: string;
	description?: string;
}
type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

type SizeType = TableProps['size'];
type ColumnsType<T extends object> = GetProp<TableProps<T>, 'columns'>;
type TablePagination<T extends object> = NonNullable<Exclude<TableProps<T>['pagination'], boolean>>;
type TablePaginationPosition = NonNullable<TablePagination<any>['position']>[number];
type ExpandableConfig<T extends object> = TableProps<T>['expandable'];
type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

type FormInstance<T> = GetRef<typeof Form<T>>;
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;
type EditableTableProps = Parameters<typeof Table>[0];

interface EditableRowProps {
	index: number;
}
interface EditableCellProps {
	title: React.ReactNode;
	editable: boolean;
	dataIndex: keyof DataType;
	record: DataType;
	handleSave: (record: DataType) => void;
}

const data: DataType[] = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
	},
	{
		key: '2',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
	},
	{
		key: '3',
		name: 'Joe Black',
		age: 32,
		address: 'Sydney No. 1 Lake Park',
	},
	{
		key: '4',
		name: 'Jim Red',
		age: 32,
		address: 'London No. 2 Lake Park',
	},
];
const columns2: ColumnsType<DataType> = [
	{
		title: 'Name',
		dataIndex: 'name',
	},
	{
		title: 'Age',
		dataIndex: 'age',
		sorter: (a, b) => a.age - b.age,
	},
	{
		title: 'Address',
		dataIndex: 'address',
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
		onFilter: (value, record) => record.address.indexOf(value as string) === 0,
	},
	{
		title: 'Action',
		key: 'action',
		sorter: true,
		render: () => (
			<Space size="middle">
				<a>Delete</a>
				<a>
					<Space>
						More actions
						<DownOutlined />
					</Space>
				</a>
			</Space>
		),
	},
];
const data2: DataType[] = [];

for (let i = 1; i <= 10; i++) {
	data2.push({
		key: String(i),
		name: 'John Brown',
		age: Number(`${i}2`),
		address: `New York No. ${i} Lake Park`,
		description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
	});
}

const defaultExpandable = { expandedRowRender: (record: DataType) => <p>{record.description}</p> };
const EditableContext = React.createContext<FormInstance<any> | null>(null);
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
	const [form] = Form.useForm();
	return (
		<Form form={form} component={false}>
			<EditableContext.Provider value={form}>
				<tr {...props} />
			</EditableContext.Provider>
		</Form>
	);
};
const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
	title,
	editable,
	children,
	dataIndex,
	record,
	handleSave,
	...restProps
}) => {
	const [editing, setEditing] = useState(false);
	const inputRef = useRef<InputRef>(null);
	const form = useContext(EditableContext)!;

	useEffect(() => {
		if (editing) {
			inputRef.current?.focus();
		}
	}, [editing]);

	const toggleEdit = () => {
		setEditing(!editing);
		form.setFieldsValue({ [dataIndex]: record[dataIndex] });
	};

	const save = async () => {
		try {
			const values = await form.validateFields();

			toggleEdit();
			handleSave({ ...record, ...values });
		} catch (errInfo) {
			console.log('Save failed:', errInfo);
		}
	};

	let childNode = children;

	if (editable) {
		childNode = editing ? (
			<Form.Item style={{ margin: 0 }} name={dataIndex} rules={[{ required: true, message: `${title} is required.` }]}>
				<Input ref={inputRef} onPressEnter={save} onBlur={save} />
			</Form.Item>
		) : (
			<div className="editable-cell-value-wrap" style={{ paddingInlineEnd: 24 }} onClick={toggleEdit}>
				{children}
			</div>
		);
	}

	return <td {...restProps}>{childNode}</td>;
};

const defaultTitle = () => 'Here is title';
const defaultFooter = () => 'Here is footer';
/*****************************************************************************/
const AntdTableDemo: React.FC = () => {
	const [filteredInfo, setFilteredInfo] = useState<Filters>({});
	const [sortedInfo, setSortedInfo] = useState<Sorts>({});

	const [bordered, setBordered] = useState(false);
	const [loading, setLoading] = useState(false);
	const [size, setSize] = useState<SizeType>('large');
	const [expandable, setExpandable] = useState<ExpandableConfig<DataType> | undefined>(defaultExpandable);
	const [showTitle, setShowTitle] = useState(false);
	const [showHeader, setShowHeader] = useState(true);
	const [showFooter, setShowFooter] = useState(true);
	const [rowSelection, setRowSelection] = useState<TableRowSelection<DataType> | undefined>({});
	const [hasData, setHasData] = useState(true);
	const [tableLayout, setTableLayout] = useState();
	const [top, setTop] = useState<TablePaginationPosition>('none');
	const [bottom, setBottom] = useState<TablePaginationPosition>('bottomRight');
	const [ellipsis, setEllipsis] = useState(false);
	const [yScroll, setYScroll] = useState(false);
	const [xScroll, setXScroll] = useState<string>();

	const [dataSourceForEditable, setDataSourceForEditable] = useState<DataType[]>(data2);
	const [count, setCount] = useState(2);

	const Table_onChange: OnChange = (pagination, filters, sorter) => {
		console.log('Various parameters', pagination, filters, sorter);
		setFilteredInfo(filters);
		setSortedInfo(sorter as Sorts);
	};
	const clearFilters = () => {
		setFilteredInfo({});
	};
	const clearAll = () => {
		setFilteredInfo({});
		setSortedInfo({});
	};
	const setAgeSort = () => {
		setSortedInfo({
			order: 'descend',
			columnKey: 'age',
		});
	};
	const columns: TableColumnsType<DataType> = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			filters: [
				{ text: 'Joe', value: 'Joe' },
				{ text: 'Jim', value: 'Jim' },
			],
			filteredValue: filteredInfo.name || null,
			onFilter: (value, record) => record.name.includes(value as string),
			sorter: (a, b) => a.name.length - b.name.length,
			sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
			ellipsis: true,
		},
		{
			title: 'Age',
			dataIndex: 'age',
			key: 'age',
			sorter: (a, b) => a.age - b.age,
			sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
			ellipsis: true,
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
			filters: [
				{ text: 'London', value: 'London' },
				{ text: 'New York', value: 'New York' },
			],
			filteredValue: filteredInfo.address || null,
			onFilter: (value, record) => record.address.includes(value as string),
			sorter: (a, b) => a.address.length - b.address.length,
			sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
			ellipsis: true,
		},
	];

	const handleBorderChange = (enable: boolean) => {
		setBordered(enable);
	};
	const handleLoadingChange = (enable: boolean) => {
		setLoading(enable);
	};
	const handleSizeChange = (e: RadioChangeEvent) => {
		setSize(e.target.value);
	};
	const handleTableLayoutChange = (e: RadioChangeEvent) => {
		setTableLayout(e.target.value);
	};
	const handleExpandChange = (enable: boolean) => {
		setExpandable(enable ? defaultExpandable : undefined);
	};
	const handleEllipsisChange = (enable: boolean) => {
		setEllipsis(enable);
	};
	const handleTitleChange = (enable: boolean) => {
		setShowTitle(enable);
	};
	const handleHeaderChange = (enable: boolean) => {
		setShowHeader(enable);
	};
	const handleFooterChange = (enable: boolean) => {
		setShowFooter(enable);
	};
	const handleRowSelectionChange = (enable: boolean) => {
		setRowSelection(enable ? {} : undefined);
	};
	const handleYScrollChange = (enable: boolean) => {
		setYScroll(enable);
	};
	const handleXScrollChange = (e: RadioChangeEvent) => {
		setXScroll(e.target.value);
	};
	const handleDataChange = (newHasData: boolean) => {
		setHasData(newHasData);
	};
	const scroll: { x?: number | string; y?: number | string } = {};
	if (yScroll) {
		scroll.y = 240;
	}
	if (xScroll) {
		scroll.x = '100vw';
	}
	const tableProps: TableProps<DataType> = {
		bordered,
		loading,
		size,
		expandable,
		title: showTitle ? defaultTitle : undefined,
		showHeader,
		footer: showFooter ? defaultFooter : undefined,
		rowSelection,
		scroll,
		tableLayout,
	};
	const tableColumns = columns.map((item) => ({ ...item, ellipsis }));
	if (xScroll === 'fixed') {
		tableColumns[0].fixed = true;
		tableColumns[tableColumns.length - 1].fixed = 'right';
	}

	const defaultColumnsForEditable: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
		{
			title: 'name',
			dataIndex: 'name',
			width: '30%',
			editable: true,
		},
		{
			title: 'age',
			dataIndex: 'age',
		},
		{
			title: 'address',
			dataIndex: 'address',
		},
		{
			title: 'operation',
			dataIndex: 'operation',
			render: (_, record) =>
				dataSourceForEditable.length >= 1 ? (
					<Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
						<a>Delete</a>
					</Popconfirm>
				) : null,
		},
	];
	const handleAdd = () => {
		const newData: DataType = {
			key: String(count),
			name: `Edward King ${count}`,
			age: 32,
			address: `London, Park Lane no. ${count}`,
		};
		setDataSourceForEditable([...dataSourceForEditable, newData]);
		setCount(count + 1);
	};
	const handleSave = (row: DataType) => {
		const newData = [...dataSourceForEditable];
		const index = newData.findIndex((item) => row.key === item.key);
		const item = newData[index];
		newData.splice(index, 1, {
			...item,
			...row,
		});
		setDataSourceForEditable(newData);
	};
	const handleDelete = (key: React.Key) => {
		const newData = dataSourceForEditable.filter((item) => item.key !== key);
		setDataSourceForEditable(newData);
	};
	const componentsForEditable = {
		body: {
			row: EditableRow,
			cell: EditableCell,
		},
	};
	const columnsForEditable = defaultColumnsForEditable.map((col) => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: (record: DataType) => ({
				record,
				editable: col.editable,
				dataIndex: col.dataIndex,
				title: col.title,
				handleSave,
			}),
		};
	});

	return (
		<ResponsiveAntdLayout props={layoutProps} breadcrumbItems={BreadcrumbItem}>
			<h3>Table</h3>
			<Space style={{ marginBottom: 16 }}>
				<Button onClick={setAgeSort}>Sort age</Button>
				<Button onClick={clearFilters}>Clear filters</Button>
				<Button onClick={clearAll}>Clear filters and sorters</Button>
			</Space>
			<Table columns={columns} dataSource={data} onChange={Table_onChange} size="small" />
			<h3>Table</h3>
			<Space style={{ marginBottom: 16 }}>
				<Form layout="inline" className="table-demo-control-bar" style={{ marginBottom: 16 }}>
					<Form.Item label="Bordered">
						<Switch checked={bordered} onChange={handleBorderChange} />
					</Form.Item>
					<Form.Item label="loading">
						<Switch checked={loading} onChange={handleLoadingChange} />
					</Form.Item>
					<Form.Item label="Title">
						<Switch checked={showTitle} onChange={handleTitleChange} />
					</Form.Item>
					<Form.Item label="Column Header">
						<Switch checked={showHeader} onChange={handleHeaderChange} />
					</Form.Item>
					<Form.Item label="Footer">
						<Switch checked={showFooter} onChange={handleFooterChange} />
					</Form.Item>
					<Form.Item label="Expandable">
						<Switch checked={!!expandable} onChange={handleExpandChange} />
					</Form.Item>
					<Form.Item label="Checkbox">
						<Switch checked={!!rowSelection} onChange={handleRowSelectionChange} />
					</Form.Item>
					<Form.Item label="Fixed Header">
						<Switch checked={!!yScroll} onChange={handleYScrollChange} />
					</Form.Item>
					<Form.Item label="Has Data">
						<Switch checked={!!hasData} onChange={handleDataChange} />
					</Form.Item>
					<Form.Item label="Ellipsis">
						<Switch checked={!!ellipsis} onChange={handleEllipsisChange} />
					</Form.Item>
					<Form.Item label="Size">
						<Radio.Group value={size} onChange={handleSizeChange}>
							<Radio.Button value="large">Large</Radio.Button>
							<Radio.Button value="middle">Middle</Radio.Button>
							<Radio.Button value="small">Small</Radio.Button>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="Table Scroll">
						<Radio.Group value={xScroll} onChange={handleXScrollChange}>
							<Radio.Button value={undefined}>Unset</Radio.Button>
							<Radio.Button value="scroll">Scroll</Radio.Button>
							<Radio.Button value="fixed">Fixed Columns</Radio.Button>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="Table Layout">
						<Radio.Group value={tableLayout} onChange={handleTableLayoutChange}>
							<Radio.Button value={undefined}>Unset</Radio.Button>
							<Radio.Button value="fixed">Fixed</Radio.Button>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="Pagination Top">
						<Radio.Group
							value={top}
							onChange={(e) => {
								setTop(e.target.value);
							}}
						>
							<Radio.Button value="topLeft">TopLeft</Radio.Button>
							<Radio.Button value="topCenter">TopCenter</Radio.Button>
							<Radio.Button value="topRight">TopRight</Radio.Button>
							<Radio.Button value="none">None</Radio.Button>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="Pagination Bottom">
						<Radio.Group
							value={bottom}
							onChange={(e) => {
								setBottom(e.target.value);
							}}
						>
							<Radio.Button value="bottomLeft">BottomLeft</Radio.Button>
							<Radio.Button value="bottomCenter">BottomCenter</Radio.Button>
							<Radio.Button value="bottomRight">BottomRight</Radio.Button>
							<Radio.Button value="none">None</Radio.Button>
						</Radio.Group>
					</Form.Item>
				</Form>

				<Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
					Add a row
				</Button>
			</Space>
			<Table
				{...tableProps}
				components={componentsForEditable}
				pagination={{ position: [top, bottom] }}
				rowClassName={() => 'editable-row'}
				columns={tableColumns}
				dataSource={hasData ? dataSourceForEditable : []}
				scroll={scroll}
			/>
		</ResponsiveAntdLayout>
	);
};

export default AntdTableDemo;
