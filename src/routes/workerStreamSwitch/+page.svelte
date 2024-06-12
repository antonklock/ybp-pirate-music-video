<script lang="ts">
	import { onMount } from 'svelte';

	let videoElement: HTMLVideoElement;
	let player: any;
	let preloadPlayer: any;
	let dashjs: any;
	let currentStreamUrl: string =
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/abf023c6468cc5cedaaf896dd6cade2f/manifest/video.mpd';
	let nextStreamUrl: string =
		'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/51cb3c8b7aec89d2df5aa95981c2a7c0/manifest/video.mpd';
	let isPlaying = false;

	onMount(async () => {
		dashjs = await import('dashjs'); // Dynamically import dash.js

		if (videoElement) {
			player = dashjs.MediaPlayer().create();
			player.initialize(videoElement, currentStreamUrl, true);

			player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
				console.log('Stream initialized');
				isPlaying = true;
				preloadNextStream();
			});

			player.on(dashjs.MediaPlayer.events.PLAYBACK_PAUSED, () => {
				isPlaying = false;
			});

			player.on(dashjs.MediaPlayer.events.PLAYBACK_PLAYING, () => {
				isPlaying = true;
			});
		} else {
			alert('Video element not found.');
		}
	});

	function preloadNextStream() {
		const tempVideoElement = document.createElement('video');
		preloadPlayer = dashjs.MediaPlayer().create();
		preloadPlayer.initialize(tempVideoElement, nextStreamUrl, false);

		preloadPlayer.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
			console.log('Next stream preloaded');
		});
	}

	async function switchStream() {
		if (player && preloadPlayer) {
			const bufferLength = preloadPlayer
				.getDashMetrics()
				.getCurrentBufferLevel(preloadPlayer.getActiveStream().getMediaInfo().type);
			if (bufferLength > 5) {
				// Ensure there is enough buffer to switch
				const currentTime = videoElement.currentTime;

				player.attachSource(nextStreamUrl);
				player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
					player.seek(currentTime);
					videoElement.play().catch((error) => {
						console.error('Error attempting to play video:', error);
					});
					preloadPlayer.reset();
					preloadNextStream(); // Preload the next stream again if needed
				});
			} else {
				console.log('Not enough buffer to switch');
			}
		}
	}

	function playVideo() {
		videoElement.play().catch((error) => {
			console.error('Error attempting to play video:', error);
		});
	}
</script>

<div class="container">
	<!-- svelte-ignore a11y-media-has-caption -->
	<video bind:this={videoElement} controls autoplay></video>

	<button on:click={playVideo}>Play</button>
	<button on:click={switchStream}>Switch Stream</button>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	video {
		width: 100%;
		height: auto;
	}
	button {
		margin-top: 10px;
	}
</style>
