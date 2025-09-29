<script>
import SearchBar from "@/components/SearchBar.vue";
import Summary from "@/components/Summary.vue";
import Details from "@/components/Details.vue";
import DailyForecast from "@/components/DailyForecast.vue";
import AirPollution from "@/components/AirPollution.vue";

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
        SearchBar,
        Summary,
        Details,
        DailyForecast,
        AirPollution,
    },
    props: {
        weatherInfo: {
            type: [Object, null],
            required: true,
        },
        airPollutionInfo: {
            type: [Object, null],
            required: false,
            default: null,
        },
    },
};
</script>

<template>
    <div class="flex justify-center w-full">
        <!-- Ở giữa -->
        <main class="min-h-screen flex items-center justify-center">
            <div class="space-y-4 w-[800px] m-5">
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
        <div class="flex flex-col item-center pt-5">
            <AirPollution :weatherInfo="weatherInfo" :airPollutionInfo="airPollutionInfo"
                @fetch-air-pollution="$emit('fetch-air-pollution', ...arguments)" />
        </div>
    </div>


</template>
