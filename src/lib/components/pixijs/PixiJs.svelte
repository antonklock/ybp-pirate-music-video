<script lang="ts">
	import * as PIXI from 'pixi.js';
	import { onMount } from 'svelte';
	import { gameGlobals } from '$lib/stores/gameStore';
	import { gameSession } from '$lib/stores/gameSessionStore';
	import { scenes } from '$lib/stores/gameStore';
	import { createDebugMenu } from '$lib/game/utils/debug/debugWindow';

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
		activeHitboxes = [];

		app = new PIXI.Application();
		await app
			.init({
				background: 0xff0000,
				width: globals.sceneDimensions.stageWidth,
				height: globals.sceneDimensions.stageHeight,
				backgroundAlpha: 0,
				autoDensity: true,
				resolution: 1
			})
			.then(() => {
				// console.log('PixiJs initialized');
				$gameGlobals.pixiApp = app;
			})
			.catch((error) => {
				console.error('PixiJs failed to initialize', error);
			});

		const pixiCanvas = document.querySelector('.pixiContainer');

		pixiCanvas
			? pixiCanvas.appendChild(app.canvas)
			: console.error('No container found for PixiJs');

		// Update timer in the ticker
		app.ticker.add(() => {
			if ($gameSession.startedAt)
				$gameSession.elapsedTime = (Date.now() - $gameSession.startedAt.getTime()) / 1000;

			// Get all hitboxes
			const allHitboxes = $scenes.flatMap((scene) => scene.hitboxes || []);

			// Update hitbox visibility based on their activation intervals
			allHitboxes.forEach((hitbox) => {
				const pixiHitbox = pixiHitboxes.find((ph) => ph.text.text === hitbox.name);
				if (pixiHitbox) {
					const isActive = hitbox.activationInterfals.some(
						(interval) =>
							$gameSession.elapsedTime >= interval.start && $gameSession.elapsedTime <= interval.end
					);
					pixiHitbox.graphic.visible = isActive;
					pixiHitbox.text.visible = isActive;
				}
			});
		});

		const debugMenu = createDebugMenu(app);
		if (debugMenu) app.stage.addChild(debugMenu);
	});

	const pixiHitboxes: { graphic: PIXI.Graphics; text: PIXI.Text }[] = [];

	$: if (globals.currentScene) {
		if (globals.currentScene.hitboxes) {
			if (globals.currentScene.hitboxes !== activeHitboxes) {
				pixiHitboxes.map((hitbox) => {
					// console.log('Removing hitbox from stage', hitbox.text.text);
					app.stage.removeChild(hitbox.graphic);
					app.stage.removeChild(hitbox.text);
				});

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

						hitboxName.anchor.set(0.5);

						hitboxName.x = hitbox.x + hitbox.width / 2;
						hitboxName.y = hitbox.y + hitbox.height / 2;

						hitbox.zIndex = 999;
						hitboxName.zIndex = 1000;

						hitbox.interactive = true;

						hitbox.on('pointerdown', () => {
							// console.log('Hitbox hit', config.name);
							config.onHit();
						});

						// console.log('Hitbox added to stage', config.name);

						pixiHitboxes.push({ graphic: hitbox, text: hitboxName });

						// createDebugMenu(app);
					});

					// console.log('Hitboxes added to stage', activeHitboxes);
				}
			} else {
				// console.log('Hitboxes are the same');
			}
		}
	}
</script>

<div class="pixiContainer absolute top-0 left-0 bg-green-500" />
