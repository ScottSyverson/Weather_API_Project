// GET COORDINATES
const findMe = () => {

    const success = (position) => {
        console.log(position);
        status.textContent = "success";
        const { latitude, longitude } = position.coords;
        ;
    };
    const error = () => {
    };
    navigator.geolocation.getCurrentPosition(success, error);
};


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

let currentWeather = "";
async function fetchData() {
    let url = `https://api.weather.gov/gridpoints/LIX/30,89/forecast?units=us`

    await fetch(url)
        .then(response => response.json())
        .then(data => {
            currentWeather = data;
            console.log(currentWeather.properties.elevation)

        })
        .catch(error => {
            console.log(error)
        });

}

//findMe();
fetchData();