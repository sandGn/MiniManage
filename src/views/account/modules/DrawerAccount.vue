<!-- 用户编辑 -->
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
        <!-- 微信昵称 -->
        <a-form-item label="微信昵称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入简体中文"
            autocomplete="off"
            disabled
            v-decorator.trim="['nickName', validatorRules.nickName]"
          />
        </a-form-item>

        <!-- 头像 -->
        <a-form-item label="头像" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-upload
            list-type="picture-card"
            :file-list="avatarList"
            :customRequest="uploadFilesCustomRequest"
            :remove="handleFileRemove"
            v-decorator.trim="['avatar', validatorRules.avatar]"
          >
            <div v-if="avatarList.length < 1">
              <a-icon type="plus" />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
          <div>推荐尺寸：200*200像素</div>
        </a-form-item>

        <!-- 姓名 -->
        <a-form-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入姓名"
            autocomplete="off"
            v-decorator="[ 'realName', validatorRules.realName]"
          />
        </a-form-item>
        <!-- 性别 -->
        <a-form-item label="性别" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="[ 'gender', validatorRules.gender]"
            placeholder="请选择"
            :getPopupContainer="(target) => target.parentNode"
          >
            <a-select-option :value="1">男</a-select-option>
            <a-select-option :value="2">女</a-select-option>
          </a-select>
        </a-form-item>
        <!-- 手机号 -->
        <a-form-item label="手机号码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            autocomplete="off"
            placeholder="请输入手机号码"
            v-decorator="[ 'mobile', validatorRules.contactNumber]"
          />
        </a-form-item>
        <!-- 岗位 -->
        <a-form-item label="岗位分配" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="[ 'roleId', validatorRules.roleId]"
            placeholder="请选择"
            :getPopupContainer="(target) => target.parentNode"
          >
            <a-select-option
              v-for="item in roleData"
              :key="item.id"
              :value="item.id"
            >{{item.roleName}}</a-select-option>
          </a-select>
        </a-form-item>

        <!-- 生日 -->
        <a-form-item label="生日" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-date-picker
            v-decorator.trim="['birthday', {initialValue:!model.birthday?null:moment(model.birthday,'YYYY-MM-DD')}]"
            style="width: 100%"
          />
        </a-form-item>

        <!-- 所在地区 -->
        <a-form-item label="所在地区" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <area-linkage v-decorator="[ 'areaCode', validatorRules.areaCode]" type="select" />
        </a-form-item>
        <!-- 住址 -->
        <a-form-item label="住址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入员工住址"
            autocomplete="off"
            v-decorator="[ 'address', validatorRules.address]"
          />
        </a-form-item>

        <!-- 邮箱 -->
        <a-form-item label="邮箱" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            autocomplete="off"
            placeholder="请输入邮箱"
            v-decorator.trim="['email', validatorRules.email]"
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
import AreaLinkage from '../../../components/Area/AreaLinkage'
import { randomUUID } from '../../../utils/util'
export default {
  name: 'DrawerAccount',
  components: { SDrawer, AreaLinkage },
  data() {
    return {
      roleData: [],//岗位列表数据
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

      avatarList: [],//头像
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
    //完善/编辑
    edit(record, accountrolesData) {
      this.roleData = accountrolesData //岗位
      this.resetData()
      this.model = Object.assign({}, record)
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model,
          'nickName',
          'avatar',
          'realName',
          'gender',
          'mobile',
          'roleId',
          'areaCode',
          'address',
          'email'
        ))
      })
      //头像
      this.avatarList.push({
        uid: randomUUID(),
        name: 'image.png',
        status: 'done',
        url: this.model.avatar
      })
    },
    //重置数据
    resetData() {
      this.modalSet.visible = true
      this.avatarList = []    //头像
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
    uploadFilesCustomRequest() {

    },
    handleFileRemove() { }
  },
}
</script>

<style lang="less" scoped>
.edit-title {
  font-weight: 600;
}
</style>