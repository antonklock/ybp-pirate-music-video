<script lang="ts">
	import { onMount } from 'svelte';

	const urls = [
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/94fa56d67526bb108a120cbb3de20de9/manifest/video.mpd',
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/643b20d80310374034ab98fd48771b1c/manifest/video.mpd',
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/49a8983e44d3de06c7d53afa86c8337f/manifest/video.mpd',
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/543f408de99baf30ad0401671820d6a5/manifest/video.mpd'
	];

	onMount(async () => {});

	const playVideo = (index: number) => {
		const player00 = document.getElementById('player00');
		const player01 = document.getElementById('player01');
		const player02 = document.getElementById('player02');
		const player03 = document.getElementById('player03');

		if (index === 0) {
			if (player00) {
				//@ts-ignore
				player00.getElementsByClassName('media-player')[0].play();
				player00.style.opacity = '1';
			}
			if (player01) player01.style.opacity = '0.001';
			if (player02) player02.style.opacity = '0.001';
			if (player03) player03.style.opacity = '0.001';
		} else if (index === 1) {
			if (player00) player00.style.opacity = '0.001';
			if (player01) {
				//@ts-ignore
				player01.getElementsByClassName('media-player')[0].play();
				player01.style.opacity = '1';
			}
			if (player02) player02.style.opacity = '0.001';
			if (player03) player03.style.opacity = '0.001';
		} else if (index === 2) {
			if (player00) player00.style.opacity = '0.001';
			if (player01) player01.style.opacity = '0.001';
			if (player02) {
				//@ts-ignore
				player02.getElementsByClassName('media-player')[0].play();
				player02.style.opacity = '1';
			}
			if (player03) player03.style.opacity = '0.001';
		} else if (index === 3) {
			if (player00) player00.style.opacity = '0.001';
			if (player01) player01.style.opacity = '0.001';
			if (player02) player02.style.opacity = '0.001';
			if (player03) {
				//@ts-ignore
				player03.getElementsByClassName('media-player')[0].play();
				player03.style.opacity = '1';
			}
		}
	};
</script>

<div class="videoPlayers">
	<div class="playerContainer" id={'player00'}>
		<media-player
			controls={false}
			class="media-player"
			loop
			playsInline
			title="Sprite Fight"
			src={urls[0]}
		>
			<media-provider></media-provider>
		</media-player>
	</div>

	<div class="playerContainer" id={'player01'}>
		<media-player
			controls={false}
			class="media-player"
			loop
			playsInline
			title="Sprite Fight"
			src={urls[1]}
		>
			<media-provider></media-provider>
		</media-player>
	</div>

	<div class="playerContainer" id={'player02'}>
		<media-player
			controls={false}
			class="media-player"
			loop
			playsInline
			title="Sprite Fight"
			src={urls[2]}
		>
			<media-provider></media-provider>
		</media-player>
	</div>

	<div class="playerContainer" id={'player03'}>
		<media-player
			controls={false}
			class="media-player"
			loop
			playsInline
			title="Sprite Fight"
			src={urls[3]}
		>
			<media-provider></media-provider>
		</media-player>
	</div>
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

	.playerContainer {
		position: absolute;
		width: 80%;
	}
</style>
