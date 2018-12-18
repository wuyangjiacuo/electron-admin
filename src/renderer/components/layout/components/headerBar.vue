<template>
  <div class="headerBar">
    <div class="logo"></div>
    <div class="actions">
      <div class="avatar">头像</div>
      <div class="minus"><i class="el-icon-minus"></i></div>
      <div class="close"><i class="el-icon-close"></i></div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {}
  },
  activated: function () {},
  created: function () {},
  mounted: function () {},
  methods: {},
  watch: {}
}
</script>

<style scoped lang="less">
.headerBar{
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo{

  }
  .actions{
    display: flex;
    justify-content: space-around;
    align-items: center;
    .avatar{
      width: 30px;
      height: 30px;
      background: #eee;
      border-radius: 15px;
    }
    .minus{
      color: #85ce61;
    }
    .close{
      color: #f56c6c;
    }
  }
}
</style>
