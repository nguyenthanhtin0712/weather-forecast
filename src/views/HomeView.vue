<script>
import WeatherSummary from "../components/WeatherSummary.vue";
import Highlights from "../components/Highlights.vue";
import Coords from "../components/Coords.vue";
import Humidity from "../components/Humidity.vue";
import SearchBar from "@/components/SearchBar.vue";
import Summary from "@/components/Summary.vue";
import Details from "@/components/Details.vue";
import DailyForecast from "@/components/DailyForecast.vue";
import AirPolution from "@/components/AirPolution.vue";

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
        SearchBar,
        Summary,
        Details,
        DailyForecast,
        AirPolution,
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
    <div class="flex justify-center gap-4 w-full">
        <!-- Ở giữa -->
        <main class="min-h-screen flex items-center justify-center">
            <div class="space-y-4 w-[1000px] m-5">
                <div class="flex space-x-6 w-[100%]">
                    <SearchBar :weatherInfo="weatherInfo" @address-entered="fetchWeather" />
                    <Summary :weatherInfo="weatherInfo" />
                </div>
                <div class="space-y-4 w-[100%]">
                    <Details :weatherInfo="weatherInfo" />
                    <DailyForecast :weatherInfo="weatherInfo" />
                </div>
            </div>
        </main>

        <!-- Cột phải -->
        <div class="flex flex-col space-y-4 item-center">
            <AirPolution :weatherInfo="weatherInfo" />
        </div>
    </div>


</template>
