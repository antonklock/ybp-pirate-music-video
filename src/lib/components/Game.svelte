<script lang="ts">
	import { scenes, gameGlobals } from '$lib/stores/gameStore';
	import { loadScene } from '$lib/game/utils/scene_management/loadScene';
	import VideoPlayer from './video/VideoPlayer.svelte';
	import VideoDebugButton from './buttons/VideoDebugButton.svelte';
	import BgMusic from '$lib/components/music/BgMusic.svelte';
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
</script>

<button
	on:click={() => {
		console.log('Starting game...');

		// Loading the first scene and then loading the rest after 3 seconds.
		loadScene('H0', {
			triggerTime: 3,
			runFunctionAtTime: () => {
				loadScene('H1', {
					triggerTime: 3,
					runFunctionAtTime: () => {
						unloadScene('H0');
						unloadScene('H2');
						unloadScene('H3');
					}
				});
				loadScene('H2', {
					triggerTime: 3,
					runFunctionAtTime: () => {
						unloadScene('H0');
						unloadScene('H1');
						unloadScene('H3');
					}
				});
				loadScene('H3', {
					triggerTime: 3,
					runFunctionAtTime: () => {
						unloadScene('H0');
						unloadScene('H1');
						unloadScene('H2');
					}
				});
			}
		});

		$gameGlobals.gameStarted = true;
	}}
>
	Start Game</button
>

<div class="videoPlayers">
	{#each loadedScenes as scene}
		<VideoPlayer
			id={`videoPlayer${scene.id}`}
			url={scene.url}
			isActive={scene.isActive}
			triggerTime={scene.triggerTime}
			runFunctionAtTime={scene.runFunctionAtTime}
		/>
	{/each}
</div>

<div class="buttons">
	{#each loadedScenes as scene}
		<VideoDebugButton title={`Video ${scene.id}`} play={scene.play} />
		<VideoDebugButton title={`Unload ${scene.id}`} play={() => unloadScene(scene.id)} />
	{/each}
</div>

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
