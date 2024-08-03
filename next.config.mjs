/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'placehold.co',
				//port: '',
				//pathname: '/assets/img/**',
			},
		],
	},
	assetPrefix: '.',

	output: 'standalone',
	//output: 'export',
	// Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
	// trailingSlash: true,

	// Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
	// skipTrailingSlashRedirect: true,

	// Optional: Change the output directory `out` -> `dist`
	//distDir: 'published',
};

export default nextConfig;
