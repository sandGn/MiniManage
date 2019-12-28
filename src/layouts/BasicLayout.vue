<!-- 基础页面布局，包含了头部导航，侧边栏和通知栏： -->
<template>
  <a-layout :class="['layout',device]">
    <!-- 移动端抽屉 -->
    <a-drawer
      v-if="this.isMobile()"
      placement="left"
      :wrapClassName="`drawer-sider ${theme}`"
      :closable="false"
      :visible="collapsed"
      @close="drawerClose"
    >
      <!-- 移动端菜单 -->
      <a-layout-sider
        :collapsed="false"
        :class="['sider', isDesktop() ? null : 'shadow', theme, fixedLeftMenu ? 'ant-fixed-leftmenu' : null ]"
        width="256px"
        :collapsible="true"
        :trigger="null"
        @menuSelect="menuSelect"
      >
        <!-- logo -->
        <div class="logo">
          <router-link :to="{name:'dashboard'}">
            <LogoSvg alt="logo" />
            <h1>{{ siteName }}</h1>
          </router-link>
        </div>
        <!-- 菜单item -->
        <s-menu :collapsed="collapsed" :menu="menus" :theme="theme" mode="inline"></s-menu>
      </a-layout-sider>
    </a-drawer>

    <!-- PC 左侧菜单 -->
    <a-layout-sider
      v-else-if="this.isLeftMenu()"
      :collapsed="collapsed"
      :class="['sider', this.isDesktop() ? null : 'shadow', theme, fixedLeftMenu ? 'ant-fixed-leftmenu' : null ]"
      width="256px"
      :collapsible="true"
      :trigger="null"
    >
      <!-- logo -->
      <div class="logo">
        <router-link :to="{name:'dashboard'}">
          <LogoSvg alt="logo" />
          <h1>{{ siteName }}</h1>
        </router-link>
      </div>
      <!-- 菜单item -->
      <s-menu :collapsed="collapsed" :menu="menus" :theme="theme" mode="inline"></s-menu>
    </a-layout-sider>

    <a-layout
      :class="[layout, `content-width-${contentWidth}`]"
      :style="{ paddingLeft: contentPaddingLeft, minHeight: '100vh' }"
    >
      <!-- 头部 -->
      <global-header
        :collapsed="collapsed"
        :menus="menus"
        @toggle="toggle"
      ></global-header>
      <!-- 内容 -->
      <a-layout-content
        :style="{ height: '100%', margin: '24px 24px 0', paddingTop: fixedHeader ? '64px' : '0' }"
      >
        <route-view />
      </a-layout-content>
      <!-- 底部 -->
      <a-layout-footer>
        <global-footer />
      </a-layout-footer>

      <setting-drawer />
    </a-layout>
  </a-layout>
</template>

<script>
import GlobalHeader from '../components/GlobalHeader/GlobalHeader'
import GlobalFooter from '../components/GlobalFooter/GlobalFooter'
import SettingDrawer from '../components/SettingDrawer/SettingDrawer'
import RouteView from './RouteView'
import { mapActions } from 'vuex'
import LogoSvg from '../assets/logo.svg?inline'
import SMenu from '../components/Menu/menu'

import { mixin } from '../utils/mixin'
export default {
  name: 'BasicLayout',
  mixins: [mixin],
  components: {
    GlobalHeader,
    GlobalFooter,
    RouteView,
    LogoSvg,
    SMenu,
    SettingDrawer
  },
  data() {
    return {
      collapsed: false, //菜单抽屉是否可见
      menus: [] //菜单
    }
  },
  computed: {
    contentPaddingLeft() {
      if (!this.fixedLeftMenu || this.isMobile()) {
        return '0'
      }
      if (this.leftMenuOpen) {
        return '256px'
      }
      return '80px'
    }
  },
  watch: {
    leftMenuOpen(val) {
      this.collapsed = !val
    }
  },
  created() {
    //this.menus = asyncRouterMap.find(item => item.path === '/').children
    //this.menus = this.mainMenu.find(item => item.path === '/').children
    this.collapsed = !this.leftMenuOpen
  },
  mounted() {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
  },
  methods: {
    ...mapActions(['setLeftMenuOpen']),
    toggle() {
      this.collapsed = !this.collapsed
      this.setLeftMenuOpen(!this.collapsed)
    },
    //不是桌面设备关闭抽屉层
    menuSelect() {
      if (!this.isDesktop()) {
        this.collapsed = false
      }
    },
    //关闭移动端抽屉
    drawerClose() {
      this.collapsed = false
    }

  }
}
</script>
<style lang="less">
@import url('../components/global.less');
</style>