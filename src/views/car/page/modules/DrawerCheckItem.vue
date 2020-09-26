<template>
  <s-drawer
    :title="modalSet.title"
    :visible.sync="modalSet.visible"
    :width="modalSet.width"
    :fullscreen.sync="modalSet.fullscreen"
    :switchFullscreen="modalSet.switchFullscreen"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <!-- 点检项目名称 -->
        <a-form-item label="点检项目名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入简体中文"
            autocomplete="off"
            v-decorator.trim="['checkItemName', validatorRules.checkItemName]"
          />
        </a-form-item>

        <!-- 点检项目内容 -->
        <a-form-item label="点检项目内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea
            placeholder="点检项目内容与判定标准"
            :auto-size="{ minRows: 4, maxRows: 5 }"
            v-decorator="[ 'description', validatorRules.description]"
          />
        </a-form-item>

        <!-- 点检周期 -->
        <a-form-item label="点检周期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="[ 'checkCycle', validatorRules.checkCycle]"
            placeholder="请选择周期"
            :getPopupContainer="(target) => target.parentNode"
          >
            <a-select-option :value="1">每天</a-select-option>
            <a-select-option :value="2">每次出车前</a-select-option>
            <a-select-option :value="3">每次出车后</a-select-option>
          </a-select>
        </a-form-item>

        <!-- 责任人？所有员工-右联动 -->
        <a-form-item label="责任人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-cascader
            :options="PersonData"
            :display-render="displayRender"
            placeholder="请选择"
            :load-data="loadData"
            v-decorator="[ 'responsiblePerson', validatorRules.responsiblePerson]"
          />

          <!-- <a-select
            placeholder="请选择"
            v-decorator="[ 'responsiblePerson', validatorRules.responsiblePerson]"
            :getPopupContainer="(target) => target.parentNode"
          >
            <a-select-option
              v-for="item in PersonData"
              :key="item.id"
              :value="item.id"
            >{{item.realName}}</a-select-option>
          </a-select>-->
        </a-form-item>

        <!-- 生效车辆 -->
        <a-form-item label="生效车辆" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            mode="multiple"
            placeholder="请选择"
            v-decorator="[ 'carName', validatorRules.carName]"
            :getPopupContainer="(target) => target.parentNode"
          >
            <a-select-option
              v-for="item in carData"
              :key="item.id"
              :value="item.id"
            >{{item.carName}}</a-select-option>
          </a-select>
        </a-form-item>

        <!-- 是否启用 -->
        <a-form-item label="是否启用" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="[ 'isEnable', validatorRules.isEnable]"
            placeholder="是否启用"
            :getPopupContainer="(target) => target.parentNode"
          >
            <a-select-option :value="1">是</a-select-option>
            <a-select-option :value="0">否</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
    <!-- 操作按钮 -->
    <a-row :style="{textAlign:'center'}">
      <a-button :style="{marginRight: '50px'}" type="primary" @click="handleOk">保存</a-button>
      <a-button @click="handleCancel">取消</a-button>
    </a-row>
  </s-drawer>
</template>

<script>
import SDrawer from '../../../../components/SDrawer/index'
import pick from 'lodash.pick'
import { getAction } from '../../../../api'
export default {
  name: 'DrawerCheckItem',
  components: {
    SDrawer,
  },
  data() {
    return {
      carData: [],//车辆列表
      PersonData: [
        {
          value: '-1',
          label: '车辆负责人',
        },
        {
          value: '2',
          label: '其他...',
          isLeaf: false,
        }
        //{ 'realName': '车辆负责人【默认】', 'id': 1 }, { 'realName': '员工1', 'id': 2 }, { 'realName': '员工2', 'id': 3 }
      ], //责任人列表

      //弹窗窗口设置
      modalSet: {
        title: '编辑',
        visible: false,
        width: 1000,
        fullscreen: false, //是否全屏
        switchFullscreen: true//全屏开关
      },
      confirmLoading: false,
      form: this.$form.createForm(this),
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },

      //验证规则
      validatorRules: {
        responsiblePerson: {
          initialValue: ['-1'],
        },
        isEnable:{
          initialValue: 1,
        }
      },
      //api 请求参数
      url: {
        carlist: '/car/cars',//获取车辆列表
        accountlist: '/account/accounts', //员工列表
      }
    }
  },
  created() {
    const param = {}
    param.pageSize = 10000
    param.pageNo = 1
    getAction(this.url.carlist, param).then((res) => {
      this.carData = res.data.records
    })
  },
  methods: {
    //新增
    add() {
      this.resetData()
    },
    //编辑
    edit(record) {
      this.resetData()
      this.model = Object.assign({}, record)
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model,
          'checkItemName',
          'checkCycle',
          'responsiblePerson',
          'description',
          'isEnable',
        ))
        // this.form.setFieldsValue({ 'isEnable': this.model.isEnable === 1 ? true : false })
      })
    },
    //重置数据
    resetData() {
      this.form.resetFields()
      this.modalSet.visible = true
    },
    //提交
    handleOk() { },
    //取消
    handleCancel() {
      this.close()
    },
    // 关闭
    close() {
      this.modalSet.visible = false
    },
    loadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      const param = {}
      param.pageSize = 10000
      param.pageNo = 1
      getAction(this.url.accountlist, param).then((res) => {
        if (res.data.records.length > 0) {
          res.data.records.forEach(item => {
            item.label = item.realName
            item.value = item.realName
          })
        }
        targetOption.children = res.data.records
        this.PersonData = [...this.PersonData]
      })
    },
    displayRender({ labels }) {
      return labels[labels.length - 1]
    },
  },
}
</script>
<style lang="less" scoped>
</style>