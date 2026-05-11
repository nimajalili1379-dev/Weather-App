const apiKey = "596ed67b6db232ec9e604376227387ed";

function getWeather() {

    const city = document.getElementById("cityInput").value;

    if (!city) {
        alert("Please enter a city");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)

    .then(res => res.json())

    .then(data => {

        if (data.cod !== 200) {
            alert("City not found");
            return;
        }
        
        document.getElementById("pressure").innerText =
    data.main.pressure + " hPa";

document.getElementById("visibility").innerText =
    (data.visibility / 1000) + " km";

document.getElementById("sunrise").innerText =
    new Date(data.sys.sunrise * 1000).toLocaleTimeString();

document.getElementById("sunset").innerText =
    new Date(data.sys.sunset * 1000).toLocaleTimeString();

    startClock(data.timezone);

    getForecast(data.coord.lat, data.coord.lon);

        /* WEATHER INFO */

        document.getElementById("temp").innerText =
            Math.round(data.main.temp) + "°C";

        document.getElementById("city").innerText =
            data.name;

        document.getElementById("humidity").innerText =
            data.main.humidity + "%";

        document.getElementById("wind").innerText =
            data.wind.speed + " km/h";

        document.getElementById("desc").innerText =
            data.weather[0].description;
            const icon = data.weather[0].icon;

document.getElementById("weatherIcon").src =
`https://openweathermap.org/img/wn/${icon}@4x.png`;

        /* WEATHER TYPE */

        const weatherMain =
            data.weather[0].main.toLowerCase();

        const weatherDesc =
            data.weather[0].description.toLowerCase();

        changeBackground(weatherMain);

        createEffects(weatherMain, weatherDesc);

    })

    .catch(err => {
        console.log(err);
        alert("Error fetching weather");
    });
    loadCities();
}


/* BACKGROUND */

function changeBackground(weather) {

    const body = document.getElementById("body");

    if (weather.includes("clear")) {

        body.style.background =
            "linear-gradient(to top, #4facfe, #00f2fe)";
    }

    else if (weather.includes("cloud")) {

        body.style.background =
            "linear-gradient(to top, #757f9a, #d7dde8)";
    }

    else if (weather.includes("rain")) {

        body.style.background =
            "linear-gradient(to top, #314755, #26a0da)";
    }

    else if (weather.includes("thunderstorm")) {

        body.style.background =
            "linear-gradient(to top, #232526, #414345)";
    }

    else if (weather.includes("snow")) {

        body.style.background =
            "linear-gradient(to top, #e6dada, #274046)";
    }

    else {

        body.style.background =
            "linear-gradient(to top, #4facfe, #00f2fe)";
    }
}


/* EFFECTS */

function createEffects(weatherMain, weatherDesc) {

    const effects = document.getElementById("effects");

    effects.innerHTML = "";

    /* CLEAR SKY */

    if (
        weatherDesc.includes("clear")
    ) {

        createSun(effects);
    }

    /* PARTLY CLOUDY */

    else if (
        weatherDesc.includes("few clouds") ||
        weatherDesc.includes("scattered clouds")
    ) {

        createSun(effects);
        createClouds(effects, 6);
    }

    /* CLOUDY */

    else if (
        weatherMain.includes("cloud")
    ) {

        createClouds(effects, 12);
    }

    /* RAIN */

    else if (
        weatherMain.includes("rain") ||
        weatherDesc.includes("drizzle")
    ) {

        createRain(effects, 250);
        createClouds(effects, 8);
    }

    /* THUNDERSTORM */

    else if (
        weatherMain.includes("thunderstorm")
    ) {

        createRain(effects, 300);
        createClouds(effects, 12);
        createLightning(effects);
    }

    /* SNOW */

    else if (
        weatherMain.includes("snow")
    ) {

        createSnow(effects, 180);
        createClouds(effects, 6);
    }
}


/* SUN */

function createSun(effects) {

    const sun = document.createElement("div");

    sun.classList.add("sun");

    effects.appendChild(sun);
}


/* CLOUDS */

function createClouds(effects, amount) {

    for (let i = 0; i < amount; i++) {

        const cloud = document.createElement("div");

        cloud.classList.add("cloud");

        cloud.style.top =
            Math.random() * 70 + "%";

        cloud.style.animationDuration =
            (30 + Math.random() * 40) + "s";

        cloud.style.transform =
            `scale(${0.5 + Math.random()})`;

        cloud.style.opacity =
            0.3 + Math.random() * 0.5;

        effects.appendChild(cloud);
    }
}


/* RAIN */

function createRain(effects, amount) {

    for (let i = 0; i < amount; i++) {

        const rain = document.createElement("div");

        rain.classList.add("rain");

        rain.style.left =
            Math.random() * 100 + "vw";

        rain.style.animationDuration =
            (0.5 + Math.random()) + "s";

        rain.style.opacity =
            Math.random();

        rain.style.height =
            40 + Math.random() * 60 + "px";

        effects.appendChild(rain);
    }
}


/* SNOW */

