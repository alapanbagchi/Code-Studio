<script lang="ts">
    export let tabs: string[]
    export let onClick: (tab: string, index: number) => void = () => { }
    export let variant: 'standard' | 'btngroup' = 'standard'
    $: active = tabs[0]
    const handleTabClick = (tab: string, index: number) => {
        active = tab
        onClick(tab, index)
    }
</script>

<div class="tabs {variant}">
    {#each tabs as tab, index}
        <button on:click={()=>handleTabClick(tab, index)} class="tab {active == tab ? 'active' : ''}">{tab}</button>
    {/each}
</div>

<style>
	.tabs {
		width: 100%;
		display: flex;
        gap: 30px;
	}
    .tab{
        cursor: pointer;
        outline: none;
        border: none;
        font-size: 0.9rem;
		font-weight: 500;
        background-color: transparent;
		border: 3px solid transparent;
        padding-bottom: 15px;
        transition: all 0.3s ease;
        color: var(--text-secondary);
    }
    .active{
        color: var(--primary);
        border-bottom: 3px solid var(--primary);
        transition: all 0.3s ease;
    }

    .btngroup .tab{
        background-color: var(--btn_group_tab_background);
        padding-bottom: unset;
        padding: 10px;
        border-radius: 7px;
        font-size: 0.8rem;
    }
    .btngroup .tab.active{
        color: var(--btn_group_tab_active);
        border: 2px solid var(--btn_group_tab_active);
        background-color: var(--btn_group_tab_active_background);
    }
    .btngroup{
        gap: 10px;
        border-bottom: none;
    }
</style>
