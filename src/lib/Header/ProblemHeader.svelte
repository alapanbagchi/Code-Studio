<header>
	<nav class="nav back">
		<ul class="navlist">
			<li class="w_50">
				<h1 class="problemTitle">Good Turn</h1>
			</li>
			<li class="controls">
				<a href="#" class="control">
					<p>Previous Problem</p>
				</a>
				<a href="#" class="control">
					<p>Next Problem</p>
				</a>
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 30px;
		margin-left: auto;
		margin-right: auto;
		position: sticky;
		top: 64px;
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
		gap: 20px;
		width: 100%;
	}
	.back {
		display: flex;
		align-items: center;
		gap: 30px;
	}
	.active {
		color: var(--navbar_link_active) !important;
	}
	.problemTitle {
		font-weight: 500;
		font-size: 1.2rem;
	}
	.successRate {
		font-weight: 400;
		font-size: 0.8rem;
		margin-left: 10px;
		margin-top: 2px;
	}
	.controls {
		display: flex;
		width: fit-content;
		margin-left: auto;
		gap: 20px;
	}

	.control {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 5px;
		border-radius: 5px;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
		font-size: 14px;
	}
	.control:hover {
		color: var(--navbar_link_active);
	}
	.w_50 {
		width: 50%;
	}
</style>
