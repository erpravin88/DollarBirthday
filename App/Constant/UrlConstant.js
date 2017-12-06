import DeviceInfo from "react-native-device-info";
const Build = 'live'// demos/live
const BASE_URL= Build == 'demos' ? "http://dbc.demos.classicinformatics.com" : "https://www.dollarbirthdayclub.com";

export const settings = {
  LOGOUT_FB:false,//true/false inner fb referance page logout when user logout from app.
  login_type: {dbc:'dbc',fb:'fb'},
  CURRENCY:{dollar:'USD',dollar1:'GBP',dollar2:'CAD',dollar3:'EUR'},
  CURRENCY_SYMBOL:{dollar:'$',dollar1:'£',dollar2:'C$',dollar3:'€'},
  USERAGENT: "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19",
  DONOT_CHARITY_ID: Build == 'demos' ? 24 : 23, //"I Do Not Wish To Donate at This Time" Charity id
  CONTACT_LIST_URL: BASE_URL+"/login?action=apitoken&t=",
  GOOGLE: 'service_call=google',
  YAHOO: 'service_call=yahoo',
  HOTMAIL: 'service_call=hotmail',
  FBEVENT_URL: "https://www.facebook.com/login.php?next=https%3A%2F%2Fwww.facebook.com%2Fevents%2Fbirthdays%2F",
  API_URL: BASE_URL+"/apiDbc/public/",
  BASE_URL: BASE_URL,
  DEVICE_ID: DeviceInfo.getUniqueID(),
  DEVICE_NAME: DeviceInfo.getSystemName(),
  PAYPAL_URL:"https://www.paypal.com/welcome/signup/",
  // adaptive payments of paypal config
  PAYPAL_SANDBOX_AUTHURL: 'https://www.sandbox.paypal.com/webapps/adaptivepayment/flow/pay?&expType=mini&payKey=',
  //PAYPAL_SANDBOX_AUTHURL: 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_ap-payment&paykey=',
  PAYPAL_SANDBOX_APIURL: 'https://svcs.sandbox.paypal.com/AdaptivePayments/',
  PAYPAL_SANDBOX_CREDENTIALS:{'gv_paypal_user_name':'us-seller_api1.treefrog.ca',
                        'gv_paypal_password':'EPRA3GVFLC5VQM88',
                        'gv_paypal_signature':'As73nrgcNlPNUmFI7LiaXizN2XJ7AaJx-wbNNxfW00xJORQFZkFUTD4u',
                        'gv_paypal_app_id':'APP-80W284485P519543T'},
  PAYPAL_LIVE_AUTHURL: 'https://www.paypal.com/webapps/adaptivepayment/flow/pay?&expType=mini&payKey=',
  // PAYPAL_LIVE_AUTHURL: 'https://www.paypal.com/cgi-bin/webscr?cmd=_ap-payment&paykey=AP-0LV13040VP2403905',
  PAYPAL_LIVE_APIURL: 'https://svcs.paypal.com/AdaptivePayments/',
  PAYPAL_LIVE_CREDENTIALS:{'gv_paypal_user_name':'ronnage123_api1.gmail.com',
                        'gv_paypal_password':'9YPPMCQQXKGGZ7WB',
                        'gv_paypal_signature':'AFcWxV21C7fd0v3bYYYRCpSSRl31AUSjdZagSGLZM6Q9dNTN4BiG7PwZ',
                        'gv_paypal_app_id':'APP-897100548E965904X'},
  // HOTMAIL_CREDENTIAILS : {
  //                           client_id: '56f9576b-ab7b-4c44-bc4d-9ab7aa8d8913',
  //                           client_secret: 'VBDLE3277>_stkmaqaCY8]%',
  //                           scope: 'User.ReadBasic.All Mail.Read offline_access',
  //                       },
  PAYMENT_STATUS:{created:"CREATED",completed:"COMPLETED",incomplete:"INCOMPLETE",error:"ERROR",reversalerror:"REVERSALERROR",processing:"PROCESSING",pending:"PENDING"},
};
export const alertData = [{
      value: 'No alert',index:'0'
    }, {
      value: 'Day of birthday',index:'1'
    }, {
      value: '1 Day before birthday',index:'2'
    },{
      value: '2 Days before birthday',index:'3'
    },{
      value: '1 Week before birthday',index:'4'
    },{
      value: '2 weeks before birthday',index:'5'
    }];
export default settings;
