<script lang="ts">
	import { onMount } from 'svelte';
	import { gameGlobals } from '$lib/stores/gameStore';
	import { scenes } from '$lib/stores/gameStore';

	let activeScenes: SceneObject[] = [];
	scenes.subscribe((scenes) => {
		activeScenes = scenes;
	});

	let globals: GameGlobals;

	let videoTexture;
	let videoTexture2;
	let videoSprite;
	let videoSprite2;

	let PIXI;
	let app;

	onMount(async () => {
		console.log('PixiJs - Component mounted');

		gameGlobals.subscribe((gameGlobals) => {
			globals = gameGlobals;
		});

		PIXI = await import('pixi.js');
		app = new PIXI.Application();
		await app
			.init({
				background: 0xfcba03,
				// background: 0x000000,
				width: globals.sceneDimensions.stageWidth,
				height: globals.sceneDimensions.stageHeight,
				backgroundAlpha: 0
				// backgroundAlpha: 0.1
			})
			.then(() => {
				console.log('PixiJs initialized');
				console.log('app.screen.width: ', app.screen.width);
			})
			.catch((error) => {
				console.error('PixiJs failed to initialize', error);
			});

		const pixiCanvas = document.querySelector('.pixiContainer');

		pixiCanvas ? pixiCanvas.appendChild(app.canvas) : console.error('No canvas found for PixiJs');

		const vignette = await PIXI.Assets.load('images/ui/vignette.png');
		const vignetteSprite = new PIXI.Sprite(vignette);
		vignetteSprite.width = app.screen.width;
		vignetteSprite.height = app.screen.height;
		app.stage.addChild(vignetteSprite);

		const parchmentTexture = await PIXI.Assets.load('images/ui/parchment.png');
		const parchment = new PIXI.Sprite(parchmentTexture);

		const coinTexture = await PIXI.Assets.load('images/ui/coin.png');
		const coin = new PIXI.Sprite(coinTexture);

		// // const videoElement = document.getElementById('testPlayer') as HTMLVideoElement;
		// let videoElement = undefined;
		// // let videoElement2 = document.getElementById('videoPlayerH1');
		// let videoElement2 = undefined;

		// let interval;

		// if (!videoElement) {
		// 	console.error('No video element found for video 1');

		// 	interval = setInterval(() => {
		// 		console.log('Trying to find video element 1');
		// 		const div = document.getElementById('videoPlayerH0');
		// 		if (div) {
		// 			console.log('Found div: ', div);
		// 			clearInterval(interval);
		// 			videoElement = div.children[0].children[0].children[0];

		// 			if (videoElement) {
		// 				videoTexture = PIXI.Texture.from(videoElement);
		// 			} else {
		// 				console.error('No video element found for video 1');
		// 			}

		// 			if (videoTexture) {
		// 				videoSprite = new PIXI.Sprite(videoTexture);
		// 				videoSprite.anchor.set(0.5);
		// 				videoSprite.width = app.screen.width;
		// 				videoSprite.height = app.screen.height;
		// 				videoSprite.x = app.screen.width / 2;
		// 				videoSprite.y = app.screen.height / 2;

		// 				app.stage.addChild(videoSprite);

		// 				console.log('videoSprite: ', videoSprite);
		// 			} else {
		// 				console.error('No video texture found for video 1');
		// 			}
		// 		} else {
		// 			console.error('No div found for video 1');
		// 		}
		// 	}, 1000);
		// }

		// let interval2;

		// if (!videoElement2) {
		// 	console.error('No video element found for video 2');

		// 	interval2 = setInterval(() => {
		// 		console.log('Trying to find video element 2');
		// 		const div2 = document.getElementById('videoPlayerH1');
		// 		if (div2) {
		// 			console.log('Found div: ', div2);
		// 			clearInterval(interval2);
		// 			videoElement2 = div2.children[0].children[0].children[0];

		// 			if (videoElement2) {
		// 				videoTexture2 = PIXI.Texture.from(videoElement2);
		// 			} else {
		// 				console.error('No video element found for video 2');
		// 			}

		// 			if (videoTexture2) {
		// 				videoSprite2 = new PIXI.Sprite(videoTexture2);
		// 				videoSprite2.anchor.set(1);
		// 				videoSprite2.width = app.screen.width / 3;
		// 				videoSprite2.height = app.screen.height / 3;
		// 				videoSprite2.x = app.screen.width;
		// 				videoSprite2.y = app.screen.height;

		// 				app.stage.addChild(videoSprite2);

		// 				setTimeout(() => {
		// 					videoSprite.texture = videoTexture2;
		// 				}, 2000);

		// 				console.log('videoSprite: ', videoSprite2);
		// 			} else {
		// 				console.error('No video texture found for video 1');
		// 			}
		// 		} else {
		// 			console.error('No div found for video 1');
		// 		}
		// 	}, 1000);
		// }

		// let interval2;

		// if (!videoElement2) {
		// 	console.error('No video element found for video 2');
		// 	interval2 = setInterval(() => {
		// 		console.log('Trying to find video element 2');
		// 		videoElement2 = document.getElementById('videoPlayer1');
		// 	}, 1000);
		// } else {
		// 	clearInterval(interval2);
		// 	console.log('videoElement2 found: ', videoElement2);
		// }

		// let videoTexture2;
		// let videoSprite2;

		// if (videoElement) {
		// 	videoTexture = PIXI.Texture.from(videoElement);
		// } else {
		// 	console.error('No video element found for video 1');
		// }
		// if (videoElement2) {
		// 	videoTexture2 = PIXI.Texture.from(videoElement2);
		// } else {
		// 	console.error('No video element found for video 2');
		// }

		// if (videoTexture2) {
		// 	videoSprite2 = new PIXI.Sprite(videoTexture2);
		// 	videoSprite2.width = app.screen.width / 2;
		// 	videoSprite2.height = app.screen.height / 2;
		// 	videoSprite2.x = app.screen.width / 2;
		// 	videoSprite2.y = app.screen.height / 2;
		// 	app.stage.addChild(videoSprite2);
		// }

		// console.log(
		// 	'app.screen.width / document.documentElement.clientWidth: ',
		// 	app.screen.width / document.documentElement.clientWidth
		// );

		parchment.scale.set(app.screen.width / document.documentElement.clientWidth / 6);

		parchment.x = app.screen.width - parchment.width * 0.86;
		parchment.y = 0 - parchment.height * 0.1;

		app.stage.addChild(parchment);

		// app.ticker.add(() => {
		// });
	});

	const createNewTextureFromScene = (sceneId: string) => {
		const videoElement = document.getElementById(`videoPlayer${sceneId}`)?.children[0].children[0]
			.children[0] as HTMLVideoElement;

		let texture;
		if (PIXI) {
			texture = PIXI.Texture.from(videoElement);
		} else {
			console.error('No PIXI found. Cannot create texture.');
		}

		if (!videoElement) {
			console.error('No video element found for scene: ', sceneId);
		}

		if (!texture) {
			console.error('No texture found for scene: ', sceneId);
		}

		return texture;
	};

	$: for (const scene of activeScenes) {
		console.log('Updating PIXI scenes...');

		if (scene.canPlay) {
			//TODO: Fix this .children[0].children[0].children[0] mess
			const playerContainer = document.getElementById(`videoPlayer${scene.id}`);
			const player = playerContainer?.children[0].children[0].children[0] as HTMLVideoElement;

			if (player) {
				if (PIXI) {
					const texture = createNewTextureFromScene(scene.id);
					const sprite = new PIXI.Sprite(texture);
					sprite.width = globals.sceneDimensions.stageWidth;
					sprite.height = globals.sceneDimensions.stageHeight;
					sprite.x = globals.sceneDimensions.stageWidth / 2;
					sprite.y = globals.sceneDimensions.stageHeight / 2;

					if (app) {
						app.stage.addChild(sprite);
					} else {
						console.error('No app found');
					}
				} else {
					console.error('No PIXI found');
				}
			}
		}
	}
</script>

<div class="pixiContainer"></div>

<style>
	.pixiContainer {
		/* position: absolute; */
		z-index: 999;
	}
</style>
