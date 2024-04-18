<script lang="ts">
	import { onMount } from 'svelte';
	import { Application, Assets, Sprite, Texture } from 'pixi.js';

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
		sceneHeight = window.innerHeight * 0.8;

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

		// Add a black square to the screen
		const blackSquare = new Sprite(Texture.WHITE);
		blackSquare.tint = 0x000000;
		blackSquare.width = sceneWidth;
		blackSquare.height = sceneHeight;
		app.stage.addChild(blackSquare);

		// BROOM
		BTN_broom = new Sprite(Texture.WHITE);
		BTN_broom.tint = 0xff0000;
		BTN_broom.alpha = 0;
		BTN_broom.width = sceneWidth * 0.1953;
		BTN_broom.height = sceneHeight * 0.3472;
		BTN_broom.x = sceneWidth * 0.0391;
		BTN_broom.y = sceneHeight * 0.5278;
		app.stage.addChild(BTN_broom);

		BTN_broom.interactive = true;
		BTN_broom.on('pointerdown', () => {
			// Only change if HUB video is playing
			if (currentVideoIndex === 0) switchToVideo(2);
		}).on('touchstart', () => {
			if (currentVideoIndex === 0) switchToVideo(2);
		});

		// DRINKERS
		BTN_drinkers = new Sprite(Texture.WHITE);
		BTN_drinkers.tint = 0x00ff00;
		BTN_drinkers.alpha = 0;
		BTN_drinkers.width = sceneWidth * 0.2109;
		BTN_drinkers.height = sceneHeight * 0.4167;
		BTN_drinkers.x = sceneWidth * 0.7812;
		BTN_drinkers.y = sceneHeight * 0.4028;
		app.stage.addChild(BTN_drinkers);

		BTN_drinkers.interactive = true;
		BTN_drinkers.on('pointerdown', () => {
			// Only change if HUB video is playing
			if (currentVideoIndex === 0) switchToVideo(3);
		}).on('touchstart', () => {
			// Only change if HUB video is playing
			if (currentVideoIndex === 0) switchToVideo(3);
		});

		// DOOR
		BTN_door = new Sprite(Texture.WHITE);
		BTN_door.tint = 0x0000ff;
		BTN_door.alpha = 0;
		BTN_door.width = sceneWidth * 0.1016;
		BTN_door.height = sceneHeight * 0.3333;
		BTN_door.x = sceneWidth * 0.3906;
		BTN_door.y = sceneHeight * 0.2778;
		app.stage.addChild(BTN_door);

		BTN_door.interactive = true;
		BTN_door.on('pointerdown', () => {
			// Only change if HUB video is playing
			if (currentVideoIndex === 0) switchToVideo(1);
		}).on('touchstart', () => {
			// Only change if HUB video is playing
			if (currentVideoIndex === 0) switchToVideo(1);
		});

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
		});

		const dashjs = await import('dashjs');

		for (const url of videoUrls) {
			const player = dashjs.MediaPlayer().create();

			const videoElement = document.createElement('video');
			videoElement.controls = false;
			videoElement.playsInline = true;
			videoElement.style.position = 'relative';
			videoElement.preload = 'metadata';
			videoElement.style.display = 'none';
			videoElement.style.width = `${sceneWidth}px`;
			videoElement.style.height = `${sceneHeight}px`;
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
		element.style.display = 'block';
		player.play();
	}

	function switchToVideo(videoIndex: number) {
		currentVideoIndex = videoIndex;

		for (let i = 0; i < videoPlayers.length; i++) {
			if (i != currentVideoIndex) {
				videoPlayers[i].seek(0);
				videoPlayers[i].pause();
				videoElements[i].style.display = 'none';
			}
		}

		const player = videoPlayers[currentVideoIndex];
		const element = videoElements[currentVideoIndex];
		element.style.display = 'block';
		player.play();
	}

	function startGame() {
		const gameElement = document.querySelector('.game-container') as HTMLDivElement;
		gameElement.style.display = 'block';

		const startButtonElement = document.querySelector('.start-button') as HTMLDivElement;
		startButtonElement.style.display = 'none';

		const titleTextDiv = document.querySelector('#page-title') as HTMLDivElement;
		titleTextDiv.style.display = 'none';

		console.log('Starting game');

		videoPlayers[0].play();
		gameStarted = true;

		tempMusicElement.play();
	}
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

	<button class="start-button" on:click={startGame}>Start Game</button>
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
