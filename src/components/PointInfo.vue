<template>
    <div class="infoDiv" @wheel="handleWheel">
        <div class="text">
            <div class="name">
                <span>{{ positionData.name }}</span>
            </div>
            <div class="title">
                <span>14天天气</span>
            </div>
            <Temperature :lnglat="positionData" class="temp"></Temperature>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMapStore } from '@/stores/MapStore.js';
import Temperature from './Temperature.vue';
import { watch, reactive } from 'vue';

const store = useMapStore();

var positionData = reactive({
    name: "",
    lng: "",
    lat: "",
})

watch(() => store.POSITION, async (newPosition) => {
    Object.assign(positionData, newPosition);
})

function handleWheel(event: any) {
  event.preventDefault();
}
</script>

<style scoped>
.infoDiv {
    height: 100%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background-image: linear-gradient(90deg, hsla(0, 0%, 99%, 1) 0%, hsla(0, 0%, 91%, 1) 100%);
    backdrop-filter: blur(10px);
}

.name {
    font-size: x-large;
    font-weight: bolder;
}

.title {
    font-size: large;
    font-weight: bold;
    margin-top: 10px;
}

.text {
    padding: 10px;
}

.temp {
    margin-top: 10px;
}
</style>