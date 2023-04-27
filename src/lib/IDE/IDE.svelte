<script lang="ts">
    import type monaco from 'monaco-editor';
    import { onMount } from 'svelte';
    import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
    let divEl: HTMLDivElement;
    let editor: monaco.editor.IStandaloneCodeEditor;
    let Monaco;

    onMount(async () => {
        // @ts-ignore
        self.MonacoEnvironment = {
            getWorker: function (_moduleId: any, label: string) {
                return new editorWorker();
            }
        };

        Monaco = await import('monaco-editor');
        editor = Monaco.editor.create(divEl, {
            value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
            language: 'typescript',
			theme: 'vs-light',
			bracketPairColorization: {
				enabled: true,
				independentColorPoolPerBracketType: true,
			},
			tabSize: 4,
			automaticLayout: true,
			minimap: {
				enabled: false,
			}
        });

        return () => {
            editor.dispose();
        };
    });
</script>

<div bind:this={divEl} class="editor" />

<style>
	.editor {
		height: 100%;
		width: 100%;
	}
</style>
