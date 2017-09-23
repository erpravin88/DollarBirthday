import DeviceInfo from "react-native-device-info";
export const settings = {
  API_URL: "http://dbc.demos.classicinformatics.com/apiDbc/public/",
  DEVICE_ID: DeviceInfo.getUniqueID(),
  DEVICE_NAME: DeviceInfo.getSystemName(),
  PAYPAL_URL:"https://www.paypal.com/welcome/signup/",
};

export default settings;
