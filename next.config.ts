import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	async headers() {
		return [
			{
				source: '/fonts/Jal_Haru.woff',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
		];
	},
	//output: 'export',
	output: 'standalone',
	reactStrictMode: true,
	images: {
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'placeholder.pics',
				//			port: '',
				//			pathname: '/svg/**',
			},
		],
	},
	//experimental: {
	//	ppr: 'incremental',
	//},
};
export default nextConfig;
