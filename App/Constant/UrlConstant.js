import DeviceInfo from "react-native-device-info";


export const settings = {
  login_type: {dbc:'dbc',fb:'fb'},
  CURRENCY:{dollar:'USD'},
  CURRENCY_SYMBOL:{dollar:'$'},
  DONOT_CHARITY_ID: 24, //"I Do Not Wish To Donate at This Time" Charity id
  CONTACT_LIST_URL: 'http://dbc.demos.classicinformatics.com/login?action=apitoken&t=',
  GOOGLE: 'service_call=google',
  YAHOO: 'service_call=yahoo',
  HOTMAIL: 'service_call=hotmail',
  FBEVENT_URL: "https://www.facebook.com/events/birthdays/",
  API_URL: "http://dbc.demos.classicinformatics.com/apiDbc/public/",
  BASE_URL: "http://dbc.demos.classicinformatics.com",
  DEVICE_ID: DeviceInfo.getUniqueID(),
  DEVICE_NAME: DeviceInfo.getSystemName(),
  PAYPAL_URL:"https://www.paypal.com/welcome/signup/",
  // adaptive payments of paypal config
  PAYPAL_ENV:'sandbox',//sandbox/live
  //PAYPAL_SANDBOX_AUTHURL: 'https://www.sandbox.paypal.com/webapps/adaptivepayment/flow/pay?&expType=mini&payKey=',
  PAYPAL_SANDBOX_AUTHURL: 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_ap-payment&paykey=',
  PAYPAL_SANDBOX_APIURL: 'https://svcs.sandbox.paypal.com/AdaptivePayments/',
  PAYPAL_SANDBOX_CREDENTIALS:{'gv_paypal_user_name':'us-seller_api1.treefrog.ca',
                        'gv_paypal_password':'EPRA3GVFLC5VQM88',
                        'gv_paypal_signature':'As73nrgcNlPNUmFI7LiaXizN2XJ7AaJx-wbNNxfW00xJORQFZkFUTD4u',
                        'gv_paypal_app_id':'APP-80W284485P519543T'},
  PAYPAL_LIVE_AUTHURL: 'https://www.paypal.com/webapps/adaptivepayment/flow/pay?&expType=mini&payKey=',
  // PAYPAL_LIVE_AUTHURL: 'https://www.paypal.com/cgi-bin/webscr?cmd=_ap-payment&paykey=',
  PAYPAL_LIVE_APIURL: 'https://svcs.paypal.com/AdaptivePayments/',
  PAYPAL_LIVE_CREDENTIALS:{'gv_paypal_user_name':'ronnage123_api1.gmail.com',
                        'gv_paypal_password':'9YPPMCQQXKGGZ7WB',
                        'gv_paypal_signature':'AFcWxV21C7fd0v3bYYYRCpSSRl31AUSjdZagSGLZM6Q9dNTN4BiG7PwZ',
                        'gv_paypal_app_id':'APP-897100548E965904X'},
  HOTMAIL_CREDENTIAILS : {
                            client_id: '56f9576b-ab7b-4c44-bc4d-9ab7aa8d8913',
                            client_secret: 'VBDLE3277>_stkmaqaCY8]%',
                            scope: 'User.ReadBasic.All Mail.Read offline_access',
                        },
  INBOX_DEMO_DATA: {
                      "status_code": 201,
                      "status_message": "Success",
                      "data": {
                          "total_sent": 0,
                          "total_recieved": 0,
                          "total_donation": 0,
                          "list": [
                              {
                                  "sender_name": "Mark Asciutto",
                                  "currency": "USD",
                                  "gift_amount": "1.00",
                                  "charity_amount": "0.05",
                                  "gift_redeemed": "0001-01-01 00:00:00",
                                  "gift_sent": "2017-05-14 18:01:14"
                              },
                              {
                                  "sender_name": "Mark Asciutto",
                                  "currency": "USD",
                                  "gift_amount": "10.00",
                                  "charity_amount": "0.05",
                                  "gift_redeemed": "0001-01-01 00:00:00",
                                  "gift_sent": "2017-05-09 17:19:12"
                              },
                              {
                                  "sender_name": "Mark Asciutto",
                                  "currency": "USD",
                                  "gift_amount": "5.00",
                                  "charity_amount": "0.05",
                                  "gift_redeemed": "0001-01-01 00:00:00",
                                  "gift_sent": "2017-05-08 15:12:19"
                              },
                              {
                                  "sender_name": "Mark Asciutto",
                                  "currency": "USD",
                                  "gift_amount": "1.00",
                                  "charity_amount": "0.05",
                                  "gift_redeemed": "0001-01-01 00:00:00",
                                  "gift_sent": "2017-05-14 18:01:14"
                              },
                              {
                                  "sender_name": "Mark Asciutto",
                                  "currency": "USD",
                                  "gift_amount": "10.00",
                                  "charity_amount": "0.05",
                                  "gift_redeemed": "0001-01-01 00:00:00",
                                  "gift_sent": "2017-05-09 17:19:12"
                              },
                              {
                                  "sender_name": "Mark Asciutto",
                                  "currency": "USD",
                                  "gift_amount": "5.00",
                                  "charity_amount": "0.05",
                                  "gift_redeemed": "0001-01-01 00:00:00",
                                  "gift_sent": "2017-05-08 15:12:19"
                              }
                          ]
                        }
                      }
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
