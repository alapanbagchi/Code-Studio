<script lang="ts">
	import Header from '$lib/Header/Header.svelte';
	import Notifications from '$lib/Notifications/Notifications.svelte';
	import { onMount } from 'svelte';
	import './global.css';
	import { user } from '$lib/stores/userStore';
	import API from '../utils/API';
	import { page } from '$app/stores';
	import type { PageData} from './$types';
	export let data: PageData;
	onMount(async () => {
		try {
			$user = data.user
		} catch (err: any) {
			$user = {
				_id: '',
				fullName: '',
				username: '',
				email: '',
				isAdmin: false,
				pfp: '',
				isLoggedIn: false
			};
		}
	});

	$: console.log($page.url.pathname.includes('practice') && $page.params ? 'fullwidth' : '');
</script>

<div class="headercontainer">
	<div
		class="headerWrapper {$page.url.pathname.includes('practice') && $page.params.id
			? 'fullwidth'
			: ''}"
	>
		<Header />
	</div>
</div>
<slot />
<Notifications />

<style>
	.headercontainer {
		width: 100%;
		border-bottom: var(--border);
	}
	.headerWrapper {
		max-width: 1670px;
		margin-left: auto;
		margin-right: auto;
		padding: 0 30px;
	}
	.fullwidth {
		max-width: 100%;
	}
</style>
