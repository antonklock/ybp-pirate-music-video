<script lang="ts">
	import { onMount } from 'svelte';
	import VideoPlayer from './video/VideoPlayer.svelte';
	import { scenes } from '$lib/stores/gameStore';
	import VideoDebugButton from './buttons/VideoDebugButton.svelte';

	let videoScenes: SceneObject[] = [];

	onMount(() => {
		scenes.subscribe((scenes) => {
			videoScenes = scenes;
		});
	});

	const playVideo = (index: number) => {
		scenes.update((scenes) => {
			scenes.forEach((scene) => {
				scene.isActive = false;
			});
			scenes[index].isActive = true;
			return scenes;
		});
	};

	const hideAndPauseVideo = () => {};

	const showAndPlayVideo = () => {};

	const removeElement = () => {};
</script>

<div class="videoPlayers">
	{#each videoScenes as scene}
		<VideoPlayer id={`videoPlayer${scene.id}`} url={scene.url} isActive={scene.isActive} />
	{/each}
</div>

<div class="buttons">
	{#each videoScenes as scene}
		<VideoDebugButton title={`Video ${scene.id}`} play={() => playVideo(scene.id)} />
	{/each}
</div>

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
