import { Field, InputType, ObjectType } from 'type-graphql';

import { User } from '../entity/User';
import { FieldError } from './FieldError';

@InputType()
export class RegisterInput {
	@Field()
	name: string;

	@Field()
	email: string;

	@Field()
	password: string;
}

@InputType()
export class LoginInput {
	@Field()
	email: string;

	@Field()
	password: string;
}

@ObjectType()
export class MeObject {
	@Field({ nullable: true })
	user?: User;

	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];
}

@ObjectType()
export class LogoutObject {
	@Field({ nullable: true })
	success?: boolean;

	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];
}
