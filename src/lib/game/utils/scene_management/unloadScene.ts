import { scenes } from '$lib/stores/gameStore';


/**
 * Unloads the scene with the provided ID from the game.
 * @param sceneId The ID of the scene to unload
 */
export const unloadScene = (sceneId: string) => {
    console.log("Unloading scene: " + sceneId);

    scenes.update((sceneObjects) => {
        const newScenes = sceneObjects.map(sceneObject => {
            if (sceneObject.id === sceneId) {
                sceneObject.id = "unloaded";
                sceneObject.isActive = false;
                sceneObject.loop = false;
                sceneObject.name = "";
                sceneObject.nextScenes = [];
                sceneObject.url = "";
                sceneObject.play = () => { };
                sceneObject.triggerTime = 0;
                sceneObject.runFunctionAtTime = () => { };
            }

            return sceneObject;
        });

        return newScenes;
    });

    scenes.subscribe((scenes) => console.log("scenes: ", scenes));
}