import { object, string } from 'yup';

export const registerSchema = object().shape({
	name: string().trim().required(),
	email: string().required().email(),
	password: string().required().min(6),
});

export const loginSchema = object().shape({
	email: string().required().email(),
	password: string().required(),
});
