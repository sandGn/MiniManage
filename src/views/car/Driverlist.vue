<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper"></div>

    <div>
      <a-button
        type="dashed"
        style="width: 100%;margin-bottom: 16px;"
        icon="plus"
        @click="showAddDriverModal()"
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
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="delDriver(record)">删除</a>
        </template>
      </span>
    </s-table>

    <a-modal
      :width="640"
      :visible="visible"
      title="添加司机"
      @ok="addDriver"
      @cancel="visible = false"
      :confirmLoading="confirmLoading"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="员工姓名">
            <a-select v-decorator="['account_id', {rules:[{required: true, message: '请选择员工姓名'}]}]">
              <a-select-option :value="1">员工1</a-select-option>
              <a-select-option :value="2">员工2</a-select-option>
            </a-select>
          </a-form-item>

          <!-- <a-form-item label="驾驶证编号" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="['license', {rules:[{required: true, message: '驾驶证编号'}]}]" />
          </a-form-item>-->

          <a-form-item label="准驾车辆" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select
              style="width: 100%"
              mode="multiple"
              :allowClear="true"
              v-decorator="['license_type', {rules:[{required: true, message: '请选择准驾车辆'}]}]"
            >
              <a-select-option value="C1">C1</a-select-option>
              <a-select-option value="C2">C2</a-select-option>
              <a-select-option value="A1">A1</a-select-option>
              <a-select-option value="A2">A2</a-select-option>
              <a-select-option value="A3">A3</a-select-option>
              <a-select-option value="B1">B1</a-select-option>
              <a-select-option value="B2">B2</a-select-option>
              <a-select-option value="C3">C3</a-select-option>
              <a-select-option value="C4">C4</a-select-option>
              <a-select-option value="D">D</a-select-option>
              <a-select-option value="E">E</a-select-option>
              <a-select-option value="F">F</a-select-option>
              <a-select-option value="M">M</a-select-option>
              <a-select-option value="N">N</a-select-option>
              <a-select-option value="P">P</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否有效">
            <a-switch
              checkedChildren="是"
              unCheckedChildren="否"
              v-decorator="['is_valid', {valuePropName: 'checked',initialValue: true}]"
            />
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </a-card>
</template>

<script>
import STable from '@/components/Table'
import { getDriverList, insertDriver, deleteDriver } from '../../api/manage'
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
          title: '姓名',
          dataIndex: 'name'
        },
        {
          title: '准驾车辆',
          dataIndex: 'license_type'
        },
        {
          title: '是否有效',
          dataIndex: 'is_valid',
          customRender: text => text ? '是' : '否'
        },
        {
          title: '添加时间',
          dataIndex: 'create_time'
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
        return getDriverList(Object.assign(parameter, this.queryParam)).then(
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

  methods: {
    //删除车辆
    delDriver(record) {
      this.$confirm({
        title: '警告',
        content: `真的要删除司机 ${record.name} 吗?`,
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          deleteDriver({ driverid: record.id })
            .then(res => {
              //debugger
              if (res.succ) {
                this.$message.info(`司机 ${record.name} 删除成功`)
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

    //添加车辆弹窗
    showAddDriverModal() {
      this.visible = true
    },
    //添加司机
    addDriver() {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          insertDriver(values).then(res => {
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