import type { Sprite } from "pixi.js";

export function pauseCurrentVideo(video: Sprite) {
    video.texture.source.resource.pause();
}

export function stopCurrentVideo(video: Sprite) {
    video.texture.source.resource.pause();
    video.texture.source.resource.currentTime = 0;
}

// export function stopAllVideos(videos: Sprite[]) {
//     videos.forEach((video) => {
//         video.videoSprite.texture.source.resource.pause();
//         video.videoSprite.texture.source.resource.currentTime = 0;
//     });
// }

// export function pauseAllVideos() {
//     videos.forEach((video) => {
//         video.videoSprite.texture.source.resource.pause();
//     });
// }

// export function playAllVideos() {
//     videos.forEach((video) => {
//         video.videoSprite.texture.source.resource.play();
//     });
// }