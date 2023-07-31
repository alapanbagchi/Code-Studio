<script lang="ts">
	import { onMount } from 'svelte';
	import API from '../../utils/API';
	import { user } from '$lib/stores/userStore';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let isAdmin = false;

	onMount(async () => {
		if (!$user.isLoggedIn) {
			const user = await API.get('/user/me');
			$user = {
				...user.data,
				isLoggedIn: true
			};
		}
        if($user.isAdmin) isAdmin = true;
	});
	$: console.log($user);
</script>


{#if isAdmin}
	<slot />
{/if}


