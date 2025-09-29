<script>
import HomeView from "./views/HomeView.vue";
import { ref } from "vue";
export default {
    components: {
        HomeView,
    },
    data() {
        return {
            API_KEY: "449aa65b2dd4d9bacf7a54bb60433592",
            FORECAST: "https://api.openweathermap.org/data/2.5/forecast",
            AIR_POLLUTION: "http://api.openweathermap.org/data/2.5/air_pollution",
            city: "Ho Chi Minh",
            videoSource: "./assets/videos",
            weatherInfo: null,
            airPollutionInfo: null,
        };
    },
    methods: {
        // Cập nhật video background dựa trên thời tiết API trả về
        setVideoBackground(weatherCondition) {
            const condition = weatherCondition.toLowerCase();
            const atmosphere = ["mist", "smoke", "haze", "dust", "fog", "sand", "ash", "squall", "tornado"];
            const sources = {
                clear: "./videos/clear.mp4",
                clouds: "./videos/clouds.mp4",
                rain: "./videos/rain.mp4",
                snow: "./videos/snow.mp4",
                thunderstorm: "./videos/thunderstorm.mp4",
                drizzle: "./videos/drizzle.mp4",
            };
            if (atmosphere.includes(condition)) {
                this.videoSource = "./videos/trees.mp4";
            } else {
                this.videoSource = sources[condition] || "./videos/sky.mp4";
            }
            console.log("Updated video source:", this.videoSource);
        },

        // Lấy dữ liệu thời tiết từ API
        getWeather() {
            fetch(
                `${this.FORECAST}?q=${this.city}&units=metric&appid=${this.API_KEY}`
            )
                .then((response) => {
                    return response.json().then((data) => {
                        if (!response.ok) {
                            // Nếu mã lỗi là 404 thì báo không tìm thấy thành phố
                            if (data.cod === "404" || data.cod === 404) {
                                alert("Không tìm thấy thành phố. Vui lòng thử lại.");
                                throw new Error("City not found");
                            }
                            throw new Error(data.message || "Network response was not ok");
                        }
                        return data;
                    });
                })
                .then((data) => {
                    this.weatherInfo = data; // Cập nhật weatherInfo với dữ liệu nhận được                   
                    this.setVideoBackground(this.weatherInfo?.list[0].weather[0].main); // Thiết lập video nền
                    
                    // Tự động gọi API air pollution nếu có lat/lon
                    const coord = this.weatherInfo?.city?.coord;
                    if (coord?.lat && coord?.lon) {
                        this.getAirPollution(coord.lat, coord.lon);
                    }
                    console.log(JSON.stringify({ weather: this.weatherInfo }, null, 2)); // In ra dữ liệu dạng JSON để kiểm tra
                })
                .catch((error) => {
                    if (error.message !== "City not found") {
                        alert("Error fetching weather data: " + error.message);
                        console.error("There was a problem with the fetch operation:", error);
                    }
                });
        },
        searchWeather(city) {
            // console.log(city);
            this.city = city;
            this.getWeather();
        },

        getAirPollution(lat, lon) {
            fetch(`${this.AIR_POLLUTION}?lat=${lat}&lon=${lon}&appid=${this.API_KEY}`)
                .then(response => response.json().then(data => {
                    if (!response.ok) {
                        throw new Error(data.message || "Network response was not ok");
                    }
                    return data;
                }))
                .then(data => {
                    this.airPollutionInfo = data;
                    console.log(JSON.stringify({ airPollution: this.airPollutionInfo }, null, 2));
                })
                .catch(error => {
                    alert("Error fetching air pollution data: " + error.message);
                    console.error("There was a problem with the fetch operation:", error);
                });
        },
    },
    mounted() {
        this.getWeather();
    },
}

</script>

<template>
    <div class="">
        <video autoplay loop muted playsinline class="absolute z-[-1] top-0 left-0 h-[100vh] w-[100vw] object-cover"
            :src="videoSource"></video>
        <HomeView :weatherInfo="weatherInfo" :airPollutionInfo="airPollutionInfo" @fetchWeather="searchWeather"
            @fetch-air-pollution="getAirPollution" />
    </div>
</template>
