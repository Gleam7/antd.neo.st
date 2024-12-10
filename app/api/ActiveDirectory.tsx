export const GetDeptAndUsersData = () => {
	return Array.from({ length: 15 }).map((_, i) => {
		const zero_filled_idx = String(i + 1).padStart(3, '0');
		const parent_key_val = `dept_${zero_filled_idx}`;
		const child_node_cnt = Math.floor((14 - (i % 7)) / 2);

		return {
			key: parent_key_val,
			value: parent_key_val,
			title: `Department ${zero_filled_idx}`,
			children: Array.from({ length: child_node_cnt }).map((_, j) => {
				const zero_filled_child_idx = String(j + 1).padStart(2, '0');
				const child_key_val = `${parent_key_val}_user_${zero_filled_child_idx}`;

				return {
					key: child_key_val,
					value: child_key_val,
					title: `Employee ${zero_filled_idx}_${zero_filled_child_idx}`,
				};
			}),
		};
	});
};
