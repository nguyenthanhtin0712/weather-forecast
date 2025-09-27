<script>
export default {
    data() {
        return {
            currentTime: this.getCurrentTime(),
            address: "",
            cityList: [], // Danh sách thành phố
            suggestions: [], // Gợi ý autocomplete
            showSuggestions: false,
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
        onInput() {
            const input = this.address.trim().toLowerCase();
            if (input.length === 0) {
                this.suggestions = [];
                this.showSuggestions = false;
                return;
            }
            // Lọc tối đa 10 gợi ý
            this.suggestions = this.cityList.filter(city =>
                city.name.toLowerCase().startsWith(input)
            ).slice(0, 10);
            this.showSuggestions = this.suggestions.length > 0;
        },
        selectSuggestion(city) {
            this.address = city.name;
            this.showSuggestions = false;
            this.suggestions = [];
            this.$emit("address-entered", city.name);
        },
        onEnter() {
            this.$emit("address-entered", this.address);
            this.showSuggestions = false;
        },
        async loadCityList() {
            // Đọc file JSON lớn qua fetch
            try {
                const res = await fetch("/src/assets/city-lists/current.city.list.json");
                if (!res.ok) throw new Error("Không thể tải danh sách thành phố");
                this.cityList = await res.json();
            } catch (e) {
                console.error(e);
            }
        },
        onBlur() {
            // Ẩn gợi ý sau 200ms
            setTimeout(() => { this.showSuggestions = false; }, 200);
        }
    },
    
    // Thuộc tính nhận dữ liệu từ component cha
    props: {
        weatherInfo: {
            type: [Object, null],
            required: true,
        },
    },

    // Load danh sách thành phố khi component được gắn vào DOM
    mounted() {
        this.loadCityList();
    },
};
</script>

<template>
    <div class="bg-custom-image bg-cover bg-top p-[20px] rounded-3xl">
        <!-- Search Box -->
        <div class="flex items-center justify-center bg-[#080b0f] p-[10px] rounded-xl mb-[20px] relative">
            <input v-model="address" type="text" class="bg-[#080b0f] outline-none text-[white]" placeholder="Enter the name of city"
                @input="onInput" @keyup.enter="onEnter" @blur="onBlur" autocomplete="off" />
            <i class="fa-solid fa-magnifying-glass text-[white] text-[20px] cursor-pointer" @click="onEnter"></i>
            <ul v-if="showSuggestions" class="absolute left-0 right-0 top-[45px] bg-[#222] z-10 rounded shadow max-h-60 overflow-y-auto">
                <li v-for="city in suggestions" :key="city.id" class="px-3 py-2 hover:bg-[#444] cursor-pointer text-white text-sm" @mousedown.prevent="selectSuggestion(city)">
                    {{ city.name }}<span v-if="city.country">, {{ city.country }}</span>
                </li>
            </ul>
        </div>

        <!-- Weather Icon and Temperature -->
        <div class="mb-[10px]">
            <img :src="`https://openweathermap.org/img/wn/${weatherInfo?.weather[0].icon}@2x.png`" alt="Weather Icon" class="w-30"/>
        </div>

        <!-- Weather Details -->
        <div class="border-b pb-[20px] mb-[20px]">
            <span class="text-[32px] text-white">{{ weatherInfo?.main?.temp }} °C</span><!--  -->
            <div class="flex items-center space-x-1">
                <span class="text-[white] text-[14px]">{{ weatherInfo?.weather[0]?.main }}</span>
            </div>
        </div>

        <!-- Location and Current Time -->
        <div>
            <div class="flex justify-start text-[white] text-[14px] space-x-1 items-center mb-3">
                <img src="@/assets/img/location-3783e49e.svg" alt="location" width="20px" height="20px"/><!--  -->
                <span>{{ weatherInfo?.name }}, {{ weatherInfo?.sys?.country }}</span><!--  -->
            </div>
            <div class="flex text-[white] text-[14px] space-x-1 items-center">
                <svg fill="currentColor" width="20px" height="14px" viewBox="0 0 122.88 122.88" version="1.1" id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve">
                    <g>
                        <path
                            d="M81.61,4.73c0-2.61,2.58-4.73,5.77-4.73s5.77,2.12,5.77,4.73v20.72c0,2.61-2.58,4.73-5.77,4.73s-5.77-2.12-5.77-4.73V4.73 L81.61,4.73z M29.61,4.73c0-2.61,2.58-4.73,5.77-4.73s5.77,2.12,5.77,4.73v20.72c0,2.61-2.58,4.73-5.77,4.73s-5.77-2.12-5.77-4.73 V4.73L29.61,4.73z M6.4,45.32h110.08V21.47c0-0.8-0.33-1.53-0.86-2.07c-0.53-0.53-1.26-0.86-2.07-0.86H103 c-1.77,0-3.2-1.43-3.2-3.2c0-1.77,1.43-3.2,3.2-3.2h10.55c2.57,0,4.9,1.05,6.59,2.74c1.69,1.69,2.74,4.02,2.74,6.59v27.06v65.03 c0,2.57-1.05,4.9-2.74,6.59c-1.69,1.69-4.02,2.74-6.59,2.74H9.33c-2.57,0-4.9-1.05-6.59-2.74C1.05,118.45,0,116.12,0,113.55V48.53 V21.47c0-2.57,1.05-4.9,2.74-6.59c1.69-1.69,4.02-2.74,6.59-2.74H20.6c1.77,0,3.2,1.43,3.2,3.2c0,1.77-1.43,3.2-3.2,3.2H9.33 c-0.8,0-1.53,0.33-2.07,0.86c-0.53,0.53-0.86,1.26-0.86,2.07V45.32L6.4,45.32z M116.48,51.73H6.4v61.82c0,0.8,0.33,1.53,0.86,2.07 c0.53,0.53,1.26,0.86,2.07,0.86h104.22c0.8,0,1.53-0.33,2.07-0.86c0.53-0.53,0.86-1.26,0.86-2.07V51.73L116.48,51.73z M50.43,18.54 c-1.77,0-3.2-1.43-3.2-3.2c0-1.77,1.43-3.2,3.2-3.2h21.49c1.77,0,3.2,1.43,3.2,3.2c0,1.77-1.43,3.2-3.2,3.2H50.43L50.43,18.54z" />
                    </g>
                </svg>
                <span>{{ this.currentTime }}</span><!--  -->
            </div>
        </div>
    </div>
</template>
