<script lang="ts">
    import type { ApiRoute } from '$lib/server';
    import { hc } from 'hono/client';

    const client = hc<ApiRoute>('/api');

    const helloPromise = getHello();
    const currentDatePromise = getCurrentDate();
    const allBookPromise = getAllBook();

    async function getHello() {
        const res = await client.hello.$get({ query: { name: 'Hono' } });
        const data = await res.json();
        return data;
    }

    async function getCurrentDate() {
        const res = await client.currentDate.$get();
        const data = await res.json();
        return data;
    }

    async function getAllBook() {
        const res = await client.book.all.$get();
        const data = await res.json();
        return data;
    }
</script>

<h2>/hello</h2>
{#await helloPromise}
    <p>Loading...</p>
{:then hello}
    <p>{hello.message}</p>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}

<h2>/currentDate</h2>
{#await currentDatePromise}
    <p>Loading...</p>
{:then currentDate}
    <p>{currentDate.datetime.toLocaleString()}</p>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}

<h2>/book/all</h2>
{#await allBookPromise}
    <p>Loading...</p>
{:then allBook}
    <p>{allBook.message}</p>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
