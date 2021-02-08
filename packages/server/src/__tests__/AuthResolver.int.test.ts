import 'cross-fetch/polyfill';

import { sdk } from './utils/codegenSdk';

describe('register mutation tests', () => {
	const registerVariables = {
		name: 'Bob',
		email: 'bob@gmail.com',
		password: 'bobsmith',
	};

	it('user can register', async () => {
		const { register: res } = await sdk.Register(registerVariables);

		expect(res.errors).toBeNull();
		expect(res.user?.name).toEqual(registerVariables.name.trim());
		expect(res.user?.email).toEqual(registerVariables.email);
	});
});
