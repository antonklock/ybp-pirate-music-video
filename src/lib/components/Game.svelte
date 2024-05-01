<script lang="ts">
	import { SvelteComponent, onMount } from 'svelte';
	import VideoPlayer from './video/VideoPlayer.svelte';
	import { scenes } from '$lib/stores/gameStore';

	const urls = [
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/94fa56d67526bb108a120cbb3de20de9/manifest/video.mpd',
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/643b20d80310374034ab98fd48771b1c/manifest/video.mpd',
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/49a8983e44d3de06c7d53afa86c8337f/manifest/video.mpd',
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/543f408de99baf30ad0401671820d6a5/manifest/video.mpd'
	];

	onMount(async () => {});

	type Player = {
		component: SvelteComponent | undefined;
		props: {
			id: string;
			url: string;
			hidden: boolean;
		};
		play: (() => void) | undefined;
		pause: (() => void) | undefined;
	};

	let player00: Player = {
		component: undefined,
		props: {
			id: 'player00',
			url: urls[0],
			hidden: false
		},
		play: undefined,
		pause: undefined
	};
	let player01: Player = {
		component: undefined,
		props: {
			id: 'player01',
			url: urls[1],
			hidden: false
		},
		play: undefined,
		pause: undefined
	};
	let player02: Player = {
		component: undefined,
		props: {
			id: 'player02',
			url: urls[2],
			hidden: false
		},
		play: undefined,
		pause: undefined
	};
	let player03: Player = {
		component: undefined,
		props: {
			id: 'player03',
			url: urls[3],
			hidden: false
		},
		play: undefined,
		pause: undefined
	};

	const playVideo = (index: number) => {
		if (!player00 || !player01 || !player02 || !player03)
			return console.error('One or more players are missing');

		switch (index) {
			case 0:
				hideAndPauseVideo(player01);
				hideAndPauseVideo(player02);
				hideAndPauseVideo(player03);

				showAndPlayVideo(player00);
				break;
			case 1:
				hideAndPauseVideo(player00);
				hideAndPauseVideo(player02);
				hideAndPauseVideo(player03);

				removeElement(player02);
				removeElement(player03);

				showAndPlayVideo(player01);
				break;
			case 2:
				hideAndPauseVideo(player00);
				hideAndPauseVideo(player01);
				hideAndPauseVideo(player03);

				removeElement(player01);
				removeElement(player03);

				showAndPlayVideo(player02);
				break;
			case 3:
				hideAndPauseVideo(player00);
				hideAndPauseVideo(player01);
				hideAndPauseVideo(player02);

				removeElement(player01);
				removeElement(player02);

				showAndPlayVideo(player03);
				break;
		}
	};

	const hideAndPauseVideo = (videoPlayer: Player) => {
		if (videoPlayer) {
			console.log('Hiding and pausing video: ' + videoPlayer.props.id);
			// let { hidden } = videoPlayer.props;
			// // hidden = true;
			videoPlayer.props.hidden = true;

			// videoPlayer.component.$set({ hidden: true });

			if (videoPlayer.pause) videoPlayer.pause();
		}
	};

	const showAndPlayVideo = (videoPlayer: Player) => {
		if (videoPlayer) {
			console.log('Showing and playing video: ' + videoPlayer.props.id);
			let { hidden } = videoPlayer.props;
			hidden = false;

			if (videoPlayer.play) videoPlayer.play();
		}
	};

	const removeElement = (videoPlayer: Player) => {
		if (videoPlayer) {
			if (videoPlayer.component) videoPlayer.component.$destroy();
		}
	};
</script>

<div class="videoPlayers">
	<VideoPlayer
		bind:this={player00.component}
		bind:play={player00.play}
		bind:pause={player00.pause}
		props={player00.props}
	/>
	<VideoPlayer
		bind:this={player01.component}
		bind:play={player01.play}
		bind:pause={player01.pause}
		props={player01.props}
	/>
	<VideoPlayer
		bind:this={player02.component}
		bind:play={player02.play}
		bind:pause={player02.pause}
		props={player02.props}
	/>
	<VideoPlayer
		bind:this={player03.component}
		bind:play={player03.play}
		bind:pause={player03.pause}
		props={player03.props}
	/>
</div>

<div class="buttons">
	<button on:click={() => playVideo(0)}> Play 0</button>
	<button on:click={() => playVideo(1)}> Play 1</button>
	<button on:click={() => playVideo(2)}> Play 2</button>
	<button on:click={() => playVideo(3)}> Play 3</button>
</div>

<style>
	.buttons {
		display: flex;
		justify-content: center;
		width: 99vw;
		gap: 10px;
		bottom: 20px;
		position: absolute;
		z-index: 100;
	}

	.videoPlayers {
		position: relative;
		display: flex;
		justify-content: center;
	}
</style>
