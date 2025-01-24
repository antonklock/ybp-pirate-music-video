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

	interface GameSession {
		id: string;
		startedAt: Date | null;
		endedAt: Date | null;
		elapsedTime: number;
		sceneOrder: SceneSession[];
	}

	interface SceneSession {
		gameId: string;
		sceneSessionId: string;
		sceneId: string;
		startedAt: Date | null;
		endedAt: Date | null;
		elapsedTime: number;
	}

	interface SceneObject {
		id: string;
		name: string;
		urls: {
			cloudflare: string;
			mux: string;
		};
		player: MediaPlayerElement | undefined;
		canPlay: boolean;
		isLoaded: boolean;
		isCurrent: boolean;
		nextScenes: string[];
		loop: boolean;
		isActive: boolean;
		hitboxes: Hitbox[];
		sceneEndTime?: number;
		triggerTime?: number;
		play?: () => void;
		onSceneEnd?: () => void;
		runFunctionAtTime?: () => void;
	};

	interface GameGlobals {
		isGameReady: boolean;
		isGameStarted: boolean;
		gameStartedAt: Date | null;
		sceneDimensions: {
			stageWidth: number;
			stageHeight: number;
		};
		currentScene: SceneObject;
		loadedScenes: SceneObject[];
		videoProvider: 'cloudflare' | 'mux';
	}

	interface Hitbox {
		name: string;
		color: number;
		x: number;
		y: number;
		width: number;
		height: number;
		isLoaded: boolean;
		isActive: boolean;
		activationInterfals: ActiveInterval[];
		onHit: () => void;
	}

	interface ActiveInterval {
		start: number;
		end: number;
	}
}

export { };
