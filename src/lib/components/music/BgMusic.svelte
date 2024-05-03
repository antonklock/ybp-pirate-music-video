<script lang="ts">
	import { gameGlobals } from '$lib/stores/gameStore';

	let music = false;
	let paused = false;

	let globals: GameGlobals;

	gameGlobals.subscribe((gameGlobals) => {
		globals = gameGlobals;
	});
</script>

{#if music}
	{#if globals.gameStarted}
		<audio id="audio" src="/sounds/raise_your_glass.wav" autoplay loop></audio>
		<button
			on:click={() => {
				const audio = document.getElementById('audio');
				if (!audio) return;
				if (audio instanceof HTMLAudioElement) {
					if (paused) {
						paused = false;
						audio.play();
					} else {
						paused = true;
						audio.pause();
					}
				}
			}}>Toggle music</button
		>
	{/if}
{/if}
