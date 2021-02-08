import bcrypt from 'bcryptjs';
import {
	Arg,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql';
import { getRepository } from 'typeorm';
import { loginSchema, registerSchema } from '@pern-workspace/shared';

import { User } from '../entity/User';
import { createToken } from '../lib/createToken';
import { isAuth } from '../middlewares/isAuth';
import { isValid } from '../middlewares/isValid';
import * as ResolverTypes from '../types/AuthResolverTypes';
import { MyContext } from '../types/MyContext';

@Resolver()
export class AuthResolver {
	@Mutation(() => ResolverTypes.MeObject)
	@UseMiddleware(isValid(registerSchema))
	async register(
		@Arg('input') input: ResolverTypes.RegisterInput
	): Promise<ResolverTypes.MeObject> {
		const userExists = await User.findOne({ email: input.email });

		if (userExists) {
			return {
				errors: [
					{
						path: 'email',
						message: 'email is already registered',
					},
				],
			};
		}

		const user = User.create(input);
		await user.save();

		user.token = createToken(user);
		return { user };
	}

	@Mutation(() => ResolverTypes.MeObject)
	@UseMiddleware(isValid(loginSchema))
	async login(
		@Arg('input') input: ResolverTypes.LoginInput
	): Promise<ResolverTypes.MeObject> {
		const user = await User.findOne({ email: input.email });

		const errors = [
			{
				path: 'email',
				message: 'email or password is incorrect',
			},
		];

		if (!user) {
			return { errors };
		}

		const isMatch = await bcrypt.compare(input.password, user.password);

		if (!isMatch) {
			return { errors };
		}

		user.token = createToken(user);
		return { user };
	}

	@Query(() => ResolverTypes.MeObject)
	@UseMiddleware(isAuth)
	me(@Ctx() { user }: MyContext): ResolverTypes.MeObject {
		return { user };
	}

	@Mutation(() => ResolverTypes.LogoutObject)
	@UseMiddleware(isAuth)
	async logout(
		@Ctx() { user }: MyContext
	): Promise<ResolverTypes.LogoutObject> {
		const userRepo = getRepository(User);
		const { affected } = await userRepo.increment(
			{ id: user!.id },
			'tokenVersion',
			1
		);

		return { success: !!affected };
	}
}
