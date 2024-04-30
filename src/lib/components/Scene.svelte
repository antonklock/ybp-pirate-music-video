<script lang="ts">
	import { scenes, gameGlobals } from '$lib/stores/gameStore';
	import { onMount } from 'svelte';

	export let sceneId: number;
	export let hidden: boolean = false;

	let mainSceneContainer: HTMLDivElement | null;
	let sceneDimensions: { stageWidth: number; stageHeight: number };
	let dashjs: DashJs | null;

	gameGlobals.subscribe(async (value) => {
		mainSceneContainer = value.mainVideoElement;
		sceneDimensions = value.sceneDimensions;
		dashjs = value.dashjs;
	});

	let scene: SceneObject;
	scenes.subscribe((value) => {
		scene = value[sceneId];
	});

	let videoElement: HTMLVideoElement;

	onMount(() => {
		if (!mainSceneContainer) throw new Error('mainSceneContainer is not defined');

		const videoPlayer = dashjs.MediaPlayer().create();
		mainSceneContainer.appendChild(videoElement);

		videoPlayer.initialize(videoElement, scene.url, false);
		videoPlayer.setMute(true);
		videoElement.controls = false;
		videoElement.playsInline = true;
		videoElement.style.position = 'absolute';
		videoElement.style.width = `${sceneDimensions.stageWidth}px`;
		videoElement.style.height = `${sceneDimensions.stageHeight}px`;
		videoElement.preload = 'metadata';
		videoElement.style.borderRadius = '5px';
		videoElement.classList.add('video');
		videoElement.id = `scene-${sceneId}`;
		videoElement.style.display = hidden ? 'none' : 'block';

		style = {
			width: `${sceneDimensions.stageWidth}px`,
			height: `${sceneDimensions.stageHeight}px`,
			borderRadius: '5px'
		};
	});

	let style;
</script>

<video style="style" class="video" autoplay={true} bind:this={videoElement}>
	<!-- <source type="application/dash+xml" src={scene.url} /> -->
	<track kind="captions" />
</video>
