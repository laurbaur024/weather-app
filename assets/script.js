


var apiKey = '78cb0834bb12b2fe47734e73f815851e'
const searchInput = $('#search-input')
const searchButton = $('#search-button')
const resultsCity = $('#results-city')
var temp = $('#temp')
var wind = $('#wind')
var humidity = $('#humidity')
var searchHistory = []
var lat
var lon
var city

var icon = document.querySelector('#icon')
var icon0 = document.querySelector('#icon0')
var icon1 = document.querySelector('#icon1')
var icon2 = document.querySelector('#icon2')
var icon3 = document.querySelector('#icon3')
var icon4 = document.querySelector('#icon4')

var date = dayjs();
$('#date').text(date.format(' MM/DD/YY'))
$('#date0').text(date.add(1,'day').format(' MM/DD/YY'))
$('#date1').text(date.add(2,'day').format(' MM/DD/YY'))
$('#date2').text(date.add(3,'day').format(' MM/DD/YY'))
$('#date3').text(date.add(4,'day').format(' MM/DD/YY'))
$('#date4').text(date.add(5,'day').format(' MM/DD/YY'))


loadCities()

$("#search-button").on("click", function (event) {
  event.preventDefault()
  if ($("#search-input").val() !== "") {
    city = $("#search-input").val().trim()
  }
  weatherToday();
  checkPast();
});

function weatherToday() {
  var apiToday = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`

  $.ajax({
    url: apiToday,
    method: "GET",
    error: function () {
      alert("No city found, please try again.")
      $("#search-input").val("")
    }
  }).then(function (response) {
    console.log(response)
    temp = Math.floor(response.main.temp)
    wind = Math.floor(response.wind.speed)
    var iconUrl = `https://openweathermap.org/img/w/${response.weather[0].icon}.png`
    $('#temp').text(` ${temp} °F`)
    $("#wind").text(` ${wind} MPH`)
    $("#results-city").text(response.name)
    $('#humidity').text(` ${response.main.humidity} %`)
    icon.setAttribute('src', iconUrl)

    lat = response.coord.lat
    lon = response.coord.lon
    
    console.log(lat)
    console.log(lon)
    weatherForecast()
  });
}

function weatherForecast() {
  var apiForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`

  $.ajax({
    url: apiForecast,
    method: "GET"
  }).then(function (response) {
    console.log(response)

    var icon0Url = `https://openweathermap.org/img/w/${response.list[4].weather[0].icon}.png`
    kelvin1 = response.list[4].main.temp
    farenheit1 =  (kelvin1 - 273.15) * 9/5 + 32 
    temp1 = Math.floor(farenheit1)
    wind1 = Math.floor(response.list[4].wind.speed)
    $('#temp0').text(` ${temp1} °F`)
    $("#wind0").text(` ${wind1} MPH`)
    $('#humidity0').text(` ${response.list[4].main.humidity} %`)
    icon0.setAttribute('src', icon0Url)

    var icon1Url = `https://openweathermap.org/img/w/${response.list[12].weather[0].icon}.png`
    kelvin2 = response.list[12].main.temp
    farenheit2 =  (kelvin2 - 273.15) * 9/5 + 32 
    temp2 = Math.floor(farenheit2)
    wind2 = Math.floor(response.list[12].wind.speed)
    $('#temp1').text(` ${temp2} °F`)
    $("#wind1").text(` ${wind2} MPH`)
    $('#humidity1').text(` ${response.list[12].main.humidity} %`)
    icon1.setAttribute('src', icon1Url)

    var icon2Url = `https://openweathermap.org/img/w/${response.list[20].weather[0].icon}.png`
    kelvin3 = response.list[20].main.temp
    farenheit3 =  (kelvin3 - 273.15) * 9/5 + 32 
    temp3 = Math.floor(farenheit3)
    wind3 = Math.floor(response.list[20].wind.speed)
    $('#temp2').text(` ${temp3} °F`)
    $("#wind2").text(` ${wind3} MPH`)
    $('#humidity2').text(` ${response.list[20].main.humidity} %`)
    icon2.setAttribute('src', icon2Url)

    var icon3Url = `https://openweathermap.org/img/w/${response.list[28].weather[0].icon}.png`
    kelvin4 = response.list[28].main.temp
    farenheit4 =  (kelvin4 - 273.15) * 9/5 + 32 
    temp4 = Math.floor(farenheit4)
    wind4 = Math.floor(response.list[28].wind.speed)
    $('#temp3').text(` ${temp4} °F`)
    $("#wind3").text(` ${wind4} MPH`)
    $('#humidity3').text(` ${response.list[28].main.humidity} %`)
    icon3.setAttribute('src', icon3Url)

    var icon4Url = `https://openweathermap.org/img/w/${response.list[36].weather[0].icon}.png`
    kelvin5 = response.list[36].main.temp
    farenheit5 =  (kelvin5 - 273.15) * 9/5 + 32 
    temp5 = Math.floor(farenheit5)
    wind5 = Math.floor(response.list[36].wind.speed)
    $('#temp4').text(` ${temp5} °F`)
    $("#wind4").text(` ${wind5} MPH`)
    $('#humidity4').text(` ${response.list[36].main.humidity} %`)
    icon4.setAttribute('src', icon4Url)


  })
}



function addCity() {
  $("#history-list").prepend($("<button>").attr("type", "button").attr("data-city", city).addClass("past text-muted list-group-item list-group-item-action").text(city));
  $("#search-input").val("");
}

$("#history-list").on("click",".past",function (event) {
  event.preventDefault();
  city = $(this).attr("data-city");
  weatherToday();
});

function checkPast () {
  if ( $(`#history-list button[data-city="${city}"]`).length ) { 
    $("#search-input").val("");
  } else {
    addCity();
    searchHistory.push(city);
    localStorage.setItem("cities", JSON.stringify(searchHistory))
  }
}

function loadCities() {
  var storedCities = JSON.parse(localStorage.getItem("cities"));
  if (storedCities !== null) {
    searchHistory = storedCities;
    renderCities();
  } else {
    city = "San Diego"
    checkPast();
  }
}

function renderCities() {
  for (var i = 0; i < searchHistory.length; i++) {
    city = searchHistory[i];
    addCity();
  }
}
