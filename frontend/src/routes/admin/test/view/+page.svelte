<script lang="ts">
	import { onMount } from 'svelte';
	import API from '../../../../utils/API';
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores/userStore';
	import Ide from '$lib/IDE/IDE.svelte';
	import Button from '$lib/Shared/Button.svelte';
	import Input from '$lib/Shared/Input.svelte';
	import MarkTest from '$lib/Forms/MarkTest.svelte';

	let tests: any[] = [];
	let students: any[] = [];
	let studentSubmissions: any[] = [];
	let showDropdown = -1;
	onMount(() => {
		API.get('/test').then((res) => {
			tests = res.data;
			console.log(res);
		});
	});

	const fetchAllStudents = async (testid: number) => {
		const res = await API.get(`/test/${testid}/students`);
		students = res.data;
		console.log(students);
	};
	const fetchStudentData = async (testid: number, studentid: number) => {
		const res = await API.get(`/test/${testid}/student/${studentid}`);
		studentSubmissions = [...studentSubmissions, ...res.data];
		console.log(studentSubmissions);
	};


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
			</tr>
		</thead>
		<tbody>
			{#each tests as test, index}
				<tr
					on:click={async () => {
						await fetchAllStudents(test._id);
						showDropdown != 1 ? (showDropdown = index) : (showDropdown = -1);
					}}
					style:opacity={new Date(test.endDate).getTime() > new Date().getTime() ? 0.5 : 1}
					style = "cursor: {new Date(test.endDate).getTime() > new Date().getTime() ? 'not-allowed' : 'auto' }; pointer-events: {new Date(test.endDate).getTime() > new Date().getTime() ? 'none' : 'pointer' }"
				>
					<td class="status">
						<span class="material-symbols-rounded"
							>{new Date(test.endDate).getTime() < new Date().getTime()
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
				</tr>
				{#if showDropdown === index}
					<div class="dropdown">
						{#each students as student}
							<div
								on:click={() => fetchStudentData(test._id, student.id)}
								on:keydown={() => fetchStudentData(test._id, student.id)}
								class="student"
							>
								<div class="pfp">
									{$user.fullName[0]}
								</div>
								<div class="details">
									<div class="name">{student.name}</div>
									<div class="username">{student.username}</div>
								</div>
							</div>
							{#if studentSubmissions.length > 0}
								{#each test.problems as problem}
									<div class="studentresults">
										<p>{problem.title} - {
											studentSubmissions.find(
												(submission) => submission.problem_id === problem._id
											)?.passed ? 'Passed' : 'Failed'
										}</p>
										<div>
											<Ide
												readonly={true}
												value={studentSubmissions.find(
													(submission) => submission.problem_id === problem._id
												)?.code}
											/>
										</div>
										<MarkTest problem={problem} test={test} user_id={
											studentSubmissions[0].user_id
										} />
									</div>
								{/each}
							{/if}
						{/each}
					</div>
				{/if}
			{/each}
		</tbody>
	</table>
</div>

<style>
	.student {
		display: flex;
		align-items: center;
		gap: 20px;
		padding: 5px 20px;
	}
	.testDetails {
		display: flex;
		align-items: center;
		gap: 20px;
		padding: 5px 20px;
		margin-left: auto;
	}
	.btngroup{
		display: flex;
		gap: 10px;
	}
	.student .pfp {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: var(--primary);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20px;
		font-weight: 500;
		color: var(--text-secondary);
	}
	.studentresults {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 10px 20px;
		background-color: var(--surface);
		border: var(--border);
	}
	.dropdown {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 10px 0;
		background-color: var(--surface);
		border: var(--border);
	}
	.username {
		font-size: 14px;
		font-weight: 400;
		color: var(--text-secondary);
	}
	.wrapper {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		max-width: 1610px;
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
	.title {
		width: calc(100% - 52px - 40ch - 20ch - 20ch);
	}
	.tags {
		width: 40ch;
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
