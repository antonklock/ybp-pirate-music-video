<script lang="ts">
	import { onMount } from 'svelte';

	import 'vidstack/bundle';

	onMount(async () => {});
</script>

<div class="gameContainer">
	{#await import('$lib/components/Game.svelte') then { default: Game }}
		<svelte:component this={Game} />
	{/await}
</div>

<style>
</style>
