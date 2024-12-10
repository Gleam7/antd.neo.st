export type FetchResult<T> = {
	success: boolean | false;
	message: string;
	result_count: number;
	data: T[];
};
