import React from 'react';

import { PageHeader } from '@/components';
import { GetMoviesData } from '@/app/api/MoviesData';

const Page = async () => {
	const breadcrumbItems = [
		{
			title: 'Home',
		},
		{
			title: <a href="">Application Center</a>,
		},
		{
			title: <a href="">Application List</a>,
		},
		{
			title: 'An Application',
		},
	];

	const posts = await GetMoviesData();

	return (
		<>
			<PageHeader breadcrumbProps={{ items: breadcrumbItems }}>Page Header</PageHeader>
			<div>
				<pre>{JSON.stringify(posts, null, 4)}</pre>
			</div>
		</>
	);
};

export default Page;
