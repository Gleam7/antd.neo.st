/* 'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const ComponentA = dynamic(() => import('../components/A'));
const ComponentB = dynamic(() => import('../components/B'));

export default function ClientComponentExample() {
	const [showMore, setShowMore] = useState(false);

	return (
		<div>
			<ComponentA />
			{showMore && <ComponentB />}
			<button onClick={() => setShowMore(!showMore)}>더 보기</button>
		</div>
	);
}
 */
