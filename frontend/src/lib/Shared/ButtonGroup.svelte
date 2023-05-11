<script lang="ts">
	export let tabs: { label: string; status: 'default' | 'success' | 'error' }[] = [];
	export let onClick: (
		tab: { label: string; status: 'default' | 'success' | 'error' },
		index: number
	) => void = () => {};
	$: active = tabs[0].label;
	const handleTabClick = (
		tab: { label: string; status: 'default' | 'success' | 'error' },
		index: number
	) => {
		active = tab.label;
		onClick(tab, index);
	};
</script>

<div class="wrapper">
	{#each tabs as tab, index}
		<button
			on:click={() => handleTabClick(tab, index)}
			class="tab {active == tab.label ? 'active' : ''}"
		>
			{#if tab.status != 'default'}
				<div class="status {tab.status === 'error' ? 'error' : 'success'}" />
			{/if}
			{tab.label}
		</button>
	{/each}
</div>

<style>
	.wrapper {
		display: flex;
		gap: 10px;
		color: var(--text-primary);
		font-size: 13px;
		border: var(--border);
		padding: 5px;
		border-radius: 7px;
	}
	button {
		border: none;
		background-color: transparent;
		outline: none;
		color: inherit;
		font-size: inherit;
		cursor: pointer;
		display: flex;
		gap: 10px;
		align-items: center;
	}
    .status{
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }
	.error {
		background-color: var(--error);
	}
	.tab {
		padding: 8px 8px;
		border-radius: 7px;
		cursor: pointer;
	}
	.tab:not(.active):hover {
		background-color: var(--onSurface);
	}
	.active {
		background-color: var(--secondary);
		color: var(--background);
	}
</style>
