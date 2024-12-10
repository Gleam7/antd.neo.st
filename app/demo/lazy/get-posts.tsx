type Post = {
	id: number;
	title: string;
	content: string;
	author: string;
	date: string;
	comments: Array<{ id: number; text: string; author: string }>;
};

export const getPosts = async (): Promise<Post[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: 1,
					title: 'First Post',
					content: 'This is the first post.',
					author: 'John Doe',
					date: 'May 1, 2023',
					comments: [
						{ id: 1, text: 'Great post!', author: 'Jane Smith' },
						{ id: 2, text: 'I totally agree.', author: 'Mike Johnson' },
					],
				},
				{
					id: 2,
					title: 'Second Post',
					content: 'This is the second post.',
					author: 'Jane Smith',
					date: 'May 5, 2023',
					comments: [
						{ id: 1, text: 'Thanks for sharing!', author: 'John Doe' },
						{ id: 2, text: 'Looking forward to more.', author: 'Mike Johnson' },
					],
				},
				{
					id: 3,
					title: 'Third Post',
					content: 'This is the third post.',
					author: 'Mike Johnson',
					date: 'May 10, 2023',
					comments: [
						{ id: 1, text: 'Amazing content!', author: 'Jane Smith' },
						{ id: 2, text: 'Keep up the good work.', author: 'John Doe' },
					],
				},
				// Add more posts as needed
			]);
		}, 3000);
	});
};
