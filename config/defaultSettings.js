/**
 * 项目默认配置项
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 *
 * storageOptions: {} - Vue-ls 插件配置项 (localStorage/sessionStorage)
 *
 */
export default {
    siteName: 'Sand Vue Antd',        //站点名称
    copyright: '2019 Sand 工作室出品', //站点版权信息
    //网页通用底部信息
    footerLinks: [
        { link: 'https://pro.ant.design', name: 'Ant Design Pro' },
        { link: 'https://github.com/vueComponent/ant-design-vue/', icon: 'github' },
        {
            link: 'https://vue.ant.design/docs/vue/introduce-cn/',
            name: 'Ant Design Vue'
        }
    ],
    //访问设备
    device: 'desktop',
    //主题，整体风格 ['dark', 'light'] 两种颜色
    theme: 'dark',
    //主题色
    primaryColor: '#52C41A',

    layout: 'leftmenu', //导航模式 ['leftmenu 左侧导航', 'topmenu 顶部导航'] 两种
    fixedLeftMenu: false, //固定左侧菜单栏 导航布局 topmenu 时设置生效
    contentWidth: 'Fixed', //内容布局方式  导航布局 leftmenu 时设置生效
    leftMenuOpen: true, //左侧菜单栏是否打开

    fixedHeader: false, //固定头部
    hiddenFixedHeader: false, //向下滚动时，隐藏头部 fixedHeader 开启后才能开启

    colorWeak: false, //色盲模式
    multiTab: false, //多(页签)标签 模式：boolean
    //Vue-ls 插件配置项
    storageOptions: {
        namespace: 'Sand__', // key prefix
        name: 'ls', // name variable Vue.[ls] or this.[$ls],
        storage: 'local' // storage name session, local, memory
    }
}