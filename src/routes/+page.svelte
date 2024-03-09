<script lang="ts">
	import { pixiJsMain } from '$lib/components/pixijs/pixiMain.js';
	export let data;
	import { onMount } from 'svelte';

	onMount(() => {
		pixiJsMain();
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<ul>
	{#each data.countries as country}
		<li>{country.name}</li>
	{/each}
</ul>
