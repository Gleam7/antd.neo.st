'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { Button, Form, Input, Modal } from 'antd';

import { SigninFromField } from '@/types';

import type { FormProps } from 'antd';

import '@/public/style/globals.css';
import { EnvVars } from '@/lib/EnvVars';

export default function SigninForm() {
	const router = useRouter();
	const [frmSigninForm] = Form.useForm();
	const [modal, contextHolderForMessage] = Modal.useModal();

	//const [messageApi, contextHolderForMessage] = message.useMessage();

	async function onSigninFormVaildFinish(values: SigninFromField) {
		console.log('onSigninFormVaildFinish: ', values);

		try {
			const response = await signIn('credentials', {
				email: values.username,
				password: values.password,
				redirect: false,
				callbackUrl: '/demo/about', // URL to redirect to after successful login
			});
			console.log('Login response: ', response);
			if (response?.ok) {
				modal.info({
					title: 'Login success!',
					content: <div>Hello User 👋</div>,
				});
				setTimeout(() => {
					router.push('/demo/about');
				}, 1500);
			} else {
				throw new Error(response?.error || 'error');
			}
		} catch (error: any) {
			console.log('Login error: ', error);
			modal.error({
				title: 'Login fail!',
				content: (
					<>
						<pre className="modal_content">{JSON.stringify(error, null, 4)}</pre>
						{/**/}
						<div>{error.message}</div>
					</>
				),
			});
		}
	}

	const onSigninFormVaildFailed: FormProps<SigninFromField>['onFinishFailed'] = (errorInfo) => {
		console.log('Failed:', errorInfo);
		modal.error({
			title: 'Login fail!',
			width: '30rem',
			content: <pre className="modal_content">{JSON.stringify(errorInfo, null, 4)}</pre>,
		});
	};

	const onSigninFormReset = () => {
		frmSigninForm.resetFields();
	};

	//const SigninFormInitialValues = { username: '', password: '' };
	//const SigninFormInitialValues = { username: EnvVars.admin_id, password: EnvVars.admin_id };
	const SigninFormInitialValues = { username: EnvVars.tester_id_1, password: EnvVars.tester_id_1 };
	//const SigninFormInitialValues = { username: EnvVars.tester_id_2, password: EnvVars.tester_id_2 };

	return (
		<>
			<div className="signin_form_wrapper">
				<Form
					labelCol={{ span: 7 }}
					wrapperCol={{ span: 17 }}
					autoComplete="off"
					form={frmSigninForm}
					name="frmSigninForm"
					onFinish={onSigninFormVaildFinish}
					onFinishFailed={onSigninFormVaildFailed}
					onReset={onSigninFormReset}
					initialValues={SigninFormInitialValues}
				>
					<Form.Item<SigninFromField> label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
						<Input />
					</Form.Item>
					<Form.Item<SigninFromField> label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
						<Input.Password />
					</Form.Item>
					<Form.Item label={null}>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
				<div className="w-full max-w-md text-center">
					{"Don't have an account yet?"}
					<Link className="underline ml-2 text-sky-500" href="signup">
						Sing Up
					</Link>
				</div>
				{contextHolderForMessage}
				<div className="video_bg_wrapper">
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
		</>
	);
}
