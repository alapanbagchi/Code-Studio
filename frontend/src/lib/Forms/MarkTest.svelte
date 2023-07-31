<script lang="ts">
	import Button from '$lib/Shared/Button.svelte';
	import Input from '$lib/Shared/Input.svelte';
	import { user } from '$lib/stores/userStore';
	import API from '../../utils/API';

    export let problem: any;
    export let test: any
    let remarks: string = '';

	const markSolution = async (
		test_id: string,
		problem_id: string,
		verdict: 'CORRECT' | 'INCORRECT'
	) => {
		const res = await API.post(`/test/grade`, {
			test_id,
			problem_id,
            user_id: $user._id,
			correct: verdict === 'CORRECT',
            remarks
		});
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
	<Button onClick={()=>markSolution(test._id, problem._id, 'INCORRECT')} variant="error"
		>Mark as incorrect</Button
	>
	<Button onClick={()=>markSolution(test._id, problem._id, 'CORRECT')} variant="primary"
		>Mark as correct</Button
	>
</div>
