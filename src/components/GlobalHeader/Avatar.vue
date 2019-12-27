<!-- 顶部用户信息 -->
<template>
  <a-dropdown>
    <span class="action ant-dropdown-link user-dropdown-menu">
      <a-avatar class="avatar" size="small" src="https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png" />
      <span>Sand</span>
    </span>
    <!-- 下拉菜单 -->
    <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
      <a-menu-item key="0">
        <router-link :to="{ name: 'center' }">
          <a-icon type="user" />
          <span>个人中心</span>
        </router-link>
      </a-menu-item>

      <a-menu-item key="1" disabled>
        <router-link :to="{ name: 'settings' }">
          <a-icon type="setting" />
          <span>账户设置</span>
        </router-link>
      </a-menu-item>

      <a-menu-item key="2" disabled>
        <a-icon type="setting" />
        <span>禁用</span>
      </a-menu-item>

      <a-menu-divider />
      <a-menu-item key="3">
        <a href="javascript:;" @click="handleLogout">
          <a-icon type="logout" />
          <span>退出登录</span>
        </a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
export default {
  name: 'HeaderAvatar',
  methods: {
    //退出登录
    handleLogout() {
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk: () => {
          return this.Logout({})
            .then(() => {
              setTimeout(() => {
                window.location.reload()
              }, 16)
            })
            .catch(err => {
              this.$message.error({
                title: '错误',
                description: err.message
              })
            })
        },
        onCancel() {}
      })
    }
  }
}
</script>
