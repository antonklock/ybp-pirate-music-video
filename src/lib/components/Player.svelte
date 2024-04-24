<script lang="ts">
	import { onMount } from 'svelte';

	export let source =
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/94fa56d67526bb108a120cbb3de20de9/manifest/video.mpd';

	const urls = [
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/94fa56d67526bb108a120cbb3de20de9/manifest/video.mpd',
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/643b20d80310374034ab98fd48771b1c/manifest/video.mpd',
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/49a8983e44d3de06c7d53afa86c8337f/manifest/video.mpd',
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/543f408de99baf30ad0401671820d6a5/manifest/video.mpd'
	];

	onMount(async () => {
		// const instance = document.querySelector('media-player');
		// if (!instance) throw new Error('media-player not found');
		// let { sources } = instance.state;
		// console.log(sources);
		// for (let i = 0; i < urls.length; i++) {
		// 	instance.src = urls[i];
		// }
		// console.log(sources);
	});

	const playVideo = (index: number) => {
		const player00 = document.getElementById('player00');
		const player01 = document.getElementById('player01');
		const player02 = document.getElementById('player02');
		const player03 = document.getElementById('player03');
		if (index === 0) {
			if (player00) player00.style.display = 'block';
			if (player01) player01.style.display = 'none';
			if (player02) player02.style.display = 'none';
			if (player03) player03.style.display = 'none';
		} else if (index === 1) {
			if (player00) player00.style.display = 'none';
			if (player01) player01.style.display = 'block';
			if (player02) player02.style.display = 'none';
			if (player03) player03.style.display = 'none';
		} else if (index === 2) {
			if (player00) player00.style.display = 'none';
			if (player01) player01.style.display = 'none';
			if (player02) player02.style.display = 'block';
			if (player03) player03.style.display = 'none';
		} else if (index === 3) {
			if (player00) player00.style.display = 'none';
			if (player01) player01.style.display = 'none';
			if (player02) player02.style.display = 'none';
			if (player03) player03.style.display = 'block';
		}
	};
</script>

<div id={'player00'} style={'position: absolute'}>
	<media-player playsInline title="Sprite Fight" src={urls[0]}>
		<media-provider></media-provider>
		<media-video-layout thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
		></media-video-layout>
	</media-player>
</div>

<div id={'player01'} style={'position: absolute'}>
	<media-player playsInline title="Sprite Fight" src={urls[1]}>
		<media-provider></media-provider>
		<media-video-layout thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
		></media-video-layout>
	</media-player>
</div>

<div id={'player02'} style={'position: absolute'}>
	<media-player playsInline title="Sprite Fight" src={urls[2]}>
		<media-provider></media-provider>
		<media-video-layout thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
		></media-video-layout>
	</media-player>
</div>

<div id={'player03'} style={'position: absolute'}>
	<media-player playsInline title="Sprite Fight" src={urls[3]}>
		<media-provider></media-provider>
		<media-video-layout thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
		></media-video-layout>
	</media-player>
</div>

<div class="buttons">
	<button on:click={() => playVideo(0)}> Play 0</button>
	<button on:click={() => playVideo(1)}> Play 0</button>
	<button on:click={() => playVideo(2)}> Play 0</button>
	<button on:click={() => playVideo(3)}> Play 0</button>
</div>

<style>
	.buttons {
		display: flex;
		justify-content: center;
		gap: 10px;
		top: 500px;
		position: absolute;
		z-index: 100;
	}
</style>
