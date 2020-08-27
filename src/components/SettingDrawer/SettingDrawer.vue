<!-- 全局设置抽屉 -->
<template>
  <div class="setting-drawer" ref="settingDrawer">
    <a-drawer
      width="300"
      placement="right"
      @close="onClose"
      :closable="false"
      :visible="visible"
      :handle="handle"
    >
      <!-- 内容 -->
      <div class="setting-drawer-index-content">
        <!-- 整体风格设置 -->
        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">整体风格设置</h3>
          <div class="setting-drawer-index-blockChecbox">
            <a-tooltip>
              <template slot="title">暗色菜单风格</template>
              <div class="setting-drawer-index-item" @click="handleMenuTheme('dark')">
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg"
                  alt="dark"
                />
                <div class="setting-drawer-index-selectIcon" v-if="theme === 'dark'">
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>
            <a-tooltip>
              <template slot="title">亮色菜单风格</template>
              <div class="setting-drawer-index-item" @click="handleMenuTheme('light')">
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg"
                  alt="light"
                />
                <div class="setting-drawer-index-selectIcon" v-if="theme !== 'dark'">
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>
          </div>
        </div>

        <!-- 主题色 -->
        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">主题色</h3>

          <div style="height: 20px">
            <a-tooltip
              class="setting-drawer-theme-color-colorBlock"
              v-for="(item, index) in colorList"
              :key="index"
            >
              <template slot="title">{{ item.key }}</template>
              <a-tag :color="item.color" @click="changeColor(item.color)">
                <a-icon type="check" v-if="item.color === primaryColor"></a-icon>
              </a-tag>
            </a-tooltip>
          </div>
        </div>
        <a-divider />

        <!-- 导航模式S -->
        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">导航模式</h3>

          <div class="setting-drawer-index-blockChecbox">
            <a-tooltip>
              <template slot="title">侧边栏导航</template>
              <div class="setting-drawer-index-item" @click="handleLayout('leftmenu')">
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg"
                  alt="leftmenu"
                />
                <div class="setting-drawer-index-selectIcon" v-if="layout === 'leftmenu'">
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>

            <a-tooltip>
              <template slot="title">顶部栏导航</template>
              <div class="setting-drawer-index-item" @click="handleLayout('topmenu')">
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg"
                  alt="topmenu"
                />
                <div class="setting-drawer-index-selectIcon" v-if="layout !== 'leftmenu'">
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>
          </div>

          <div :style="{ marginTop: '24px' }">
            <a-list :split="false">
              <a-list-item>
                <a-tooltip slot="actions">
                  <template slot="title">该设定仅 [顶部栏导航] 时有效</template>
                  <a-select
                    size="small"
                    style="width: 80px;"
                    :defaultValue="contentWidth"
                    @change="handleContentWidthChange"
                  >
                    <a-select-option value="Fixed">固定</a-select-option>
                    <a-select-option value="Fluid" v-if="layout !== 'leftmenu'">流式</a-select-option>
                  </a-select>
                </a-tooltip>
                <a-list-item-meta>
                  <div slot="title">内容区域宽度</div>
                </a-list-item-meta>
              </a-list-item>

              <a-list-item>
                <a-switch
                  slot="actions"
                  size="small"
                  :defaultChecked="fixedHeader"
                  @change="handleFixedHeader"
                />
                <a-list-item-meta>
                  <div slot="title">固定 Header</div>
                </a-list-item-meta>
              </a-list-item>

              <a-list-item>
                <a-switch
                  slot="actions"
                  size="small"
                  :disabled="!fixedHeader"
                  :defaultChecked="hiddenFixedHeader"
                  @change="handlehiddenFixedHeader"
                />
                <a-list-item-meta>
                  <a-tooltip slot="title" placement="left">
                    <template slot="title">固定 Header 时可配置</template>
                    <div :style="{ opacity: !fixedHeader ? '0.5' : '1' }">下滑时隐藏 Header</div>
                  </a-tooltip>
                </a-list-item-meta>
              </a-list-item>

              <a-list-item>
                <a-switch
                  slot="actions"
                  size="small"
                  :disabled="(layout === 'topmenu')"
                  :defaultChecked="fixedLeftMenu"
                  @change="handleFixedLeftMenu"
                />
                <a-list-item-meta>
                  <div
                    slot="title"
                    :style="{ textDecoration: layout === 'topmenu' ? 'line-through' : 'unset' }"
                  >固定侧边菜单</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
        </div>
        <a-divider />
        <!-- 导航模式E -->

        <!-- 其他设置S -->
        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">其他设置</h3>
          <div>
            <a-list :split="false">
              <a-list-item>
                <a-switch
                  slot="actions"
                  size="small"
                  :defaultChecked="colorWeak"
                  @change="onColorWeak"
                />
                <a-list-item-meta>
                  <div slot="title">色弱模式</div>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-switch
                  slot="actions"
                  size="small"
                  :defaultChecked="multiTab"
                  @change="onMultiTab"
                />
                <a-list-item-meta>
                  <div slot="title">多页签模式</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
        </div>
        <!-- 其他设置E -->
        <a-divider />
        <div :style="{ marginBottom: '24px' }">
          <a-button @click="doCopy" icon="copy" block>拷贝设置</a-button>
          <a-alert type="warning" :style="{ marginTop: '24px' }">
            <span slot="message">
              配置栏只在开发环境用于预览，生产环境不会展现，请手动修改配置文件
              <a
                href="#"
                target="_blank"
              >src/config/defaultSettings.js</a>
            </span>
          </a-alert>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="setting-drawer-index-handle" @click="toggle">
        <a-icon type="setting" v-if="!visible" />
        <a-icon type="close" v-else />
      </div>
    </a-drawer>
  </div>
