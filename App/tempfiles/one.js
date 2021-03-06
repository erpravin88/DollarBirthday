import React, { Component } from 'react';
import {
	Linking,
	Platform,
	NetInfo,
} from 'react-native';
import settings from './UrlConstant';
export const Birthdayformat = (datetime) => {
	if(datetime.datetime === undefined){
		return null;
	}
	console.log(datetime.datetime);
	let string1 = '-'
	let string2 = '/'
	let Newdate= [];
	if(datetime.datetime.includes(string1)){
		let newdate1 = datetime.datetime+"T00:00:00Z";
		Newdate =newdate1;
		// let newdate1 = datetime.datetime.split("-");
		
		// Newdate[0] = newdate1[0]*1;
		// Newdate[1] = newdate1[1]*1;
		// Newdate[2] = newdate1[2]*1;
        
      }else if(datetime.datetime.includes(string2)){
		let newdate1 = datetime.datetime.split("/");
		//Newdate[0] = newdate1[2]*1;
		//Newdate[1] = newdate1[0]*1;
		//Newdate[2] = newdate1[1]*1;
		if(newdate1[0] < 10){
			newdate1[0] = newdate1[0]*1;
			newdate1[0] = "0"+newdate1[0];
		}
		Newdate = newdate1[2]+"-"+newdate1[0]+"-"+newdate1[1];

	  }
	//console.log("---"+Newdate);
	let date = new Date(Newdate);
	let month = date.getMonth();
	month = month*1 +1;
	if(month < 10){
		month = "0"+month;
	}
	let UTCmonth = date.getUTCMonth();
	UTCmonth = UTCmonth*1 +1;
	if(UTCmonth < 10){
		UTCmonth = "0"+UTCmonth;
	}
	if(datetime.slash){
		//console.log(month + '/' + date.getDate() + '/' + date.getFullYear());
		return month + '/' + date.getDate() + '/' + date.getFullYear();
		
	}else{
	//console.log(date.getUTCFullYear()+ '-' + UTCmonth + '-' + date.getUTCDate());
		return  date.getUTCFullYear()+ '-' + UTCmonth + '-' + date.getUTCDate();
		
	}
	return null;
}
export const currencySymbol = (cdata) => {
return cdata === settings.CURRENCY.dollar ? settings.CURRENCY_SYMBOL.dollar : cdata === settings.CURRENCY.dollar1 ? settings.CURRENCY_SYMBOL.dollar1 : cdata === settings.CURRENCY.dollar2 ? settings.CURRENCY_SYMBOL.dollar2 : cdata === settings.CURRENCY.dollar3 ? settings.CURRENCY_SYMBOL.dollar3 : null;
}
export const dateformateMDY = (datetime)=>{
	if(datetime.datetime === undefined){
		return null;
	}
	let datetimenew = datetime.datetime.split(" ");
	let date = new Date(datetimenew[0]+"T"+datetimenew[1]+"Z");
	let month = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"][date.getMonth()];
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;

	if(datetime.time){
		return month + ' ' + date.getDate() + ' at ' + hours + ':' + minutes + ' ' + ampm;
	}
 return month + ' '+date.getDate() +', ' + date.getFullYear();
}
export const netinfo = function() {
	NetInfo.isConnected.fetch().then(isConnected => {
  console.log('First, is ' + (isConnected ? 'online' : 'offline'));
});
function handleFirstConnectivityChange(isConnected) {
  console.log('Then, is ' + (isConnected ? 'online' : 'offline'));

  NetInfo.isConnected.removeEventListener(
    'change',
    handleFirstConnectivityChange
  );
	return isConnected;
}
NetInfo.isConnected.addEventListener(
  'change',
  handleFirstConnectivityChange
);
}
export const phonecall = function(phoneNumber, prompt) {
	if(arguments.length !== 2) {
			console.log('you must supply exactly 2 arguments');
			return;
		}

		if(!isCorrectType('String', phoneNumber)) {
			console.log('the phone number must be provided as a String value');
			return;
		}

		if(!isCorrectType('Boolean', prompt)) {
			console.log('the prompt parameter must be a Boolean');
			return;
		}

		let url;

		if(Platform.OS !== 'android') {
			url = prompt ? 'telprompt:' : 'tel:';
		}
		else {
			url = 'tel:';
		}

		url += phoneNumber;

		LaunchURL(url);
}

