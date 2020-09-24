<!-- 车辆设置 -->
<template>
  <a-card :bordered="false">
    <!-- Tab -->
    <a-tabs defaultActiveKey="1" :activeKey="activeKey" @change="handleChange">
      <a-tab-pane tab="点检设置" key="1" forceRender>
        <check-item ref="CheckItem"></check-item>
      </a-tab-pane>
      <a-tab-pane tab="保养设置" key="2">
        <maintenance-item ref="MaintenanceItem"></maintenance-item>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>
<script>
import CheckItem from './page/CheckItem'
import MaintenanceItem from './page/MaintenanceItem'
export default {
  name: 'AuditList',
  components: {
    CheckItem,
    MaintenanceItem
  },
  data() {
    return {
      activeKey: '1',
    }
  },
  mounted() {
    // if (this.record.id) {
    //   switch (this.activeKey) {
    //     case '1':
    //       // this.$refs.AuditProductList.handleDetail(this.record)
    //       break
    //     case '2':
    //       // this.$refs.AuditShopList.handleDetail(this.record)
    //       break
    //   }
    // }
  },
  methods: {
    handleChange(key) {
      this.activeKey = key
    }
  }
}
</script>
<style lang="less" scoped>
</style>