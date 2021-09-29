const APIkey = "77d964daadf18f4da0191f491935d9c4"
let city = ""





//WEATHER from api
let weather = () => {
    let city = $("#searchBar").val()





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
// city name
$('#weather').html('')
$('#weather').append(`<h2>${response[0].name}</h2>`)
})

let onecallUrl = ("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&apikey="+APIkey+"&units=imperial")
  fetch(onecallUrl)
  .then((response) => response.json())
  .then(async (response) => {
      console.log(response)

//current weather
    let icon = ("https://openweathermap.org/img/w/" + response.current.weather[0].icon + ".png")

    $('#weather').append(`
        <h3>${new Date(Date.now()).toLocaleString().split(',')[0]}
        <img src="${icon}"></h2>
        <ul class="list-unstyled">
            <li>Temperature: ${response.current.temp}&#8457;</li>
            <li>Humidity: ${response.current.humidity}%</li>
            <li>Wind Speed: ${response.current.wind_speed}mph</li>
            <li id="uvIndex"></li>
        </ul>`)
  })
}

//search
$("#searchBtn").on("click", (event) => {
    event.preventDefault()

    weather()
})