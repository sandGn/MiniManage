/*
 * 站点配置store
 */
import config from '../../../config/defaultSettings'
const app = {
    state: {
        copyright: config.copyright, //站点版权信息
        footerLinks: config.footerLinks, //站点底部通用信息
    },
    mutations: {},
    actions: {}
}
export default app