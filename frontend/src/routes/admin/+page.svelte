<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/userStore';
	import API from '../../utils/API';
	import { page } from '$app/stores';

	let tests: any[] = [];
	let students: any[] = [];
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
        console.log(res);
    }
</script>

<div class="header">
	<ul>
		<li>
			<a
				class={$page.url.pathname === '/admin/practice/add' ? 'active' : ''}
				href="{$page.url.origin}/admin/practice/add"
			>
				<p class="title">Add Practice Problems</p>
				<p class="description">Add a practice problem to Code Studio for users to solve</p>
			</a>
		</li>
		<li>
			<a href="{$page.url.origin}/admin/practice/edit">
				<p class="title">Edit Practice Problems</p>
				<p class="description">
					Found a mistake in a practice problem you added? Edit it to fix the issue
				</p></a
			>
		</li>
		<li>
			<a href="{$page.url.origin}/admin/test/add">
				<p class="title">Start Test</p>
				<p class="description">
					Start a test for students to take. You can also set a time limit for the test
				</p>
			</a>
		</li>
		<li>
			<a href="{$page.url.origin}/admin/test/view">
				<p class="title">View Tests</p>
				<p class="description">
					View all the tests you have created and see the answers of each student
				</p>
			</a>
		</li>
	</ul>
</div>

<style>
	.header {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: calc(100vh - 60px);
		padding: 0 30px;
	}
	.active {
		color: var(--primary);
		font-weight: 500;
	}
	.title {
		font-size: 1.4rem;
	}
	.description {
		font-size: 1rem;
		color: var(--text-secondary);
		margin-top: 20px;
	}
	.header ul {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		justify-content: center;
		align-items: center;
		width: 100%;
		list-style: none;
		gap: 20px;
		max-width: 1610px;
	}
	li {
		width: 100%;
		border: var(--border);
		font-size: 14px;
		font-weight: 400;
		padding: 40px 60px;
		border-radius: 10px;
		cursor: pointer;
		color: var(--text-secondary);
		transition: all 0.2s ease-in-out;
	}
	li:hover {
		color: var(--text-primary);
	}
</style>
