import API from '../../utils/API';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
    try{
        const res = await API.get(`/problems`);
        return { problems: res.data }
    } catch(err){
        console.log(err)
    }

}) satisfies PageLoad;