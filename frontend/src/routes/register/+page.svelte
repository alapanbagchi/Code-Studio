<script>
	import Register from '$lib/Forms/Register.svelte';
	import Verify from '$lib/Forms/Verify.svelte';
	import Button from '$lib/Shared/Button.svelte';
	import Input from '$lib/Shared/Input.svelte';
	import { userRegistration } from '$lib/stores/userRegistration';
	const steps = [
		{
			title: 'Create an account',
			description: 'Create an account with us to be able to solve problems'
		},
		{
			title: 'Verify your account',
			description: 'An email has been sent to your account. Please verify your account to continue'
		}
	];
</script>

<div class="wrapper">
	<div class="pagedetails">
		<h1>{steps[$userRegistration.step].title}</h1>
		<p>{steps[$userRegistration.step].description}</p>
	</div>
	{#if $userRegistration.step === 0}
		<Register />
	{:else if $userRegistration.step === 1}
		<Verify />
	{/if}
</div>

<style>
	.wrapper {
		width: 100%;
		height: 100%;
		min-height: calc(100vh - 64px);
		max-width: 504px;
		margin: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: var(--text-primary);
	}
	h1 {
		font-size: 1.4rem;
		font-weight: 600;
	}
	.pagedetails {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-bottom: 30px;
		margin-top: -80px;
	}
	.pagedetails p {
		font-size: var(--font_small);
		font-weight: 400;
		line-height: 22px;
		color: var(--text-secondary);
	}
</style>
