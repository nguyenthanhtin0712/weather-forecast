<script>
export default {
    props: {
        weatherInfo: {
            type: Object,
            required: true,
        },
        airPollutionInfo: {
            type: Object,
            required: false,
            default: null,
        },
    },
    data() {
        return {
            showDetails: false,
        };
    },
    mounted() {
        // Nếu chưa có airPollutionInfo, tự động lấy dữ liệu
        if (!this.airPollutionInfo && this.weatherInfo?.city?.coord) {
            const { lat, lon } = this.weatherInfo.city.coord;
            this.$emit('fetch-air-pollution', lat, lon);
        }
    },
    methods: {
        handleArrowEnter() {
            this.showDetails = true;
        },
        handleArrowLeave() {
            this.showDetails = false;
        },
    },
}
</script>

<template>
    <div class="bg-custom-image-1 bg-cover bg-top p-[14px] rounded-3xl w-[80%]">
        <h2 class="text-lg font-bold text-orange-600 mb-4 tracking-wide text-center">Air Pollution Level</h2>
        <div class="flex flex-col items-center">
            <div class="relative flex flex-row">
                <div
                    class="flex flex-col justify-end items-center h-[560px] w-16 rounded-full overflow-hidden shadow-lg border border-gray-100 bg-white">
                    <div class="w-full h-1/5 flex items-center justify-center" style="background-color:#43ea4a;">
                        <span class="text-xs font-bold text-white drop-shadow">Good</span>
                    </div>
                    <div class="w-full h-1/5 flex items-center justify-center" style="background-color:#ffe066;">
                        <span class="text-xs font-bold text-gray-800 drop-shadow">Fair</span>
                    </div>
                    <div class="w-full h-1/5 flex items-center justify-center" style="background-color:#ffb347;">
                        <span class="text-xs font-bold text-gray-800 drop-shadow">Moderate</span>
                    </div>
                    <div class="w-full h-1/5 flex items-center justify-center" style="background-color:#ff7f7f;">
                        <span class="text-xs font-bold text-white drop-shadow">Poor</span>
                    </div>
                    <div class="w-full h-1/5 flex items-center justify-center" style="background-color:#d90429;">
                        <span class="text-xs font-bold text-white drop-shadow">Very Poor</span>
                    </div>
                </div>

                <!-- Mũi tên -->
                <div class="absolute left-full top-0 h-[560px] flex flex-col justify-between items-center pointer-events-auto w-[32px]">
                    <div v-for="level in 5" :key="level" class="flex items-center justify-center w-full"
                        :style="{ height: '20%' }">
                        <div v-if="airPollutionInfo?.list[0]?.main?.aqi === level" class="relative">
                            <svg width="28" height="28" viewBox="0 0 28 28" class="cursor-pointer m-auto block"
                                @mouseenter="handleArrowEnter" @mouseleave="handleArrowLeave">
                                <polygon points="4,14 22,6 22,22" fill="#ff9800" />
                            </svg>

                            <!-- Show các chỉ số ô nhiễm -->
                            <div v-if="showDetails"
                                class="absolute left-10 top-1/2 -translate-y-1/2 ml-2 w-28 bg-black bg-opacity-80 text-white rounded-lg shadow-lg p-3 z-50 text-xs">
                                <div v-if="airPollutionInfo?.list[0]?.components">
                                    <div v-for="(value, key) in airPollutionInfo.list[0].components" :key="key"
                                        class="flex justify-between mb-1">
                                        <span class="font-semibold">{{ key.toUpperCase() }}</span>
                                        <span>{{ value }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>