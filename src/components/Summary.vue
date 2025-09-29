<script>
export default {
    props: {
        weatherInfo: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            currentTime: this.getCurrentTime(),
        };
    },
    methods: {
        getCurrentTime() {
            const date = new Date();
            const options = {
                weekday: "long",   // Monday
                year: "numeric",   // 2025
                month: "numeric",  // 1
                day: "numeric",    // 25
            };
            return date.toLocaleDateString("en-GB", options);
        }
    }
};
</script>
<template>
    <div class="bg-custom-image bg-cover bg-top p-[10px] rounded-3xl flex items-center max-h-[100px] w-full justify-between space-x-1">
        <div class="">
            <img :src="`https://openweathermap.org/img/wn/${weatherInfo?.list[0].weather[0].icon}@2x.png`"
                alt="Weather Icon" class="w-20" />
        </div>
        <!-- Location and Current Time -->
        <div class="">
            <div class="flex justify-start text-[white] text-[14px] space-x-1 items-center mb-2">
                <span class="text-[white] text-[14px] font-bold uppercase">{{ weatherInfo?.list[0].weather[0].main }}: </span>
                <span class="text-[white] text-[14px] font-bold">{{ weatherInfo?.list[0].weather[0].description }}</span>
            </div>
            <div class="flex justify-start text-[white] text-[14px] space-x-1 items-center mb-2">
                <img src="@/assets/img/location-3783e49e.svg" alt="location" width="20px" height="20px" />
                <span class="text-[white] text-[14px]">{{ weatherInfo?.city?.name }}, {{ weatherInfo?.city?.country }}</span>
            </div>
            <div class="flex text-[white] items-center space-x-1">
                <svg fill="currentColor" width="20px" height="14px" viewBox="0 0 122.88 122.88" version="1.1"
                    id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    xml:space="preserve">
                    <g>
                        <path
                            d="M81.61,4.73c0-2.61,2.58-4.73,5.77-4.73s5.77,2.12,5.77,4.73v20.72c0,2.61-2.58,4.73-5.77,4.73s-5.77-2.12-5.77-4.73V4.73 L81.61,4.73z M29.61,4.73c0-2.61,2.58-4.73,5.77-4.73s5.77,2.12,5.77,4.73v20.72c0,2.61-2.58,4.73-5.77,4.73s-5.77-2.12-5.77-4.73 V4.73L29.61,4.73z M6.4,45.32h110.08V21.47c0-0.8-0.33-1.53-0.86-2.07c-0.53-0.53-1.26-0.86-2.07-0.86H103 c-1.77,0-3.2-1.43-3.2-3.2c0-1.77,1.43-3.2,3.2-3.2h10.55c2.57,0,4.9,1.05,6.59,2.74c1.69,1.69,2.74,4.02,2.74,6.59v27.06v65.03 c0,2.57-1.05,4.9-2.74,6.59c-1.69,1.69-4.02,2.74-6.59,2.74H9.33c-2.57,0-4.9-1.05-6.59-2.74C1.05,118.45,0,116.12,0,113.55V48.53 V21.47c0-2.57,1.05-4.9,2.74-6.59c1.69-1.69,4.02-2.74,6.59-2.74H20.6c1.77,0,3.2,1.43,3.2,3.2c0,1.77-1.43,3.2-3.2,3.2H9.33 c-0.8,0-1.53,0.33-2.07,0.86c-0.53,0.53-0.86,1.26-0.86,2.07V45.32L6.4,45.32z M116.48,51.73H6.4v61.82c0,0.8,0.33,1.53,0.86,2.07 c0.53,0.53,1.26,0.86,2.07,0.86h104.22c0.8,0,1.53-0.33,2.07-0.86c0.53-0.53,0.86-1.26,0.86-2.07V51.73L116.48,51.73z M50.43,18.54 c-1.77,0-3.2-1.43-3.2-3.2c0-1.77,1.43-3.2,3.2-3.2h21.49c1.77,0,3.2,1.43,3.2,3.2c0,1.77-1.43,3.2-3.2,3.2H50.43L50.43,18.54z" />
                    </g>
                </svg>
                <span class="text-[white] text-[14px]">{{ this.currentTime }}</span><!--  -->
            </div>
        </div>
        <div class="">
            <div class="mb-[10px]">
                <span class="text-[white] text-[14px]">Longitude: {{ weatherInfo?.city?.coord?.lon }}</span>
            </div>
            <div>
                <span class="text-[white] text-[14px]">Latitude: {{ weatherInfo?.city?.coord?.lat }}</span>
            </div>
        </div>
    </div>
</template>