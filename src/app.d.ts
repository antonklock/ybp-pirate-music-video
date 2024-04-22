import { MediaPlayerClass } from 'dashjs';

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

	type VideoObject = {
		id: string;
		name: string;
		url: string;
		nextVideos: string[];
		loop: boolean;
		videoPlayer?: MediaPlayerClass;
	};

	interface GameState {
		videoObjects: VideoObject[];
		currentVideoIndex: number;
	}
}

export {};
