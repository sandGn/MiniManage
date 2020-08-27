
<template>
  <div class="main">
    <a-tabs :activeKey="activeKey" :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }">
      <a-tab-pane key="wechatlogin" tab="微信扫码登录">
        <wxlogin
          style="margin-left: 25px"
          :state="wx.state"
          :appid="wx.appid"
          :scope="wx.scope"
          :redirect_uri="wx.redirect_uri"
          :theme="wx.theme"
          :href="wx.href"
        ></wxlogin>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import wxlogin from 'vue-wxlogin'
export default {
  components: { wxlogin },
  data() {
    return {
      activeKey: 'wechatlogin',
      /*
      * appid         String        应用唯一标识，在微信开放平台提交应用审核通过后获得
      * scope         String        应用授权作用域，拥有多个作用域用逗号（,）分隔，网页应用目前仅填写snsapi_login即可
      * redirect_uri  String        重定向地址，需要进行UrlEncode
      * state         String        用于保持请求和回调的状态，授权请求后原样带回给第三方。该参数可用于防止csrf攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加session进行校验
      * theme         String        提供"black"、"white"可选，默认为黑色文字描述。
      * href          String        自定义样式链接，第三方可根据实际需求覆盖默认样式。
      */
      wx: {
        appid: 'wxbcec2075217a0446',
        redirect_uri: 'http%3a%2f%2fwww.jzyxas.com',
        scope: 'snsapi_login',
        state: '',
        theme: 'black',
        //href: 'data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30NCi5pbXBvd2VyQm94IC50aXRsZSB7ZGlzcGxheTogbm9uZTt9DQouaW1wb3dlckJveCAuaW5mbyB7d2lkdGg6IDIwMHB4O30NCi5zdGF0dXNfaWNvbiB7ZGlzcGxheTpub25lfQ0KLmltcG93ZXJCb3ggLnN0YXR1cyB7dGV4dC1hbGlnbjogY2VudGVyO30='
        href: 'data:text/css;base64,LmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30='
      }
    }
  },
  created() {
  }
}
</script>