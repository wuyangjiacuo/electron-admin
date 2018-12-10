<template>
  <div class="">
    <editor></editor>
  </div>
</template>

<script>
export default {
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
        }
      })
    },
    selectChange (val) {
      this.tipsInfo.cateInfo = val[val.length - 1]
    },
    back () {
      this.$router.push('/tips/tipsList')
    },
    save () {
      let accessToken = localStorage.getItem('accessToken')
      let obj = {
        cate_id: this.tipsInfo.cateInfo,
        accessToken: accessToken,
        title: this.tipsInfo.title,
        summary: this.tipsInfo.summary,
        content: this.tipsInfo.content
      }
      this.$api.article.addArticle(obj).then(res => {
        if (res.data.data.redocode === 200) {
          this.$alert('返回列表', '新建成功', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.push('/admin/article/articleManager')
            }
          })
        }
      })
    }
  },
  watch: {}
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
