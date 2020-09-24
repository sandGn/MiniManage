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

        <!-- 教程进度条 -->
        <div style="width:100%;height:500px;margin-top:20px;border: 1px solid #e8e8e8;">
          <!-- <div class="ant-steps ant-steps-vertical">
            <div class="ant-steps-item-container">
              <div class="ant-steps-item-tail">
                <div class="ant-steps-item-icon">
                  <span class="ant-steps-icon">1</span>
                </div>
              </div>
            </div>
          </div> -->

          <a-steps direction="vertical">
            <a-step title="添加司机" description="This is a description." />123
            <a-step title="添加车辆" description="This is a description." />
            <a-step title="设置信息" description="This is a description." />
          </a-steps>
        </div>
        <!-- <div
          style="width:100%;height:500px;margin-top:20px;border: 1px solid #e8e8e8;text-align:center"
        >
          <a-steps class="steps" direction="vertical">
            <a-step title="分配司机" />
            <a-step title="添加车辆" />
          </a-steps>
        </div>-->
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

    <!-- Info区域-end -->
  </div>
</template>
<script>

import { DetailMixin } from '../mixins/DetailMixin'

//import Vue from 'vue'
//import { COMPANY_INFO } from '../store/mutation-types'
import ChartCardIndex from '../components/Card/ChartCardIndex'
//import MiniProgress from '../../components/Charts/MiniProgress'
// import DetailList from '../components/tools/DetailList'
// const DetailListItem = DetailList.Item

//import ModalCompanyInfo from './company/modules/ModalCompanyInfo'
export default {
  name: 'index',
  mixins: [DetailMixin],
  components: { ChartCardIndex, },
  data() {
    return {
      loading: true,
      companyInfo: [],
    }
  },
  created() {
    //获取订购信息
    setTimeout(() => {
      this.loading = !this.loading
    }, 500)


  },
  filters: {
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  box-shadow: 0 0 4px #ccc;
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

/*步骤条 */
// .ant-steps {
//   margin-top: 20px;
//   display: block;
// }
</style>