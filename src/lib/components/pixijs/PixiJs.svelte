<script lang="ts">
	import { onMount } from 'svelte';
	import { gameGlobals } from '$lib/stores/gameStore';

	let globals: GameGlobals;

	onMount(async () => {
		console.log('PixiJs - Component mounted');

		gameGlobals.subscribe((gameGlobals) => {
			globals = gameGlobals;
		});

		const PIXI = await import('pixi.js');
		const app = new PIXI.Application();
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

		console.log(
			'app.screen.width / document.documentElement.clientWidth: ',
			app.screen.width / document.documentElement.clientWidth
		);

		parchment.scale.set(app.screen.width / document.documentElement.clientWidth / 6);

		parchment.x = app.screen.width - parchment.width * 0.86;
		parchment.y = 0 - parchment.height * 0.1;

		app.stage.addChild(parchment);

		// app.ticker.add(() => {

		// });
	});
</script>

<div class="pixiContainer"></div>

<style>
	.pixiContainer {
		position: absolute;
		z-index: 999;
	}
</style>
