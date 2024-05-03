<script lang="ts">
	import { onMount } from 'svelte';
	import { scenes, gameGlobals } from '$lib/stores/gameStore';
	import { loadScene } from '$lib/game/utils/scene_management/loadScene';
	import VideoPlayer from './video/VideoPlayer.svelte';
	import VideoDebugButton from './buttons/VideoDebugButton.svelte';
	import BgMusic from '$lib/components/music/BgMusic.svelte';

	let globals: GameGlobals;
	let loadedScenes: SceneObject[] = [];

	scenes.subscribe((scenes) => {
		loadedScenes = scenes;
	});

	gameGlobals.subscribe((gameGlobals) => {
		globals = gameGlobals;
	});

	onMount(() => {});
</script>

<button
	on:click={() => {
		console.log('Starting game...');

		loadScene(0);
		loadScene(1);
		loadScene(2);
		loadScene(3);

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

<BgMusic />

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
