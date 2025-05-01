<script lang="ts">
	import DotDivider from './DotDivider.svelte';

	export let currency: string = 'Currency';
	export let value: number = 200;
</script>

<div style=" display: flex; align-items: center; gap: 5px; justify-content: center; ">
	<h3
		style="color: #555;
		font-weight: 500; font-size: 1.2rem;"
	>
		{currency}: <span> {value} </span>
	</h3>
</div>
