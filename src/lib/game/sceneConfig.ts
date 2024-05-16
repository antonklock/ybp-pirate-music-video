import { getSceneById } from '$lib/game/utils/scene_management/getSceneById';
import { setActiveScene } from './utils/scene_management/setActiveScene';

export const sceneObjects: SceneObject[] = [
	{
		id: "H0",
		url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/94fa56d67526bb108a120cbb3de20de9/manifest/video.mpd',
		name: 'hub',
		nextScenes: ['H1', 'H2', 'H3'],
		player: undefined,
		loop: true,
		isActive: false,
		canPlay: false,
		isLoaded: false,
		isCurrent: false,
		hitboxes: [{
			name: "HB-H1",
			color: 0x00ff00,
			x: 0.2,
			y: 0.2,
			width: 0.2,
			height: 0.2,
			onHit: () => {
				const scene = getSceneById("H1");
				if (scene) setActiveScene(scene);
			},
			isLoaded: false,
			isActive: false,
			activationInterfals: [{
				start: 0.5,
				end: 100
			}]
		},
		{
			name: "HB-H2",
			color: 0xff0000,
			x: 0.4,
			y: 0.4,
			width: 0.2,
			height: 0.2,
			onHit: () => {
				const scene = getSceneById("H2");
				if (scene) setActiveScene(scene);
			},
			isLoaded: false,
			isActive: false,
			activationInterfals: [{
				start: 2,
				end: 100
			}]
		},
		{
			name: "HB-H3",
			color: 0x0000ff,
			x: 0.6,
			y: 0.6,
			width: 0.2,
			height: 0.2,
			onHit: () => {
				const scene = getSceneById("H3");
				if (scene) setActiveScene(scene);
			},
			isLoaded: false,
			isActive: false,
			activationInterfals: [{
				start: 5,
				end: 15
			}]
		}]
	},
	{
		id: "H1",
		url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/643b20d80310374034ab98fd48771b1c/manifest/video.mpd',
		name: 'door',
		nextScenes: ["H0"],
		player: undefined,
		loop: true,
		isActive: false,
		canPlay: false,
		isLoaded: false,
		isCurrent: false,
		hitboxes: [{
			name: "HB-H0",
			color: 0xffff00,
			x: 0.5,
			y: 0.5,
			width: 0.2,
			height: 0.2,
			onHit: () => {
				const scene = getSceneById("H0");
				if (scene) setActiveScene(scene);
			},
			isLoaded: false,
			isActive: false,
			activationInterfals: [{
				start: 2,
				end: 6
			}]
		}]
	},
	{
		id: "H2",
		url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/49a8983e44d3de06c7d53afa86c8337f/manifest/video.mpd',
		name: 'broom',
		nextScenes: ["H0"],
		player: undefined,
		loop: false,
		isActive: false,
		canPlay: false,
		isLoaded: false,
		isCurrent: false,
		hitboxes: [{
			name: "HB-H0",
			color: 0xff00ff,
			x: 0.5,
			y: 0.5,
			width: 0.2,
			height: 0.2,
			onHit: () => {
				const scene = getSceneById("H0");
				if (scene) setActiveScene(scene);
			},
			isLoaded: false,
			isActive: false,
			activationInterfals: [{
				start: 4,
				end: 100
			}]
		}]
	},
	{
		id: "H3",
		url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/543f408de99baf30ad0401671820d6a5/manifest/video.mpd',
		name: 'drinkers',
		nextScenes: ["H0"],
		player: undefined,
		loop: false,
		isActive: false,
		canPlay: false,
		isLoaded: false,
		isCurrent: false,
		hitboxes: [{
			name: "HB-H0",
			color: 0x00ffff,
			x: 0.5,
			y: 0.5,
			width: 0.2,
			height: 0.2,
			onHit: () => {
				const scene = getSceneById("H0");
				if (scene) setActiveScene(scene);
			},
			isLoaded: false,
			isActive: false,
			activationInterfals: [{
				start: 2,
				end: 100
			}]
		}]
	}
];
