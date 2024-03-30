import { Application, Assets, Sprite } from 'pixi.js';
import { supabase } from '$lib/supabase/supabaseClient';
import { videos } from '$lib/game/videoConfig';
import { gameState } from '$lib/stores/gameStore';

type GameState = {
    currentVideoObject: VideoObject | undefined
}

export async function pixiJsMain(element: HTMLElement) {
    try {
        let gState: GameState = {
            currentVideoObject: videos[0]
        };

        gameState.subscribe((value) => {
            gState = value;
        })

        const app = new Application();
        await app.init();
        element?.appendChild(app.canvas);

        // const videoTextureURL = getVidUrlFromSupabase('pirate-videos', 'hub.mp4');
        const videoTextureURL = supabase.storage.from('pirate-videos').getPublicUrl('hub.mp4').data.publicUrl
        const video2TextureURL = supabase.storage.from('pirate-videos').getPublicUrl('wheel.mp4').data.publicUrl
        const videoTexture = await Assets.load(videoTextureURL);
        const video2Texture = await Assets.load(video2TextureURL);
        const hubVideo = new Sprite(videoTexture);

        console.log(videoTexture.source);

        hubVideo.x = app.renderer.width / 2;
        hubVideo.y = app.renderer.height / 2;

        hubVideo.anchor.x = 0.5;
        hubVideo.anchor.y = 0.5;

        hubVideo.scale.x = 0.5;
        hubVideo.scale.y = 0.5;

        app.stage.addChild(hubVideo);

        app.ticker.add((time) => {
            if (gState.currentVideoObject)
                if (gState.currentVideoObject.name === 'hub.mp4') {
                    // console.log('Hub: ' + gState.currentVideo)
                    if (hubVideo.texture !== videoTexture) {
                        hubVideo.texture = videoTexture;
                    }

                } else {
                    // console.log('Not hub: ' + gState.currentVideo)
                    if (hubVideo.texture !== video2Texture) {
                        hubVideo.texture = video2Texture;
                    }
                }
        });
    } catch (e) {
        console.warn(e);
    }
}

export async function getVidUrlFromSupabase(bucket: string, name: string) {
    return supabase.storage.from(bucket).getPublicUrl(name).data.publicUrl
}