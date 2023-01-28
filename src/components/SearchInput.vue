<template>
  <div class="search">
    <el-input v-model="input" placeholder="请输入危化企业地块" class="input">
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="searchVal"
      ></el-button
    ></el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
    }
  },
  methods: {
    searchVal() {
      console.log(this.input)
      if (this.input) {
        this.$emit('searchVal', this.input)
      } else {
        this.$message.error('请输入内容')
      }
    },
  },
}
</script>

<style scoped>
.search {
  position: absolute;
  z-index: 99999;
}
.input {
  position: relative;
  top: 12px;
  left: 64px;
}
</style>
