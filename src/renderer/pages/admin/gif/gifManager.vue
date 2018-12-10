
<template>
  <div class="">
    <el-table
      :data="gifList"
      style="width: 100%">
      <el-table-column
        fixed
        prop="gallery_title"
        label="标题"
        width="500">
      </el-table-column>
      <el-table-column
        prop="gallery_sesson"
        label="期数"
        width="100">
      </el-table-column>
      <el-table-column
        prop="cate_id"
        label="分类"
        width="100">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <!-- <el-button type="success" @click="edit(scope.row)">编辑</el-button> -->
          <el-button type="danger" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagenation :totalItems="totalItems" :pageSize="query.pageSize" @pageChange="pageChange"></pagenation>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      cate: [],
      props: {
        label: 'cate_name',
        value: 'cate_id',
        children: 'children'
      },
      gifList: [],
      query: {
        keyword: '',
        pageSize: 8,
        page: 1,
        cate_id: 0
      },
      totalItems: 0
    }
  },
  activated: function () {},
  created: function () {},
  mounted: function () {
    this.getGifList()
  },
  methods: {
    getGifList () {
      this.$api.gif.getGifList(this.query).then(res => {
        if (res.data.code === 200) {
          this.gifList = res.data.data.items
          this.totalItems = res.data.data.totalItems
        }
      })
    },
    selectChange (val) {
      console.log(val[val.length - 1]) // cate的id
      this.query.cate_id = val[val.length - 1]
    },
    pageChange (val) {
      this.query.page = val
      console.log(val)
      this.getGifList()
    },
    edit (data) {
      console.log(data)
    },
    del (data) {
      console.log(data)
      this.$api.gif.delGif(data).then(res => {
        console.log(res)
        this.getGifList()
      })
    }
  },
  watch: {}
}
</script>

<style scoped lang="less">
.tipsList{
  height: 600px;
  margin: 20px auto;
  .item{
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 10px;
    .avatar{
      width: 50px;
      height: 50px;
      border-radius: 25px;
      margin-right: 10px;
      border: solid 1px #eee;
      overflow: hidden;
      img{
        width: 100%;
      }
    }
    .content{
      .title{
        font-size: 15px;
      }
      .summary{
        font-size: 13px;
        color: #e9e9e9;
      }
    }
  }
}
.box-card{
  margin-bottom: 10px;
}
.page{
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
}
.bottomBtns{
  display: flex;
  justify-content: space-between;
}
</style>
