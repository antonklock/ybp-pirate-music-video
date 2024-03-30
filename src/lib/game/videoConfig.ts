export const videos: VideoObject[] = [
    {
        id: "1",
        bucket: 'pirate-videos',
        name: 'hub.mp4',
        nextVideos: [
            "lamp.mp4",
            "painting.mp4",
            "wheel.mp4"
        ]
    },
    {
        id: "2",
        bucket: 'pirate-videos',
        name: 'lamp.mp4',
        nextVideos: [
            "hub.mp4"
        ]
    },
    {
        id: "3",
        bucket: 'pirate-videos',
        name: 'painting.mp4',
        nextVideos: [
            "hub.mp4"
        ]
    },
    {
        id: "4",
        bucket: 'pirate-videos',
        name: 'wheel.mp4',
        nextVideos: [
            "hub.mp4"
        ]
    },
]