<script lang="ts">
	import { gameGlobals } from '$lib/stores/gameStore';
	import { startGameSession } from '$lib/stores/gameSessionStore';
	import { loadScene } from '$lib/game/utils/scene_management/loadScene';
	import { getSceneById } from '$lib/game/utils/scene_management/getSceneById';
	import { addNewPlayerSprite } from '$lib/game/utils/pixiUtils/addNewSprite';
</script>

<button
	class="bg-white text-black p-2 rounded-md"
	on:click={() => {
		console.log('Starting game...');

		const sceneLoaded = loadScene('G0');
		if (!sceneLoaded) return console.warn('Scene G0 not found');

		$gameGlobals.isGameStarted = true;
		$gameGlobals.gameStartedAt = new Date();

		startGameSession();

		// setTimeout(() => {
		// 	const scene = getSceneById('G0');
		// 	console.log('scene:', scene);
		// 	if (scene) {
		// 		const videoPlayer = scene.player?.querySelector('video');
		// 		console.log('videoPlayer:', videoPlayer);
		// 		if (videoPlayer) {
		// 			addNewPlayerSprite(scene, videoPlayer);
		// 		} else {
		// 			console.warn('No video player found for scene:', scene.id);
		// 		}
		// 	} else {
		// 		console.warn('Scene not found');
		// 	}
		// }, 3000);
	}}
>
	Start Game
</button>
