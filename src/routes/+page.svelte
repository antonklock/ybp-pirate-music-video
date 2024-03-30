<script lang="ts">
	import { pixiJsMain, setCurrentVideo } from '$lib/components/pixijs/pixiMain';
	export let data;
	import { onMount } from 'svelte';
	import { videos } from '$lib/game/videoConfig';

	let isHidden = true;

	const startVideo = () => {
		isHidden = !isHidden;
	};

	onMount(() => {
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

<button on:click={startVideo}>Start video</button>

<div hidden={isHidden} id="pixiElement"></div>

<button
	on:click={() => {
		const newVideoObject = getVideoObjectByName('Hub');
		setCurrentVideo(newVideoObject);
	}}>Hub</button
>

<button
	on:click={() => {
		const newVideoObject = getVideoObjectByName('Wheel');
		setCurrentVideo(newVideoObject);
	}}>Wheel</button
>
