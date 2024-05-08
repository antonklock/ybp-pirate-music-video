export const createVideoTexture = (video: HTMLVideoElement) => {
    const texture = PIXI.Texture.from(video);
    return texture;
}