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

	let hiddenCanvas: HTMLCanvasElement;
	let canvasContext: CanvasRenderingContext2D | null;

	let videoTexture: Texture;
	let videoSprite: Sprite;

	let tempMusicElement: HTMLAudioElement;

	onMount(async () => {
		mainVideoElement = document.querySelector('.video-container');
		const pixiDiv = document.querySelector('#pixi') as HTMLDivElement;
		pixiDiv.style.position = 'absolute';

		// Add Audio element with the temp music
		tempMusicElement = document.createElement('audio');
		tempMusicElement.src = tempMusic;

		const app = new Application();
		await app.init({ width: 1280, height: 720, backgroundAlpha: 0.25 });
		app.renderer.background.color = [0, 0, 0, 0];

		pixiDiv?.appendChild(app.canvas);
		if (pixiDiv) pixiDiv.style.zIndex = '100';

		// Add a black square to the screen
		const blackSquare = new Sprite(Texture.WHITE);
		blackSquare.tint = 0x000000;
		blackSquare.width = 1280;
		blackSquare.height = 720;
		app.stage.addChild(blackSquare);

		// BROOM
		const BTN_broom = new Sprite(Texture.WHITE);
		BTN_broom.tint = 0xff0000;
		BTN_broom.alpha = 0;
		BTN_broom.width = 250;
		BTN_broom.height = 250;
		BTN_broom.x = 50;
		BTN_broom.y = 380;
		app.stage.addChild(BTN_broom);

		BTN_broom.interactive = true;
		BTN_broom.on('pointerdown', () => {
			// Only change if HUB video is playing
			if (currentVideoIndex === 0) switchToVideo(2);
		});

		// DRINKERS
		const BTN_drinkers = new Sprite(Texture.WHITE);
		BTN_drinkers.tint = 0x00ff00;
		BTN_drinkers.alpha = 0;
		BTN_drinkers.width = 270;
		BTN_drinkers.height = 300;
		BTN_drinkers.x = 1000;
		BTN_drinkers.y = 290;
		app.stage.addChild(BTN_drinkers);

		BTN_drinkers.interactive = true;
		BTN_drinkers.on('pointerdown', () => {
			// Only change if HUB video is playing
			if (currentVideoIndex === 0) switchToVideo(3);
		});

		// DOOR
		const BTN_door = new Sprite(Texture.WHITE);
		BTN_door.tint = 0x0000ff;
		BTN_door.alpha = 0;
		BTN_door.width = 130;
		BTN_door.height = 240;
		BTN_door.x = 500;
		BTN_door.y = 200;
		app.stage.addChild(BTN_door);

		BTN_door.interactive = true;
		BTN_door.on('pointerdown', () => {
			// Only change if HUB video is playing
			if (currentVideoIndex === 0) switchToVideo(1);
		});

		app.ticker.add(() => {
			if (gameStarted) {
				if (blackSquare.alpha > 0) {
					blackSquare.alpha -= 0.01;
				}
			}

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
		const startButtonElement = document.querySelector('.start-button') as HTMLDivElement;
		gameElement.style.display = 'block';
		startButtonElement.style.display = 'none';

		console.log('Starting game');

		videoPlayers[0].play();
		gameStarted = true;

		tempMusicElement.play();
	}
</script>

<div class="container">
	<h1>Welcome to Pirate Music Video</h1>
	<p>This is a testing ground for our new project</p>
	<div class="game-container" style="display: none">
		<div class="video-container">
			<div id="pixi"></div>
			<div id="videos"></div>
		</div>
	</div>

	<button class="start-button" on:click={startGame}>Start Game</button>

	<!-- <button
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
	<button
		style="z-index: 1000;"
		on:click={() => {
			switchToVideo(0);
			console.log('Next Video clicked');
		}}>Hub Video</button
	>
	<button
		style="z-index: 1000;"
		on:click={() => {
			switchToVideo(1);
			console.log('Next Video clicked');
		}}>Walk to door</button
	>
	<button
		style="z-index: 1000;"
		on:click={() => {
			switchToVideo(2);
			console.log('Next Video clicked');
		}}>Walk to broom</button
	>
	<button
		style="z-index: 1000;"
		on:click={() => {
			switchToVideo(3);
			console.log('Next Video clicked');
		}}>Walk to drinkers</button
	> -->
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: white;
	}

	.video-container {
		position: relative;
		width: 1280px;
		height: 720px;
	}
</style>
