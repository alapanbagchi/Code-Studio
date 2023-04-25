<script lang="ts">
	import Button from '$lib/Shared/Button.svelte';
</script>

<header class="header">
	<nav class="nav">
		<ul class="navlist">
			<li class="logo">
				<img width="40px" height="40px" src="/icons/logo.svg" alt="Code Studio Logo" />
				CODE_STUDIO
			</li>
			<ul class="links">
				<li>
					<a href="/learn">Learn</a>
				</li>
				<li>
					<a href="/practice">Practice</a>
				</li>
				<li>
					<a href="/test">Test</a>
				</li>
			</ul>
			<ul class="user">
				<Button type="secondary">Log In</Button>
				<Button type="primary">Sign Up</Button>
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
		padding: 0 30px;
		margin-left: auto;
		margin-right: auto;
		position: sticky;
		top: 0;
		backdrop-filter: saturate(180%) blur(5px);
		background: hsla(0, 0%, 100%, 0.8);
		border-bottom: 1px solid var(--navbar_border);
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
	}
	.links {
		display: flex;
		gap: 24px;
		margin-left: 44px;
	}
	.links li {
		font-weight: 500;
		font-size: 14px;
		color: var(--navbar_link);
		transition: all 0.3s ease;
		cursor: pointer;
	}
	.links li:hover {
		color: var(--navbar_link_hover);
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
</style>
