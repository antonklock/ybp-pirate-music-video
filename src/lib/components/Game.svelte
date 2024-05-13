<script lang="ts">
	import { scenes, gameGlobals } from '$lib/stores/gameStore';
	import { loadScene } from '$lib/game/utils/scene_management/loadScene';
	import VideoPlayer from './video/VideoPlayer.svelte';
	import BgMusic from '$lib/components/music/BgMusic.svelte';
	import PixiJs from './pixijs/PixiJs.svelte';
	import { onMount } from 'svelte';
	import { unloadScene } from '$lib/game/utils/scene_management/unloadScene';

	let globals: GameGlobals;
	let loadedScenes: SceneObject[] = [];

	let music = false;
	let paused = false;

	scenes.subscribe((scenes) => {
		loadedScenes = scenes;
	});

	gameGlobals.subscribe((gameGlobals) => {
		globals = gameGlobals;
	});

	onMount(() => {
		// Setting stage dimensions
		$gameGlobals.sceneDimensions = {
			stageWidth: document.documentElement.clientWidth * 0.8,
			stageHeight: document.documentElement.clientWidth * 0.8 * 0.5625
		};
	});

	// Updating stage dimensions
	$: if (globals.sceneDimensions.stageWidth !== document.documentElement.clientWidth * 0.8) {
		$gameGlobals.sceneDimensions = {
			stageWidth: document.documentElement.clientWidth * 0.8,
			stageHeight: document.documentElement.clientWidth * 0.8 * 0.5625
		};

		console.log('Updating scene dimensions...');
		console.log('globals.sceneDimensions: ', globals.sceneDimensions);
	}
</script>

<div class="stageContainer">
	{#if $gameGlobals.gameStarted}
		<PixiJs />
		<div
			class="videoPlayers"
			style={`width: ${$gameGlobals.sceneDimensions.stageWidth}px; height: ${$gameGlobals.sceneDimensions.stageHeight}px`}
		>
			{#each loadedScenes as scene}
				{#if scene.isLoaded}
					<VideoPlayer
						id={scene.id}
						url={scene.url}
						isActive={scene.isActive}
						triggerTime={scene.triggerTime}
						runFunctionAtTime={scene.runFunctionAtTime}
					/>
				{/if}
			{/each}
		</div>

		<div class="buttons">
			{#each loadedScenes as scene}
				{#if scene.isLoaded}
					<div
						class={'loading-indicator'}
						style={`color: white; font-family: sans-serif; display: flex; justify-content: center; align-items: center; width: 20px; height: 20px; background-color: ${scene.canPlay ? 'green' : 'red'}; border-radius: 50%`}
					>
						V
					</div>
					<button
						on:click={() => {
							if (scene.play) scene.play();

							// Unload previous scenes
							for (const sceneToUnload of loadedScenes) {
								if (sceneToUnload.id !== scene.id) unloadScene(sceneToUnload.id);
							}

							setTimeout(() => {
								// Preload next scenes
								const nextScenes = scene.nextScenes;
								for (const nextScene of nextScenes) {
									loadScene(nextScene);
								}
							}, 2000);
						}}
						disabled={!scene.canPlay}>Play {scene.id}</button
					>
				{/if}
			{/each}
		</div>
	{/if}

	{#if !$gameGlobals.gameStarted}
		<button
			on:click={() => {
				console.log('Starting game...');

				loadScene('H0');

				$gameGlobals.gameStarted = true;
			}}
		>
			Start Game</button
		>
	{/if}
</div>

<!-- <div class="musicControl">
	<label for="music">Music</label>
	<input name="music" type="checkbox" bind:checked={music} />

	<label for="paused">Paused</label>
	<input name="paused" type="checkbox" bind:checked={paused} />

	<BgMusic {music} {paused} />
</div> -->

<style>
	.stageContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
	}

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
		/* position: relative; */
		/* justify-content: center; */
	}

	.musicControl {
		color: white;
		display: flex;
		justify-content: center;
		gap: 10px;
		position: absolute;
		bottom: 40px;
		z-index: 200;
	}

	.loading-indicator {
		margin-left: 20px;
	}
</style>
