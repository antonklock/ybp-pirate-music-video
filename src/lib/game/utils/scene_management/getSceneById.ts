import { scenes } from '$lib/stores/gameStore';

export const getSceneById = (sceneId: number): SceneObject | undefined => {
    let sceneObject: SceneObject | undefined = undefined;

    scenes.subscribe((sceneObjects) => {
        const scene = sceneObjects.find(scene => scene.id === sceneId);

        if (scene) {
            sceneObject = scene;
        } else {
            sceneObject = undefined;
            throw new Error(`Scene with id ${sceneId} not found`);
        }
    });

    return sceneObject;
}