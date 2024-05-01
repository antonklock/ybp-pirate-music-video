<script lang="ts">
	import { onMount } from 'svelte';
	import VideoPlayer from './video/VideoPlayer.svelte';
	import { scenes } from '$lib/stores/gameStore';
	import VideoDebugButton from './buttons/VideoDebugButton.svelte';

	let videoScenes: SceneObject[] = [];

	scenes.subscribe((scenes) => {
		videoScenes = scenes;
	});

	onMount(() => {
		const videoContainer = document.querySelector('.videoPlayers') as HTMLElement;
		const buttonContainer = document.querySelector('.buttons');

		if (!videoContainer) return console.error('No video container found');
		if (!buttonContainer) return console.error('No button container found');

		for (let i = 0; i < videoScenes.length; i++) {
			const scene = videoScenes[i];

			const player = createVideoPlayer(scene, videoContainer);

			scenes.update((vidScenes) => {
				if (player) {
					vidScenes[i].videoPlayerComponent = player;
				}
				return vidScenes;
			});

			new VideoDebugButton({
				target: buttonContainer,
				props: {
					title: `Video ${i}`,
					play: videoScenes[i].videoPlayerComponent.play
				}
			});
		}
	});

	const createVideoPlayer = (scene: SceneObject, target: HTMLElement) => {
		const player = new VideoPlayer({
			target,
			props: {
				props: {
					id: `videoPlayer${scene.id}`,
					url: scene.url,
					isActive: scene.isActive
				},
				play: () => {
					console.log('play from ' + scene.id);
				},
				pause: () => {
					console.log('pause from ' + scene.id);
				}
			}
		});

		return player;
	};

	const playVideo = (index: number) => {};

	const hideAndPauseVideo = () => {};

	const showAndPlayVideo = () => {};

	const removeElement = () => {};
</script>

<div class="videoPlayers"></div>

<div class="buttons"></div>

<style>
	.buttons {
		display: flex;
		justify-content: center;
		width: 99vw;
		gap: 10px;
		bottom: 20px;
		position: absolute;
		z-index: 100;
	}

	.videoPlayers {
		position: relative;
		display: flex;
		justify-content: center;
	}
</style>
