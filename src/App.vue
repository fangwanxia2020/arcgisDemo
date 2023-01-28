<template>
  <div>
    <!-- 工具条组件 -->
    <tool-bar
      @setMeasurement="setMeasurement"
      @setHeatmap="setHeatmap"
      @baseMapChange="baseMapChange"
      @openWindow="openWindow"
      @setDrop="setDrop"
      @setDropByself="setDropByself"
    ></tool-bar>
    <!--  搜索组件 -->
    <search-input @searchVal="searchVal" />
    <div id="viewDiv">
      <info-windows
        id="infowin"
        :infoWindow="infoWindow"
        ref="infoWindows"
        v-show="isWindowShow"
      />
    </div>
  </div>
</template>

<script>
import data from './assets/data'
import ToolBar from '@/components/ToolBar.vue'
import SearchInput from '@/components/SearchInput.vue'
import ArcGIS from '@/map/index.js'
import { epsg4545_To_wgs84 ,epsg3857_To_epsg4545,gcj02towgs84,wgs84_To_epsg4545} from './utils/index'

const Map = new ArcGIS()
import infoWindows from './info-windows'
const info = {
  name: '1号仓库',
  namePath: [108.643314, 21.96885],
  path: [
    [108.642955, 21.968279],
    [108.64303, 21.968299],
    [108.643368, 21.968249],
    [108.643443, 21.968259],
    [108.643507, 21.968344],
    [108.643529, 21.968523],
    [108.643593, 21.968797],
    [108.643657, 21.96906],
    [108.643164, 21.969145],
    [108.64304, 21.968861],
    [108.642922, 21.968687],
    [108.642767, 21.968498],
    [108.642686, 21.968419],
    [108.642676, 21.968319],
    [108.642729, 21.968264],
    [108.642831, 21.968274],
    [108.642944, 21.968269],
  ], // 仓库 经纬度
  goodsVoList: [
    {
      typeName: '危化品仓库',
      typeCode: 'whpck',
      name: 'g-a甲烷',
      id: '1',
      count: '26',
      unit: 'm³',
    },
    {
      typeName: '危化学种类',
      typeCode: 'whpzl',
      name: 'g-a乙醇',
      id: '2',
      count: '600.36',
      unit: '升',
    },
    {
      typeName: '危化学种类',
      typeCode: 'whpzl',
      name: 'g-a丙醇',
      id: '2',
      count: '600.36',
      unit: '升',
    },
  ],
  classifyVo: [{ name: '危化学种类：', count: 20, unit: '吨' }],
}

export default {
  name: 'MapDemo',
  components: {
    ToolBar,
    SearchInput,
    infoWindows,
  },
  data() {
    return {
      map: null,
      view: null,
      heatMapType: 0,
      infoType: 0,
      drawType: 0,
      MeasurementType: 0,
      isWindowShow: false,
      infoWindow: {},
      winActive: null,
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      Map.init('viewDiv').then((res) => {
        this.map = res.map
        this.view = res.view
      })
    },
    //窗体
    openWindow(type) {
      if (type == this.infoType) return
      this.infoWin(type)
      this.infoType = type
    },
    // 底图切换
    baseMapChange(type) {
      console.log('地图切换', type)
      Map.baseMapChange(type)
    },
    // 绘制热力图
    setHeatmap(type) {
      if (type == this.heatMapType) return
      //判断浏览区是否支持canvas
      let elem = document.createElement('canvas')
      let isSupportCanvas = !!(elem.getContext && elem.getContext('2d'))
      if (!isSupportCanvas) {
        return alert(
          '热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试~'
        )
      }
      Map.Heatmap(type, data.heatmapData)
      this.heatMapType = type
    },
    // 测量
    setMeasurement(type) {
      if (type == this.MeasurementType) return
      Map.Measuremen(type)
      this.MeasurementType = type
      console.log('测量', type)
    },

    // 标绘
    setDrop(type) {
      if (type == this.drawType) return
      Map.drawActive(type)
      this.drawType = type
      console.log('标绘', type)
    },
    setDropByself(type) {
      if (type == 'clear') {
        this.view.graphics.removeAll()
      } else {
        Map.drawActiveByself(type)
        console.log('手动标绘', type)
      }
    },
    //信息窗体
    infoWin(type) {
      if (type == 0) {
        this.winActive.remove()
        this.closeInfoWin()
      } else {
        this.infoWindow = info
        this.winActive = this.view.on('click', (e) => {
          const maopoint = e.mapPoint
          const newPonit = this.view.toScreen({
            x: maopoint.x,
            y: maopoint.y,
            spatialReference: {
              wkid: 4545,
            },
          })
          this.showinfowindow(newPonit.x, newPonit.y)
          this.isWindowShow = true
        })
      }
    },
    showinfowindow(x, y) {
      console.log(x, y)
      const infowin = document.getElementById('infowin')
      infowin.style.display = 'block'
      infowin.style.left = x - 280 / 2 + 'px'
      infowin.style.top = y - 160 + 'px'
      infowin.style.position = 'absolute'
      // infowin.style.width = width + 'px'
      // infowin.style.height = height + 'px'
    },
    //关闭信息窗体
    closeInfoWin() {
      const infowin = document.getElementById('infowin')
      infowin.style.display = 'none'
      this.isWindowShow = false
    },
    //查询
    searchVal(val) {
      var geocoder = new AMap.Geocoder()
      geocoder.getLocation(val, (status, result) => {
        console.log(status, result)
        if (status === 'complete' && result.geocodes.length) {
          const lngLat = result.geocodes[0].location
          const point= gcj02towgs84(lngLat.lng,lngLat.lat)//标准经纬度
          // console.log("🚀 ~ file: App.vue ~ line 208 ~ geocoder.getLocation ~ point", point)
          // wgs84_To_epsg4545(point[0],point[1])
          // console.log("🚀 ~ file: App.vue ~ line 207 ~ geocoder.getLocation ~ lngLat",   wgs84_To_epsg4545(point[0],point[1]))
          this.view.center=  point
          this.view.zoom=6
        } else {
          this.$message.error('获取失败')
        }
      })
    },
  },
}
</script>

<style scoped>
#viewDiv {
  height: 100vh;
  width: 100%;
}
#infowin {
  height: 150px;
  width: 280;
  /* display: none; */
  z-index: 10000;
}
</style>
