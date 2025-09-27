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
        },
    },

    // Load danh sách thành phố khi component được gắn vào DOM
    mounted() {
        this.loadCityList();
    },
}

</script>

<template>
    <div class="bg-custom-image bg-cover bg-top p-[10px] rounded-3xl flex items-center gap-2 max-h-[100px]">
        <img class="f" src="https://flagsapi.com/VN/flat/64.png">
        <input
            type="text"
            placeholder="Search for a city..."
            class="flex w-[250px] p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />       
        <button class="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Search
        </button>
    </div>
</template>