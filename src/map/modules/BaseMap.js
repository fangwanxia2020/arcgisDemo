const name = 'baseMapChange'

function baseMapChange(type) {
  if (type == this.baseMap.type) return // 防止重复加载
  // 添加 影像
  if (type == 2) {
    this.addLayer(this.baseMap.rasterMap, 0)
    this.removeLayer(this.baseMap.vectorMap)
    this.baseMap.type = 2
  }
  // 添加 矢量
  else {
    this.addLayer(this.baseMap.vectorMap, 0)
    this.removeLayer(this.baseMap.rasterMap)
    this.baseMap.type = 1
  }
}

export { name, baseMapChange }
