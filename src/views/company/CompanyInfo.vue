<!-- 企业信息 -->
<template>
  <div class="page-header-index-wide">
    <!-- 订购模块信息 -->
    <a-row :gutter="24">
      <!-- *****
          参数：
              模块名称          moudleName
              模块排序          sortNo
              模块主色系色值    color：rgb(x,x,x) rgb格式
              总数量           allCount 
              已用数量         useCount 
              可用数量         canCount 
              到期时间         endTime  
      ******-->
      <!-- 车辆模块 -->
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <div class="ant-upload-preview">
          <div class="mask">
            <a-button class="mask-btn" type="primary" size="large" style="width:150px">续费</a-button>
          </div>
          <!-- 卡片 -->
          <chart-card-index
            :loading="loading"
            title="车辆管理"
            :allCount="20"
            :useCount="18"
            :canCount="2"
          >
            <a-tooltip title="已使用数量" slot="action">
              <a-icon type="info-circle-o" />
            </a-tooltip>
            <div>
              <a-progress :percent="90" status="normal" strokeColor="rgb(159, 43, 178)" />
              <!-- <mini-progress color="rgb(159, 43, 178)" :target="50" :percentage="80" :height="8" /> -->
            </div>
            <template slot="footer">
              <span slot="term">到期时间：</span>
              <span style="color:#FF3C1A">2020-09-06 00:22:10</span>
            </template>
          </chart-card-index>
        </div>
      </a-col>

      <!-- 食堂模块 -->
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <div class="ant-upload-preview">
          <div class="mask">
            <a-button class="mask-btn" type="primary" size="large" style="width:150px">续费</a-button>
          </div>
          <!-- 卡片 -->
          <chart-card-index
            :loading="loading"
            title="食堂管理"
            :allCount="150"
            :useCount="120"
            :canCount="30"
          >
            <a-tooltip title="已使用数量" slot="action">
              <a-icon type="info-circle-o" />
            </a-tooltip>
            <div>
              <a-progress :percent="40" status="normal" strokeColor="rgb(243, 122, 29)" />
              <!-- <mini-progress color="rgb(243, 122, 29)" :target="50" :percentage="80" :height="8" /> -->
            </div>
            <template slot="footer">
              <span slot="term">到期时间：</span>
              <span style="color:#52C41A">2020-09-06 00:22:10</span>
            </template>
          </chart-card-index>
        </div>
      </a-col>

      <!-- 宿舍模块 -->
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <div class="ant-upload-preview">
          <div class="mask">
            <a-button class="mask-btn" type="primary" size="large" style="width:150px">续费</a-button>
          </div>
          <!-- 卡片 -->
          <chart-card-index
            :loading="loading"
            title="宿舍管理"
            :allCount="200"
            :useCount="130"
            :canCount="70"
          >
            <a-tooltip title="已使用数量" slot="action">
              <a-icon type="info-circle-o" />
            </a-tooltip>
            <div>
              <a-progress :percent="60" status="normal" strokeColor="rgb(135, 153, 163)" />
              <!-- <mini-progress color="rgb(135, 153, 163)" :target="50" :percentage="80" :height="8" /> -->
            </div>
            <template slot="footer">
              <span slot="term">到期时间：</span>
              <span style="color:#52C41A">2020-09-06 00:22:10</span>
            </template>
          </chart-card-index>
        </div>
      </a-col>
      <!-- 卫生模块 -->
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <div class="ant-upload-preview">
          <div class="mask">
            <a-button class="mask-btn" type="primary" size="large" style="width:150px">续费</a-button>
          </div>
          <!-- 卡片 -->
          <chart-card-index
            :loading="loading"
            title="卫生管理"
            :allCount="100"
            :useCount="20"
            :canCount="80"
          >
            <a-tooltip title="已使用数量" slot="action">
              <a-icon type="info-circle-o" />
            </a-tooltip>
            <div>
              <a-progress :percent="90" status="normal" strokeColor="rgb(141, 198, 63)" />
              <!-- <mini-progress color="rgb(141, 198, 63)" :target="50" :percentage="80" :height="8" /> -->
            </div>
            <template slot="footer">
              <span slot="term">到期时间：</span>
              <span style="color:#52C41A">2020-09-06 00:22:10</span>
            </template>
          </chart-card-index>
        </div>
      </a-col>
    </a-row>
    <a-card :bordered="false">
      <!-- 企业基本信息 -->
      <detail-list title="基本信息">
        <a-button type="primary" slot="btnslot" @click="handleEdit()">完善</a-button>
        <detail-list-item term="企业名称(全称)">{{companyInfo.companyName?companyInfo.companyName:'未填'}}</detail-list-item>
        <detail-list-item term="联系电话">{{companyInfo.contactNumber?companyInfo.contactNumber:'未填'}}</detail-list-item>
        <detail-list-item
          term="所在地区"
        >{{companyInfo.areaCode?this.getPcaText(companyInfo.areaCode):'未填'}}</detail-list-item>
        <detail-list-item term="地址">{{companyInfo.address?companyInfo.address:'未填'}}</detail-list-item>
      </detail-list>
      <detail-list>
        <detail-list-item
          term="企业简介"
          style="width:100%"
        >{{companyInfo.introduction?companyInfo.introduction:'未填'}}</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px" />
      <!-- 企业概况 -->
      <detail-list title="企业概况">
        <detail-list-item term="企业规模">{{companyInfo.scale|scaleFilter}}</detail-list-item>
        <detail-list-item term="企业性质">{{companyInfo.nature|natureFilter}}</detail-list-item>
        <detail-list-item term="员工人数">{{companyInfo.accountRange|accountRangeFilter}}</detail-list-item>
      </detail-list>
      <detail-list>
        <detail-list-item
          term="经营范围"
          style="width:100%"
        >{{companyInfo.businessScope?companyInfo.businessScope:'未填'}}</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px" />
      <detail-list title="认证信息">
        <detail-list-item term="姓名">{{companyInfo.legalPersonName?companyInfo.legalPersonName:'未填'}}</detail-list-item>
        <detail-list-item term="性别">{{companyInfo.legalPersonName?companyInfo.legalPersonName:'未填'}}</detail-list-item>
        <detail-list-item
          term="身份证"
        >{{companyInfo.legalPersonIdCard?companyInfo.legalPersonIdCard:'未填'}}</detail-list-item>
      </detail-list>
      <detail-list>
        <detail-list-item term="协议与营业执照">
          <template v-if="protocolAttachmentlist.length>0">
            <div style="display:inline-flex;vertical-align:middle">
              <template v-for="(item, index) in protocolAttachmentlist">
                <img
                  :src="item"
                  style="width:150px;height:150px;display:flex;margin-left:30px"
                  :key="index"
                />
              </template>
            </div>
          </template>
          <template v-else>未上传</template>
        </detail-list-item>
      </detail-list>
    </a-card>

    <!-- Info区域-end -->
    <modal-company-info ref="modalForm"></modal-company-info>
  </div>
