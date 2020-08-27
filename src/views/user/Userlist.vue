<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="员工姓名">
              <a-input placeholder="请输入" v-model="queryParam.account_name" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
    >
      <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>

      <span slot="account_role_list" slot-scope="account_role_list">
        <a-tag
          :key="rolename.id"
          v-for=" rolename in account_role_list"
          color="blue"
        >{{rolename.name}}</a-tag>
      </span>

      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="edit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="del(record)">删除</a>
        </template>
      </span>
    </s-table>

    <!-- 编辑 -->
    <a-modal
      :width="800"
      :visible="visible"
      title="操作"
      @ok="save"
      @cancel="cancel"
      :confirmLoading="confirmLoading"
    >
      <a-spin :spinning="confirmLoading">
        <a-form-model
          ref="ruleForm"
          :model="mdlfrom"
          :rules="rules"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-form-model-item label="员工姓名" prop="account_name" has-feedback>
            <a-input v-model="mdlfrom.account_name"></a-input>
          </a-form-model-item>

          <a-form-model-item label="手机号码" prop="mobile" has-feedback>
            <a-input v-model="mdlfrom.mobile" />
          </a-form-model-item>

          <a-form-model-item label="职务" prop="duties" has-feedback>
            <a-input v-model="mdlfrom.duties" />
          </a-form-model-item>

          <a-form-model-item label="职务" prop="duties" has-feedback>
            <a-input v-model="mdlfrom.duties" />
          </a-form-model-item>

          <a-form-model-item label="邮箱" prop="email" has-feedback>
            <a-input v-model="mdlfrom.email" />
          </a-form-model-item>

          <a-form-model-item label="是否启用" prop="is_enable" has-feedback>
            <a-switch v-model="mdlfrom.is_enable" checkedChildren="是" unCheckedChildren="否" />
          </a-form-model-item>
          <a-divider />
          <a-form-model-item label="角色" has-feedback>
            <a-select
              style="width: 100%"
              mode="multiple"
              v-model="selectRolenameList"
              :allowClear="true"
            >
              <a-select-option
                v-for="(role, index) in roleList"
                :key="index.id"
                :value="role.name"
              >{{ role.name }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-form-model>

        <!-- <a-form :form="form">
          <a-form-item label="员工姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              v-decorator="['name',{initialValue:mdl.name,rules:[{required: true, message: '请输入员工姓名'}]}]"
            />
          </a-form-item>

          <a-form-item label="手机号码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="mdl.mobile" />
          </a-form-item>

          <a-form-item label="职务" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="mdl.duties" />
          </a-form-item>

          <a-form-item label="邮箱" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="mdl.email" />
          </a-form-item>

          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否启用">
            <a-switch checkedChildren="是" unCheckedChildren="否" v-model="mdl.is_enable" />
          </a-form-item>
          <a-divider />

          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="角色" hasFeedback>
            <a-select
              style="width: 100%"
              mode="multiple"
              v-model="selectRolenameList"
              :allowClear="true"
            >
              <a-select-option
                v-for="(role, index) in roleList"
                :key="index.id"
                :value="role.id"
              >{{ role.name }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>-->
      </a-spin>
    </a-modal>
  </a-card>
</template>
<script>
import STable from '@/components/Table'

import { getAccountList, getRoleList } from '../../api/manage'

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    STable
  },
  data() {
    return {
      // 查询参数
      queryParam: {},

      // 表头
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '员工姓名',
          dataIndex: 'account_name'
        },
        {
          title: '手机号码',
          dataIndex: 'mobile'
        },
        {
          title: '职务',
          dataIndex: 'duties'
        },
        {
          title: '电子邮箱',
          dataIndex: 'email',
        },
        {
          title: '是否启用',
          dataIndex: 'is_enable',
          customRender: text => text ? '是' : '否'
        },
        {
          title: '角色',
          dataIndex: 'account_role_list',
          scopedSlots: { customRender: 'account_role_list' },
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 获取角色列表
      roleList: null,
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getAccountList(Object.assign(parameter, this.queryParam)).then(
          res => {
            return res
          }
        )
      },
      /*弹窗*/

      //数据对象
      mdlfrom: {},
      //校验规则
      rules: {
        account_name: [
          { required: true, message: '请输入员工姓名' }
        ],
      },


      //form: this.$form.createForm(this),
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
      selectRolenameList: [],
    }
  },
  //过滤
  filters: {

  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  methods: {
    //编辑
    edit(record) {
      this.mdlfrom = Object.assign({}, record)
      this.selectRolenameList = []
      record.account_role_list.forEach(role => {
        this.selectRolenameList = this.selectRolenameList.concat(role.name)
      })
      console.log(this.selectRolenameList)
      console.log(this.mdlfrom)
      this.visible = true
    },
    //删除
    del() { },
    //保存
    save() {
      this.$refs.ruleForm.validate(valid => {
        console.log(this.mdlfrom)
        console.log(this.selectRolenameList)
        console.log(valid)
      })
    },
    //取消
    cancel() {
      this.visible = false
      this.$refs.ruleForm.resetFields()
    },
    //获取角色列表
    loadRoleList() {
      getRoleList().then(res => { this.roleList = res.data })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.loadRoleList()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() { },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { } //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
</style>