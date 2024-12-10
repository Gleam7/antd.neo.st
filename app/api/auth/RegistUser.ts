'use server';
import { SignupFromField } from '@/types';
//import bcrypt from 'bcryptjs';

export async function RegistUser(formData: SignupFromField) {
	console.log('Hello From Register User Action');

	console.log('#############');
	console.log(formData);
	console.log('#############');
	// 1. Validate form fields
	// ...

	// 2. Prepare data for insertion into database
	//const { name, email, password } = validatedFields.data;

	// e.g. Hash the user's password before storing it
	//const hashedPassword = await bcrypt.hash(password, 10);
	const hashedPassword = formData.password;

	// 3. Insert the user into the database or call an Auth Library's API
	//const data = await db
	//	.insert(users)
	//	.values({
	//		formData.username,
	//		formData.email,
	//		password: hashedPassword,
	//	})
	//	.returning({ id: users.id });

	//const user = data[0];
	const user = {
		id: 0,
		name: formData.username,
		email: formData.email,
		password: hashedPassword,
	};

	if (!user) {
		return {
			message: 'An error occurred while creating your account.',
		};
	}

	// TODO:
	// 4. Create user session
	// 5. Redirect user
}
