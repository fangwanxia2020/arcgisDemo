// 图层约定
// 1  层为底图层
// 2 层为 边界边界图层

import { DataType } from "@/utils/index"; // 工具函数

/*
 *  description:  添加图层
 *  param {Layer,Array<Layer>} layer  需添加的图层
 *  param {number,Array<number>} lever 添加图层的层数
 */
const addLayer = function addLayer(layer, lever) {
  // 判断是
  if (DataType(layer, "array")) {
    layer.forEach((item, index) => {
      lever ? this.map.add(item, lever[index]) : this.map.add(item);
    });
  } else {
    lever ? this.map.add(layer, lever) : this.map.add(layer);
  }
};

const removeLayer = function removeLayer(layer) {
  this.map.remove(layer);
};

export { addLayer, removeLayer };
