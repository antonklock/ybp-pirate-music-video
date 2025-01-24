import * as PIXI from 'pixi.js';
import { gameGlobals } from '$lib/stores/gameStore';

export const addNewPlayerSprite = (scene: SceneObject, videoPlayer: HTMLVideoElement) => {
    let sceneDimensions = {
        stageWidth: 0,
        stageHeight: 0,
    };
    let pixiApp: PIXI.Application | null = null;
    gameGlobals.subscribe((globals) => {
        sceneDimensions = globals.sceneDimensions;
        pixiApp = globals.pixiApp;
    });

    if (!pixiApp) {
        console.error("Can't add new player sprite, PIXI app is not initialized");
        return;
    }

    const videoElement = videoPlayer as HTMLVideoElement;
    if (videoElement) {
        videoElement.addEventListener('loadeddata', () => {
            if (videoElement.videoWidth > 0 && videoElement.videoHeight > 0) {
                const videoTexture = PIXI.Texture.from(videoElement);
                const playerSprite = new PIXI.Sprite(videoTexture);
                console.log('playerSprite:', playerSprite);
                playerSprite.x = 0;
                playerSprite.y = 0;
                playerSprite.setSize(sceneDimensions.stageWidth, sceneDimensions.stageHeight);
                playerSprite.label = "playerSprite-" + scene.id;
                playerSprite.zIndex = 99;
                playerSprite.visible = true;
                pixiApp?.stage.addChild(playerSprite);
                console.log(
                    'Video texture created with dimensions:',
                    videoElement.videoWidth,
                    videoElement.videoHeight
                );

                // TODO: MOVE THIS TO PROPER PLACE
                //Hide all other player sprites and set current one visible
                gameGlobals.subscribe((globals) => {
                    if (globals.currentScene) {
                        pixiApp?.stage.children.forEach((child) => {
                            if (child instanceof PIXI.Sprite && child.label?.startsWith('playerSprite-')) {
                                if (child.label === `playerSprite-${globals.currentScene.id}`) {
                                    child.visible = true;
                                    child.zIndex = 99;
                                } else {
                                    child.visible = false;
                                    child.zIndex = 0;
                                }
                            }
                        });
                    }
                });

                // Remove sprites for unloaded scenes
                gameGlobals.subscribe((globals) => {
                    const loadedSceneIds = globals.loadedScenes.map(scene => scene.id);
                    pixiApp?.stage.children.forEach((child) => {
                        if (child instanceof PIXI.Sprite && child.label?.startsWith('playerSprite-')) {
                            const spriteSceneId = child.label.replace('playerSprite-', '');
                            if (!loadedSceneIds.includes(spriteSceneId)) {
                                pixiApp?.stage.removeChild(child);
                            }
                        }
                    });
                });

            } else {
                console.warn('Video element not loaded');
            }
        });
        // if (videoElement.videoWidth > 0 && videoElement.videoHeight > 0) {
        //     const videoTexture = PIXI.Texture.from(videoElement);
        //     const playerSprite = new PIXI.Sprite(videoTexture);
        //     console.log('playerSprite:', playerSprite);
        //     playerSprite.x = 0;
        //     playerSprite.y = 0;
        //     playerSprite.setSize(sceneDimensions.stageWidth, sceneDimensions.stageHeight);
        //     pixiApp?.stage.addChild(playerSprite);
        //     console.log(
        //         'Video texture created with dimensions:',
        //         videoElement.videoWidth,
        //         videoElement.videoHeight
        //     );
        // } else {
        //     console.warn('Video element not loaded');
        // }
    } else {
        console.warn('No video player found for scene:', scene.id);
    }
}