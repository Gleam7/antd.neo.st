import { GetRandomString } from '@/lib';
import { AuthGroupSearchResult, FetchResult } from '@/types';

export const GetAuthGroupSearchResultData = async (keyword: string): Promise<FetchResult<AuthGroupSearchResult>> => {
	//const arr_work_type = GetWorkTypes();
	//const arr_status_type = GetStatusTypes();
	console.log('GetAuthGroupSearchResultData.keyword:', keyword);

	let auth_group_list = Array.from({ length: 15 }).map((_, i) => {
		i += 1;

		const auth_group_name_val = `Auth group ${keyword ? keyword : ''} ${i} ${GetRandomString(5)}`;
		return {
			key: `${i}`,
			auth_group_name: auth_group_name_val,
			auth_group_menus: [],
			auth_group_users: [],
			description: `Description of '${auth_group_name_val}'`,
			disabled: false,
		} as AuthGroupSearchResult;
	});
	const rtn: FetchResult<AuthGroupSearchResult> = {
		success: false,
		message: '',
		result_count: 0,
		data: [],
	};

	try {
		if (!keyword) {
			auth_group_list = [
				{
					key: '0',
					auth_group_name: 'System Admin',
					auth_group_menus: ['Home'],
					auth_group_users: ['dept_001_user_01', 'dept_001_user_03', 'dept_001_user_05', 'dept_001_user_07'],
					description: `Description of System admin group`,
					disabled: false,
				},
				...auth_group_list,
			];
		}

		//const res = await fetch(DataBackendURL);
		//rtn.data = await res.json();
		rtn.data = auth_group_list;
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
};
