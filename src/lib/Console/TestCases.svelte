<script lang="ts">
	import Button from '$lib/Shared/Button.svelte';
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
    $: currentTestCase = testCases[parseInt(currentTab.split('Test Case ')[1]) - 1]
</script>

<div class="container">
	<div class="tabs">
		<Tabs
            style="btngroup"
			tabs={
                testCases.map((testCase, index) => {
                    return `Test Case ${index + 1}`;
                })
            }
			onClick={(tab) => {
				currentTab = tab;
			}}
		/>
	</div>
	<div class="io">
		<div class="input">
			{#each currentTestCase.input as input, index}
				<Input
					label={input.variableName}
					type="text"
					value={JSON.stringify(input.value)}
					placeholder="Variable Name"
				/>
			{/each}
		</div>
	</div>
</div>

<style>
	.container {
	}
	.tabs {
		display: flex;
		gap: 10px;
		margin-top: 20px;
	}
	.io {
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin-top: 20px;
	}
</style>
