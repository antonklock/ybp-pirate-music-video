import { Application, Assets, Sprite, Texture } from 'pixi.js';
import { gameState } from '$lib/stores/gameStore';
import { getVidUrlFromSupabase } from '$lib/game/utils/getVidUrlFromSupabase';
import { videos } from '$lib/game/videoConfig';
import { initailizeVideoSprites } from '$lib/game/utils/initailizeVideoSprites';

let mainVideo: Sprite;

async function initializeMainVideo() {
    const video = videos[0];
    const videoTextureURL = await getVidUrlFromSupabase(video.bucket, video.sourceName);
    const videoTexture = await Assets.load(videoTextureURL);
    videoTexture.source.resource.loop = true;
    videoTexture.source.resource.muted = true;
    videoTexture.source.resource.autoplay = false;
    videoTexture.source.resource.updateFPS = 30;
    // videoTexture.source.resource.preload = true;
    videoTexture.source.resource.autoLoad = true;
    // videoTexture.source.resource.playsinline = true;
    videoTexture.source.resource.crossorigin = true;

    mainVideo = new Sprite(videoTexture);
}

export function setCurrentVideoTexture(newVideoTexture: Texture) {
    mainVideo.texture = newVideoTexture;
}

export function setCurrentVideo(video: VideoObject) {
    try {
        gameState.update((value) => {
            value.currentVideoObject = video;
            return value;
        });
        setCurrentVideoTexture(video.videoSprite.texture);
    } catch (error) {
        console.warn(error);
    }
}

export function playCurrentVideo() {
    //Pause all other videos
    videos.forEach((video) => {
        if (video.videoSprite !== mainVideo) {
            video.videoSprite.texture.source.resource.pause();
        }
    });

    console.log('Current video: ', mainVideo.texture.source.resource);
    console.log('Is ready: ', mainVideo.texture.source.resource.isReady);
    mainVideo.texture.source.resource.muted = false;
    mainVideo.texture.source.resource.play();
}

export function pauseCurrentVideo() {
    mainVideo.texture.source.resource.pause();
}

export function stopCurrentVideo() {
    mainVideo.texture.source.resource.pause();
    mainVideo.texture.source.resource.currentTime = 0;
}

export function stopAllVideos() {
    videos.forEach((video) => {
        video.videoSprite.texture.source.resource.pause();
        video.videoSprite.texture.source.resource.currentTime = 0;
    });
}

export function pauseAllVideos() {
    videos.forEach((video) => {
        video.videoSprite.texture.source.resource.pause();
    });
}

export function playAllVideos() {
    videos.forEach((video) => {
        video.videoSprite.texture.source.resource.play();
    });
}

export async function pixiJsMain(element: HTMLElement) {
    //Initialize the pixi app
    const app = new Application();
    await app.init();
    element?.appendChild(app.canvas);

    initializeMainVideo().then(() => {
        console.log('Main video loaded');

        mainVideo.x = app.renderer.width / 2;
        mainVideo.y = app.renderer.height / 2;

        mainVideo.anchor.x = 0.5;
        mainVideo.anchor.y = 0.5;

        mainVideo.scale.x = 0.5;
        mainVideo.scale.y = 0.5;

        app.stage.addChild(mainVideo);
    });
    initailizeVideoSprites(videos).then(() => {
        console.log('Video sprites loaded');
    });

    // app.ticker.add(() => {
    //     console.log('Is ready: ', mainVideo.texture.source.resource.isReady);
    // });
}