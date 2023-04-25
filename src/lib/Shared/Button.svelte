<script lang="ts">
	interface Props {
		type: "primary" | "secondary" | "icon";
		disabled?: boolean;
	}
	interface ButtonProps extends HTMLButtonElement {}
	// Declare the component props
	export let type: "primary" | "secondary" | "icon" = "primary";
	export let disabled: boolean = false;
</script>

<button {disabled} class='{type}'>
	<slot />
</button>

<style>
	button {
		height: 36px;
		line-height: 24px;
		padding: 0 16px;
		font-size: 14px;
		border: none;
		outline: none;
		border-radius: 5px;
		transition: all 0.3s ease;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.primary {
		background-color: var(--button_primary);
		color: var(--button_primary_text);
		border: 1px solid var(--button_primary_border);
	}
	.primary:hover {
		background-color: var(--button_primary_hover);
		color: var(--button_primary_text_hover);
		border: 1px solid var(--button_primary_border_hover);
		transition: all 0.3s ease;
	}
	.secondary {
		background-color: var(--button_secondary);
		color: var(--button_secondary_text);
		border: 1px solid var(--button_secondary_border);
	}

	.secondary:hover {
		background-color: var(--button_secondary_background);
		color: var(--button_secondary_text);
		border: 1px solid var(--button_secondary_border_hover);
		transition: all 0.3s ease;
	}

	.icon {
		background-color: var(--button_secondary_background);
		color: var(--button_secondary_text);
		border: 1px solid var(--button_secondary_border);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 4px;
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}
	.icon:hover {
		background-color: var(--button_secondary_background);
		color: var(--button_secondary_text);
		border: 1px solid var(--button_secondary_border_hover);
		transition: all 0.3s ease;
	}
</style>
