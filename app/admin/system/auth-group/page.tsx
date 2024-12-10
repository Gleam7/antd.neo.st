'use client';

import { AnyObject } from 'antd/es/_util/type';
import React, { useEffect, useState } from 'react';

import { Button, Drawer, Form, Input, Space, Table, Typography, TreeSelect } from 'antd';
import { CloseOutlined, SaveOutlined, SearchOutlined, UndoOutlined, UsergroupAddOutlined, DownOutlined } from '@ant-design/icons';

import { GetMenuItemsSources } from '@/app/api/MenuItems';
import { GetDeptAndUsersData } from '@/app/api/ActiveDirectory';
import { GetAuthGroupSearchResultData } from '@/app/api/AuthGroupSearch';

import { PageHeader } from '@/components';

import { AuthGroupSearchResult } from '@/types';
//import { GetAuthGroupSearchResultData, GetDeptAndUsersData, GetMenuItemsSources } from '@/api';

const arr_menus = GetMenuItemsSources();

arr_menus[0].title = 'All Menus';

const arr_dept_and_users = GetDeptAndUsersData();

const ColumnRenderForAuthGroupList1 = (text: any) => {
	return <a style={{ color: '#1677ff', cursor: 'pointer' }}>{text}</a>;
};
const ColumnRenderForAuthGroupList2 = (text: any) => {
	return <span>{text}</span>;
};

