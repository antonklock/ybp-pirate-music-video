<script lang="ts">
	export let data;
	import {
		pixiJsMain,
		playAllVideos,
		playCurrentVideo,
		setCurrentVideo
	} from '$lib/components/pixijs/pixiMain';
	import { onMount } from 'svelte';
	import { videos } from '$lib/game/videoConfig';
	import PixiSound from '$lib/components/PixiSound.svelte';

	let isHidden = true;

	const startVideo = () => {
		const newVideoObject = getVideoObjectByName('Hub');
		setCurrentVideo(newVideoObject);

		playAllVideos();

		setTimeout(() => {
			// pauseAllVideos();
			// stopAllVideos();
			playCurrentVideo();

			isHidden = !isHidden;
		}, 2000);
	};

	onMount(async () => {
		const pixiElement = document.getElementById('pixiElement');
		if (pixiElement) pixiJsMain(pixiElement);
	});

	const getVideoObjectByName = (name: string) => {
		const videoObject = videos.filter((videoObject) => {
			if (videoObject.name === name) return videoObject;
		});

		return videoObject[0];
	};
</script>

<h1>Welcome to Pirate Music Video</h1>
<p>This is a testing ground for our new project</p>

<ul>
	{#each data.countries as country}
		<li>{country.name}</li>
	{/each}
</ul>

<button on:click={startVideo}>Start videos</button>

<div hidden={isHidden} id="pixiElement"></div>

<div hidden={isHidden}>
	<button
		on:click={() => {
			const newVideoObject = getVideoObjectByName('Hub');
			setCurrentVideo(newVideoObject);

			playCurrentVideo();
		}}>Hub</button
	>

	<button
		on:click={() => {
			const newVideoObject = getVideoObjectByName('Wheel');
			setCurrentVideo(newVideoObject);

			playCurrentVideo();
		}}>Wheel</button
	>

	<button
		on:click={() => {
			const newVideoObject = getVideoObjectByName('Painting');
			setCurrentVideo(newVideoObject);

			playCurrentVideo();
		}}>Painting</button
	>

	<button
		on:click={() => {
			const newVideoObject = getVideoObjectByName('Lamp');
			setCurrentVideo(newVideoObject);

			playCurrentVideo();
		}}>Lamp</button
	>
</div>

<PixiSound />
