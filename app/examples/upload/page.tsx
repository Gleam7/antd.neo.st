'use client';

import React, { useState } from 'react';
import { Col, Row, Slider, Collapse, Divider, Card, message, Upload, Button } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { HomeOutlined, UserOutlined, UploadOutlined, InboxOutlined } from '@ant-design/icons';

import ImgCrop from 'antd-img-crop';

import ResponsiveAntdLayout from '@/components/layouts/antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const { Dragger } = Upload;
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
	{ href: '/examples/upload', title: 'Upload' },
];

const layoutProps = {};

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
const Upload_onChange2 = (info: any) => {
	if (info.status_code === '200') {
		message.success(`${info.file.name} file uploaded successfully`);
	}
	{
		message.error(JSON.stringify(info));
	}
};

const upload_props: UploadProps = {
	name: 'file',
	//action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
	//action: 'https://run.mocky.io/v3/1b049468-0a25-4998-95fe-e6942bb0e2b9',
	action: 'https://run.mocky.io/v3/5569de7d-703e-4d48-b5f7-33f7757871a6',
	headers: {
		authorization: 'authorization-text',
	},
	onChange: Upload_onChange,
};
const upload_props_2: UploadProps = {
	name: '{body}',
	multiple: true,
	headers: {
		apikey: 'ElWOPEu2CbF55SQPz3O5n1BMntmTKD6o',
	},
	//action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
	action: 'https://api.apilayer.com/image_upload/upload',
	onChange: Upload_onChange2,
	onDrop(e) {
		console.log('Dropped files', e.dataTransfer.files);
	},
};

/*

type: file
action: upload
timestamp: 1722503480297
auth_token: 3769d75ae104b408aec3fba57df54c8027de89b8

fetch("https://imgbb.com/json", {
  "headers": {
    "accept": "application/json",
    "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "no-cache",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundarywSJu7MeoOQ7XfSkA",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Whale\";v=\"3\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"124\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "cookie": "PHPSESSID=j0ggtd0gmf1inhsjgk3mjggjr5; USER_SELECTED_EMBED=html-embed-medium",
    "Referer": "https://imgbb.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "------WebKitFormBoundarywSJu7MeoOQ7XfSkA\r\nContent-Disposition: form-data; name=\"source\"; filename=\"Screenshot_1.png\"\r\nContent-Type: image/png\r\n\r\n\r\n------WebKitFormBoundarywSJu7MeoOQ7XfSkA\r\nContent-Disposition: form-data; name=\"type\"\r\n\r\nfile\r\n------WebKitFormBoundarywSJu7MeoOQ7XfSkA\r\nContent-Disposition: form-data; name=\"action\"\r\n\r\nupload\r\n------WebKitFormBoundarywSJu7MeoOQ7XfSkA\r\nContent-Disposition: form-data; name=\"timestamp\"\r\n\r\n1722503480297\r\n------WebKitFormBoundarywSJu7MeoOQ7XfSkA\r\nContent-Disposition: form-data; name=\"auth_token\"\r\n\r\n3769d75ae104b408aec3fba57df54c8027de89b8\r\n------WebKitFormBoundarywSJu7MeoOQ7XfSkA--\r\n",
  "method": "POST"
});

curl 'https://imgbb.com/json' \
  -H 'accept: application/json' \
  -H 'accept-language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7' \
  -H 'cache-control: no-cache' \
  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundarywSJu7MeoOQ7XfSkA' \
  -H 'cookie: PHPSESSID=j0ggtd0gmf1inhsjgk3mjggjr5; USER_SELECTED_EMBED=html-embed-medium' \
  -H 'origin: https://imgbb.com' \
  -H 'pragma: no-cache' \
  -H 'priority: u=1, i' \
  -H 'referer: https://imgbb.com/' \
  -H 'sec-ch-ua: "Whale";v="3", "Not-A.Brand";v="8", "Chromium";v="124"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-origin' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Whale/3.26.244.21 Safari/537.36' \
  --data-raw $'------WebKitFormBoundarywSJu7MeoOQ7XfSkA\r\nContent-Disposition: form-data; name="source"; filename="Screenshot_1.png"\r\nContent-Type: image/png\r\n\r\n\r\n------WebKitFormBoundarywSJu7MeoOQ7XfSkA\r\nContent-Disposition: form-data; name="type"\r\n\r\nfile\r\n------WebKitFormBoundarywSJu7MeoOQ7XfSkA\r\nContent-Disposition: form-data; name="action"\r\n\r\nupload\r\n------WebKitFormBoundarywSJu7MeoOQ7XfSkA\r\nContent-Disposition: form-data; name="timestamp"\r\n\r\n1722503480297\r\n------WebKitFormBoundarywSJu7MeoOQ7XfSkA\r\nContent-Disposition: form-data; name="auth_token"\r\n\r\n3769d75ae104b408aec3fba57df54c8027de89b8\r\n------WebKitFormBoundarywSJu7MeoOQ7XfSkA--\r\n'
  */

const AntdUploadDemo: React.FC = () => {
	const [fileList, setFileList] = useState<UploadFile[]>([
		{
			uid: '-1',
			name: 'image.png',
			status: 'done',
			url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
		},
		{
			uid: '-1',
			name: 'Desktop-Wall-Pager-016.jpg',
			status: 'done',
			url: 'https://i.ibb.co/0Bkqzdt/Desktop-Wall-Pager-016.jpg',
		},
		{
			uid: '-1',
			name: 'image.png',
			status: 'done',
			url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
		},
	]);
	const Upload_onChange3: UploadProps['onChange'] = ({ fileList: newFileList }) => {
		setFileList(newFileList);
	};
	const onPreview = async (file: UploadFile) => {
		let src = file.url as string;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj as FileType);
				reader.onload = () => resolve(reader.result as string);
			});
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow?.document.write(image.outerHTML);
	};

	return (
		<ResponsiveAntdLayout props={layoutProps} breadcrumbItems={BreadcrumbItem}>
			<h3>Upload with button</h3>
			<Upload {...upload_props}>
				<Button icon={<UploadOutlined />}>Click to Upload</Button>
			</Upload>

			<h3>Upload with drag&drop</h3>
			<div style={{ height: '10rem' }}>
				<Dragger {...upload_props_2}>
					<p className="ant-upload-drag-icon">
						<InboxOutlined />
					</p>
					<p className="ant-upload-text">Click or drag file to this area to upload</p>
					<p className="ant-upload-hint">
						Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
					</p>
				</Dragger>
			</div>

			<h3>Crop image before uploading</h3>
			<div style={{ height: '10rem' }}>
				<ImgCrop rotationSlider>
					<Upload
						action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
						listType="picture-card"
						fileList={fileList}
						onChange={Upload_onChange3}
						onPreview={onPreview}
					>
						{fileList.length < 10 && '+ Upload'}
					</Upload>
				</ImgCrop>
			</div>
		</ResponsiveAntdLayout>
	);
};

export default AntdUploadDemo;
