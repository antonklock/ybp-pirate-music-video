<script lang="ts">
	import { onMount } from 'svelte';
	import { Application, Assets, Sprite, Texture } from 'pixi.js';

	const videoUrls = [
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/e7634c71f936fe50eb555a45f1263548/manifest/video.mpd',
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/aec3884a2d861238267ef6df82680c90/manifest/video.mpd',
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/79b80511e39039c9c99b127f6f515e0e/manifest/video.mpd',
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/0bbec7b68c56905e6b10959ce15d91e3/manifest/video.mpd'
	];

	let currentVideoIndex = 0;
	let videoPlayers: dashjs.MediaPlayerClass[] = [];
	let videoElements: HTMLVideoElement[] = [];
	let mainVideoElement: HTMLVideoElement | null = null;

	let hiddenCanvas: HTMLCanvasElement;
	let canvasContext: CanvasRenderingContext2D | null;

	let videoTexture: Texture;
	let videoSprite: Sprite;

	onMount(async () => {
		mainVideoElement = document.querySelector('.video-container');
		const pixiDiv = document.querySelector('#pixi') as HTMLDivElement;
		pixiDiv.style.position = 'absolute';

		const app = new Application();
		await app.init({ width: 1280, height: 720, backgroundAlpha: 0.25 });
		app.renderer.background.color = [0, 0, 0, 0.25];

		pixiDiv?.appendChild(app.canvas);
		if (pixiDiv) pixiDiv.style.zIndex = '100';

		const pirateTexture = await Assets.load<Texture>('/images/pirate.png');
		const pirateSprite = new Sprite(pirateTexture);

		pirateSprite.scale.set(0.5);
		pirateSprite.anchor.set(0.5);
		pirateSprite.y = app.screen.height / 2;

		app.stage.addChild(pirateSprite);

		app.ticker.add(() => {
			if (pirateSprite.x < app.screen.width) {
				pirateSprite.x += 2;
			} else {
				pirateSprite.x = -pirateSprite.width;
			}
			pirateSprite.rotation += Math.sin(pirateSprite.x / 3) * 0.02;

			if (videoSprite) {
				if (!app.stage.children.includes(videoSprite)) {
					app.stage.addChild(videoSprite);

					videoSprite.anchor.set(0.5);
					videoSprite.width = 1280 / 2;
					videoSprite.height = 720 / 2;
					videoSprite.x = 1280 / 2;
					videoSprite.y = 720 / 2;
				} else {
					canvasContext?.drawImage(videoElements[currentVideoIndex], 0, 0, 1280, 720);
					videoTexture = Texture.from(hiddenCanvas);
					videoSprite.texture = videoTexture;
				}
			}
		});

		const dashjs = await import('dashjs');

		for (const url of videoUrls) {
			const player = dashjs.MediaPlayer().create();

			const videoElement = document.createElement('video');
			videoElement.style.position = 'absolute';
			videoElement.preload = 'metadata';
			videoElement.style.display = 'none';
			videoElement.style.width = '1280px';
			videoElement.style.height = '720px';
			videoElement.style.borderRadius = '5px';

			if (mainVideoElement) mainVideoElement.appendChild(videoElement);

			player.initialize(videoElement, url, false);
			player.setMute(true);

			videoElements.push(videoElement);
			videoPlayers.push(player);
		}

		console.log(videoPlayers);

		videoElements[0].style.display = 'block';
	});

	function switchVideo() {
		currentVideoIndex = (currentVideoIndex + 1) % videoUrls.length;

		for (let i = 0; i < videoPlayers.length; i++) {
			videoPlayers[i].seek(0);
			videoPlayers[i].pause();
			videoElements[i].style.display = 'none';
		}

		const player = videoPlayers[currentVideoIndex];
		const element = videoElements[currentVideoIndex];
		const oldElement = videoElements[currentVideoIndex - (1 % videoElements.length)];

		oldElement.style.display = 'none';
		element.style.display = 'block';
		player.play();
	}
</script>

<div class="container">
	<h1>Welcome to Pirate Music Video</h1>
	<p>This is a testing ground for our new project</p>

	<div class="video-container">
		<div id="pixi"></div>
		<div id="videos"></div>
	</div>

	<button
		style="z-index: 1000;"
		on:click={() => {
			const player = videoPlayers[currentVideoIndex];
			const element = videoElements[currentVideoIndex];
			player.play();
			element.style.display = 'block';
			console.log('Play Video clicked');
		}}>Play Video</button
	>

	<button
		style="z-index: 1000;"
		on:click={() => {
			switchVideo();
			console.log('Next Video clicked');
		}}>Next Video</button
	>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.video-container {
		position: relative;
		width: 1280px;
		height: 720px;
	}
</style>
