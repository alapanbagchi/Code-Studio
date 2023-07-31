<!-- <script lang="ts">
	import { notification } from '$lib/Notifications/notifications';
	import Button from '$lib/Shared/Button.svelte';
	import Input from '$lib/Shared/Input.svelte';
	import { user } from '$lib/stores/userStore';
	import API from '../../utils/API';

    export let problem: any;
    export let test: any
    let remarks: string = '';
	let isSubmitting = false;
	const markSolution = async (
		test_id: string,
		problem_id: string,
		verdict: 'CORRECT' | 'INCORRECT'
	) => {
		isSubmitting = true;
		const res = await API.post(`/test/grade`, {
			test_id,
			problem_id,
            user_id: $user._id,
			correct: verdict === 'CORRECT',
            remarks
		});
		isSubmitting = false;
		if (res.status === 200) {
			$notification = {
				type: 'SUCCESS',
				title: 'Marked Successffully',
				message: 'Solution marked successfully'
			}
		} else {
			$notification = {
				type: 'ERROR',
				title: 'Something went wrong',
				message: 'An error occured while marking the solution' 
			}
		}
	};

    $: console.log(remarks);
</script>

<Input
	label="Remarks"
	type="text"
	placeholder="Enter remarks"
	onChange={(e) => {
		remarks = e.target.value;
	}}
	value={remarks}
/>
<div class="btngroup">
	<Button isSubmitting={isSubmitting} onClick={()=>markSolution(test._id, problem._id, 'INCORRECT')} variant="error"
		>Mark as incorrect</Button
	>
	<Button isSubmitting={isSubmitting} onClick={()=>markSolution(test._id, problem._id, 'CORRECT')} variant="primary"
		>Mark as correct</Button
	>
</div> -->
<script lang="ts">
	import { notification } from '$lib/Notifications/notifications';
	import Button from '$lib/Shared/Button.svelte';
	import Input from '$lib/Shared/Input.svelte';
	import API from '../../utils/API';

	export let problem: any;
	export let test: any;
	export let user_id: any;
	let remarks: string = '';
	let isSubmitting = false;
	const markSolution = async (
		test_id: string,
		problem_id: string,
		verdict: 'CORRECT' | 'INCORRECT'
	) => {
		try {
			isSubmitting = true;
			const res = await API.post(`/test/grade`, {
				test_id,
				problem_id,
				user_id: user_id,
				correct: verdict === 'CORRECT',
				remarks
			});
			isSubmitting = false;
			$notification = {
				type: 'SUCCESS',
				title: 'Marked Successffully',
				message: 'Solution marked successfully'
			};
		} catch (e) {
			$notification = {
				type: 'ERROR',
				title: 'Something went wrong',
				message: 'An error occured while marking the solution'
			};
		}
	};

	$: console.log(remarks);
</script>

<Input
	label="Remarks"
	type="text"
	placeholder="Enter remarks"
	onChange={(e) => {
		remarks = e.target.value;
	}}
	value={remarks}
/>
<div class="btngroup">
	<Button
		{isSubmitting}
		onClick={() => markSolution(test._id, problem._id, 'INCORRECT')}
		variant="error">Mark as incorrect</Button
	>
	<Button
		{isSubmitting}
		onClick={() => markSolution(test._id, problem._id, 'CORRECT')}
		variant="primary">Mark as correct</Button
	>
</div>
