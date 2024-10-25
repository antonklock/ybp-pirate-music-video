<script lang="ts">
	import { gameSession } from '$lib/stores/gameSessionStore';
	import { onMount } from 'svelte';
	import { endLatestSceneInSession, endGameSession } from '$lib/stores/gameSessionStore';

	let lastGameSession: GameSession;

	onMount(() => {
		if (localStorage.gameSession) lastGameSession = JSON.parse(localStorage.gameSession);

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
		{#if lastGameSession}
			{#each lastGameSession.sceneOrder as scene}
				<div
					class="sceneOrderItem"
					style={`width: ${getPercentage(scene)}%; height: 28px; background-color: ${getRandomColor()}`}
				>
					{scene.sceneId} - {(scene.elapsedTime / 1000).toFixed(2)}s
				</div>
			{/each}
		{/if}
	</div>
</div>

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

	.localStorage {
		color: white;
		display: flex;
		justify-content: center;
		gap: 10px;
		position: absolute;
		bottom: 40px;
		z-index: 200;
	}
</style>
