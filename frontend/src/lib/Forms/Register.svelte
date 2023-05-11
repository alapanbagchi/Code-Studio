<script lang="ts">
	import Button from '$lib/Shared/Button.svelte';
	import Input from '$lib/Shared/Input.svelte';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import API from '../../utils/API';
	import { userRegistration } from '$lib/stores/userRegistration';
	import { notification } from '$lib/Notifications/notifications';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/userStore';

	onMount(async () => {
		if($user.isLoggedIn) goto('../');
	});

	const { form, handleChange, errors, touched, handleSubmit, isSubmitting } = createForm({
		initialValues: {
			fullName: 'Alapan Bagchi',
			username: 'alapan',
			email: 'alapanbagchi.personal@gmail.com',
			password: 'Madv1lla1n_Dash1ng',
			confirmPassword: 'Madv1lla1n_Dash1ng'
		},
		validationSchema: yup.object().shape({
			fullName: yup.string().required('Full name is required'),
			username: yup.string().required('Username is required'),
			email: yup.string().email('Not a valid email').required('Email is required'),
			password: yup
				.string()
				.required('Password is required')
				.min(10, 'Password must be at least 10 characters long')
				.max(50, 'Password must be shorter than 50 characters')
				.matches(/(?=.*[A-Z])/, 'Password must contain one uppercase letter')
				.matches(/(?=.*[a-z])/, 'Password must contain one lowercase letter')
				.matches(/(?=.*[0-9])/, 'Password must contain one number')
				.matches(/(?=.*[!@#$%_^&*])/, 'Password must contain one special character'),
			confirmPassword: yup
				.string()
				.required('Confirm password is required')
				.oneOf([yup.ref('password')], 'Passwords must match')
		}),
		onSubmit: async (values) => {
			try {
				const res = await API.post('/user/verify/send', {
					email: values.email
				});
				$userRegistration = {
					...$userRegistration,
					...values
				};
				$userRegistration.step = 1;
				$userRegistration.timeToWaitForNextOTP = res.time;
				
			} catch (err: any) {
				$notification = {
					type: 'ERROR',
					title: 'Something went wrong',
					message: err.response.data.message
				};
			}
		}
	});
</script>

<form on:submit={handleSubmit}>
	<Input
		type="text"
		placeholder="Enter your full name"
		label="Full Name"
		name="fullName"
		onChange={handleChange}
		required={true}
		value={$form.fullName}
		error={$errors.fullName}
	/>
	<Input
		type="text"
		placeholder="Enter your username"
		label="Username"
		name="username"
		onChange={handleChange}
		required={true}
		value={$form.username}
		error={$errors.username}
	/>
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
	<Input
		type="password"
		placeholder="Confirm your password"
		label="Confirm Password"
		name="confirmPassword"
		onChange={handleChange}
		required={true}
		value={$form.confirmPassword}
		error={$errors.confirmPassword}
	/>
	<Button isSubmitting={$isSubmitting} type="submit">
		<p>Next</p>
	</Button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-width: 100%;
	}
</style>
