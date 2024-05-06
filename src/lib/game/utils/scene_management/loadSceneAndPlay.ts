import { loadScene } from './loadScene';


/**
 * Loads a scene into the game and plays it.
 * @param sceneId The id of the scene to load
 */
export const loadSceneAndPlay = (sceneId: number) => {
    const scene = loadScene(sceneId);
    if (scene.play) scene.play();
}