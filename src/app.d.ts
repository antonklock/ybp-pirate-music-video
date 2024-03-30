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
		id: string,
		bucket: string,
		name: string,
		nextVideos: string[]
	}

	type GameState = {
		currentVideoObject: VideoObject
	}
}

export { };
