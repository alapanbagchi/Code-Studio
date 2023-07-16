<script lang="ts">
	import type { InputConstraint } from 'sveltekit-superforms/index';

	export let name: string = 'name';
	export let type: string = 'text';
	export let placeholder: string = 'Placeholder Text';
	export let error: string = '';
	export let required: boolean = false;
	export let value: string;
	export let label: string = '';
	export let maxlength: number = -1;
	export let hideErrorText: boolean = false;
	export let onFocus: (e: Event) => void = () => {};
	export let onChange: (e: Event) => void = () => {};
	export let onBlur: (e: Event) => void = () => {};
	export let constraints: InputConstraint | undefined = undefined;
	export let disabled: boolean = false;
	let touched: boolean = false;

	const errorValidateAction = (e: any) => {
		if (e.target.value != '') touched = true;
		if (touched) onChange;
	};

	let fieldActive = false;
	let hovered = false;
</script>

<div class="wrapper">
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
	<div
		class="inputfield {fieldActive ? 'focused' : ''} {error ? 'inputerror' : ''} {hovered
			? 'hovered'
			: ''}"
	>
		<textarea
			{name}
			on:focus={() => {
				fieldActive = true;
				return onFocus;
			}}
			on:blur={() => {
				fieldActive = false;
				onBlur;
			}}
			on:mouseenter={() => {
				return (hovered = true);
			}}
			on:mouseleave={() => {
				return (hovered = false);
			}}
			bind:value
			on:change={onChange}
			{...constraints}
			{...$$restProps}
			{disabled}
			{maxlength}
			autocomplete="off"
			{placeholder}
		/>
	</div>
	{#if !hideErrorText}
		{#if error}
			<p class="error">{error}</p>
		{:else}
			<p>&nbsp</p>
		{/if}
	{/if}
</div>

<style>
	.wrapper {
		width: 100%;
	}
	.required {
		color: var(--error);
	}
	.label {
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
	.inputerror textarea {
		color: var(--error);
	}
	.inputerror:hover {
		border: 1px solid var(--error);
	}
	.focused.inputerror {
		border: 1px solid var(--input-error);
	}
	textarea {
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
</style>
