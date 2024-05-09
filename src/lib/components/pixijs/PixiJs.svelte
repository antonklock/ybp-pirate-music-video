<script lang="ts">
	import { onMount } from 'svelte';
	import { gameGlobals } from '$lib/stores/gameStore';
	import { scenes } from '$lib/stores/gameStore';

	import * as PIXI from 'pixi.js';

	let videoTexture: PIXI.Texture;
	let videoSprite: PIXI.Sprite;

	let activeScenes: SceneObject[] = [];
	scenes.subscribe((scenes) => {
		activeScenes = scenes;
	});

	let globals: GameGlobals;

	let app: PIXI.Application<PIXI.Renderer>;

	onMount(async () => {
		console.log('PixiJs - Component mounted');

		gameGlobals.subscribe((gameGlobals) => {
			globals = gameGlobals;
		});

		// PIXI = await import('pixi.js');
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

		videoTexture = await PIXI.Assets.load('images/ui/coin.png');
		videoSprite = new PIXI.Sprite(videoTexture);

		videoSprite.width = app.screen.width / 2;
		videoSprite.height = app.screen.height / 2;
		videoSprite.anchor.set(0.5);
		videoSprite.x = app.screen.width / 2;
		videoSprite.y = app.screen.height / 2;
		app.stage.addChild(videoSprite);

		const vignette = await PIXI.Assets.load('images/ui/vignette.png');
		const vignetteSprite = new PIXI.Sprite(vignette);
		vignetteSprite.width = app.screen.width;
		vignetteSprite.height = app.screen.height;
		app.stage.addChild(vignetteSprite);

		const parchmentTexture = await PIXI.Assets.load('images/ui/parchment.png');
		const parchment = new PIXI.Sprite(parchmentTexture);

		parchment.scale.set(app.screen.width / document.documentElement.clientWidth / 6);

		parchment.x = app.screen.width - parchment.width * 0.86;
		parchment.y = 0 - parchment.height * 0.1;

		app.stage.addChild(parchment);

		const coinTexture = await PIXI.Assets.load('images/ui/coin.png');
		const coin = new PIXI.Sprite(coinTexture);
		coin.width = app.screen.width / 10;
		coin.height = app.screen.width / 10;
		coin.anchor.set(0.5);
		coin.x = coin.width;
		coin.y = coin.height;
		app.stage.addChild(coin);

		coin.interactive = true;

		const displacementTexture = await PIXI.Assets.load(
			'images/textures/displacement_map_repeat.jpg'
		);
		const displacementSprite = new PIXI.Sprite(displacementTexture);
		displacementSprite.texture.source.repeatMode = 'repeat';
		const displacementSprite2 = new PIXI.Sprite(displacementTexture);
		displacementSprite2.texture.source.repeatMode = 'repeat';

		const displacementFilter = new PIXI.DisplacementFilter({
			sprite: displacementSprite,
			scale: { x: 60, y: 120 }
		});

		const displacementFilter2 = new PIXI.DisplacementFilter({
			sprite: displacementSprite2,
			scale: { x: 60, y: 120 }
		});

		displacementFilter.padding = 0;
		displacementSprite.position = { x: 0, y: 0 };
		app.stage.addChild(displacementSprite);
		displacementFilter2.padding = 0;
		displacementSprite2.position = { x: 0, y: 0 };
		app.stage.addChild(displacementSprite2);

		videoSprite.filters = [];

		let drunk = false;

		coin.on('pointerdown', () => {
			drunk = !drunk;

			if (drunk) {
				videoSprite.filters = [displacementFilter, displacementFilter2];
			} else {
				videoSprite.filters = [];
			}
		});

		app.ticker.add(() => {
			if (videoSprite.width !== app.screen.width || videoSprite.height !== app.screen.height) {
				videoSprite.width = app.screen.width;
				videoSprite.height = app.screen.height;
			}

			// Move the displacement map left and right randomly on a sine curve
			displacementSprite.x =
				Math.sin(app.ticker.lastTime / 2500) *
				Math.sin(app.ticker.lastTime / 5000) *
				Math.sin(app.ticker.lastTime / 4000) *
				Math.sin(app.ticker.lastTime / 2600) *
				1000;
			displacementSprite.y =
				Math.sin(app.ticker.lastTime / 1500) *
				Math.sin(app.ticker.lastTime / 2000) *
				Math.sin(app.ticker.lastTime / 4000) *
				Math.sin(app.ticker.lastTime / 7000) *
				1000;

			if (displacementSprite.x > displacementSprite.width) {
				displacementSprite.x = 0;
			}
			if (displacementSprite.y > displacementSprite.height) {
				displacementSprite.y = 0;
			}

			// Move the displacement map left and right randomly on a sine curve
			displacementSprite2.x++;
			displacementSprite2.y++;

			if (displacementSprite2.x > displacementSprite2.width) {
				displacementSprite2.x = 0;
			}
			if (displacementSprite2.y > displacementSprite2.height) {
				displacementSprite2.y = 0;
			}

			// Update the video texture if it has changed
			if (videoSprite && globals.currentTexture) {
				if (globals.currentTexture !== videoSprite.texture) {
					console.log('Updating video texture...');

					videoSprite.texture = globals.currentTexture;

					console.log('globals.currentTexture: ', globals.currentTexture);
					console.log('videoSprite.texture: ', videoSprite.texture);
					console.log('activeScenes', activeScenes);
				}
			}
		});
	});

	const createNewTextureFromScene = (sceneId: string) => {
		const videoElement = document.getElementById(`videoPlayer${sceneId}`)?.children[0].children[0]
			.children[0] as HTMLVideoElement;
		const texture = PIXI.Texture.from(videoElement);

		texture.uid = parseInt(sceneId.substring(1, sceneId.length));

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

		if (!scene.pixiTexture) {
			if (scene.canPlay) {
				const playerContainer = document.getElementById(`videoPlayer${scene.id}`);
				const player = playerContainer?.children[0].children[0].children[0] as HTMLVideoElement;

				if (player) {
					if (PIXI) {
						try {
							if (videoSprite) {
								setTimeout(() => {
									const texture = createNewTextureFromScene(scene.id);

									// if (texture) videoSprite.texture = texture;

									// texture.uid = parseInt(scene.id.substring(1, scene.id.length));

									console.log('texture.uid: ', texture.uid);

									scenes.update((loadedScenes) => {
										loadedScenes.forEach((sceneToUpdate) => {
											if (sceneToUpdate.id === scene.id) {
												scene.pixiTexture = texture;
											}
										});
										return loadedScenes;
									});

									console.log('canPlay: ', scene.canPlay);

									console.log('PIXI texture created for scene: ', scene.id);
									console.log('scene.pixiTexture: ', scene.pixiTexture);
									console.log('Scene: ', scene);
								}, 1000);
							} else {
								console.warn('No video sprite found');
							}
						} catch (error) {
							console.error('Error creating PIXI texture: ', error);
						}
					}
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