const Page = () => {
	const [frmAuthGroupSearch] = Form.useForm();
	const [frmAuthGroupEdit] = Form.useForm();
	const [loading, setLoading] = React.useState<boolean>(false);
	const [listAuthGroupResult, setListAuthGroupResult] = useState<AuthGroupSearchResult[]>([] as AuthGroupSearchResult[]);
	const [selectedAuthGroupItem, setSelectedAuthGroupItem] = useState<AuthGroupSearchResult>({} as AuthGroupSearchResult);
	const [open_detail, setOpenDetail] = React.useState<boolean>(false);
	const [detail_is_loading, setDetailIsLoading] = React.useState<boolean>(true);

	const [selectedAuthGroupMenus, setSelectedAuthGroupMenus] = React.useState<string[]>([]);
	const [selectedAuthGroupUsers, setSelectedAuthGroupUsers] = React.useState<string[]>([]);

	const onAuthGroupSubmit = (values: AnyObject) => {
		console.log('Received values of AuthGroup search form: ', values);
		setLoading(true);
		setTimeout(async () => {
			const result = await GetAuthGroupSearchResultData(values?.auth_group_name);
			setListAuthGroupResult(result.data);
			setLoading(false);
		}, 1000);
	};
	const onAuthGroupEditFormSubmit = (values: AnyObject) => {
		console.log('Received values of AuthGroup edit form: ', values);
		setDetailIsLoading(true);
		setTimeout(() => {
			onAuthGroupSubmit({}); // 데이터 재 조회
			onDetailCloseButtonClick();
		}, 1000);
	};
	const onDetailCloseButtonClick = () => {
		setSelectedAuthGroupItem({} as AuthGroupSearchResult);
		setDetailIsLoading(false);
		setOpenDetail(false);
	};

	const onAddAuthGroupButtonClick = () => {
		setDetailIsLoading(true);
		setOpenDetail(true);
		setSelectedAuthGroupItem({} as AuthGroupSearchResult);

		// Simple loading mock. You should add cleanup logic in real world.
		setTimeout(() => {
			setDetailIsLoading(false);
		}, 500);
	};
	const onAuthGroupResultRow = (row: AnyObject, idx: number | undefined) => {
		return {
			onClick: () => {
				console.log('row: ', row, ', idx: ', idx);

				setDetailIsLoading(true);
				setOpenDetail(true);
				setSelectedAuthGroupItem(row as AuthGroupSearchResult);

				// Simple loading mock. You should add cleanup logic in real world.
				setTimeout(() => {
					setDetailIsLoading(false);
				}, 500);
			},
		};
	};

	useEffect(() => {
		frmAuthGroupEdit.setFieldsValue({
			key: selectedAuthGroupItem?.key,
			auth_group_name: selectedAuthGroupItem?.auth_group_name,
			auth_group_menus: selectedAuthGroupItem?.auth_group_menus,
			auth_group_users: selectedAuthGroupItem?.auth_group_users,
			description: selectedAuthGroupItem?.description,
			disabled: selectedAuthGroupItem?.disabled,
		});
		console.log('frmAuthGroupEdit.setFieldsValue: ', selectedAuthGroupItem);
	}, [selectedAuthGroupItem]);

	return (
		<>
			<PageHeader>Auth Group Management</PageHeader>
			<Form form={frmAuthGroupSearch} name="frmAuthGroup" onFinish={onAuthGroupSubmit} layout="inline" labelAlign="right" className="search_form">
				<Form.Item name="auth_group_name" label="Auth Group Name">
					<Input placeholder="Auth Group Name" />
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
				<Button icon={<UsergroupAddOutlined />} onClick={onAddAuthGroupButtonClick}>
					Add
				</Button>
			</Space>
			<Table size="middle" dataSource={listAuthGroupResult} scroll={{ x: 'max-content', y: 500 }} loading={loading} onRow={onAuthGroupResultRow}>
				<Table.Column
					render={ColumnRenderForAuthGroupList1}
					width={250}
					dataIndex="auth_group_name"
					key="auth_group_name"
					title="Auth Group Name"
					fixed="left"
				/>
				<Table.Column
					render={ColumnRenderForAuthGroupList2}
					width="auto"
					minWidth={300}
					dataIndex="description"
					key="description"
					title="Description"
				/>
			</Table>
			<Drawer
				closable={false}
				destroyOnClose
				width={'50%'}
				title={
					<Space align="center" wrap={true}>
						<Typography.Title level={4}>Modify Auth Group</Typography.Title>
						<Typography.Text disabled>{selectedAuthGroupItem?.auth_group_name}</Typography.Text>
					</Space>
				}
				placement="right"
				open={open_detail}
				loading={detail_is_loading}
				extra={
					<Space>
						<Button
							type="primary"
							onClick={() => {
								frmAuthGroupEdit.submit();
							}}
							icon={<SaveOutlined />}
						>
							Save
						</Button>
						<Button htmlType="reset" icon={<UndoOutlined />}>
							Reset
						</Button>
						<Button icon={<CloseOutlined />} onClick={onDetailCloseButtonClick}>
							Cancel
						</Button>
					</Space>
				}
			>
				<Form
					form={frmAuthGroupEdit}
					name="frmAuthGroupEdit"
					labelAlign="right"
					labelCol={{ span: 7 }}
					wrapperCol={{ span: 17 }}
					onFinish={onAuthGroupEditFormSubmit}
					initialValues={selectedAuthGroupItem}
				>
					<Form.Item
						required
						name="auth_group_name"
						label="Auth Group Name"
						rules={[{ required: true, message: 'Auth Group Name is Required item.' }]}
					>
						<Input placeholder="Auth Group Name" readOnly />
					</Form.Item>
					<Form.Item required name="auth_group_menus" label="Useable Menus">
						<TreeSelect
							multiple
							treeLine
							allowClear
							showSearch
							treeDefaultExpandAll
							treeCheckable={true}
							showCheckedStrategy={TreeSelect.SHOW_PARENT}
							dropdownStyle={{ maxHeight: '50%', overflow: 'auto' }}
							treeData={arr_menus}
							placeholder="Useable Menus"
							suffixIcon={
								<>
									<span>{selectedAuthGroupMenus.length}</span>
									<DownOutlined />
								</>
							}
							onChange={setSelectedAuthGroupMenus}
						/>
					</Form.Item>
					<Form.Item required name="auth_group_users" label="Employees" className="radio-group">
						<TreeSelect
							multiple
							treeLine
							allowClear
							showSearch
							/*treeDefaultExpandAll*/
							/*style={{ width: '100%' }}*/
							/*value={value}*/
							treeCheckable={true}
							showCheckedStrategy={TreeSelect.SHOW_PARENT}
							dropdownStyle={{ maxWidth: '50%', maxHeight: '50%', overflow: 'auto' }}
							treeData={arr_dept_and_users}
							placeholder="Employees"
							suffixIcon={
								<>
									<span>{selectedAuthGroupUsers.length}</span>
									<DownOutlined />
								</>
							}
							onChange={setSelectedAuthGroupUsers}
						/>
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
