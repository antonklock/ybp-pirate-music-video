<!-- <script lang="ts">
	import { onMount } from 'svelte';
	import { Application, Sprite, Texture } from 'pixi.js';
	import { startGame } from '$lib/game/utils/startGame';
	import { createHitbox } from '$lib/game/utils/createHitbox';
	import { switchToSceneById } from '$lib/game/utils/switchToSceneById';
	import { spawnNewScene } from '$lib/game/utils/spawnNewScene';
	import { gameState, gameGlobals } from '$lib/stores/gameStore';

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
	let mainVideoElement: HTMLVideoElement | null;

	let tempMusicElement: HTMLAudioElement;

	let sceneWidth: number;
	let sceneHeight: number;

	onMount(async () => {
		// Import dashjs
		const dashjs = await import('dashjs');

		// Toggle show hitboxes
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

		gameGlobals.update((state) => {
			state.dashjs = dashjs;
			state.mainVideoElement = mainVideoElement;
			state.sceneDimensions = {
				sceneWidth,
				sceneHeight
			};
			return state;
			});

		// Add Audio element with the temp music
		tempMusicElement = document.createElement('audio');
		tempMusicElement.src = tempMusic;

		const app = new Application();
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

		// Adding hitboxes
		// TODO: Automate this process based on the SceneObjects hitbox data
		const BTN_broom = createHitbox({
			tint: 0xff0000,
			alpha: 0,
			width: sceneWidth * 0.1953,
			height: sceneHeight * 0.3472,
			x: sceneWidth * 0.0391,
			y: sceneHeight * 0.5278,
			switchToScene: 2
		});

		const BTN_drinkers = createHitbox({
			tint: 0x00ff00,
			alpha: 0,
			width: sceneWidth * 0.2109,
			height: sceneHeight * 0.4167,
			x: sceneWidth * 0.7812,
			y: sceneHeight * 0.4028,
			switchToScene: 3
		});

		const BTN_door = createHitbox({
			tint: 0x0000ff,
			alpha: 0,
			width: sceneWidth * 0.1016,
			height: sceneHeight * 0.3333,
			x: sceneWidth * 0.3906,
			y: sceneHeight * 0.2778,
			switchToScene: 1
		});

		app.stage.addChild(BTN_drinkers, BTN_door, BTN_broom);

		app.ticker.add(() => {
			if (gameStarted) {
				if (blackSquare.alpha > 0) {
					blackSquare.alpha -= 0.01;
				}
			}

			// TODO: Implement a more robust way to switch between to the next scene
			if (currentVideoIndex !== 0) {
				// When the current player is done playing switch back to video 0
				videoPlayers[currentVideoIndex].on('playbackEnded', () => {
					switchToSceneById(0);
				});
			}
		});

		const newSceneConfig = {
			dashjs,
			sceneId: 0,
			sceneDimensions: {
				sceneWidth,
				sceneHeight
			},
			mainVideoElement
		};

		// if(typeof(mainVideoElement) === typeof(HTMLVideoElement)) spawnNewScene(newSceneConfig);

		// for (const url of videoUrls) {
		// 	const player = dashjs.MediaPlayer().create();

		// 	const videoElement = document.createElement('video');
		// 	videoElement.controls = false;
		// 	videoElement.playsInline = true;
		// 	videoElement.style.position = 'absolute';
		// 	videoElement.style.width = `${sceneWidth}px`;
		// 	videoElement.style.height = `${sceneHeight}px`;

		// 	videoElement.preload = 'metadata';
		// 	videoElement.style.display = 'none';
		// 	videoElement.style.borderRadius = '5px';

		// 	if (mainVideoElement) mainVideoElement.appendChild(videoElement);

		// 	player.initialize(videoElement, url, false);
		// 	player.setMute(true);

		// 	videoElements.push(videoElement);
		// 	videoPlayers.push(player);
		// }

		// console.log(videoPlayers);

		// videoElements[0].style.display = 'block';
	});
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
</style> -->

