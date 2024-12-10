'use client';

import React from 'react';

import { Spin } from 'antd';

export default function Loading() {
	//const [loding_percent, setLodingPercent] = React.useState(0);
	//const showLoader = () => {
	//	let ptg = -10;
	//
	//	const interval = setInterval(() => {
	//		ptg += 1;
	//		setLodingPercent(ptg);
	//
	//		if (ptg > 70) {
	//			setLodingPercent(0);
	//		}
	//	}, 100);
	//};
	// Or a custom loading skeleton component
	return (
		<div className="page_loading_bar">
			<Spin tip="Loading..." percent={'auto'} size="large">
				<div />
			</Spin>
		</div>
	);
}
