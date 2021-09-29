console.log('(^_^)/')
const APIkey = "77d964daadf18f4da0191f491935d9c4"

//city fetch for coord
let cityUrl = ("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + APIkey)
fetch(cityUrl)
.then((response) => response.json())
.then((response) => {
    console.log(response)
})

//coord fetch
let coordUrl = ("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIkey)
fetch(coordUrl)
.then((response) => response.json())
.then(async (response) => {
  console.log(response)
  let latitude = response[0].lat;
  let longitude = response[0].lon;
  console.log(latitude, longitude)

})

let onecallUrl = ("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&apikey="+APIkey+"&units=imperial")
  fetch(onecallUrl)
  .then((response) => response.json())
  .then(async (response) => {
      console.log(response)
  })