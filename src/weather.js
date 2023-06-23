// const tempBody = document.querySelector('.temperatureData');
const input = document.querySelector('.location');
const weatherBox = document.querySelector('.weather-data');
const weekForecast = document.querySelector('.seven-day');
const img = document.querySelector('#coverImge')


let place = document.querySelector('.locationName');
let time = document.querySelector('.time');
let weather = [];

window.addEventListener('DOMContentLoaded', ()=>{
    // Default Location
    myLocation = "Yangon";
    today = new Date();
    time.innerHTML = `Current Time : ${today.getHours()}: ${today.getMinutes()}`;
    place.innerHTML = `${myLocation}`;

    getTemperature();
} );

input.addEventListener('keypress',function(e){
    if (e.key === "Enter" ){
        weatherBox.innerHTML = ``;
        weekForecast.innerHTML = ``;
        myLocation = input.value ; 
        place.innerHTML = `${myLocation}`;

        getTemperature();
        input.value = '';
    }
})

async function getTemperature() {
    
    let url = `https://api.weatherapi.com/v1/forecast.json?key=22d42e07c9444f04997180616231506&q=${myLocation}&alerts=yes&days=7`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        weather = data;
        addTemperaturetoBody(weather);
     //   console.log(weather.current.condition.text);
        let forecast = weather.forecast.forecastday ;
     //   console.log(weather.forecast.forecastday[0].date);

        forecast.forEach(forecast => {
            addForecastdata(forecast);
        });

    }
    catch{
        console.log("eror");
    }
}

function addTemperaturetoBody(weather){
        let currentTemp = parseInt(weather.current.temp_c);
        let windSpeed = weather.current.wind_mph +"MPH";
        let windDir = weather.current.wind_dir;
        let imgLink = weather.current.condition.icon;
        const temp = document.createElement('div');
        temp.classList.add('current-weather');
        temp.innerHTML = `
            <div class="flex items-center sm:justify-center ">
                <img class="h-15"  src="${imgLink}" alt""/>
                <span class="temperature">${currentTemp}&#8451;</span>
            </div> 
            <table class="weather-data mt-4 mx-2">
                <tr class=" tr-weather ">
                    <td class=" td-weather">Sky</td>
                    <td class=" td-data">${weather.current.condition.text}</td>
                </tr>
                <tr class=" tr-weather ">
                    <td class=" td-weather">Wind</td>
                    <td class=" td-data">${windDir} ${windSpeed}</td>
                </tr>
                <tr class=" tr-weather">
                    <td class=" td-weather">Humidity</td>
                    <td class="td-data">${weather.current.humidity}</td>
                    </tr>
            </table>
        `
        weatherBox.appendChild(temp);

}
function addForecastdata(forecast){
    // let date = forecast.date;
    switch (new Date(forecast.date).getDay()) {
        case 0:
            day = "Sun";
            break;
        case 1:
            day = "Mon";
            break;
        case 2:
            day = "Tues";
            break;
        case 3:
            day = "Wed";
            break;
        case 4:
            day = "Thur";
            break;
        case 5:
            day = "Fri";
            break;
        case 6:
            day = "Sat";
}
 //   console.log(forecast.day.condition);
    const temp = document.createElement('div');
        temp.classList.add('seven-day');
        temp.innerHTML = `
            <div class="w-20  border-2 border-blue-950 lg:px-4 bg-slate-800 rounded-lg"> 
                <h5 class="text-center text-sm text-white font-bold">${day}</h5>

                <p class= "tex-sm text-center">${forecast.date.substring(6, 10)}</p>
                <div class="mb-3">
                <img src="${forecast.day.condition.icon}" alt="">
                    <p class="text-white text-sm text-center ">${parseInt(forecast.day.maxtemp_c)}&#8451;</p>
                    <p class="text-white text-sm text-center">${parseInt(forecast.day.mintemp_c)}&#8451;</p>
                </div>
            </div>
        `
        weekForecast.appendChild(temp);
}

