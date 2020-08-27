<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper"></div>

    <div>
      <a-button
        type="dashed"
        style="width: 100%;margin-bottom: 16px;"
        icon="plus"
        @click="showAddRoleModal()"
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
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="delRole(record)">删除</a>
        </template>
      </span>
    </s-table>

    <a-modal
      :width="950"
      :visible="visible"
      title="添加角色"
      @ok="addRole"
      @cancel="visible = false"
      :confirmLoading="confirmLoading"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item label="角色名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="['name', {rules:[{required: true, message: '角色名称'}]}]" />
          </a-form-item>

          <a-form-item label="自定义编号" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input-number
              style="width:100%"
              v-decorator="['custom_id', {rules:[{required: true, message: '自定义编号'}]}]"
            />
          </a-form-item>
          <a-form-item label="排序" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input-number
              style="width:100%"
              v-decorator="['order_num', {rules:[{required: true, message: '排序'}]}]"
            />
          </a-form-item>

          <a-form-item label="角色权限">
            <a-row :gutter="16" v-for="(permission, index) in permissions" :key="index">
              <a-col :xl="4" :lg="24">{{ permission.name }}：</a-col>
              <a-col :xl="20" :lg="24">
                <a-checkbox
                  v-if="permission.actionsOptions.length > 0"
                  :indeterminate="permission.indeterminate"
                  :checked="permission.checkedAll"
                  @change="onChangeCheckAll($event, permission)"
                >全选</a-checkbox>

                <a-checkbox-group
                  :options="permission.actionsOptions"
                  v-model="permission.selected"
                  @change="onChangeCheck(permission)"
                />
              </a-col>
            </a-row>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </a-card>
</template>

<script>
import STable from '@/components/Table'
import { getRoleList, deleteRole, insertRole, getPermissions } from '../../api/manage'

export default {
  components: {
    STable
  },
  data() {
    return {
      //表头
      columns: [
        {
          title: '序号',
          dataIndex: 'id'
        },
        {
          title: '角色名称',
          dataIndex: 'name'
        },
        {
          title: '自定义编号',
          dataIndex: 'custom_id'
        },
        {
          title: '排序',
          dataIndex: 'order_num'
        },
        {
          title: '添加时间',
          dataIndex: 'create_time'
        },
        {
          title: '更新时间',
          dataIndex: 'update_time'
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
        //console.log('loadData.parameter', parameter)
        return getRoleList(Object.assign(parameter, this.queryParam)).then(
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
      permissions: [],
    }
  },
  created() {
    this.loadPermissions()
  },
  methods: {
    //删除角色
    delRole(record) {
      this.$confirm({
        title: '警告',
        content: `真的要删除 ${record.name} 吗?`,
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          deleteRole({ driverid: record.id })
            .then(res => {
              //debugger
              if (res.succ) {
                this.$message.info(`角色 ${record.name} 删除成功`)
                this.$refs.table.refresh(true) //刷新table
              } else {
                this.$message.error(`${record.name} 删除失败,请稍后再试`)
              }
              this.confirmLoading = false
            })
            .catch(() => {
              this.confirmLoading = false
            })
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    },

    //添加角色弹窗
    showAddRoleModal() {
      this.visible = true
    },
    //添加角色
    addRole() {
      const { form: { validateFields } } = this
      this.confirmLoading = true

      // 遍历权限，获取选中
      let permissionsSelected = []
      this.permissions.forEach(permission => {
        permissionsSelected = permissionsSelected.concat(permission.selected)
      })
      //去重
      permissionsSelected = Array.from(new Set(permissionsSelected))
      console.log(permissionsSelected)


      validateFields((errors, values) => {
        console.log(values)
        values.permission_ids = permissionsSelected
        console.log(values)
        if (!errors) {
          insertRole(values).then(res => {
            //debugger
            if (res.succ) {
              this.$refs.table.refresh(true) //刷新table
            } else {
              this.$message.error(`添加失败,请稍后再试`)
            }
            this.visible = false
            this.confirmLoading = false
          }).catch(() => {
            this.visible = false
            this.confirmLoading = false
          })
        }
      })
    },
    //获取权限
    loadPermissions() {
      getPermissions().then(res => {
        const result = res.data
        //debugger
        this.permissions = result.map(permission => {
          const options = JSON.parse(permission.actionData)
          permission.checkedAll = false
          permission.selected = []
          permission.indeterminate = false
          permission.actionsOptions = options.map(option => {
            return {
              label: option.name,
              value: option.id
            }
          })
          return permission
        })
      })
    },
    //单个勾选权限
    onChangeCheck(permission) {
      //debugger
      permission.indeterminate = !!permission.selected.length && (permission.selected.length < permission.actionsOptions.length)
      permission.checkedAll = permission.selected.length === permission.actionsOptions.length
    },
    //全选权限
    onChangeCheckAll(e, permission) {
      Object.assign(permission, {
        selected: e.target.checked ? permission.actionsOptions.map(obj => obj.value) : [],
        indeterminate: false,
        checkedAll: e.target.checked
      })
    },
  }
}
</script>