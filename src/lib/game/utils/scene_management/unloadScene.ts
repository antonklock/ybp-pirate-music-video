import { scenes } from '$lib/stores/gameStore';


/**
 * Unloads the scene with the provided ID from the game.
 * @param sceneId The ID of the scene to unload
 */
export const unloadScene = (sceneId: string) => {
    console.log("Unloading scene: " + sceneId);

    scenes.update((sceneObjects) => {
        return sceneObjects.map(sceneObject => {
            if (sceneObject.id === sceneId) {
                sceneObject.isLoaded = false;
                sceneObject.isCurrent = false;
                sceneObject.isActive = false;
                sceneObject.play = () => { };
                sceneObject.triggerTime = 0;
                sceneObject.runFunctionAtTime = () => { };
                sceneObject.pixiTexture = undefined;
            }
            return sceneObject;
        });
    });

    scenes.subscribe((scenes) => console.log("scenes: ", scenes));
}