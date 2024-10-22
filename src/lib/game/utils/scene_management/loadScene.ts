import { gameGlobals } from '$lib/stores/gameStore';
import { scenes } from '$lib/stores/gameStore';

type SceneConfig = {
    play?: () => void;
    triggerTime?: number;
    runFunctionAtTime?: () => void;
}

/**
 * Load a scene into the game
 * @param sceneId Index of the scene to load
 * @param config Configuration for the scene
 */
export const loadScene = (sceneId: string, config: SceneConfig = {}) => {
    const { play, triggerTime, runFunctionAtTime } = config;

    scenes.update((scenesToUpdate) => {
        return scenesToUpdate.map(scene => {
            if (scene.id === sceneId) {
                scene.isLoaded = true;

                if (triggerTime && runFunctionAtTime) {
                    scene.triggerTime = triggerTime;
                    scene.runFunctionAtTime = runFunctionAtTime;

                    console.log("triggerTime: ", triggerTime);
                    console.log("runFunctionAtTime: ", runFunctionAtTime);
                } else if (triggerTime || runFunctionAtTime) {
                    console.error("Both triggerTime and runFunctionAtTime must be provided");
                }

                // What happens when the scene is played
                if (play) {
                    // Setting a custom play function from the config
                    scene.play = play;
                } else {
                    // Default play function
                    scene.play = () => {
                        scenes.update((sceneObjects) => sceneObjects.map(sceneObject => {
                            if (sceneObject.id === scene.id) {
                                sceneObject.isActive = true;
                                sceneObject.isCurrent = true;

                                // Update the current scene in the gameGlobals store
                                gameGlobals.update((gameGlobals) => {
                                    gameGlobals.currentScene = sceneObject;
                                    return gameGlobals;
                                });
                            } else {
                                sceneObject.isActive = false;
                                sceneObject.isCurrent = false;
                            }
                            return sceneObject;
                        }));
                    }
                }
            }
            return scene;
        });
    });
}
