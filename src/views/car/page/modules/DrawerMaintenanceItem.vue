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
        <!-- 保养项目名称 -->
        <a-form-item label="保养项目名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入简体中文"
            autocomplete="off"
            v-decorator.trim="['maintenanceName', validatorRules.maintenanceName]"
          />
        </a-form-item>

        <!-- 保养周期 -->
        <a-form-item label="保养周期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入保养周期"
            autocomplete="off"
            v-decorator.trim="['checkCycle', validatorRules.checkCycle]"
          >
            <a-select
              slot="addonAfter"
              v-decorator="[ 'cycleType', validatorRules.cycleType]"
              style="width: 100px"
              :getPopupContainer="(target) => target.parentNode"
            >
              <a-select-option :value="1">时间/月</a-select-option>
              <a-select-option :value="2">里程/万公里</a-select-option>
            </a-select>
          </a-input>
        </a-form-item>

        <!-- 责任人？所有员工还是只有司机列表 -->
        <a-form-item label="责任人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            placeholder="请选择"
            v-decorator="[ 'responsiblePerson', validatorRules.responsiblePerson]"
            :getPopupContainer="(target) => target.parentNode"
          >
            <a-select-option
              v-for="item in PersonData"
              :key="item.id"
              :value="item.id"
            >{{item.realName}}</a-select-option>
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
export default {
  name: 'DrawerMaintenanceItem',
  components: {
    SDrawer,
  },
  data() {
    return {
      PersonData: [], //责任人列表

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
        cycleType: {
          initialValue: 1,
          rules: []
        }
      }
    }
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
          'maintenanceItemName',
          'checkCycle',
          'responsiblePerson',
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
  },
}
</script>
<style lang="less" scoped>
</style>