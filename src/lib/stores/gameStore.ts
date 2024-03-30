import { writable } from "svelte/store";
import { videos } from '$lib/game/videoConfig'

export const gameState = writable<GameState>({
    currentVideoObject: videos[0],
})