<script lang="ts">
	import Button from '$lib/Shared/Button.svelte';
	import OtpInput from '$lib/Shared/OTPInput.svelte';
	import { userRegistration } from '$lib/stores/userRegistration';
	import { createEventDispatcher, tick } from 'svelte';
	import API from '../../utils/API';
	import { notification } from '$lib/Notifications/notifications';
	import { goto } from '$app/navigation';
	interface IInputValue {
		completevalue: string;
		isInputComplete: boolean;
	}
	export let numberOfInputs = 6;
	export let initialValue = '';
	export let placeholder = '';
	export let maskInput = false;
	export let autoFocusNextOnInput = true;
	export let focusPreviousOnDelete = true;
	export let emitEventOnPrefill = true;
	let timeToWaitForNextOTP = new Date($userRegistration.timeToWaitForNextOTP) || 0;
	let timeLeft = 0;
	let timer: any = null;
	let displayTimeLeft = '00:00';
	if (timeToWaitForNextOTP) {
		const expirationTime = new Date(timeToWaitForNextOTP.getTime() + 600000); // add 10 minutes (600,000 milliseconds) to OTP sent time
		timeLeft = expirationTime.getTime() - new Date().getTime();
		if (timeLeft > 0) {
			timer = setInterval(() => {
				timeLeft -= 1000;
				const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
				const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
				displayTimeLeft = `${minutes < 10 ? `0${minutes}` : minutes}:${
					seconds < 10 ? `0${seconds}` : seconds
				}`;
				if (minutes == 0 && seconds == 0) {
					clearInterval(timer);
				}
			}, 1000);
		}
	}

	function getComponents(): {
		componentIndex: string;
		ref: any | null;
		initialValue: string;
		placeholder: string;
	}[] {
		return Array.from(Array(numberOfInputs).keys()).map((i: number) => {
			const initVal = initialValue[i] || '';
			const initPlaceholder = placeholder[i] || '';
			return {
				componentIndex: `otp${i}`,
				ref: null,
				initialValue: initVal,
				placeholder: initPlaceholder
			};
		});
	}

	function checkValidity(
		doNotify: boolean,
		extrakeys: { [x: string]: any } = {}
	): IInputValue | void {
		let completevalue = '';
		let isInputComplete = true;
		components.forEach((i: { [x: string]: any }) => {
			/* eslint-disable */
			let value: string = `${i?.ref?.$$?.ctx[0]}` as string;
			/* eslint-enable */
			if (!value) {
				isInputComplete = false;
			}
			completevalue += value || ' ';
		});

		let returnObj = {
			completevalue,
			isInputComplete: isInputComplete && completevalue.length === numberOfInputs
		};
		if (extrakeys) {
			returnObj = {
				...returnObj,
				...extrakeys
			};
		}
		if (doNotify) {
			dispatch('notify', returnObj);
		} else {
			return returnObj;
		}
	}

	let components = getComponents();

	$: {
		/* eslint-disable */
		async function prefillValueOnInitialValueChange(): Promise<void> {
			if (initialValue !== undefined && initialValue.trim().length > 0) {
				components = getComponents();
				await tick();
				if (emitEventOnPrefill) {
					checkValidity(true, { onValueUpdateOrPrefill: true });
				}
			}
		}
		prefillValueOnInitialValueChange();
		/* eslint-enable */
	}

	const dispatch = createEventDispatcher<{
		notify: IInputValue;
	}>();

	export const getValue = (): IInputValue => {
		return checkValidity(false) as IInputValue;
	};

	const handleChange = (currentElement: string, event: InputEvent): void => {
		const isDeleteEvent = event.inputType === 'deleteContentBackward';
		const currentIndex = components.findIndex((i) => i.componentIndex === currentElement);
		let nextIndex;

		if (isDeleteEvent && focusPreviousOnDelete) {
			nextIndex = currentIndex === 0 ? 0 : currentIndex - 1;
			/* eslint-disable */
			const nextRef: { [x: string]: any } = components[nextIndex]?.ref;
			nextRef?.$$?.ctx[6]?.focus();
			/* eslint-enable */
		}

		if (!isDeleteEvent && autoFocusNextOnInput) {
			nextIndex = currentIndex < components.length - 1 ? currentIndex + 1 : currentIndex;
			/* eslint-disable */
			const nextRef: { [x: string]: any } = components[nextIndex].ref;
			nextRef?.$$?.ctx[6]?.focus();
			/* eslint-enable */
		}

		checkValidity(true);
	};
	let registerIsLoading = false;
	let resendIsLoading = false;
	const register = async () => {
		try {
			if (!getValue().isInputComplete) return;
			registerIsLoading = true;
			const res = await API.post('/user/verify', {
				email: $userRegistration.email,
				otp: getValue().completevalue
			});
			registerIsLoading = false;
			goto('../login');
			$notification = {
				type: 'SUCCESS',
				title: 'Registration successful',
				message: res.message
			};
		} catch (err: any) {
			registerIsLoading = false;
			$notification = {
				type: 'ERROR',
				title: 'OTP couldnt be verified',
				message: err.response.data.message
			};
		}
		const res = await API.post('/user/register', {
			fullName: $userRegistration.fullName,
			email: $userRegistration.email,
			password: $userRegistration.password,
			confirmPassword: $userRegistration.confirmPassword,
			username: $userRegistration.username
		});
		registerIsLoading = false;
	};

	const resendOTP = async () => {
		try {
			resendIsLoading = true;
			const res = await API.post('/user/verify/send', { email: $userRegistration.email });
			timeToWaitForNextOTP = res.time;
			resendIsLoading = false;
		} catch (err) {
			resendIsLoading = false;
			console.log(err);
		}
	};
</script>

<div class="container">
	<div class="wrapper">
		{#each components as comp, index}
			<div class="row">
				<OtpInput
					value={comp.initialValue}
					componentIndex={comp.componentIndex}
					{handleChange}
					placeholder={comp.placeholder}
					bind:this={comp.ref}
					{maskInput}
					dataAttr={`elem-${index}`}
				/>
			</div>
		{/each}
	</div>
	<div class="buttons">
		<Button
			type="button"
			onClick={register}
			on:click={() => {
				checkValidity(true);
			}}
			isSubmitting={registerIsLoading}
		>
			Register
		</Button>
		<Button
			type="button"
			onClick={resendOTP}
			disabled={displayTimeLeft != '00:00'}
			variant="secondary"
			isSubmitting={resendIsLoading}
		>
			{#if displayTimeLeft != '00:00'}
				<p>Resend OTP in {timeToWaitForNextOTP ? displayTimeLeft : 0}</p>
			{:else}
				<p>Resend OTP</p>
			{/if}
		</Button>
	</div>
</div>

<style>
	.container {
		display: flex;
		gap: 10px;
		width: 100%;
		flex-direction: column;
	}
	.wrapper {
		display: flex;
		gap: 10px;
	}
	.row {
		width: 80px;
		width: 80px;
	}
	.buttons {
		margin-top: 20px;
		display: flex;
		gap: 10px;
		flex-direction: column;
	}
</style>
