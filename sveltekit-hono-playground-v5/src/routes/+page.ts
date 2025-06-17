import { makeClient } from '$lib/make-client';
import type { PageLoad } from './$types';
/*
export const load = (async ({ fetch,  depends }) => {
	console.log("load....");

	const client = makeClient(fetch);
	const tasks = await client.tasks.$get();

	//depends(client.tasks.$url());
	depends('/api/tasks');
	//depends('app:random');

	if (!tasks.ok) {
		return { tasks: [] };
	}

	return {
		tasks: await tasks.json()
	};
}) satisfies PageLoad;
*/
