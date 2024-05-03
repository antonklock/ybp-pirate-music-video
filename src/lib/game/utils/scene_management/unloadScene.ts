import { scenes } from '$lib/stores/gameStore';

export const unloadScene = (sceneToUnload: number) => {
    scenes.update((sceneObjects) => sceneObjects.filter(scene => scene.id !== sceneToUnload));
}