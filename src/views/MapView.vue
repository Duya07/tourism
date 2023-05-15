<template>
    <div class="homeDiv" ref="box"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp">
        <div class="map" ref="mapRef">
            <MapContainer></MapContainer>
        </div>
        <div class="resize" ref="resize"
            @mousedown="handleMouseDown" v-show="isOpenInfo">
            <span class="space">⋮</span></div>
        <div class="info" ref="infoRef" v-show="isOpenInfo">
            <PointInfo></PointInfo>
        </div>
    </div>
</template>

<script setup lang="ts">
import MapContainer from '@/components/MapContainer.vue'
import PointInfo from '@/components/PointInfo.vue'
import { useMapStore } from '@/stores/MapStore.js'
import { ref, watch } from 'vue'


const box = ref();
const mapRef = ref();
const resize = ref();
const infoRef = ref();

let isDown = false;
let startX = 0;
let startWidth = 0;

function handleMouseDown(e: any) {
    isDown = true;
    startX = e.clientX;
    startWidth = mapRef.value.offsetWidth;
}

function handleMouseMove(e: any) {
    if (isDown) {
        let x = e.clientX;
        let moveX = x - startX;
        let newWidth = startWidth + moveX;
        newWidth = newWidth <= (box.value.offsetWidth / 2.5) ? (box.value.offsetWidth / 2.5) : newWidth;
        let infoWidth = box.value.offsetWidth - newWidth - 10;
        infoWidth = (box.value.offsetWidth * 0.2) >= infoWidth ? (box.value.offsetWidth * 0.2) : infoWidth;
        infoRef.value.style.width = infoWidth +  "px";
    }
}

function handleMouseUp() {
    isDown = false;
}

const store = useMapStore();

const isOpenInfo = ref(false);

watch(() => store.ISOPEN, (newValue) => {
    if (newValue == true) {
        isOpenInfo.value = newValue;
        let newWidth = box.value.offsetWidth / 1.35;
        infoRef.value.style.width = box.value.offsetWidth - newWidth - 10 + "px";
        mapRef.value.querySelector("#container").style.borderTopRightRadius = "10px";
        mapRef.value.querySelector("#container").style.borderBottomRightRadius = "10px";
    }
})
</script>

<style scoped>
.homeDiv {
    height: 100%;
    width: 100%;
    padding: 0px;
    margin: 0px;
    position: relative;
    display: flex;
}

.map {
    width: 100%;
    flex: 1;
}

.resize {
    height: 100%;
    width: 10px;
    cursor: col-resize;
    display: flex;
    align-items: center;
    justify-content: center;
}

.info {
    height: 100%;
}

.space {
    font-size: x-large;
}
</style>