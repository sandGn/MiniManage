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
              <a-button type="primary" @click="searchQuery">筛选</a-button>
              <a-button type="primary" style="margin-left: 8px" @click="handleAdd">新增</a-button>
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
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="handleDelete(record)">删除</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <modal-duty ref="modalForm" @ok="modalFormOk"></modal-duty>
  </a-card>
</template>
<script>
import { ListMixin } from '../../mixins/ListMixin'
import ModalDuty from './modules/ModalDuty'
export default {
  mixins: [ListMixin],
  components: {
    ModalDuty
  },
  data() {
    return {
      // 表头
      columns: [
        {
          title: '编号',
          scopedSlots: { customRender: 'serialslot' },
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

  },
}
</script>
<style lang="less" scoped>
</style>