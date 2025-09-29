<script>
export default {
    props: {
        weatherInfo: {
            type: Object,
            required: true,
        },
    },
    computed: {
        nextFourDays() {
            // Gom các phần tử theo ngày UTC
            if (!this.weatherInfo?.list) return [];
            const now = new Date();
            const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
            const daysMap = {};
            for (const item of this.weatherInfo.list) {
                const utcDate = new Date(item.dt * 1000);
                const key = utcDate.getUTCFullYear() + '-' + (utcDate.getUTCMonth() + 1) + '-' + utcDate.getUTCDate();
                if (!daysMap[key]) daysMap[key] = [];
                daysMap[key].push(item);
            }
            // Lấy 4 ngày tiếp theo (bỏ hôm nay)
            const result = [];
            const keys = Object.keys(daysMap).filter(dateStr => {
                const [year, month, day] = dateStr.split('-').map(Number);
                const d = new Date(Date.UTC(year, month - 1, day));
                // Chỉ lấy ngày lớn hơn hôm nay (UTC)
                return d > todayUTC;
            }).sort((a, b) => {
                // Sắp xếp tăng dần theo ngày
                const [y1, m1, d1] = a.split('-').map(Number);
                const [y2, m2, d2] = b.split('-').map(Number);
                return new Date(Date.UTC(y1, m1 - 1, d1)) - new Date(Date.UTC(y2, m2 - 1, d2));
            });
            for (let i = 0; i < Math.min(4, keys.length); i++) {
                const arr = daysMap[keys[i]];
                // Đếm tần suất weather
                const freq = {};
                let iconMap = {};
                for (const item of arr) {
                    const main = item.weather[0].main;
                    freq[main] = (freq[main] || 0) + 1;
                    // Lưu icon cuối cùng cho loại weather này
                    iconMap[main] = item.weather[0].icon;
                }
                // Tìm loại weather xuất hiện nhiều nhất
                let maxWeather = null, maxCount = 0;
                for (const w in freq) {
                    if (freq[w] > maxCount) {
                        maxWeather = w;
                        maxCount = freq[w];
                    }
                }
                // Lấy ngày đầu tiên của mảng
                const firstDate = new Date(arr[0].dt * 1000);
                result.push({
                    weekday: firstDate.toLocaleDateString("en-GB", { weekday: "long", timeZone: "UTC" }),
                    dayMonthYear: firstDate.toLocaleDateString("en-GB", { day: "numeric", month: "numeric", year: "numeric", timeZone: "UTC" }),
                    weather: maxWeather,
                    icon: iconMap[maxWeather]
                });
            }
            return result;
        },
    }
}
</script>

<template>
    <div class="bg-custom-image-2 bg-cover bg-top p-5 rounded-3xl w-full">
        <h2 class="text-lg font-bold text-orange-600 mb-[8px] tracking-wide">Weather Daily</h2>
        <div class="flex flex-row gap-3 w-full justify-center space-x-2">
            <div v-for="(day, index) in nextFourDays" :key="index"
                class="bg-custom-image-1 bg-cover bg-top flex justify-between p-[10px] rounded-3xl items-center">
                <div class="flex flex-col items-start ml-2">
                    <span class="text-[white] font-bold text-[14px] mb-2">{{ day.weekday }}</span>
                    <span class="text-[white] text-[14px] mb-2">{{ day.dayMonthYear }}</span>
                    <span class="text-[white] text-[14px]">{{ day.weather }}</span>
                </div>
                <div class="">
                    <img :src="`https://openweathermap.org/img/wn/${day.icon}@2x.png`" alt="Weather Icon"
                        class="w-30" />
                </div>
            </div>
        </div>

    </div>
</template>