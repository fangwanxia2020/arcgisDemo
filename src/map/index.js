import ArcGIS from './init.js'
import { baseMapChange } from './modules/BaseMap'
import { Heatmap } from './modules/Heatmap'
import { Measuremen } from './modules/Measuremen'
import { addLayer, removeLayer } from './modules/LayerControl.js'
import {  drawActive } from "./modules/Draw.js";
import {  drawActiveByself } from "./modules/drawActiveByself.js";

// import { drawInit, drawActive } from "./modules/Draw.js";

// 图层切换
ArcGIS.prototype.baseMapChange = baseMapChange

//热力图
ArcGIS.prototype.Heatmap = Heatmap

//测量
ArcGIS.prototype.Measuremen= Measuremen

// 图层控制
ArcGIS.prototype.addLayer = addLayer
ArcGIS.prototype.removeLayer = removeLayer

// 标绘
// ArcGIS.prototype.drawInit = drawInit;
ArcGIS.prototype.drawActive = drawActive;

ArcGIS.prototype.drawActiveByself = drawActiveByself;


export default ArcGIS
