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
            // Định dạng long là chữ, ví dụ: "Thứ Hai, 1 Tháng 1, 2024", còn numeric là số, ví dụ: "01/01/2024"
            const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            };
            // Chuyển đổi sang định dạng tiếng Việt
            return date.toLocaleDateString("vi-VN", options);
        },
    }
}
</script>

<template>
    <div class="bg-custom-image-2 bg-cover bg-top p-5 rounded-3xl w-full">
        <h2 class="text-lg font-bold text-orange-600 mb-[10px] tracking-wide">Weather Daily</h2>
        <div class="flex flex-row gap-3 w-full justify-center">
            <!-- 7 ngày, mỗi ngày là 1 card nhỏ -->
            <div v-for="day in 7" :key="day"
                class="bg-custom-image-1 bg-cover bg-top p-[10px] rounded-3xl flex flex-col items-center w-32">
                <div class="flex flex-col items-center">
                    <span class="text-[white] font-bold text-[14px] mb-2">Monday</span>
                    <span class="text-[white] text-[14px] mb-2">1/1/1111</span>
                    <span class="text-[white] text-[14px]">Rain</span>
                </div>
                <div class="mb-[10px]">
                    <img :src="`https://openweathermap.org/img/wn/${weatherInfo?.weather[0].icon}@2x.png`"
                        alt="Weather Icon" class="w-20" />
                </div>
            </div>
        </div>
    </div>
</template>