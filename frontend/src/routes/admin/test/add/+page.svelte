<script lang="ts">
	import Button from '$lib/Shared/Button.svelte';
	import Dropdown from '$lib/Shared/Dropdown.svelte';
	import Input from '$lib/Shared/Input.svelte';
	import TextArea from '$lib/Shared/TextArea.svelte';
	import type { PageServerData } from '../../add/practice/$types';
	import { fieldProxy, superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { validReturnTypes } from '../../../../utils/validReturnType';
	import AddPracticeProblems from '$lib/Forms/AddPracticeProblems.svelte';
	import AddTest from '$lib/Forms/AddTest.svelte';
	export let data: PageServerData;
</script>

<div class="container">
	<AddTest />
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		min-height: calc(100vh - 65px);
		max-width: 1670px;
		margin-left: auto;
		margin-right: auto;
		padding: 30px;
	}

	form {
		margin-left: auto;
		margin-right: auto;
		max-width: 1000px;
		color: var(--text-primary);
	}
	.sectionheader {
		margin: 30px 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.count {
		font-size: 22px;
		font-weight: 500;
		color: var(--text-secondary);
		opacity: 0.6;
		margin-bottom: 15px;
	}
	.sectionheader h2 {
		font-size: 20px;
		font-weight: 500;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.block {
		display: flex;
		flex-direction: column;
		border: var(--border);
		padding: 20px 30px;
		border-radius: 10px;
	}
	.remove {
		align-self: flex-end;
	}
	.inputs {
		display: flex;
		gap: 50px;
	}
	.seperation {
		margin-top: 25px;
	}
</style>
