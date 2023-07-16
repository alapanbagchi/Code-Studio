<script lang="ts">
	export let text: string = '';
	export let value: boolean = false;
	export let error: boolean = false;
	export let name: string = '';
	export let onChange: (e: Event) => void = () => {};
</script>

<div>
	<label for={name}>
		<input id={name} on:change={onChange} bind:checked={value} {name} type="checkbox" />
		{@html text}
	</label>
</div>

<style>
	div {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	label{
		display: flex;
		align-items: center;
		gap: 10px;
		cursor: pointer;
		font-size: 14px;
	}
	input {
		width: 20px;
		height: 20px;
		background-color: var(--surface); /* set background color to black */
		border: var(--border); /* set border to none */
		border-radius: 7px;
		appearance: none; /* remove default styling */
		border-radius: 3px; /* add rounded corners */
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}
	
	input:checked::before {
		content: '\2713'; /* add checkmark symbol */
		color: var(--text-primary); /* set color to white */
		font-size: 14px;
		height: 100%;
		text-align: center;
		line-height: 16px;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	input:checked {
		border: 1px solid var(--primary);
		background-color: var(--primary);
		transition: all 0.2s ease-in-out;
	}
</style>
