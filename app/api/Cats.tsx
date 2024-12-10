import type { FetchResult } from '@/types';
import { AnyObject } from 'antd/es/_util/type';

const DataBackendURL = 'https://api.thecatapi.com/v1/images/search?limit=100';

export const GetCatsData = async (): Promise<FetchResult<AnyObject>> => {
	const rtn: FetchResult<AnyObject> = {
		success: false,
		message: '',
		result_count: 0,
		data: [],
	};

	try {
		const res = await fetch(DataBackendURL);
		rtn.data = await res.json();
		rtn.result_count = rtn.data.length;
		rtn.success = true;
	} catch (error) {
		if (error instanceof Error) {
			rtn.message = error.message;
		} else {
			rtn.message = String(error);
		}
	}
	//return rtn;

	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(rtn);
		}, 1500);
	});
};
