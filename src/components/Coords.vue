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
            <img class="w-[100px]" src="../assets/img/compass-278ddad8.png" alt="icon"/>
        </div>
        <div>
            <div class="mb-[10px]">
                <span class="font-bold"
                    >Longitude: {{ weatherInfo?.coord?.lon }}</span
                >
                <p class="text-[14px] text-[gray]">
                    Longitude measures distance east or west of the prime
                    meridian.
                </p>
            </div>
            <div>
                <span class="font-bold"
                    >Latitude: {{ weatherInfo?.coord?.lat }}</span
                >
                <p class="text-[14px] text-[gray]">
                    Latitude lines start at the equator (0 degrees latitude) and
                    run east and west, parallel to the equator.
                </p>
            </div>
        </div>
    </div>
</template>
