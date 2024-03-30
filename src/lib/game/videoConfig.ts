export const videos: VideoObject[] = [
    {
        id: "0",
        bucket: 'pirate-videos-audio-sync',
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
        bucket: 'pirate-videos-audio-sync',
        sourceName: 'lamp.mp4',
        name: 'Lamp',
        nextVideos: [
            "hub.mp4"
        ],
        loop: true
    },
    {
        id: "2",
        bucket: 'pirate-videos-audio-sync',
        sourceName: 'painting.mp4',
        name: 'Painting',
        nextVideos: [
            "hub.mp4"
        ],
        loop: true
    },
    {
        id: "3",
        bucket: 'pirate-videos-audio-sync',
        sourceName: 'wheel.mp4',
        name: 'Wheel',
        nextVideos: [
            "hub.mp4"
        ],
        loop: true
    },
]