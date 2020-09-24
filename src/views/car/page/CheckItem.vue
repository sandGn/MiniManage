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
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="handleDelete(record)">删除</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <drawer-check-item ref="modalForm" @ok="modalFormOk"></drawer-check-item>

    <!-- <div>
      <a-button
        type="dashed"
        style="width: 100%;margin-bottom: 16px;"
        icon="plus"
        @click="showAddCheckItemModal()"
      >添加</a-button>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
    >
      <span slot="check_cycle" slot-scope="text">
        <span :text="text">{{text | cycleFilter}}</span>
      </span>

      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="delCheckItem(record)">删除</a>
        </template>
      </span>
    </s-table>

    <a-modal
      :width="640"
      :visible="visible"
      title="添加点检项目"
      @ok="addCheckItem"
      @cancel="visible = false"
      :confirmLoading="confirmLoading"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item label="点检项目名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="['name', {rules:[{required: true, message: '请填写点检项目名称'}]}]" />
          </a-form-item>

          <a-form-item label="点检项目内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              type="textarea"
              v-decorator="['description', {rules:[{required: true, message: '请填写点检项目内容'}]}]"
            />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="点检周期">
            <a-select v-decorator="['check_cycle', {rules:[{required: true, message: '请选择点检周期'}]}]">
              <a-select-option :value="0">每天</a-select-option>
              <a-select-option :value="1">每次出车前</a-select-option>
              <a-select-option :value="2">每次出车后</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="负责人">
            <a-select v-decorator="['account_id', {rules:[{required: true, message: '请选择负责人姓名'}]}]">
              <a-select-option :value="1">员工1</a-select-option>
              <a-select-option :value="2">员工2</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否启用">
            <a-switch
              checkedChildren="是"
              unCheckedChildren="否"
              v-decorator="['is_enable', {valuePropName: 'checked',initialValue: true}]"
            />
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>-->
  </a-card>
</template>

<script>
import DrawerCheckItem from './modules/DrawerCheckItem'
import { ListMixin } from '../../../mixins/ListMixin'
export default {
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
          dataIndex: 'id',
          align: 'center',
        },
        {
          title: '点检项目名称',
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: '点检周期',
          dataIndex: 'checkCycle',
          align: 'center',
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
          title: '是否启用',
          dataIndex: 'isEnable',
          customRender: text => text ? '是' : '否',
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
      }
    }
  },
  //过滤
  filters: {
    // cycleFilter(type) {
    //   return cycleMap[type].text
    // }
  },
  methods: {
    // //删除点检项目
    // delCheckItem(record) {
    //   this.$confirm({
    //     title: '警告',
    //     content: `真的要删除 ${record.name} 该项目吗?`,
    //     okText: '删除',
    //     okType: 'danger',
    //     cancelText: '取消',
    //     onOk: () => {
    //       deleteCheckItem({ checkitemid: record.id })
    //         .then(res => {
    //           //debugger
    //           if (res.succ) {
    //             this.$message.info(`${record.name} 删除成功`)
    //             this.$refs.table.refresh(true) //刷新table
    //           } else {
    //             this.$message.error(`${record.name} 删除失败,请稍后再试`)
    //           }
    //           this.confirmLoading = false
    //         })
    //         .catch(() => {
    //           this.confirmLoading = false
    //         })
    //     },
    //     onCancel() {
    //       console.log('Cancel')
    //     }
    //   })
    // },

    // //添加点检项目弹窗
    // showAddCheckItemModal() {
    //   this.visible = true
    // },
    // //添加点检项目
    // addCheckItem() {
    //   const { form: { validateFields } } = this
    //   this.confirmLoading = true
    //   validateFields((errors, values) => {
    //     if (!errors) {
    //       insertCheckItem(values).then(res => {
    //         //debugger
    //         if (res.succ) {
    //           this.$refs.table.refresh(true) //刷新table
    //         } else {
    //           this.$message.error(`添加失败,请稍后再试`)
    //         }
    //         this.visible = false
    //         this.confirmLoading = false
    //       }).catch(() => {
    //         this.visible = false
    //         this.confirmLoading = false
    //       })
    //     }
    //   })
    // }
  }
}
</script>