import React, { FunctionComponent, PropsWithChildren } from 'react';
import '../styles/tooltip.css';
import type { HasUUID, TextType } from '../types';
import Text from './text';

interface TooltipProps {
	text: TextType | HasUUID<TextType>[];
}

const Tooltip: FunctionComponent<PropsWithChildren<TooltipProps>> = (props) => {
	const { text, children } = props;

	return (
		<div className="tooltip">
			{children}
			<span className="tooltip-container">
				{Array.isArray(text) ? (
					text.map((item) => <Text key={item.uuid} line={item.line} />)
				) : (
					<Text line={text.line} />
				)}
			</span>
		</div>
	);
};

export default Tooltip;
