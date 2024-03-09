import * as PIXI from 'pixi.js'
import { Application, Assets, Sprite } from 'pixi.js';
import { supabase } from '$lib/supabase/supabaseClient'


/**
 * @param {{ appendChild: (arg0: HTMLCanvasElement) => void; }} element
 */
export async function pixiJsMain(element) {
    const app = new Application();
    await app.init();
    element?.appendChild(app.canvas);

    const videoTextureURL = supabase.storage.from('pirate-videos').getPublicUrl('hub.mp4').data.publicUrl
    const videoTexture = await Assets.load(videoTextureURL);
    const hubVideo = new Sprite(videoTexture);

    hubVideo.x = app.renderer.width / 2;
    hubVideo.y = app.renderer.height / 2;

    hubVideo.anchor.x = 0.5;
    hubVideo.anchor.y = 0.5;

    hubVideo.scale.x = 0.5;
    hubVideo.scale.y = 0.5;

    app.stage.addChild(hubVideo);
}