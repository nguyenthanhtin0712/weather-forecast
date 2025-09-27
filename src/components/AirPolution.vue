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
            aqiTest: 3 // Giá trị test, đổi số này để kiểm tra mũi tên (1-5)
        }
    }
}
</script>

<template>
    <div class="bg-custom-image-2 bg-cover bg-top p-[14px] rounded-3xl mt-[20%] max-h-screen w-[80%]">
        <h2 class="text-lg font-bold text-orange-600 mb-4 tracking-wide text-center">Air Pollution Level</h2>
        <div class="flex flex-col items-center">
            <div class="relative flex flex-row">
                <div
                    class="flex flex-col justify-end items-center h-[500px] w-16 rounded-full overflow-hidden shadow-lg border border-gray-100 bg-white">
                    <div class="w-full h-1/5 flex items-center justify-center border-b-4 border-white"
                        style="background-color:#43ea4a;">
                        <span class="text-xs font-bold text-white drop-shadow">Good</span>
                    </div>
                    <div class="w-full h-1/5 flex items-center justify-center border-b-4 border-white"
                        style="background-color:#ffe066;">
                        <span class="text-xs font-bold text-gray-800 drop-shadow">Fair</span>
                    </div>
                    <div class="w-full h-1/5 flex items-center justify-center border-b-4 border-white"
                        style="background-color:#ffb347;">
                        <span class="text-xs font-bold text-gray-800 drop-shadow">Moderate</span>
                    </div>
                    <div class="w-full h-1/5 flex items-center justify-center border-b-4 border-white"
                        style="background-color:#ff7f7f;">
                        <span class="text-xs font-bold text-white drop-shadow">Poor</span>
                    </div>
                    <div class="w-full h-1/5 flex items-center justify-center" style="background-color:#d90429;">
                        <span class="text-xs font-bold text-white drop-shadow">Very Poor</span>
                    </div>
                </div>
                <!-- Arrow indicator -->
                <div class="absolute left-full top-0 h-[500px] flex flex-col justify-end items-start pointer-events-none"
                    style="width:32px;">
                    <div v-for="level in 5" :key="level" class="flex items-center justify-start"
                        :style="{ height: '20%' }">
                        <svg v-if="aqiTest === level" width="28" height="28" viewBox="0 0 28 28" class="ml-1">
                            <polygon points="0,14 20,7 20,21" fill="#ff9800" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>