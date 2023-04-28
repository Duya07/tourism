<template>
  <!-- 地图 -->
  <div id="container"></div>
</template>

<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader';
import { shallowRef } from '@vue/reactivity'
import { onMounted, ref } from 'vue';
import ConstLayer from '../util/ConstLayer';
import ConstSetting from '../util/ConstSetting';
import { useMapStore } from '@/stores/MapStore.js';

const store = useMapStore();

const map = shallowRef(null);
let localMap: any;
let amap: any;
let tempLayer: any;


// 初始化地图
const initMap = () => {
  AMapLoader.load({
    key: "b7d93671b28fcc90455eb35defa5c090", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [
      "AMap.Scale", //比例尺，显示当前地图中心的比例尺
      "AMap.Geolocation", //定位，提供了获取用户当前准确位置、所在城市的方法
    ],
  })
    .then((AMap) => {
      amap = AMap;
      localMap = new AMap.Map("container", {//设置地图容器id
        zoom: 14, //初始化地图层级
        viewMode: "3D", //是否为3D地图模式
        center: [116.397436, 39.909165], //初始化地图中心点位置
        dragEnable: true, //禁止鼠标拖拽
        scrollWheel: true, //鼠标滚轮放大缩小
        doubleClickZoom: true, //双击放大缩小
      });
      
      localMap.addControl(new AMap.Geolocation());
      localMap.addControl(new AMap.Scale());

      // 保存的数据显示默认不是 标准地图 切换成目标地图
      switch (store.layer) {
        // 卫星地图
        case ConstLayer.TILELAYER: {
          tempLayer = new amap.TileLayer.Satellite();
          localMap.add(tempLayer);
        }
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

onMounted(() => {
  initMap();
})


store.$subscribe((mutation, state) => {

  switch ((mutation.events as any).key) {
    // 修改的是 图层 的话
    case ConstSetting.LAYER: {
      if (tempLayer != null) {
        localMap.remove(tempLayer);
      }
      switch (state.layer) {
        case ConstLayer.TILELAYER: {
          tempLayer = new amap.TileLayer.Satellite();
          localMap.add(tempLayer);
        }
      }
    }
  }
})

</script>

<style scoped>
#container {
  height: 100%;
  width: 100%;
  padding: 0px;
  margin: 0px;
}
</style>