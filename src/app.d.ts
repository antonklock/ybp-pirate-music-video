import { MediaPlayerElement } from 'vidstack/elements';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface SceneObject {
		id: string;
		name: string;
		url: string;
		player: MediaPlayerElement | undefined;
		canPlay: boolean;
		isLoaded: boolean;
		isCurrent: boolean;
		nextScenes: string[];
		loop: boolean;
		isActive: boolean;
		hitboxes: Hitbox[];
		sceneEndTime?: number;
		onSceneEnd?: () => void;

		triggerTime?: number;
		runFunctionAtTime?: () => void;
		play?: () => void;
	};

	// interface GameState {
	// 	gameStarted: boolean;
	// 	currentSceneId: number;
	// 	activeScene: SceneObject;
	// 	nextScenes: SceneObject[];
	// }

	interface GameGlobals {
		gameReady: boolean;
		gameStarted: boolean;
		sceneDimensions: {
			stageWidth: number;
			stageHeight: number;
		};
		currentScene: SceneObject;
	}

	interface Hitbox {
		name: string;
		color: number;
		x: number;
		y: number;
		width: number;
		height: number;
		onHit: () => void;
		isLoaded: boolean;
		isActive: boolean;
		activationInterfals: ActiveInterval[];
	}

	interface ActiveInterval {
		start: number;
		end: number;
	}
}

export { };
