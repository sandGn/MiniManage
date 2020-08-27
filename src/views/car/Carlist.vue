<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="车辆名称">
              <a-input placeholder="请输入" v-model="queryParam.name" />
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <a-form-item label="车辆状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value>
                <a-select-option value>全部</a-select-option>
                <a-select-option value="0">在位</a-select-option>
                <a-select-option value="1">出车</a-select-option>
                <a-select-option value="2">保养</a-select-option>
                <a-select-option value="3">维修</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div>
      <a-button
        type="dashed"
        style="width: 100%;margin-bottom: 16px;"
        icon="plus"
        @click="showAddCarModal()"
      >添加</a-button>
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

      <span slot="state" slot-scope="text">
        <a-badge :status="text | stateTypeFilter" :text="text | stateFilter" />
      </span>

      <span slot="is_enable" slot-scope="text,record">
        <a-switch
          size="small"
          checkedChildren="是"
          unCheckedChildren="否"
          :checked="text"
          @change="checked => setCarEnable(checked,record)"
        />
      </span>

      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="delCar(record)">删除</a>
        </template>
      </span>
    </s-table>

    <!-- 添加车辆 -->
    <a-modal
      :width="640"
      :visible="visible"
      title="添加车辆"
      @ok="addCar"
      @cancel="visible = false"
      :confirmLoading="confirmLoading"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item label="车辆名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="['name', {rules:[{required: true, message: '请输入车辆名称'}]}]" />
          </a-form-item>
          <a-form-item label="车牌号码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              v-decorator="['license_plate', {rules:[{required: true, message: '请输入车辆车牌号码'}]}]"
            />
          </a-form-item>
          <a-form-item label="车牌颜色" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select v-decorator="['color', {rules:[{required: true, message: '请选择车牌颜色'}]}]">
              <a-select-option value="白色">白色</a-select-option>
              <a-select-option value="黑色">黑色</a-select-option>
              <a-select-option value="银色">银色</a-select-option>
              <a-select-option value="棕色">棕色</a-select-option>
              <a-select-option value="灰色">灰色</a-select-option>
              <a-select-option value="红色">红色</a-select-option>
              <a-select-option value="蓝色">蓝色</a-select-option>
              <a-select-option value="橙色">橙色</a-select-option>
            </a-select>
          </a-form-item>
          <!-- <a-form-item label="当前公里数" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input-number
              style="width:100%"
              :step="0.01"
              v-decorator="['kilometres', {rules:[{required: true, message: '请输入车辆当前的公里数'}]}]"
            />
          </a-form-item> -->
          <!-- <a-form-item label="油耗" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              suffix="L/100km"
              v-decorator="['gas_mileage', {rules:[{required: true, message: '请输入车辆每一千公里的油耗(单位升)'}]}]"
            />
          </a-form-item> -->
          <a-form-item label="年检到期时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-date-picker
              style="width: 100%"
              v-decorator="['yearcheck_duetime', {rules:[{required: true, message: '请选择年检到期时间'}]}]"
            />
          </a-form-item>
          <a-form-item label="保险到期时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-date-picker
              style="width: 100%"
              v-decorator="['insurance_duetime', {rules:[{required: true, message: '请选择保险到期时间'}]}]"
            />
          </a-form-item>

          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否启用">
            <a-switch
              checkedChildren="是"
              unCheckedChildren="否"
              v-decorator="['is_enable', {valuePropName: 'checked',initialValue: true}]"
            />
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </a-card>
</template>
<script>
import STable from '@/components/Table'
import { getCarList, updateCarEnable, deleteCar,insertCar } from '../../api/manage'
//车辆状态
const carStateMap = {
  0: {
    status: 'success',
    text: '在位'
  },
  1: {
    status: 'default',
    text: '出车'
  },
  2: {
    status: 'warning',
    text: '保养中'
  },
  3: {
    status: 'error',
    text: '维修中'
  }
}

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    STable
  },
  data() {
    return {
      // 查询参数
      queryParam: {},
      selectedRowKeys: [],

      // 表头
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '车辆名称',
          dataIndex: 'name'
        },
        {
          title: '车牌号',
          dataIndex: 'license_plate'
        },
        {
          title: '车辆颜色',
          dataIndex: 'color'
        },
        {
          title: '年检到期时间',
          dataIndex: 'yearcheck_duetime',
          sorter: true
        },
        {
          title: '保险到期',
          dataIndex: 'insurance_duetime',
          sorter: true
        },
        {
          title: '状态',
          dataIndex: 'state',
          scopedSlots: { customRender: 'state' }
        },
        {
          title: '是否启用',
          dataIndex: 'is_enable',
          scopedSlots: { customRender: 'is_enable' }
          //customRender: text => text ? '是' : '否'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],

      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getCarList(Object.assign(parameter, this.queryParam)).then(
          res => {
            return res
          }
        )
      },


      //弹窗
      form: this.$form.createForm(this),
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
    }
  },
  //过滤
  filters: {
    stateFilter(type) {
      return carStateMap[type].text
    },
    stateTypeFilter(type) {
      return carStateMap[type].status
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  methods: {
    //删除车辆
    delCar(record) {
      this.$confirm({
        title: '警告',
        content: `真的要删除 ${record.name} 吗?`,
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          deleteCar({ carid: record.id })
            .then(res => {
              if (res.succ) {
                this.$message.info(`${record.name} 删除成功`)
                this.$refs.table.refresh(true) //刷新table
              } else {
                this.$message.error(`${record.name} 删除失败,请稍后再试`)
              }
            })
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    },
    //启用禁用车辆
    setCarEnable(checked, event) {
      this.$confirm({
        title: '警告',
        content: `确定要 ${checked ? '开启' : '禁用'} ${event.name} 吗?`,
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          const obj =
          {
            enable: checked,
            carid: event.id
          }
          updateCarEnable(obj)
            .then(res => {
              if (res.succ) {
                this.$message.info(`${event.name} ${checked ? '开启' : '禁用'} 成功`)
                event.is_enable = checked
              } else {
                this.$message.error(`${event.name} ${checked ? '开启' : '禁用'}失败,请稍后再试`)
              }
              //this.$refs.table.refresh(true) //刷新table
            })
            .catch()
        },
        onCancel() {
        }
      })
    },
    //添加车辆弹窗
    showAddCarModal() {
      this.visible = true
    },
    //添加车辆
    addCar() {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          values['yearcheck_duetime'] = values['yearcheck_duetime'].format('YYYY-MM-DD HH:mm:ss')
          values['insurance_duetime'] = values['insurance_duetime'].format('YYYY-MM-DD HH:mm:ss')
          //console.log(values)
          insertCar(values)
            .then(res => {
              if (res.succ) {
                this.$refs.table.refresh(true) //刷新table                
              } else {
                this.$message.error(`添加失败,请稍后再试`)
              }
              this.visible = false
              this.confirmLoading = false
            })
            .catch(() => {
              this.visible = false
              this.confirmLoading = false
            })

        }
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
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