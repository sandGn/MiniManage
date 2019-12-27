/*
 * 站点配置store
 */
import {
  TOGGLE_DEVICE, TOGGLE_THEME, TOGGLE_PRIMARY_COLOR,
  TOGGLE_LAYOUT, SET_LEFT_MENU_OPEN, TOGGLE_FIXED_LEFT_MENU, TOGGLE_CONTENT_WIDTH,
  TOGGLE_FIXED_HEADER, TOGGLE_HIDDEN_FIXED_HEADER,
  TOGGLE_COLOR_WEAK, TOGGLE_MULTI_TAB
} from '../mutation-types'
import config from '../../../config/defaultSettings'
const app = {
  state: {
    siteName: config.siteName,    //站点名称
    copyright: config.copyright,  //站点版权信息
    footerLinks: config.footerLinks, //站点底部通用信息
    device: config.device, //访问设备
    theme: config.theme, //主题，整体风格 ['dark', 'light'] 两种颜色
    primaryColor: config.primaryColor, //主题色

    layout: config.layout, //导航模式 ['leftmenu 左侧导航', 'topmenu 顶部导航'] 两种
    fixedLeftMenu: config.fixedLeftMenu, //固定左侧菜单栏 导航布局 topmenu 时设置生效
    contentWidth: config.contentWidth, //内容布局方式  导航布局 leftmenu 时设置生效
    leftMenuOpen: config.leftMenuOpen, //左侧菜单栏是否打开

    fixedHeader: config.fixedHeader, //固定头部
    hiddenFixedHeader: config.hiddenFixedHeader, //向下滚动时，隐藏头部 fixedHeader 开启后才能开启

    colorWeak: config.colorWeak, //色盲模式
    multiTab: config.multiTab, ////多(页签)标签 模式：boolean
  },
  actions: {
    // 切换设备
    toggleDevice ({ commit }, device) {
      commit(TOGGLE_DEVICE, device)
    },
    // 切换左侧菜单栏是否打开
    setLeftMenuOpen ({ commit }, bool) {
      commit(SET_LEFT_MENU_OPEN, bool)
    },
    // 切换主题
    toggleTheme ({ commit }, theme) {
      commit(TOGGLE_THEME, theme)
    },
    // 切换主题色
    toggleColor ({ commit }, color) {
      commit(TOGGLE_PRIMARY_COLOR, color)
    },


    // 切换布局
    toggleLayout ({ commit }, mode) {
      commit(TOGGLE_LAYOUT, mode)
    },
    // 是否固定左侧菜单栏
    toggleFixedLeftMenu ({ commit }, fixed) {
      commit(TOGGLE_FIXED_LEFT_MENU, fixed)
    },
    // 切换内容区域宽度
    toggleContentWidth ({ commit }, type) {
      commit(TOGGLE_CONTENT_WIDTH, type)
    },


    // 是否固定头部
    toggleFixedHeader ({ commit }, fixedHeader) {
      if (!fixedHeader) {
        commit(TOGGLE_HIDDEN_FIXED_HEADER, false)
      }
      commit(TOGGLE_FIXED_HEADER, fixedHeader)
    },
    // 是否向下滚动时隐藏头部 fixedHeader开启后才能开启
    toggleHiddenFixedHeader ({ commit }, bool) {
      commit(TOGGLE_HIDDEN_FIXED_HEADER, bool)
    },


    // 是否开启色弱模式
    toggleColorWeak ({ commit }, bool) {
      commit(TOGGLE_COLOR_WEAK, bool)
    },
    // 是否开启多(页签)标签 模式
    toggleMultiTab ({ commit }, bool) {
      commit(TOGGLE_MULTI_TAB, bool)
    },
  },
  mutations: {
    [TOGGLE_DEVICE]: (state, device) => {
      state.device = device
    },
    // 切换左侧菜单栏是否打开
    [SET_LEFT_MENU_OPEN]: (state, bool) => {
      state.leftMenuOpen = bool
    },
    // 切换主题
    [TOGGLE_THEME]: (state, theme) => {
      state.theme = theme
    },
    // 切换主题色
    [TOGGLE_PRIMARY_COLOR]: (state, color) => {
      state.primaryColor = color
    },


    // 切换导航布局
    [TOGGLE_LAYOUT]: (state, layout) => {
      state.layout = layout
    },
    // 是否固定左侧菜单栏
    [TOGGLE_FIXED_LEFT_MENU]: (state, fixed) => {
      state.fixedLeftMenu = fixed
    },
    // 切换内容布局方式
    [TOGGLE_CONTENT_WIDTH]: (state, type) => {
      state.contentWidth = type
    },


    // 是否固定头部
    [TOGGLE_FIXED_HEADER]: (state, fixed) => {
      state.fixedHeader = fixed
    },
    // 是否向下滚动时隐藏头部 fixedHeader 开启后才能开启
    [TOGGLE_HIDDEN_FIXED_HEADER]: (state, bool) => {
      state.hiddenFixedHeader = bool
    },


    // 是否开启色盲模式
    [TOGGLE_COLOR_WEAK]: (state, bool) => {
      state.colorWeak = bool
    },
    // 是否开启多(页签)标签 模式
    [TOGGLE_MULTI_TAB]: (state, bool) => {
      state.multiTab = bool
    },
  }
}
export default app