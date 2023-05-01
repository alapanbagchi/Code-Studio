<script lang="ts">
	export let variant: 'primary' | 'secondary' | 'icon' | 'btngroup' = 'primary';
	export let disabled: boolean = false;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let onClick: () => void = () => {};
	export let isSubmitting: boolean = false;


	$: console.log('isSubmitting', isSubmitting);
</script>

<button
	{type}
	on:click={onClick}
	disabled={disabled || isSubmitting}
	class="{variant} {isSubmitting ? 'submitting' : ''}"
>
	{#if isSubmitting}
		<svg
			id="loading-spinner"
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 48 48"
		>
			<g fill="none">
				<path
					id="track"
					fill="#FFFFFF"
					d="M24,48 C10.745166,48 0,37.254834 0,24 C0,10.745166 10.745166,0 24,0 C37.254834,0 48,10.745166 48,24 C48,37.254834 37.254834,48 24,48 Z M24,44 C35.045695,44 44,35.045695 44,24 C44,12.954305 35.045695,4 24,4 C12.954305,4 4,12.954305 4,24 C4,35.045695 12.954305,44 24,44 Z"
				/>
				<path
					id="section"
					fill="#000000"
					d="M24,0 C37.254834,0 48,10.745166 48,24 L44,24 C44,12.954305 35.045695,4 24,4 L24,0 Z"
				/>
			</g>
		</svg>
	{/if}
	<span class="slot"><slot /></span>
</button>

<style>
	button {
		width: 100%;
		height: 36px;
		line-height: 24px;
		padding: 0 16px;
		font-size: 14px;
		border: none;
		outline: none;
		white-space: nowrap;
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
	.primary.submitting {
		background-color: var(--button_primary_hover);
		color: var(--button_primary_text_hover);
		border: 1px solid var(--button_primary_border_hover);
		transition: all 0.3s ease;
	}
	.submitting .slot{
		opacity: 0;
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
	.btngroup {
		border: 1px solid var(--btngroup_border);
	}
	#loading-spinner {
		position: absolute;
		animation: loading-spinner 1s linear infinite;
	}
	@keyframes loading-spinner {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
