import { GetRandomString } from '@/lib';
import { FetchResult, SampleSearchResult } from '@/types';

export async function GetSampleSearchResultData() {
	const rtn: FetchResult<SampleSearchResult> = {
		success: false,
		message: '',
		result_count: 0,
		data: [],
	};

	try {
		//const res = await fetch(DataBackendURL);
		//rtn.data = await res.json();
		//rtn.result_count = rtn.data.length;
		//rtn.success = true;

		rtn.data = Array.from({ length: 300 }).map((_, i) => {
			const zero_filled_val = String(Math.floor(Math.random() * 1000)).padStart(4, '0') + String(i + 1).padStart(3, '0');
			const description_val = `Description of ${zero_filled_val}`;

			return {
				key: `${i}`,
				disabled: false,
				description: description_val,
				Column01: zero_filled_val, //string;
				Column02: GetRandomString(15), //string;
				Column03: GetRandomString(15), //string;
				Column04: GetRandomString(15), //string;
				Column05: GetRandomString(15), //string;
				Column06: i % 3 < 1, //boolean;
				Column07: i * Math.floor(Math.random() * i * 100), //number;
			};
		});
		rtn.result_count = rtn.data.length;
		rtn.success = true;
	} catch (error) {
		if (error instanceof Error) {
			rtn.message = error.message;
		} else {
			rtn.message = String(error);
		}
	}

	return rtn;
}
