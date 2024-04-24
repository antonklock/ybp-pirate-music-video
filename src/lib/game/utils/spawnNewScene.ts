// import { gameState, scenes, gameGlobals } from '$lib/stores/gameStore';

// // Write JSDOC for this function

// export const spawnNewScene = (sceneId: number) => {

//     let mainVideoElement: HTMLVideoElement | null;
//     let sceneDimensions: { sceneWidth: number; sceneHeight: number; };
//     let dashjs: DashJs | null;
    
//     gameGlobals.subscribe((value) => {
//         mainVideoElement = value.mainVideoElement;
//         sceneDimensions = value.sceneDimensions;
//         dashjs = value.dashjs;
//     });

//     if(!dashjs || !mainVideoElement || !sceneDimensions) {
//         console.error('DashJs, mainVideoElement or sceneDimensions not found');
//         return;
//     }

//     const sceneObject = scenes.subscribe((value) => {
//         return value.find((scene) => scene.id === sceneId);
//     });

//     if (!sceneObject) {
//         console.error('No scene found for sceneId:', sceneId);
//         return;
//     }

//     const videoPlayer = dashjs.MediaPlayer().create();

//     const videoElement = document.createElement('video');
//     videoElement.controls = false;
//     videoElement.playsInline = true;
//     videoElement.style.position = 'absolute';
//     videoElement.style.width = `${sceneDimensions.sceneWidth}px`;
//     videoElement.style.height = `${sceneDimensions.sceneHeight}px`;

//     videoElement.preload = 'metadata';
//     videoElement.style.display = 'none';
//     videoElement.style.borderRadius = '5px';
    
//     if (!mainVideoElement) {
//         console.error('No main video element found');
//         return;
//     } else {
//         mainVideoElement.appendChild(videoElement);
//     }

//     const url = sceneObject?.url;
//     if (!url) {
//         console.error('No URL found for sceneId:', sceneId);
//         return;
//     }

//     videoPlayer.initialize(videoElement, url, false);
//     videoPlayer.setMute(true);

//     gameState.update((state) => {
//         return {
//             ...state,
//             sceneObjects: state.sceneObjects.map((scene) => {
//                 if (scene.id === sceneId) {
//                     return {
//                         ...scene,
//                         videoPlayer,
//                         videoElement
//                     };
//                 }
//                 return scene;
//             })
//         }
//     });
// }