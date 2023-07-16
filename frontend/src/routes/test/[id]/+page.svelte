<script lang="ts">
	import { onMount } from 'svelte';
	import API from '../../../utils/API';
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores/userStore';
	import { page } from '$app/stores';

	let test: any = {};
    let time = 0;
    let timeLeft = 0;
    let formattedTime = '';
	onMount(()=>{
		const canGiveTest = new Date(test.startDate).getTime() > new Date().getTime() ||
							new Date(test.endDate).getTime() < new Date().getTime()
		if(!canGiveTest) goto(`/test/`)
	})
	onMount(async () => {
		await API.get(`/test/${$page.params.id}`).then((res) => {
			test = res.data;
		});
        time = new Date(test.endDate).getTime() - new Date().getTime();
        timeLeft = time;
        setInterval(() => {
            timeLeft -= 1000;
            if (timeLeft < 0) {
                formattedTime = '0:0:0';
                return;
            }
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            formattedTime = `${hours}:${minutes}:${seconds}`;
        }, 1000);
	});
</script>

<div class="wrapper">
	{#if test?.problems}
		<table>
			<div class="testdetails">
				<div class="details">
					<h1 class="title">{test.title}</h1>
					<p class="examiner">{test.examiner}</p>
				</div>
                <div class="clock">
                    <p>Time left</p>
                    <p>{formattedTime}</p>
                </div>
			</div>
			<thead>
				<tr>
					<th class="status">Status</th>
					<th class="title">Title</th>
					<th class="marks">Marks</th>
					<th class="start">Start Time</th>
					<th class="end">End Time</th>
					<th class="examiner">Examiner</th>
				</tr>
			</thead>
			<tbody>
				{#each test.problems as problem}
					<tr on:click={() => goto(`/test/${$page.params.id}/${problem._id}`)}>
						<td class="status">
							<span class="material-symbols-rounded">
								{
									test.users.find((u)=>u.id === $user._id)?.problem_id.includes(problem._id) ?
									'Check' : ''
								}
							</span>
						</td>
						<td class="title">{problem.title}</td>
						<td class="marks">{problem.marks}</td>
						<td class="start">
							{new Date(test.startDate).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}
						</td>
						<td class="end">
							{new Date(test.endDate).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}
						</td>
						<td class="examiner">{test.examiner}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>

<style>
    .testdetails{
        display: flex;
        justify-content: space-between;
        margin: 40px 0;
    }
    .examiner{
        font-size: 14px;
        font-weight: 400;
        color: var(--text-secondary);
        margin-top: 10px;
    }
    .details .title{
        font-size: 24px;
        font-weight: 500;
		width: 100%;
        color: var(--text-primary);
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
	.examiner {
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
