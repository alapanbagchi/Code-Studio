<script lang="ts">
	import Button from '$lib/Shared/Button.svelte';
	import Input from '$lib/Shared/Input.svelte';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import API from '../../utils/API';
	import { user } from '$lib/stores/userStore';
	import { notification } from '$lib/Notifications/notifications';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(async () => {
		if($user.isLoggedIn) goto('../');
	});

	const { form, handleChange, errors, touched, handleSubmit, isSubmitting } = createForm({
		initialValues: {
			fullName: '',
			username: '',
			email: '',
			password: '',
			confirmPassword: ''
		},
		validationSchema: yup.object().shape({
			email: yup.string().email('Not a valid email').required('Email is required'),
			password: yup.string().required('Password is required')
		}),
		onSubmit: async (values) => {
			try {
				const res = await API.post('/user/login', {
					email: values.email,
					password: values.password
				});
			} catch (err: any) {
				$notification = {
					title: 'Login Failed',
					type: 'ERROR',
					message: err.response.data.message
				};
			}
			try {
				const res = await API.get('/user/me');
				$user = {
					_id: res.data._id,
					fullName: res.data.fullName,
					username: res.data.username,
					email: res.data.email,
					isAdmin: res.data.isAdmin,
					pfp: res.data.pfp,
					isLoggedIn: true
				};
				await goto('../');
				location.reload();
			} catch (err: any) {
				$notification = {
					title: 'Login Failed',
					type: 'ERROR',
					message: err.response.data.message
				};
			}
		}
	});
</script>

<form on:submit={handleSubmit} action="?/login">
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
	<Button isSubmitting={$isSubmitting} type="submit">Login</Button>
</form>
