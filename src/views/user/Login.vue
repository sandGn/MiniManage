
<template>
  <div class="main">
    <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form">
      <a-tabs
        :activeKey="activeKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <!-- 账号密码登录Tab -->
        <a-tab-pane key="tab1" tab="账号登录">
          <!-- 提示 -->
          <a-alert
            v-if="isLoginError"
            type="error"
            showIcon
            style="margin-bottom: 24px;"
            message="账户或密码错误"
          ></a-alert>

          <!-- 账号 -->
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="账户: admin"
              v-decorator="['username',validatorRules.username]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <!-- 密码 -->
          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="密码: hello123"
              v-decorator="['password',validatorRules.password]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <!-- 登录按钮 -->
          <a-form-item style="margin-top:24px">
            <a-button
              size="large"
              type="primary"
              htmlType="submit"
              class="login-button"
              :loading="state.loginBtn"
              :disabled="state.loginBtn"
              @click="handleOk"
            >登录</a-button>
          </a-form-item>
        </a-tab-pane>
        <!-- 微信扫码登录 -->
        <a-tab-pane key="tab2" tab="扫码登录">
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
    </a-form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import wxlogin from 'vue-wxlogin'
import md5 from 'md5'
export default {
  components: { wxlogin },
  data() {
    return {
      activeKey: 'tab1',
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
      },


      form: this.$form.createForm(this),
      loginBtn: false, //登录按钮
      isLoginError: false, //登录错误提示
      state: {
        loginBtn: false,
      },
      //验证规则
      validatorRules: {
        username: { rules: [{ required: true, message: '请输入帐户名或手机号码' }], validateTrigger: 'change' },
        password: { rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur' }
      }
    }
  },
  created() {
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    //切换Tab
    handleTabClick(key) {
      this.form.resetFields()
      this.activeKey = key
    },
    //提交表单
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.state.loginBtn = true
          const loginParams = { ...values }
          loginParams.password = md5(values.password)
          this.Login(loginParams)
            .then((res) => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              this.state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            this.state.loginBtn = false
          }, 600)
        }
      })
    },
    //登录成功
    loginSuccess() {
      //console.log(JSON.stringify(res))
      this.$router.push({ path: '/' }).catch(() => { })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `欢迎回来`
        })
      }, 1000)
    },
    //登录失败
    requestFailed(err) {
      this.isLoginError = true
      this.$notification['error']({
        message: '错误',
        description: (err.message || {}) || '请求出现错误，请稍后再试',
        //description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    },

  }
}
</script>
<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>