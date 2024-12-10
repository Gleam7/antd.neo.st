import { JWTPayload } from 'jose';

//export declare interface SessionPayload<Session> {
//	header: {
//		/**
//		 * Timestamp (in secs) when the session was created.
//		 */
//		iat: number;
//		/**
//		 * Timestamp (in secs) when the session was last touched.
//		 */
//		uat: number;
//		/**
//		 * Timestamp (in secs) when the session expires.
//		 */
//		exp: number;
//	};
//
//	/**
//	 * The session data.
//	 */
//	data: Session;
//}
export declare interface SessionPayload extends JWTPayload {
	/**
	 * Index number of user
	 */
	userIdx: number;
	/**
	 * Timestamp (in secs) when the session expires.
	 */
	expiresAt: Date;
	/**
	 * ID of user
	 */
	userId: string;
	/**
	 * Name of user
	 */
	userName: string;
	/**
	 * Roles of logged user
	 */
	roles: string[];
}

export declare interface AuthProps {
	user: SessionPayload | null; // 유저 정보
	saveUser: (session: SessionPayload) => void; // 유저 정보 저장
	isLogin: boolean; // 로그인 여부
	checkLogin: () => void; // 로그인 여부 확인 함수
	logout: () => void; // 로그아웃
}
