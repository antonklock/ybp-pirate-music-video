import { sceneObjects } from '$lib/game/sceneConfig';
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
    const scene = sceneObjects.find(scene => scene.id === sceneId);

    if (!scene) return console.error("Cannot find scene with ID: " + sceneId);

    const { play, triggerTime, runFunctionAtTime } = config;

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
                } else {
                    sceneObject.isActive = false;
                }

                return sceneObject;
            }));
        }
    }
    scenes.update((sceneObjects) => [...sceneObjects, scene]);

    return scene;
}