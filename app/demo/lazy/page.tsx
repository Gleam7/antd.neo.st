import { PageHeader } from '@/components';
import { GetMoviesData } from '@/app/api/MoviesData';

const Page = async () => {
	const posts = await GetMoviesData();

	return (
		<>
			<PageHeader content={undefined} breadcrumbProps={{}}>
				Page Header
			</PageHeader>
			<div>
				<pre>{JSON.stringify(posts, null, 4)}</pre>
			</div>
		</>
	);
};

export default Page;
