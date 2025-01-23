<script lang="ts">
	import { onMount } from 'svelte';
	import { gameGlobals } from '$lib/stores/gameStore';
	import 'vidstack/bundle';

	onMount(async () => {});
</script>

<div class="gameContainer">
	{#await import('$lib/components/Game.svelte') then { default: Game }}
		<svelte:component this={Game} />
		<button
			on:click={() => ($gameGlobals.videoProvider = 'cloudflare')}
			disabled={$gameGlobals.videoProvider === 'cloudflare'}>Change to Cloudflare</button
		>
		<button
			on:click={() => ($gameGlobals.videoProvider = 'mux')}
			disabled={$gameGlobals.videoProvider === 'mux'}>Change to Mux</button
		>
	{/await}
</div>

<style>
</style>
