const APIkey = "77d964daadf18f4da0191f491935d9c4"
let city = ''
let currentCity = ''

//WEATHER from api
let weather = () => {
    let city = $("#searchBar").val()


//city fetch for coord
let cityUrl = ("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + APIkey)
fetch(cityUrl)
.then((response) => response.json())
.then((response) => {
    console.log(response)
    saveCity(city)
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


let onecallUrl = ("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&apikey="+APIkey+"&units=imperial")
  fetch(onecallUrl)
  .then((response) => response.json())
  .then(async (response) => {
      console.log(response)

searches()
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

//uv
$("#uvIndex").html('')
let uvResponse = response.current.uvi
$("#uvIndex").append(`UV Index: ${response.current.uvi}`);
$("#uvIndex").html(`UV Index: <span id="uvColor"> ${uvResponse}</span>`);
if (uvResponse >= 0 && uvResponse < 3) {
  $("#uvColor").attr("class", "favorable");
} else if (uvResponse >= 3 && uvResponse < 8) {
  $("#uvColor").attr("class", "moderate");
} else if (uvResponse >= 8) {
  $("#uvColor").attr("class", "severe");
}

//forecast
$("#forecast").html('')
let cardContent = (`<h4>5-Day Forecast:</h4>
<div id="forecast" class="d-inline-flex flex-wrap">`)

    for (let i = 0; i < 5; i++) {
        let days = response.daily[i]
        let weekDay = new Date(days.dt * 1000).toLocaleDateString("en", {weekday: "long"})
        let date = new Date(days.dt * 1000).toLocaleString().split(',')[0]
        let iconURL = ("https://openweathermap.org/img/w/" + days.weather[0].icon + ".png")
    
        cardContent += (`
    <div class="weather-card card m-2">
    <ul class="list-unstyled p-2">
        <li>${weekDay}</li>
        <li>${date}</li>
        <li class="weather-icon"><img src="${iconURL}"></li>
        <li>High: ${days.temp.max}&#8457;</li>
        <li>Low: ${days.temp.min}&#8457;</li>
        <li>Wind: ${days.wind_speed} mph</li>
        <li>Humidity: ${days.humidity}%</li>
    </ul>
    </div>`)
}
cardContent += `</div>`
$("#forecast").html(cardContent)
}) 
})}

//localStorage
let saveCity = (newCity) => {
    let cityAlreadySaved = false
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage["cities" + i] === newCity) {
        cityAlreadySaved = true
        break;
      }
    }
  
    if (cityAlreadySaved === false) {
      localStorage.setItem("cities" + localStorage.length, newCity);
      console.log(localStorage)
    }
  }

//display searched cities
let searches = () => {
    $("#searchResults").empty()
    let lastCity = ''

    if (localStorage.length === 0) {
      if (lastCity) {
        $("#searchBar").attr("value", lastCity)
      } else {
        $("#searchBar").attr("value", "Charlotte")
      }
    } else {
      let lastCityKey = "cities" + (localStorage.length - 1)
      lastCity = localStorage.getItem(lastCityKey)
      $("#searchBar").attr("value", lastCity)
      for (let i = 0; i < localStorage.length; i++) {
        let city = localStorage.getItem("cities" + i)
        let cityBtns;
  
        if (currentCity === '') {
          currentCity = lastCity
        }
  
        if (city === currentCity) {
            cityBtns = `<button type="button" class="list-group-item list-group-item-action active">${city}</button></li>`
          } else {
            cityBtns = `<button type="button" class="list-group-item list-group-item-action">${city}</button></li>`
          }
  
        $("#searchResults").prepend(cityBtns)
    }
//clear btn
if (localStorage.length > 0) {
    $("#clear").html($('<a class="grow btn" id="clear" href="#">clear</a>'));
  } else {
    $("#clear").html("");
  }

}
}

//clear btn click event
$("#clear").on("click", () => {
    localStorage.clear();
    searches();
  })

//search
$("#searchBtn").on("click", (event) => {
    event.preventDefault()
    currentCity = $("#searchBar").val()
    weather()
    searches()
})

//search results area
$("#searchResults").on("click", (event) => {
    event.preventDefault()
    $("#searchBar").val(event.target.textContent)
    currentCity = $("#searchBar").val()
    weather(event)
})

searches()