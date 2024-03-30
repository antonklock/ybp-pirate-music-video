import { Assets, Sprite } from 'pixi.js';
import { getVidUrlFromSupabase } from '$lib/game/utils/getVidUrlFromSupabase';

export async function initailizeVideoSprites(videos: VideoObject[]) {
    videos.forEach(async (video) => {
        const videoTextureURL = await getVidUrlFromSupabase(video.bucket, video.sourceName);
        const videoTexture = await Assets.load(videoTextureURL).then((texture) => {
            texture.source.resource.loop = video.loop;
            texture.source.resource.muted = true;
            texture.source.resource.autoplay = false;
            texture.source.resource.updateFPS = 30;
            texture.source.resource.autoLoad = true;
            return texture;
        });

        const sprite = new Sprite(videoTexture);
        video.videoSprite = sprite;
    });

    return videos;
}