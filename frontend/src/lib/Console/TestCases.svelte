<script lang="ts">
	import Button from '$lib/Shared/Button.svelte';
	import ButtonGroup from '$lib/Shared/ButtonGroup.svelte';
	import Input from '$lib/Shared/Input.svelte';
	import Tabs from '$lib/Shared/Tabs.svelte';
	export let testCases: {
		input: {
			variableName: string;
			value: any;
		}[];
		output: any;
	}[];
	let currentTab: string = 'Test Case 1';
	$: currentTestCase = testCases[parseInt(currentTab.split('Test Case ')[1]) - 1];
</script>

<div class="container">
	<div class="tabs">
		<ButtonGroup
			tabs={testCases.map((testCase, index) => {
				return {
					label: `Test Case ${index + 1}`,
					status: 'default',
				}
			})}
			onClick={(tab) => {
				currentTab = tab.label;
			}}
		/>
	</div>
	<div class="io">
		<div class="input">
			{#each currentTestCase.input as input, index}
				<Input
					label={input.variableName}
					type="text"
					value={input.value}
					placeholder="Variable Name"
				/>
			{/each}
		</div>
	</div>
</div>

<style>
	.tabs {
		display: flex;
		gap: 10px;
		margin-top: 20px;
	}
	.io {
		display: flex;
		flex-direction: column;
		margin-top: 20px;
	}
</style>
