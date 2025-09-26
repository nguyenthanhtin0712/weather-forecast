<script>
export default {
    props: {
        weatherInfo: {
            type: Object,
            required: true,
        },
    },
};
</script>
<template>
    <div
        class="basis-[50%] bg-custom-image text-[white] rounded-3xl p-[20px] items-center flex space-x-5"
    >
        <div>
            <img class="w-[150px]" src="../assets/img/humidity.png" alt="icon"/>
        </div>
        <div>
            <div>
                <span class="font-bold">Humidity: {{ weatherInfo?.main?.humidity }} %</span>
                <p class="text-[14px] text-[gray] mb-[10px]">
                    Humidity is the concentration of water vapor present in the
                    air. Water vapor, the gaseous state of water, is generally
                    invisible to the human eye.
                </p>
                <p class="text-[14px] text-[gray]">
                    The same amount of water vapor results in higher relative
                    humidity in cool air than warm air.
                </p>
            </div>
        </div>
    </div>
</template>
