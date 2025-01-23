<script lang="ts">
	import { scenes } from '$lib/stores/gameStore';
	import { setActiveScene } from '$lib/game/utils/scene_management/setActiveScene';
	import PixiJs from './pixijs/PixiJs.svelte';
	import VideoPlayer from './video/VideoPlayer.svelte';
	import { gameGlobals } from '$lib/stores/gameStore';
	let loadedScenes: SceneObject[] = [];

	$: loadedScenes = $scenes.filter((scene) => scene.isLoaded);
	$: videoProvider = $gameGlobals.videoProvider;
</script>

<PixiJs />
<div
	class="videoPlayers"
	style={`width: ${$gameGlobals.sceneDimensions.stageWidth}px; height: ${$gameGlobals.sceneDimensions.stageHeight}px`}
>
	{#each $scenes as scene}
		{#if scene.isLoaded}
			<VideoPlayer
				id={scene.id}
				url={scene.urls[videoProvider]}
				triggerTime={scene.triggerTime}
				runFunctionAtTime={scene.runFunctionAtTime}
			/>
		{/if}
	{/each}
</div>
<div class="absolute flex gap-2 bottom-20 justify-center items-center w-screen">
	{#each $scenes as scene}
		{#if scene.isLoaded}
			<div
				class={'ml-20'}
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
				class="bg-white text-black p-2 rounded-md"
				on:click={() => {
					setActiveScene(scene);
				}}
				disabled={!scene.canPlay}>Play {scene.id}</button
			>
		{/if}
	{/each}
</div>