function createSnow(effects, amount) {

    for (let i = 0; i < amount; i++) {

        const snow = document.createElement("div");

        snow.classList.add("snow");

        snow.style.left =
            Math.random() * 100 + "vw";

        snow.style.animationDuration =
            (4 + Math.random() * 5) + "s";

        snow.style.opacity =
            Math.random();

        snow.style.width =
            5 + Math.random() * 10 + "px";

        snow.style.height =
            snow.style.width;

        effects.appendChild(snow);
    }
}


/* LIGHTNING */

function createLightning(effects) {

    setInterval(() => {

        const flash = document.createElement("div");

        flash.style.position = "fixed";
        flash.style.inset = "0";
        flash.style.background = "white";
        flash.style.opacity = "0.8";
        flash.style.pointerEvents = "none";

        effects.appendChild(flash);

        setTimeout(() => {
            flash.remove();
        }, 100);

    }, 4000);
}
const cities = [
    "London",
    "Paris",
    "Tokyo",
    "New York",
    "Tehran",
    "Berlin"
];

function loadCities() {

    const container = document.getElementById("citiesList");

    container.innerHTML = "";

    cities.forEach(city => {

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {

            const div = document.createElement("div");
            div.classList.add("city-card");

            div.innerHTML = `
                <strong>${data.name}</strong><br>
                ${Math.round(data.main.temp)}°C | ${data.weather[0].main}
            `;

            div.onclick = () => {
                document.getElementById("cityInput").value = city;
                getWeather();
            };

            container.appendChild(div);
        });
    });
}
let timeInterval;

function startClock(timezoneOffset) {

    if (timeInterval) clearInterval(timeInterval);

    function updateClock() {

        const now = new Date();

        // تبدیل به ساعت شهر
        const localTime = new Date(now.getTime() + timezoneOffset * 1000);

        const hours = String(localTime.getHours()).padStart(2, '0');
        const minutes = String(localTime.getMinutes()).padStart(2, '0');
        const seconds = String(localTime.getSeconds()).padStart(2, '0');

        document.getElementById("localTime").innerText =
            `${hours}:${minutes}:${seconds}`;
    }

    updateClock();
    timeInterval = setInterval(updateClock, 1000);
}
function getForecast(lat, lon) {

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {

        const list = document.getElementById("forecastList");
        list.innerHTML = "";

        // هر 8 داده = 1 روز (تقریبی)
        for (let i = 0; i < data.list.length; i += 8) {

            const item = data.list[i];

            const date = new Date(item.dt * 1000);
            const day = date.toLocaleDateString('en', { weekday: 'short' });

            const temp = Math.round(item.main.temp);
            const icon = item.weather[0].icon;

            const div = document.createElement("div");
            div.classList.add("day-card");

            div.innerHTML = `
                <div>${day}</div>
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" width="40">
                <div>${temp}°C</div>
            `;

            list.appendChild(div);
        }
    });
}
let map;
let marker;

function openMap() {

    document.getElementById("mapModal").style.display = "flex";

    if (!map) {

        map = L.map('map').setView([20, 0], 2);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: ''
        }).addTo(map);

       map.on('click', async function(e) {

    const lat = e.latlng.lat;
    const lon = e.latlng.lng;
    

    if (marker) map.removeLayer(marker);

    marker = L.marker([lat, lon]).addTo(map);

    try {

        // 1️⃣ گرفتن اسم شهر از نقشه
        const cityName = await getCityName(lat, lon);

        // 2️⃣ ست کردن داخل سرچ باکس
        document.getElementById("cityInput").value = cityName;

        // 3️⃣ گرفتن هوا
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );

        const data = await res.json();

        if (data.cod !== 200) return;

        updateWeather(data);

        getForecast(lat, lon);
        startClock(data.timezone);
        document.getElementById("cityInput").value = cityName;

// 🔥 مهم: لیست سمت چپ دوباره لود بشه
loadCities();

    } catch (err) {
        console.error(err);
    }

    document.getElementById("mapModal").style.display = "none";
        });
            

    }
}
function updateWeather(data) {

    document.getElementById("temp").innerText =
        Math.round(data.main.temp) + "°C";

    document.getElementById("city").innerText =
        data.name;

    document.getElementById("humidity").innerText =
        data.main.humidity + "%";

    document.getElementById("wind").innerText =
        data.wind.speed + " km/h";

    document.getElementById("desc").innerText =
        data.weather[0].description;

    const icon = data.weather[0].icon;

    document.getElementById("weatherIcon").src =
        `https://openweathermap.org/img/wn/${icon}@4x.png`;

    document.getElementById("pressure").innerText =
        data.main.pressure + " hPa";

    document.getElementById("visibility").innerText =
        (data.visibility / 1000) + " km";

    document.getElementById("sunrise").innerText =
        new Date(data.sys.sunrise * 1000).toLocaleTimeString();

    document.getElementById("sunset").innerText =
        new Date(data.sys.sunset * 1000).toLocaleTimeString();

    const weatherMain = data.weather[0].main.toLowerCase();

    changeBackground(weatherMain);
    createEffects(weatherMain, data.weather[0].description.toLowerCase());
}
async function getCityName(lat, lon) {

    const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );

    const data = await res.json();

    return data.address.city ||
           data.address.town ||
           data.address.village ||
           data.display_name.split(",")[0];
}