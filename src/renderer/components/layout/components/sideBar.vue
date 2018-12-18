<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" active-text-color="#409eff" background-color="#fff" text-color="#545c64">
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
  </el-menu>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      isCollapse: true
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
    }
  },
  watch: {}
}
</script>

<style scoped lang="less">
</style>
