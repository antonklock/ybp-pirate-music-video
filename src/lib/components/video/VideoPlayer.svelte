<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
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

	let time = 0;

	let unsubscribe: any;

	onMount(() => {
		console.log('Component mounted: ' + id);

		type VpState = {
			currentTime: number;
		};

		unsubscribe = videoPlayer.subscribe(({ currentTime }: VpState) => {
			time = currentTime;

			return () => {
				// Cleanup here if needed.
			};
		});
	});

	onDestroy(() => {
		console.log('Component destroyed: ' + id);
		if (unsubscribe) unsubscribe();
	});

	$: {
		console.log('Time: ' + time);
	}
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
		on:timeupdate={() => {
			if (videoPlayer.currentTime > 3) {
				console.log('Video has played for 3 seconds');
			}
		}}
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
