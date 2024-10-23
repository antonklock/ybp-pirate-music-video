import { writable } from 'svelte/store';
import { sceneObjects } from '$lib/game/sceneConfig';
import { v4 as uuidv4 } from 'uuid';


// export const gameState = writable<GameState>({
// 	gameStarted: false,
// 	currentSceneId: 0,
// 	activeScene: sceneObjects[0],
// 	nextScenes: [],
// });

export const gameGlobals = writable<GameGlobals>({
	isGameReady: false,
	isGameStarted: false,
	gameStartedAt: null,
	sceneDimensions: {
		stageWidth: 0,
		stageHeight: 0,
	},
	currentScene: sceneObjects[0],
});

export const hitboxes = writable<Hitbox[]>([]);

export const scenes = writable<SceneObject[]>(sceneObjects);

export const gameSession = writable<GameSession>({
	id: uuidv4(),
	sceneOrder: [],
	startedAt: null,
	endedAt: null,
	elapsedTime: 0
});

// export const availableScenes = writable<SceneObject[]>([]);