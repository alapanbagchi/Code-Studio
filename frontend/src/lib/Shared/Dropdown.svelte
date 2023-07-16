<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { clickOutside } from '../../utils/clickOutside';
	const dispatch = createEventDispatcher();
	export let options: { name: string; value: string }[];
	export let name: string = '';
	export let updateField: any;
	export let validateField: any;
	export let value: any = options[0];
	let current: {name: string, value: string} = value;
	let showDropdown = false;
	let maxWidth = 0;
	$: console.log(current);
	export let label: string = '';
	export let required: boolean = false;
	const handleClick = (option: { name: string; value: string }) => {
		current = option;
		updateField(name, option.value);
		validateField(name);
	};
	options.forEach((option: any) => {
		const width = option.name.length * 8;
		if (width > maxWidth) {
			maxWidth = width;
		}
	});
</script>

<div
	on:click={() => (options.length > 1 ? (showDropdown = !showDropdown) : undefined)}
	on:keydown={() => (options.length > 1 ? (showDropdown = !showDropdown) : undefined)}
	class="container {options.length > 1 ? '' : 'disabled'}"
	style:min-width={options.length > 1 ? maxWidth + 50 + 'px' : 'unset'}
	use:clickOutside on:click_outside={()=>showDropdown=false}
>
	{#if label}
		<div class="label">
			{label}
			{#if required}
				<span class="required">*</span>
			{/if}
		</div>
	{/if}
	<div class="current">
		<p>{current.name}</p>
		{#if options.length > 1}
			<span class="material-symbols-rounded dropdown_icon {showDropdown ? 'reverse' : ''}"> expand_more </span>
		{/if}
	</div>
	{#if showDropdown}
		<div class="dropdown">
			{#each options as option}
				<p
					on:click={() => handleClick(option)}
					on:keydown={() => handleClick(option)}
					class="option"
				>
					{option.name}
				</p>
			{/each}
		</div>
	{/if}
</div>

<style>
	.container {
		width: 100%;
		height: fit-content;
		font-size: 0.9rem;
		position: relative;
		color: var(--text-secondary);
	}
	.disabled {
		opacity: 0.8;
		cursor: not-allowed;
	}
	.reverse{
		transform: rotate(180deg);
	}
	.current {
		cursor: pointer;
		padding: 10px 16px;
		border-radius: 7px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: var(--input-border);
		background-color: var(--input-background);
	}
	.dropdown_icon {
		font-size: 1.2rem;
		transform: rotate(0deg);
		transition: transform 0.2s ease-in-out;
	}
	.dropdown {
		padding: 10px;
		border: 1px solid var(--input-border);
		border-radius: 7px;
		margin-top: 10px;
		position: absolute;
		z-index: 9999;
		background-color: var(--surface);
		border: var(--border);
		width: 100%;
	}
	.option {
		padding: 10px 16px;
		border-radius: 7px;
		cursor: pointer;
	}
	.option:hover {
		background-color: var(--onSurface);
	}
	.label {
		width: fit-content;
		gap: 3px;
		font-size: 0.84rem;
		font-weight: 600;
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
		color: var(--text-secondary);
	}
	.label span:not(.required) {
		color: var(--text-secondary);
	}
	.required {
		color: var(--error);
	}
</style>
