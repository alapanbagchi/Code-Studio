<script lang="ts">
	import Dropdown from '$lib/Shared/Dropdown.svelte';
import Input from '$lib/Shared/Input.svelte';
	import TextArea from '$lib/Shared/TextArea.svelte';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	const { form, handleChange, errors, touched, handleSubmit, isSubmitting } = createForm({
		initialValues: {
			title: '',
			description: '',
			output_type: '',
			test_cases: {},
			difficulty: 'EASY',
			tags: []
		},
		validationSchema: yup.object().shape({}),
		onSubmit: async (values) => {}
	});

    const validReturnTypes = [
        {value: 'string', name: 'String'},
        {value: 'number', name: 'Number'},
        {value: 'boolean', name: 'Boolean'},
        {value: 'array', name: 'Array'},
        {value: 'object', name: 'Object'},
    ]
</script>

<form>
	<Input
		label="Title"
		name="title"
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
		error={$errors.title}
		required={true}
        placeholder="Enter the description of the problem"
	/>
    <Dropdown
        label="Output Type"
        required={true}
        options={validReturnTypes}
    />
    <div class="sectionheader">
        <h2>Input Variables</h2>
        <p>Tell us about the input. These are the input variables that are passed on to the input function. Make sure to select the proper type of input</p>
    </div>
</form>

<style>
    form{
        margin-left: auto;
        margin-right: auto;
        max-width: 1000px;
        color: var(--text-primary);
    }
    .sectionheader{
        margin-top: 30px;
    }
    .sectionheader h2{
        font-size: 22px;
        font-weight: 500;
        margin-bottom: 10px;
    }
    .sectionheader p{
        font-size: 14px;
        font-weight: 400;
        margin-bottom: 10px;
        color: var(--text-secondary);
        margin-top: 15px;
    }
</style>