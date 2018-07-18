"use strict"

// Immediatley Resolved
//var myPromise = Promise.resolve('Foo');

//myPromise.then((res) => console.log(res));

/*
var myPromise = new Promise(function(resolve, reject){
  setTimeout(() => resolve(4), 2000);
});
myPromise.then((res) => {
  res +=3;
  console.log(res);
});
*/

var sd;

function getData(method, url){
  return new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function(){
      if(this.status >= 200 && this.status < 300){
        resolve(xhr.response);
      }else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function(){
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}

function filteredData(){

  var filterSelectionValue = parseInt(document.getElementById('inputGroupSelect01').value);
 
  getData('GET', 'https://jsonplaceholder.typicode.com/photos').then(function(data){

  let photos = JSON.parse(data);
  sd.push(JSON.parse(data));
  let output = '';

  var jsonData = photos.filter((item) => {

    if (filterSelectionValue == 0) {
      return item;
    }else{
      return item.albumId === filterSelectionValue;
    }  
    
  });

  //console.log(jsonData);

    for(let photo of jsonData){
      output += `

      <div class="col-lg-4 col-sm-6 text-center mb-4">
            <img class="rounded-circle img-fluid d-block mx-auto" src=${photo.thumbnailUrl} alt="">
            <h3><a href="" onclick="details(id)" value=${photo.id}>${photo.title}</a>
              <small>Driver</small>
            </h3>
            <p>What does this team member to? Keep it short! This is also a great spot for social links!</p>
          </div> 
      `;
    }

  document.getElementById('template').innerHTML = output;

  }).catch(function(err){
    console.log(err);
  });

}


console.log("fkhgfk");


