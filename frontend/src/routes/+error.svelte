<script>
	import { page } from '$app/stores';
</script>

<div class="container">
	<h1>404 ERROR OCCURED</h1>
    {$page.error?.message}
</div>

<style>
	.container {
		display: flex;
        flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
		color: var(--text-secondary);
	}
	h1 {
		font-size: 50px;
		font-weight: 500;
	}
</style>
