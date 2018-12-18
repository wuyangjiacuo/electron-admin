<template>
  <div class="">
    <el-container>
      <el-aside width="80px"><sideBar @jump="jump"></sideBar></el-aside>
      <el-container>
        <el-header><headerBar></headerBar></el-header>
        <el-main class="mainContent"><slot></slot></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import sideBar from './components/sideBar'
import headerBar from './components/headerBar.vue'
export default {
  name: '',
  data () {
    return {
      isCollapse: true
    }
  },
  components: {
    sideBar,
    headerBar
  },
  activated: function () {},
  created: function () {},
  mounted: function () {},
  methods: {
    handleOpen () {
    },
    handleClose () {
    },
    jump (path) {
      console.log(path)
      this.$emit('jump', path)
      // this.$router.push(path)
    }
  },
  watch: {}
}
</script>

<style scoped lang="less">
.mainContent{
  background: #f4f7fc;
}
</style>