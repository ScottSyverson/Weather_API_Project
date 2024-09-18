document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        findMe();
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});

// GET COORDINATES
const findMe = () => {

    const success = (position) => {
        const { latitude, longitude } = position.coords;
        fetchPoints(latitude, longitude);


    };
    const error = () => {
    };
    navigator.geolocation.getCurrentPosition(success, error);
};

async function fetchPoints(latitude, longitude) {

    let url = `https://api.weather.gov/points/${latitude},${longitude}`


    await fetch(url)
        .then(response => response.json())
        .then(data => {
            currentPoints = data;
            console.log(currentPoints)
            let { gridId, gridX, gridY } = currentPoints.properties;
            fetchData(gridId, gridX, gridY)

        })
        .catch(error => {
            console.log(error)
        });

};

//! 7-Days Forcast
//#region 

let today = new Date();
let dateString = today.toDateString();
document.getElementById('todayDate').innerHTML = dateString;

let nextDay = new Date(today);
nextDay.setDate(today.getDate() + 1);
dateString = nextDay.toDateString();
document.getElementById('Day2').innerHTML = dateString;

nextDay = new Date(today);
nextDay.setDate(today.getDate() + 2);
dateString = nextDay.toDateString();
document.getElementById('Day3').innerHTML = dateString;

nextDay = new Date(today);
nextDay.setDate(today.getDate() + 3);
dateString = nextDay.toDateString();
document.getElementById('Day4').innerHTML = dateString;

nextDay = new Date(today);
nextDay.setDate(today.getDate() + 4);
dateString = nextDay.toDateString();
document.getElementById('Day5').innerHTML = dateString;

nextDay = new Date(today);
nextDay.setDate(today.getDate() + 5);
dateString = nextDay.toDateString();
document.getElementById('Day6').innerHTML = dateString;

nextDay = new Date(today);
nextDay.setDate(today.getDate() + 6);
dateString = nextDay.toDateString();
document.getElementById('Day7').innerHTML = dateString;
//#endregion

let currentWeather = "";

async function fetchData(gridId, gridX, gridY) {

    let url = `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast`

    await fetch(url)
        .then(response => response.json())
        .then(data => {

            currentWeather = data;
            console.log(currentWeather);
            //console.log(currentWeather.properties) 
            let input = currentWeather.properties.periods[0].temperature;
            pasteCurrentTemp(input)
            /*
            let curCon = currentWeather.properties.periods[0].shortForecast
            pasteDataCondition(curCon)*/

            /*curCon = currentWeather.properties.periods[2].shortForecast
            pasteDataCondition2(curCon, i)*/

            //this is where you are working

            let i = 0;
            while (i < 14) {

                curCon = currentWeather.properties.periods[i].shortForecast
                pasteDataCondition(curCon, i)

                i++;
                i++;
            }


        })

        .catch(error => {
            console.log(error)
        });

}

function pasteCurrentTemp(input) {
    let currentTemp = "";
    currentTemp = document.createElement("h1");
    currentTemp.innerHTML = input + "\u00B0 ";
    let currentTempDisplay = document.querySelector(".currentTemp");
    currentTempDisplay.append(currentTemp);
}
/*
function pasteDataCondition(input) {
    let currentCondition = "";
    currentCondition = document.createElement("h3");
    currentCondition.innerHTML = input
    let conditionDisplay = document.querySelector(".condition0");
    conditionDisplay.append(currentCondition);

}
*/
function pasteDataCondition(input, num) {
    let currentCondition = "";
    currentCondition = document.createElement("h3");
    currentCondition.innerHTML = input
    let x = num
    let conditionDisplay = document.querySelector(`.condition${x}`)
    conditionDisplay.append(currentCondition);
}




