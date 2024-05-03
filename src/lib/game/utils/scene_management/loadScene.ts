import { sceneObjects } from '$lib/game/sceneConfig';
import { scenes } from '$lib/stores/gameStore';

export const loadScene = (sceneIndex: number) => {
    const scene = sceneObjects[sceneIndex];

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
    scenes.update((sceneObjects) => [...sceneObjects, scene]);

    return scene;
}