import { AnyObject } from 'antd/es/_util/type';
import dynamic from 'next/dynamic';
import React from 'react';

const NoSSR_Internal = ({ children }: AnyObject) => <>{children}</>;

export function NoSSR() {
	return dynamic(() => Promise.resolve(NoSSR_Internal), {
		ssr: false,
	});
}
