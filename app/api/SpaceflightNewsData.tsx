import type { FetchResult } from '@/types';

const DataBackendURL = 'https://api.spaceflightnewsapi.net/v4/articles/';

export const GetSpaceflightNewsData = async (limit?: number, offset?: number, keyword?: string): Promise<FetchResult<any>> => {
	//console.log('limit: ', limit, ', offset: ', offset);
	const rtn: FetchResult<any> = {
		success: false,
		message: '',
		result_count: 0,
		data: [],
	};

	limit = limit || 10;
	offset = offset || 0;
	keyword = keyword || '';

	if (limit < 10) {
		limit = 10;
	}
	if (limit > 100) {
		limit = 100;
	}
	if (offset < 1) {
		offset = 0;
	}

	try {
		if (keyword.length > 0) {
			keyword = `&title_contains=${keyword}`;
		}

		const req_url = `${DataBackendURL}?limit=${limit}&offset=${offset}${keyword}`;
		console.log(req_url);

		const res = await fetch(req_url);
		const res_data = await res.json();

		//console.log('res_data: ', res_data);

		rtn.data = res_data.results;
		rtn.result_count = res_data.count;
		rtn.success = true;
	} catch (error) {
		if (error instanceof Error) {
			rtn.message = error.message;
		} else {
			rtn.message = String(error);
		}
	}
	return rtn;

	//return new Promise((resolve) => {
	//	//setTimeout(() => {
	//	resolve(rtn);
	//	//}, 1000);
	//});
};
