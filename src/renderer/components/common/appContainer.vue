<template>
  <div class="">
    <!-- 头部工具栏 -->
    <el-row>
      <div class="headerContent">
        <div class="logo">CORGI</div>
        <div class="actions">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </el-row>
    <!-- 侧边导航 -->
    <el-container>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" active-text-color="#fff" background-color="#545c64" text-color="#fff">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span slot="title">文章</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="jump('/admin/article/addArticle')">新增文章</el-menu-item>
                <el-menu-item index="1-2" @click="jump('/admin/article/articleManager')">文章管理</el-menu-item>
                <el-menu-item index="1-3" @click="jump('/admin/article/cateEditor')">分类管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-date"></i>
                <span slot="title">任务</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="jump('/admin/task/addTask')">新增任务</el-menu-item>
                <el-menu-item index="1-2" @click="jump('/admin/task/taskmanager')">任务管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-picture"></i>
                <span slot="title">搞笑图片</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-2" @click="jump('/admin/gif/gifManager')">图片管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-star-on"></i>
                <span slot="title">用户</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-2" @click="jump('/admin/user/addUser')">新增账户</el-menu-item>
                <el-menu-item index="1-2" @click="jump('/admin/user/userManager')">账号管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu> -->
          </el-menu>
        </el-aside>
        <!-- 内容区 -->
        <el-main><slot></slot></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      isCollapse: false
    }
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
.headerContent{
  width: 100%;
  height: 60px;
  background: #354052;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  .logo{

  }
  .actions{
    span{
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 8px;
      margin-right: 20px;
    }
    span:nth-child(2){
      background: #1cc337;
    }
    span:nth-child(3){
      background: #ff5c38;
    }
  }
}
</style>