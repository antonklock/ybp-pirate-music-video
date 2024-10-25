<script lang="ts">
	import { scenes } from '$lib/stores/gameStore';
	import { setActiveScene } from '$lib/game/utils/scene_management/setActiveScene';
	import PixiJs from './pixijs/PixiJs.svelte';
	import VideoPlayer from './video/VideoPlayer.svelte';
	import { gameGlobals } from '$lib/stores/gameStore';
	let loadedScenes: SceneObject[] = [];

	$: loadedScenes = $scenes.filter((scene) => scene.isLoaded);
</script>

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
				triggerTime={scene.triggerTime}
				runFunctionAtTime={scene.runFunctionAtTime}
			/>
		{/if}
	{/each}
</div>
<div class="buttons">
	{#each $scenes as scene}
		{#if scene.isLoaded}
			<div
				class={'loading-indicator'}
				style={'color: white; font-family: sans-serif; display: flex; justify-content: center; align-items: center;'}
			>
				<div
					style={`color: white; font-family: sans-serif; display: flex; justify-content: center; align-items: center; width: 20px; height: 20px; background-color: ${scene.canPlay ? 'green' : 'red'}; border-radius: 50%;`}
				>
					<p style={'scale: 70%;'}>V</p>
				</div>
				{#each scene.hitboxes as hitboxIndicator}
					<div
						style={`color: white; font-family: sans-serif; display: flex; justify-content: center; align-items: center; width: 20px; height: 20px; background-color: ${hitboxIndicator.isActive ? 'green' : 'red'}; border-radius: 10%; margin-left: 5px;`}
					>
						<p style={'scale: 70%;'}>
							{hitboxIndicator.name.substring(3, hitboxIndicator.name.length)}
						</p>
					</div>
				{/each}
			</div>

			<button
				on:click={() => {
					setActiveScene(scene);
				}}
				disabled={!scene.canPlay}>Play {scene.id}</button
			>
		{/if}
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

	.loading-indicator {
		margin-left: 20px;
	}

	.loading-indicator > div:first-child {
		margin-right: 5px;
	}
</style>
