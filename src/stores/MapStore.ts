import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import ConstLayer from '../util/ConstLayer'
import ConstSetting from '../util/ConstSetting'

export const useMapStore = defineStore('MapStore', {
    state: () => ({
        layer : ConstLayer.NOMALLAYER,
    })
})
