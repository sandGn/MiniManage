<!-- 员工申请列表 -->
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
          <!-- 审核状态 -->
          <a-col :lg="4" :sm="12">
            <a-form-item label="审核状态">
              <a-select v-model="queryParam.reviewStatus" placeholder="请选择" default-value>
                <a-select-option value>全部</a-select-option>
                <a-select-option value="1">待审核</a-select-option>
                <a-select-option value="2">审核不通过</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <!-- 查询、重置 -->
          <a-col :lg="4" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery">查询</a-button>
              <a-button style="margin-left: 8px;margin-right:8px" @click="searchReset">重置</a-button>
              <a-switch
                checkedChildren="开启"
                unCheckedChildren="关闭"
                v-model="isVerify"
                @click="value=>handleVerify(value)"
              ></a-switch>
              <div
                style="position:absolute;display:inline-block;line-height:20px;height:22px;margin:8px 5px 4px"
              >
                <a-tooltip class="header-item" title="关闭后,员工将不用审核直接成为公司员工">
                  <a-icon type="info-circle-o" :style="{ fontSize: '20px', color: '#1890ff' }"></a-icon>
                </a-tooltip>
              </div>
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
          <template v-if="record.reviewStatus===1">
            <a @click="handleAudit(record)">审核</a>
          </template>
          <template v-else>不通过</template>
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
  </a-card>
</template>
<script>

import Vue from 'vue'
import { COMPANY_INFO } from '../../store/mutation-types'
import { ListMixin } from '../../mixins/ListMixin'
import { postAction } from '../../api'
export default {
  name: 'AccountList',
  mixins: [ListMixin],
  components: {},
  data() {
    return {
      isVerify: true,

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
          title: '性别',
          dataIndex: 'gender',
          align: 'center',
          customRender: (text) => text === 1 ? '男' : text === 2 ? '女' : ''
        },
        {
          title: '备注',
          dataIndex: 'remark',
          align: 'center',
        },
        {
          title: '申请时间',
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
        list: '/account/applys',
        verify: '/changeapply', //启用/禁用员工审核



        enable: '/backend-api/user/users/enable', //启用
        disable: '/backend-api/user/users/disable', //禁用
        provincesList: '/backend-api/pca/provinces', //省
        cityList: '/backend-api/pca/all-cities',//市
        detail: '/backend-api/user/users/', //详情
        exportXlsUrl: '/backend-api/user/exportExcel'
      },
    }
  },
  created() {
    this.isVerify = Vue.ls.get(COMPANY_INFO).isVerify === 1 ? true : false
  },
  methods: {
    //员工审核
    handleVerify(checked) {
      this.isVerify = !checked
      console.log(checked)
      if (!checked) {
        this.$confirm({
          title: '警告',
          content: `关闭审核，员工将通过扫码直接加入公司，是否确定关闭？`,
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk: () => {
            this.updateCompanyVerify(checked)
          },
          onCancel() {
          }
        })
      } else {
        this.updateCompanyVerify(checked)
      }
    },
    //更新员工审核功能
    updateCompanyVerify(checked) {
      postAction(this.url.verify, { 'isVerify': checked ? 1 : 0 }).then(res => {
        if (res.success) {
          this.$message.success('操作成功')
          this.isVerify = checked
        } else {
          this.$message.warning(res.message)
        }
      }).finally(() => {
      })

    },
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
    }
  },
}

</script>
<style lang="less" scoped>
</style>