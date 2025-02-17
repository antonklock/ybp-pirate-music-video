<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { gameGlobals } from '$lib/stores/gameStore';
	import { scenes } from '$lib/stores/gameStore';
	import { MediaPlayerElement } from 'vidstack/elements';

	let videoPlayer: MediaPlayerElement;

	export let id = '';
	export let url = '';

	$: isActive = $scenes.find((scene) => scene.id === id)?.isActive || false;

	$: if (isActive) {
		if (videoPlayer) {
			if (!isPlaying) {
				videoPlayer.play();
				gameGlobals.update((gameGlobals) => {
					if (videoPlayer) {
						gameGlobals.currentScene.player = videoPlayer;
					} else {
						console.warn('No video player found. Cannot set currentScene in globals.');
					}
					return gameGlobals;
				});
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
				playerTime = 0;
				isPlaying = false;
				playerCanPlay = false;
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
		if (unsubscribe) unsubscribe();
		videoPlayer?.pause();
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
		pointer-events: none;
	}

	.active {
		opacity: 1;
	}

	.inactive {
		opacity: 0.001;
	}
</style>
