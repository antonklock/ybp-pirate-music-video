<script lang="ts">
	import { gameGlobals } from '$lib/stores/gameStore';
	import { startGameSession } from '$lib/stores/gameSessionStore';
	import { loadScene } from '$lib/game/utils/scene_management/loadScene';
	import { setActiveScene } from '$lib/game/utils/scene_management/setActiveScene';
</script>

<button
	on:click={() => {
		console.log('Starting game...');

		const scene = loadScene('G0');
		if (!scene) return console.warn('Scene G0 not found');

		$gameGlobals.isGameStarted = true;
		$gameGlobals.gameStartedAt = new Date();

		setActiveScene(scene);

		startGameSession();
	}}
>
	Start Game
</button>
