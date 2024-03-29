import { useEffect, useState } from 'react';
import experiments from '../../api/experiments';
import { EXPERIMENT_ID } from '../../settings';
import Badge from '../hero/badge';
import { displayErrorWrapper, TKWW } from '../../../utils';

const Hero = () => {
	const [experimentAssignment, setExperimentAssignment] = useState(null);

	useEffect(() => {
		getExperiment();
	}, []);

	const getExperiment = async () => {
		const data = await experiments.getAssignment(EXPERIMENT_ID);
		setExperimentAssignment(data);
	};

	return (
		<div className="hero-container">
			<div className="hero">
				<Badge assignment={experimentAssignment} />
				<TKWW />
			</div>
		</div>
	);
};

export default displayErrorWrapper(Hero);
