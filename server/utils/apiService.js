require('dotenv').config();
const axios = require('axios');

var exampleURL = "https://api.nasa.gov/EPIC/api/natural/date/2015-10-31";

var apiKey = process.env.NASA_API_KEY;

// Get json returned data
var request = new XMLHttpRequest(); 
request.open('GET', exampleURL + '?api_key=' + apiKey, true);

request.addEventListener('load',function(){

if(request.status >= 200 && request.status < 400){
var response = JSON.parse(request.responseText);
console.log(response);
} 
else {
     console.log("Error in network request: " + request.statusText);
}});
request.send(null);

// Get image
document.addEventListener('DOMContentLoaded', submitButtonsReady);

function submitButtonsReady(){
  document.getElementById('dateInput').addEventListener('click', function(event){
    var request = new XMLHttpRequest();

    var date = document.getElementById('dateValue').value;
    var dateArray = date.split("-");
    var year = dateArray[0];
    var month = dateArray[1];
    var day = dateArray[2];

    request.open('GET', 'https://api.nasa.gov/EPIC/api/natural/date/' + date + '?api_key=' + apiKey, true);
    request.addEventListener('load',function(){
     if(request.status >= 200 && request.status < 400){

        var response = JSON.parse(request.responseText);

        if(typeof(response[0].image) === 'string')
        {
          document.getElementById('imageStatus').textContent = 'Found';
          document.getElementById('imageID').src = 'https://epic.gsfc.nasa.gov/archive/natural/' + year + '/' + month + '/' + day + '/jpg/' + response[0].image + '.jpg';
          document.getElementById('imageCaption').textContent = response[0].caption;
        }

      } 
      else 
      { 
            console.log("Error in network request: " + request.statusText);

       }});
    document.getElementById('imageStatus').textContent = 'Please try a different date or check your syntax!';
    request.send(null);
    event.preventDefault();
  })

}