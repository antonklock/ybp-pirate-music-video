import { scenes } from '$lib/stores/gameStore';
import { addSceneToSession, gameSession } from '$lib/stores/gameSessionStore';
import { loadScene } from './loadScene';
import { unloadScene } from './unloadScene';
import { get } from 'svelte/store';

export const setActiveScene = (sceneToActivate: SceneObject, preloadDelay: number = 10) => {
    scenes.update((scenes) => {
        scenes.forEach((scene) => {
            if (scene.id === sceneToActivate.id) {
                console.log('Setting scene to active: ' + sceneToActivate.id);
                scene.isActive = true;
            }
        });

        return scenes;
    });

    addSceneToSession(sceneToActivate.id);
    localStorage.setItem('gameSession', JSON.stringify(get(gameSession)));

    if (!sceneToActivate.play) return console.error(`Scene ${sceneToActivate.id} has no play function`);
    if (!sceneToActivate.canPlay) return console.error(`Scene ${sceneToActivate.id} is not ready to play`);
    sceneToActivate.play();

    const loadedScenes: SceneObject[] = get(scenes).filter((scene) => scene.isLoaded);
    // if (!loadedScenes) console.error("No scenes loaded");

    // Unload previous scenes
    for (const sceneToUnload of loadedScenes) {
        if (sceneToUnload.id !== sceneToActivate.id) {
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
                console.log(`Unloading non-active scene ${sceneToUnload.id}`);
            }

            unloadScene(sceneToUnload.id);
        }
    }

    setTimeout(() => {
        console.log('Loading next scenes: ', sceneToActivate.nextScenes);
        for (const nextScene of sceneToActivate.nextScenes) {
            loadScene(nextScene);
        }
    }, preloadDelay);
};
