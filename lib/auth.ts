import { NextAuthOptions } from 'next-auth';

import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import { randomBytes } from 'crypto';
import { EnvVars } from './EnvVars';

export const authOptions: NextAuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.CLIENT_ID_GITHUB as string,
			clientSecret: process.env.CLIENT_SECRET_GITHUB as string,
		}),
		GoogleProvider({
			clientId: process.env.CLIENT_ID_GOOGLE as string,
			clientSecret: process.env.CLIENT_SECRET_GOOGLE as string,
		}),
		//CredentialsProvider({
		//    name: "Credentials",
		//    credentials: {
		//        email:{label:"Email", type: "email"},
		//        password:{label:"Password", type: "password"},
		//    },
		//    async authorize(credentials: Record<"email"|"password", string> | undefined, req:any){
		//        if(!credentials){
		//            return null;
		//        }
		//        try {
		//            const userCredential = await signInWithEmailAndPassword(auth, credentials.email , credentials.password)
		//            const user = userCredential.user
		//            if(user){
		//                return {
		//                    id: user.uid,
		//                    email: user.email,
		//                };
		//            } else {
		//                return null;
		//            }
		//        } catch (error: any) {
		//            console.error(error.message)
		//            return null;
		//        }
		//    }
		//}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials: Record<'email' | 'password', string> | undefined, req: any) {
				if (!credentials) {
					return null;
				}
				try {
					//const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
					//const user = userCredential.user;
					//if (user) {
					//	return {
					//		id: user.uid,
					//		email: user.email,
					//	};
					//} else {
					//	return null;
					//}
					if (credentials.email == EnvVars.admin_id && credentials.password === EnvVars.admin_id) {
						return {
							id: '01',
							name: credentials.email.split('@')[0],
							email: credentials.email,
						};
					} else if (credentials.email == EnvVars.tester_id_1 && credentials.password === EnvVars.tester_id_1) {
						return {
							id: '02',
							name: credentials.email.split('@')[0],
							email: credentials.email,
						};
					} else if (credentials.email == EnvVars.tester_id_2 && credentials.password === EnvVars.tester_id_2) {
						return {
							id: '03',
							name: credentials.email.split('@')[0],
							email: credentials.email,
						};
					} else {
						throw new Error("Can't find user info or password is not valid.");
					}
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
				} catch (error: any) {
					console.log('credentials: ', credentials, 'req: ', req);
					console.error(error.message);
					throw error;
				}
			},
		}),
	],
	callbacks: {
		jwt: async ({ user, token }) => {
			//console.log('-----------------------------------------------------------------');
			//console.log('NextAuth.route.callbacks.jwt.user: ', user || '[null]');
			//console.log('NextAuth.route.callbacks.jwt.token: ', token || '[null]');
			//console.log('NextAuth.route.callbacks.jwt.trigger: ', trigger || '[null]');
			//console.log('NextAuth.route.callbacks.jwt.session: ', session || '[null]');
			//console.log('NextAuth.route.callbacks.jwt.account: ', account || '[null]');
			//console.log('NextAuth.route.callbacks.jwt.profile: ', profile || '[null]');
			//console.log('NextAuth.route.callbacks.jwt.isNewUser: ', isNewUser || '[null]');
			//console.log('-----------------------------------------------------------------');

			//if (trigger === 'update') {
			//	return { ...token, ...session.user };
			//}
			if (user) {
				const roles = ['user'];
				switch (user.email) {
					case EnvVars.admin_id:
						roles.push('admin');
						break;
					case EnvVars.tester_id_1:
						roles.push('user_group_01');
						break;
					case EnvVars.tester_id_2:
						roles.push('user_group_02');
						break;

					default:
						break;
				}

				token.roles = roles;
			}

			//user.roles = ['user'];
			return { ...token, ...user };
		},
		session: async ({ session, token }) => {
			//	console.log('-----------------------------------------------------------------');
			//	console.log('NextAuth.route.callbacks.session.user: ', user || '[null]');
			//	console.log('NextAuth.route.callbacks.session.token: ', token || '[null]');
			//	console.log('NextAuth.route.callbacks.session.session: ', session || '[null]');
			//	//console.log('NextAuth.route.callbacks.jwt.newSession: ', newSession || '[null]');
			//	//console.log('NextAuth.route.callbacks.jwt.trigger: ', trigger || '[null]');
			//	console.log('-----------------------------------------------------------------');
			session.user.roles = token.roles as string[];
			session.user.token = token;
			//console.log('session: ', session);
			return session;
		},
	},
	pages: {
		signIn: '/signin',
	},
	secret: (process.env.NEXTAUTH_SECRET || 'NEXTAUTH_SECRET') as string,
	session: {
		strategy: 'jwt',

		// Seconds - How long until an idle session expires and is no longer valid.
		maxAge: 1 * 24 * 60 * 60, // 1 days

		// Seconds - Throttle how frequently to write to database to extend a session.
		// Use it to limit write operations. Set to 0 to always update the database.
		// Note: This option is ignored if using JSON Web Tokens
		updateAge: 24 * 60 * 60, // 24 hours

		// The session token is usually either a random UUID or string, however if you
		// need a more customized session token string, you can define your own generate function.
		generateSessionToken: () => {
			//return randomUUID?.() ?? randomBytes(32).toString('hex');
			return randomBytes(32).toString('hex');
		},
	},
	jwt: {
		// The maximum age of the NextAuth.js issued JWT in seconds.
		// Defaults to `session.maxAge`.
		maxAge: 1 * 24 * 60 * 60, // 1 days
		// You can define your own encode/decode functions for signing and encryption
		//async encode() {},
		//async decode() {},
	},
	debug: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test',
};
