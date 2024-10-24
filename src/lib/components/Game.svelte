<script lang="ts">
	import { scenes, gameGlobals } from '$lib/stores/gameStore';
	import { gameSession, startGameSession } from '$lib/stores/gameSessionStore';
	import { loadScene } from '$lib/game/utils/scene_management/loadScene';
	import { onMount } from 'svelte';
	import { setActiveScene } from '$lib/game/utils/scene_management/setActiveScene';
	import VideoPlayer from './video/VideoPlayer.svelte';
	import PixiJs from './pixijs/PixiJs.svelte';
	import { endLatestSceneInSession, endGameSession } from '$lib/stores/gameSessionStore';

	let lastGameSession: GameSession;

	// let music = false;
	// let paused = false;

	onMount(() => {
		if (localStorage.gameSession) lastGameSession = JSON.parse(localStorage.gameSession);

		// Setting stage dimensions
		$gameGlobals.sceneDimensions = {
			stageWidth: document.documentElement.clientWidth * 0.8,
			stageHeight: document.documentElement.clientWidth * 0.8 * 0.5625
		};

		const handleBeforeUnload = () => {
			endLatestSceneInSession();
			endGameSession();

			localStorage.setItem('gameSession', JSON.stringify($gameSession));
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	});

	// Updating stage dimensions
	$: if ($gameGlobals.sceneDimensions.stageWidth !== document.documentElement.clientWidth * 0.8) {
		$gameGlobals.sceneDimensions = {
			stageWidth: document.documentElement.clientWidth * 0.8,
			stageHeight: document.documentElement.clientWidth * 0.8 * 0.5625
		};

		// console.log('Updating scene dimensions...');
		// console.log('globals.sceneDimensions: ', $gameGlobals.sceneDimensions);
	}

	function getRandomColor() {
		const hue = Math.floor(Math.random() * 360);
		const saturation = Math.floor(Math.random() * 50) + 50; // 50-100%
		const lightness = Math.floor(Math.random() * 30) + 10; // 10-40%
		return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	}

	function getPercentage(scene: { elapsedTime: number }) {
		if (!lastGameSession) return 0;

		const totalTime = lastGameSession.sceneOrder.reduce((acc, scene) => acc + scene.elapsedTime, 0);
		return (scene.elapsedTime / totalTime) * 100;
	}
</script>

<div class="stageContainer">
	{#if $gameGlobals.isGameStarted}
		<PixiJs />
		<div
			class="videoPlayers"
			style={`width: ${$gameGlobals.sceneDimensions.stageWidth}px; height: ${$gameGlobals.sceneDimensions.stageHeight}px`}
		>
			{#each $scenes as scene}
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
	{/if}

	{#if !$gameGlobals.isGameStarted}
		<button
			on:click={() => {
				console.log('Starting game...');

				const scene = loadScene('G0');

				if (!scene) return console.warn('Scene G0 not found');

				$gameGlobals.isGameStarted = true;
				$gameGlobals.gameStartedAt = new Date();

				startGameSession();
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

{#if lastGameSession}
	<div class="localStorage">
		<button
			on:click={() => {
				console.log(localStorage.gameSession);
			}}
		>
			Print Local Storage
		</button>
		<button
			on:click={() => {
				localStorage.removeItem('gameSession');
			}}
		>
			Clear Local Storage
		</button>
		<div class="sceneOrderContainer">
			{#each lastGameSession.sceneOrder as scene, index}
				<div
					class="sceneOrderItem"
					style={`width: ${getPercentage(scene)}%; height: 28px; background-color: ${getRandomColor()}`}
				>
					{scene.sceneId} - {(scene.elapsedTime / 1000).toFixed(2)}s
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.sceneOrderItem {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: red;
		height: 25px;
		z-index: 300;
		border-radius: 5px;
		font-family: sans-serif;
		border: 1px solid slategray;
	}

	.sceneOrderContainer {
		border-radius: 5px;
		padding: 6px;
		background-color: darkslategray;
		display: flex;
		flex-direction: row;
		justify-content: left;
		align-items: center;
		gap: 2px;
		position: absolute;
		bottom: 40px;
		left: 0px;
		z-index: 200;
		width: 95vw;
		height: 30px;
		font-size: 11px;
		border: 1px solid slategray;
	}

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

	/* .videoPlayers {
		position: relative;
		justify-content: center;
	} */

	/* .musicControl {
		color: white;
		display: flex;
		justify-content: center;
		gap: 10px;
		position: absolute;
		bottom: 40px;
		z-index: 200;
	} */

	.localStorage {
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

	.loading-indicator > div:first-child {
		margin-right: 5px;
	}
</style>
