<!-- 岗位管理 -->
<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="8">
          <a-col :lg="4" :sm="12">
            <a-form-item>
              <a-input placeholder="输入岗位名称搜索" v-model="queryParam.condition"></a-input>
            </a-form-item>
          </a-col>
          <!-- 筛选 -->
          <a-col :lg="4" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery">查询</a-button>
              <a-button type="primary" style="margin-left: 8px" @click="handleAdd">新建岗位</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <!-- 序号 -->
        <span
          slot="serialslot"
          slot-scope="text,record,index"
        >{{ipagination.current*ipagination.pageSize+index+1-ipagination.pageSize}}</span>
        <!-- 操作 -->
        <span slot="action" slot-scope="text,record">
          <a @click="handlePerssion(record.id)">权限</a>
          <a-divider type="vertical" />
          <a @click="handleDelete(record)">删除</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <modal-duty ref="modalForm" @ok="modalFormOk"></modal-duty>
    <!-- 岗位权限配置 -->
    <drawer-duty-permission ref="modalDutyPermission"></drawer-duty-permission>
  </a-card>
</template>
<script>
import { ListMixin } from '../../mixins/ListMixin'
import ModalDuty from './modules/ModalDuty'
import DrawerDutyPermission from './modules/DrawerDutyPermission'
export default {
  name: 'DutyList',
  mixins: [ListMixin],
  components: {
    ModalDuty,
    DrawerDutyPermission
  },
  data() {
    return {
      // 表头
      columns: [
        {
          title: '编号',
          scopedSlots: { customRender: 'serialslot' },
          align: 'center',
        },
        {
          title: '岗位名称',
          dataIndex: 'roleName',
          align: 'center',
        },
        {
          title: '创建时间',
          dataIndex: 'createdTime',
          align: 'center',
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center',
        }
      ],
      //api 请求参数
      url: {
        list: '/account/accountroles'
      },
    }
  },
  created() {

  },
  methods: {
    //岗位权限弹窗
    handlePerssion(accountRoleId) {
      this.$refs.modalDutyPermission.show(accountRoleId)
    },
  },
}
</script>
<style lang="less" scoped>
</style>