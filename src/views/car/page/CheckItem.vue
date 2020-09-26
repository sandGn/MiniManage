<!-- 车辆点检 -->
<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="8">
          <a-col :lg="6" :sm="12">
            <a-form-item>
              <a-input autocomplete="off" placeholder="请输入点检项目名称搜索" v-model="queryParam.searchKey" />
            </a-form-item>
          </a-col>

          <!-- 状态 -->
          <a-col :lg="4" :sm="12">
            <a-form-item label="状态">
              <a-select v-model="queryParam.isEnable" placeholder="请选择" default-value>
                <a-select-option value>全部</a-select-option>
                <a-select-option value="0">禁用</a-select-option>
                <a-select-option value="1">启用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- 周期 -->
          <a-col :lg="4" :sm="12">
            <a-form-item label="周期">
              <a-select v-model="queryParam.checkCycle" placeholder="请选择" default-value>
                <a-select-option value>全部</a-select-option>
                <a-select-option value="1">每天</a-select-option>
                <a-select-option value="2">每次出车前</a-select-option>
                <a-select-option value="3">每次出车后</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- 查询、重置 -->
          <a-col :lg="4" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery">查询</a-button>
              <a-button style="margin-left: 8px" @click="searchReset">重置</a-button>
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
          <a @click="handleEnable(record)">{{record.isEnable==1?'禁用':'启用'}}</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="handleDelete(record)">删除</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <drawer-check-item ref="modalForm" @ok="modalFormOk"></drawer-check-item>
  </a-card>
</template>

<script>
import DrawerCheckItem from './modules/DrawerCheckItem'
import { ListMixin } from '../../../mixins/ListMixin'
import { deleteAction, postAction } from '../../../api'
export default {
  name: 'CheckItem',
  mixins: [ListMixin],
  components: {
    DrawerCheckItem
  },
  data() {
    return {
      
      //表头
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serialslot' },
          align: 'center',
        },
        {
          title: '点检项目名称',
          align: 'center',
          dataIndex: 'checkItemName'
        },
        {
          title: '点检周期',
          dataIndex: 'checkCycle',
          align: 'center',
          customRender: (text) => text === 1 ? '每天' : text === 2 ? '每次出车前' : text === 3 ? '每次出车后' : ''
        },
        {
          title: '点检内容',
          dataIndex: 'description',
          align: 'center',
        },
        {
          title: '负责人',
          dataIndex: 'responsiblePerson',
          align: 'center',
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime',
          align: 'center',
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' },
          align: 'center',
        }
      ],
      //api 请求参数
      url: {
        list: '/car/checkitems',
        delete: '/car/checkitems',
        enable: '/car/checkitemenable', //启用/禁用
      }
    }
  },
  created() {

  },
  //过滤
  filters: {},
  methods: {
    //删除
    handleDelete(record) {
      this.$confirm({
        title: '警告',
        content: `确定要删除吗?`,
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          this.loading = true
          deleteAction(this.url.delete, { checkItemId: record.id }).then((res) => {
            if (res.success) {
              this.$message.success('操作成功')
              this.loadData()
            } else {
              this.$message.warning(res.message)
            }
          }).finally(() => {
            this.loading = false
          })
        },
        onCancel() { }
      })
    },
    //禁用-启用
    handleEnable(record) {
      console.log(record)
      this.$confirm({
        title: '警告',
        content: `确定要${record.isEnable == 1 ? '启用' : '禁用'}吗?`,
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          this.loading = true
          const enable = record.status == 1 ? 2 : 1
          postAction(this.url.enable, { checkItemId: record.id, isEnable: enable }).then((res) => {
            if (res.success) {
              this.$message.success('操作成功')
              this.loadData()
            } else {
              this.$message.warning(res.message)
            }
          }).finally(() => {
            this.loading = false
          })
        },
        onCancel() { }
      })
    },
  }
}
</script>