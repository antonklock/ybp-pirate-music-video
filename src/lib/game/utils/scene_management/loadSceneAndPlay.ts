import { loadScene } from './loadScene';

export const loadSceneAndPlay = (sceneId: number) => {
    const scene = loadScene(sceneId);
    if (scene.play) scene.play();
}