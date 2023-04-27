<script lang="ts">
	import TestCases from '$lib/Console/TestCases.svelte';
	import ProblemHeader from '$lib/Header/ProblemHeader.svelte';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import Ide from '$lib/IDE/IDE.svelte';
	import Button from '$lib/Shared/Button.svelte';
	import Tabs from '$lib/Shared/Tabs.svelte';
	import Output from '$lib/Console/Output.svelte';
	import IoBlock from '$lib/IOBlock/IOBlock.svelte';
	import Dropdown from '$lib/Shared/Dropdown.svelte';
	let currentConsoleTab = 'Test Cases';
	let showConsole = true;

	const testCases: TestCase[] = [
		{
			input: [
				{
					variableName: 'nums',
					value: [2, 7, 11, 15]
				},
				{
					variableName: 'target',
					value: 9
				}
			],
			output: [0, 1],
			explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1]'
		},
		{
			input: [
				{
					variableName: 'nums',
					value: [3, 2, 4]
				},
				{
					variableName: 'target',
					value: 6
				}
			],
			output: [1, 2],
			explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2]'
		},
		{
			input: [
				{
					variableName: 'nums',
					value: [3, 3]
				},
				{
					variableName: 'target',
					value: 6
				}
			],
			output: [0, 1]
		}
	];
</script>

<Splitpanes class="container">
	<Pane size={40} minSize={40} maxSize={60} class="problem">
		<div class="block">
			<h1 class="problemTitle">Two Sum</h1>
			<p class="description">
				Given an array of integers nums and an integer target, return indices of the two numbers
				such that they add up to target. You may assume that each input would have exactly one
				solution, and you may not use the same element twice. You can return the answer in any
				order.
			</p>
		</div>
		{#each testCases as testCase, index}
			<IoBlock index={index + 1} testCase={testCases[index]} />
		{/each}
	</Pane>
	<Pane size={60} minSize={40} maxSize={60} class="editor">
		<Splitpanes horizontal={true}>
			<Pane size={showConsole ? 50 : 100} maxSize={100} minSize={20} class="ide">
				<li class="problemControls">
					<div>
						<Dropdown />
					</div>
					<div class="links">
						<a href="#" class="control">
							<p>Previous Problem</p>
						</a>
						<a href="#" class="control">
							<p>Next Problem</p>
						</a>
					</div>
				</li>
				<Ide />
			</Pane>
			{#if showConsole}
				<Pane size={showConsole ? 50 : 0} maxSize={80} minSize={20} class="editorFooter">
					<div class="console">
						<Tabs
							tabs={['Test Cases', 'Results']}
							onClick={(tab) => {
								currentConsoleTab = tab;
							}}
						/>
						{#if currentConsoleTab === 'Test Cases'}
							<TestCases {testCases} />
						{:else}
							<Output />
						{/if}
					</div>
				</Pane>
			{/if}
		</Splitpanes>
		<div class="controls">
			<div class="openConsole">
				<Button onClick={() => (showConsole = !showConsole)} type="secondary">Console</Button>
			</div>
			<div class="submit">
				<Button type="secondary">Run</Button>
				<Button type="primary">Submit</Button>
			</div>
		</div>
	</Pane>
</Splitpanes>

<style>
	:global(.splitpanes) {
		display: flex;
		width: 100%;
		height: calc(100vh - 64px);
	}
	:global(.splitpanes.container) {
		display: flex;
		width: 100%;
		height: calc(100vh - 64px);
		padding: 0 30px;
	}
	:global(.splitpanes__pane) {
		background-color: #ffffff !important;
	}
	:global(.splitpanes__pane.problem) {
		height: calc(100vh - 134px);
		overflow: auto;
		display: flex;
		flex-direction: column;
		gap: 40px;
		margin-top: 20px;
		padding-right: 20px;
	}
	:global(.splitpanes__pane.problem)::-webkit-scrollbar {
		display: none;
	}
	:global(.splitpanes__pane.editor) {
		width: 50%;
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
	}
	.block {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.problemTitle {
		font-weight: 500;
		font-size: 1.2rem;
	}
	.description {
		font-size: 14px;
		font-weight: 400;
		line-height: 22px;
	}
	.console {
		width: 100%;
		height: calc(100% - 80px);
		padding: 0 10px;
	}
	.controls {
		display: flex;
		justify-content: space-between;
		gap: 20px;
		padding: 20px 0;
		width: 100%;
		height: 80px;
		z-index: 9999999999;
		position: absolute;
		background-color: #ffffff;
		bottom: 0;
	}
	.submit {
		width: fit-content;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20px;
	}

	.problemControls {
		display: flex;
		width: fit-content;
		margin-left: auto;
		justify-content: space-between;
		width: 100%;
		gap: 20px;
		padding: 20px 0;
	}

	.problemControls .control {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 5px;
		border-radius: 5px;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
		font-size: 14px;
	}
	.problemControls .control:hover {
		color: var(--navbar_link_active);
	}
	.links {
		display: flex;
		gap: 10px;
	}
</style>
