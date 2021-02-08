import { sign } from 'jsonwebtoken';

import { JWT_SECRET } from '../constants';
import { User } from '../entity/User';

export const createToken = ({ id, tokenVersion }: User) => {
	const token = sign({ userId: id, tokenVersion }, JWT_SECRET, {
		expiresIn: '6h',
	});

	return token;
};
