const apiKey ="acebc76d9005de7b6b40677a9febcc50"

const weatherDataEl = document.getElementById("weatherData");

const cityInputEl = document.getElementById("cityInput");

const formEl = document.querySelector("form");

// add an event listener that will trigger everytime a form is submitted
formEl.addEventListener("submit",(event)=>{
    event.preventDefault(); // To stop the page from refreshing as a default
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue); // a Function to get the city data value

})

async function getWeatherData(cityValue){
    try{ // To fetch the dat from the API
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)

        if(!response.ok){ // If we do not get a response
            throw new Error("Network response unsuccessful")
        }
        const data = await response.json(); // Passing the response in a form of a j.son

        const temperature = Math.round(data.main.temp);

        const description = data.weather[0].description;

        const icon = data.weather[0].icon;

        const details = [ // To make the data dynamic
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed}m/s`
        ]
        weatherDataEl.querySelector(".icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;

        weatherDataEl.querySelector(".temparature").textContent = `${temperature}°C`;

        weatherDataEl.querySelector(".description").textContent = description;

        weatherDataEl.querySelector(".details").innerHTML = details.map((detail)=> `<div>${detail}</div>`).join("") // join to get rid of the ,
    } catch(error){ // In case someone entered a wrong input
        weatherDataEl.querySelector(".icon").innerHTML = "";

        weatherDataEl.querySelector(".temparature").textContent = "";

        weatherDataEl.querySelector(".description").textContent = "You do know that isn't a city right?";// The error in case no response is sent

        weatherDataEl.querySelector(".details").innerHTML ="";
    }
}