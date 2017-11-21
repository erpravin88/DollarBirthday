import FBSDK  from 'react-native-fbsdk';
const {
  LoginManager,
  AccessToken
} = FBSDK;
import Toast from 'react-native-simple-toast';

export default fbAuth = () => {
    return new Promise((resolve, reject) => {
      LoginManager.logInWithReadPermissions(['public_profile','email','user_birthday']).then((result) => {
          if(result.isCancelled){
            resolve({status:'cancel', data:result});
              //Toast.show('Log In cancelled');
          }
          else {
              AccessToken.getCurrentAccessToken().then(

                  (fdata) => {
                      console.log(JSON.stringify(fdata));
                      resolve({status:'success', data:fdata});
                      // fetch('https://graph.facebook.com/v2.5/me?fields=email,name,birthday&access_token=' + data.accessToken)
                      // .then((response) => response.json())
                      // .then((json) => {console.log("Profile fb",json)})
                      // .catch(() => {
                      //   console.log('ERROR GETTING DATA FROM FACEBOOK');
                      // })

                  }
              );
          }
      }, function(error){
          console.log('An error occured: ' + error)
          resolve({status:'error', data:error});
      })
  });
}
