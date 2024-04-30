<script lang="ts">
	import { onMount } from 'svelte';

	import 'vidstack/bundle';

	onMount(async () => {});
</script>

<div>
	{#await import('$lib/components/Player.svelte') then { default: Player }}
		<svelte:component this={Player} />
	{/await}
</div>

<style>
</style>
