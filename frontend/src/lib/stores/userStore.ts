import { writable } from "svelte/store";

export const user: any = writable({
    pfp: "",
    fullName: "",
    username: "",
    email: "",
    isAdmin: false,
    _id: "",
    isLoggedIn: false
})