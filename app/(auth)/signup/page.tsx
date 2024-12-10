'use client';

import Link from 'next/link';
import { Button, Form, Input } from 'antd';
import type { FormProps } from 'antd';
//import { useActionState } from 'react';

import { SignupFromField } from '@/types';
import { AnyObject } from 'antd/es/_util/type';
import { RegistUser } from '@/app/api/auth/RegistUser';

import '@/public/style/globals.css';

export default function SignupForm() {
	const [frmSignupForm] = Form.useForm();
	//const [state, action, pending] = useActionState(signup, undefined);

	const onSignupFormVaildFinish = (values: AnyObject) => {
		console.log(values);
		RegistUser(values);
	};

	const onSignupFormVaildFailed: FormProps<SignupFromField>['onFinishFailed'] = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const onSignupFormReset = () => {
		frmSignupForm.resetFields();
	};

	return (
		<div className="signin_form_wrapper">
			<Form
				labelCol={{ span: 7 }}
				wrapperCol={{ span: 17 }}
				autoComplete="off"
				form={frmSignupForm}
				name="frmSignupForm"
				onFinish={onSignupFormVaildFinish}
				onFinishFailed={onSignupFormVaildFailed}
				onReset={onSignupFormReset}
			>
				<Form.Item<SignupFromField> label="User Name" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
					<Input />
				</Form.Item>
				<Form.Item<SignupFromField> label="E-Mail" name="email" rules={[{ required: true, message: 'Please input your E-Mail!' }]}>
					<Input />
				</Form.Item>
				<Form.Item<SignupFromField> label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
					<Input.Password />
				</Form.Item>

				<Form.Item label={null}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
			<div className="w-full max-w-md mt-4 text-center text-sm">
				Have an account?
				<Link className="underline ml-2 text-sky-500" href="signin">
					Sing In
				</Link>
			</div>
			<div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex: -1, opacity: '0.3' }}>
				<video
					style={{
						height: '100%',
						width: '100%',
						objectFit: 'cover',
					}}
					autoPlay
					muted
					loop
				>
					<source src="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr" type="video/webm" />
					Your browser is not supported!
				</video>
			</div>
		</div>
	);
}
