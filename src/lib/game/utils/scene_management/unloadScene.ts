import { scenes } from '$lib/stores/gameStore';
import { gameGlobals } from '$lib/stores/gameStore';


/**
 * Unloads the scene with the provided ID from the game.
 * @param sceneId The ID of the scene to unload
 */
export const unloadScene = (sceneId: string) => {
    scenes.update((sceneObjects) => {
        return sceneObjects.map(sceneObject => {
            if (sceneObject.id === sceneId) {
                sceneObject = {
                    ...sceneObject,
                    isLoaded: false,
                    isCurrent: false,
                    isActive: false
                }

                gameGlobals.update((gameGlobals) => {
                    return {
                        ...gameGlobals,
                        loadedScenes: gameGlobals.loadedScenes.filter((scene) => scene.id !== sceneId)
                    }
                });
            }
            return sceneObject;
        });
    });
}