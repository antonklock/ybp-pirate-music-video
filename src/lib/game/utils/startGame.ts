interface StartGameConfig {
	elementsToDisplay: Element[];
	elementsToHide: Element[];
	videoPlayerToStart: VideoPlayer | null;
	musicElementToStart: HTMLAudioElement | null;
	gameStarted: boolean;
}

export function startGame(config: StartGameConfig) {
	const {
		elementsToDisplay,
		elementsToHide,
		videoPlayerToStart,
		musicElementToStart,
		gameStarted
	} = config;

	if (gameStarted) {
		return;
	}

	elementsToDisplay.forEach((element) => {
		element.style.display = 'block';
	});

	elementsToHide.forEach((element) => {
		element.style.display = 'none';
	});

	console.log('Starting game');

	if (videoPlayerToStart) {
		videoPlayerToStart.play();
	}

	if (musicElementToStart) {
		musicElementToStart.play();
	}
}
