import { scenes, gameSession } from '$lib/stores/gameStore';
import { loadScene } from './loadScene';
import { unloadScene } from './unloadScene';

export const setActiveScene = (scene: SceneObject, preloadDelay: number = 10) => {

    let loadedScenes: SceneObject[] = [];

    scenes.subscribe((scenes) => {
        loadedScenes = scenes.filter((scene) => scene.isLoaded);
    });

    if (!loadedScenes) return console.error("No scenes loaded");
    if (!scene.play) return console.error(`Scene ${scene.id} has no play function`);

    scene.play();
    scene.startedAt = new Date();

    // Unload previous scenes
    for (const sceneToUnload of loadedScenes) {
        if (sceneToUnload.id !== scene.id) {
            sceneToUnload.endedAt = new Date();

            console.log(`Unloaded scene ${sceneToUnload.id}`, sceneToUnload.endedAt);
            console.log(`Started at: ${sceneToUnload.startedAt}`);
            unloadScene(sceneToUnload.id);
        }
    }

    setTimeout(() => {
        // Preload next scenes
        const nextScenes = scene.nextScenes;
        for (const nextScene of nextScenes) {
            loadScene(nextScene);
        }
    }, preloadDelay);

    gameSession.update((session) => {
        session.sceneOrder.push({
            gameId: session.id,
            sceneId: scene.id,
            startedAt: new Date(),
            elapsedTime: 0,
            endedAt: null,
            scene: scene
        });
        return session;
    });
};
