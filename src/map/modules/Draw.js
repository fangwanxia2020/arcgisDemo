import Sketch from '@arcgis/core/widgets/Sketch'

// 设置所画图形
function drawActive(type) {
  this.sketch = new Sketch({
    layer: new this.GraphicsLayer(),
    view: this.view,
    creationMode: 'update',
  })
  if (type == 1) {
    this.view.ui.add(this.sketch, 'top-left')
  } else {
  console.log("🚀 ~ file: Draw.js ~ line 5 ~ drawActive ~ type", type)
    // this.view.ui.remove(this.sketch, 'top-left')
    this.view.ui.empty("top-left");
    this.sketch.destroy()
  }
}

// export { drawInit, drawActive }
export { drawActive }
