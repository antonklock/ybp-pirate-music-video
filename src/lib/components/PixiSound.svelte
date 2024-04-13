<script lang="ts">
	import type { SoundLibrary } from '@pixi/sound';
	import { onMount } from 'svelte';

	// This is a workaround to import the sound module from PixiJS
	let sound: SoundLibrary;

	onMount(async () => {});

	async function playSound() {
		const { sound: loadedSound } = await import('@pixi/sound');
		sound = loadedSound;
		sound.add('music', '/sounds/music.wav');

		console.log('Sound is loaded');
		sound.play('music');
	}
</script>

<br />
<br />
<br />
<p>Sound is activated</p>
<button on:click={playSound}>Start music</button>
