<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let klass = '';
	export { klass as class };
	let textArea: HTMLTextAreaElement;
	export let value = '';
	export let CodeMirror: {
		fromTextArea: (element: any, options?: any) => any;
	};
	export let options: any = {};
	// Why initialize with null:
	// <Codemirror> was created without expected prop 'editor'
	export let editor: any = null;
	onMount(() => {
		editor = CodeMirror.fromTextArea(textArea, options);

		editor.on('change', (e: any) => {
			dispatch('change', e);
		});
		editor.on('scroll', (e: any) => {
			dispatch('scroll', e);
		});
	});
</script>

<div class={klass}>
	<textarea bind:this={textArea} {value} readonly />
</div>
