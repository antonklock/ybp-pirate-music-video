// import { Sprite, Texture } from 'pixi.js';
// import { gameState } from '$lib/stores/gameStore';
// import { switchToSceneById } from './switchToSceneById';

// let currentSceneId: number;
// gameState.subscribe((value) => {
// 	currentSceneId = value.currentSceneId;
// });

// interface HitboxConfig {
// 	tint: number;
// 	alpha: number;
// 	width: number;
// 	height: number;
// 	x: number;
// 	y: number;
// 	switchToScene: number;
// }

// export function createHitbox(config: HitboxConfig): Sprite {
// 	const hitbox = new Sprite(Texture.WHITE);
// 	hitbox.tint = config.tint;
// 	hitbox.alpha = config.alpha;
// 	hitbox.width = config.width;
// 	hitbox.height = config.height;
// 	hitbox.x = config.x;
// 	hitbox.y = config.y;

// 	hitbox.interactive = true;
// 	hitbox
// 		.on('pointerdown', () => {
// 			// Only change if HUB video is playing
// 			if (currentSceneId === 0) switchToSceneById(config.switchToScene);
// 		})
// 		.on('touchstart', () => {
// 			// Only change if HUB video is playing
// 			if (currentSceneId === 0) switchToSceneById(config.switchToScene);
// 		});

// 	console.log('Hitbox created', hitbox);
// 	return hitbox;
// }
