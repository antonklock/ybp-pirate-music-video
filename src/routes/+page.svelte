<script lang="ts">
	import { onMount } from 'svelte';
	import { Application, Assets, Circle, Graphics, Sprite, Texture } from 'pixi.js';
	import { startGame } from '$lib/game/utils/startGame';
	import { createHitbox } from '$lib/game/utils/createHitbox';

	let gameStarted = false;

	const videoUrls = [
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/94fa56d67526bb108a120cbb3de20de9/manifest/video.mpd',
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/643b20d80310374034ab98fd48771b1c/manifest/video.mpd',
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/49a8983e44d3de06c7d53afa86c8337f/manifest/video.mpd',
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/543f408de99baf30ad0401671820d6a5/manifest/video.mpd'
	];

	const tempMusic =
		'https://firebasestorage.googleapis.com/v0/b/pirate-music-video.appspot.com/o/test-music%2FRowingWithOneHand_trimmed.mp3?alt=media&token=4176da98-db65-4463-8916-a166a021d6a6';

	let currentVideoIndex = 0;
	let videoPlayers: dashjs.MediaPlayerClass[] = [];
	let videoElements: HTMLVideoElement[] = [];
	let mainVideoElement: HTMLVideoElement | null = null;

	let tempMusicElement: HTMLAudioElement;

	let sceneWidth: number;
	let sceneHeight: number;

	let BTN_door: Sprite;
	let BTN_broom: Sprite;
	let BTN_drinkers: Sprite;

	let frameDropCircle: Graphics;

	onMount(async () => {
		// If the user presses the button "P"
		document.addEventListener('keydown', (event) => {
			if (event.key === 'p') {
				if (BTN_broom.alpha > 0) {
					BTN_broom.alpha = 0;
					BTN_drinkers.alpha = 0;
					BTN_door.alpha = 0;
				} else {
					BTN_broom.alpha = 0.25;
					BTN_drinkers.alpha = 0.25;
					BTN_door.alpha = 0.25;
				}
			}
		});

		sceneWidth = window.innerWidth * 0.8;
		sceneHeight = sceneWidth * 0.5625;

		mainVideoElement = document.querySelector('.video-container');
		const pixiDiv = document.querySelector('#pixi') as HTMLDivElement;
		pixiDiv.style.position = 'absolute';

		// Add Audio element with the temp music
		tempMusicElement = document.createElement('audio');
		tempMusicElement.src = tempMusic;

		const app = new Application();
		// await app.init({ width: 1280, height: 720, backgroundAlpha: 0.25 });
		await app.init({ width: sceneWidth, height: sceneHeight, backgroundAlpha: 0 });
		app.renderer.background.color = [0, 0, 0, 0];

		pixiDiv?.appendChild(app.canvas);
		if (pixiDiv) pixiDiv.style.zIndex = '100';

		frameDropCircle = new Graphics();
		frameDropCircle.fill(0x00ff00);
		frameDropCircle.circle(0, 0, 20);
		frameDropCircle.fill();
		frameDropCircle.x = 40;
		frameDropCircle.y = 40;
		app.stage.addChild(frameDropCircle);

		// Add a black square to the screen
		const blackSquare = new Sprite(Texture.WHITE);
		blackSquare.tint = 0x000000;
		blackSquare.width = sceneWidth;
		blackSquare.height = sceneHeight;
		app.stage.addChild(blackSquare);

		const BTN_broom = createHitbox({
			tint: 0xff0000,
			alpha: 0.25,
			width: sceneWidth * 0.1953,
			height: sceneHeight * 0.3472,
			x: sceneWidth * 0.0391,
			y: sceneHeight * 0.5278,
			switchToVideo: 2
		});

		const BTN_drinkers = createHitbox({
			tint: 0x00ff00,
			alpha: 0.25,
			width: sceneWidth * 0.2109,
			height: sceneHeight * 0.4167,
			x: sceneWidth * 0.7812,
			y: sceneHeight * 0.4028,
			switchToVideo: 3
		});

		const BTN_door = createHitbox({
			tint: 0x0000ff,
			alpha: 0.25,
			width: sceneWidth * 0.1016,
			height: sceneHeight * 0.3333,
			x: sceneWidth * 0.3906,
			y: sceneHeight * 0.2778,
			switchToVideo: 1
		});

		app.stage.addChild(BTN_drinkers, BTN_door, BTN_broom);

		app.ticker.add(() => {
			if (gameStarted) {
				if (blackSquare.alpha > 0) {
					blackSquare.alpha -= 0.01;
				}
			}

			if (currentVideoIndex !== 0) {
				// When the current player is done playing switch back to video 0
				videoPlayers[currentVideoIndex].on('playbackEnded', () => {
					switchToVideo(0);
				});
			}

			if (videoPlayers.length > 0) {
				if (!videoPlayers[currentVideoIndex].isReady) {
					console.warn("Frame drop! Video isn't ready yet.");
					frameDropCircle.fill(0xff0000);
				} else {
					frameDropCircle.fill(0x00ff00);
				}
			}
		});

		const dashjs = await import('dashjs');

		for (const url of videoUrls) {
			const player = dashjs.MediaPlayer().create();

			const videoElement = document.createElement('video');
			videoElement.controls = false;
			videoElement.playsInline = true;
			videoElement.style.position = 'absolute';
			videoElement.style.width = `${sceneWidth}px`;
			videoElement.style.height = `${sceneHeight}px`;

			videoElement.preload = 'metadata';
			videoElement.style.display = 'none';
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

	// function switchToVideo(videoIndex: number) {
	// 	currentVideoIndex = videoIndex;

	// 	for (let i = 0; i < videoPlayers.length; i++) {
	// 		if (i != currentVideoIndex) {
	// 			videoPlayers[i].seek(0);
	// 			videoPlayers[i].pause();
	// 			videoElements[i].style.display = 'none';
	// 		}
	// 	}

	// 	const player = videoPlayers[currentVideoIndex];
	// 	const element = videoElements[currentVideoIndex];
	// 	element.style.display = 'block';

	// 	console.log(player.isReady());

	// 	player.play();
	// }
</script>

<div class="container">
	<div id="page-title">
		<h1>Welcome to Pirate Music Video</h1>
		<p>This is a testing ground for our new project</p>
	</div>

	<div class="game-container" style="display: none">
		<div class="video-container" style={`width: ${sceneWidth} height: ${sceneHeight}`}>
			<div id="pixi"></div>
			<div id="videos"></div>
		</div>
	</div>

	<button
		class="start-button"
		on:click={() => {
			const gameElement = document.querySelector('.game-container');
			const startButtonElement = document.querySelector('.start-button');
			const titleTextDiv = document.querySelector('#page-title');

			if (!gameElement || !startButtonElement || !titleTextDiv) return;
			const config = {
				elementsToDisplay: [gameElement],
				elementsToHide: [startButtonElement, titleTextDiv],
				videoPlayerToStart: videoPlayers[0],
				musicElementToStart: tempMusicElement,
				gameStarted: gameStarted
			};

			startGame(config);

			gameStarted = true;

			console.log(gameStarted);
		}}>Start Game</button
	>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: white;
	}

	.video-container {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		height: 100vh;
	}
</style>
