<script lang="ts">
	import { goto } from '$app/navigation';
	import Checkbox from '$lib/Shared/Checkbox.svelte';
	import Input from '$lib/Shared/Input.svelte';
	let searchTerm = '';

	let allTopics = [
		'Strings',
		'Array',
		'Hash Table',
		'Linked List',
		'Graph',
		'Trees',
		'Greedy Algorithm',
		'Dynamic Programming'
	];
</script>

<div class="container">
	<div class="filter">
		<div class="search">
			<Input
				type="text"
				placeholder="Search"
				value={searchTerm}
				on:input={(e) => (searchTerm = e.target.value)}>Search</Input
			>
		</div>
		<div class="options">
			<div class="block">
				<p class="filterheader">Filter by Categories</p>
				{#each allTopics as topic}
					<div class="opacityreduce">
						<Checkbox text={topic} name={topic} />
					</div>
				{/each}
			</div>
			<div class="block">
				<p class="filterheader">Filter by Difficulty</p>
				<div class="opacityreduce">
					<Checkbox text="Easy" name="easy" />
				</div>
				<div class="opacityreduce">
					<Checkbox text="Medium" name="medium" />
				</div>

				<div class="opacityreduce">
					<Checkbox text="Hard" name="hard" />
				</div>
			</div>
			<div class="block">
				<p class="filterheader">Filter by Status</p>
				<div class="opacityreduce">
					<Checkbox text="Completed" name="completed" />
				</div>
				<div class="opacityreduce">
					<Checkbox text="Attempted" name="attempted" />
				</div>

				<div class="opacityreduce">
					<Checkbox text="Undone" name="undone" />
				</div>
			</div>
		</div>
	</div>
	<div class="list">
		<h1>Practice Problems</h1>
		<table>
			<thead>
				<tr>
					<th class="status">Status</th>
					<th class="title">Title</th>
					<th class="tags">Tags</th>
					<th class="difficulty">Difficulty</th>
					<th class="submissions">Acceptance</th>
				</tr>
			</thead>
			<tbody>
				{#each Array(20) as _}
					<tr on:click={()=>goto('practice/123')}>
						<td class="status"><img width="30px" src="/icons/solved.svg" alt="" /></td>
						<td class="title">Two Sum</td>
						<td class="tags">Array, Hash Table</td>
						<td class="difficulty">Easy</td>
						<td class="submissions">100%</td>
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
	.filter {
		display: flex;
		flex-direction: column;
		margin-bottom: 20px;
		width: 350px;
		height: calc(100vh - 90px);
		overflow: hidden;
		border-right: var(--border);
		padding: 20px 20px 0 0;
	}
	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: 20px;
		margin-left: 20px;
		height: calc(100vh - 90px);
		overflow: hidden;
		overflow: auto;
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
    tbody tr{
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
