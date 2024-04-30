import type { dashjs, MediaPlayerClass } from 'dashjs';

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

	type SceneObject = {
		id: number;
		name: string;
		url: string;
		nextVideos: string[];
		loop: boolean;
		videoPlayer?: MediaPlayerClass;
		videoElement?: HTMLVideoElement;
	};

	interface GameState {
		gameStarted: boolean;
		currentSceneId: number;
		activeScene: SceneObject;
		nextScenes: SceneObject[];
	}

	interface GameGlobals {
		gameReady: boolean;
		mainVideoElement: HTMLDivElement | null;
		sceneDimensions: {
			stageWidth: number;
			stageHeight: number;
		};
		dashjs: dashjs | null;
	}

	interface Hitbox {
		x: number;
		y: number;
		width: number;
		height: number;
	}
}

export { };
