export const sceneObjects: SceneObject[] = [
	{
		id: 0,
		url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/94fa56d67526bb108a120cbb3de20de9/manifest/video.mpd',
		name: 'hub',
		nextScenes: ['broom', 'door', 'drinkers'],
		loop: true,
		isActive: false,
	},
	{
		id: 1,
		url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/643b20d80310374034ab98fd48771b1c/manifest/video.mpd',
		name: 'door',
		nextScenes: ['hub'],
		loop: false,
		isActive: false,
	},
	{
		id: 2,
		url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/49a8983e44d3de06c7d53afa86c8337f/manifest/video.mpd',
		name: 'broom',
		nextScenes: ['hub'],
		loop: false,
		isActive: false
	},
	{
		id: 3,
		url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/543f408de99baf30ad0401671820d6a5/manifest/video.mpd',
		name: 'drinkers',
		nextScenes: ['hub'],
		loop: false,
		isActive: false
	}
];
