<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/Shared/Button.svelte';
	import { user } from '$lib/stores/userStore';
	console.log($user);
</script>

<header class="header">
	<nav class="nav">
		<ul class="navlist">
			<a href={$page.url.origin}>
				<li class="logo">
					<img width="40px" height="40px" src="/icons/logo.svg" alt="Code Studio Logo" />
					CODE_STUDIO
				</li>
			</a>

			<ul class="links">
				<li>
					<a href="/practice">Practice</a>
				</li>
				<li>
					<a href="/test">Test</a>
				</li>
				<li>
					{#if !$user.isLoggedIn}
						<a href="/login/admin">Admin Login</a>
					{/if}
					{#if $user.isAdmin}
						<a href="/admin">Admin</a>
					{/if}
				</li>
			</ul>
			<ul class="user">
				{#if $user.isLoggedIn}
					<div class="pfp">
						{#if $user.pfp}
							<img src={$user.pfp} alt="" />
						{:else}
							{$user.fullName[0]}
						{/if}
					</div>
				{:else}
					<a href="{$page.url.origin}/login">
						<Button variant="secondary">Log In</Button>
					</a>
					<a href="{$page.url.origin}/register">
						<Button variant="primary">Sign Up</Button>
					</a>
				{/if}
			</ul>
		</ul>
	</nav>
</header>

<style>
	.header {
		width: 100%;
		height: 64px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: auto;
		margin-right: auto;
	}
	.nav {
		width: 100%;
	}
	.navlist {
		display: flex;
		align-items: center;
		margin-left: auto;
		margin-right: auto;
	}
	.logo {
		display: flex;
		font-size: 16px;
		align-items: center;
		gap: 10px;
		font-weight: 600;
		color: var(--text-primary);
	}
	.links {
		display: flex;
		gap: 24px;
		margin-left: 44px;
	}
	.links li {
		font-size: 14px;
		color: var(--text-secondary);
		transition: all 0.3s ease;
		cursor: pointer;
	}
	.links li:hover {
		color: var(--text-primary);
		transition: all 0.3s ease;
	}
	.user {
		display: flex;
		margin-left: auto;
		gap: 8px;
	}
	.active {
		color: var(--navbar_link_active) !important;
	}

	.pfp {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: var(--primary);
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 400;
		font-size: 16px;
		color: var(--text-primary);
		border: 1px solid transparent;
		transition: all 0.3s ease;
	}
	.user {
		cursor: pointer;
	}
	.user:hover .pfp {
		border: 1px solid black;
		transition: all 0.3s ease;
	}
</style>
