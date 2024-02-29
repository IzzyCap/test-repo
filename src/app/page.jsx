'use client';
import React, { Fragment, useEffect, useState } from 'react';
import { cookieService } from '../client/services/cookie';
import { displayErrorWrapper } from '../utils';
import Hero from '../client/components/hero';
import Consent from '../client/components/consent';

const Home = () => {
	const [isConsent, setIsConsent] = useState(null);

	useEffect(() => {
		const consent = cookieService.read('consent');
		const result = cookieService.valueToBoolean(consent);
		setIsConsent(result);
	}, []);

	const listener = (cookie) => {
		if (cookie.key === 'consent') {
			const result = cookieService.valueToBoolean(cookie.value);
			setIsConsent(result);
		}
	};

	return (
		<Fragment>
			<Hero />
			<Consent isConsent={isConsent} cookieListener={listener} />
		</Fragment>
	);
};

//This is to avoid ssr
const App = () => {
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) {
		return null;
	}

	return <Home />;
};

export default displayErrorWrapper(App);

export const fetchCache = 'force-no-store';
