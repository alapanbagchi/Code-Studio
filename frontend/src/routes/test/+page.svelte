<script lang="ts">
	import { onMount } from 'svelte';
	import API from '../../utils/API';
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores/userStore';
	import problems from '../../utils/demo';
	import Ide from '$lib/IDE/IDE.svelte';
	import Button from '$lib/Shared/Button.svelte';

	let tests: any[] = [];
	let testResults: any[] = [];
	const getTestResults = async (test: any) => {
		const res = await API.get(`/test/${test._id}/student/${$user._id}`);
		return res.data;
	};
	onMount(() => {
		API.get('/test').then((res) => {
			tests = res.data;
			console.log(tests);
			tests.forEach(async (test) => {
				console.log(test);
				const res = await getTestResults(test);
				console.log(test._id, res);
				testResults = [
					...testResults,
					{
						results: res,
						testId: test._id
					}
				];
			});
		});
	});
	let currentTestResult = -1;
	$: console.log(testResults);
</script>

<div class="wrapper">
	<table>
		<thead>
			<tr>
				<th class="status">Status</th>
				<th class="title">Title</th>
				<th class="start">Start Time</th>
				<th class="end">End Time</th>
				<th class="examiner">Examiner</th>
				<th class="marks">Full Marks</th>
				<th class="viewresults">View Results</th>
			</tr>
		</thead>
		<tbody>
			{#each tests as test, index}
				<tr
					on:click={() => {
						if (new Date(test.startDate).getTime() > new Date().getTime()) return;
						if (new Date(test.endDate).getTime() < new Date().getTime()) return;
						goto(`/test/${test._id}`);
					}}
					style:opacity={new Date(test.startDate).getTime() > new Date().getTime() ||
					new Date(test.endDate).getTime() < new Date().getTime()
						? 0.5
						: 1}
				>
					<td class="status">
						<span class="material-symbols-rounded"
							>{new Date(test.startDate).getTime() > new Date().getTime() ||
							new Date(test.endDate).getTime() < new Date().getTime()
								? 'Lock'
								: test.users.find((u) => u.id === $user._id)?.problem_id.length ===
								  test.problems.length
								? 'Check'
								: 'Pending'}</span
						>
					</td>
					<td class="title">{test.title}</td>
					<td class="start">
						{new Date(test.startDate).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}
					</td>
					<td class="end">
						{new Date(test.endDate).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}
					</td>
					<td class="examiner">{test.examiner}</td>
					<td class="marks">{test.problems.reduce((acc, problem) => acc + problem.marks, 0)}</td>
					<td
						on:click={(e) => {
							e.stopPropagation();
							getTestResults(test);
						}}
						on:keydown
						class="viewresults"
					>
						{#if testResults.length > 0 && testResults.find((t) => t.testId === test._id)?.results.length === 0}
							<p>Results Unavailable</p>
						{:else}
							<Button
								variant="ghost"
								onClick={(e) => {
									e.stopPropagation();
									currentTestResult === test._id
										? (currentTestResult = -1)
										: (currentTestResult = test._id);
								}}
							>
								View Results
							</Button>
						{/if}
					</td>
				</tr>
				{#if currentTestResult === test._id}
					<div class="results">
						<p class="yourmarks">
							Your Marks: {testResults
								.find((t) => t.testId)
								.results.reduce((acc, result) => {
									if (result.correct) {
										const problem = test.problems.find((p) => p._id === result.problem_id);
										return acc + problem.marks;
									}
									return acc;
								}, 0)}
						</p>
						{#each testResults.find((t) => t.testId).results as result}
							<div style="display:flex;justify-content:space-between;align-items:center">
								<p style="width:100%;">{test.problems.find((p) => p._id === result.problem_id).title}</p>
								<p class={result.correct ? 'correct' : 'incorrect'}>
									{result.correct ? 'Correct' : 'Incorrect'}
								</p>
							</div>
							<Ide readonly={true} value={result.code} />
							<p style="opacity:0.8" class="remarks">
								Remarks : {result.remarks}
							</p>
						{/each}
					</div>
				{/if}
			{/each}
		</tbody>
	</table>
</div>

<style>
	.results {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		width: 100%;
		max-width: 1610px;
		top: 60px;
		max-height: 90vh;
		background-color: var(--surface);
		border: var(--border);
		padding: 10px 30px;
	}
	.yourmarks {
		font-size: 18px;
		font-weight: 600;
		margin-top: 10px;
		color: var(--text-secondary);
	}
	.correct {
		font-size: 18px;
		font-weight: 600;
		margin: 20px 0;
		color: var(--success);
	}
	.incorrect {
		font-size: 18px;
		font-weight: 600;
		margin: 20px 0;
		color: var(--error);
	}
	.remarks {
		margin-top: 10px;
	}
	.wrapper {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		max-width: 1610px;
		width: 100%;
		margin: 0 auto;
		position: sticky;
		top: 60px;
		max-height: 12000000vh;
	}
	table {
		width: 100%;
		border-collapse: collapse;
	}

	th {
		font-size: 14px;
		text-align: left;
		font-weight: 400;
		color: var(--text-secondary);
		background-color: var(--surface);
	}
	.status {
		width: 52px;
	}
	.viewresults {
		width: 20ch;
	}
	.title {
		width: calc(100% - 52px - 40ch - 20ch - 20ch - 10ch - 20ch);
	}

	.marks {
		width: 10ch;
		margin-left: auto;
	}
	/* Hide scrollbar */
	::-webkit-scrollbar {
		display: none;
	}
	.start {
		width: 20ch;
	}
	.end {
		width: 20ch;
	}
	thead,
	tbody {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	thead {
		background-color: var(--surface);
		position: sticky;
		top: 0;
	}
	th {
		display: flex;
		align-items: center;
	}
	tbody {
		height: 100%;
		min-height: 100vh;
	}
	tr {
		width: 100%;
		height: 50px;
		display: flex;
		gap: 20px;
		font-size: 14px;
		font-weight: 400;
		padding: 10px 20px;
		color: var(--text-secondary);
	}
	tr td {
		font-size: 14px;
		text-align: left;
		display: flex;
		font-weight: 400;
		color: var(--text-secondary);
		align-items: center;
	}
	tbody tr {
		cursor: pointer;
	}
	tbody tr:nth-child(2n) {
		background-color: var(--surface);
	}
</style>
