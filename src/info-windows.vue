<template>
  <div class="info-window">
    <div class="info">
      <div class="content">
        <template v-if="goods[0]">
          <el-carousel
            ref="carousel"
            :interval="3000"
            arrow="never"
            :autoplay="false"
            indicator-position="none"
            @mouseenter.native="delHandleMouseEnter"
          >
            <el-carousel-item
              v-for="(item, index) of goods"
              :key="`goodsKey${index}`"
            >
              <div class="classify">
                <div
                  class="item"
                  v-for="(item1, index1) of item"
                  :key="`goodsItemKey${index1}`"
                >
                  <span class="name">{{ item1.name }}（{{ item1.unit }}）</span>
                  <span class="number">{{ item1.count }}</span>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </template>
        <div class="line"></div>
        <div class="statistics">
          <template v-if="!carCode">
            <div
              class="name"
              v-for="(item, index) of classify"
              :key="`classifyItemKey${index}`"
            >
              <span class="text">{{ item.name }}：</span
              ><span class="number">{{ item.count }}</span
              >{{ item.unit }}
            </div>
          </template>
          <template v-else>
            <div class="name" style="text-align: center">
              <span>车辆：{{ carCode }}</span>
            </div>
          </template>
        </div>
      </div>
      <div class="jiao">
        <div class="rhombus"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // infoData: {
    //   type: Object,
    //   default: [],
    // },
    infoWindow: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      goods: [],
      classify: [],
      carCode: '',
    }
  },
  watch: {
    infoWindow(val) {
      this.getInfo(val)
    },
  },
  created() {},
  mounted() {
    // this.getInfo(this.infoWindow);
  },
  methods: {
    // 取消鼠标悬停，不自动播放
    delHandleMouseEnter() {
      this.$refs.carousel.handleMouseEnter = () => {}
    },
    getInfo(val) {
      const { goodsVoList, classifyVo, carCode, type } = val
      if(Object.getOwnPropertyNames(val).length){
      // 二维数组
      this.goods = []
      if (goodsVoList) {
        for (var i = 0; i < goodsVoList.length; i += 2) {
          this.goods.push(goodsVoList.slice(i, i + 2))
        }
      }
      this.classify = Array.isArray(classifyVo) ? classifyVo : [classifyVo]
      this.carCode = carCode
      }

    },
  },
}
</script>

<style lang="scss" scoped>
.info-window {
  color: #fff;
  z-index: 999999;
  ::v-deep .el-carousel__container {
    height: 68px !important;
  }

  // 气泡
  .info {
    // position: absolute;
    // left: 50%;
    // top: 45%;
    // z-index: 999999;
    width: 230px;
    display: inline-block;
    border-radius: 10px;
    position: relative;

    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.15);
    color: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    background: rgba(48, 95, 197, 0.9);
    .content {
      // border: 1px solid red;

      .classify {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 10px;

        .item {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          // background: fuchsia;
          // border: 1px solid yellow;
          flex: 1;
          .name {
            font-size: 14px;
            word-break: break-all;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
          .number {
            font-size: 26px;
            margin-top: 3px;
            color: #ff9400;
            font-weight: bold;
          }
        }
      }
      .line {
        width: 90%;
        height: 3px;
        background: #2267d8;
        border-bottom: 2px solid rgba(0, 0, 0, 0.7);
        margin: 0 auto;
      }
      .statistics {
        // border: 1px solid rgb(7, 211, 17);
        // background: slateblue;
        display: flex;
        flex-direction: column;
        padding-left: 5px;
        margin-top: 10px;
        .name {
          padding: 2px;
          font-size: 14px;
          .text {
            // border: 1px solid rgb(7, 211, 17);
            text-align: right;
          }
          .number {
            font-size: 15px;
            color: #ff9400;
          }
        }
      }
    }
    .jiao {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0px;
      height: 30px;
      margin-bottom: -30px;
      //     border: 1px solid red;
      overflow: hidden;
      .rhombus {
        position: absolute;
        left: 50%;
        margin-top: -36px;
        width: 29px;
        height: 34px;
        transform: rotateZ(73deg) skew(50deg, -5deg);
        border: 1px solid rgb(48, 95, 197);
        box-shadow: rgb(48, 95, 197) 0px 0px 10px 0px inset;
      }
    }
  }
}
</style>
