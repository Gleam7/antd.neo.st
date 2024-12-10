import type { NextPage } from 'next';

import { PageHeader } from '@/components';

const Antd: NextPage = () => {
	return (
		<>
			<PageHeader>Anted</PageHeader>
			<ul>
				<li>
					<a className="" href="https://ant.design/">
						<span>https://ant.design/</span>
					</a>
				</li>
				<li>
					<a className="" href="https://ant.design/docs/react/introduce/">
						<span>Docs</span>
					</a>
				</li>
				<li>
					<a className="" href="https://ant.design/components/overview/">
						<span>Components</span>
					</a>
				</li>
			</ul>
		</>
	);
};

export default Antd;
