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
        <h3 class="edit-title">基本信息</h3>
        <!-- 企业名称[全称] -->
        <a-form-item label="企业名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入简体中文"
            autocomplete="off"
            disabled
            v-decorator.trim="['companyName', validatorRules.companyName]"
          />
        </a-form-item>
        <!-- 联系电话 -->
        <a-form-item label="联系电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入联系电话"
            autocomplete="off"
            v-decorator="[ 'contactNumber', validatorRules.contactNumber]"
          />
        </a-form-item>
        <!-- 所在地区 -->
        <a-form-item label="所在地区" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <area-linkage v-decorator="[ 'areaCode', validatorRules.areaCode]" type="select" />
        </a-form-item>
        <!-- 地址 -->
        <a-form-item label="地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入企业所在具体地址"
            autocomplete="off"
            v-decorator="[ 'address', validatorRules.address]"
          />
        </a-form-item>
        <!-- 企业简介 -->
        <a-form-item label="企业简介" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea
            placeholder="请输入简体中文"
            :auto-size="{ minRows: 4, maxRows: 10 }"
            autocomplete="off"
            v-decorator="[ 'introduction', validatorRules.introduction]"
          />
        </a-form-item>

        <h3 class="edit-title">企业概况</h3>
        <!-- 企业规模 -->
        <a-form-item label="企业规模" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="[ 'scale', validatorRules.scale]"
            placeholder="请选择"
            :getPopupContainer="(target) => target.parentNode"
          >
            <a-select-option :value="4">小型</a-select-option>
            <a-select-option :value="5">微型</a-select-option>
            <a-select-option :value="3">中型</a-select-option>
            <a-select-option :value="2">大型</a-select-option>
            <a-select-option :value="1">特大型</a-select-option>
          </a-select>
        </a-form-item>

        <!-- 企业性质 -->
        <a-form-item label="企业性质" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="[ 'nature', validatorRules.nature]"
            placeholder="请选择"
            :getPopupContainer="(target) => target.parentNode"
          >
            <a-select-option :value="1">私营企业</a-select-option>
            <a-select-option :value="2">股份有限公司</a-select-option>
            <a-select-option :value="3">股份合作制企业</a-select-option>
            <a-select-option :value="4">有限责任公司</a-select-option>
            <a-select-option :value="5">个体户</a-select-option>
            <a-select-option :value="6">外资企业</a-select-option>
            <a-select-option :value="7">国有企业</a-select-option>
            <a-select-option :value="8">集体企业</a-select-option>
            <a-select-option :value="9">合伙企业</a-select-option>
            <a-select-option :value="10">联营企业</a-select-option>
          </a-select>
        </a-form-item>

        <!-- 员工人数 -->
        <a-form-item label="员工人数" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="[ 'accountRange', validatorRules.accountRange]"
            placeholder="请选择"
            :getPopupContainer="(target) => target.parentNode"
          >
            <a-select-option :value="1">0-20人</a-select-option>
            <a-select-option :value="2">20-99人</a-select-option>
            <a-select-option :value="3">100-499人</a-select-option>
            <a-select-option :value="4">500-1000人</a-select-option>
            <a-select-option :value="5">1000人以上</a-select-option>
          </a-select>
        </a-form-item>

        <!-- 经营范围 -->
        <a-form-item label="经营范围" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea
            placeholder="请输入简体中文"
            :auto-size="{ minRows: 4, maxRows: 10 }"
            autocomplete="off"
            v-decorator="[ 'businessScope', validatorRules.businessScope]"
          />
        </a-form-item>

        <h3 class="edit-title">认证信息</h3>

        <!-- 法人姓名 -->
        <a-form-item label="法人姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            autocomplete="off"
            placeholder="请输入真实姓名"
            v-decorator.trim="['legalPersonName', validatorRules.legalPersonName]"
          />
        </a-form-item>

        <!-- 身份证 -->
        <a-form-item label="法人身份证" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            autocomplete="off"
            placeholder="请输入身份证"
            v-decorator.trim="['legalPersonIdCard', validatorRules.legalPersonIdCard]"
          />
        </a-form-item>

        <!-- 手机号 -->
        <a-form-item label="手机号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            autocomplete="off"
            placeholder="请输入手机号码"
            v-decorator="[ 'mobile', validatorRules.contactNumber]"
          />
        </a-form-item>

        <!-- 营业执照 -->
        <a-form-item label="营业执照" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-upload
            list-type="picture-card"
            :file-list="protocolAttachmentList"
            :customRequest="uploadFilesCustomRequest"
            :remove="handleFileRemove"
            v-decorator.trim="['protocolAttachment', validatorRules.protocolAttachment]"
          >
            <div v-if="protocolAttachmentList.length < 10">
              <a-icon type="plus" />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
          <div>推荐尺寸：350*150像素</div>
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
import pick from 'lodash.pick'
import SDrawer from '../../../components/SDrawer/index'
import AreaLinkage from '../../../components/Area/AreaLinkage'
export default {
  name: 'ModalCompanyInfo',
  components: { SDrawer, AreaLinkage },
  data() {
    return {
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

      protocolAttachmentList: [],//执照
      //验证规则
      validatorRules: {
        companyName: { rules: [{ required: true, message: '请输入简体中文' }] },
        contactNumber: {
          rules: [
            { required: true, message: '请输入联系电话!' },
            //{ validator: this.validatePhone, }
          ]
        },
        areaCode: { rules: [{ required: true, message: '请选择' }] },
        address: { rules: [{ required: true, message: '请输入简体中文' }] }, //中文数字
        introduction: { rules: [{ required: true, message: '请输入简体中文' }] },
        //企业概况
        scale: { rules: [{ required: true, message: '请选择' }] }, //企业规模
        nature: { rules: [{ required: true, message: '请选择' }] },//企业性质
        accountRange: { rules: [{ required: true, message: '请选择' }] },//员工人数范围
        businessScope: { rules: [{ required: true, message: '请输入简体中文' }] },
        //认证信息
        legalPersonName: {},
        legalPersonIdCard: {},
        mobile: { rules: [{ pattern: /^1[3456789]\d{9}$/ }] }
      }
    }
  },
  created() { },
  methods: {
    //完善/编辑
    edit(record) {
      this.resetData()
      this.model = Object.assign({}, record)
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model,
          'companyName',
          'contactNumber',
          'areaCode',
          'address',
          'introduction',
          'scale',
          'nature',
          'accountRange',
          'businessScope',
          'legalPersonName',
          'legalPersonIdCard',
          'mobile',
          'protocolAttachment',
        ))
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