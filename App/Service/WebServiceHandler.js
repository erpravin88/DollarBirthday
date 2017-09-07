
export function callPostApi(urlStr, params) {

console.log(params);
  var url ='http://horsetaxi.demos.classicinformatics.com/'+urlStr;
console.log(url);
  return fetch(url,{

   method: "POST",
   header: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
   },

    body: JSON.stringify(params)
  })
  .then( (response) =>{

    return response.json();
  })
  .catch((error) => console.log(error));
}
