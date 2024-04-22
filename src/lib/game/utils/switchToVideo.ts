import { gameState } from '$lib/stores/gameStore';

let currentVideoIndex = 0;
gameState.subscribe((value) => {
	currentVideoIndex = value.currentVideoIndex;
});

export function switchToVideo(videoIndex: number) {
	gameState.update((state) => {
		state.currentVideoIndex = videoIndex;
		return state;
	});

	for (let i = 0; i < videoPlayers.length; i++) {
		if (i != currentVideoIndex) {
			videoPlayers[i].seek(0);
			videoPlayers[i].pause();
			videoElements[i].style.display = 'none';
		}
	}

	const player = videoPlayers[currentVideoIndex];
	const element = videoElements[currentVideoIndex];
	element.style.display = 'block';

	console.log(player.isReady());

	player.play();
}
