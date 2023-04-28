<script setup lang="ts">
import MapView from './views/MapView.vue'
import { NConfigProvider, type GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  Input: {
    borderHover: "",
    borderFocus: "",
    boxShadowFocus: "",
    border: ""
  }
}

</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <MapView></MapView>
  </n-config-provider>
</template>

<style scoped>
#app {
  height: 100%;
  width: 100%;
  padding: 0px;
  margin: 0px;
}
</style>
