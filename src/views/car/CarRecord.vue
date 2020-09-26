<!-- 车辆记录 -->
<template>
  <a-card :bordered="false">
    <!-- Tab -->
    <a-tabs defaultActiveKey="1" :activeKey="activeKey" @change="handleChange">
      <a-tab-pane tab="出入车记录" key="1" forceRender>
        <dispatch-record ref="DispatchRecord"></dispatch-record>
      </a-tab-pane>
      <a-tab-pane tab="点检记录" key="2">
        <check-item-record ref="CheckItemRecord"></check-item-record>
      </a-tab-pane>
      <a-tab-pane tab="保养记录" key="3">
        <maintenance-item-record ref="MaintenanceItemRecord"></maintenance-item-record>
      </a-tab-pane>
      <a-tab-pane tab="维修记录" key="4">
        <repair-record ref="RepairRecord"></repair-record>
      </a-tab-pane>
      <a-tab-pane tab="加油记录" key="5">
        <oiling-record ref="OilingRecord"></oiling-record>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>
<script>
import DispatchRecord from './page/DispatchRecord' //出入车
import CheckItemRecord from './page/CheckItemRecord' //点检项目
import MaintenanceItemRecord from './page/MaintenanceItemRecord' //出入车
import RepairRecord from './page/RepairRecord' //维修
import OilingRecord from './page/OilingRecord' //加油
export default {
  name: 'AuditList',
  components: {
    DispatchRecord,
    CheckItemRecord,
    MaintenanceItemRecord,
    RepairRecord,
    OilingRecord,
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