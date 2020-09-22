<!-- 员工列表 -->
<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="8">
          <a-col :lg="4" :sm="12">
            <a-form-item>
              <a-input
                autocomplete="off"
                placeholder="请输入用户真实名称/手机号搜索"
                v-model="queryParam.searchKey"
              ></a-input>
            </a-form-item>
          </a-col>
          <!-- 查询、重置 -->
          <a-col :lg="4" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery">查询</a-button>
              <a-button style="margin-left: 8px" @click="searchReset">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <!-- 序号 -->
        <span
          slot="serialslot"
          slot-scope="text,record,index"
        >{{ipagination.current*ipagination.pageSize+index+1-ipagination.pageSize}}</span>
        <!-- 头像 -->
        <template slot="avatarslot" slot-scope="text, record">
          <div class="anty-img-wrap">
            <a-avatar shape="square" :src="record.avatar" icon="user" />
          </div>
        </template>
        <!-- 操作 -->
        <span slot="action" slot-scope="text,record">
          <a @click="handleEdit(record)">详情</a>
          <a-divider type="vertical" />
          <a v-if="record.status==1" @click="handleEnable(record)">禁用</a>
          <a v-if="record.status==2" @click="handleEnable(record)">启用</a>
          <a-divider type="vertical" />
          <a @click="handleDelete(record)">删除</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 审核弹窗 -->
    <a-modal
      :title="modalSet.title"
      :maskClosable="true"
      :width="modalSet.width"
      :visible="modalSet.visible"
      @cancel="handleCancel"
      @close="handleCancel"
      @ok="handleOk"
    >
      <a-form :form="form">
        <a-form-item label="请选择" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-radio-group name="auditRadioGroup" :default-value="1" @change="handleAuditRadio">
            <a-radio :value="1">通过</a-radio>
            <a-radio :value="2">拒绝</a-radio>
          </a-radio-group>
          <template>
            <a-textarea
              v-if="auditRadioGroup==2"
              placeholder="拒绝备注"
              :auto-size="{ minRows: 1, maxRows: 3 }"
              v-decorator="['noPassRemark',validatorRules.noPassRemark]"
            />
          </template>
        </a-form-item>
      </a-form>
    </a-modal>

    <drawer-account ref="modalForm" @ok="modalFormOk"></drawer-account>
  </a-card>
</template>
<script>

import { ListMixin } from '../../mixins/ListMixin'
import DrawerAccount from './modules/DrawerAccount'
import { getAction, postAction, deleteAction } from '../../api'
export default {
  name: 'AccountList',
  mixins: [ListMixin],
  components: { DrawerAccount },
  data() {
    return {
      accountrolesData: [],
      auditRadioGroup: 1,
      editmodel: {},  //编辑model
      //弹窗窗口设置
      modalSet: {
        title: '审核',
        visible: false,
        width: 500,
      },
      form: this.$form.createForm(this),

      // 表头
      columns: [
        {
          title: '编号',
          scopedSlots: { customRender: 'serialslot' },
          align: 'center',
        },
        {
          title: '微信昵称',
          dataIndex: 'nickName',
          align: 'center',
        },
        {
          title: '头像',
          scopedSlots: { customRender: 'avatarslot' },
          align: 'center',
        },
        {
          title: '姓名',
          dataIndex: 'realName',
          align: 'center',
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
          align: 'center',
        },
        {
          title: '岗位',
          dataIndex: '',
          align: 'center',
        },
        {
          title: '性别',
          dataIndex: 'gender',
          align: 'center',
          customRender: (text) => text === 1 ? '男' : text === 2 ? '女' : ''
        },
        {
          title: '加入时间',
          dataIndex: 'applyTime',
          align: 'center',
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center',
        }
      ],
      validatorRules: {//表单验证规则
        noPassReason: {},
      },
      //api 请求参数
      url: {
        list: '/account/accounts',
        accountroles: '/account/accountroles',//岗位列表
        enable: '/account/enable', //启用/禁用
        delete: '/account/accounts', //删除


        provincesList: '/backend-api/pca/provinces', //省
        cityList: '/backend-api/pca/all-cities',//市
        detail: '/backend-api/user/users/', //详情
        exportXlsUrl: '/backend-api/user/exportExcel'
      },
    }
  },
  created() {
    const param = {}
    param.pageSize = 10000
    param.pageNo = 1
    getAction(this.url.accountroles, param).then((res) => {
      this.accountrolesData = res.data.records
    })
  },
  methods: {
    //审核弹窗
    handleAudit(record) {
      this.editmodel = record
      this.modalSet.visible = true
    },
    //切换通过不通过
    handleAuditRadio(record) {
      this.auditRadioGroup = record.target.value
    },
    // 关闭
    handleCancel() {
      this.close()
    },
    // 关闭
    close() {
      this.modalSet.visible = false
    },
    //提交
    handleOk() {
      console.log(this.editmodel)
    },
    handleEdit(record) {
      this.$refs.modalForm.edit(record, this.accountrolesData)
      this.$refs.modalForm.title = '编辑'
      this.$refs.modalForm.disableSubmit = false
    },
    //禁用-启用
    handleEnable(record) {
      this.$confirm({
        title: '警告',
        content: `确定要${record.status === 2 ? '启用' : '禁用'}吗?`,
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          this.loading = true
          const enable = record.status == 1 ? 2 : 1
          postAction(this.url.enable, { accountId: record.id, status: enable }).then((res) => {
            if (res.success) {
              this.$message.success('操作成功')
              this.loadData()
            } else {
              this.$message.warning(res.message)
            }
          }).finally(() => {
            this.loading = false
          })
        },
        onCancel() { }
      })
    },
    //删除
    handleDelete(record) {
      this.$confirm({
        title: '警告',
        content: `确定要删除吗?`,
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          this.loading = true
          deleteAction(this.url.delete, { accountId: record.id }).then((res) => {
            if (res.success) {
              this.$message.success('操作成功')
              this.loadData()
            } else {
              this.$message.warning(res.message)
            }
          }).finally(() => {
            this.loading = false
          })
        },
        onCancel() { }
      })
    },
  },
}

</script>
<style lang="less" scoped>
</style>