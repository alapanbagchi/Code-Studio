<script lang="ts">
	export let maskInput = false;
	export let inputType: string = maskInput ? 'password' : 'tel';
	export let value = '';
	export let componentIndex: string;
	export let placeholder = '';
	export let customInputClass = '';
	export let handleChange: (componentIndex: string, value: any) => void;
	export let dataAttr = '';
	export let error: string = '';

	let component: any;

	function onChange(e: Event & { currentTarget: EventTarget & HTMLInputElement }): void {
		value = (e.target as HTMLInputElement).value;
		if (handleChange) {
			handleChange(componentIndex, e);
		}
	}
	let fieldActive = false;
	let hovered = false;
	$: if(fieldActive){
		component.select();
	}
</script>

<svelte:window />

<div
	class="inputfield {fieldActive ? 'focused' : ''} {error ? 'inputerror' : ''} {hovered
		? 'hovered'
		: ''}"
>
	<input
		name="input"
		type={inputType}
		{placeholder}
		{value}
		on:focus={() => {
			return fieldActive = true;
		}}
		on:blur={() => {
			return fieldActive = false;
		}}
		on:mouseenter={() => {
			return (hovered = true);
		}}
		on:mouseleave={() => {
			return (hovered = false);
		}}
		on:input={onChange}
		maxlength={1}
		class={`${customInputClass} inputclass`}
		bind:this={component}
		data-testid={dataAttr}
		data-input={'elem'}
	/>
</div>

<style>
	.wrapper {
		width: 100%;
		text-align: center;
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

	.inputfield {
		display: flex;
		border: 1px solid var(--input_border);
		border-radius: 7px;
		width: 55px;
		height: 55px;
		align-items: center;
		justify-content: center;
		background-color: white;
		transition: all 0.2s ease-in-out;
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
	.focused.inputerror {
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
		text-align: center;
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
