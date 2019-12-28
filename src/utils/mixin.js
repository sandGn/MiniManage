/*
 * 混入 组件复用方法计算属性抽离
 */
import { DEVICE_TYPE } from '@/utils/device'
import { mapState } from 'vuex'

const mixin = {
    //计算属性
    computed: {
        ...mapState({
            siteName: state => state.app.siteName,
            copyright: state => state.app.copyright,
            footerLinks: state => state.app.footerLinks,
            device: state => state.app.device,
            theme: state => state.app.theme,
            primaryColor: state => state.app.primaryColor,

            layout: state => state.app.layout,
            fixedLeftMenu: state => state.app.fixedLeftMenu,
            contentWidth: state => state.app.contentWidth,
            leftMenuOpen: state => state.app.leftMenuOpen,

            fixedHeader: state => state.app.fixedHeader,
            hiddenFixedHeader: state => state.app.hiddenFixedHeader,

            colorWeak: state => state.app.colorWeak,
            multiTab: state => state.app.multiTab
        })
    },
    //方法
    methods: {
        //导航模式
        isTopMenu () {
            return this.layout === 'topmenu'
        },
        isLeftMenu () {
            return !this.isTopMenu()
        },
        //设备判断
        isDesktop () { //桌面
            return this.device === DEVICE_TYPE.DESKTOP
        },
        isTablet () { //平板
            return this.device === DEVICE_TYPE.TABLET
        },
        isMobile () { //手机
            return this.device === DEVICE_TYPE.MOBILE
        }
    }
}
export { mixin }