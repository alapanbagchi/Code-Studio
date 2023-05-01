<script>
	import Button from '$lib/Shared/Button.svelte';
	import Input from '$lib/Shared/Input.svelte';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	const { form, handleChange, errors, touched, handleSubmit } = createForm({
		initialValues: {
			fullName: '',
			username: '',
			email: '',
			password: '',
			confirmPassword: ''
		},
		validationSchema: yup.object().shape({
			email: yup.string().email('Not a valid email').required('Email is required'),
			password: yup
				.string()
				.required('Password is required')
		}),
		onSubmit: (values) => {
			console.log(values);
		}
	});
</script>

<div class="wrapper">
	<div class="pagedetails">
		<h1>Welcome Back</h1>
		<p>Welcome back to Code_Studio. Login to continue solving challenging problems</p>
	</div>
	<form on:submit={handleSubmit}>
		<Input
			type="text"
			placeholder="Enter your email"
			label="Email"
			name="email"
			onChange={handleChange}
			required={true}
			value={$form.email}
			error={$errors.email}
		/>
		<Input
			type="password"
			placeholder="Enter your password"
			label="Password"
			name="password"
			onChange={handleChange}
			required={true}
			value={$form.password}
			error={$errors.password}
		/>
		<Button type="submit">Login</Button>
	</form>
</div>

<style>
	.wrapper {
		width: 100%;
		height: 100%;
		min-height: calc(100vh - 64px);
		max-width: 500px;
		margin: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-top: -80px;
	}
	h1 {
		font-size: 1.4rem;
		font-weight: 600;
	}
	.pagedetails {
		display: flex;
		flex-direction: column;
		gap: 10px;
        margin-bottom: 20px;
		margin-top: 10px;
	}
	.pagedetails p {
		font-size: var(--font_small);
		font-weight: 400;
		line-height: 22px;
	}
</style>
