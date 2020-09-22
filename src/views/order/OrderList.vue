<!-- 订单列表 -->
<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="8">
          <!-- 查询、重置 -->
          <a-col :lg="4" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery">查询</a-button>
              <a-button style="margin-left: 8px" @click="searchReset">重置</a-button>
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
          <a @click="handleDetail(record)">详情</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
  </a-card>
</template>
<script>
import { ListMixin } from '../../mixins/ListMixin'

export default {
  name: 'OrderList',
  mixins: [ListMixin],
  components: {},
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
          title: '模块名称',
          dataIndex: 'activityName',
          align: 'center',
        },
        {
          title: '订购时间',
          dataIndex: 'createTime',
          align: 'center',
        },
        {
          title: '周期开始时间',
          dataIndex: 'startTime',
          align: 'center',
        },
        {
          title: '周期结束时间',
          dataIndex: 'endTime',
          align: 'center',
        },
        {
          title: '订单类型',
          dataIndex: 'orderType',
          align: 'center',
        },
        {
          title: '订购金额',
          dataIndex: 'payfee',
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
        list: '/order/orders'
      },
    }
  },
  created() { },
  methods: {

  },
}
</script>
<style lang="less" scoped>
</style>