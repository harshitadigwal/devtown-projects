const apiKey = "71919745272b133a8298f67274f3a96f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }
    else{
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round( data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    
    
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "https://www.svgrepo.com/show/138565/clouds.svg"
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "https://www.svgrepo.com/show/407540/sun.svg"
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "https://www.svgrepo.com/show/404993/cloud-with-rain.svg"
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "https://www.svgrepo.com/show/474568/light-rain.svg"
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "https://www.svgrepo.com/show/405681/fog.svg"
        }
    
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none"
    }

    
}

searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
})

checkWeather();
 