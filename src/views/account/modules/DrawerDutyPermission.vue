<!-- 岗位授权 -->
<template>
  <s-drawer
    :title="modalSet.title"
    :visible.sync="modalSet.visible"
    :width="modalSet.width"
    :fullscreen.sync="modalSet.fullscreen"
    :switchFullscreen="modalSet.switchFullscreen"
  >
    <a-form>
      <!-- 所拥有的权限 -->
      <a-form-item label="所拥有的权限">
        <a-tree
          checkable
          @check="onCheck"
          :checkedKeys="checkedKeys"
          :treeData="treeData"
          @expand="onExpand"
          @select="onTreeNodeSelect"
          :selectedKeys="selectedKeys"
          :expandedKeys="expandedKeysss"
          :checkStrictly="checkStrictly"
        >
          <span slot="hasDatarule" slot-scope="{slotTitle,ruleFlag}">
            {{ slotTitle }}
            <a-icon v-if="ruleFlag" type="align-left" style="margin-left:5px;color: red;"></a-icon>
          </span>
        </a-tree>
        <!-- 操作按钮 -->
        <a-row :style="{textAlign:'center'}">
          <a-button :style="{marginRight: '8px'}" type="primary" @click="handleOk">提交</a-button>
          <a-button @click="handleCancel">取消</a-button>
        </a-row>
      </a-form-item>
    </a-form>
  </s-drawer>
</template>
<script>

import SDrawer from '../../../components/SDrawer/index'
// import { validateNumber } from '../../../utils/validatehelp'
// import { COMPANY_INFO } from '../../../store/mutation-types'
//import Vue from 'vue'
import { getAction } from '../../../api'
export default {
  name: 'DrawerDutyPermission',
  mixins: [],
  components: {
    SDrawer
  },
  data() {
    return {
      //弹窗窗口设置
      modalSet: {
        title: '岗位权限配置',
        visible: false,
        width: 650,
      },


      accountRoleId: '', //员工岗位编号
      treeData: [],
      checkedKeys: [],
      expandedKeysss: [],   //展开指定的树节点
      allTreeKeys: [],      //所有树节点ID
      autoExpandParent: true,
      checkStrictly: false,  //父子节点选中状态不再关联
      selectedKeys: [],

      concatTreeData: [],  //提交



      //api 请求参数
      url: {
        moduleTree: '/account/accountmoduletree',  //用户权限树
        add: '/account/accountroles',
      },
    }
  },
  created() { },
  watch: {
    'modalSet.visible': {
      handler() {
        if (this.modalSet.visible) {
          this.loadData()
        }
      },
      deep: true,
      immediate: false //首次是否监听
    }
  },
  methods: {
    //加载数据
    loadData() {
      getAction(this.url.moduleTree).then((res) => {
        const accessedRouters = this.formatTreeDate(res.data.treeList)
        this.treeData = accessedRouters
        this.expandedKeysss = this.allTreeKeys
      })
    },
    //格式后端返回树结构
    formatTreeDate(data) {
      const accessedRouters = data.filter(item => {
        if (item.children && item.children.length) {
          item.children = this.formatTreeDate(item.children)
        }
        item.title = item.moduleName
        item.key = item.id
        this.allTreeKeys.push(item.id)
        return true
      })
      return accessedRouters
    },
    //显示弹窗
    show(accountRoleId) {
      this.accountRoleId = accountRoleId
      this.modalSet.visible = true
    },
    //点击树节点
    onTreeNodeSelect(id) {
      console.log('点击树节点', id)
      if (id && id.length > 0) {
        this.selectedKeys = id
      }
      console.log('选中节点', this.selectedKeys)
    },
    //选择复选框
    onCheck(o, e) {
      if (this.checkStrictly) {
        this.checkedKeys = o.checked
      } else {
        this.checkedKeys = o
        this.concatTreeData = this.checkedKeys.concat(e.halfCheckedKeys)
      }
    },
    //展开/收起节点
    onExpand(expandedKeys) {
      this.expandedKeysss = expandedKeys
      this.autoExpandParent = false
    },


    handleCancel() {
      this.close()
    },
    close() {
      this.reset()
      this.$emit('close')
      this.modalSet.visible = false
    },
    //重置数据
    reset() {
      this.expandedKeysss = []
      this.checkedKeys = []
      this.defaultCheckedKeys = []
    },
    //提交
    handleOk() {
      console.log(this.concatTreeData)
    },

  },
}
</script>
<style lang="less" scoped>
</style>