<template>
  <a-config-provider :locale="zh_CN">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import { deviceEnquire, DEVICE_TYPE } from '../src/utils/device'
import { TOGGLE_DEVICE } from './store/mutation-types'
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  data() {
    return {
      zh_CN
    }
  },
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
