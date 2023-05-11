import { redirect } from '@sveltejs/kit';
import { user } from "$lib/stores/userStore";
import API from "../utils/API";


export const load = async () => {
    try{
        const res = await API.get("/user/me");
        return {
            user: {
                ...res.data,
                isLoggedIn: true
            }
        }
    } catch (err) {
        return {
            user: {
				_id: '',
				fullName: '',
				username: '',
				email: '',
				isAdmin: false,
				pfp: '',
				isLoggedIn: false
			}
        }
    }
}