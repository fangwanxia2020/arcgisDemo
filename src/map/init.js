import config from './config' // 配置项
import { epsg4545_To_wgs84 } from '../utils/index'
import axios from 'axios'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import TileLayer from '@arcgis/core/layers/TileLayer'
import SpatialReference from '@arcgis/core/geometry/SpatialReference'

import Draw from '@arcgis/core/views/draw/Draw'

import Graphic from '@arcgis/core/Graphic'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import * as identify from "@arcgis/core/rest/identify";
import IdentifyParameters from "@arcgis/core/rest/support/IdentifyParameters";


import { Message } from 'element-ui'
function ArcGIS() {
  this.map = null // 地图
  this.view = null // 地图底图
  this.heatmap = null
  this.measurement = null //测量
  this.sketch = null //测量
}

ArcGIS.prototype.init = function init(id, center = [108.650061, 21.744798]) {
  return axios({
    method: 'get',
    url: config.getApiKeyUrl,
  })
    .then((resp) => {
      const { data } = resp
      if (data) {
        const spatialReference = new SpatialReference({
          wkid: 4545,
        })
        this.baseMap = {
          //矢量地图
          vectorMap: new TileLayer({
            url: config.TileLayerUrl,
            minScale: 3000000,
            apiKey: data,
            spatialReference,
          }),
          //影像地图
          rasterMap: new TileLayer({
            url: config.rasterMapUrl,
            minScale: 3000000,
            apiKey: data,
            spatialReference,
          }),
          type: 1, // 1 为矢量 | 2：影像
        }
        this.map = new Map({})
        this.map.add(this.baseMap.vectorMap, 0)
        // 创建地图视图
        this.view = new MapView({
          map: this.map,
          center: center,
          container: id,
          zoom: 3,
          locale: 'zh-cn', //设置地图语言类型
        })
        //鼠标单击获取转换后的坐标
        this.view.on('click', getClick)
        function getClick(e) {
          const newPonit = epsg4545_To_wgs84(e.mapPoint.x, e.mapPoint.y)
          Message({
            message: '坐标 ' + newPonit,
            center: true,
          })
          console.log(
            '🚀 ~ file: init.js ~ line 47 ~ getClick ~ newCoordinates',
            newPonit
          )
        }
        this.GraphicsLayer = GraphicsLayer
        this.Graphic = Graphic
        
        // this.Draw = Draw
        this.view.when( ()=> {
          this.Draw = new Draw({
            view: this.view,
          })
        })

        return {
          view: this.view,
          map: this.map,
        }
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

export default ArcGIS
