import { MiddlewareFn } from 'type-graphql';
import { object, ValidationError } from 'yup';

import { MyContext } from '../types/MyContext';
import { FieldErrorObject } from '../types/FieldError';

const { shape } = object();

interface Options {
	isNotObject: boolean;
}

type IsValid = (
	schema: ReturnType<typeof shape>,
	options?: Options
) => MiddlewareFn<MyContext>;

export const isValid: IsValid = (schema, options) => async (
	{ args },
	next
): Promise<FieldErrorObject> => {
	try {
		await schema.validate(options?.isNotObject ? args : args.input, {
			abortEarly: false,
			stripUnknown: true,
		});

		return next();
	} catch (err) {
		const errors = (err as ValidationError).inner.map(({ path, message }) => ({
			path,
			message,
		}));

		return { errors };
	}
};
