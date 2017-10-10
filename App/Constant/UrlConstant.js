import DeviceInfo from "react-native-device-info";
export const settings = {
  API_URL: "http://dbc.demos.classicinformatics.com/apiDbc/public/",
  BASE_URL: "http://dbc.demos.classicinformatics.com",
  DEVICE_ID: DeviceInfo.getUniqueID(),
  DEVICE_NAME: DeviceInfo.getSystemName(),
  PAYPAL_URL:"https://www.paypal.com/welcome/signup/",
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
