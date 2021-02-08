import { ConnectionOptions } from 'typeorm';

const { NODE_ENV = 'development' } = process.env;

const devConfig = {
	name: 'development',
	type: 'better-sqlite3',
	database: 'database.sqlite',
	synchronize: true,
	logging: true,
	entities: ['src/entity/**/*.ts'],
	migrations: ['src/migration/**/*.ts'],
	subscribers: ['src/subscriber/**/*.ts'],
	cli: {
		entitiesDir: 'src/entity',
		migrationsDir: 'src/migration',
		subscribersDir: 'src/subscriber',
	},
};

const testConfig = {
	name: 'test',
	type: 'better-sqlite3',
	database: 'database.test.sqlite',
	synchronize: true,
	logging: true,
	dropSchema: true,
	entities: ['src/entity/**/*.ts'],
	migrations: ['src/migration/**/*.ts'],
	subscribers: ['src/subscriber/**/*.ts'],
	cli: {
		entitiesDir: 'src/entity',
		migrationsDir: 'src/migration',
		subscribersDir: 'src/subscriber',
	},
};

const prodConfig = {
	name: 'production',
	type: 'postgres',
	url: process.env.DATABASE_URL,
	synchronize: true, // switch this to false after the initial tables created. use migrations instead afterwards
	logging: false,
	entities: ['dist/entity/**/*.js'],
	migrations: ['dist/migration/**/*.js'],
	subscribers: ['dist/subscriber/**/*.js'],
	cli: {
		entitiesDir: 'dist/entity',
		migrationsDir: 'dist/migration',
		subscribersDir: 'dist/subscriber',
	},
	ssl: true,
	extra: {
		ssl: {
			rejectUnauthorized: false,
		},
	},
};

const ormConfig = [devConfig, testConfig, prodConfig];

export const getConnectionConfig = () => {
	const config = ormConfig.find(
		(config: any) => NODE_ENV === config.name
	) as ConnectionOptions;

	return config;
};
