<script lang="ts">
	let videoPlayer: any;

	type PlayerProps = {
		id: string;
		url: string;
		isActive: boolean;
	};

	export let props: PlayerProps = {
		id: '',
		url: '',
		isActive: false
	};

	export let play = () => {
		videoPlayer.play();
	};

	export let pause = () => {
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
        --opacityValue: { props.isActive ? 1 : 0.001};
	}
</style>
