<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper"></div>

    <div>
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
    </a-modal>
  </a-card>
</template>

<script>
import STable from '@/components/Table'
import { getCheckItemList, deleteCheckItem, insertCheckItem } from '../../api/manage'
const cycleMap = {
  0: { text: '每天' },
  1: { text: '每次出车前' },
  2: { text: '每次出车后' },
}
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
          title: '点检项目名称',
          dataIndex: 'name'
        },
        {
          title: '点检周期',
          dataIndex: 'check_cycle',
          scopedSlots: { customRender: 'check_cycle' }
        },
        {
          title: '点检内容',
          dataIndex: 'description'
        },
        {
          title: '负责人',
          dataIndex: 'create_time'
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
        return getCheckItemList(Object.assign(parameter, this.queryParam)).then(
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
  filters: {
    cycleFilter(type) {
      return cycleMap[type].text
    }
  },
  methods: {
    //删除点检项目
    delCheckItem(record) {
      this.$confirm({
        title: '警告',
        content: `真的要删除 ${record.name} 该项目吗?`,
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          deleteCheckItem({ checkitemid: record.id })
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

    //添加点检项目弹窗
    showAddCheckItemModal() {
      this.visible = true
    },
    //添加点检项目
    addCheckItem() {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          insertCheckItem(values).then(res => {
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