<script lang="ts">
	import Scene from '$lib/components/Scene.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { gameGlobals } from '$lib/stores/gameStore';

	let mainSceneContainer: HTMLDivElement | null;
	let gameReady = false;
	let currentScene = 0;

	gameGlobals.subscribe((value) => {
		gameReady = value.gameReady;
	});

	let stageWidth: number;
	let stageHeight: number;

	onMount(async () => {
		const dashjs = await import('dashjs');
		stageWidth = window.innerWidth * 0.8;
		stageHeight = stageWidth * 0.5625;

		if (!mainSceneContainer) throw new Error('mainSceneContainer is not defined');
		if (!dashjs) throw new Error('dashjs is not defined');
		if (!stageWidth || !stageHeight) throw new Error('sceneWidth or sceneHeight is not defined');

		gameGlobals.update((state) => {
			state.dashjs = dashjs;
			state.sceneDimensions = {
				stageWidth,
				stageHeight
			};
			state.mainVideoElement = mainSceneContainer;
			state.gameReady = true;
			console.log('Game is ready!');
			return state;
		});
	});

	const playGame = (sceneId: number) => {
		for (const scene of document.querySelectorAll('video')) {
			console.log('Pausing video: ' + scene.id);
			if (scene.id !== `scene-${sceneId}`) {
				scene.pause();
				scene.style.display = 'none';
			} else {
				scene.play();
				console.log('Playing video: ' + `scene-${sceneId}`);
				scene.style.display = 'block';
			}
		}
	};

	// const switchToScene = (sceneId: number) => {
	// 	for (const scene of document.querySelectorAll('video')) {
	// 		if (scene.id !== `scene-${sceneId}`) {
	// 			scene.pause();
	// 			scene.style.display = 'none';
	// 			scene.remove();
	// 		} else {
	// 			scene.play();
	// 			scene.style.display = 'block';

	// 			if (mainSceneContainer) {
	// 				const newScene = new Scene({
	// 					target: mainSceneContainer,
	// 					props: {
	// 						sceneId: 0,
	// 						hidden: true
	// 					}
	// 				});
	// 			}
	// 		}
	// 	}
	// };

	let videoElement0: HTMLVideoElement;
	let videoElement1;
	let videoElement2;
	let videoElement3;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let videoElements: HTMLVideoElement[] = [];
	let currentVideoIndex = 0;

	let videoUrls = [
		'/videos/testVideos/HUB_5min.webm',
		'/videos/testVideos/walkTo_doorMan.webm',
		'/videos/testVideos/walkTo_broom.webm',
		'/videos/testVideos/walkTo_drinkers.webm'
	];

	let videoUrl = videoUrls[currentVideoIndex];

	const playVideo = () => {
		videoElement0.play();
	};

	const nextVideo = () => {
		currentVideoIndex++;
		if (currentVideoIndex >= videoUrls.length) currentVideoIndex = 0;

		videoElement0.src = videoUrls[currentVideoIndex];
		videoElement0.play();
	};

	const playVideoById = (id: number) => {
		currentVideoIndex = id;
		videoElement0.src = videoUrls[id];
		videoElement0.play();
	};
</script>

<div class="mainContainer">
	<!-- <div class="mainSceneContainer" bind:this={mainSceneContainer}>
		{#if gameReady}
			<canvas id="canvas" width={stageWidth} height={stageHeight}> </canvas>
		{:else}
			<div>Loading...</div>
		{/if}
	</div>

	<div class="buttons">
		<button on:click={() => (currentScene = 0)}>Play 0</button>
		<button on:click={() => (currentScene = 1)}>Play 1</button>
		<button on:click={() => (currentScene = 2)}>Play 2</button>
		<button on:click={() => (currentScene = 3)}>Play 3</button>
	</div> -->

	<div>
		<button on:click={playVideo}>Play</button>
		<button on:click={nextVideo}>Next</button>
		<button on:click={() => playVideoById(0)}>Video 0</button>
		<button on:click={() => playVideoById(1)}>Video 1</button>
		<button on:click={() => playVideoById(2)}>Video 2</button>
		<button on:click={() => playVideoById(3)}>Video 3</button>

		<video
			class="video"
			width={stageWidth}
			height={stageHeight}
			style="display: block"
			autoplay={true}
			playsinline={true}
			controls={false}
			preload="metadata"
			bind:this={videoElement0}
			src={videoUrl}
		>
			<track kind="captions" />
		</video>
	</div>
</div>

<style>
	.mainContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: white;
	}

	.mainSceneContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		height: 100vh;
	}
	.buttons {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
