<script lang="ts">
	export let label = '';
	export let name = '';
	export let value = '';
	export let error = '';
	export let onChange: any;
    export let hideErrorText: boolean = false;
</script>

<label for="name">{label}</label>
<input on:change={onChange} id="name" {name} type="datetime-local" {value} />
{#if !hideErrorText}
	{#if error}
		<p class="error">{error}</p>
	{:else}
		<p>&nbsp</p>
	{/if}
{/if}

<style>
	input {
		width: 100%;
		padding: 10px;
		border: var(--border);
		border-radius: 5px;
		outline: none;
		font-size: 0.9rem;
		background-color: transparent;
	}
	input:focus {
		border: 1px solid var(--primary);
	}
	label {
		font-size: 0.84rem;
		font-weight: 600;
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
		color: var(--text-secondary);
	}
	.error {
		color: var(--error);
		font-size: 0.9rem;
		font-weight: 400;
		height: 30px;
		margin-top: 5px;
	}
</style>
