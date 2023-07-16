<script lang="ts">
	import { onMount } from "svelte";
	import API from "../../utils/API";
	import { user } from "$lib/stores/userStore";
	import { redirect } from "@sveltejs/kit";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";

    let isAdmin = false

    onMount(async ()=>{
        if(!$user.isLoggedIn){
            const user = await API.get('/user/me')
            $user = {
                ...user.data,
                isLoggedIn: true
            }
        }
        if(!$user.isAdmin){
            goto('../')
        } else {
            isAdmin = true
        }
    })

    $: console.log($user)
</script>

<div class="header">
    <ul>
        <li>
            <a class="{$page.url.pathname === '/admin/practice/add' ? 'active' : ''}" href="{$page.url.origin}/admin/practice/add">Add Practice Problems</a>
        </li>
        <li>
            <a href="{$page.url.origin}/admin/practice/edit">Edit Practice Problems</a>
        </li>
        <li>Start a Test</li>
        <li>Test Details</li>
        <li>Users</li>
    </ul>
</div>
{#if isAdmin}
    <slot />
{/if}

<style>
    .header {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        border-bottom: var(--border);
        padding: 0 30px;
    }
    .active{
        color: var(--primary);
        font-weight: 500;
    }
    .header ul {
        display: flex;
        align-items: center;
        width: 100%;
        list-style: none;
        gap: 20px;
        max-width: 1610px;
    }
    li{
        font-size: 14px;
        font-weight: 400;
        padding: 20px 0;
        border-radius: 10px;
        cursor: pointer;
        color: var(--text-secondary);
        transition: all 0.2s ease-in-out;
    }
    li:hover {
        color: var(--text-primary);
    }
</style>