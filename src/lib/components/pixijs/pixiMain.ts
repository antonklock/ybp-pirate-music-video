import { Application } from 'pixi.js';

export async function pixiJsMain(element: HTMLElement) {
    const app = new Application();
    await app.init();
    element?.appendChild(app.canvas);


}