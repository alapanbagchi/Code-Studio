<script>
	import ProblemHeader from '$lib/Header/ProblemHeader.svelte';
	import Ide from '$lib/IDE/IDE.svelte';
	import Button from '$lib/Shared/Button.svelte';
	import Tabs from '$lib/Shared/Tabs.svelte';
</script>

<ProblemHeader />
<div class="container">
	<div class="problem">
		<div class=":block">
			<p class="description">
				Chef and Chefina are playing with dice. In one turn, both of them roll their dice at
				once.They consider a turn to be good if the sum of the numbers on their dice is greater than
				6. Given that in a particular turn Chef and Chefina got X and Y on their respective dice,
				find whether the turn was good.
			</p>
		</div>
		<div class="block">
			<p class="title">Input Format</p>
			<p class="description">
				The first line of input will contain a single integer T, denoting the number of test
				cases.Each test case contains two space-separated integers X and Y — the numbers Chef and
				Chefina got on their respective dice.
			</p>
		</div>
		<div class="block">
			<p class="title">Output Format</p>
			<p class="description">
				For each test case, output on a new line, YES, if the turn was good and NO otherwise.Each
				character of the output may be printed in either uppercase or lowercase. That is, the
				strings NO, no, nO, and No will be treated as equivalent.
			</p>
		</div>
		<div class="block">
			<p class="title">Sample 1</p>
		</div>
	</div>
	<div class="editor">
        <Ide />
		<div class="editorFooter">
			<div class="console">
				<Tabs />
			</div>
			<div class="controls">
				<div class="openConsole">
					<Button type="secondary">Console</Button>
				</div>
				<div class="submit">
					<Button type="secondary">Run</Button>
					<Button type="primary">Submit</Button>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		width: 100%;
		height: calc(100vh - 114px);
		padding: 0 30px;
	}
	.gutter {
		width: 10px;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 20px;
		cursor: col-resize;
		display: inline-block;
		user-select: none;
	}
	.problem {
		width: 50%;
		height: calc(100vh - 134px);
		overflow: auto;
		display: flex;
		flex-direction: column;
		gap: 40px;
		margin-top: 20px;
	}
	.problem::-webkit-scrollbar {
		display: none;
	}
	.editor {
		width: 50%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.block {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.title {
		font-size: 1.2rem;
		font-weight: 500;
	}
	.description {
		font-size: 14px;
		font-weight: 400;
		line-height: 22px;
	}

	.controls {
		display: flex;
		justify-content: space-between;
		gap: 20px;
		padding: 20px 0;
		width: 100%;
	}
	.submit {
		width: fit-content;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20px;
	}



</style>
