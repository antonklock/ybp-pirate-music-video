import { scenes, gameSession } from '$lib/stores/gameStore';
import { loadScene } from './loadScene';
import { unloadScene } from './unloadScene';
import { get } from 'svelte/store';
export const setActiveScene = (sceneToActivate: SceneObject, preloadDelay: number = 10) => {

    let loadedScenes: SceneObject[] = [];

    scenes.update((scenes) => {

        scenes.map((scene) => {
            if (scene.id === sceneToActivate.id) {
                scene.isActive = true;

                return scene;
            }
        });

        loadedScenes = scenes.filter((scene) => scene.isLoaded);

        console.log("loadedScenes:", loadedScenes);

        return scenes;
    });

    gameSession.update((session) => {
        const newSceneSession = {
            gameId: session.id,
            sceneId: sceneToActivate.id,
            startedAt: new Date(),
            elapsedTime: 0,
            endedAt: null
        }

        session.sceneOrder.push(newSceneSession);
        // console.log("Updated session", session);

        return session;
    });

    console.log("gameSession:", get(gameSession));
    localStorage.setItem('gameSession', JSON.stringify(get(gameSession)));

    if (!loadedScenes) return console.error("No scenes loaded");
    if (!sceneToActivate.play) return console.error(`Scene ${sceneToActivate.id} has no play function`);

    sceneToActivate.play();

    // Unload previous scenes
    for (const sceneToUnload of loadedScenes) {
        if (sceneToUnload.id !== sceneToActivate.id) {
            // console.log(`Unloaded scene ${sceneToUnload.id}`, sceneToUnload.endedAt);
            // console.log(`Started at: ${sceneToUnload.startedAt}`);

            if (sceneToUnload.isActive) {
                console.log(`Unloading active scene ${sceneToUnload.id}`);
                gameSession.update((session) => {
                    const updatedSession = session.sceneOrder.map((scene) => {
                        if (scene.sceneId === sceneToUnload.id) {
                            return {
                                ...scene,
                                endedAt: new Date(),
                                elapsedTime: scene.startedAt
                                    ? new Date().getTime() - scene.startedAt.getTime()
                                    : 0
                            };
                        }
                        return scene;
                    });

                    return {
                        ...session,
                        sceneOrder: updatedSession
                    };
                });
            } else {
                console.log(`Unloading scene ${sceneToUnload.id}. Although it's not active`);
            }

            unloadScene(sceneToUnload.id);
        }
    }

    setTimeout(() => {
        // Preload next scenes
        const nextScenes = sceneToActivate.nextScenes;
        for (const nextScene of nextScenes) {
            loadScene(nextScene);
        }
    }, preloadDelay);
};
