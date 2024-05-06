<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	let videoPlayer: any;

	export let id = '';
	export let url = '';
	export let isActive = false;

	$: if (isActive) {
		if (videoPlayer) {
			if (!isPlaying) {
				console.log('Playing video: ' + id);
				videoPlayer.play();
			}
		}
	} else {
		setTimeout(() => {
			if (videoPlayer) {
				if (isPlaying) {
					videoPlayer.pause();
				}
			}
		}, 200);
	}

	let playerTime = 0;
	let triggered = false;
	let unsubscribe: any;
	let isPlaying = false;

	onMount(() => {
		console.log('Component mounted: ' + id);

		type VpState = {
			currentTime: number;
			playing: boolean;
		};

		unsubscribe = videoPlayer.subscribe(({ currentTime, playing }: VpState) => {
			playerTime = currentTime;
			isPlaying = playing;

			return () => {
				// Cleanup here if needed.
			};
		});
	});

	export let triggerTime: number | undefined = undefined;
	export let runFunctionAtTime: (() => void) | undefined = undefined;

	onDestroy(() => {
		console.log('Component destroyed: ' + id);
		if (unsubscribe) unsubscribe();
	});

	$: if (!triggered) {
		if (playerTime > 0) {
			if (triggerTime && runFunctionAtTime) {
				if (playerTime > triggerTime) {
					triggered = true;
					runFunctionAtTime();
				}
			} else {
				triggered = true;
			}
		}
	}
</script>

<div class="playerContainer {isActive ? 'active' : 'inactive'}" {id}>
	<media-player
		bind:this={videoPlayer}
		controls={false}
		class="media-player"
		loop={false}
		playsInline
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
