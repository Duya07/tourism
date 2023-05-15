<template>
    <div>
        <div v-size-ob="handleChange" class="scroll-container" @wheel="handleWheel">
            <div class="v-scroll">
                <div class="content">
                    <div class="cell">
                        <span>日期</span>
                        <div v-for="temp in weatherData.temperature">{{ formatDate((temp as any).date) }}</div>
                    </div>
                    <div class="cell">
                        <span>最高</span>
                        <div v-for="temp in weatherData.temperature">{{ tranformTemperature((temp as any).max) }}°C</div>
                    </div>
                    <div class="cell">
                        <span>最低</span>
                        <div v-for="temp in weatherData.temperature">{{ tranformTemperature((temp as any).min) }}°C</div>
                    </div>
                    <div class="cell">
                        <span>天气</span>
                        <div v-for="temp in weatherData.skycon">{{ tranformSkycon((temp as any).value) }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue';
import vSizeOb from '../script/SizeDirect';
import moment from 'moment'
import ConstSky from '@/util/ConstSky';
import { dailyWeather } from '../api/WeatherApi';

directives: {
    vSizeOb
}

const props = defineProps<{
    lnglat: {
        lng: string,
        lat: string,
    }
}>()

const s = reactive({
    w: 0,
    h: 0,
})
function handleChange(size: any) {
    s.w = size.width;
    s.h = size.height;
}

var weatherData = reactive({
    temperature: Array<object>,
    skycon: Array<object>,
})

watch(() => [props.lnglat.lng, props.lnglat.lat], async ([newLng, newLat]) => {
    var response = await dailyWeather(newLng, newLat);
    var data = await response.json();
    Object.assign(weatherData, data.result.daily);
})

function formatDate(value: string) {
    if (value) {
        return moment(String(value)).format('MM/DD')
    }
}

function tranformTemperature(value: string) {
    if (value) {
        let num = Number(value);
        return Math.round(num);
    }
}

function tranformSkycon(value: keyof typeof ConstSky) {
    if (value) {
        return ConstSky[value];
    }
}


function handleWheel(event: any) {
    event.stopPropagation();
}
</script>

<style scoped>
.scroll-container {
    width: 100%;
    height: 140px;
}

.v-scroll {
    width: calc(v-bind('s.h') * 1px);
    height: calc(v-bind('s.w') * 1px);
    position: relative;
    overflow: auto;
    transform-origin: 0 0;
    transform: translateY(calc(v-bind('s.h') * 1px)) rotate(-90deg);
}

.v-scroll::-webkit-scrollbar {
    width: 0;
}

.content {
    height: calc(v-bind('s.h') * 1px);
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    position: absolute;
    left: 100%;
    transform-origin: 0 0;
    transform: rotate(90deg);
}

.cell {
    display: flex;
}

.cell span {
    line-height: 30px;
    margin-right: 20px;
}

.cell div {
    width: 60px;
    text-align: center;
}
</style>