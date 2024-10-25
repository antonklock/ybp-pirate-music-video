import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import { get } from 'svelte/store';

export const gameSession = writable<GameSession>({
    id: uuidv4(),
    sceneOrder: [],
    startedAt: null,
    endedAt: null,
    elapsedTime: 0
});

export function addSceneToSession(sceneId: string) {
    endLatestSceneInSession();

    gameSession.update((session) => {
        return {
            ...session,
            sceneOrder: [
                ...session.sceneOrder,
                {
                    sceneSessionId: uuidv4(),
                    sceneId,
                    startedAt: new Date(),
                    gameId: session.id,
                    endedAt: null,
                    elapsedTime: 0
                }
            ]
        };
    });
}

export function endLatestSceneInSession() {
    if (get(gameSession).sceneOrder.length === 0) return;
    gameSession.update((session) => {
        const lastScene = session.sceneOrder[session.sceneOrder.length - 1];
        const startedAt = lastScene.startedAt;
        if (!startedAt) return session;
        return {
            ...session,
            sceneOrder: [...session.sceneOrder.slice(0, -1), { ...lastScene, endedAt: new Date(), elapsedTime: new Date().getTime() - startedAt.getTime() }]
        };
    });
}

export function endGameSession() {
    gameSession.update((session) => {
        return { ...session, endedAt: new Date() };
    });
}

export function startGameSession() {
    gameSession.update((session) => {
        return { ...session, startedAt: new Date() };
    });
}