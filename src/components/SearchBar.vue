<script>
export default {
    // Thuộc tính nhận dữ liệu từ component cha
    props: {
        weatherInfo: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            address: "",
            cityList: [], // Danh sách thành phố
            suggestions: [], // Gợi ý autocomplete
            showSuggestions: false,
        };
    },
    methods: {
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
                // Đường dẫn đúng cho public assets khi dùng Vite
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
        },
    },
    mounted() {
        this.loadCityList();
    },
    computed: {
        countryFlag() {
            const country = this.weatherInfo?.city?.country;
            return country ? `https://flagsapi.com/${country}/flat/64.png` : null;
        }
    }

}

</script>

<template>
    <div
        class="bg-custom-image bg-cover bg-top p-[10px] rounded-3xl flex items-center gap-2 max-h-[100px] w-5/6 justify-center relative">
        <!--  -->
        <img v-if="countryFlag" :src="countryFlag" width="60" height="50" alt="Country Flag" />

        <input type="text" placeholder="Search for a city..."
            class="flex max-w-[200px] p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="address" @input="onInput" @keydown.enter="onEnter" @blur="onBlur" autocomplete="off" />

        <ul v-if="showSuggestions"
            class="absolute left-20 top-20 w-[200px] bg-[#222] z-10 rounded shadow max-h-60 overflow-y-auto border border-gray-700">
            <li v-for="city in suggestions" :key="city.id"
                class="px-3 py-2 hover:bg-[#444] cursor-pointer text-white text-sm"
                @mousedown.prevent="selectSuggestion(city)">
                {{ city.name }}<span v-if="city.country">, {{ city.country }}</span>
            </li>
        </ul>
        <button class="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" @click="onEnter">
            Search
        </button>
    </div>
</template>