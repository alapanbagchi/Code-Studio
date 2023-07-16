<script lang="ts">
	import { clickOutside } from "../../utils/clickOutside";

	export let placeholder = 'Enter your tags';
	export let name: string;
	export let label = 'Tags';
	export let value: string[] = [];
	export let required = false;
	export let error: string;
	export let min = 0;
	export let max = 100;
	export let updateField: any;
	export let validateField: any;
	export let options: string[] = [];
	let focused = false;
	let showDropdown = false;
	let selected: any = value;
	let search = '';

	let filteredOptions = options;
	$: filteredOptions = options.filter((option: string) =>
		option.toLowerCase().includes(search.toLowerCase())
	);
	const action = (option: string) => {
		if (!filteredOptions.includes(option)) return;
		if (selected.includes(option)) {
			selected = selected.filter((item: string) => item !== option);
		} else {
			selected = [...selected, option];
		}
		updateField(name, selected);
		validateField(name);
	};

	$: console.log(error);
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			e.stopPropagation();
			action(search);
			return false;
		} else if (e.key === 'Backspace' && search.length === 0 && selected.length > 0) {
			action(selected[selected.length - 1]);
		}
	}}
/>

<div class="wrapper" use:clickOutside on:click_outside={()=>showDropdown=false}>
	{#if label}
		<div class="label">
			<label for={name}
				>{label}
				{#if required}
					<span class="required">*</span>
				{/if}
			</label>
		</div>
	{/if}
	<div class="inputfield {focused ? 'focused' : ''} {error != '' ? 'inputerror' : ''} ">
		{#if selected.length > 0}
			<div class="selected">
				{#each selected as tag}
					<span class="tag">{tag}</span>
				{/each}
			</div>
		{/if}
		<input
			bind:value={search}
			autocomplete="off"
			on:focus={() => {
				showDropdown = true;
				return (focused = true);
			}}
			on:blur={() => {
				return (focused = false);
			}}
			{name}
			type="text"
			{placeholder}
		/>
	</div>
	{#if showDropdown}
		<ul class="dropdown">
			{#each filteredOptions as option}
				<li class="option" on:click={() => action(option)} on:keydown={() => action(option)}>
					{option}
				</li>
			{/each}
		</ul>
	{/if}
	{#if error}
		<p class="error">{error}</p>
	{:else}
		<p>&nbsp</p>
	{/if}
</div>

<style>
	.wrapper {
		width: 100%;
		position: relative;
	}
	.required {
		color: var(--error);
	}
	label {
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
	.inputfield {
		display: flex;
		padding: 10px 16px;
		border: var(--input-border);
		border-radius: 7px;
		align-items: center;
		justify-content: center;
		background-color: transparent;
		transition: all 0.2s ease-in-out;
		background: var(--input-background);
	}
	.inputerror {
		border: 1px solid var(--error);
	}
	.inputerror input {
		color: var(--error);
	}
	.inputerror:hover {
		border: 1px solid var(--error);
	}
	.selected {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 5px;
		font-size: 14px;
		padding-right: 10px;
	}
	.tag {
		padding: 5px 10px;
		border-radius: 7px;
		background-color: var(--onSurface);
		color: var(--onPrimary);
	}
	.focused.inputerror {
		border: 1px solid var(--input-error);
	}
	input {
		flex: 1;
		border: none;
		outline: none;
		font-size: 0.9rem;
		background-color: transparent;
		width: 100%;
		color: var(--text-primary);
	}
	.hovered {
		border: 2px solid var(--primary);
	}
	.focused {
		border: 2px solid var(--primary);
	}
	.error {
		color: var(--error);
		font-size: 0.9rem;
		font-weight: 400;
		height: 30px;
		margin-top: 5px;
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
		font-size: 0.9rem;
	}
	.option:hover {
		background-color: var(--onSurface);
	}
</style>
