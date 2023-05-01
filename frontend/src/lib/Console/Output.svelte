<script lang="ts">
	import Tabs from '$lib/Shared/Tabs.svelte';
	import { pythonErrorParser } from '../../utils/errorParser/python.errorparser';
	export let codeExecutionResult: any = undefined;
	let isError = '';
	let executionError: any = {};
	let outputTabIndex = 0;
	$: if (codeExecutionResult) {
		codeExecutionResult.forEach((result: any) => {
			if (result.executionError) {
				isError = result.output;
			}
		});
		if (isError) {
			executionError = pythonErrorParser(isError);
		}
	}
</script>

<div class="container">
	{#if codeExecutionResult}
		<div class="output">
			{#if executionError.type && executionError.message}
				<p class="outputType">{executionError.type}</p>
				<div class="outputMessage">
					<pre>{@html executionError.message}</pre>
				</div>
			{:else}
				{#if codeExecutionResult.length > 1}
					<div class="tabs">
						<Tabs
							variant="btngroup"
							tabs={codeExecutionResult.map((result, index) => {
								return `Case ${index + 1}`;
							})}
							onClick={(tab, index) => {
								outputTabIndex = index;
							}}
						/>
					</div>
				{/if}
				{#each codeExecutionResult as result, index}
					{#if index === outputTabIndex}
						{#each result.input as input, index}
							<p class="title">{input.variableName}</p>
							<div class="value">
								<p>{JSON.stringify(input.value)}</p>
							</div>
						{/each}
						<p class="title">Output</p>
						<div class="value {result.correct ? 'correct' : 'wrong'}">
							<pre>{JSON.stringify(result.output)}</pre>
						</div>

						<p class="title">Expected Output</p>
						<div class="value">
							<pre>{JSON.stringify(result.expectedOutput)}</pre>
						</div>
					{/if}
				{/each}
			{/if}
		</div>
	{:else}
		<div class="defaultOutput">
			<p>You have to run your code first to see the output</p>
		</div>
	{/if}
</div>

<style>
	.container {
		display: flex;
		width: 100%;
		height: 100%;
	}
	.output {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.title {
		font-size: 0.9rem;
		font-weight: 600;
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}
	.outputType {
		color: var(--error);
		font-weight: 500;
		font-size: 1.4rem;
		margin: 20px 0;
	}
	.outputMessage {
		font-size: 0.9rem;
		font-weight: 400;
		color: var(--error);
		background-color: var(--error_background);
		padding: 20px;
		border-radius: 7px;
	}
	.defaultOutput {
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		color: var(--text_secondary);
	}
	.tabs {
		width: 100%;
		display: flex;
		border-bottom: 1px solid var(--gray1);
		gap: 30px;
		padding: 20px 0;
	}
	.value{
		font-size: 0.9rem;
		font-weight: 400;
		background-color: var(--io_output_block_background);
		padding: 20px;
		border-radius: 7px;
		margin-bottom: 20px;
	}
	.correct{
		background-color: var(--io_output_block_success_background);
		color: var(--io_output_block_success);
	}
	.wrong{
		color: var(--error);
		background-color: var(--error_background);
	}
</style>
