<script lang="ts">
	import { goto } from '$app/navigation';
	import Checkbox from '$lib/Shared/Checkbox.svelte';
	import Input from '$lib/Shared/Input.svelte';
	import { user } from '$lib/stores/userStore';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import API from '../../../../utils/API';
	let problems: any[] = []
    onMount(async ()=>{
        const res = await API.get(`/problems`);
        problems = res.data;
    })
	let searchTerm = '';
	$: filteredProblems = problems;

    $: if (searchTerm) {
        filteredProblems = problems?.filter((problem: any) => {
            if (searchTerm && !problem.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }
            return true;
        });
    }


</script>

<div class="container">
	<div class="list">
		<div class="header">
			<h1>Practice Problems</h1>
			<div class="search">
				<Input
					type="text"
					placeholder="Search"
					value={searchTerm}
					onInput={(e) => (searchTerm = e.target?.value)}>Search</Input
				>
			</div>
		</div>
		<table>
			<thead>
				<tr>
					<th class="title">Title</th>
					<th class="tags">Tags</th>
					<th class="difficulty">Difficulty</th>
					<th class="submissions">Acceptance</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredProblems as problem}
					<tr on:click={() => goto(`edit/${problem._id}`)}>
						<td class="title">{problem.title}</td>
						<td class="tags">{problem.tags.join(',')}</td>
						<td class="difficulty"
							>{problem.difficulty.substring(0, 1) +
								problem.difficulty.substring(1).toLowerCase()}</td
						>
						<td class="submissions">
							{(problem.totalPassed / problem.totalSubmissions) * 100}%
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	.container {
		color: var(--text-primary);
		max-width: 1670px;
		margin-left: auto;
		margin-right: auto;
		padding: 0 30px;
		display: flex;
	}
	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: 20px;
		height: calc(100vh - 90px);
		overflow: hidden;
		overflow: auto;
	}
    .header {
        display: flex;
        justify-content: space-between;
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
		width: calc(100% - 52px - 20ch - 10ch - 20ch);
	}
	.tags {
		width: 20ch;
	}
	/* Hide scrollbar */
	::-webkit-scrollbar {
		display: none;
	}
	.difficulty {
		width: 10ch;
	}
	.submissions {
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
	.options {
		display: flex;
		flex-direction: column;
		gap: 40px;
	}
	.filterheader {
		padding: 0 0 15px 0;
		margin-bottom: 15px;
		border-bottom: var(--border);
		color: var(--text-secondary);
	}
	.opacityreduce {
		opacity: 0.8;
		transition: all 0.2s ease-in-out;
	}
	.opacityreduce:hover {
		opacity: 1;
	}
	.block {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	h1 {
		font-weight: 500;
		font-size: 24px;
		margin-bottom: 15px;
		color: var(--text-secondary);
	}
</style>
