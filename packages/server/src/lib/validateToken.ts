import { verify } from 'jsonwebtoken';

import { JWT_SECRET } from '../constants';
import { TokenPayload } from '../types/TokenPayload';

export const validateToken = (token: string) => {
	const payload = verify(token, JWT_SECRET) as TokenPayload;
	return payload;
};
