<script lang="ts">
	import { onMount } from 'svelte';
	import VideoPlayer from './video/VideoPlayer.svelte';
	import { scenes, gameGlobals } from '$lib/stores/gameStore';
	import VideoDebugButton from './buttons/VideoDebugButton.svelte';
	import BgMusic from '$lib/components/music/BgMusic.svelte';
	import { loadSceneAndPlay } from '$lib/game/utils/scene_management/loadSceneAndPlay';
	import { loadScene } from '$lib/game/utils/scene_management/loadScene';

	let globals: GameGlobals;
	let music = false;
	let paused = false;

	let loadedScenes: SceneObject[] = [];

	scenes.subscribe((scenes) => {
		loadedScenes = scenes;
	});

	gameGlobals.subscribe((gameGlobals) => {
		globals = gameGlobals;
	});

	onMount(() => {});

	const loadFirstScene = () => {
		scenes.subscribe((scenes) => {
			loadedScenes = [...loadedScenes, scenes[0]];
			console.log('Loaded scenes: ', loadedScenes);
		});
	};

	const playVideo = (index: number) => {
		scenes.update((scenes) => {
			scenes.forEach((scene) => {
				if (scene.id !== index) scene.isActive = false;
			});
			scenes[index].isActive = true;
			return scenes;
		});
	};

	const hideAndPauseVideo = () => {};

	const showAndPlayVideo = () => {};

	const removeElement = () => {};
</script>

<button
	on:click={() => {
		console.log('Starting game...');
		loadScene(0);
		loadScene(1);
		$gameGlobals.gameStarted = true;
	}}
>
	Start Game</button
>

<div class="videoPlayers">
	{#each loadedScenes as scene}
		<VideoPlayer id={`videoPlayer${scene.id}`} url={scene.url} isActive={scene.isActive} />
	{/each}
</div>

<div class="buttons">
	{#each loadedScenes as scene}
		<VideoDebugButton title={`Video ${scene.id}`} play={scene.play} />
	{/each}
</div>

<BgMusic {music} {paused} />

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
