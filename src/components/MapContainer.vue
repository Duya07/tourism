<template>
  <div id="container">
    <div class="leftTopDiv">
      <MapSearch></MapSearch>
    </div>
    <MapSetting @wheel="handleWheel" class="setting"></MapSetting>
  </div>
</template>

<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader';
import { onMounted, shallowRef, ref, watch, createVNode, render } from 'vue';
import ConstLayer from '../util/ConstLayer';
import { useMapStore } from '@/stores/MapStore.js';
import { dailyWeather } from '../api/WeatherApi';
import Temperature from '@/components/Temperature.vue';

import MapSetting from '@/components/MapSetting.vue'
import MapSearch from '@/components/MapSearch.vue'

(window as any)._AMapSecurityConfig = {
  securityJsCode: 'e199d755238166ae561f99924ac30238',
}

const store = useMapStore();

const map = shallowRef(null);
var localMap: any;
var AMap: any;
var tempLayer: any;
var markers = [];
var tempMarker: any;


async function initMap() {
  AMap = await AMapLoader.load({
    key: "b7d93671b28fcc90455eb35defa5c090",
    version: "2.0",
    plugins: [
      "AMap.Scale",
      "AMap.Geolocation",
    ],
  })
  localMap = new AMap.Map("container", {
    zoom: 14,
    viewMode: "3D",
    center: [116.397436, 39.909165],
    isHotspot: true,
  });

  localMap.addControl(new AMap.Geolocation());
  localMap.addControl(new AMap.Scale());

  localMap.on('hotspotclick', async function (e: any) {
    if (tempMarker) {
      tempMarker.setMap(null);
      tempMarker = null;
    }
    tempMarker = new AMap.Marker({
      map: localMap,
      position: [e.lnglat.lng, e.lnglat.lat],
    });
    // 打开侧边栏
    store.ISOPEN = true;

    // 把地理位置存入 store
    store.POSITION = { lng: e.lnglat.lng, lat: e.lnglat.lat, name: e.name };


    // var response = await dailyWeather(e.lnglat.lng, e.lnglat.lat);
    // var weatherData = await response.json();

    // var infoWindow = new AMap.InfoWindow({
    //     isCustom: true,  //使用自定义窗体
    //     content: createInfoWindow(e, weatherData),
    //     offset: new AMap.Pixel(16, -45),
    // });
    // infoWindow.open(localMap, e.lnglat)
  });


  switch (store.LAYER) {
    case ConstLayer.TILELAYER: {
      tempLayer = new AMap.TileLayer.Satellite();
      localMap.add(tempLayer);
    }
  }
}

onMounted(() => {
  initMap();
})

function createInfoWindow(postion: any, weatherData: any) {

  const app = createVNode(Temperature, {
    ...postion,
    ...weatherData.result.daily,
  });
  const mountNode = document.createElement("div");
  render(app, mountNode);
  return mountNode;
}

// 修改图层
watch(() => store.LAYER, (newLayer) => {
  if (tempLayer != null) {
    localMap.remove(tempLayer);
  }
  switch (newLayer) {
    case ConstLayer.TILELAYER: {
      tempLayer = new AMap.TileLayer.Satellite();
      localMap.add(tempLayer);
    }
  }
})

function handleWheel(event: any) {
  event.preventDefault();
}
</script>

<style scoped>
#container {
  height: 100%;
  width: 100%;
  padding: 0px;
  margin: 0px;
}

.leftTopDiv {
    position: fixed;
    z-index: 4;
    top: 1rem;
    left: 1rem;
    width: 28%;
}

.setting {
    position: absolute;
    z-index: 4;
    right: 1rem;
}
</style>