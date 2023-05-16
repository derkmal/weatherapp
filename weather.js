const apiWeatherKey = "7916b4c5a7582f28750a09fd59ea4e45";
const apiCityPhotoKey = "AIzaSyBq7jIOh8n3pEEFtFrIWsLVJf08cowKWJU";

const weatherDataEl = document.getElementById('weather');
const cityInput = document.getElementById('city');
const formEl = document.querySelector('form');
const mainContainer = document.querySelector('.container');

formEl.addEventListener('submit', (e)=> {
    e.preventDefault();
    const cityValue = cityInput.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiWeatherKey}&units=metric`);

        if(!response.ok) {
            throw new Error("No Response from Network!");
        }

        const data = await response.json();

        console.log(data);

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`,
        ];
        
        setTimeout(() => {
            weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="IconWeather">`;
            weatherDataEl.querySelector(".temperature").textContent = `${temperature}ºC`;
            weatherDataEl.querySelector(".description").textContent = description;
            weatherDataEl.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");
        }, 1000);

        mainContainer.animate([
                {backgroundColor: 'rgba(118, 177, 255, 0.2)', height: '509px'},
            ],
            {
                duration: 1000,
                fill: 'forwards'
            }
        );

    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent = "";
        weatherDataEl.querySelector(".description").textContent = "An error took place, enter a valid city name";
    }
}

async function getCityPhoto() {
    try {
        let response = await fetch(`https://maps.googleapis.com/maps/api/place/photo
            ?maxwidth=400
            &photo_reference=Aap_uEA7vb0DDYVJWEaX3O-AtYp77AaswQKSGtDaimt3gt7QCNpdjp1BkdM6acJ96xTec3tsV_ZJNL_JP-lqsVxydG3nh739RE_hepOOL05tfJh2_ranjMadb3VoBYFvF0ma6S24qZ6QJUuV6sSRrhCskSBP5C1myCzsebztMfGvm7ij3gZT
            &key=${apiCityPhotoKey}`
        );

        if(!response.ok) {
            throw new Error("No Response from Network!");
        }

        let data2 = await response.json();
        console.log(data2);
    }

    catch(error) {

    }
}

