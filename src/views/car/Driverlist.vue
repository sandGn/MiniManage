<!-- 司机列表 -->
<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="8">
          <a-col :lg="6" :sm="12">
            <a-form-item label="司机名称">
              <a-input
                autocomplete="off"
                placeholder="请输入司机名称/车牌号搜索"
                v-model="queryParam.searchKey"
              />
            </a-form-item>
          </a-col>

          <!-- 查询、重置 -->
          <a-col :lg="4" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery">查询</a-button>
              <a-button style="margin-left: 8px" @click="searchReset">重置</a-button>
              <!-- <a-button type="primary" style="margin-left: 8px" @click="handleAdd">新增</a-button> -->
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
        <!-- 操作 -->
        <span slot="action" slot-scope="text,record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="handleDelete(record)">删除</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <drawer-driver ref="modalForm" @ok="modalFormOk"></drawer-driver>

    <!-- <a-form-item label="准驾车辆" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select
              style="width: 100%"
              mode="multiple"
              :allowClear="true"
              v-decorator="['license_type', {rules:[{required: true, message: '请选择准驾车辆'}]}]"
            >
              <a-select-option value="C1">C1</a-select-option>
              <a-select-option value="C2">C2</a-select-option>
              <a-select-option value="A1">A1</a-select-option>
              <a-select-option value="A2">A2</a-select-option>
              <a-select-option value="A3">A3</a-select-option>
              <a-select-option value="B1">B1</a-select-option>
              <a-select-option value="B2">B2</a-select-option>
              <a-select-option value="C3">C3</a-select-option>
              <a-select-option value="C4">C4</a-select-option>
              <a-select-option value="D">D</a-select-option>
              <a-select-option value="E">E</a-select-option>
              <a-select-option value="F">F</a-select-option>
              <a-select-option value="M">M</a-select-option>
              <a-select-option value="N">N</a-select-option>
              <a-select-option value="P">P</a-select-option>
            </a-select>
    </a-form-item>-->
  </a-card>
</template>

<script>
import DrawerDriver from './modules/DrawerDriver'
import { ListMixin } from '../../mixins/ListMixin'
export default {
  name: 'DriverList',
  mixins: [ListMixin],
  components: {
    DrawerDriver
  },
  data() {
    return {
      //表头
      columns: [
        {
          title: '编号',
          scopedSlots: { customRender: 'serialslot' },
          align: 'center',
        },
        {
          title: '员工姓名',
          dataIndex: 'realName',
          align: 'center',
        },
        {
          title: '准驾车辆',
          dataIndex: 'licenseType',
          align: 'center',
        },
        {
          title: '是否有效',
          dataIndex: 'isValid',
          customRender: text => text ? '是' : '否',
          align: 'center',
        },
        {
          title: '添加时间',
          dataIndex: 'createTime',
          align: 'center',
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime',
          align: 'center',
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' },
          align: 'center',
        }
      ],
      url: {
        list: '/car/drivers',
      }
    }
  },
  methods: {

  }
}
</script>