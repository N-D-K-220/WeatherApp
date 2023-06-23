import Chart from 'chart.js/auto'


let tableBody = document.querySelector(".table-body");
forecastTemperature();

(async function() {
    let data = [];
    let weather = [];


        let url = `https://api.weatherapi.com/v1/forecast.json?key=22d42e07c9444f04997180616231506&q=Yangon&alerts=yes&days=10`;

        const response = await fetch(url);
        const data1 = await response.json();
        weather = data1.forecast.forecastday;
        
        weather.forEach(weather => {
      //  console.log(weather.date, parseInt(weather.day.avgtemp_c));
        let obj = new Object();
        obj = {
            date : weather.date, temp : parseInt(weather.day.avgtemp_c)
        }
        data.push(obj);
        });
        //console.log(data);

    new Chart(
        document.querySelector('#tempChart'),
        {
        type: 'line',
        data: {
            labels: data.map(row => row.date),
            datasets: [
            {
                label: 'Average Temperature',
                data: data.map(row => row.temp)
            }
            ]
        }
        }
    );
})();

async function forecastTemperature() {
    
    let url = `https://api.weatherapi.com/v1/forecast.json?key=22d42e07c9444f04997180616231506&q=Yangon&alerts=yes&days=7`;

        const response = await fetch(url);
        const data = await response.json();
        let weather = data.forecast.forecastday ;

        weather.forEach((weather)=>{
            let temp = document.createElement('tr');
            temp.classList.add('table-row');
            temp.innerHTML = `
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            ${weather.date}
                        </th>
                        <td data-label="Min temp" class="px-6 py-4">
                            ${parseInt(weather.day.mintemp_c)}&#8451;
                        </td>
                        <td data-label="Max temp" class="px-6 py-4">
                            ${parseInt(weather.day.maxtemp_c)}&#8451;
                        </td>
                        <td data-label="Weather" class="px-6 py-4">
                            ${weather.day.condition.text}
                        </td>
                        <td data-label="Moon Phase" class="px-6 py-4">
                            ${weather.astro.moon_phase}
                        </td>
                        <td data-label="Sun Rise" class="px-6 py-4">
                            ${weather.astro.sunrise}
                        </td>
                        <td data-label="Sun Set" class="px-6 py-4">
                            ${weather.astro.sunset}
                        </td>
            `;
            tableBody.appendChild(temp);
            })
        
}