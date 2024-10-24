import * as PIXI from 'pixi.js';
import { gameSession } from '$lib/stores/gameStore';

export function createDebugMenu(app: PIXI.Application): PIXI.Container | null {
    // Check if app is properly initialized
    if (!app?.stage) {
        console.error('PIXI app not properly initialized');
        return null;
    }

    const debugContainer = new PIXI.Container();
    debugContainer.visible = false;
    debugContainer.position.set(10, 10);

    const background = new PIXI.Graphics();
    background.rect(0, 0, 200, 150);
    background.fill({ color: 0x660000, alpha: 0.7 });
    debugContainer.addChild(background);

    const title = new PIXI.Text({
        text: 'Debug Menu',
        style: {
            fontSize: 14,
            fill: { color: 0xffffff }
        }
    });

    title.position.set(10, 10);
    debugContainer.addChild(title);

    const gameSessionText = new PIXI.Text({
        text: 'Game Session ID: N/A',
        style: {
            fontSize: 12,
            fill: { color: 0xffffff }
        }
    });
    gameSessionText.position.set(10, 40);
    debugContainer.addChild(gameSessionText);

    gameSession.subscribe(session => {
        gameSessionText.text = `Game Session ID: ${session.id ?? 'N/A'}`;
    });

    const fpsText = new PIXI.Text({
        text: "FPS: 0",
        style: {
            fontSize: 12,
            fill: { color: 0xffffff }
        }
    });
    fpsText.position.set(10, 60);
    debugContainer.addChild(fpsText);

    const objectCountText = new PIXI.Text({
        text: 'Objects: 0',
        style: {
            fontSize: 12,
            fill: { color: 0xffffff }
        }
    });
    objectCountText.position.set(10, 80);
    debugContainer.addChild(objectCountText);

    const latestSceneText = new PIXI.Text({
        text: 'Latest Scene: N/A',
        style: {
            fontSize: 12,
            fill: { color: 0xffffff }
        }
    });
    latestSceneText.position.set(10, 100);
    debugContainer.addChild(latestSceneText);

    gameSession.subscribe(session => {
        const latestScene = session.sceneOrder[session.sceneOrder.length - 1];
        if (latestScene) {
            latestSceneText.text = `Latest Scene: ${latestScene.sceneId}`;
        } else {
            latestSceneText.text = 'Latest Scene: N/A';
        }
    });

    const ticker = app.ticker || PIXI.Ticker.shared;

    const updateStats = () => {
        if (ticker) {
            const fps = Math.round(1000 / ticker.deltaMS);
            fpsText.text = `FPS: ${fps}`;
            objectCountText.text = `Objects: ${app.stage.children.length}`;
        }
    };

    ticker.add(updateStats);

    const keyDownHandler = (event: KeyboardEvent) => {
        if (event.key === 'd' || event.key === 'D') {
            debugContainer.visible = !debugContainer.visible;
        }
    };

    document.addEventListener('keydown', keyDownHandler);

    const originalDestroy = debugContainer.destroy;
    debugContainer.destroy = (...args) => {
        ticker.remove(updateStats);
        document.removeEventListener('keydown', keyDownHandler);
        originalDestroy.apply(debugContainer, args);
    };

    return debugContainer;
}

