import { EXPERIMENTS_API } from '../settings';

const getAssignment = async (experimentId: string) => {
	const response = await fetch(`${EXPERIMENTS_API}/${experimentId}`);
	return response.json();
};

export const experiments = {
	getAssignment,
};

export default experiments;
