import Axios from 'axios';

export async function request (url, method, data) {
    let reqData = {};
    if(!url || !method) return {error : 'no url or method'}
    if(data) reqData = data
   return await Axios({
        url:url,
        method: method,
        data: data
    })
}

