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
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Input from '$lib/Shared/Input.svelte';
	export let data: any;
	const problem = data.problem;
	let showConsole = true;
	let currentLanguageConfig = python();
	let codeExecutionOutput: any = undefined;
	let isSubmitting = false;
	let submissions: any[] = [];
	onMount(async () => {
		const res = await API.get(`/problems/${$page.params.id}/submissions`);
		submissions = res.data;
	});
	console.log(problem);
	const getStarterCode = () => {
		const functionName = problem._id
			.toLowerCase()
			.replace(/[^a-zA-Z ]/g, '')
			.replace(/\s/g, '');
		const starterCode = starterFiles.get('python')!;
		const args = problem.input_variables.map((input) => input.name).join(', ');
		return `#Do not change the function definition of the below function\ndef ${functionName}(${args}):`;
	};
	let code: any = getStarterCode();
	$: console.log(code);
	const submitCode = async () => {
		try {
			isSubmitting = true;
			const result = await API.post(`/problems/${$page.params.id}/submit`, {
				id: problem._id,
				language: 'python',
				code,
				testCases: problem.test_cases.map((testCase: any) => ({
					input: testCase.input.map((input: any) => {
						return {
							type: problem.input_variables.find((inputvar: any) => inputvar.name === input.name)
								.type,
							variableName: input.name,
							value: input.value
						};
					}),
					output: {
						type: problem.output_type,
						value: testCase.output
					}
				})),
				returnType: problem.output_type
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
	let currentPanel: string = 'Question';
</script>

<div class="section_header">
	<Tabs
		tabs={['Question', 'Submissions']}
		onClick={(tab, index) => {
			currentPanel = tab;
		}}
	/>
	<ul class="idecontrols">
		<div class="problemcontrols">
			<li>Previous Problem</li>
			<li>Next Problem</li>
		</div>
	</ul>
</div>
<Splitpanes theme="modern-theme" class="container">
	<Pane size={40} minSize={40} maxSize={60} class="problem">
		<div class="block">
			{#if currentPanel === 'Question'}
				<h1 class="problemTitle">{problem.title}</h1>
				<p class="description">
					{problem.description}
				</p>
				{#each problem.test_cases as testCase, index}
					<IoBlock index={index + 1} {testCase} />
				{/each}
			{:else if currentPanel === 'Submissions'}
				{#each submissions as submission}
					<div
						on:click={() => (code = submission.code)}
						on:keydown={() => (code = submission.code)}
						class="submissionblock"
					>
						<div class="status_date">
							{#if submission.passed}
								<p style:color="var(--success)" class="status">Accepted</p>
							{:else if submission.errorName}
								<p style:color="var(--error)" class="status">{submission.errorName}</p>
							{:else}
								<p style:color="var(--error)" class="status">Failed</p>
							{/if}
							<p class="date">
								{new Date(submission.createdAt).toLocaleString('en-US', {
									weekday: 'short',
									year: 'numeric',
									month: 'short',
									day: 'numeric',
									hour: 'numeric',
									minute: 'numeric',
									second: 'numeric'
								})}
							</p>
						</div>
					</div>
				{/each}
			{:else if currentPanel === 'Discussion'}
				<div class="messagebox">
					<div class="messages">
						{#each ['', '', '', '', '', '', '', '', '', '', '', ''] as items, index}
							<div class="message">
								<div class="pfp">
									<img src="https://i.pravatar.cc/150?img=3" alt="" />
								</div>
								<div class="userdetails">
									<p class="name">John Doe <span class="admin">Admin</span></p>
									<p class="messagecontent">
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates minima fuga
										magni dignissimos accusantium itaque, tempora repellat laborum reiciendis
										accusamus perferendis quisquam cum, eveniet esse corrupti? Odio facere libero
										voluptatum?
									</p>
								</div>
							</div>
						{/each}
					</div>
					<div class="inputfield">
						<Input placeholder="Type your message here" type="text" value={''} />
					</div>
				</div>
			{/if}
		</div>
	</Pane>
	<Pane size={60} minSize={40} maxSize={60} class="editor">
		<Splitpanes theme="modern-theme" horizontal={true}>
			<Pane size={showConsole ? 50 : 100} maxSize={100} minSize={20} class="ide">
				<Ide on:change={changeHandler} value={code} lang={currentLanguageConfig} />
			</Pane>
			{#if showConsole}
				<Pane size={showConsole ? 50 : 0} maxSize={80} minSize={20} class="editorFooter">
					<div class="consolecontent">
						<TestCases testCases={problem.test_cases} output={codeExecutionOutput} />
					</div>
				</Pane>
			{/if}
		</Splitpanes>
		<div class="controls">
			<div class="openConsole">
				<Button onClick={() => (showConsole = !showConsole)} variant="secondary">Console</Button>
			</div>
			<div class="submit">
				<Button {isSubmitting} onClick={submitCode} variant="primary">Submit</Button>
			</div>
		</div>
	</Pane>
</Splitpanes>

<style>
	:global(.splitpanes) {
		display: flex;
		width: 100%;
		height: calc(100vh - 115px);
		background-color: var(--background) !important;
	}
	:global(.splitpanes.container) {
		display: flex;
		width: 100%;
		height: calc(100vh - 115px);
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
	.block {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 30px;
		margin-top: 20px;
		padding: 0 30px;
	}
	.problemTitle {
		font-weight: 600;
		font-size: 1.2rem;
		color: var(--text-primary);
	}
	.admin {
		font-size: 12px;
		font-weight: 400;
		background-color: var(--onSurface);
		padding: 8px;
		display: flex;
		align-items: center;
		border-radius: 5px;
		color: var(--text-primary);
		width: fit-content;
	}
	.description {
		font-size: 14px;
		font-weight: 400;
		line-height: 22px;
		margin-top: -10px;
		color: var(--text-secondary);
	}
	.messagebox {
		width: 100%;
		height: 100%;
		position: relative;
	}
	.messages {
		width: 100%;
		height: calc(100vh - 210px);
		overflow: auto;
	}
	.messages::-webkit-scrollbar {
		display: none;
	}
	.message {
		width: 100%;
		display: flex;
		gap: 20px;
		margin-bottom: 20px;
	}
	.pfp {
		width: 50px;
		height: 50px;
		min-width: 50px;
		min-height: 50px;
		border-radius: 50%;
		overflow: hidden;
	}
	.pfp img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.userdetails {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
	.name {
		font-size: 16px;
		font-weight: 500;
		color: var(--text-primary);
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.messagecontent {
		font-size: 14px;
		font-weight: 400;
		color: var(--text-secondary);
		line-height: 22px;
		margin-top: 5px;
	}

	.inputfield {
		width: 100%;
	}
	.submissionblock {
		width: 100%;
		height: fit-content;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20px;
		border: var(--border);
		border-radius: 7px;
		font-size: 14px;
		cursor: pointer;
		background-color: var(--surface);
		opacity: 0.8;
		transition: all 0.2s ease-in-out;
	}
	.submissionblock:hover {
		opacity: 1;
	}
	.status_date {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	p.date {
		color: var(--text-secondary);
	}
	p.status {
		font-weight: 600;
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
		width: 100%;
		height: 50px;
		min-height: 50px;
		display: flex;
		margin-left: auto;
		align-items: center;
		padding: 0 20px;
		color: var(--text-secondary);
		font-size: 0.9rem;
		gap: 20px;
	}
	.problemcontrols {
		display: flex;
		gap: 20px;
		margin-left: auto;
	}
	.problemcontrols li {
		cursor: pointer;
	}
</style>
