<script>
	import Button from '$lib/Shared/Button.svelte';
	import { user } from '$lib/stores/userStore';
</script>

<section class="hero">
	<h1>Learn Coding Easily on Code Studio</h1>
	<p>
		Code Studio is a platform for students to learn coding easily. It provides a simple and easy to
		use interface for students to learn coding. It also provides a platform for teachers to create
		tests for students to take and view the results of the test.
	</p>
	<div class="btns">
		{#if $user.isLoggedIn}
			<Button>
				<a href="/practice">Solve Practice Problems</a>
			</Button>
			<Button variant="secondary">
				<a href="/test">Give Tests</a>
			</Button>
		{:else}
			<Button>
				<a href="/register">Register</a>
			</Button>
			<Button variant="secondary">
				<a href="/login">Login</a>
			</Button>
		{/if}
	</div>
	<div class="images">
		<div class="image left">
			<img src="hero2.png" alt="" />
		</div>
		<div class="image main">
			<img src="hero1.png" alt="" />
		</div>
		<div class="image right">
			<img src="hero3.png" alt="" />
		</div>

	</div>
</section>

<style>
	.hero {
		height: calc(100vh - 60px);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
        overflow: hidden;
	}
	.hero h1 {
		font-size: 3rem;
		font-weight: 500;
		color: var(--text-primary);
		text-align: center;
	}
	.hero p {
		font-size: 1rem;
		color: var(--text-secondary);
		text-align: center;
		line-height: 30px;
		margin-top: 20px;
		max-width: 1200px;
	}
	.btns {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20px;
		gap: 10px;
	}
	.images {
        padding-top: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20px;
		gap: 10px;
		overflow: hidden;
	}
    .image{
        width: 100%;
        height: 100%;
        border: 2px solid var(--primary);
        border-radius: 20px;
        overflow: hidden;
    }
	.images img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
    .main{
    }
    .left{
        border: 1px solid var(--secondary);
    }
    .right{
        border: 1px solid var(--secondary);
    }
</style>
