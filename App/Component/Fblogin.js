import FBSDK  from 'react-native-fbsdk';
const {
  LoginManager,
  AccessToken,
  ShareApi,
  ShareDialog
} = FBSDK;
import Toast from 'react-native-simple-toast';
/**
 * @function: function fblogin.
 * @augments : resolve, reject
 * @author: Pravin Kumar
 * @description: this function is used for getting access tokan of facebook api
 */
export default fbAuth = () => {
    return new Promise((resolve, reject) => {
      LoginManager.logInWithReadPermissions(['public_profile','email','user_birthday']).then((result) => {

          if(result.isCancelled){
            resolve({status:'cancel', data:result});
          }
          else {
              AccessToken.getCurrentAccessToken().then(

                  (fdata) => {
                      console.log(JSON.stringify(fdata));
                      LoginManager.logOut();
                      resolve({status:'success', data:fdata});
                  }
              );
          }
      }, function(error){
          console.log('An error occured: ' + error)
          resolve({status:'error', data:error});
      })
  });
}
/**
 * @function: function fbAuthpublish.
 * @augments : resolve, reject
 * @author: Pravin Kumar
 * @description: this function is used for pulish post at facebook wall.
 */
export const fbAuthpublish = () => {
    return new Promise((resolve, reject) => {
      LoginManager.logInWithPublishPermissions(["publish_actions"]).then((result) => {

          if(result.isCancelled){
            resolve({status:'cancel', data:result});
              //Toast.show('Log In cancelled');
          }
          else {
              AccessToken.getCurrentAccessToken().then(

                  (fdata) => {
                      console.log(JSON.stringify(fdata));
                      LoginManager.logOut();
                      resolve({status:'success', data:fdata});
                  }
              );
          }
      }, function(error){
          console.log('An error occured: ' + error)
          resolve({status:'error', data:error});
      })
  });
}
