<script lang="ts">
	import { gameGlobals } from '$lib/stores/gameStore';
	import { Howl, Howler } from 'howler';

	let musicHowl = new Howl({
		src: ['/sounds/raise_your_glass.wav'],
		loop: true
	});

	let time = 0;

	setInterval(() => {
		time = musicHowl.seek();
		time = Math.round(time * 100) / 100;
	}, 16);

	let globals: GameGlobals;

	gameGlobals.subscribe((gameGlobals) => {
		globals = gameGlobals;
	});
</script>

{#if globals.gameStarted}
	<div>
		<button
			on:click={() => {
				if (musicHowl.playing()) {
					musicHowl.pause();
				} else {
					musicHowl.play();
				}
			}}>Toggle music</button
		>
		<p>Time: {time}</p>
	</div>
{/if}

<style>
	div {
		color: white;
	}
</style>
