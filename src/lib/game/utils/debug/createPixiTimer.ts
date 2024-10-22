import * as PIXI from 'pixi.js';

export function createPixiTimer(app: PIXI.Application) {


    // Create a container for the timer
    const timerContainer = new PIXI.Container();
    timerContainer.x = app.screen.width - 110; // Adjusted x position
    timerContainer.y = 20;

    // Create a black box for the timer
    const timerBox = new PIXI.Graphics();
    timerBox.rect(0, 0, 100, 40);
    timerBox.fill('#000000');
    timerBox.alpha = 0.5;

    // Create text for the timer
    const timerText = new PIXI.Text({
        text: '00:00:00',
        style: {
            fontSize: 14,
            fill: { color: 0xffffff }
        }
    });
    timerText.anchor.set(0.5);
    timerText.x = timerBox.width / 2;
    timerText.y = timerBox.height / 2;

    return { timerContainer, timerText, timerBox };
}
