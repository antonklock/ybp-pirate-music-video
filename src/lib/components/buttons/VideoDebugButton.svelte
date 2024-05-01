<script lang="ts">
	export let title: string = 'Video Debug Button';
	export let play: () => void = () => {
		console.log('play from debug button: ' + title);
	};
</script>

<div class="videoDebugButton">
	<button on:click={play}>{title}</button>
</div>