</template>
<script>

import { DetailMixin } from '../../mixins/DetailMixin'

import Vue from 'vue'
import { COMPANY_INFO } from '../../store/mutation-types'
import ChartCardIndex from '../../components/Card/ChartCardIndex'
//import MiniProgress from '../../components/Charts/MiniProgress'
import DetailList from '../../components/tools/DetailList'
const DetailListItem = DetailList.Item

import ModalCompanyInfo from './modules/ModalCompanyInfo'
export default {
  name: 'CompanyInfo',
  mixins: [DetailMixin],
  components: { DetailList, DetailListItem, ChartCardIndex, ModalCompanyInfo },
  data() {
    return {
      loading: true,
      protocolAttachmentlist: [], //营业执照
      companyInfo: [],
    }
  },
  created() {
    //获取订购信息
    setTimeout(() => {
      this.loading = !this.loading
    }, 500)

    //企业信息
    let companyList = Vue.ls.get(COMPANY_INFO)
    if (companyList) {
      if (companyList.length > 0) {
        companyList.forEach(item => {
          if (item.isDefault == 1) {
            this.companyInfo = item
            return
          }
        })
      } else {
        this.companyInfo = companyList
      }
    }
    //执照
    this.protocolAttachmentlist = this.companyInfo.protocolAttachment ? this.companyInfo.protocolAttachment.split(';') : []

  },
  filters: {
    //区域信息
    // areaFilter(value) {
    //   return this.getPcaText(value)
    // },
    //企业规模
    scaleFilter(value) {
      let result = '未填'
      switch (value) {
        case 1:
          result = '小型'
          break
        case 2:
          result = '微型'
          break
        case 3:
          result = '中型'
          break
        case 4:
          result = '大型'
          break
        case 5:
          result = '特大型'
          break
      }
      return result
    },
    //企业性质
    natureFilter(value) {
      let result = '未填'
      switch (value) {
        case 1:
          result = '私营企业'
          break
        case 2:
          result = '股份有限公司'
          break
        case 3:
          result = '股份合作制企业'
          break
        case 4:
          result = '有限责任公司'
          break
        case 5:
          result = '个体户'
          break
        case 6:
          result = '外资企业'
          break
        case 7:
          result = '国有企业'
          break
        case 8:
          result = '集体企业'
          break
        case 9:
          result = '合伙企业'
          break
        case 10:
          result = '联营企业'
          break
      }
      return result
    },
    //员工人数
    accountRangeFilter(value) {
      let result = '未填'
      switch (value) {
        case 1:
          result = '0-20人'
          break
        case 2:
          result = '20-99人'
          break
        case 3:
          result = '100-499人'
          break
        case 4:
          result = '500-1000人'
          break
        case 5:
          result = '1000人以上'
          break
      }
      return result
    },
  },
  methods: {
    //完善/编辑
    handleEdit() {
      this.$refs.modalForm.edit(this.companyInfo)
      this.$refs.modalForm.modalSet.title = '编辑'
    }
  }
}
</script>
<style lang="less" scoped>
.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  //max-width: 180px;
  //border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  // .upload-icon {
  //   position: absolute;
  //   top: 0;
  //   right: 10px;
  //   font-size: 1.4rem;
  //   padding: 0.5rem;
  //   background: rgba(222, 221, 221, 0.7);
  //   border-radius: 50%;
  //   border: 1px solid rgba(0, 0, 0, 0.2);
  // }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: opacity 0.4s;
    z-index: 999;

    &:hover {
      opacity: 1;
    }

    .mask-btn {
      //font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -75px;
      margin-top: -1rem;
      //color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    //max-width: 180px;
    height: 100%;
    //border-radius: 50%;
    overflow: hidden;
  }
}
</style>