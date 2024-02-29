import React from 'react';
import { displayErrorWrapper } from '../../../utils';

const Button = (props) => {
	const { buttonType, onClick } = props;
	const buttonTypeClass =
		buttonType === 'confirm'
			? 'consent-confirm-button'
			: 'consent-reject-button';

	const label = buttonType === 'confirm' ? 'Allow' : 'Deny';

	const handlClick = () => {
		onClick(buttonType === 'confirm');
	};

	return (
		<button
			onClick={handleClick}
			className={`consent-button ${buttonTypeClass}`}
		>
			{label}
		</button>
	);
};

export default displayErrorWrapper(Button);
