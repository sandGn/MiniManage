<!-- 车辆编辑 -->
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
        <!-- 车辆名称 -->
        <a-form-item label="车辆名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入简体中文"
            autocomplete="off"
            v-decorator.trim="['carName', validatorRules.carName]"
          />
        </a-form-item>
        <!-- 车牌号码 -->
        <a-form-item label="车牌号码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入车牌号码"
            autocomplete="off"
            v-decorator="[ 'licensePlate', validatorRules.licensePlate]"
          />
        </a-form-item>

        <!-- 车辆图片 -->
        <a-form-item label="车辆图片" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-upload
            list-type="picture-card"
            :file-list="carImgList"
            :customRequest="uploadFilesCustomRequest"
            :remove="handleFileRemove"
            v-decorator.trim="['carImgUrl', validatorRules.carImgUrl]"
          >
            <div v-if="carImgList.length < 1">
              <a-icon type="plus" />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
          <div>推荐尺寸：200*200像素</div>
        </a-form-item>
        <!-- 车辆颜色 -->
        <a-form-item label="车辆颜色" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <!-- <colorPicker v-decorator="[ 'color', validatorRules.color]" /> -->
          <div @click="handleShowColor" class="vue-color-div">
            <span
              class="vue-color-span"
              v-decorator="[ 'color', validatorRules.color]"
              :style="{background:color}"
            ></span>
          </div>
          <div
            v-show="colorShow"
            :tabindex="-1"
            style="display:inline-block;border:0"
            @blur="handleShowColor"
          >
            <!-- <sketch-picker v-model="color" @input="updateValue"></sketch-picker> -->
            <chrome-picker v-model="color" @input="updateValue"></chrome-picker>
          </div>
        </a-form-item>
        <!-- 当前公里数 -->
        <a-form-item label="当前公里数" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            autocomplete="off"
            placeholder="请输入车辆当前公里数"
            v-decorator="[ 'kilometres', validatorRules.kilometres]"
          />
        </a-form-item>
        <!-- 油耗 -->
        <a-form-item label="油耗" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            suffix="L/100km"
            autocomplete="off"
            placeholder="请输入车辆油耗"
            v-decorator="[ 'gasMileage', validatorRules.gasMileage]"
          />
        </a-form-item>
        <!-- 年检到期时间 -->
        <a-form-item label="年检到期时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-date-picker
            v-decorator.trim="['yearcheckDueDate', {initialValue:!model.yearcheckDueDate?null:moment(model.yearcheckDueDate,'YYYY-MM-DD')}]"
            style="width: 100%"
          />
        </a-form-item>
        <!-- 保险到期时间 -->
        <a-form-item label="保险到期时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-date-picker
            v-decorator.trim="['insuranceDueDate', {initialValue:!model.insuranceDueDate?null:moment(model.insuranceDueDate,'YYYY-MM-DD')}]"
            style="width: 100%"
          />
        </a-form-item>
        <!-- 是否启用 -->
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否启用">
          <a-switch
            checkedChildren="是"
            unCheckedChildren="否"
            v-decorator="['isEnable', {valuePropName: 'checked',initialValue: true}]"
          />
        </a-form-item>
        <a-form-item label="责任司机分配" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            mode="multiple"
            placeholder="请选择责任司机"
            v-decorator="[ 'thirdCategories', validatorRules.thirdCategories]"
            :getPopupContainer="(target) => target.parentNode"
          >
            <a-select-option
              v-for="item in thirdCategoriesData"
              :key="item.id"
              :value="item.id"
            >{{item.categoryNameCn}}</a-select-option>
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
import { Chrome } from 'vue-color'
import moment from 'moment'
import pick from 'lodash.pick'
import SDrawer from '../../../components/SDrawer/index'
import { randomUUID } from '../../../utils/util'
export default {
  name: 'DrawerCar',
  components: {    SDrawer,
    // 'sketch-picker': Sketch, 
    'chrome-picker': Chrome
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

      carImgList: [],//车辆图片
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
    handleShowColor() {
      this.colorShow = !this.colorShow
      if (!this.colorShow) {
        this.form.setFieldsValue({ 'color': this.color })
      }
    },
    updateValue(val) {
      this.color = val.hex
    },
    add() {
      this.resetData()
    },
    //完善/编辑
    edit(record) {
      this.resetData()
      this.model = Object.assign({}, record)
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model,
          'carName',
          'licensePlate',
          'color',
          'kilometres',
          'gasMileage',
        ))
        this.form.setFieldsValue({ 'isEnable': this.model.isEnable === 1 ? true : false })
      })
      this.color = this.model.color //车辆颜色
      //车辆图片
      this.carImgList.push({
        uid: randomUUID(),
        name: 'image.png',
        status: 'done',
        url: this.model.carImgUrl
      })
    },
    //重置数据
    resetData() {
      this.modalSet.visible = true
      this.carImgList = []    //车辆图片
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
.vue-color-div {
  border: 1px solid #d9d9d9;
  width: 100px;
  height: 40px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.vue-color-span {
  background: rgb(0, 102, 153);
  display: inline-block;
  border: 1px solid #666;
  width: 75px;
  height: 25px;
}
.edit-title {
  font-weight: 600;
}
</style>