// import { gameState } from '$lib/stores/gameStore';

// // Subscribing to the gameState
// let currentSceneId: number;
// let sceneObjects: SceneObject[];

// gameState.subscribe((value) => {
// 	currentSceneId = value.currentSceneId;
// 	sceneObjects = value.sceneObjects;
// });

// /**
//  * Switches to the specified video by updating the current video index and controlling the video playback.
//  * @param videoIndex - The index of the video to switch to.
//  */
// export function switchToSceneById(sceneId: number) {
// 	const sceneObject = sceneObjects.find((scene) => scene.id === sceneId);
// 	if (!sceneObject) return;

// 	const videoPlayer = sceneObject.videoPlayer;
// 	const videoElement = sceneObject.videoElement;
// 	if (!videoPlayer || !videoElement) return;


// 	for (const scene of sceneObjects) {
// 		if (scene.id !== sceneId) {
// 			scene.videoPlayer?.seek(0);
// 			scene.videoPlayer?.pause();
// 			if(scene.videoElement) scene.videoElement.style.display = 'none';
// 		}
// 	}

// 	gameState.update((state) => {
// 		console.log("Switching to scene: " + currentSceneId);
// 		state.currentSceneId = sceneId;
// 		return state;
// 	});

// 	videoElement.style.display = 'block';
// 	videoPlayer.play();
// }
