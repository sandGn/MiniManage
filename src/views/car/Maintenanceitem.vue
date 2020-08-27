<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper"></div>

    <div>
      <a-button
        type="dashed"
        style="width: 100%;margin-bottom: 16px;"
        icon="plus"
        @click="showAddMaintenanceItemModal()"
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
      <!-- <span slot="cycle" slot-scope="text">
        <span :text="text">{{text | cycleTypeMap}}</span>
      </span>-->

      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="delMaintenanceItem(record)">删除</a>
        </template>
      </span>
    </s-table>

    <a-modal
      :width="640"
      :visible="visible"
      title="添加保养项目"
      @ok="addMaintenanceItem"
      @cancel="visible = false"
      :confirmLoading="confirmLoading"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item label="保养项目名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="['name', {rules:[{required: true, message: '请填写点检项目名称'}]}]" />
          </a-form-item>

          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="保养周期">
            <a-input v-decorator="['cycle', {rules:[{required: true, message: '请选择保养周期'}]}]">
              <a-select slot="addonBefore" v-decorator="['cycle_type', { initialValue: '0' }]">
                <a-select-option value="0">时间/月</a-select-option>
                <a-select-option value="1">里程/公里</a-select-option>
              </a-select>
            </a-input>
          </a-form-item>

          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="负责人">
            <a-select v-decorator="['account_id', {rules:[{required: true, message: '请选择负责人姓名'}]}]">
              <a-select-option :value="1">员工1</a-select-option>
              <a-select-option :value="2">员工2</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否提醒">
            <a-switch
              checkedChildren="是"
              unCheckedChildren="否"
              v-decorator="['is_remind', {valuePropName: 'checked',initialValue: true}]"
            />
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
    </a-modal>
  </a-card>
</template>

<script>
import STable from '@/components/Table'
import { getMaintenanceItemList, deleteMaintenanceItem, insertMaintenanceItem } from '../../api/manage'
// const cycleTypeMap = {
//   0: { text: '每天' },
//   1: { text: '每次出车前' },
// }
export default {
  components: {
    STable
  },
  data() {
    return {
      //表头
      columns: [
        {
          title: '序号',
          dataIndex: 'id'
        },
        {
          title: '保养项目名称',
          dataIndex: 'name'
        },

        {
          title: '保养周期',
          dataIndex: 'cycle',
          scopedSlots: { customRender: 'cycle' }
        },
        {
          title: '负责人',
          dataIndex: 'charge_id'
        },
        {
          title: '是否提醒',
          dataIndex: 'is_remind',
          customRender: text => text ? '是' : '否'
        },
        {
          title: '是否启用',
          dataIndex: 'is_enable',
          customRender: text => text ? '是' : '否'
        },
        {
          title: '更新时间',
          dataIndex: 'update_time'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        //console.log('loadData.parameter', parameter)
        return getMaintenanceItemList(Object.assign(parameter, this.queryParam)).then(
          res => {
            return res
          }
        )
      },


      //弹窗
      form: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,
    }
  },
  //过滤
  // filters: {
  //   cycleFilter(type) {
  //     return cycleMap[type].text
  //   }
  // },
  methods: {
    //删除保养项目
    delMaintenanceItem(record) {
      this.$confirm({
        title: '警告',
        content: `真的要删除 ${record.name} 该项目吗?`,
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          deleteMaintenanceItem({ checkitemid: record.id })
            .then(res => {
              //debugger
              if (res.succ) {
                this.$message.info(`${record.name} 删除成功`)
                this.$refs.table.refresh(true) //刷新table
              } else {
                this.$message.error(`${record.name} 删除失败,请稍后再试`)
              }
              this.confirmLoading = false
            })
            .catch(() => {
              this.confirmLoading = false
            })
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    },

    //添加保养项目弹窗
    showAddMaintenanceItemModal() {
      this.visible = true
    },
    //添加保养项目
    addMaintenanceItem() {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        console.log(values)
        if (!errors) {
          insertMaintenanceItem(values).then(res => {
            //debugger
            if (res.succ) {
              this.$refs.table.refresh(true) //刷新table
            } else {
              this.$message.error(`添加失败,请稍后再试`)
            }
            this.visible = false
            this.confirmLoading = false
          }).catch(() => {
            this.visible = false
            this.confirmLoading = false
          })
        }
      })
    }
  }
}
</script>