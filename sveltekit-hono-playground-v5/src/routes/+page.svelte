<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { makeClient } from '$lib/make-client.js';

	let { data } = $props();
	const client = makeClient(fetch);

	let isLoading = $state(false);
	let taskName = $state('');

	async function handleActionClick(id: string, action: `${keyof (typeof client.tasks)[':id']}`) {
		try {
                        console.log("handleActionClick", id, client.tasks.$url());
			isLoading = true;
                        // data update
			await client.tasks[':id'][action].$post({
				param: { id }
			});
			await invalidate(client.tasks.$url());
	         	//await invalidate('app:random');

		} catch (error) {
			console.error(error);
		} finally {
			isLoading = false;
		}
	}
</script>

<h1>BTMW: The best task manager in the world</h1>

<div>
	<h2>New Task</h2>
	<form method="POST" use:enhance>
		<input
			type="text"
			name="name"
			required
			bind:value={taskName}
			disabled={isLoading}
			autofocus
			autocorrect="off"
			autocomplete="off"
		/>
		<button type="submit" disabled={isLoading}>Add</button>
	</form>
</div>

<div>
	<h2>My Tasks</h2>
	{#if data.tasks.length === 0}
		<p>You don't have any tasks! Be free little bird</p>
	{:else}
		<ul>
			{#each data.tasks as task (task.id)}
				<li>
					{task.done ? '✅' : '⬛️'}
					{task.name}
					{#if !task.done}
						<button type="button" onclick={() => handleActionClick(task.id, 'finish')}
							>Finish</button
						>
					{:else}
						<button type="button" onclick={() => handleActionClick(task.id, 'undo')}>Undo</button>
						<button type="button" onclick={() => handleActionClick(task.id, 'delete')}
							>Delete</button
						>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
</div>
