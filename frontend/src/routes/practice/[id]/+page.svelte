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
	import { dataTypeConvertor } from '../../../utils/dataTypeConvertor';

	let currentConsoleTabIndex = 0;
	let currentLanguage = 'python';
	let showConsole = true;
	let currentLanguageConfig = python();
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
				return `#Do not change the function definition of the below function\ndef ${functionName}(${args}):`;
			}
			case 'c': {
				return `${starterCode}\n\n${
					dataTypeConvertor.get('c')[problems[0].output_type]
				} ${functionName}(${
					problems[0].input_variables
						.map((input) => `${dataTypeConvertor.get('c')[input.type]} ${input.variableName}`)
						.join(', ') || 'void'
				}) {\n\t// Your code goes here\n}`;
			}
			case 'cpp': {
				return `${starterCode}\n\n${
					dataTypeConvertor.get('cpp')[problems[0].output_type]
				} ${functionName}(${
					problems[0].input_variables
						.map((input) => `${dataTypeConvertor.get('cpp')[input.type]} ${input.variableName}`)
						.join(', ') || 'void'
				}) {\n\t// Your code goes here\n}`;
			}
			case 'java': {
				return `${starterCode}\n\n${
					dataTypeConvertor.get('java')[problems[0].output_type]
				} ${functionName}(${
					problems[0].input_variables
						.map((input) => `${dataTypeConvertor.get('java')[input.type]} ${input.variableName}`)
						.join(', ') || 'void'
				}) {\n\t// Your code goes here\n}`;
			}
		}
	};
	$: if (currentLanguage === 'python') {
		currentLanguageConfig = python();
		code = getStarterCode('python');
	} else if (currentLanguage === 'java') {
		currentLanguageConfig = java();
		code = getStarterCode('java');
	} else if (currentLanguage === 'c') {
		currentLanguageConfig = cpp();
		code = getStarterCode('c');
	} else if (currentLanguage === 'cpp') {
		currentLanguageConfig = cpp();
		code = getStarterCode('c');
	}

	const submitCode = async () => {
		try {
			console.log('Submitting code');
			isSubmitting = true;
			const result = await API.post('/rce/submit', {
				id: problems[0].id,
				language: 'python',
				code,
				// Convert output to string and keep the rest of the data as it is
				testCases: problems[0].test_cases,
				returnType: problems[0].output_type
			});
			codeExecutionOutput = result.data;
			isSubmitting = false;
		} catch (e) {
			isSubmitting = false;
			console.log(e);
		}
	};

	const changeHandler = (e: any) => {
		code = e.detail;
	};
</script>

<Splitpanes theme="modern-theme" class="container">
	<Pane size={40} minSize={40} maxSize={60} class="problem">
		<div class="section_header">
			<Tabs tabs={['Question', 'Submissions']} onClick={(tab, index) => {}} />
		</div>
		<div class="block">
			<h1 class="problemTitle">Two Sum</h1>
			<p class="description">
				Given an array of integers nums and an integer target, return indices of the two numbers
				such that they add up to target. You may assume that each input would have exactly one
				solution, and you may not use the same element twice. You can return the answer in any
				order.
			</p>
			{#each problems[0].test_cases as testCase, index}
				<IoBlock index={index + 1} testCase={problems[0].test_cases[index]} />
			{/each}
		</div>
	</Pane>
	<Pane size={60} minSize={40} maxSize={60} class="editor">
		<Splitpanes theme="modern-theme" horizontal={true}>
			<Pane size={showConsole ? 50 : 100} maxSize={100} minSize={20} class="ide">
				<li class="idecontrols">
					<div class="dropdown">
						<Dropdown
							options={[
								{
									name: 'Python',
									value: 'python'
								}
							]}
							on:change={(e) => {
								currentLanguage = e.detail.value;
							}}
						/>
					</div>
					<div class="icon">
						<span class="material-symbols-outlined icon"> replay </span>
					</div>
				</li>
				<Ide on:change={changeHandler} value={code} lang={currentLanguageConfig} />
			</Pane>
			{#if showConsole}
				<Pane size={showConsole ? 50 : 0} maxSize={80} minSize={20} class="editorFooter">
					<div class="consoletabs">
						<Tabs
							tabs={['Test Cases', 'Results']}
							onClick={(tab, index) => {
								currentConsoleTabIndex = index;
							}}
						/>
					</div>
					<div class="consolecontent">
						{#if currentConsoleTabIndex === 0}
							<TestCases testCases={problems[currentConsoleTabIndex].test_cases} />
						{:else}
							<Output codeExecutionResult={codeExecutionOutput} />
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
		background-color: var(--background) !important;
	}
	:global(.splitpanes.container) {
		display: flex;
		width: 100%;
		height: calc(100vh - 64px);
	}
	:global(.splitpanes__pane.problem) {
		height: calc(100vh - 134px);
		overflow: auto;
		display: flex;
		flex-direction: column;
		gap: 40px;
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
	:global(.splitpanes__pane.editorFooter) {
		background-color: var(--surface);
	}
	.consoletabs {
		padding: 10px 20px 0 20px;
		background-color: var(--background);
		border-bottom: var(--border);
	}
	.block {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 30px;
		margin-top: -20px;
		padding: 0 30px;
	}
	.consolecontent {
		padding: 0 20px;
	}
	.problemTitle {
		font-weight: 600;
		font-size: 1.2rem;
		color: var(--text-primary);
	}
	.description {
		font-size: 14px;
		font-weight: 400;
		line-height: 22px;
		margin-top: -10px;
		color: var(--text-secondary);
	}
	.controls {
		display: flex;
		justify-content: space-between;
		gap: 20px;
		padding: 20px 20px;
		width: 100%;
		height: 80px;
		z-index: 9999999999;
		position: absolute;
		background-color: var(--background);
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
	.section_header {
		height: 50px;
		min-height: 50px;
		display: flex;
		align-items: flex-end;
		border-bottom: var(--border);
		padding: 0 30px;
	}
	.idecontrols {
		height: 50px;
		min-height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: var(--border);
		padding: 0 20px;
	}
	.icon {
		font-size: 18px;
	}
</style>
