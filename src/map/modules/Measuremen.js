import Measurement from "@arcgis/core/widgets/Measurement";

const name = 'Measuremen'
function Measuremen(type) {
  if (type == 1) {
    // 测量工具
    // "area"|"distance"
    this.measurement = new Measurement({
      view: this.view,
      activeTool: 'area',
    })
    this.view.ui.add(this.measurement, 'top-left')
  } else {
    this.view.ui.remove(this.measurement, 'top-left')
    this.measurement.clear()
  }
}

export { name, Measuremen }
