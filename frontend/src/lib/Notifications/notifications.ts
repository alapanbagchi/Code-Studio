// stores.js
import { writable } from 'svelte/store'

export const notification = writable({
	title: "",
	message: '',
	type: ''
})
