import 'cross-fetch/polyfill';

import { sdk } from './utils/codegenSdk';

const dummyInput = {
	name: 'Bob',
	email: 'bob@gmail.com',
	password: 'bobsmith',
};

const mockRes = {
	user: {
		id: '',
		name: dummyInput.name.trim(),
		email: dummyInput.email,
		token: '',
	},
	errors: null,
};

const getAuthReqHeaders = (): any => {
	return { authorization: `Bearer ${mockRes.user.token}` };
};

describe('register mutation tests', () => {
	it('validation works', async () => {
		const { register: res } = await sdk.Register({
			name: '',
			email: 'bobgmail.com',
			password: 'just5',
		});

		expect(res).toMatchSnapshot();
	});

	it('can register not taken email', async () => {
		const { register: res } = await sdk.Register(dummyInput);

		mockRes.user.id = res.user?.id!;
		mockRes.user.token = res.user?.token!;

		expect(res).toEqual(mockRes);
	});

	it("CAN'T register already taken email", async () => {
		const { register: res } = await sdk.Register(dummyInput);
		expect(res).toMatchSnapshot();
	});
});

describe('login mutation tests', () => {
	it('validation works', async () => {
		const { login: res } = await sdk.Login({
			email: 'bobgmail.com',
			password: '',
		});

		expect(res).toMatchSnapshot();
	});

	it("CAN'T login incorrect credentials", async () => {
		const { login: res } = await sdk.Login({
			email: 'bob2@gmail.com',
			password: dummyInput.password,
		});

		expect(res).toMatchSnapshot();

		const { login: res2 } = await sdk.Login({
			email: dummyInput.email,
			password: 'bob2smith',
		});

		expect(res2).toMatchSnapshot();
	});

	it('can login correct credentials', async () => {
		const { login: res } = await sdk.Login(dummyInput);

		mockRes.user.token = res.user?.token!;
		expect(res).toEqual(mockRes);
	});
});

describe('"me" query tests', () => {
	it('CAN\'T get "me" if not logged in', async () => {
		const { me: res } = await sdk.Me();
		expect(res).toMatchSnapshot();
	});

	it('can get "me" if logged in', async () => {
		const { me: res } = await sdk.Me(undefined, getAuthReqHeaders());

		expect(res).toEqual(mockRes);
	});
});

describe('logout mutation tests', () => {
	it("CAN'T logout if not logged in", async () => {
		const { logout: res } = await sdk.Logout();
		expect(res).toMatchSnapshot();
	});

	it('can logout if logged in', async () => {
		const { logout: res } = await sdk.Logout(undefined, getAuthReqHeaders());

		expect(res).toMatchSnapshot();

		const { me: res2 } = await sdk.Me(undefined, getAuthReqHeaders());

		expect(res2).toMatchSnapshot();
	});
});
