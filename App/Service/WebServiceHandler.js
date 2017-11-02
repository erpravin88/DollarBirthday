import settings from '../Constant/UrlConstant';
import Toast from 'react-native-simple-toast';
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
          let myReader = new FileReader();
          myReader.onload = function(event){
              console.log(JSON.stringify(myReader.result));
          };
          let data = myReader.readAsText(response._bodyBlob);
          console.log(data);
        	return response;
        })
        .catch((error) => Toast.show("error"));
}

export function callApiWithAuth(urlStr, method, auth_token, params) {
        console.log("paramss++"+JSON.stringify(params));
        console.log(settings.API_URL);
        console.log(urlStr);
        console.log(params);
        console.log(auth_token);
        console.log(method);
            return fetch(settings.API_URL+urlStr, {
                    method: method,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': auth_token
                    },
                    body: JSON.stringify(params)
                })
                .then((response) => {
                  let myReader = new FileReader();
                  myReader.onload = function(event){
                      console.log(JSON.stringify(myReader.result));
                  };
                  let data = myReader.readAsText(response._bodyBlob);
                  console.log(data);
                	return response;
                })
                .catch((error) => Toast.show("error"));

}

export function callApiToPaypal(urlStr='', method='POST' ,param) {

        let sandbox_data = 'actionType=PAY&senderEmail=pravinkumar-facilitator@classicinformatics.com&currencyCode=USD&feesPayer=EACHRECEIVER&receiverList.receiver(0).amount=2.00&receiverList.receiver(0).email=pravinkumar-p1@classicinformatics.com&receiverList.receiver(0).primary=false&receiverList.receiver(1).amount=1.00&receiverList.receiver(1).email=pravinkumar-buyer@classicinformatics.com&receiverList.receiver(1).primary=false&requestEnvelope.errorLanguage=en_US&returnUrl=http://dbc.demos.classicinformatics.com?type=complete&cancelUrl=http://dbc.demos.classicinformatics.com?type=cancel';
        let live_data = 'actionType=PAY&currencyCode=USD&feesPayer=EACHRECEIVER&receiverList.receiver(0).amount=2.00&receiverList.receiver(0).email=syscom.pravinkumar@gmail.com&receiverList.receiver(0).primary=false&requestEnvelope.errorLanguage=en_US&returnUrl=http://dbc.demos.classicinformatics.com?type=complete&cancelUrl=http://dbc.demos.classicinformatics.com?type=cancel';
        let sandbox_url = settings.PAYPAL_SANDBOX_APIURL+urlStr;
        let live_url = settings.PAYPAL_LIVE_APIURL+urlStr;
        let sandbox_header =  {
          'X-PAYPAL-SECURITY-USERID':settings.PAYPAL_SANDBOX_CREDENTIALS.gv_paypal_user_name,
          'X-PAYPAL-SECURITY-SIGNATURE':settings.PAYPAL_SANDBOX_CREDENTIALS.gv_paypal_signature,
          'X-PAYPAL-SECURITY-PASSWORD': settings.PAYPAL_SANDBOX_CREDENTIALS.gv_paypal_password,
          'X-PAYPAL-APPLICATION-ID':settings.PAYPAL_SANDBOX_CREDENTIALS.gv_paypal_app_id,
          'X-PAYPAL-REQUEST-DATA-FORMAT':'NV',
          'X-PAYPAL-RESPONSE-DATA-FORMAT': 'JSON',

        };
        let live_header =  {
          'X-PAYPAL-SECURITY-USERID':settings.PAYPAL_LIVE_CREDENTIALS.gv_paypal_user_name,
          'X-PAYPAL-SECURITY-SIGNATURE':settings.PAYPAL_LIVE_CREDENTIALS.gv_paypal_signature,
          'X-PAYPAL-SECURITY-PASSWORD': settings.PAYPAL_LIVE_CREDENTIALS.gv_paypal_password,
          'X-PAYPAL-APPLICATION-ID':settings.PAYPAL_LIVE_CREDENTIALS.gv_paypal_app_id,
          'X-PAYPAL-REQUEST-DATA-FORMAT':'NV',
          'X-PAYPAL-RESPONSE-DATA-FORMAT': 'JSON',

        };
        console.log(settings.PAYPAL_ENV ==='live' ? live_url : sandbox_url );
        console.log(settings.PAYPAL_ENV ==='live' ? live_header : sandbox_header);
        console.log(settings.PAYPAL_ENV ==='live' ? live_data : sandbox_data);
        console.log(method);
            return fetch(settings.PAYPAL_ENV ==='live' ? live_url : sandbox_url , {
                    method: method,
                    headers: settings.PAYPAL_ENV ==='live' ? live_header : sandbox_header,
                    body: settings.PAYPAL_ENV ==='live' ? live_data : sandbox_data,//JSON.stringify(params)
                })
                .then((response) => {

                	return response;
                })
                .catch((error) => Toast.show("error"));

}
