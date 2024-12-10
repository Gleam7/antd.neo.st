import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { authOptions } from '@/lib/auth';

export async function GET() {
	const session = await getServerSession(authOptions);

	if (!session) {
		return NextResponse.json({ error: 'No Autorized ❌' }, { status: 400 });
	}
	return NextResponse.json({ success: session }, { status: 200 });
}
