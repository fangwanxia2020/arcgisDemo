import HeatmapRenderer from '@arcgis/core/renderers/HeatmapRenderer'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'

const name = 'Heatmap'
function Heatmap(type, heatmapData) {
  if (type == 1) {
    const heatmapRenderer = new HeatmapRenderer({
      //设置渲染器
      colorStops: [
        { ratio: 0.4, color: 'rgba(0, 255, 0, 0)' },
        { ratio: 0.75, color: 'rgba(255, 140, 0, 1)' },
        { ratio: 0.9, color: 'rgba(255, 0, 0, 1)' },
      ],
      blurRadius: 40,
      maxPixelIntensity: 230,
      minPixelIntensity: 10,
    })
    const heatFeatures = heatmapData.map((item) => {
      return {
        geometry: {
          type: 'point',
          x: item.lng,
          y: item.lat,
        },
        attributes: {
          ObjectID: item.count, //重要！！！
        },
      }
    })
    this.heatmap = new FeatureLayer({
      source: heatFeatures, //点数据集
      title: '热力图',
      objectIdField: 'ObjectID', //重要！！！
      renderer: heatmapRenderer, //渲染器
    })
    this.addLayer(this.heatmap)
  } else {
    this.removeLayer(this.heatmap)
  }
}

export { name, Heatmap }
