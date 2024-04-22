import { Sprite, Texture } from 'pixi.js';
import { gameState } from '$lib/stores/gameStore';

let currentVideoIndex = 0;
gameState.subscribe((value) => {
	currentVideoIndex = value.currentVideoIndex;
});

interface HitboxConfig {
	tint: number;
	alpha: number;
	width: number;
	height: number;
	x: number;
	y: number;
	switchToVideo: number;
}

export function createHitbox(config: HitboxConfig): Sprite {
	const hitbox = new Sprite(Texture.WHITE);
	hitbox.tint = config.tint;
	hitbox.alpha = config.alpha;
	hitbox.width = config.width;
	hitbox.height = config.height;
	hitbox.x = config.x;
	hitbox.y = config.y;

	hitbox.interactive = true;
	hitbox
		.on('pointerdown', () => {
			// Only change if HUB video is playing
			if (currentVideoIndex === 0) switchToVideo(config.switchToVideo);
		})
		.on('touchstart', () => {
			// Only change if HUB video is playing
			if (currentVideoIndex === 0) switchToVideo(config.switchToVideo);
		});

	console.log('Hitbox created', hitbox);
	return hitbox;
}