export const email = function(to, cc, bcc, subject, body) {
	let url = 'mailto:';
		let argLength = arguments.length;

		switch(argLength) {
			case 0:
				LaunchURL(url);
				return;
			case 5:
				break;
			default:
				console.log('you must supply either 0 or 5 arguments. You supplied ' + argLength);
				return;
		}

		// we use this Boolean to keep track of when we add a new parameter to the querystring
		// it helps us know when we need to add & to separate parameters
		let valueAdded = false;

		if(isCorrectType('Array', arguments[0])) {
			let validAddresses = getValidArgumentsFromArray(arguments[0], 'String');

			if(validAddresses.length > 0) {
				url += encodeURIComponent(validAddresses.join(','));
			}
		}

		url += '?';

		if(isCorrectType('Array', arguments[1])) {
			let validAddresses = getValidArgumentsFromArray(arguments[1], 'String');

			if(validAddresses.length > 0) {
				valueAdded = true;
				url += 'cc=' + encodeURIComponent(validAddresses.join(','));
			}
		}

		if(isCorrectType('Array', arguments[2])) {
			if(valueAdded) {
				url += '&';
			}

			let validAddresses = getValidArgumentsFromArray(arguments[2], 'String');

			if(validAddresses.length > 0) {
				valueAdded = true;
				url += 'bcc=' + encodeURIComponent(validAddresses.join(','));
			}
		}

		if(isCorrectType('String', arguments[3])) {
			if(valueAdded) {
				url += '&';
			}

			valueAdded = true;
			url += 'subject=' + encodeURIComponent(arguments[3]);
		}

		if(isCorrectType('String', arguments[4])) {
			if(valueAdded) {
				url += '&';
			}

			url += 'body=' + encodeURIComponent(arguments[4]);
		}

		LaunchURL(url);
}

export const text = function(phoneNumber = null, body = null) {
	if(arguments.length > 2) {
			console.log('you supplied too many arguments. You can either supply 0 or 1 or 2');
			return;
		}

		let url = 'sms:';

		if(phoneNumber) {
			if(isCorrectType('String', phoneNumber)) {
				url += phoneNumber;
			} else {
				console.log('the phone number should be provided as a string. It was provided as '
					+ Object.prototype.toString.call(phoneNumber).slice(8, -1)
					+ ',ignoring the value provided');
			}
		}

		if(body) {
			if(isCorrectType('String', body)) {
				// for some strange reason android seems to have issues with ampersands in the body unless it is encoded twice!
				// iOS only needs encoding once
				if(Platform.OS === 'android') body = encodeURIComponent(body);
				url += Platform.OS === 'ios' ? `&body=${encodeURIComponent(body)}` : `?body=${encodeURIComponent(body)}`;
			} else {
				console.log('the body should be provided as a string. It was provided as '
					+ Object.prototype.toString.call(body).slice(8, -1)
					+ ',ignoring the value provided');
			}
		}

		LaunchURL(url);
}

export const textWithoutEncoding = function(phoneNumber = null, body = null) {
	if(arguments.length > 2) {
			console.log('you supplied too many arguments. You can either supply 0 or 1 or 2');
			return;
		}

		let url = 'sms:';

		if(phoneNumber) {
			if(isCorrectType('String', phoneNumber)) {
				url += phoneNumber;
			} else {
				console.log('the phone number should be provided as a string. It was provided as '
					+ Object.prototype.toString.call(phoneNumber).slice(8, -1)
					+ ',ignoring the value provided');
			}
		}

		if(body) {
			if(isCorrectType('String', body)) {
				url += Platform.OS === 'ios' ? `&body=${body}` : `?body=${body}`;
			} else {
				console.log('the body should be provided as a string. It was provided as '
					+ Object.prototype.toString.call(body).slice(8, -1)
					+ ',ignoring the value provided');
			}
		}

		LaunchURL(url);
}

export const web = (address = null) => {
	if(!address) {
      console.log('Missing address argument');
      return;
    }
    if(!isCorrectType('String', address)) {
    	console.log('address was not provided as a string, it was provided as '
    		+ Object.prototype.toString.call(address).slice(8, -1));
    	return;
    }
    LaunchURL(address);
}

const LaunchURL = function(url) {
	Linking.canOpenURL(url).then(supported => {
		if(!supported) {
			console.log('Can\'t handle url: ' + url);
		} else {
			Linking.openURL(url)
			.catch(err => {
				if(url.includes('telprompt')) {
					// telprompt was cancelled and Linking openURL method sees this as an error
					// it is not a true error so ignore it to prevent apps crashing
					// see https://github.com/anarchicknight/react-native-communications/issues/39
				} else {
					console.warn('openURL error', err)
				}
			});
		}
	}).catch(err => console.warn('An unexpected error happened', err));
};

const getValidArgumentsFromArray = function(array, type) {
	var validValues = [];
	array.forEach(function(value) {
		if(isCorrectType(type, value)) {
			validValues.push(value);
		}
	});

	return validValues;
};

const isCorrectType = function(expected, actual) {
	return Object.prototype.toString.call(actual).slice(8, -1) === expected;
};

export default { phonecall, text, textWithoutEncoding, email, web, netinfo, Birthdayformat, dateformateMDY }
