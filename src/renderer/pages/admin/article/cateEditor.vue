<template>
  <div class="cateList">
    <div class="cateGroup" v-for="(item,index) in cateList" :key="index">
      <div class="host container">
        <div class="cateInfo">
          <!-- <div class="cateImg" @click="showLogo(item.cate_id)">
            <img :src="item.cate_default_pic" alt="">
          </div> -->
          <el-button type="success" plain>{{item.cate_name}}</el-button>
        </div>
        <div class="actions">
          <el-button type="primary" v-if="index!==0" icon="el-icon-arrow-up" size="mini" @click="changeRank(index,true,0)" circle></el-button>
          <el-button type="primary" v-if="index!==cateList.length-1" icon="el-icon-arrow-down" size="mini" @click="changeRank(index,false,0)" circle></el-button>
          <el-button type="warning" icon="el-icon-plus" size="mini" circle @click="addCate(item.cate_id)"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editName(item.cate_id)" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="delCate(item.cate_id)"></el-button>
        </div>
      </div>
      <div v-if="item.children.length>0" v-for="(childItem,index2) in item.children" :key="index2" class="children container">
        <div class="cateInfo">
          <!-- <div class="cateImg" @click="showLogo(childItem.cate_id)">
            <img :src="childItem.cate_default_pic" alt="">
          </div> -->
          <el-button type="primary" plain>{{childItem.cate_name}}</el-button>
        </div>
        <div class="actions">
          <el-button type="primary" v-if="index2!==0" icon="el-icon-arrow-up" size="mini" @click="changeRank(index2,true,1,index)" circle></el-button>
          <el-button type="primary" v-if="index2!==item.children.length-1" icon="el-icon-arrow-down" size="mini" @click="changeRank(index2,false,1,index)" circle></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editName(childItem.cate_id)" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="delCate(childItem.cate_id)"></el-button>
        </div>
      </div>
    </div>
    <div class="addNewHost">
      <el-button type="warning" icon="el-icon-plus" circle @click="addCate(0)"></el-button>
    </div>
    <!-- <el-button type="warning" icon="el-icon-plus" circle @click="changeRank(1,2)">test</el-button> -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <croppa v-model="myCroppa"></croppa>
      <el-button type="success" icon="el-icon-check" circle @click="uploadCroppedImage"></el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      dialogVisible: false,
      current_cate_id: null,
      myCroppa: '',
      cateList: []
    }
  },
  activated: function () {},
  created: function () {},
  mounted: function () {
    this.getCateList()
  },
  methods: {
    getCateList () {
      this.$api.cate.getCateInfo().then(res => {
        if (res.data.code === 200) {
          this.cateList = res.data.data
        }
      })
    },
    addCate (host) {
      this.$prompt('请输入分类名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        let obj = {
          cate_host: host,
          cate_name: value
        }
        this.$api.cate.addCate(obj).then(res => {
          if (res.data.code === 200) {
            this.getCateList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    showLogo (id) {
      console.log('show logo')
      this.current_cate_id = id
      this.dialogVisible = true
    },
    uploadCroppedImage () {
      this.myCroppa.generateBlob((blob) => {
        // write code to upload the cropped image file (a file is a blob)
        let obj = {
          cate_id: this.current_cate_id,
          cate_default_pic: this.myCroppa.img.currentSrc
        }
        this.$api.cate.updateCatePic(obj).then(res => {
          if (res.data.code === 200) {
            this.getCateList()
          }
        })
      }, 'image/jpeg', 0.3) // 80% compressed jpeg file
      // console.log(this.myCroppa.img.src) // 应该是this.myCroppa.img.currentSrc
    },
    editName (id) {
      this.$prompt('请输入新的分类名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        let obj = {
          cate_id: id,
          cate_name: value
        }
        this.$api.cate.updateCateName(obj).then(res => {
          if (res.data.code === 200) {
            this.getCateList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    changeRank (index, gotop, level, host) {
      let obj = null
      if (gotop) {
        if (level === 0) {
          obj = {
            first_cate_id: this.cateList[index].cate_id,
            second_cate_id: this.cateList[index - 1].cate_id
          }
        } else {
          obj = {
            first_cate_id: this.cateList[host].children[index].cate_id,
            second_cate_id: this.cateList[host].children[index - 1].cate_id
          }
        }
      } else {
        if (level === 0) {
          obj = {
            first_cate_id: this.cateList[index].cate_id,
            second_cate_id: this.cateList[index + 1].cate_id
          }
        } else {
          obj = {
            first_cate_id: this.cateList[host].children[index].cate_id,
            second_cate_id: this.cateList[host].children[index + 1].cate_id
          }
        }
      }
      this.$api.cate.changeRank(obj).then(res => {
        if (res.data.code === 200) {
          this.getCateList()
        }
      })
    },
    delCate (id) {
      let obj = {
        cate_id: id
      }
      this.$api.cate.delCate(obj).then(res => {
        if (res.data.code === 200) {
          this.getCateList()
        }
      })
    },
    back () {
      this.$router.replace('/tips/tipsList')
    }
  },
  watch: {}
}
</script>

<style scoped lang="less">
.cateGroup{
  .host{
    span{
      margin-right: 150px;
    }
  }
  .children{
    padding-left: 50px;
  }
  .cateImg{
    box-sizing: border-box;
    width: 50px;
    height: 50px;
    background: #eee;
    margin-right: 15px;
    border-radius: 25px;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img{
      height: 100%;
    }
  }
  .container{
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .cateInfo{
      width: 75%;
      display: flex;
      justify-content: flex-start;
    }
    .actions{
      width: 25%;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
