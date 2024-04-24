<script lang="ts">
	import { onMount } from 'svelte';

	import 'vidstack/bundle';

	onMount(async () => {});

	const sources = [
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/94fa56d67526bb108a120cbb3de20de9/manifest/video.mpd',
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/643b20d80310374034ab98fd48771b1c/manifest/video.mpd',
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/49a8983e44d3de06c7d53afa86c8337f/manifest/video.mpd',
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/543f408de99baf30ad0401671820d6a5/manifest/video.mpd'
	];

	let source = sources[0];
</script>

{#await import('$lib/components/Player.svelte') then { default: Player }}
	<svelte:component this={Player} />
{/await}

<div id="mainContainer">
	<button on:click={() => (source = sources[0])}>Play 0</button>
	<button on:click={() => (source = sources[1])}>Play 1</button>
	<button on:click={() => (source = sources[2])}>Play 2</button>
	<button on:click={() => (source = sources[3])}>Play 3</button>
</div>

<style>
</style>
