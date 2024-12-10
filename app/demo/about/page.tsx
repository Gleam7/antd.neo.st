import React from 'react';
import { promises as fs } from 'fs';

import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { PageHeader, ThemeConfigValues, ThemeSettings } from '@/components';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'About',
};

const Page: React.FC = async () => {
	const package_json_file = await fs.readFile(process.cwd() + '/package.json', 'utf8');
	const package_json_data = JSON.stringify(JSON.parse(package_json_file), null, 4);
	const session = await getServerSession(authOptions);
	return (
		<>
			<PageHeader>About Page</PageHeader>
			<dl key="site_info_dl">
				<dt key="site_info_dt_ThemeSwitch">Theme Settings</dt>
				<dd key="site_info_dd_ThemeSwitch">
					<ThemeSettings />
					<ThemeConfigValues />
				</dd>

				<dt key="site_info_dt_UserInfo">User Info</dt>
				<dd key="site_info_dd_UserInfo">
					<pre>{JSON.stringify(session, null, 4)}</pre>
				</dd>

				<dt key="site_info_dt_PackageJson">package.json</dt>
				<dd key="site_info_dd_PackageJson" className="">
					<pre>{package_json_data}</pre>
				</dd>
				<dt key="site_info_dt_01">Korean text</dt>
				<dd key="site_info_dd_01" className="">
					한글 컨텐츠
				</dd>
			</dl>
		</>
	);
};

export default Page;
