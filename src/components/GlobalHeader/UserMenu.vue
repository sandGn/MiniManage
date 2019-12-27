<!-- 顶部用户信息 -->
<template>
  <div class="user-wrapper">
    <div class="content-box">
      <!-- 搜索 -->
      <search v-if="device !== 'mobile'" />
      <!-- 帮助文档 -->
      <a-tooltip class="header-item" title="帮助文档" placement="bottom">
        <a href="javascript:void" target="_blank">
          <span class="action">
            <a-icon type="question-circle-o"></a-icon>
          </span>
        </a>
      </a-tooltip>
      <!-- 消息通知 -->
      <notice class="action" />
      <!-- 个人中心 -->
      <avatar class="action" />
    </div>
  </div>
</template>

<script>
import Notice from './Notice'
import Avatar from './Avatar'
import Search from './Search'
import { mapState } from 'vuex'
export default {
  name: 'UserMenu',
  components: { Notice, Avatar, Search },
  computed: {
    ...mapState({
      device: state => state.app.device
    })
  },
  methods: {}
}
</script>
