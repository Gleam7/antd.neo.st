'use client';

import React from 'react';

import { Button, Card, Flex, Image, List, Skeleton } from 'antd';
import { AnyObject } from 'antd/es/_util/type';

import { PageHeader } from '@/components';
import { GetCatsData } from '@/app/api/Cats';
import { FetchResult } from '@/types';
import { EnvVars } from '@/lib/EnvVars';

import '@/public/style/cats_search.css';

const images = [
	'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
	'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
	'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
	'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
	'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp',
	'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
];
const Page = () => {
	const [IsLoadingSearchResult, setIsLoadingSearchResult] = React.useState<boolean>(false);
	const [TableDataSource, setTableDataSource] = React.useState<FetchResult<AnyObject>>();
	const onCatsSearchSubmit = (values: AnyObject) => {
		console.log('Received values of Cats search form: ', values);
		setIsLoadingSearchResult(true);
		GetCatsData()
			.then((data) => {
				const default_images = images.map((item, idx) => {
					return {
						id: idx,
						url: item,
					} as AnyObject;
				});
				if (TableDataSource?.data.length) {
					data.data = TableDataSource.data.concat(data.data);
				} else {
					data.data = default_images.concat(data.data);
				}
				setTableDataSource(data);
			})
			.finally(() => {
				setIsLoadingSearchResult(false);
				// Resetting window's offsetTop so as to display react-virtualized demo underfloor.
				// In real scene, you can using public method of react-virtualized:
				// https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
				window.dispatchEvent(new Event('resize'));
			});
	};
	const onLoadMoreButtonClick = () => {
		setIsLoadingSearchResult(true);
		onCatsSearchSubmit({});
	};
	React.useEffect(() => {
		onCatsSearchSubmit({});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<PageHeader content={undefined} breadcrumbProps={{}}>
				Page Header
			</PageHeader>
			<div id="divCatsSearchResult">
				<Image.PreviewGroup>
					<List
						split={true}
						grid={{
							gutter: 16,
							xs: 1,
							sm: 2,
							md: 4,
							lg: 4,
							xl: 6,
							xxl: 3,
						}}
						loading={IsLoadingSearchResult}
						dataSource={TableDataSource?.data}
						loadMore={
							IsLoadingSearchResult ? (
								''
							) : (
								<Flex justify="center" style={{ marginTop: '1rem' }}>
									<Button onClick={onLoadMoreButtonClick}>more</Button>
								</Flex>
							)
						}
						renderItem={(item, idx) => (
							<Card key={idx} bordered={false}>
								<Image
									width={153}
									height={153}
									key={item.id}
									src={`${item.url}?${Date.now()}`}
									alt={item.url}
									placeholder={<Skeleton.Image active={true} style={{ width: '153px', height: '153px' }} />}
									fallback={EnvVars.ImgfallbackString}
								/>
							</Card>
						)}
					/>
				</Image.PreviewGroup>
			</div>
		</>
	);
};

export default Page;
