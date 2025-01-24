<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { gameGlobals } from '$lib/stores/gameStore';
	import { scenes } from '$lib/stores/gameStore';
	import { MediaPlayerElement } from 'vidstack/elements';
	import { getSceneById } from '$lib/game/utils/scene_management/getSceneById';
	import { addNewPlayerSprite } from '$lib/game/utils/pixiUtils/addNewSprite';

	let videoPlayer: MediaPlayerElement;

	export let id = '';
	export let url = '';
	export let hidePlayers = false;

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

		// addPlayerToSceneObject();

		const scene = getSceneById(id);
		// console.log('scene:', scene);

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

	// const addPlayerToSceneObject = () => {
	// 	scenes.update((scenes) => {
	// 		scenes.forEach((scene) => {
	// 			if (scene.id === id) {
	// 				scene.player = videoPlayer;
	// 			}
	// 		});
	// 		return scenes;
	// 	});
	// };

	$: if (playerCanPlay) {
		scenes.update((scenes) => {
			scenes.forEach((scene) => {
				if (scene.id === id) {
					scene.player = videoPlayer;
					scene.canPlay = playerCanPlay;
					const videoPlayerElement = videoPlayer.querySelector('video');
					if (videoPlayerElement) addNewPlayerSprite(scene, videoPlayerElement);
					else console.warn('No video player found for scene:', scene.id);
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

<!-- <div
	class="playerContainer {isActive ? 'active' : 'inactive'}"
	id={`videoPlayer${id}`}
	style="width: 100%; height: 100%; object-fit: cover; "
> -->
<div
	class="playerContainer {isActive ? 'active' : 'inactive'} absolute top-0 left-0 w-10 h-10"
	id={`videoPlayer${id}`}
>
	<media-player
		bind:this={videoPlayer}
		controls={false}
		class="media-player"
		loop={false}
		playsInline
		src={url}
		style={`opacity: ${hidePlayers ? 0 : 1}`}
	>
		<media-provider></media-provider>
	</media-player>
</div>
