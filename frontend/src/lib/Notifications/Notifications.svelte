<script lang="ts">
	import { onDestroy } from 'svelte';
	import { notification } from './notifications';

	export let ms = 30;
	let timeout: any;
	let width = 0;
	const onMessageChange = (message: any, ms: any) => {
		if (message != '') {
			width = 100;
			clearTimeout(timeout);
			//Set Interval to reduce width to 0
			if (ms > 0) timeout = setInterval(() => (width != 0 ? width-- : null), ms);
		}
	};
	$: onMessageChange($notification.message, ms);
	onDestroy(() => clearTimeout(timeout));

	const icon = (type: string) => {
		if (type === 'WARNING')
			return {
				icon: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800px' height='800px' viewBox='0 0 24 24' fill='none'%3E%3Crect width='24' height='24' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11 13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13V10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10V13ZM13 15.9888C13 15.4365 12.5523 14.9888 12 14.9888C11.4477 14.9888 11 15.4365 11 15.9888V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V15.9888ZM9.37735 4.66136C10.5204 2.60393 13.4793 2.60393 14.6223 4.66136L21.2233 16.5431C22.3341 18.5427 20.8882 21 18.6008 21H5.39885C3.11139 21 1.66549 18.5427 2.77637 16.5431L9.37735 4.66136Z' fill='%23ED6D00'/%3E%3C/svg%3E`,
				color: '#ED6D00'
			};
		if (type === 'SUCCESS'){
			return {
				icon: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800px' height='800px' viewBox='0 0 1024 1024' class='icon'%3E%3Cpath fill='%2303A08C' d='M512 64a448 448 0 110 896 448 448 0 010-896zm-55.808 536.384l-99.52-99.584a38.4 38.4 0 10-54.336 54.336l126.72 126.72a38.272 38.272 0 0054.336 0l262.4-262.464a38.4 38.4 0 10-54.272-54.336L456.192 600.384z'/%3E%3C/svg%3E`,
				color: '#03A08C'
			}
		}
		if(type === "ERROR") {
			return {
				icon : `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' fill='%23F75936' height='800px' width='800px' version='1.1' id='Layer_1' viewBox='0 0 511.76 511.76' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpath d='M436.896,74.869c-99.84-99.819-262.208-99.819-362.048,0c-99.797,99.819-99.797,262.229,0,362.048 c49.92,49.899,115.477,74.837,181.035,74.837s131.093-24.939,181.013-74.837C536.715,337.099,536.715,174.688,436.896,74.869z M361.461,331.317c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251 l-75.413-75.435l-75.392,75.413c-4.181,4.16-9.643,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251 c-8.341-8.341-8.341-21.845,0-30.165l75.392-75.413l-75.413-75.413c-8.341-8.341-8.341-21.845,0-30.165 c8.32-8.341,21.824-8.341,30.165,0l75.413,75.413l75.413-75.413c8.341-8.341,21.824-8.341,30.165,0 c8.341,8.32,8.341,21.824,0,30.165l-75.413,75.413L361.461,331.317z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`,
				color: '#F75936'
			}
		}
		if(type === "INFO") {
			return {
				icon : `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23877BF3' width='800px' height='800px' viewBox='-1 0 19 19' class='cf-icon-svg'%3E%3Cpath d='M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917zM9.64 5.78a1.136 1.136 0 1 0-1.136 1.135A1.136 1.136 0 0 0 9.64 5.781zm-.344 2.884a.792.792 0 1 0-1.583 0v5.203a.792.792 0 0 0 1.583 0z'/%3E%3C/svg%3E`,
				color: '#877BF3'
			}
		}
	};
</script>

<div class="wrapper {width == 0 ? 'hide' : ''}">
	<div
		class="container {$notification.type == 'SUCCESS'
			? 'greenbg'
			: $notification.type == 'ERROR'
			? 'redbg'
			: 'graybg'}"
	>
		<div class="content">
			<div class="icon">
				<img src={icon($notification.type)?.icon} alt="">
			</div>
			<div class="text">
				{#if $notification.title}
					<p style:color={icon($notification.type)?.color} class="title">{$notification.title}</p>
				{/if}
				<div class="description">
					{$notification.message}
				</div>
			</div>
		</div>
	</div>
	<slot />
</div>

<style>
	.wrapper {
		width: fit-content;
		height: fit-content;
		position: fixed;
		z-index: 99999999999999;
		bottom: 20px;
		right: 50px;
		background-color: var(--notification_background);
		border: var(--notification_border);
		border-radius: 7px;
	}
	.container {
		display: flex;
		width: 400px;
		max-width: 400px;
		z-index: 99999999999999;
		border-radius: 7px;
		display: flex;
		line-height: 25px;
		align-items: flex-start;
		flex-direction: column;
	}
	.title{
		font-weight: 600;
		font-size: 16px;
	}

	.greenbg {
		background-color: var(--green2);
	}
	.redbg {
		background-color: var(--red3);
	}
	.graybg {
		background-color: var(--gray4);
	}
	.content {
		width: 100%;
		display: flex;
		gap: 15px;
		padding: 20px 20px;
		align-items: flex-start;
	}
	.hide {
		opacity: 0;
		transition: all 0.3s ease-in-out;
	}
	.hide.wrapper {
		z-index: -1;
	}
	.icon {
		width: 25px;
		height: 25px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
	}
	.icon img{
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.description {
		font-size: 0.9rem;
		line-height: 24px;
		font-weight: 500;
		opacity: 0.8;
		color: #1c1c1c;
		display: flex;
		margin-top: 5px;
	}

	@media screen and (max-width: 768px) {
		.wrapper {
			width: 100%;
			right: 0;
		}
		.container {
			max-width: unset;
			width: 100%;
		}
	}
</style>
