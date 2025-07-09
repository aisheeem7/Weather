const skyImages = [
  "https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg",
  "https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg",
  "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
  "https://images.pexels.com/photos/1834399/pexels-photo-1834399.jpeg",
  "https://images.pexels.com/photos/1025469/pexels-photo-1025469.jpeg",
  "https://images.pexels.com/photos/635723/pexels-photo-635723.jpeg",
  "https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg",
  "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
  "https://images.pexels.com/photos/1146708/pexels-photo-1146708.jpeg",
  "https://images.pexels.com/photos/417142/pexels-photo-417142.jpeg",
  "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg",
  "https://images.pexels.com/photos/240040/pexels-photo-240040.jpeg",
  "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg",
  "https://images.pexels.com/photos/1209982/pexels-photo-1209982.jpeg",
  "https://images.pexels.com/photos/1412235/pexels-photo-1412235.jpeg"
];

function setBackground() {
  const randomIndex = Math.floor(Math.random() * skyImages.length);
  const imageUrl = skyImages[randomIndex];
  document.body.style.backgroundImage = `url('${imageUrl}')`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';
  document.body.style.backgroundRepeat = 'no-repeat';
}

window.onload = setBackground;

let weather = {
  apiKey: "800de7540640bf3b63ef847690354eab",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/04n" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
  },
  search: function () {
    this.fetchWeather(document.querySelector(".searchbar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".searchbar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Delhi");
