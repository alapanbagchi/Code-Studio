import API from '../../../utils/API';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
    try{
        await parent()
        const res = await API.get(`/problems/${params.id}`);
        return { problem: res.data }
    } catch(err){
        console.log(err)
    }

}) satisfies PageLoad;