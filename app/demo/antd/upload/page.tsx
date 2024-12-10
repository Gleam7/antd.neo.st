'use client';

import React, { useState } from 'react';
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});

const App: React.FC = () => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [fileList, setFileList] = useState<UploadFile[]>([
		{
			uid: '-4',
			name: 'image.png',
			status: 'done',
			url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
		},
		{
			uid: '-xxx',
			percent: 50,
			name: 'image.png',
			status: 'uploading',
			url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
		},
		{
			uid: '-5',
			name: 'image.png',
			status: 'error',
		},
	]);

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as FileType);
		}

		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
	};

	const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

	const uploadButton = (
		<button style={{ border: 0, background: 'none' }} type="button">
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</button>
	);
	const props: UploadProps = {
		name: 'file',
		multiple: true,
		style: { height: '200px' },
		listType: 'picture',
		action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',

		progress: {
			strokeColor: {
				'0%': '#108ee9',
				'100%': '#87d068',
			},
			strokeWidth: 5,
			format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
		},
		onChange(info) {
			const { status } = info.file;
			if (status !== 'uploading') {
				console.log(info.file, info.fileList);
			}
			if (status === 'done') {
				message.success(`${info.file.name} file uploaded successfully.`);
			} else if (status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files);
		},
	};
	return (
		<>
			<div>
				<Upload.Dragger {...props}>
					<p className="ant-upload-drag-icon">
						<InboxOutlined />
					</p>
					<p className="ant-upload-text">Click or drag file to this area to upload</p>
					<p className="ant-upload-hint">
						Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
					</p>
				</Upload.Dragger>
			</div>
			<div style={{ marginTop: '1rem', height: '15rem', display: 'block' }}>
				<Upload
					action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
					listType="picture-card"
					fileList={fileList}
					onPreview={handlePreview}
					onChange={handleChange}
				>
					{fileList.length >= 8 ? null : uploadButton}
				</Upload>
				{previewImage && (
					<Image
						wrapperStyle={{ display: 'none' }}
						preview={{
							visible: previewOpen,
							onVisibleChange: (visible) => setPreviewOpen(visible),
							afterOpenChange: (visible) => !visible && setPreviewImage(''),
						}}
						src={previewImage}
						alt=""
					/>
				)}
			</div>
		</>
	);
};

export default App;
