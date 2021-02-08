import { MiddlewareFn } from 'type-graphql';

import { MyContext } from '../types/MyContext';
import { FieldErrorObject } from '../types/FieldError';
import { validateToken } from '../lib/validateToken';
import { User } from '../entity/User';

export const isAuth: MiddlewareFn<MyContext> = async (
	{ context: ctx },
	next
): Promise<FieldErrorObject> => {
	const errors = [
		{
			path: 'user',
			message: 'user is unauthorized',
		},
	];

	try {
		const { authorization } = ctx.req.headers;

		if (!authorization?.startsWith('Bearer ')) {
			return { errors };
		}

		const token = authorization.split(' ')[1];
		const payload = validateToken(token);
		const user = await User.findOne(payload.userId);

		if (!user || user.tokenVersion !== payload.tokenVersion) {
			return { errors };
		}

		user.token = token;
		ctx.user = user;

		return next();
	} catch (err) {
		return { errors };
	}
};
