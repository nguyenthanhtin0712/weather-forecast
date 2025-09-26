<script>
import WeatherSummary from "../components/WeatherSummary.vue";
import Highlights from "../components/Highlights.vue";
import Coords from "../components/Coords.vue";
import Humidity from "../components/Humidity.vue";

export default {
    data() {
        return {
            test: "Test data from HomeView.vue",
        };
    },
    methods: {
        clickTest() {
            console.log(this.test);
        },
        fetchWeather(address) {
        // Phát tán sự kiện lên App.vue
            this.$emit('fetch-weather', address);
        }
    },
    components: {
        WeatherSummary,
        Highlights,
        Coords,
        Humidity,
    },
    props: {
        weatherInfo: {
            type: [Object, null],
            required: true,
        },
    },
};
</script>

<template>
    <main class="w-[100vw] h-[100vh] flex items-center justify-center">
        <div class="space-y-5 w-[1000px]">
            <div class="flex space-x-5 w-[100%]">
                <WeatherSummary :weatherInfo="weatherInfo" @address-entered="fetchWeather" />
                <!--  -->
                <Highlights :weatherInfo="weatherInfo" />
            </div>
            <div class="flex space-x-5">
                <!--  -->
                <Coords :weatherInfo="weatherInfo" />
                <Humidity :weatherInfo="weatherInfo" />
            </div>
        </div>
    </main>
</template>
