<!-- 司机编辑 -->
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
        <!-- 员工姓名 -->
        <a-form-item label="员工姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入简体中文"
            autocomplete="off"
            v-decorator.trim="['realName', validatorRules.realName]"
          />
        </a-form-item>
        <!-- 准驾车辆 -->
        <a-form-item label="准驾车辆" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入准驾车辆"
            autocomplete="off"
            v-decorator="[ 'licenseType', validatorRules.licenseType]"
          />
        </a-form-item>
        <!-- 添加时间 -->
        <a-form-item label="添加时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-date-picker
            disabled
            v-decorator.trim="['createTime', {initialValue:!model.createTime?null:moment(model.createTime,'YYYY-MM-DD')}]"
            style="width: 100%"
          />
        </a-form-item>
        <!-- 是否有效 -->
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否启用">
          <a-switch
            checkedChildren="是"
            unCheckedChildren="否"
            v-decorator="['isVaild', {valuePropName: 'checked',isVaild: true}]"
          />
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
import moment from 'moment'
import pick from 'lodash.pick'
import SDrawer from '../../../components/SDrawer/index'
export default {
  name: 'DrawerCar',
  components: {    SDrawer,

  },
  data() {
    return {
      color: '#000',
      colorShow: false,

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
        nickName: { rules: [{ required: true, message: '请输入简体中文' }] },
        realName: { rules: [{ required: true, message: '请选择' }] }, //姓名
        gender: { rules: [{ required: true, message: '请选择' }] },//性别
        mobile: { rules: [{ pattern: /^1[3456789]\d{9}$/ }] },
        roleId: { rules: [{ required: true, message: '请选择' }] },
        areaCode: {},
        address: {},
        email: {},

      }
    }
  },
  created() { },
  methods: {
    moment,
    add() {
      this.resetData()
    },
    //完善/编辑
    edit(record) {
      this.resetData()
      this.model = Object.assign({}, record)
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model,
          'realName',
          'licenseType',
          'createTime',
        ))
        this.form.setFieldsValue({ 'isVaild': this.model.isVaild === 1 ? true : false })
      })
    },
    //重置数据
    resetData() {
      this.modalSet.visible = true
    },
    //提交
    handleOk() {
      this.form.validateFields((err, values) => {
        console.log(err, values)
        console.log(JSON.stringify(values))
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
    //上传图片
    uploadFilesCustomRequest() {

    },
    //移除图片
    handleFileRemove() { }
  },
}
</script>

<style lang="less" scoped>

.edit-title {
  font-weight: 600;
}
</style>