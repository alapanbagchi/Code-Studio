<script lang="ts">
	import Button from '$lib/Shared/Button.svelte';
	import ButtonGroup from '$lib/Shared/ButtonGroup.svelte';
	import Input from '$lib/Shared/Input.svelte';
	import Tabs from '$lib/Shared/Tabs.svelte';
	export let testCases: {
		input: {
			name: string;
			value: any;
		}[];
		output: any;
	}[];
	export let output: any[] | undefined = undefined;
	let currentTab: string = 'Test Case 1';
	$: currentTestCase = testCases[parseInt(currentTab.split('Test Case ')[1]) - 1];
	$: currentOutput = output ? output[parseInt(currentTab.split('Test Case ')[1]) - 1] : undefined;
</script>

<div class="container">
	<div class="tabs">
		{#if output}
			<ButtonGroup
				tabs={output.map((output, index) => {
					console.log(output.passed);
					return {
						label: `Test Case ${index + 1}`,
						status: output.passed ? 'success' : 'error'
					};
				})}
				onClick={(tab) => {
					currentTab = tab.label;
				}}
			/>
		{:else}
			<ButtonGroup
				tabs={testCases.map((testCase, index) => {
					return {
						label: `Test Case ${index + 1}`,
						status: 'default'
					};
				})}
				onClick={(tab) => {
					currentTab = tab.label;
				}}
			/>
		{/if}
	</div>
	{#if !currentOutput?.exception}
		<div class="io">
			<div class="input">
				{#if output}
					{#each currentOutput.input as input, index}
						{#if currentOutput.passed}
							<div class="status">
								<p style:color="var(--success)">Test Case Passed</p>
								<p style:opacity="0.8">
									Execution Time: {Math.round(currentOutput.time * 1000 * 100) / 100}ms
								</p>
							</div>
						{:else}
							<p style:color="var(--error)">Test Case Failed</p>
						{/if}
						<div class="testbox">
							<p class="label">{input.variableName}</p>
							<p class="value">{input.value}</p>
						</div>
					{/each}
				{:else}
					{#each currentTestCase.input as input, index}
						<div class="testbox">
							<p class="label">{input.name}</p>
							<p class="value">{input.value}</p>
						</div>
					{/each}
				{/if}
			</div>
			{#if output}
				<div class="output {currentOutput.passed ? 'success' : 'error'}">
					<p class="label">Output</p>
					<p class="value">{output ? currentOutput.output : currentTestCase.output}</p>
				</div>
				<div class="expectedResults">
					<p class="label">Expected Results</p>
					<p class="value">{currentOutput.expectedOutput}</p>
				</div>
			{/if}
		</div>
	{:else}
		<div style="display:flex; flex-direction:column; gap:10px; margin: 20px;">
			<p style="color: var(--error); font-size:1.5rem; font-weight:600">
				{currentOutput.exception.type}
			</p>
			<p style="">{currentOutput.exception.message}</p>
			<p>{currentOutput.exception.traceback}</p>
		</div>
	{/if}
</div>

<style>
	.status {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.tabs {
		display: flex;
		gap: 10px;
		padding: 10px 20px;
		background-color: var(--background);
	}
	.io {
		display: flex;
		flex-direction: column;
		margin-top: 10px;
		padding: 10px 20px;
		height: 100%;
		overflow: auto;
	}
	.io::-webkit-scrollbar {
		display: none;
	}
	.input {
		display: flex;
		gap: 15px;
		flex-direction: column;
	}
	.label {
		font-size: 14px;
		color: var(--text-secondary);
		font-weight: 400;
		line-height: 22px;
		margin-bottom: 5px;
	}
	.testbox {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.value {
		font-size: 14px;
		color: var(--text-primary);
		font-weight: 400;
		line-height: 22px;
		padding: 10px 15px;
		background-color: var(--background);
		border: var(--border);
		border-radius: 7px;
	}
	.output,
	.expectedResults {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: 15px;
	}
	.error .value {
		border: 1px solid var(--error);
		color: var(--error);
		font-weight: 600;
	}

	.success .value {
		border: 1px solid var(--success);
		color: var(--success);
		font-weight: 600;
	}
</style>
