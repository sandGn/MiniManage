<!-- 车辆列表 -->
<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="8">
          <a-col :lg="6" :sm="12">
            <a-form-item label="车辆名称">
              <a-input
                autocomplete="off"
                placeholder="请输入车辆名称/车牌号搜索"
                v-model="queryParam.searchKey"
              />
            </a-form-item>
          </a-col>

          <!-- 车辆状态 -->
          <a-col :lg="4" :sm="12">
            <a-form-item label="车辆状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value>
                <a-select-option value>全部</a-select-option>
                <a-select-option value="1">在位</a-select-option>
                <a-select-option value="2">出车</a-select-option>
                <a-select-option value="3">保养</a-select-option>
                <a-select-option value="4">维修</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- 查询、重置 -->
          <a-col :lg="4" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery">查询</a-button>
              <a-button style="margin-left: 8px" @click="searchReset">重置</a-button>
              <a-button type="primary" style="margin-left: 8px" @click="handleAdd">新增</a-button>
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
        <!-- 车辆图片 -->
        <template slot="carImgUrlslot" slot-scope="text, record">
          <div class="anty-img-wrap">
            <a-avatar shape="square" :src="record.carImgUrl" icon="user" />
          </div>
        </template>
        <!-- 车辆颜色 -->
        <template slot="colorslot" slot-scope="text">
          <span class="vue-color-span" :style="{background:text}"></span>
          <!-- <a-badge :status="text | stateTypeFilter" :text="text | stateFilter" /> -->
        </template>
        <!-- 车辆状态 -->
        <span slot="statusslot" slot-scope="text">
          <a-badge :status="text | stateTypeFilter" :text="text | stateFilter" />
        </span>
        <!-- 启用禁用 -->
        <template slot="isenableslot" slot-scope="text,record">
          <a-switch
            size="small"
            checkedChildren="是"
            unCheckedChildren="否"
            :checked="text===0?false:true"
            @change="handleEnable(record)"
          />
        </template>
        <!-- 操作 -->
        <span slot="action" slot-scope="text,record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="handleDelete(record)">删除</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <drawer-car ref="modalForm" @ok="modalFormOk"></drawer-car>
  </a-card>
</template>
<script>
import DrawerCar from './modules/DrawerCar'
import { ListMixin } from '../../mixins/ListMixin'
//车辆状态
const carStateMap = {
  1: {
    status: 'success',
    text: '在位'
  },
  2: {
    status: 'default',
    text: '出车'
  },
  3: {
    status: 'warning',
    text: '保养中'
  },
  4: {
    status: 'error',
    text: '维修中'
  }
}

export default {
  //import引入的组件需要注入到对象中才能使用
  name: 'CarList',
  mixins: [ListMixin],
  components: { DrawerCar },
  data() {
    return {

      // 表头
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serialslot' },
          align: 'center',
        },
        {
          title: '车辆图片',
          scopedSlots: { customRender: 'carImgUrlslot' },
          align: 'center',
        },
        {
          title: '车辆名称',
          dataIndex: 'carName',
          align: 'center',
        },
        {
          title: '车牌号',
          dataIndex: 'licensePlate',
          align: 'center',
        },
        {
          title: '车辆颜色',
          dataIndex: 'color',
          scopedSlots: { customRender: 'colorslot' },
          align: 'center',
        },
        {
          title: '年检到期时间',
          dataIndex: 'yearcheckDueDate',
          sorter: true,
          align: 'center',
        },
        {
          title: '保险到期',
          dataIndex: 'insuranceDueDate',
          sorter: true,
          align: 'center',
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'statusslot' },
          align: 'center',
        },
        {
          title: '是否启用',
          dataIndex: 'isEnable',
          scopedSlots: { customRender: 'isenableslot' },
          align: 'center',
          //customRender: text => text ? '是' : '否'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center',
        }
      ],
      //api 请求参数
      url: {
        list: '/car/cars',
      }
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
    //新增
    handleAdd() {
      //console.log(this.ipagination.total)
      let total = 5
      if (total < 3)
        this.$message.info(`无法新增，请续费`)
      else {
        this.$refs.modalForm.add()
        this.$refs.modalForm.title = '新增'
        this.$refs.modalForm.disableSubmit = false
      }
    }
    //删除车辆
    // delCar(record) {
    //   this.$confirm({
    //     title: '警告',
    //     content: `真的要删除 ${record.name} 吗?`,
    //     okText: '删除',
    //     okType: 'danger',
    //     cancelText: '取消',
    //     onOk: () => {
    //       deleteCar({ carid: record.id })
    //         .then(res => {
    //           if (res.succ) {
    //             this.$message.info(`${record.name} 删除成功`)
    //             this.$refs.table.refresh(true) //刷新table
    //           } else {
    //             this.$message.error(`${record.name} 删除失败,请稍后再试`)
    //           }
    //         })
    //     },
    //     onCancel() {
    //       console.log('Cancel')
    //     }
    //   })
    // },
    //启用禁用车辆
    // setCarEnable(checked, event) {
    //   this.$confirm({
    //     title: '警告',
    //     content: `确定要 ${checked ? '开启' : '禁用'} ${event.name} 吗?`,
    //     okText: '确定',
    //     okType: 'danger',
    //     cancelText: '取消',
    //     onOk: () => {
    //       const obj =
    //       {
    //         enable: checked,
    //         carid: event.id
    //       }
    //       updateCarEnable(obj)
    //         .then(res => {
    //           if (res.succ) {
    //             this.$message.info(`${event.name} ${checked ? '开启' : '禁用'} 成功`)
    //             event.is_enable = checked
    //           } else {
    //             this.$message.error(`${event.name} ${checked ? '开启' : '禁用'}失败,请稍后再试`)
    //           }
    //           //this.$refs.table.refresh(true) //刷新table
    //         })
    //         .catch()
    //     },
    //     onCancel() {
    //     }
    //   })
    // },
    //添加车辆弹窗
    // showAddCarModal() {
    //   this.visible = true
    // },
    //添加车辆
    // addCar() {
    //   const { form: { validateFields } } = this
    //   this.confirmLoading = true
    //   validateFields((errors, values) => {
    //     if (!errors) {
    //       values['yearcheck_duetime'] = values['yearcheck_duetime'].format('YYYY-MM-DD HH:mm:ss')
    //       values['insurance_duetime'] = values['insurance_duetime'].format('YYYY-MM-DD HH:mm:ss')
    //       //console.log(values)
    //       insertCar(values)
    //         .then(res => {
    //           if (res.succ) {
    //             this.$refs.table.refresh(true) //刷新table                
    //           } else {
    //             this.$message.error(`添加失败,请稍后再试`)
    //           }
    //           this.visible = false
    //           this.confirmLoading = false
    //         })
    //         .catch(() => {
    //           this.visible = false
    //           this.confirmLoading = false
    //         })

    //     }
    //   })
    // }
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
.vue-color-span {
  background: rgb(0, 102, 153);
  display: inline-block;
  border: 1px solid #666;
  width: 55px;
  height: 20px;
  border-radius: 5px;
}
</style>