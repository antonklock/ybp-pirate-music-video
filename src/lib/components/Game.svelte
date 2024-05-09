<script lang="ts">
	import { scenes, gameGlobals } from '$lib/stores/gameStore';
	import { loadScene } from '$lib/game/utils/scene_management/loadScene';
	import VideoPlayer from './video/VideoPlayer.svelte';
	import VideoDebugButton from './buttons/VideoDebugButton.svelte';
	import BgMusic from '$lib/components/music/BgMusic.svelte';
	import PixiJs from './pixijs/PixiJs.svelte';
	import { onMount } from 'svelte';

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
		$gameGlobals.sceneDimensions = {
			stageWidth: document.documentElement.clientWidth * 0.8,
			stageHeight: document.documentElement.clientWidth * 0.8 * 0.5625
		};
	});

	$: if (globals.sceneDimensions.stageWidth !== document.documentElement.clientWidth * 0.8) {
		$gameGlobals.sceneDimensions = {
			stageWidth: document.documentElement.clientWidth * 0.8,
			stageHeight: document.documentElement.clientWidth * 0.8 * 0.5625
		};

		console.log('Updating scene dimensions...');
		console.log('globals.sceneDimensions: ', globals.sceneDimensions);
	}
</script>

<button
	on:click={() => {
		console.log('Starting game...');

		// Loading the first scene and then loading the rest after 3 seconds.
		loadScene('H0');
		loadScene('H1');

		$gameGlobals.gameStarted = true;
	}}
>
	Start Game</button
>

{#if $gameGlobals.gameStarted}
	<PixiJs />
	<div class="videoPlayers" style={`width: ${$gameGlobals.sceneDimensions.stageWidth}`}>
		{#each loadedScenes as scene}
			<VideoPlayer
				id={scene.id}
				url={scene.url}
				isActive={scene.isActive}
				triggerTime={scene.triggerTime}
				runFunctionAtTime={scene.runFunctionAtTime}
			/>
		{/each}
	</div>

	<div class="buttons">
		{#each loadedScenes as scene}
			{#if scene.id !== 'unloaded'}
				<VideoDebugButton title={`Video ${scene.id}`} play={scene.play} />
				<button
					on:click={() => {
						console.log('Trying to set texture for scene: ', scene.id);

						if (scene.pixiTexture) {
							console.log('Setting texture for scene: ', scene.id);
							console.log('scene.pixiTexture: ', scene.pixiTexture);
							globals.currentTexture = scene.pixiTexture;
						} else {
							console.error('No texture found for scene: ', scene.id);
						}
					}}>Set texture {scene.id}</button
				>
				<!-- <VideoDebugButton title={`Unload ${scene.id}`} play={() => unloadScene(scene.id)} /> -->
			{/if}
		{/each}
	</div>

	<!-- <button on:click={() => loadScene('H1')}>Load scene 1</button> -->
{/if}

<div class="musicControl">
	<label for="music">Music</label>
	<input name="music" type="checkbox" bind:checked={music} />

	<label for="paused">Paused</label>
	<input name="paused" type="checkbox" bind:checked={paused} />

	<BgMusic {music} {paused} />
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

	.musicControl {
		color: white;
		display: flex;
		justify-content: center;
		gap: 10px;
		position: absolute;
		bottom: 40px;
		z-index: 200;
	}
</style>
