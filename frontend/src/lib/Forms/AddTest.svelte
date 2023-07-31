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
	import Calender from '$lib/Shared/Calender.svelte';
	import e from 'cors';
	import AddPracticeProblems from './AddPracticeProblems.svelte';
	import AddTestProblem from './AddTestProblem.svelte';
	export let preFilledData: any = undefined;
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
			startDate: new Date().toISOString().slice(0, 16),
			endDate: new Date().toISOString().slice(0, 16),
			problems: [
				{
					title: '',
					marks: 0,
					input_variables: [
						{
							name: '',
							type: validReturnTypes[0].value
						}
					],
					description: '',
					output_type: '',
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
					]
				}
			]
		},
		validationSchema: yup.object().shape({
			title: yup.string().required('Title is required'),
			startDate: yup
				.date()
				.required('Start Date is required')
				// Check if the start date is in the future or not
				.test('startDate', 'Start Date should be in the future', (value) => {
					const startDate = new Date(value);
					const currentDate = new Date();
					return startDate > currentDate;
				})
				.test('startDate', 'Start Date should be before End Date', (value) => {
					const startDate = new Date(value);
					const endDate: Date = new Date($form.endDate);
					return startDate < endDate;
				}),
			endDate: yup
				.date()
				.required('End Date is required')
				// Check if the end date is in the future or not
				.test('endDate', 'End Date should be in the future', (value) => {
					const endDate = new Date(value);
					const currentDate = new Date();
					return endDate > currentDate;
				})
				.test('endDate', 'End Date should be after Start Date', (value) => {
					const endDate = new Date(value);
					const startDate = new Date($form.startDate);
					return endDate > startDate;
				}),
			problems: yup.array().of(
				yup.object().shape({
					title: yup.string().required('Title is required'),
					input_variables: yup.array().of(
						yup.object().shape({
							name: yup.string().required('Name is required'),
							type: yup.string().required('Type is required')
						})
					),
					marks: yup.number().required('Marks is required').min(1, 'Marks has to be greater than 0'),
					description: yup.string().required('Description is required'),
					output_type: yup.string().required('Output Type is required'),
					test_cases: yup.array().of(
						yup.object().shape({
							input: yup.array().of(
								yup.object().shape({
									name: yup.string().required('Name is required'),
									value: yup.string().required('Value is required')
								})
							),
							output: yup.string().required('Output is required'),
							explanation: yup.string()
						})
					)
				})
			)
		}),
		onSubmit: async (values) => {
			const res = await API.post('/test/add', values);
			$notification = {
				title: 'Test Added',
				message: 'Test has been added successfully',
				type: 'SUCCESS'
			}
		}
	});

	const addNewProblem = () => {
		$form.problems = [
			...$form.problems,
			{
				title: '',
				input_variables: [
					{
						name: '',
						type: 'string'
					}
				],
				description: '',
				output_type: '',
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
				]
			}
		];
		$errors.problems = [
			...$errors.problems,
			{
				title: '',
				input_variables: [
					{
						name: '',
						type: ''
					}
				],
				description: '',
				output_type: '',
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
				]
			}
		];
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div class="sectionheader">
		<h2>Test Details</h2>
	</div>

	<Input
		label="Title"
		name="title"
		value={$form.title}
		onChange={handleChange}
		error={$errors.title}
	/>
	<Calender
		label="Start Date"
		name="startDate"
		value={$form.startDate}
		onChange={handleChange}
		error={$errors.startDate}
	/>
	<Calender
		label="End Date"
		name="endDate"
		value={$form.endDate}
		onChange={handleChange}
		error={$errors.endDate}
	/>
	<div class="sectionheader">
		<h2>Test Problems</h2>
		<div>
			<Button onClick={addNewProblem}>Add new problem</Button>
		</div>
	</div>
	<div class="problems">
		{#each $form.problems as problem, index}
			<div
				class="accordianHeader"
				on:click={() => {
					const problemWrapper = document.querySelectorAll('.problem_wrapper');
					problemWrapper[index].classList.toggle('hidden');
				}}
				on:keydown={() => {
					const problemWrapper = document.querySelectorAll('.problem_wrapper');
					problemWrapper[index].classList.toggle('hidden');
				}}
			>
				<div class="problem_count">
					<p class="count">Problem #{index + 1}</p>
					{#if index > 0}
						<span
							on:click={() => {
								$form.problems = $form.problems.filter((_, i) => i !== index);
							}}
							on:keydown={() => {
								$form.problems = $form.problems.filter((_, i) => i !== index);
							}}
							class="material-symbols-rounded close">close</span
						>
					{/if}
				</div>
			</div>
			<div class="problem_wrapper hidden">
				<AddTestProblem masterForm={$form.problems[index]} />
			</div>
		{/each}
	</div>
	<Button isSubmitting={$isSubmitting} type="submit">Submit</Button>
</form>

<style>
	form {
		margin-left: auto;
		margin-right: auto;
		max-width: 1000px;
		color: var(--text-primary);
	}
	.problem_wrapper.hidden {
		max-height: 0px;
		height: 0;
		padding: 0;
	}
	.accordianHeader {
		background-color: var(--surface);
		border: var(--border);
		border-radius: 7px;
		display: flex;
		justify-content: space-between;
		width: 100%;
		align-items: center;
		padding: 20px 30px;
		cursor: pointer;
	}
	.problem_count {
		font-size: 18px;
		font-weight: 400;
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.problem_wrapper {
		padding: 20px 30px;
		background-color: var(--surface);
		border-radius: 7px;
		max-height: 2000vh;
		overflow: hidden;
		transition: height max-height padding 0.3s ease-in-out;
	}
	.sectionheader {
		margin: 30px 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.count {
		font-size: 18px;
		font-weight: 500;
	}
	.sectionheader h2 {
		font-size: 20px;
		font-weight: 500;
	}
	.problems {
		margin-bottom: 30px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
