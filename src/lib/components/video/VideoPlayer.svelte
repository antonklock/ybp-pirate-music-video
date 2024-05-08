<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { gameGlobals } from '$lib/stores/gameStore';
	import { scenes } from '$lib/stores/gameStore';
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
	let playerCanPlay = false;

	onMount(() => {
		console.log('Component mounted: ' + id);

		type VpState = {
			currentTime: number;
			playing: boolean;
			canPlay: boolean;
		};

		unsubscribe = videoPlayer.subscribe(({ currentTime, playing, canPlay }: VpState) => {
			playerTime = currentTime;
			isPlaying = playing;
			playerCanPlay = canPlay;

			return () => {
				// Cleanup here
			};
		});
	});

	$: if (playerCanPlay) {
		scenes.update((scenes) => {
			scenes.forEach((scene) => {
				if (scene.id === id) {
					scene.canPlay = playerCanPlay;
				}
			});
			return scenes;
		});
	}

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

<div
	style={`width: ${$gameGlobals.sceneDimensions.stageWidth}px`}
	class="playerContainer {isActive ? 'active' : 'inactive'}"
	id={`videoPlayer${id}`}
>
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
		overflow: hidden;
	}

	.active {
		opacity: 1;
	}

	.inactive {
		opacity: 0.001;
	}
</style>
