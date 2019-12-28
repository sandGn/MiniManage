<template>
  <div v-if="visible" class="header-animat">
    <a-layout-header
      v-if="visible"
      :class="[fixedHeader && 'ant-header-fixedHeader', leftMenuOpen ? 'ant-header-side-opened' : 'ant-header-side-closed', ]"
      :style="{ padding: '0' }"
    >
      <!-- 左侧菜单 -->
      <div v-if="layout=== 'leftmenu'" class="header">
        <a-icon
          v-if="device === 'mobile'"
          class="trigger"
          :type="collapsed ? 'menu-fold' : 'menu-unfold'"
          @click="toggle"
        />
        <a-icon
          v-else
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="toggle"
        />
        <user-menu></user-menu>
      </div>
      <!-- 顶部菜单 -->
      <div v-else :class="['top-nav-header-index',theme]">
        <div class="header-index-wide">
          <div class="header-index-left">
            <div class="logo top-nav-header">
              <router-link :to="{ name: 'dashboard' }">
                <LogoSvg alt="logo" />
                <h1 v-if="device !== 'mobile'">{{ siteName }}</h1>
              </router-link>
            </div>
            <s-menu v-if="device !== 'mobile'" mode="horizontal" :menu="menus" :theme="theme" />
            <a-icon
              v-else
              class="trigger"
              :type="collapsed ? 'menu-fold' : 'menu-unfold'"
              @click="toggle"
            />
          </div>
          <user-menu class="header-index-right"></user-menu>
        </div>
      </div>
    </a-layout-header>
  </div>
</template>

<script>
import SMenu from '../Menu/menu'
import UserMenu from './UserMenu'
import LogoSvg from '../../assets/logo.svg?inline'
import { mixin } from '../../utils/mixin'
export default {
  name: 'GlobalHeader',
  mixins: [mixin],
  components: {
    SMenu,
    UserMenu,
    LogoSvg
  },
  props: {
    //是否收起
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    //菜单
    menus: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      visible: true
    }
  },
  watch: {},

  methods: {
    toggle() {
      this.$emit('toggle')
    }
  }
}
</script>
<style lang='less' scoped>
@import '../index.less';

.header-animat {
  position: relative;
  z-index: @ant-global-header-zindex;
}
.showHeader-enter-active {
  transition: all 0.25s ease;
}
.showHeader-leave-active {
  transition: all 0.5s ease;
}
.showHeader-enter,
.showHeader-leave-to {
  opacity: 0;
}
</style>