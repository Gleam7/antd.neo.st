import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// 공개 경로 목록 지정
const authPage = ['/signin', '/signup'];
const publicRoutes = ['/demo'];

export async function middleware(request: NextRequest) {
	// 2. 현재 경로가 보호된 경로인지 공개 경로인지 확인
	const path = request.nextUrl.pathname;
	const isAuthRoute = authPage.includes(path);
	//const isPublicRoute = publicRoutes.includes(path);
	const routeIdx = publicRoutes.findIndex((route) => {
		//console.log('path: ', path, ', route: ', route, ', path.startsWith(route): ', path.startsWith(route));
		return path === '/' || path.startsWith(route);
	}, path);
	const isPublicRoute = routeIdx > -1;
	//console.log('path: ', path, ',routeIdx: ', routeIdx, ', isAuthRoute:', isAuthRoute, ', isPublicRoute : ', isPublicRoute);

	// Get session and extract user role
	const session = await getToken({
		req: request,
		secret: process.env.NEXTAUTH_SECRET || 'ORLQW7eo/GJzmTXS5dm9P5SXd8wOCADeuNgtzW+D1ko=',
	});
	//console.log('session: ', session);

	const is_logged_in = session?.email?.length || -1 > 0;

	if (isAuthRoute && is_logged_in) {
		console.log('Already signed-in');
		return NextResponse.redirect(new URL('/', request.nextUrl));
	}

	if (isAuthRoute || isPublicRoute || is_logged_in) {
		// 사용자가 인증된 경우
		// Add a new header x-current-path which passes the path to downstream components
		const headers = new Headers(request.headers);
		headers.set('x-current-path', request.nextUrl.pathname);
		return NextResponse.next({ headers });
	} else {
		console.log('Goto signin page');
		// 사용자가 인증되지 않은 경우 /signin으로 리디렉션
		return NextResponse.redirect(new URL('/signin', request.nextUrl));
	}
}

export const config = {
	matcher: [
		// match all routes except static files and APIs
		'/((?!api|_next/static|fonts|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.svg$).*)',
	],
};
