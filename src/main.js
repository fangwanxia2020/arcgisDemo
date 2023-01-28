import Vue from 'vue'
import App from './App.vue'
import '@arcgis/core/assets/esri/themes/light/main.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入高德地图
import AMap from 'vue-amap';
Vue.use(AMap);
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: '43836c87b74f7ebb6e0fdeb159498f89',
  plugin: ['AMap.Geocoder'],
  v: '1.4.4'
});

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
