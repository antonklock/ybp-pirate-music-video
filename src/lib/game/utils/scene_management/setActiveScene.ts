import { scenes } from '$lib/stores/gameStore';
import { loadScene } from './loadScene';
import { unloadScene } from './unloadScene';

export const setActiveScene = (scene: SceneObject) => {

    let loadedScenes: SceneObject[] = [];

    scenes.subscribe((scenes) => {
        loadedScenes = scenes;
    })

    if (!loadedScenes) return console.error("No scenes loaded");
    if (!scene.play) return console.error(`Scene ${scene.id} has no play function`);

    scene.play();

    // Unload previous scenes
    for (const sceneToUnload of loadedScenes) {
        if (sceneToUnload.id !== scene.id) unloadScene(sceneToUnload.id);
    }

    setTimeout(() => {
        // Preload next scenes
        const nextScenes = scene.nextScenes;
        for (const nextScene of nextScenes) {
            loadScene(nextScene);
        }
    }, 2000);
};