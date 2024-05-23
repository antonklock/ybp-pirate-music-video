import { getSceneById } from '$lib/game/utils/scene_management/getSceneById';
import { setActiveScene } from './utils/scene_management/setActiveScene';

export const sceneObjects: SceneObject[] = [
	{
		id: "G0",
		url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/a1761369b368d0aa813050c5e9abedf5/manifest/video.mpd',
		name: 'Intro sovrum',
		nextScenes: ['H0'],
		player: undefined,
		loop: true,
		isActive: false,
		canPlay: false,
		isLoaded: false,
		isCurrent: false,
		hitboxes: [{
			name: "HB-H0",
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
		}]
	},
	{
		id: "H0",
		url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/abf023c6468cc5cedaaf896dd6cade2f/manifest/video.mpd',
		name: 'Hub',
		nextScenes: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
		player: undefined,
		loop: true,
		isActive: false,
		canPlay: false,
		isLoaded: false,
		isCurrent: false,
		hitboxes: [{
			name: "HB-H1",
			color: 0x5e4613,
			x: 0.2,
			y: 0.2,
			width: 0.1,
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
			color: 0x415e13,
			x: 0.4,
			y: 0.2,
			width: 0.1,
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
			color: 0x176644,
			x: 0.6,
			y: 0.2,
			width: 0.1,
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
		},
		{
			name: "HB-H4",
			color: 0x174866,
			x: 0.8,
			y: 0.2,
			width: 0.1,
			height: 0.2,
			onHit: () => {
				const scene = getSceneById("H4");
				if (scene) setActiveScene(scene);
			},
			isLoaded: false,
			isActive: false,
			activationInterfals: [{
				start: 5,
				end: 15
			}]
		},
		{
			name: "HB-H5",
			color: 0x251761,
			x: 0.2,
			y: 0.5,
			width: 0.1,
			height: 0.2,
			onHit: () => {
				const scene = getSceneById("H5");
				if (scene) setActiveScene(scene);
			},
			isLoaded: false,
			isActive: false,
			activationInterfals: [{
				start: 5,
				end: 15
			}]
		},
		{
			name: "HB-H6",
			color: 0x43104a,
			x: 0.4,
			y: 0.5,
			width: 0.1,
			height: 0.2,
			onHit: () => {
				const scene = getSceneById("H6");
				if (scene) setActiveScene(scene);
			},
			isLoaded: false,
			isActive: false,
			activationInterfals: [{
				start: 5,
				end: 15
			}]
		},
		]
	},
	{
		id: "H1",
		url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/51cb3c8b7aec89d2df5aa95981c2a7c0/manifest/video.mpd',
		name: 'Hederligt arbete',
		nextScenes: ["H1-A", "H1-B", "H1-C"],
		player: undefined,
		loop: true,
		isActive: false,
		canPlay: false,
		isLoaded: false,
		isCurrent: false,
		hitboxes: [
			{
				name: "HB-H1-A",
				color: 0x43104a,
				x: 0.2,
				y: 0.2,
				width: 0.1,
				height: 0.2,
				onHit: () => {
					const scene = getSceneById("H1-A");
					if (scene) setActiveScene(scene);
				},
				isLoaded: false,
				isActive: false,
				activationInterfals: [{
					start: 2,
					end: 6
				}]
			},
			{
				name: "HB-H1-B",
				color: 0x104a23,
				x: 0.4,
				y: 0.2,
				width: 0.1,
				height: 0.2,
				onHit: () => {
					const scene = getSceneById("H1-B");
					if (scene) setActiveScene(scene);
				},
				isLoaded: false,
				isActive: false,
				activationInterfals: [{
					start: 2,
					end: 6
				}]
			},
			{
				name: "HB-H1-C",
				color: 0x0d124a,
				x: 0.6,
				y: 0.2,
				width: 0.1,
				height: 0.2,
				onHit: () => {
					const scene = getSceneById("H1-C");
					if (scene) setActiveScene(scene);
				},
				isLoaded: false,
				isActive: false,
				activationInterfals: [{
					start: 2,
					end: 6
				}]
			},
		]
	},
	{
		id: "H1-A",
		url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/36597fa6c0bf1a5820b712e1e832cf8f/manifest/video.mpd',
		name: 'Skura golvet',
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
		id: "H1-B",
		url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/30cbfd2e855a15fc730e5b47553dc726/manifest/video.mpd',
		name: 'Shotta',
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
	},
	{
		id: "H1-C",
		url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/862fd9f600910ac44835de3033d851b4/manifest/video.mpd',
		name: 'Tvätta bandet',
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
	},
	{
		id: "H2",
		url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/1e1c05dbe7ceedbf4f7d4f5931f76145/manifest/video.mpd',
		name: 'Spela tärning',
		nextScenes: ["H2-A", "H2-B"],
		player: undefined,
		loop: false,
		isActive: false,
		canPlay: false,
		isLoaded: false,
		isCurrent: false,
		hitboxes: [
			{
				name: "HB-H2-A",
				color: 0xeb4034,
				x: 0.2,
				y: 0.5,
				width: 0.2,
				height: 0.2,
				onHit: () => {
					const scene = getSceneById("H2-A");
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
				name: "HB-H2-B",
				color: 0x4287f5,
				x: 0.5,
				y: 0.5,
				width: 0.2,
				height: 0.2,
				onHit: () => {
					const scene = getSceneById("H2-B");
					if (scene) setActiveScene(scene);
				},
				isLoaded: false,
				isActive: false,
				activationInterfals: [{
					start: 2,
					end: 100
				}]
			}
		]
	},
	{
		// TODO: Fix functionality to play dice game
		id: "H2-A",
		url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/7665a8b3eaa5d596946bcd6927b0241d/manifest/video.mpd',
		name: 'Spela tärning',
		nextScenes: ["H0"],
		player: undefined,
		loop: false,
		isActive: false,
		canPlay: false,
		isLoaded: false,
		isCurrent: false,
		hitboxes: [
			{
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
			}
		]
	},
	{
		id: "H2-B",
		url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/71d83ef9c9cee94946ff3ca862559e8e/manifest/video.mpd',
		name: 'Välter ljus',
		nextScenes: ["H2-B-1", "H2-B-2"],
		player: undefined,
		loop: false,
		isActive: false,
		canPlay: false,
		isLoaded: false,
		isCurrent: false,
		hitboxes: [
			{
				name: "HB-H2-B-1",
				color: 0x466918,
				x: 0.2,
				y: 0.5,
				width: 0.2,
				height: 0.2,
				onHit: () => {
					const scene = getSceneById("H2-B-1");
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
				name: "HB-H2-B-2",
				color: 0x69181b,
				x: 0.6,
				y: 0.5,
				width: 0.2,
				height: 0.2,
				onHit: () => {
					const scene = getSceneById("H2-B-2");
					if (scene) setActiveScene(scene);
				},
				isLoaded: false,
				isActive: false,
				activationInterfals: [{
					start: 2,
					end: 100
				}]
			}
		]
	},
	{
		id: "H2-B-1",
		url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/23a7a44d0b80ba678a6ac03759a43a8c/manifest/video.mpd',
		name: 'Ta ett mynt',
		nextScenes: ["H0"],
		player: undefined,
		loop: false,
		isActive: false,
		canPlay: false,
		isLoaded: false,
		isCurrent: false,
		hitboxes: [
			{
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
			}
		]
	},
	{
		// TODO: Fix timed activation of hitboxes
		id: "H2-B-2",
		url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/4d3e1cd5a89d1cc67b3acc96bb69a9c1/manifest/video.mpd',
		name: 'Spring mot dörren',
		nextScenes: ["H2-B-2-A", "H2-B-2-B"],
		player: undefined,
		loop: false,
		isActive: false,
		canPlay: false,
		isLoaded: false,
		isCurrent: false,
		hitboxes: [
			{
				name: "HB-H2-B-2-A",
				color: 0x4287f5,
				x: 0.2,
				y: 0.5,
				width: 0.2,
				height: 0.2,
				onHit: () => {
					const scene = getSceneById("H2-B-2-A");
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
				name: "HB-H2-B-2-B",
				color: 0x3c731f,
				x: 0.6,
				y: 0.5,
				width: 0.2,
				height: 0.2,
				onHit: () => {
					const scene = getSceneById("H2-B-2-B");
					if (scene) setActiveScene(scene);
				},
				isLoaded: false,
				isActive: false,
				activationInterfals: [{
					start: 2,
					end: 100
				}]
			}
		]
	},
	{
		id: "H2-B-2-A",
		url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/254f451ec392f08be277a883347d61c5/manifest/video.mpd',
		name: 'Värdshusvärden säger STOPP!',
		nextScenes: ["H0"],
		player: undefined,
		loop: false,
		isActive: false,
		canPlay: false,
		isLoaded: false,
		isCurrent: false,
		hitboxes: [
			{
				name: "HB-H0",
				color: 0x4287f5,
				x: 0.2,
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
			}
		]
	},
	{
		id: "H2-B-2-B",
		url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/a9dfcc1329fa0a8ffb98f3c0dbf5fae8/manifest/video.mpd',
		name: 'Hinner ut ur dörren',
		nextScenes: ["H0"],
		player: undefined,
		loop: false,
		isActive: false,
		canPlay: false,
		isLoaded: false,
		isCurrent: false,
		hitboxes: [
			{
				name: "HB-H0",
				color: 0x70215e,
				x: 0.6,
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
			}
		]
	},
	{
		id: "H3",
		url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/626070ae0b2893d10b59d4f0741c07eb/manifest/video.mpd',
		name: 'Armbrytning',
		nextScenes: ["H3-A", "H3-B"],
		player: undefined,
		loop: false,
		isActive: false,
		canPlay: false,
		isLoaded: false,
		isCurrent: false,
		hitboxes: [
			{
				name: "HB-H3-A",
				color: 0x70215e,
				x: 0.2,
				y: 0.2,
				width: 0.1,
				height: 0.2,
				onHit: () => {
					const scene = getSceneById("H3-A");
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
				name: "HB-H3-B",
				color: 0x70215e,
				x: 0.4,
				y: 0.2,
				width: 0.1,
				height: 0.2,
				onHit: () => {
					const scene = getSceneById("H3-B");
					if (scene) setActiveScene(scene);
				},
				isLoaded: false,
				isActive: false,
				activationInterfals: [{
					start: 2,
					end: 100
				}]
			}
		]
	},
	{
		id: "H3-A",
		url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/dbd58ed46e4d5dd9f22ce09b5dde0dd3/manifest/video.mpd',
		name: 'Klicka snabbt för att bryta arm',
		nextScenes: ["H3-A-WIN", "H3-A-LOSS"],
		player: undefined,
		loop: false,
		isActive: false,
		canPlay: false,
		isLoaded: false,
		isCurrent: false,
		hitboxes: [
			{
				name: "HB-H3-A-WIN",
				color: 0x70215e,
				x: 0.2,
				y: 0.2,
				width: 0.1,
				height: 0.2,
				onHit: () => {
					const scene = getSceneById("H3-A-WIN");
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
				name: "HB-H3-A-LOSS",
				color: 0x70215e,
				x: 0.4,
				y: 0.2,
				width: 0.1,
				height: 0.2,
				onHit: () => {
					const scene = getSceneById("H3-A-LOSS");
					if (scene) setActiveScene(scene);
				},
				isLoaded: false,
				isActive: false,
				activationInterfals: [{
					start: 2,
					end: 100
				}]
			}
		]
	},
	{
		id: "H3-A-WIN",
		url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/c3f5830f8398a2c2218278b0a47b0ab8/manifest/video.mpd',
		name: 'Vinna ger ingen effekt',
		nextScenes: ["H0"],
		player: undefined,
		loop: false,
		isActive: false,
		canPlay: false,
		isLoaded: false,
		isCurrent: false,
		hitboxes: [
			{
				name: "HB-H0",
				color: 0x70215e,
				x: 0.2,
				y: 0.2,
				width: 0.1,
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
			}
		]
	},
	{
		id: "H3-A-LOSS",
		url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/4ef50684bc0cc5e12498ebd29f593caf/manifest/video.mpd',
		name: 'Ramlar och hittar ett mynt',
		nextScenes: ["H0"],
		player: undefined,
		loop: false,
		isActive: false,
		canPlay: false,
		isLoaded: false,
		isCurrent: false,
		hitboxes: [
			{
				name: "HB-H0",
				color: 0x70215e,
				x: 0.2,
				y: 0.2,
				width: 0.1,
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
			}
		]
	},
	{
		id: "H3-B",
		url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/db8497398d929262ea657cc711030905/manifest/video.mpd',
		name: 'Spelaren förlorar',
		nextScenes: ["F1"],
		player: undefined,
		loop: false,
		isActive: false,
		canPlay: false,
		isLoaded: false,
		isCurrent: false,
		hitboxes: [
			{
				name: "HB-F1",
				color: 0x70215e,
				x: 0.2,
				y: 0.2,
				width: 0.1,
				height: 0.2,
				onHit: () => {
					const scene = getSceneById("F1");
					if (scene) setActiveScene(scene);
				},
				isLoaded: false,
				isActive: false,
				activationInterfals: [{
					start: 2,
					end: 100
				}]
			}
		]
	}
];
