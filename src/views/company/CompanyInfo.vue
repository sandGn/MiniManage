<!-- 企业信息 -->
<template>
  <div class="page-header-index-wide">
    <!-- 订购模块信息 -->
    <a-row :gutter="24">
      <!-- *****
          参数：
              模块排序
              模块主色系色值 rgb格式
      ******-->
      <!-- 车辆模块 -->
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card-index :loading="loading" title="车辆管理" :allCount=20 :useCount=18 :canCount=2>
          <a-tooltip title="已使用数量" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-progress color="rgb(159, 43, 178)" :target=50 :percentage=80 :height=8 />
          </div>
          <template slot="footer">
            <span slot="term">到期时间：</span>
            <span style="color:#FF3C1A">2020-09-06 00:22:10</span>
          </template>
        </chart-card-index>
      </a-col>
      <!-- 食堂模块 -->
      <!-- <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card-index :loading="loading" title="食堂管理" allCount="150" useCount="120" canCount="30">
          <a-tooltip title="已使用数量" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-progress color="rgb(243, 122, 29)" target="50" percentage="80" height="8" />
          </div>
          <template slot="footer">
            <span slot="term">到期时间：</span>
            <span style="color:#52C41A">2020-09-06 00:22:10</span>
          </template>
        </chart-card-index>
      </a-col> -->
      <!-- 宿舍模块 -->
      <!-- <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card-index :loading="loading" title="宿舍管理" allCount="200" useCount="130" canCount="70">
          <a-tooltip title="已使用数量" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-progress color="rgb(135, 153, 163)" :target="50" :percentage="80" :height="8" />
          </div>
          <template slot="footer">
            <span slot="term">到期时间：</span>
            <span style="color:#52C41A">2020-09-06 00:22:10</span>
          </template>
        </chart-card-index>
      </a-col> -->
      <!-- 卫生模块 -->
      <!-- <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card-index :loading="loading" title="卫生管理" allCount="100" useCount="20" canCount="80">
          <a-tooltip title="已使用数量" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-progress color="rgb(141, 198, 63)" :target="50" :percentage="80" :height="8" />
          </div>
          <template slot="footer">
            <span slot="term">到期时间：</span>
            <span style="color:#52C41A">2020-09-06 00:22:10</span>
          </template>
        </chart-card-index>
      </a-col> -->
    </a-row>
    <a-card :bordered="false">
      <!-- 企业基本信息 -->
      <detail-list title="基本信息">
        <detail-list-item term="企业名称(全称)">九州易行科技有限公司</detail-list-item>
        <detail-list-item term="联系电话">15119990718</detail-list-item>
        <detail-list-item term="所在地区">广东省 汕头市 龙湖区</detail-list-item>
        <detail-list-item term="地址">嵩山路118号潮人创意园A栋718室内</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px" />
      <!-- 数据信息 -->
      <!-- <detail-list title="数据信息">
      <detail-list-item term="企业规模"></detail-list-item>
      </detail-list>-->
    </a-card>
  </div>
</template>
<script>
import ChartCardIndex from '../../components/Card/ChartCardIndex'
import MiniProgress from '../../components/Charts/MiniProgress'
import DetailList from '../../components/tools/DetailList'
const DetailListItem = DetailList.Item
export default {
  name: 'CompanyInfo',
  components: { DetailList, DetailListItem, ChartCardIndex, MiniProgress },
  data() {
    return {
      loading: true,
    }
  },
  created() {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
</style>