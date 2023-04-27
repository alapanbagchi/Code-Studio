<script lang="ts">
	let options: any = [
		{
			name: 'C',
			value: 'c'
		},
		{
			name: 'C++',
			value: 'cpp'
		},
		{
			name: 'Python',
			value: 'python'
		},
		{
			name: 'Java',
			value: 'java'
		}
	];
	let current = options[0];
	let showDropdown = false;
    // Find the max width of the options in the dropdown
    let maxWidth = 0;
    options.forEach((option: any) => {
        const width = option.name.length * 8;
        if (width > maxWidth) {
            maxWidth = width;
        }
    });
</script>

<div
	on:click={() => (showDropdown = !showDropdown)}
	on:keydown={() => (showDropdown = !showDropdown)}
	class="container"
    style:min-width={maxWidth + 50 + 'px'}
>
	<div class="current">
		<p>{current.name}</p>
		<span class="material-symbols-outlined dropdown_icon"> expand_more </span>
	</div>
	{#if showDropdown}
		<div class="dropdown">
			{#each options as option}
				<p
					on:click={() => (current = option)}
					on:keydown={() => (current = { option })}
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
	}
	.current {
		cursor: pointer;
		border: 1px solid var(--input_border);
		padding: 5px 10px;
		border-radius: 7px;
        display: flex;
        justify-content: space-between;
        align-items: center;
	}
    .dropdown_icon{
        font-size: 1.2rem;
    }
	.dropdown {
		padding: 2px 2px;
		border: 1px solid var(--input_border);
		border-radius: 7px;
		margin-top: 10px;
		position: absolute;
		z-index: 9999;
		background-color: #ffffff;
		width: 100%;
	}
	.option {
		padding: 5px 5px;
		border-radius: 7px;
		cursor: pointer;
	}
	.option:hover {
		background-color: var(--gray1);
	}
</style>
