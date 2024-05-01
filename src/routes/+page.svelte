<script lang="ts">
	import { onMount } from 'svelte';

	import 'vidstack/bundle';

	onMount(async () => {});
</script>

<div>
	{#await import('$lib/components/Game.svelte') then { default: Game }}
		<svelte:component this={Game} />
	{/await}

	<p>This is some text.</p>
</div>

<style>
</style>
