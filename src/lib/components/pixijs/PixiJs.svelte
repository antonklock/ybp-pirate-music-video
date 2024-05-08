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
		app.stage.addChild(coin);

		app.ticker.add(() => {
			if (videoSprite.width !== app.screen.width || videoSprite.height !== app.screen.height) {
				videoSprite.width = app.screen.width;
				videoSprite.height = app.screen.height;
			}
		});
	});

	const createNewTextureFromScene = (sceneId: string) => {
		const videoElement = document.getElementById(`videoPlayer${sceneId}`)?.children[0].children[0]
			.children[0] as HTMLVideoElement;
		const texture = PIXI.Texture.from(videoElement);

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

		if (!scene.pixiTexture && scene.canPlay) {
			const playerContainer = document.getElementById(`videoPlayer${scene.id}`);
			const player = playerContainer?.children[0].children[0].children[0] as HTMLVideoElement;

			if (player) {
				if (PIXI) {
					const texture = createNewTextureFromScene(scene.id);

					if (texture) videoSprite.texture = texture;

					scenes.update((scenes) => {
						scenes.forEach((scene) => {
							if (scene.id === scene.id) {
								scene.pixiTexture = texture;
							}
						});
						return scenes;
					});

					console.log('PIXI texture created for scene: ', scene.id);
				}
			}
		} else {
			console.log('Scene already has a PIXI texture: ', scene.id);
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
