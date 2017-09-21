
export function callPostApi(urlStr, params) {

console.log(params);
  var url ='http://dbc.demos.classicinformatics.com/apiDbc/public/'+urlStr;
console.log(url);

console.log(JSON.stringify(params));
  return fetch(url,{

   method: "POST",
   header: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   },

    body: JSON.stringify(params)
  })
  .then( (response) =>{

console.log(response)
    return response.json();
  })
  .catch((error) => console.log(error));
}


export function callGetApi(urlStr) {


  var url ='http://dbc.demos.classicinformatics.com/apiDbc/public/'+urlStr;
console.log(url);

  return fetch(url,{

   method: "GET",
   header: {
     'Accept': 'application/json',
     'Content-Type': 'application/x-www-form-urlencoded',
   },


  })
  .then( (response) =>{

console.log(response);
    return response.json();
  })
  .catch((error) => console.log(error));
}
