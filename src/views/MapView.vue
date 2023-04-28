<template>
    <div class="homeDiv">
        <div class="leftTopDiv">
            <MapSearch></MapSearch>
        </div>
        <MapSetting></MapSetting>
        <MapContainer></MapContainer>
    </div>
</template>

<script setup lang="ts">
import MapContainer from '../components/MapContainer.vue'
import MapSetting from '@/components/MapSetting.vue'
import MapSearch from '@/components/MapSearch.vue'
import { ArrowBarUp } from '@vicons/tabler'
</script>

<style scoped>
.homeDiv {
    height: 100%;
    width: 100%;
    padding: 0px;
    margin: 0px;
    position: relative;
}

.leftTopDiv {
    position: fixed;
    z-index: 2;
    top: 1rem;
    left: 1rem;
    width: 100%;
}
</style>