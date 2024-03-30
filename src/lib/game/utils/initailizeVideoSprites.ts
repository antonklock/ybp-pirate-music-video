import { Assets, Sprite } from 'pixi.js';
import { getVidUrlFromSupabase } from '$lib/game/utils/getVidUrlFromSupabase';

export async function initailizeVideoSprites(videos: VideoObject[]) {
    videos.forEach(async (video) => {
        const videoTextureURL = await getVidUrlFromSupabase(video.bucket, video.sourceName);
        const videoTexture = await Assets.load(videoTextureURL);
        videoTexture.source.resource.loop = video.loop;
        videoTexture.source.resource.muted = true;
        videoTexture.source.resource.autoplay = false;
        const sprite = new Sprite(videoTexture);
        video.videoSprite = sprite;
    });

    return videos;
}