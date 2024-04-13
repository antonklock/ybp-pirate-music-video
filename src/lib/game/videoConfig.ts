// const bucket = 'pirate-videos-audio-sync';
// const bucket = 'pirate-videos-av1';
const bucket = 'pirate-videos-vp9';

export const videos: VideoObject[] = [
    {
        id: "0",
        bucket: bucket,
        sourceName: 'hub.mp4',
        name: 'Hub',
        nextVideos: [
            "lamp.mp4",
            "painting.mp4",
            "wheel.mp4"
        ],
        loop: true
    },
    {
        id: "1",
        bucket: bucket,
        sourceName: 'lamp.mp4',
        name: 'Lamp',
        nextVideos: [
            "hub.mp4"
        ],
        loop: true
    },
    {
        id: "2",
        bucket: bucket,
        sourceName: 'painting.mp4',
        name: 'Painting',
        nextVideos: [
            "hub.mp4"
        ],
        loop: true
    },
    {
        id: "3",
        bucket: bucket,
        sourceName: 'wheel.mp4',
        name: 'Wheel',
        nextVideos: [
            "hub.mp4"
        ],
        loop: true
    },
]