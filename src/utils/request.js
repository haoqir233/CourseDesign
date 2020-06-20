import cookie from 'react-cookies';


// 全局IP
export const http = "zhaoyujie.top:8096";
export const IP = "http://" + http;
// export const download = IP + "/Users/GarbageCan2Service/excel/人员信息录入模板.xls";
// export const upload = IP + "/rest/recycler/addRecyclerList";
export const websocketIP = 'ws://' + http + '/wsresult';

export default function request(method, url, body, history) {
    method = method.toUpperCase();
    if (method === 'GET') {
        body = undefined;
    } else {
        body = body && JSON.stringify(body);
    }
    const c_token = cookie.load('x-auth-token');
    sessionStorage.setItem('token', c_token);
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-auth-token': c_token
        },
        body: body
    }).then((res) => {
        const token = res.headers.get('x-auth-token');
        if (token) {
            // cookie.save('x-auth-token', token, { path: '/' });
        }
        if (res.status === 401) {
            history.push('/');
            return Promise.reject('Unauthorized.');
        } else {
            return res.json();
        }
    });
}

export const get = url => request('GET', url);
export const post = (url, body) => request('POST', url, body);