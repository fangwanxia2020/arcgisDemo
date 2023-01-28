import Point from '@arcgis/core/geometry/Point'
import Polyline from '@arcgis/core/geometry/Polyline'
import Polygon from '@arcgis/core/geometry/Polygon'
import Circle from '@arcgis/core/geometry/Circle'
import Graphic from '@arcgis/core/Graphic'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'

// 设置所画图形
function drawActiveByself(type) {
  switch (type) {
    case 'point':
      enableCreatePoint(this.Draw, this.view)
      break
    case 'polyline':
      enableCreateLine(this.Draw, this.view)
      break
    case 'polygon':
      enableCreateArea(this.Draw, this.view)
      break
    case 'circle':
      enableCreateCircle(this.Draw, this.view)
      break
    case 'rectangle':
      enableCreateRectangle(this.Draw, this.view)
      break
    // case 'stop':
    //   this.draw.complete() // 停止画图
    //   break
    // case 'delete':
    //   this.draw.reset() // 停止画图
    //   this.DrawGraphics.remove() // 清除图层
    //   break
  }
}

//开始监听画线
function enableCreateLine(draw, view) {
  var action = draw.create('polyline', {
    mode: 'click',
  })
  // 获取焦点
  view.focus()

  // 顶点添加事件
  action.on('vertex-add', createPolyline)

  //顶点移除事件
  action.on('vertex-remove', createPolyline)

  // 鼠标移动事件
  action.on('cursor-update', createPolyline)

  // 绘制完成事件
  action.on('draw-complete', createPolyline)
}
//开始监听画面
function enableCreateArea(draw, view) {
  var action = draw.create('polygon', {
    mode: 'click', //点击方式加点
  })
  // 获取焦点
  view.focus()

  // 顶点添加事件
  action.on('vertex-add', createPolygon)

  //顶点移除事件
  action.on('vertex-remove', createPolygon)

  // 鼠标移动事件
  action.on('cursor-update', createPolygon)

  // 绘制完成事件
  action.on('draw-complete', createPolygon)
}
//开始监听画点
function enableCreatePoint(draw, view) {
  var action = draw.create('point', {
    mode: 'click', //点击方式加点
  })
  // 获取焦点
  view.focus()

  // 顶点添加事件
  action.on('vertex-add', createPoint)

  //顶点移除事件
  action.on('vertex-remove', createPoint)

  // 绘制完成事件
  action.on('draw-complete', createPoint)
}
//开始监听画圆
function enableCreateCircle(draw, view) {
  var action = draw.create('circle', {
    mode: 'click', //点击方式加点
  })
  // 获取焦点
  view.focus()
  //顶点移除事件
  action.on('vertex-remove', createCircle)
  // 鼠标移动事件
  action.on('cursor-update', createCircle)
  // 绘制完成事件
  action.on('draw-complete', createCircle)
}
//开始监听画矩形
function enableCreateRectangle(draw, view) {
  console.log(111);
  var action = draw.create('rectangle', {
    mode: 'click', //点击方式加点
  })
  // 获取焦点
  view.focus()

  //顶点移除事件
  action.on('vertex-remove', createRectangle)
  // 鼠标移动事件
  action.on('cursor-update', createRectangle)
  // 绘制完成事件
  action.on('draw-complete', createRectangle)
}
//根据点坐标生成新的线
function createPolyline(event) {
  //获取所有顶点
  var vertices = event.vertices
  //清除之前绘制
  this.view.graphics.removeAll()
  // 生成绘制的图形
  var graphic = new Graphic({
    geometry: new Polyline({
      paths: vertices,
      spatialReference: this.view.spatialReference,
    }),
    symbol: {
      type: 'simple-line', // autocasts as new SimpleFillSymbol
      color: [4, 90, 141],
      width: 4,
      cap: 'round',
      join: 'round',
    },
  })
  // 将绘制的图形添加到view
  this.view.graphics.add(graphic)
}
//根据点坐标生成新的线
function createPolygon(event) {
  //获取所有顶点
  var vertices = event.vertices
  //清除之前绘制
  this.view.graphics.removeAll()

  // 生成绘制的图形
  var graphic = new Graphic({
    geometry: new Polygon({
      hasZ: false,
      hasM: false,
      rings: [vertices],
      spatialReference: this.view.spatialReference,
    }),
    symbol: {
      type: 'simple-fill', // autocasts as new SimpleFillSymbol()
      color: [51, 51, 204, 0.9],
      style: 'solid',
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: 'red',
        width: 1,
      },
    },
  })
  // 将绘制的图形添加到view
  this.view.graphics.add(graphic)
}

//根据点坐标生成新的线
function createPoint(event) {
  //获取所有顶点
  var coordinates = event.coordinates

  //生成绘制的图形
  var graphic = new Graphic({
    geometry: new Point({
      hasZ: false,
      hasM: false,
      x: coordinates[0],
      y: coordinates[1],
      spatialReference: this.view.spatialReference,
    }),
    symbol: {
      type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
      style: 'square',
      color: 'blue',
      size: '8px', // pixels
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: [255, 255, 0],
        width: 3, // points
      },
    },
  })
  // 将绘制的图形添加到view
  this.view.graphics.add(graphic)
}
//根据点坐标生成新的线
function createCircle(event) {
  //获取所有顶点
  var vertices = event.vertices
  //少于一个点无法展示圆
  if (vertices.length < 2) {
    return
  }
  //清除之前绘制
  this.view.graphics.removeAll()
  //生成绘制的图形,两点画圆
  var center = new Point({
    hasZ: false,
    hasM: false,
    x: vertices[0][0],
    y: vertices[0][1],
    spatialReference: this.view.spatialReference,
  })
  var dis = center.distance(
    new Point({
      hasZ: false,
      hasM: false,
      x: vertices[1][0],
      y: vertices[1][1],
      spatialReference: this.view.spatialReference,
    })
  )
  var graphic = new Graphic({
    geometry: new Circle({
      hasZ: false,
      hasM: false,
      center: center,
      radius: dis,
      spatialReference: this.view.spatialReference,
    }),
    symbol: {
      type: 'simple-fill', // autocasts as new SimpleFillSymbol()
      color: [51, 51, 204, 0.9],
      style: 'solid',
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: 'white',
        width: 1,
      },
    },
  })
  // 将绘制的图形添加到view
  this.view.graphics.add(graphic)
}
function createRectangle(event) {
  //获取所有顶点
  var vertices = event.vertices

  //两点画矩形
  if (vertices.length < 2) {
    return
  }
  var rings = [
    vertices[0],
    [vertices[0][0], vertices[1][1]],
    vertices[1],
    [vertices[1][0], vertices[0][1]],
  ]
  //清除之前绘制
  this.view.graphics.removeAll()

  // 生成绘制的图形
  var graphic = new Graphic({
    geometry: new Polygon({
      hasZ: false,
      hasM: false,
      rings: [rings],
      spatialReference: this.view.spatialReference,
    }),
    symbol: {
      type: 'simple-fill', // autocasts as new SimpleFillSymbol()
      color: [51, 51, 204, 0.9],
      style: 'solid',
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: 'white',
        width: 1,
      },
    },
  }) // 将绘制的图形添加到view
  this.view.graphics.add(graphic)
}

export { drawActiveByself }
