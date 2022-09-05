const city=document.querySelector("#city");
const colorbg=document.querySelector(".colorbg");
const input=document.querySelector("#input");
const temperature=document.querySelector("#temperature");
const feelsLike=document.querySelector("#feelsLike");
const variation=document.querySelector("#variation");
const imgW=document.querySelector("#imgW");
const conditions=document.querySelector("#conditions");

const dateF=document.querySelector("#dateF");
const imgF=document.querySelector("#imgF");
const temperatureF=document.querySelector("#temperatureF");
const conditionsF=document.querySelector("#conditionsF");
const variationF=document.querySelector("#variationF");


const weatherAPIKey="5ccdd8b6d7a743672823735f428da0e2";
const weatherBaseEndpoint="https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + weatherAPIKey;

let getWeatherByCityName=async (city)=>{
  let endpoint=weatherBaseEndpoint + '&q=' + city;
 let response=await fetch(endpoint);
 let weather= await response.json();
return weather;

}
input.addEventListener('keydown',async (e)=>{
if (e.keyCode===13){
 let weather= await getWeatherByCityName(input.value);
  updateCurrentWeather(weather);
}
})

let updateCurrentWeather=(data)=>{
city.textContent=data.name + ',' + data.sys.country;
getOurDate();
colorbg.style.display="block";
Motion();
temperature.textContent=data.main.temp>0 ? '+' + `${Math.round(data.main.temp)}°`: '-' +
`${Math.round(data.main.temp)}°`;
feelsLike.textContent=data.main.feels_like>0 ? "Feels Like: " + '+'  + `${Math.round(data.main.feels_like)}°` : '-' + `${Math.round(data.main.feels_like)}°`;
conditions.textContent=data.weather[0].main;
variation.textContent=data.main.temp_min>0 & data.main.temp_max>0 ? "Min: " + '+' + `${Math.round(data.main.temp_min)}° `+ "" + 
"Max: " + '+' +`${Math.round(data.main.temp_max)}°`: '-' + `${Math.round(data.main.temp_min)}° ` + "" + '-'+`${Math.round(data.main.temp_max)}°`;
imgW.classList.add('weather__icon');

imgW.src=`https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

}

function getOurDate() {
  const myDate = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  let day = days[myDate.getDay()];

  let todayDate = myDate.getDate();

  let month = months[myDate.getMonth()];

   let year = myDate.getFullYear();

   const date=document.querySelector("#date");
   date.textContent = `${day}` + " " + `${todayDate}` + " " + `${month}` + " " + `${year}` 
}

function Motion(){
  gsap.from(".cont", {y:100, opacity:0, duration:1, delay:.5})
}


function GetInfo() {

  let newName = document.querySelector("#input");
  var cityName = document.querySelector("#city");



fetch('https://api.openweathermap.org/data/2.5/forecast?&appid=5ccdd8b6d7a743672823735f428da0e2')
.then(response => response.json())
.then(data => {

    //Getting the min and max values for each day
    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1)+ "°";
        //Number(1.3450001).toFixed(2); // 1.35
    }

    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
    }
  })
}


 

