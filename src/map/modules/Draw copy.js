import { epsg4545_To_wgs84 } from '../../utils/index'


function drawInit() {
  // 添加图形图层
  this.DrawGraphics = new this.GraphicsLayer({ id: 'drawLayer' })

  // 将图层加载到地图上，图层设置为 7
  this.map.add(this.DrawGraphics, 7)

  // 实例化画图
  this.draw = new this.Draw({
    view: this.view,
  })
  // this.drawActive('POINT')
}

// 内置函数 画完后将图形加载到图形图层
function drawEndEvent(type, evt) {
  console.log('🚀 ~ file: Draw.js ~ line 17 ~ drawEndEvent ~ evt', type, evt)
  //添加图形到地图
  let symbol, geometry
  if (type === 'point') {
  const newPonit = epsg4545_To_wgs84(evt.vertices[0][0],evt.vertices[0][1])
    symbol = {
      type: 'simple-marker',
      color: [226, 119, 40],
      width: 4,
    }
    geometry = {
      longitude:newPonit[0],
      latitude: newPonit[1],
    }
  } else if (type === 'polyline') {
    symbol = {
      type: "simple-line",
      color: [4, 90, 141],
      width: 4,
      cap: "round",
      join: "round"
    }
    geometry = {
      paths:evt.vertices,
      spatialReference: this.view.spatialReference
    }
  } else {
    // symbol = this.draw.fillSymbol
  }

  // 获取图形样式
  let tx = new this.Graphic({
    geometry: {
      type: type,
      ...geometry,
    },
    symbol: symbol,
  })
  // 将图形样式加载到地图上
  this.DrawGraphics.add(tx)
}

// 设置所画图形
function drawActive(type) {
  let tool = null
  switch (type) {
    case 'point':
      tool = 'point'
      break
    case 'polyline':
      tool = 'polyline'
      break
    case 'polygon':
      tool = 'polygon'
      break
    case 'circle':
      tool = 'circle'
      break
    case 'pectangle':
      tool = 'pectangle'
      break
    case 'stop':
      this.draw.complete() // 停止画图
      break
    case 'delete':
      this.draw.reset() // 停止画图
      this.DrawGraphics.remove() // 清除图层
      break
  }
  if (tool !== null) {
    console.log("🚀 ~ file: Draw.js ~ line 90 ~ drawActive ~ tool", tool)
    //激活对应的绘制工具
    let action = this.draw.create(tool, { mode: 'click' })
    // 添加画图的监听事件
    action.on('draw-complete', drawEndEvent.bind(this, tool))
  }
}

export { drawInit, drawActive }
