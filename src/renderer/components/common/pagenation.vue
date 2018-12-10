<template>
  <div class="page">
    <div class="pageMain">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize?pageSize:8"
        :pager-count="11"
        :current-page.sync='currentpage'
        :total="totalItems">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: ['totalItems', 'pageSize', 'reset'],
  name: '',
  data () {
    return {
      currentpage: 1
    }
  },
  activated: function () {},
  created: function () {},
  mounted: function () {},
  methods: {
    handleCurrentChange (val) {
      this.$emit('pageChange', val)
    }
  },
  watch: {
    totalItems: {
      handler: function (val, oldval) {
        this.currentpage = 1
      },
      deep: true
    },
    reset: {
      handler: function (val, oldval) {
        console.log('重置页码')
        this.currentpage = 1
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="less">
.page{
  height: 48px;
  margin-top: 50px;
  padding: 10px 0;
  display: flex;
  justify-content: flex-end;
}
</style>
