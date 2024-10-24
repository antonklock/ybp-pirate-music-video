import { scenes } from '$lib/stores/gameStore';


/**
 * Unloads the scene with the provided ID from the game.
 * @param sceneId The ID of the scene to unload
 */
export const unloadScene = (sceneId: string) => {
    // console.log("Unloading scene: " + sceneId);

    scenes.update((sceneObjects) => {
        return sceneObjects.map(sceneObject => {
            if (sceneObject.id === sceneId) {
                sceneObject = {
                    ...sceneObject,
                    isLoaded: false,
                    isCurrent: false,
                    isActive: false
                }
            }
            return sceneObject;
        });
    });
}