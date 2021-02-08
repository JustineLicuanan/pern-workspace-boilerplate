import { Entity, Column, BeforeInsert } from 'typeorm';
import bcrypt from 'bcryptjs';
import { Field, ObjectType } from 'type-graphql';

import { ExtendedBaseEntity } from './Base';

@Entity('users')
@ObjectType()
export class User extends ExtendedBaseEntity {
	@Column('text')
	@Field()
	name: string;

	@Column('text', { unique: true })
	@Field()
	email: string;

	@Column('text')
	password: string;

	@Column()
	tokenVersion: number = 0;

	@Field()
	token: string;

	@BeforeInsert()
	async hashPass() {
		this.password = await bcrypt.hash(this.password, 10);
	}

	@BeforeInsert()
	trimStrings() {
		this.name = this.name.trim();
	}
}
