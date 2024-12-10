'use client';

import { useSettings } from '@/stores/themeConfig';
import React from 'react';

export const ThemeConfigValues = (): React.ReactNode => {
	const settings = useSettings();
	return (
		<>
			<pre>{JSON.stringify(settings, null, 4)}</pre>
		</>
	);
};
