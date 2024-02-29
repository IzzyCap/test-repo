import { COOKIE_UNIQUE_KEY } from '../settings';

const keyToUnique = (key: string) => `${COOKIE_UNIQUE_KEY}${key}`;

const read = (key: string) => {
	const cookies = document.cookie.split(';').map((c) => {
		const raw = c.trim().split('=');
		return {
			key: raw[0],
			value: raw[1],
		};
	});
	const cookie = cookies.find((c) => c.key === keyToUnique(key));

	if (cookie) {
		return cookie.value;
	}

	return null;
};

export type Listener = (arg: { key: string; value: string }) => unknown;

const write = (key: string, value: string, listener?: Listener) => {
	const date = new Date();
	const expires = date.toUTCString();

	document.cookie = `${keyToUnique(key)}=${value}; expires=${expires};`;

	if (listener) {
		listener({
			key,
			value,
		});
	}
};

const valueToBoolean = (value: boolean | unknown) => {
	switch (value) {
		case 'true': {
			return true;
		}
		case 'false': {
			return false;
		}
		default: {
			return null;
		}
	}
};

const cookie = {
	read,
	write,
	valueToBoolean,
};

export const cookieService = cookie;
export default cookie;
