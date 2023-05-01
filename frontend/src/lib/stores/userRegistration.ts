import { writable } from "svelte/store";

export const userRegistration = writable({
    step: 0,
    fullName: "",
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
});