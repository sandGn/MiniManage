/*
 * 详情混入
 */
import Area from '../components/Area/Area'

export const DetailMixin = {
  data() {
    return {
      areaData: ''
    }
  },
  created() {
    this.areaData = new Area()
  },
  methods: {
    // 获取省市区文本
    getPcaText(code) {
      return this.areaData.getText(code)
    },
    //获取省市区代码
    getPcaCode(text) {
      return this.areaData.getCode(text)
    },
    //获取省市区代码
    getPcaRealCode(code) {
      return this.areaData.getRealCode(code)
    }
  }
}