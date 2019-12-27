<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { deviceEnquire, DEVICE_TYPE } from '../src/utils/device'
import { TOGGLE_DEVICE } from './store/mutation-types'

export default {
  mounted() {
    deviceEnquire(deviceType => {
      // console.log('deviceType', deviceType)
      this.$store.commit(TOGGLE_DEVICE, deviceType)
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          this.$store.dispatch('setLeftMenuOpen', true)
          break
        case DEVICE_TYPE.TABLET:
          this.$store.dispatch('setLeftMenuOpen', false)
          break
        case DEVICE_TYPE.MOBILE:
        default:
          this.$store.dispatch('setLeftMenuOpen', true)
          break
      }
    })
  }
}
</script>
<style>
#app {
  height: 100%;
}
</style>
