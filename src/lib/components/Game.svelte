<script lang="ts">
	import GameStartButton from './GameStartButton.svelte';
	import LastGameSessionDebug from './LastGameSessionDebug.svelte';
	import GameStage from './GameStage.svelte';
	import { gameGlobals } from '$lib/stores/gameStore';
	import { gameSession } from '$lib/stores/gameSessionStore';
	import { onMount } from 'svelte';
	import { endLatestSceneInSession, endGameSession } from '$lib/stores/gameSessionStore';

	let lastGameSession: GameSession;
	let showLastGameSessionDebug = false;

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

		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'q' || event.key === 'Q') {
				showLastGameSessionDebug = !showLastGameSessionDebug;
			}
		};

		window.addEventListener('keydown', handleKeyPress);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
			window.removeEventListener('keydown', handleKeyPress);
		};
	});

	// Updating stage dimensions
	$: if ($gameGlobals.sceneDimensions.stageWidth !== document.documentElement.clientWidth * 0.8) {
		$gameGlobals.sceneDimensions = {
			stageWidth: document.documentElement.clientWidth * 0.8,
			stageHeight: document.documentElement.clientWidth * 0.8 * 0.5625
		};
	}
</script>

<div class="stageContainer">
	{#if $gameGlobals.isGameStarted}
		<GameStage />
	{:else}
		<GameStartButton />
	{/if}
</div>

{#if lastGameSession && showLastGameSessionDebug}
	<LastGameSessionDebug />
{/if}

<style>
	.stageContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
	}
</style>
