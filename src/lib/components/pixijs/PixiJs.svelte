<script lang="ts">
	import { onMount } from 'svelte';
	import { gameGlobals } from '$lib/stores/gameStore';
	import { scenes } from '$lib/stores/gameStore';

	import * as PIXI from 'pixi.js';

	let activeHitboxes: Hitbox[] = [];

	let activeScenes: SceneObject[] = [];
	scenes.subscribe((scenes) => {
		activeScenes = scenes;
	});

	let globals: GameGlobals;

	gameGlobals.subscribe((gameGlobals) => {
		globals = gameGlobals;
	});

	let app: PIXI.Application<PIXI.Renderer>;

	onMount(async () => {
		console.log('PixiJs - Component mounted');

		app = new PIXI.Application();
		await app
			.init({
				// background: 0xfcba03,
				background: 0x000000,
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

		pixiCanvas
			? pixiCanvas.appendChild(app.canvas)
			: console.error('No container found for PixiJs');

		// const vignette = await PIXI.Assets.load('images/ui/vignette.png');
		// const vignetteSprite = new PIXI.Sprite(vignette);
		// vignetteSprite.width = app.screen.width;
		// vignetteSprite.height = app.screen.height;
		// app.stage.addChild(vignetteSprite);

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

		app.ticker.add(() => {});
	});

	$: if (globals.currentScene) {
		if (globals.currentScene.hitboxes) {
			if (globals.currentScene.hitboxes !== activeHitboxes) {
				activeHitboxes = globals.currentScene.hitboxes;

				if (app) {
					activeHitboxes.map(async (config) => {
						const { x, y, width, height } = config;
						const { sceneDimensions } = globals;

						const hitbox = new PIXI.Graphics();
						hitbox.rect(
							0,
							0,
							sceneDimensions.stageWidth * width,
							sceneDimensions.stageHeight * height
						);
						hitbox.x = sceneDimensions.stageWidth * x;
						hitbox.y = sceneDimensions.stageHeight * y;
						hitbox.fill(config.color);
						hitbox.alpha = 0.75;
						app.stage.addChild(hitbox);

						const hitboxName = new PIXI.Text({
							text: config.name,
							style: {
								fontSize: 14,
								fill: { color: 0xffffff }
							}
						});

						app.stage.addChild(hitboxName);

						hitboxName.x = hitbox.x;
						hitboxName.y = hitbox.y;

						hitbox.interactive = true;

						hitbox.on('pointerdown', () => {
							// console.log('Hitbox clicked: ', config.name);
							config.onHit();
						});

						console.log('Hitbox added to stage: ', hitbox);
					});
				}
			} else {
				console.log('Hitboxes are the same');
			}
		}
	}
</script>

<div class="pixiContainer"></div>

<style>
	.pixiContainer {
		position: absolute;
		z-index: 999;
	}
</style>
