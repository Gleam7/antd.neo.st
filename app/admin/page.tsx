//'use client';

import React from 'react';

import type { Metadata } from 'next';

import Page from '@/app/demo/about/page';

export const metadata: Metadata = {
	title: 'Admin',
};

const AdminPage = () => {
	return (
		<>
			<Page />
		</>
	);
};

export default AdminPage;
