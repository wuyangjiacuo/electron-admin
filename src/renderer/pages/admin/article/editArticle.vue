<template>
  <div class="">
    <editor :id="id" @update="update"></editor>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      id: this.$route.query._id
    }
  },
  methods: {
    update () {
      this.$alert('返回列表', '更新成功', {
        confirmButtonText: '确定',
        callback: action => {
          this.$router.push('/admin/article/articleManager')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
