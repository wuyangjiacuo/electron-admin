<template>
  <div class="">
    <el-form :inline="true" :model="tipsInfo" class="demo-form-inline">
      <el-form-item label="分类">
        <el-cascader
          :options="cate"
          v-model="cateArr"
          :props="props"
          change-on-select
          @change="selectChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="tipsInfo.title" placeholder="请输入标题"></el-input>
      </el-form-item>
    </el-form>
    <el-input v-model="tipsInfo.summary" placeholder="请输入简介"></el-input>
    <div class="editor">
      <mavon-editor v-model="tipsInfo.content" :toolbars="toolbars" :subfield="false" :editable="true"></mavon-editor>
    </div>
    <div class="actions">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  name: '',
  data () {
    return {
      toolbars: {
        bold: true, // 粗体
        // italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        // superscript: true, // 上角标
        // subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        // table: true, // 表格
        // fullscreen: true, // 全屏编辑
        // readmodel: true, // 沉浸式阅读
        // htmlcode: true, // 展示html源码
        // help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        // navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true // 右对齐
        /* 2.2.1 */
        // subfield: true, // 单双栏模式
        // preview: false // 预览
      },
      cate: [],
      cateArr: [], // 选择的分类的数组
      tipsInfo: {
        cateInfo: null,
        title: '',
        summary: '',
        content: ''
      },
      props: {
        label: 'cate_name',
        value: 'cate_id',
        children: 'children'
      }
    }
  },
  activated: function () {},
  created: function () {},
  mounted: function () {
    this.getCateInfo()
  },
  methods: {
    getCateInfo () {
      this.$api.cate.getCateInfo().then(res => {
        if (res.data.code === 200) {
          this.cate = res.data.data
          if (this.id) {
            this.getArticleDetail(this.id)
          }
        }
      })
    },
    getArticleDetail (id) {
      let obj = {
        _id: id
      }
      this.$api.article.getArticleDetail(obj).then(res => {
        this.tipsInfo = Object.assign({}, res.data.data)
        // 构建caseder的id数组
        let newArr = []
        for (let i = 0; i < this.cate.length; i++) {
          if (this.tipsInfo.cate_id === this.cate[i].cate_id) {
            newArr = this.cate[i].cate_id
            return
          }
          if (this.cate[i].children.length > 0) {
            for (let j = 0; j < this.cate[i].children.length; j++) {
              if (this.tipsInfo.cate_id === this.cate[i].children[j].cate_id) {
                newArr.push(this.cate[i].cate_id)
                newArr.push(this.cate[i].children[j].cate_id)
              }
            }
          }
        }
        this.cateArr = newArr
      })
    },
    selectChange (val) {
      this.tipsInfo.cateInfo = val[val.length - 1]
    },
    save () {
      let accessToken = localStorage.getItem('accessToken')

      if (this.id) {
        // 更新
        let obj = {
          _id: this.tipsInfo._id,
          cate_id: this.cateArr[this.cateArr.length - 1],
          accessToken: accessToken,
          title: this.tipsInfo.title,
          summary: this.tipsInfo.summary,
          content: this.tipsInfo.content
        }
        this.$api.article.updateArticle(obj).then(res => {
          if (res.data.code === 200) {
            this.$emit('update')
          }
        })
      } else {
        // 新增
        let obj = {
          cate_id: this.cateArr[this.cateArr.length - 1],
          accessToken: accessToken,
          title: this.tipsInfo.title,
          summary: this.tipsInfo.summary,
          content: this.tipsInfo.content
        }
        this.$api.article.addArticle(obj).then(res => {
          if (res.data.code === 200) {
            this.$emit('add')
          }
        })
      }
    }
  },
  watch: {
    id: {
      data: function (val, oldval) {
        console.log(val)
        this.getArticleDetail(val)
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="less">
.form{
  margin: 10px auto;
}
.editor{
  margin: 10px auto;
}
</style>
