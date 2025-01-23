<script lang="ts">
	import { gameGlobals } from '$lib/stores/gameStore';
	import { startGameSession } from '$lib/stores/gameSessionStore';
	import { loadScene } from '$lib/game/utils/scene_management/loadScene';
</script>

<button
	on:click={() => {
		console.log('Starting game...');

		const sceneLoaded = loadScene('G0');
		if (!sceneLoaded) return console.warn('Scene G0 not found');

		$gameGlobals.isGameStarted = true;
		$gameGlobals.gameStartedAt = new Date();

		startGameSession();
	}}
>
	Start Game
</button>
