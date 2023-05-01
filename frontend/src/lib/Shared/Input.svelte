<script lang="ts">
	export let name: string = 'name';
	export let type: string = 'text';
	export let placeholder: string = 'Placeholder Text';
	export let error: string = '';
	export let required: boolean = false;
	export let value: any;
	export let label: string = '';
	export let maxlength: number = -1;
	export let hideErrorText: boolean = false;
	export let onFocus: (e: Event) => void = () => {};
	export let onChange: (e: Event) => void = () => {};
	export let onBlur: (e: Event) => void = () => {};
	export let disabled: boolean = false;
	let touched: boolean = false;
	function typeAction(node: { type: string }) {
		node.type = type;
	}

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
		<input
			{name}
			use:typeAction
			on:focus={() => {
				fieldActive = true;
				return onFocus;
			}}
			on:blur={() => {
				fieldActive = false;
				onBlur;
				return errorValidateAction;
			}}
			on:mouseenter={() => {
				return (hovered = true);
			}}
			on:mouseleave={() => {
				return (hovered = false);
			}}
			on:change={onChange}
			on:input={touched || error ? onChange : undefined}
			bind:value
			{disabled}
			{maxlength}
			autocomplete="off"
			type="text"
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
	}
	.label span:not(.required) {
		color: var(--text_secondary);
	}
	.inputfield {
		display: flex;
		padding: 10px 16px;
		border: 1px solid var(--input_border);
		border-radius: 7px;
		align-items: center;
		justify-content: center;
		background-color: white;
		transition: all 0.2s ease-in-out;
	}
	.inputerror {
		border: 1px solid var(--error);
	}
    .inputerror input{
        color: var(--error);
    }
    .inputerror:hover{
        border: 1px solid var(--error);
    }
    .focused.inputerror{
        border: 1px solid var(--input_error);
        box-shadow: var(--input_error_boxShadow);
    }
	input {
		flex: 1;
		border: none;
		outline: none;
		font-size: 0.9rem;
		background-color: transparent;
		width: 100%;
	}
	.hovered {
		border: 1px solid var(--input_hover_border);
	}
	.focused {
		border: 1px solid var(--input_focused);
		box-shadow: var(--input_focused_boxShadow);
	}
	.error {
		color: var(--error);
		font-size: 0.9rem;
		font-weight: 400;
		height: 30px;
		margin-top: 5px;
	}
</style>
