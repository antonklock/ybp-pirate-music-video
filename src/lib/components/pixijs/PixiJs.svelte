<script lang="ts">
	import { onMount } from 'svelte';
	import { gameGlobals } from '$lib/stores/gameStore';
	import { gameSession } from '$lib/stores/gameSessionStore';
	import { scenes } from '$lib/stores/gameStore';

	import * as PIXI from 'pixi.js';
	import { createPixiTimer } from '$lib/game/utils/debug/createPixiTimer';
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
				background: 0x000000,
				width: globals.sceneDimensions.stageWidth,
				height: globals.sceneDimensions.stageHeight,
				backgroundAlpha: 0
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

		// Reset timer when a new scene is loaded
		// gameGlobals.subscribe(($gameGlobals) => {
		// 	if ($gameGlobals.currentScene) {
		// 		$gameSession.startedAt = Date.now();
		// 	}
		// });

		// timerContainer.interactive = false;

		// app.stage.addChild(timerBox);
		// app.stage.addChild(timerText);

		// Update timer in the ticker
		app.ticker.add(() => {
			if ($gameSession.startedAt)
				$gameSession.elapsedTime = (Date.now() - $gameSession.startedAt.getTime()) / 1000;

			// const minutes = Math.floor($gameSession.elapsedTime / 60);
			// const seconds = Math.floor($gameSession.elapsedTime % 60);
			// const hundredths = Math.floor(($gameSession.elapsedTime % 1) * 100);
			// timerText.text = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${hundredths.toString().padStart(2, '0')}`;

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

	// let loadedScenes = $gameGlobals.loadedScenes;

	////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////

	// let previousScenes: SceneObject[] = [];

	// gameGlobals.subscribe(($gameGlobals) => {
	// 	$gameGlobals.loadedScenes.forEach((scene, index) => {
	// 		const previousPlayer = previousScenes[index]?.player;
	// 		const currentPlayer = scene.player;

	// 		// Detect changes to the `player` property
	// 		if (previousPlayer !== currentPlayer) {
	// 			console.log(`Player updated in scene ${index}:`, currentPlayer);
	// 			updateSceneSprites();
	// 		} else if (!currentPlayer) {
	// 			console.log(`No player found for scene ${index}`);
	// 		}

	// 		// // Use safe logging to avoid circular structure errors
	// 		// console.log('Previous Player:', previousPlayer); // Or use safeStringify if needed
	// 		// console.log('Current Player:', currentPlayer); // Or use safeStringify if needed
	// 	});

	// 	// Update previousScenes with a safe deep copy
	// 	// previousScenes = JSON.parse(JSON.stringify($gameGlobals.loadedScenes, safeStringify));
	// });

	////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////

	// $: $gameGlobals.loadedScenes.forEach((scene) => {
	// 	// if (scene.player) {
	// 	// 	console.log('Player updated for scene:', scene.id);
	// 	// 	// updateSceneSprites();
	// 	// } else {
	// 	// 	console.log('No player found for scene:', scene.id);
	// 	// }
	// 	// console.log('Loaded scenes:', $gameGlobals.loadedScenes);
	// 	// $gameGlobals.loadedScenes.forEach((scene) => {
	// 	// 	if (scene.player) {
	// 	// 		// This block will run whenever a scene's player property is updated
	// 	// 		console.log('Player updated for scene:', scene.id);
	// 	// 		updateSceneSprites();
	// 	// 	} else {
	// 	// 		console.log('No player found for scene:', scene.id);
	// 	// 	}
	// 	// });
	// });

	// function updateSceneSprites() {
	// 	// Remove sprites that don't have a corresponding video player
	// 	// const existingSprites = app.stage.children.filter((child) => child.label?.startsWith('scene-'));
	// 	// existingSprites.forEach((sprite) => {
	// 	// 	const sceneId = sprite.label.split('-')[1];
	// 	// 	const scene = $gameGlobals.loadedScenes.find((s) => s.id === sceneId);
	// 	// 	if (!scene || !scene.player) {
	// 	// 		// app.stage.removeChild(sprite);
	// 	// 		console.log('Removed sprite for scene:', sceneId);
	// 	// 	}
	// 	// });

	// 	// Ensure all loaded scenes with a video player have a sprite
	// 	$gameGlobals.loadedScenes.forEach((scene) => {
	// 		console.log('Scene: ', scene);
	// 		console.log('Scene player: ', scene.player);
	// 		if (scene.player) {
	// 			// const existingSprite = existingSprites.find(
	// 			// 	(sprite) => sprite.label === `scene-${scene.id}`
	// 			// );
	// 			// if (!existingSprite) {
	// 			if (true) {
	// 				console.log('Creating scene sprite for:', scene.id);

	// 				const { sceneDimensions } = globals;

	// 				const videoElement = scene.player.querySelector('video');
	// 				if (videoElement) {
	// 					videoElement.addEventListener('loadeddata', () => {
	// 						if (videoElement.videoWidth > 0 && videoElement.videoHeight > 0) {
	// 							const videoTexture = PIXI.Texture.from(videoElement);
	// 							console.log(
	// 								'Video texture created with dimensions:',
	// 								videoElement.videoWidth,
	// 								videoElement.videoHeight
	// 							);

	// 							const sceneSprite = new PIXI.Sprite(videoTexture);
	// 							sceneSprite.width = sceneDimensions.stageWidth / 4;
	// 							sceneSprite.height = sceneDimensions.stageHeight / 4;
	// 							sceneSprite.x = 0;
	// 							sceneSprite.y = 0;
	// 							sceneSprite.alpha = 1;
	// 							sceneSprite.zIndex = 999;
	// 							sceneSprite.visible = true;
	// 							sceneSprite.label = `scene-${scene.id}`;

	// 							app.stage.addChild(sceneSprite);
	// 							console.log('Scene sprite added to stage');
	// 						} else {
	// 							console.warn('Video element has invalid dimensions');
	// 						}
	// 					});
	// 				} else {
	// 					console.warn('No video element found in MediaPlayerElement');
	// 				}
	// 			} else {
	// 				console.log('Sprite already exists for scene:', scene.id);
	// 			}
	// 		} else {
	// 			console.warn(`No player found for scene: ${scene.id}`);
	// 		}
	// 	});

	// 	positionSpritesInGrid();
	// }

	const positionSpritesInGrid = () => {
		const sceneDimensions = globals.sceneDimensions;
		const sceneSprites = app.stage.children.filter((child) => child.label?.startsWith('scene-'));
		const sceneCount = sceneSprites.length;
		const sceneWidth = sceneDimensions.stageWidth;
		const sceneHeight = sceneDimensions.stageHeight;

		const gridSize = Math.ceil(Math.sqrt(sceneCount));
		const spacing = 2;

		let x = 0;
		let y = 0;

		sceneSprites.forEach((sceneSprite) => {
			sceneSprite.x = x * (sceneWidth + spacing);
			sceneSprite.y = y * (sceneHeight + spacing);
			x++;
			if (x >= gridSize) {
				x = 0;
				y++;
			}
		});

		// Calculate total width and height needed for grid
		const totalWidth = gridSize * (sceneWidth + spacing) - spacing;
		const totalHeight = Math.ceil(sceneCount / gridSize) * (sceneHeight + spacing) - spacing;

		// Calculate scale needed to fit everything
		const scaleX = sceneWidth / totalWidth;
		const scaleY = sceneHeight / totalHeight;
		const scale = Math.min(scaleX, scaleY, 1); // Don't scale up past 1

		// Center the grid
		const offsetX = (sceneWidth - totalWidth * scale) / 2;
		const offsetY = (sceneHeight - totalHeight * scale) / 2;

		// Apply scale and offset to each sprite
		sceneSprites.forEach((sprite) => {
			// sprite.scale.set(scale);
			sprite.x = sprite.x * scale + offsetX;
			sprite.y = sprite.y * scale + offsetY;
		});
	};

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

<!-- <div class="pixiContainer" /> -->
<div class="pixiContainer" />

<style>
	/* .pixiContainer {
		position: absolute;
		z-index: 999;
	} */
</style>
