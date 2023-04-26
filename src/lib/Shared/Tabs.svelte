<script lang="ts">
    let active: string
</script>

<div class="tabs">
	<button on:click={()=>active = 'Test Cases'} class="tab {active == 'Test Cases' ? 'active' : ''}">Test Cases</button>
	<button on:click={()=>active = 'Results'} class="tab {active == 'Results' ? 'active' : ''}">Results</button>
</div>

<style>
	.tabs {
		width: 100%;
		display: flex;
		border-bottom: 1px solid var(--gray1);
        gap: 30px;
	}
    .tab{
        cursor: pointer;
        outline: none;
        border: none;
        font-size: 0.9rem;
		font-weight: 500;
        background-color: transparent;
		border-bottom: 2px solid transparent;
        padding-bottom: 10px;
        transition: all 0.3s ease;
    }
    .active{
        color: var(--navbar_link_active);
        border-bottom: 2px solid var(--navbar_link_active);
        transition: all 0.3s ease;
    }
</style>
