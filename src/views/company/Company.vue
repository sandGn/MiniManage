<template>
  <page-view :title="company.name">
    <a-descriptions slot="headerContent">
      <a-descriptions-item label="联系电话">{{company.telephone}}</a-descriptions-item>
      <a-descriptions-item label="地址">{{company.address}}</a-descriptions-item>
      <a-descriptions-item label="员工审核">
        <a-switch
          :checked="company.is_account_verify"
          checkedChildren="开启"
          unCheckedChildren="关闭"
          @change="checked => setVerify(checked)"
        />
      </a-descriptions-item>
    </a-descriptions>

    <div v-if="company.is_account_verify">
      <div class="title">员工申请列表</div>
      <a-card :bordered="false">
        <s-table
          size="default"
          rowKey="id"
          :columns="columns"
          :data="loadData"
          showPagination="auto"
        >
          <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>

          <span slot="verify" slot-scope="text">
            <a-badge :status="text | stateTypeFilter" :text="text | stateFilter" />
          </span>

          <span slot="action" slot-scope="text, record">
            <template v-if="record.verify!=1">
              <template v-if="record.verify==0">
                <a-button type="primary" size="small" @click="pass(record)">通过</a-button>
                <a-divider type="vertical" />
                <a-button type="danger" size="small" @click="reject(record)">拒绝</a-button>
                <a-divider type="vertical" />
              </template>
              <a-button type="danger" size="small" ghost @click="del(record)">删除</a-button>
            </template>
          </span>
        </s-table>
      </a-card>
    </div>
  </page-view>
</template>
<script>
import { PageView } from '../../layouts'
import STable from '@/components/Table'
import { getAccountApplyList, getCompany, updateVerify } from '../../api/manage'
//审核状态
const verifyMap = {
  0: {
    status: 'default',
    text: '待审核'
  },
  1: {
    status: 'success',
    text: '通过'
  },
  2: {
    status: 'error',
    text: '已拒绝'
  },
}

export default {
  name: 'Company',
  components: {
    PageView,
    STable
  },
  data() {
    return {
      company: {},
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '员工姓名',
          dataIndex: 'name'
        },
        {
          title: '手机号码',
          dataIndex: 'mobile'
        },
        {
          title: '电子邮箱',
          dataIndex: 'email',
        },
        {
          title: '状态',
          dataIndex: 'verify',
          scopedSlots: { customRender: 'verify' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '250px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 获取员工申请列表
      loadData: parameter => {
        return getAccountApplyList(Object.assign(parameter, this.queryParam)).then(
          res => {
            return res
          }
        )
      },
    }
  },
  methods: {
    //获取公司信息
    loadCompany() {
      getCompany().then(res => { this.company = res.data })
    },
    //开启关闭员工审核
    setVerify(checked) {
      const obj =
      {
        is_verify: checked,
      }
      if (!checked) {
        this.$confirm({
          title: '警告',
          content: `关闭审核，员工将通过扫码直接加入公司，是否确定关闭？`,
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk: () => {
            this.updateCompanyVerify(obj)
          },
          onCancel() { }
        })
      } else {
        this.updateCompanyVerify(obj)
      }
    },
    updateCompanyVerify(obj) {
      updateVerify(obj).then(res => {
        if (res.succ) {
          this.company.is_account_verify = obj.is_verify
        } else {
          this.$message.error(`${obj.checked ? '开启' : '关闭'}失败,请稍后再试`)
        }
      })
    },
    //通过
    pass(record) {
      console.log(record)
    },
    //拒绝
    reject(record) { console.log(record) },
    //删除
    del(record) {
      console.log(record)
    }
  },
  created() {
    this.loadCompany()
  },
  filters: {
    stateFilter(type) {
      return verifyMap[type].text
    },
    stateTypeFilter(type) {
      return verifyMap[type].status
    }
  }
}
</script>
<style lang='less' scoped>
.title {
  color: rgba(0, 0, 0, 0.85);
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
}
</style>
