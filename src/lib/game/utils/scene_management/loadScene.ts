// import { sceneObjects } from '$lib/game/sceneConfig';
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
                } else if (triggerTime || runFunctionAtTime) {
                    console.error("Both triggerTime and runFunctionAtTime must be provided");
                }

                if (play) {
                    scene.play = play;
                } else {
                    scene.play = () => {
                        console.log("Playing scene: " + scene.id);

                        scenes.update((sceneObjects) => sceneObjects.map(sceneObject => {
                            if (sceneObject.id === scene.id) {
                                sceneObject.isActive = true;
                                sceneObject.isCurrent = true;
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