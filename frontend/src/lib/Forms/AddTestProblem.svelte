<script lang="ts">
	import Button from '$lib/Shared/Button.svelte';
	import Dropdown from '$lib/Shared/Dropdown.svelte';
	import Input from '$lib/Shared/Input.svelte';
	import TextArea from '$lib/Shared/TextArea.svelte';
	import { onMount } from 'svelte';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { validReturnTypes } from '../../utils/validReturnType';
	import { keyword_list } from '../../utils/keywords';
	import Tags from '$lib/Shared/Tags.svelte';
	import { createEventDispatcher } from 'svelte';
	import { clickOutside } from '../../utils/clickOutside';
	import API from '../../utils/API';
	import { notification } from '$lib/Notifications/notifications';
	import { page } from '$app/stores';

	export let preFilledData: any = undefined;
    export let masterForm: any = undefined;

	let action: 'save' | 'edit' | 'delete' = 'save';
	const {
		form,
		handleChange,
		errors,
		touched,
		handleSubmit,
		isSubmitting,
		updateField,
		validateField,
		isValid
	} = createForm({
		initialValues: {
			title: '',
			input_variables: [
				{
					name: '',
					type: validReturnTypes[0].value
				}
			],
			description: '',
			output_type: '',
            marks: 0,
			test_cases: [
				{
					input: [
						{
							name: '',
							value: ''
						}
					],
					output: '',
					explanation: ''
				}
			],
		},
		validationSchema: yup.object().shape({
			title: yup.string().required('Title is required'),
			description: yup.string().required('Description is required'),
			output_type: yup.string().required('Output type is required'),
            marks: yup.number().required('Marks is required'),
			test_cases: yup.array().of(
				yup.object().shape({
					input: yup.array().of(
						yup.object().shape({
							name: yup.string().required('Variable name is required'),
							value: yup
								.string()
								.required('Value is required')
								.test('type-error', 'The value is not of the valid type', function (value: any) {
									const type = $form.input_variables.find(
										(inputVariable) => inputVariable.name === this.parent.name
									)?.type;
									if (!type) return false;
									if (type === 'number') {
										return !isNaN(value);
									} else if (type === 'boolean') {
										return value === 'true' || value === 'false';
									} else if (type === 'string') {
										return true;
									} else if (type === 'array') {
										try {
											JSON.parse(value);
											return true;
										} catch (e) {
											return false;
										}
									} else if (type === 'object') {
										try {
											JSON.parse(value);
											return true;
										} catch (e) {
											return false;
										}
									}
									return false;
								})
						})
					),
					output: yup
						.string()
						.required('Value is required')
						.test('type-error', 'The value is not of the valid type', (value) => {
							const output_type = $form.output_type;
							if (output_type === 'number') {
								return !isNaN(value);
							} else if (output_type === 'boolean') {
								return value === 'true' || value === 'false';
							} else if (output_type === 'string') {
								return true;
							} else if (output_type === 'array') {
								try {
									JSON.parse(value);
									return true;
								} catch (e) {
									return false;
								}
							} else if (output_type === 'object') {
								try {
									JSON.parse(value);
									return true;
								} catch (e) {
									return false;
								}
							}
						}),
					explanation: yup.string()
				})
			),
			input_variables: yup.array().of(
				yup.object().shape({
					type: yup.string().required('Type is required'),
					name: yup
						.string()
						.required('Variable name is required')
						.test('is-unique', 'Input variables must be unique', () => {
							const inputVariables: any[] = $form.input_variables;
							const set = new Set(inputVariables.map((inputVariable) => inputVariable.name));
							return set.size === inputVariables.length;
						})
						.test('is-keyword', 'Input variable cannot be a keyword', (value: any) => {
							return !keyword_list.includes(value);
						})
				})
			)
		}),
		onSubmit: async (values) => {
        }
	});
	const addVariables = () => {
		$form.input_variables = $form.input_variables.concat({
			name: '',
			type: validReturnTypes[1].value
		});

		// @ts-ignore
		$errors.input_variables = $errors.input_variables.concat({
			name: '',
			type: ''
		});
	};

	const addTestCases = () => {
		$form.test_cases = $form.test_cases.concat({
			input: [
				{
					name: '',
					value: ''
				},
				{
					name: '',
					value: ''
				}
			],
			output: '',
			explanation: ''
		});
		// @ts-ignore
		$errors.test_cases = $errors.test_cases.concat({
			input: [
				{
					name: '',
					value: ''
				}
			],
			output: '',
			explanation: ''
		});
	};

	$: if ($form.input_variables.length) {
		console.log('HERE');
		$form.test_cases = $form.test_cases.map((testCase) => {
			testCase.input = $form.input_variables.map((inputVariable) => {
				return {
					name: inputVariable.name,
					value: testCase.input.find((input) => input.name === inputVariable.name)?.value || ''
				};
			});
			return testCase;
		});

		$errors.test_cases = $errors.test_cases.map((testCase) => {
			testCase.input = $form.input_variables.map((inputVariable) => {
				return {
					name: inputVariable.name,
					value: testCase.input.find((input) => input.name === inputVariable.name)?.value || ''
				};
			});
			return testCase;
		});
	}
	const tags = [
		'Strings',
		'Array',
		'Hash Table',
		'Linked List',
		'Graph',
		'Trees',
		'Greedy Algorithm',
		'Dynamic Programming'
	];
	$: if (preFilledData) {
		$form = {
			title: preFilledData.title,
			description: preFilledData.description,
			input_variables: preFilledData.input_variables,
			test_cases: preFilledData.test_cases,
			output_type: preFilledData.output_type,
            marks: preFilledData.marks
		};
		$errors = {
			title: '',
			description: '',
			input_variables: preFilledData.input_variables.map((inputVariable: any) => {
				return {
					name: '',
					type: ''
				};
			}),
			test_cases: preFilledData.test_cases.map((testCase: any) => {
				return {
					input: [
						{
							name: '',
							value: ''
						},
						{
							name: '',
							value: ''
						}
					],
					output: '',
					explanation: ''
				};
			}),
			output_type: '',
            marks: preFilledData.marks
		};
	}

    $: if(isValid){
        console.log('VALID');
        masterForm.title = $form.title;
        masterForm.description = $form.description;
        masterForm.input_variables = $form.input_variables;
        masterForm.test_cases = $form.test_cases;
        masterForm.output_type = $form.output_type;
        masterForm.marks = $form.marks;
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div class="sectionheader">
		<h2>Problem Details</h2>
	</div>
	<Input
		label="Title"
		name="title"
        type="text"
		value={$form.title}
		onChange={handleChange}
		error={$errors.title}
		required={true}
		placeholder="Enter the title of the problem"
	/>
	<TextArea
		label="Description"
		name="description"
		value={$form.description}
		onChange={handleChange}
		error={$errors.description}
		required={true}
		placeholder="Enter the description of the problem"
	/>
	<Dropdown
		label="Output Type"
		required={true}
		options={validReturnTypes}
		name="output_type"
		{updateField}
		{validateField}
		value={validReturnTypes.find((type) => type.value === $form.output_type)}
	/>
    <div class="seperation"></div>
    <Input
        label="Marks"
        name="marks"
        value={$form.marks}
        onChange={handleChange}
        error={$errors.marks}
        required={true}
        placeholder="Enter the marks for the problem"
    />
	<div class="seperation" />
	<div class="sectionheader">
		<h2>Input Variables</h2>
		<div>
			<Button type="button" variant="secondary" onClick={addVariables}>Add Variable</Button>
		</div>
	</div>
	<div class="wrapper">
		{#each $form.input_variables as variable, i}
			<div class="block">
				<div class="header">
					<p class="count">#{i + 1}</p>
					<span
						on:click={() => {
							$form.input_variables = $form.input_variables.filter((_, index) => index !== i);
						}}
						on:keydown={() => {
							$form.input_variables = $form.input_variables.filter((_, index) => index !== i);
						}}
						class="material-symbols-rounded close">close</span
					>
				</div>
				<div class="inputs">
					<Input
						label="Variable Name"
						name={`input_variables[${i}].name`}
						value={$form.input_variables[i].name}
						onChange={handleChange}
						error={$errors.input_variables[i] ? $errors.input_variables[i].name : ''}
						required={true}
						placeholder="Enter the name of the variable"
					/>
					<Dropdown
						label="Variable Type"
						required={true}
						name={`input_variables[${i}].type`}
						{updateField}
						{validateField}
						options={validReturnTypes}
						on:change={(e) => {
							$form.input_variables[i].type = e.detail.value;
						}}
						value={validReturnTypes.find((type) => type.value === $form.input_variables[i].type)}
					/>
				</div>
			</div>
		{/each}
	</div>
	<div class="sectionheader">
		<h2>Test Cases</h2>
		<div>
			<Button type="button" variant="secondary" onClick={addTestCases}>Add Test Cases</Button>
		</div>
	</div>
	<div class="wrapper">
		{#each $form.test_cases as testcase, j}
			<div class="block">
				<div class="header">
					<p class="count">#{j + 1}</p>
					<span
						on:click={() => {
							$form.test_cases = $form.test_cases.filter((_, index) => index !== j);
						}}
						on:keydown={() => {
							$form.test_cases = $form.test_cases.filter((_, index) => index !== j);
						}}
						class="material-symbols-rounded close">close</span
					>
				</div>
				{#each testcase.input as input, k}
					<Input
						label={input.name ? `Input Value for ${input.name}` : 'Input Value'}
						name={`test_cases[${j}].input[${k}].value`}
						value={$form.test_cases[j].input[k].value}
						onChange={handleChange}
						error={$errors.test_cases[j]
							? $errors.test_cases[j].input[k]
								? $errors.test_cases[j].input[k].value
								: ''
							: ''}
						required={true}
						placeholder="Enter the input value for {input.name}"
					/>
				{/each}
				<Input
					label="Output"
					name={`test_cases[${j}].output`}
					value={$form.test_cases[j].output}
					onChange={handleChange}
					error={$errors.test_cases[j] ? $errors.test_cases[j].output : ''}
					required={true}
					placeholder="Enter the output value"
				/>
				<Input
					label="Explanation"
					name={`test_cases[${j}].explanation`}
					value={$form.test_cases[j].explanation}
					onChange={handleChange}
					error={$errors.test_cases[j] ? $errors.test_cases[j].explanation : ''}
					required={false}
					placeholder="Enter the explanation"
				/>
			</div>
		{/each}
	</div>
	<div class="seperation" />
</form>

<style>
	form {
		margin-left: auto;
		margin-right: auto;
		max-width: 1000px;
		color: var(--text-primary);
	}
	.sectionheader {
		margin: 30px 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.count {
		font-size: 22px;
		font-weight: 500;
		color: var(--text-secondary);
		opacity: 0.6;
		margin-bottom: 15px;
	}
	.sectionheader h2 {
		font-size: 20px;
		font-weight: 500;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.block {
		display: flex;
		flex-direction: column;
		border: var(--border);
		padding: 20px 30px;
		border-radius: 10px;
	}
	.btngrp {
		display: flex;
		justify-content: center;
		gap: 20px;
		margin-top: 30px;
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}
	.close {
		color: var(--text-secondary);
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}
	.close:hover {
		color: var(--error);
	}
	.inputs {
		display: flex;
		gap: 50px;
	}
	.seperation {
		margin-top: 25px;
	}
</style>
