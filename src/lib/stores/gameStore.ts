import { writable } from 'svelte/store';
import { sceneObjects } from '$lib/game/sceneConfig';

export const gameState = writable<GameState>({
	gameStarted: false,
	currentSceneId: 0,
	activeScene: sceneObjects[0],
	nextScenes: [],
});

export const gameGlobals = writable<GameGlobals>({
	gameReady: false,
	gameStarted: false,
	sceneDimensions: {
		stageWidth: 0,
		stageHeight: 0,
	},
	currentTexture: null,
});

export const hitboxes = writable<Hitbox[]>([]);

export const scenes = writable<SceneObject[]>(sceneObjects);

// export const availableScenes = writable<SceneObject[]>([]);