<script lang="ts">
	import TestCases from '$lib/Console/TestCases.svelte';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import Ide from '$lib/IDE/IDE.svelte';
	import Button from '$lib/Shared/Button.svelte';
	import Tabs from '$lib/Shared/Tabs.svelte';
	import Output from '$lib/Console/Output.svelte';
	import IoBlock from '$lib/IOBlock/IOBlock.svelte';
	import Dropdown from '$lib/Shared/Dropdown.svelte';
	import starterFiles from '../../../utils/starterFiles';
	import { python } from '@codemirror/lang-python';
	import { cpp } from '@codemirror/lang-cpp';
	import { java } from '@codemirror/lang-java';
	import problems from '../../../utils/demo';
	import API from '../../../utils/API';

	let currentConsoleTabIndex = 0;
	let currentLanguage = 'c';
	let showConsole = true;
	let currentLanguageConfig = cpp();
	let code: any = '';
	let codeExecutionOutput: any = undefined;
	let isSubmitting = false;
	const getStarterCode = (language: Language) => {
		const functionName = problems[0].id
			.toLowerCase()
			.replace(/[^a-zA-Z ]/g, '')
			.replace(/\s/g, '');
		const starterCode = starterFiles.get(language)!;
		const args = problems[0].input_variables.map((input) => input.variableName).join(', ');
		switch (language) {
			case 'python': {
				console.log(`${starterCode}\n\n${functionName}(${args})`);
				return `#Do not change the function definition of the below function\ndef ${functionName}(${args}):`;
			}
		}
	};
	$: if (currentLanguage === 'python') {
		currentLanguageConfig = python();
		code = getStarterCode('python');
	} else if (currentLanguage === 'java') {
		currentLanguageConfig = java();
		code = getStarterCode('python');
	} else if (currentLanguage === 'c') {
		currentLanguageConfig = cpp();
		code = getStarterCode('python');
	} else if (currentLanguage === 'cpp') {
		currentLanguageConfig = cpp();
		code = getStarterCode('python');
	}

	const submitCode = async () => {
		isSubmitting = true;
		const result = await API.post('/rce/submit', {
			id: problems[0].id,
			language: currentLanguage,
			code,
			// Convert output to string and keep the rest of the data as it is
			testCases: problems[0].test_cases.map((testCase) => {
				return {
					...testCase,
					output: JSON.stringify(testCase.output)
				};
			})
		});
		codeExecutionOutput = result.data;
		isSubmitting = false;
	};

	const changeHandler = (e: any) => {
		code = e.detail;
	};

	$: console.log(isSubmitting);
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
		{#each problems[0].test_cases as testCase, index}
			<IoBlock index={index + 1} testCase={problems[0].test_cases[index]} />
		{/each}
	</Pane>
	<Pane size={60} minSize={40} maxSize={60} class="editor">
		<Splitpanes horizontal={true}>
			<Pane size={showConsole ? 50 : 100} maxSize={100} minSize={20} class="ide">
				<li class="problemControls">
					<div>
						<Dropdown
							options={[
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
							]}
							on:change={(e) => {
								console.log(e);
								currentLanguage = e.detail.value;
							}}
						/>
					</div>
					<div class="links" />
				</li>
				<Ide on:change={changeHandler} value={code} lang={currentLanguageConfig} />
			</Pane>
			{#if showConsole}
				<Pane size={showConsole ? 50 : 0} maxSize={80} minSize={20} class="editorFooter">
					<div class="console">
						<Tabs
							tabs={['Test Cases', 'Results']}
							onClick={(tab, index) => {
								currentConsoleTabIndex = index;
							}}
						/>
						{#if currentConsoleTabIndex === 0}
							<TestCases 
								testCases={problems[currentConsoleTabIndex].test_cases}
							/>
						{:else}
							<Output
								codeExecutionResult={codeExecutionOutput} 
							/>
						{/if}
					</div>
				</Pane>
			{/if}
		</Splitpanes>
		<div class="controls">
			<div class="openConsole">
				<Button onClick={() => (showConsole = !showConsole)} variant="secondary">Console</Button>
			</div>
			<div class="submit">
				<Button variant="secondary">Run</Button>
				<Button {isSubmitting} onClick={submitCode} variant="primary">Submit</Button>
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
