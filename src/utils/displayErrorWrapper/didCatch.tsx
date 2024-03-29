import React, { Component, ErrorInfo, PropsWithChildren } from 'react';
import ErrorUI from './errorUI';

class DisplayErrorWrapper extends Component<PropsWithChildren> {
	state = { error: null, errorInfo: null };

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		this.setState({
			error: error,
			errorInfo: errorInfo,
		});
	}

	render() {
		const { error, errorInfo } = this.state;

		if (errorInfo) {
			return <ErrorUI error={error} errorInfo={errorInfo} />;
		}

		return this.props.children;
	}
}

export default DisplayErrorWrapper;
