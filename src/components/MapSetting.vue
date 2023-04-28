<template>
    <div class="settingDiv">
        <n-space class="hSpace">
            <n-space vertical>
                <n-card class="layerCard" title="图层" v-show="showLayers">
                    <n-space justify="space-around">
                        <div @click="selectNormalLayer">
                            <img width="60" src="../assets/NormalLayer.png" alt="标准地图" class="layerImage" />
                            <div style="text-align: center;">标准</div>
                        </div>
                        <div @click="selectTileLayer">
                            <img width="60" src="../assets/TileLayer.png" alt="卫星地图" class="layerImage" />
                            <div style="text-align: center;">卫星</div>
                        </div>
                    </n-space>
                </n-card>
            </n-space>
            <n-space vertical>
                <n-button class="layerButton" color="white" @click="changeLayer">
                    <n-icon size="20" color="black">
                        <Layers />
                    </n-icon>
                </n-button>
            </n-space>
        </n-space>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Layers } from '@vicons/ionicons5';
import ConstLayer from '../util/ConstLayer';
import { useMapStore } from '@/stores/MapStore.js';

const store = useMapStore();

let showLayers = ref(false);

function changeLayer() {
    showLayers.value = !showLayers.value;
}

function selectNormalLayer() {
    store.layer = ConstLayer.NOMALLAYER;
}

function selectTileLayer() {
    store.layer = ConstLayer.TILELAYER;
} 
</script>

<style scoped>
.settingDiv {
    z-index: 2;
    position: relative;
}

.hSpace {
    position: fixed;
    top: 1rem;
    right: 1rem;
}

.layerButton {
    padding: .75rem 1rem;
    margin-bottom: 1rem;
    border-radius: .25rem;
    background-color: white;
    width: auto;
    border-width: 0;
    box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5);
}

.layerCard {
    margin-bottom: 1rem;
    border-radius: .25rem;
    background-color: white;
    width: auto;
    border-width: 0;
    box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5);
}

.layerImage {
    border-radius: 20%;
}
</style>
