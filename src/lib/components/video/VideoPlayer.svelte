<script lang="ts">
	let videoPlayer: any;

	type PlayerProps = {
		id: string;
		url: string;
		hidden: boolean;
	};

	export let props: PlayerProps = {
		id: '',
		url: '',
		hidden: false
	};

	export const play = () => {
		videoPlayer.play();
	};

	export const pause = () => {
		videoPlayer.pause();
	};
</script>

<div class="playerContainer" id={props.id}>
	<media-player
		bind:this={videoPlayer}
		controls={false}
		class="media-player"
		loop
		playsInline
		title="Sprite Fight"
		src={props.url}
	>
		<media-provider></media-provider>
	</media-player>
</div>

<style lang="scss">
	.playerContainer {
		position: absolute;
		width: 80%;
        opacity: calc(var(--opacityValue)); 
        --opacityValue: { props.hidden ? 0.001 : 1};
	}
</style>
