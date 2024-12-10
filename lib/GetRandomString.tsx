export const GetRandomString = (len: number): string => {
	let s = '';
	while (s.length < len)
		s += Math.random()
			.toString(36)
			.substr(2, len - s.length);
	return s;
};
