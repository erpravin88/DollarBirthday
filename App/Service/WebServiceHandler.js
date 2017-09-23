import settings from '../Constant/UrlConstant';

export function callApiWithoutAuth(urlStr, method, params) {
    //alert("paramss++"+JSON.stringify(params));
    console.log(settings.API_URL);
console.log(urlStr);
console.log(JSON.stringify(params));
    return fetch(settings.API_URL+urlStr, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        })
        .then((response) => {
        	return response;
        })
        .catch((error) => Toast.show("error"));
}

export function callApiWithAuth(urlStr, method, auth_token, params) {
            //alert("paramss++"+JSON.stringify(params));
            console.log(settings.API_URL);
        console.log(urlStr);
        console.log(params);
            return fetch(settings.API_URL+urlStr, {
                    method: method,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer "+auth_token
                    },
                    body: JSON.stringify(params)
                })
                .then((response) => {
                	return response;
                })
                .catch((error) => Toast.show("error"));

}
