import {NetInfo} from 'react-native';

export function checkinternetconnectivity(){
    return NetInfo.isConnected.fetch().then(isConnected => {
        return({"Internet" :isConnected});
      });
}