<script>
	import Login from '$lib/Forms/Login.svelte';
</script>

<div class="wrapper">
	<div class="pagedetails">
		<h1>Admin Login</h1>
	</div>
	<Login />
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
        margin-bottom: 20px;
		margin-top: 10px;
	}
	.pagedetails p {
		font-size: 14px;
		color: var(--text-secondary);
		font-weight: 400;
		line-height: 22px;
	}
</style>
