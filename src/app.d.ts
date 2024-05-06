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
		nextScenes: string[];
		loop: boolean;
		isActive: boolean;
		onSceneEnd?: () => void;
		triggerTime?: number;
		runFunctionAtTime?: () => void;
		play?: () => void;
	};

	interface GameState {
		gameStarted: boolean;
		currentSceneId: number;
		activeScene: SceneObject;
		nextScenes: SceneObject[];
	}

	interface GameGlobals {
		gameReady: boolean;
		gameStarted: boolean;
		sceneDimensions: {
			stageWidth: number;
			stageHeight: number;
		};
	}

	interface Hitbox {
		x: number;
		y: number;
		width: number;
		height: number;
	}
}

export { };
