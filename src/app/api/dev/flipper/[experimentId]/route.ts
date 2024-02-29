import { type NextRequest, NextResponse } from 'next/server';
import experiments from '../../../../../server/experiments';

export async function GET(
	request: NextRequest,
	{ params }: { params: { experimentId: string } },
) {
	if (!params.experimentId) {
		return new NextResponse('Bad Request', { status: 404 });
	}

	const { experimentId } = params;
	const experiment = experiments.find((e) => e.id === experimentId);

	if (!experiment) {
		return new NextResponse(
			JSON.stringify({
				assignment: null,
				error: `Experiment ${experimentId} is not a valid experiment.`,
			}),
			{ status: 404 },
		);
	}

	const { rollout, assignments } = experiment;
	const rolloutNumber = Math.random() * 100;

	if (rolloutNumber >= rollout) {
		return new NextResponse(JSON.stringify({ assignment: null }), {
			status: 200,
		});
	}

	let assignmentNumber = Math.random() * 100;
	let index = 0;
	let allocation = assignments[index].allocation;

	while (allocation < assignmentNumber) {
		index += 1;
		allocation = assignments[index].allocation;
		assignmentNumber -= allocation;
	}

	const assignment = {
		id: assignments[index].id,
		name: assignments[index].name,
	};

	return new NextResponse(JSON.stringify({ assignment }), { status: 200 });
}

export const fetchCache = 'force-no-store';