</template>

<script>
import { colorList, updateTheme, updateColorWeak } from './settingConfig'
import { mapState } from 'vuex'
export default {
  components: {},
  computed: {
    ...mapState({
      device: state => state.app.device,
      siteName: state => state.app.siteName,
      fixedLeftMenu: state => state.app.fixedLeftMenu,
      contentWidth: state => state.app.contentWidth,
      layout: state => state.app.layout,
      leftMenuOpen: state => state.app.leftMenuOpen,
      theme: state => state.app.theme,
      primaryColor: state => state.app.primaryColor,
      fixedHeader: state => state.app.fixedHeader,
      hiddenFixedHeader: state => state.app.hiddenFixedHeader,
      colorWeak: state => state.app.multiTab,
      multiTab: state => state.app.multiTab
    })
  },
  data() {
    return {
      visible: false,
      colorList,
      handle: <div />
    }
  },
  methods: {
    //关闭
    onClose() {
      this.visible = false
    },
    //切换抽屉
    toggle() {
      this.visible = !this.visible
    },
    //切换导航主题颜色
    handleMenuTheme(theme) {
      this.$store.dispatch('toggleTheme', theme)
    },
    // 切换主题色
    changeColor(color) {
      if (this.primaryColor !== color) {
        this.$store.dispatch('toggleColor', color)
        updateTheme(color)
      }
    },
    //切换导航布局
    handleLayout(mode) {
      this.$store.dispatch('toggleLayout', mode)
      // 因为顶部菜单不能固定左侧菜单栏，所以强制关闭
      this.handleFixedLeftMenu(false)
    },
    //设置内容区域宽度 固定，流式
    handleContentWidthChange(type) {
      this.$store.dispatch('toggleContentWidth', type)
    },
    //固定头部
    handleFixedHeader(fixed) {
      this.$store.dispatch('toggleFixedHeader', fixed)
    },
    //固定头部向下滚动时，隐藏头部
    handlehiddenFixedHeader(autoHidden) {
      this.$store.dispatch('toggleHiddenFixedHeader', autoHidden)
    },
    //固定左侧菜单栏
    handleFixedLeftMenu(fixed) {
      if (this.layout === 'topmenu') {
        this.$store.dispatch('toggleFixedLeftMenu', false)
        return
      }
      this.$store.dispatch('toggleFixedLeftMenu', fixed)
    },
    // 色弱模式
    onColorWeak(checked) {
      this.$store.dispatch('toggleColorWeak', checked)
      updateColorWeak(checked)
    },
    //多(页签)标签
    onMultiTab(checked) {
      this.$store.dispatch('toggleMultiTab', checked)
    },
    //拷贝设置
    doCopy() {
      //从 mixin 或 this.$store.state.app中获取当前设置
      const text = `
export const config {
  appName: '${this.appName}', //站点名称
  copyright: '${this.copyright}', //站点版权信息
  // 站点底部通用信息
  footerLinks: ${JSON.stringify(this.footerLinks)},
  theme: '${this.theme}', //导航栏主题,整体风格设置 ['dark', 'light'] 两种颜色
  primaryColor: '${this.primaryColor}', //主题色 主题颜色设置
  layout: '${
    this.layout
  }', //导航模式 ['leftmenu 侧边导航', 'topmenu 顶部导航'] 两种
  contentWidth: '${
    this.contentWidth
  }', //导航内容区域宽度： 流式Fluid |  固定Fixed 仅在布局为TopMenu时有效
  fixedHeader: '${this.fixedHeader}', //固定头部
  fixedHeaderHidden: '${
    this.fixedHeaderHidden
  }', //向下滚动时，隐藏头部 fixedHeader开启后才能开启
  fixedLeftMenu: '${this.fixedLeftMenu}', //固定左侧菜单栏
  colorWeak: '${this.colorWeak}', //色盲模式
  multiTab: '${this.multiTab}', //多(页签)标签 模式：boolean
  sidebarType: '${
    this.sidebarType
  }', //左侧菜单栏展开收缩 true：展开 false：收缩
  //Vue-ls 插件配置项
  storageOptions: {
    namespace: 'Sand__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local' // storage name session, local, memory
  }
}`
      this.$copyText(text)
        .then(message => {
          console.log('copy', message)
          this.$message.success(
            '拷贝成功，请到 src/config/defaultSettings.js 中替换默认配置'
          )
        })
        .catch(err => {
          console.log('copy.err', err)
          this.$message.error('拷贝失败')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.setting-drawer-index-content {
  .setting-drawer-index-title {
    font-size: 14px;
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 22px;
  }
  .setting-drawer-index-blockChecbox {
    display: flex;

    .setting-drawer-index-item {
      margin-right: 16px;
      position: relative;
      border-radius: 4px;
      cursor: pointer;

      img {
        width: 48px;
      }

      .setting-drawer-index-selectIcon {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        padding-top: 15px;
        padding-left: 24px;
        height: 100%;
        color: #1890ff;
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
  .setting-drawer-theme-color-colorBlock {
    width: 20px;
    height: 20px;
    border-radius: 2px;
    float: left;
    cursor: pointer;
    margin-right: 8px;
    padding-left: 0px;
    padding-right: 0px;
    text-align: center;
    color: #fff;
    font-weight: 700;

    i {
      font-size: 14px;
    }
  }
}

.setting-drawer-index-handle {
  position: fixed;
  top: 240px;
  background: #1890ff;
  width: 48px;
  height: 48px;
  right: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  z-index: 1001;
  text-align: center;
  font-size: 16px;
  border-radius: 4px 0 0 4px;

  i {
    color: rgb(255, 255, 255);
    font-size: 20px;
  }
}
</style>