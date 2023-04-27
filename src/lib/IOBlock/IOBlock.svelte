<script lang="ts">
	export let index: number;
	export let testCase: TestCase;
</script>

<div class="container">
	<p class="header">Example {index}:</p>
	<div class="wrapper">
		<div class="input">
			<p class="title"><strong>Input: </strong></p>
			{#each testCase.input as input, index}
				<p>{input.variableName} = <span>{JSON.stringify(input.value)}</span> {testCase.input.length-2 === index ? ', ' : ''}</p>
			{/each}
		</div>
		<p><strong>Output:</strong> <span>{JSON.stringify(testCase.output)}</span></p>
        {#if testCase.explanation}
            <p><strong>Explanation:</strong> {testCase.explanation}</p>
        {/if}
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		background-color: var(--ioblock_background);
		padding: 20px;
		border-radius: 7px;
		gap: 10px;
	}
    .header{
        color: var(--text_primary);
		font-size: 0.95rem;
		font-weight: 600;
		display: flex;
		gap: 10px;
        margin-bottom: 10px;
    }

	.wrapper p {
		font-size: 0.9rem;
		color: var(--text_primary);
	}
    .input{
        display: flex;
        gap: 10px;
    }
</style>
