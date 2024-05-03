<script lang="ts">
	import { onMount } from 'svelte';
	let videoPlayer: any;

	export let id = '';
	export let url = '';
	export let isActive = false;

	$: if (isActive) {
		if (videoPlayer) videoPlayer.play();
	} else {
		setTimeout(() => {
			if (videoPlayer) videoPlayer.pause();
		}, 200);
	}

	onMount(() => {
		console.log('Component mounted: ' + id);
	});
</script>

<div class="playerContainer {isActive ? 'active' : 'inactive'}" {id}>
	<media-player
		bind:this={videoPlayer}
		controls={false}
		class="media-player"
		loop
		playsInline
		title="Sprite Fight"
		src={url}
	>
		<media-provider></media-provider>
	</media-player>
</div>

<style lang="scss">
	.playerContainer {
		position: absolute;
		width: 80%;
	}

	.active {
		opacity: 1;
	}

	.inactive {
		opacity: 0.001;
	}
</style>
