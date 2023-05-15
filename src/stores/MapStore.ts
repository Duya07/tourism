import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import ConstLayer from '../util/ConstLayer'
import { LAYER, ISOPEN, POSITION } from '../util/ConstSetting'

export const useMapStore = defineStore('MapStore', {
    state: () => ({
        LAYER    : ConstLayer.NOMALLAYER,
        ISOPEN   : false,
        POSITION : {
            lng: "",
            lat: "",
            name: "",
        }
    })
})
