import API from '../../../../utils/API';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
    try{
        return { problems: res.data }
    } catch(err){
        console.log(err)
    }

}) satisfies PageLoad;