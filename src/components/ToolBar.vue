<template>
  <div class="toolbar">
    <el-button-group>
      <!-- 地图切换按钮 -->
      <el-dropdown split-button type="primary" @command="baseMapChange">
        地图切换
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1"> 矢量</el-dropdown-item>
          <el-dropdown-item command="2"> 影像</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 地图切换按钮 END-->

      <!-- 地图切换按钮 -->
      <el-dropdown split-button type="primary" @command="openWindow">
        信息窗体
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1"> 开</el-dropdown-item>
          <el-dropdown-item command="0"> 关</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 地图切换按钮 END-->

      <!-- 热力图按钮 -->
      <el-dropdown split-button type="primary" @command="setHeatmap">
        热力图
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1"> 开</el-dropdown-item>
          <el-dropdown-item command="0"> 关</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 热力图按钮 END-->

      <!-- 测量按钮 -->
      <el-dropdown split-button type="primary" @command="setMeasurement">
        测量
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1"> 开</el-dropdown-item>
          <el-dropdown-item command="0"> 关</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 测量按钮 END-->

      <!-- 标绘 GO-->
      <el-dropdown split-button type="primary" @command="setDrop">
        标绘(工具)
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item command="point"> 点 </el-dropdown-item>
          <el-dropdown-item command="polyline"> 线 </el-dropdown-item>
          <el-dropdown-item command="polygon"> 面 </el-dropdown-item>
          <el-dropdown-item command="circle"> 圆形 </el-dropdown-item>
          <el-dropdown-item command="rectangle"> 长方形 </el-dropdown-item>
          <el-dropdown-item command="stop"> 停止标绘 </el-dropdown-item>
          <el-dropdown-item command="delete"> 清除标绘 </el-dropdown-item> -->
          <el-dropdown-item command="1"> 开 </el-dropdown-item>
          <el-dropdown-item command="0"> 关 </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 标绘 END-->
      <!-- 标绘 GO-->
      <el-dropdown split-button type="primary" @command="setDropByself">
        标绘(手动)
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="point"> 点 </el-dropdown-item>
          <el-dropdown-item command="polyline"> 线 </el-dropdown-item>
          <el-dropdown-item command="polygon"> 面 </el-dropdown-item>
          <el-dropdown-item command="circle"> 圆形 </el-dropdown-item>
          <el-dropdown-item command="rectangle"> 长方形 </el-dropdown-item>
          <!-- <el-dropdown-item command="stop"> 停止标绘 </el-dropdown-item>-->
          <el-dropdown-item command="clear"> 清除标绘 </el-dropdown-item> 
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 标绘 END-->
    </el-button-group>
  </div>
</template>

<script>
export default {
  name: 'ToolBar',
  methods: {
    // 热力图
    setHeatmap(type) {
      this.$emit('setHeatmap', type)
    },
    // 底图切换
    baseMapChange(type) {
      this.$emit('baseMapChange', type)
    },
    //测量
    setMeasurement(type) {
      this.$emit('setMeasurement', type)
    },

    // 窗体
    openWindow(type) {
      this.$emit('openWindow', type)
    },
    // 标绘
    setDrop(type) {
      this.$emit('setDrop', type)
    },

    setDropByself(type) {
      this.$emit('setDropByself', type)
    },
  },
}
</script>

<style scoped>
.toolbar {
  position: absolute;
  top: 12px;
  right: 20px;
  height: 40px;
  width: auto;
  z-index: 99;
}
</style>
