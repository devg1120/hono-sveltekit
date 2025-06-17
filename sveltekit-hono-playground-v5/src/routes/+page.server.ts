import { TaskCreateInput } from '$lib/api';
import { makeClient } from '$lib/make-client';
import type { Actions } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const actions = {
	async default({ fetch, request }) {
	        console.log("server actions");
		const client = makeClient(fetch);
		const form = await request.formData();
		const data = TaskCreateInput.parse(Object.fromEntries(form));
		const response = await client.tasks.$post({
			json: data
		});

		if (!response.ok) {
			return {
				message: 'An error occurred'
			};
		}

		return await response.json();
	}
} satisfies Actions;

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

