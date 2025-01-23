<script lang="ts">
	import { onMount } from 'svelte';
	let isVisible = false;

	onMount(() => {
		isVisible = true;
	});
</script>

<div class="flex justify-center items-center h-screen w-screen">
	<div
		class="min-h-screen bg-black text-white p-8 transition-opacity duration-1000"
		class:opacity-0={!isVisible}
		class:opacity-100={isVisible}
	>
		<div class="max-w-2xl mx-auto space-y-12">
			<h1 class="text-4xl font-bold text-center mb-12">Credits</h1>

			<section class="space-y-4">
				<h2 class="text-2xl font-semibold">Development Team</h2>
				<p>
					Created by <a
						href="https://www.yebanishedprivateers.com/"
						class="text-blue-400 hover:text-blue-300">Ye Banished Privateers</a
					>, Kenneth Ly and
					<a href="https://www.klockworks.se" class="text-blue-400 hover:text-blue-300"
						>Anton Klock</a
					>.
				</p>
			</section>

			<section class="space-y-4">
				<h2 class="text-2xl font-semibold">Technologies Used</h2>
				<ul class="list-disc list-inside space-y-2">
					<li>SvelteKit</li>
					<li>PixiJS for video rendering</li>
					<li>Mux and Cloudflare for video streaming</li>
				</ul>
			</section>

			<section class="space-y-4">
				<h2 class="text-2xl font-semibold">Special Thanks</h2>
				<p>To everyone who contributed to making this interactive experience possible.</p>
			</section>

			<footer class="text-center text-sm text-gray-400 mt-16">
				<p>© 2025 All Rights Reserved</p>
			</footer>
		</div>
	</div>
</div>
