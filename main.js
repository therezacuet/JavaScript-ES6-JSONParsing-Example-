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

let photos;

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




//var albumID = filterSelection.options[filterSelection.selectedIndex].value;

//filterSelection.onclick = myClickHandler(filterSelection.value);

function myClickHandler(value) {
      alert(value);
}

function filteredData(){


  var filterSelectionValue = document.getElementById('inputGroupSelect01').value;
 
  getData('GET', 'https://jsonplaceholder.typicode.com/photos').then(function(data){

  

  let photos = JSON.parse(data);
  let output = '';
  let url = "https://jsonplaceholder.typicode.com/photos/";

  var jsonData = photos.filter((item) => {
    return item.albumId === filterSelectionValue;
  });

  

  //We do that to ensure to get a correct JSON
  //var my_json = JSON.stringify(data)
  //We can use {'name': 'Lenovo Thinkpad 41A429ff8'} as criteria too
  //var filtered_json = find_in_object(JSON.parse(my_json), {albumId: albumID});

  
  if (filterSelectionValue == 0) {
    for(let photo of photos){
      output += `

      <div class="col-lg-4 col-sm-6 text-center mb-4">
            <img class="rounded-circle img-fluid d-block mx-auto" src=${photo.thumbnailUrl} alt="">
            <h3><a href=${url+photo.id} >${photo.title}</a>
              <small>Driver</small>
            </h3>
            <p>What does this team member to? Keep it short! This is also a great spot for social links!</p>
          </div> 
      `;
    }
  }else{

    for(let photo of jsonData){
      output += `

      <div class="col-lg-4 col-sm-6 text-center mb-4">
            <img class="rounded-circle img-fluid d-block mx-auto" src=${photo.thumbnailUrl} alt="">
            <h3><a href=${url+photo.id} >${photo.title}</a>
              <small>Driver</small>
            </h3>
            <p>What does this team member to? Keep it short! This is also a great spot for social links!</p>
          </div> 
      `;
    }

  }

  console.log(filterSelectionValue);

  console.log(jsonData);

  console.log(photos);



  document.getElementById('template').innerHTML = output;

}).catch(function(err){
  console.log(err);
});

}


