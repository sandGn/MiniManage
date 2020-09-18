<!-- 新建岗位 -->
<template>
  <a-modal
    :title="modalSet.title"
    :maskClosable="true"
    :width="modalSet.width"
    :visible="modalSet.visible"
    :confirmLoading="modalSet.confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
    wrapClassName="ant-modal-cust-warp"
  >
    <a-form :form="form">
      <!-- 岗位名称 -->
      <a-form-item label="岗位名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input
          placeholder="请输入岗位名称（20字以内）"
          autocomplete="off"
          v-decorator.trim="['roleName', validatorRules.roleName]"
        />
      </a-form-item>
      <a-form-item label="排序" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input
          placeholder="排序"
          autocomplete="off"
          v-decorator.trim="['sortNo', validatorRules.sortNo]"
        />
      </a-form-item>
      <!-- 岗位描述 -->
      <a-form-item label="岗位描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-textarea
          placeholder="..."
          :auto-size="{ minRows: 4, maxRows: 5 }"
          v-decorator.trim="['description']"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>

import { validateNumber } from '../../../utils/validatehelp'
import { COMPANY_INFO } from '../../../store/mutation-types'
import Vue from 'vue'
export default {
  mixins: [],
  components: {

  },
  data() {
    return {
      //弹窗窗口设置
      modalSet: {
        title: '新增',
        visible: false,
        width: 800,
        confirmLoading: false,
      },
      form: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },

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
      validatorRules: {
        roleName: {
          rules: [{ required: true, message: '请输入岗位名称' }, { max: 20, message: '最多20个字' }]
        },
        sortNo: {
          rules: [{ required: true, message: '请输入数字!' }, { validator: validateNumber, }]
        }
      },
      //api 请求参数
      url: {
        list: '/account/accountroles',
        add: '/account/accountroles',
      },
    }
  },
  created() {

  },
  methods: {
    //新增
    add() {
      this.resetData()
      this.form.resetFields()
    },
    //提交
    handleOk() {
      this.form.validateFields((err, values) => {
        console.log(err, values)
        if (!err) {
          let param = Object.assign({}, values) //提交参数
          param.companyId = Vue.ls.get(COMPANY_INFO).id //企业编号,可后台取
          console.log('提交参数', JSON.stringify(param))
        }
      })
    },
    //取消
    handleCancel() {
      this.close()
    },
    // 关闭
    close() {
      this.modalSet.visible = false
    },
    //重置数据
    resetData() {
      this.modalSet.visible = true
    },
  },
}
</script>
<style lang="less" scoped>
</style>