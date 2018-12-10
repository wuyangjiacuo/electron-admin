<template>
  <div class="">
    <div class="taskList">
      <el-row>
        <el-table
          :data="taskList"
          style="width: 100%">
          <el-table-column
            prop="importance"
            label="重要程度"
            width="150">
            <template slot-scope="scope">
              <el-button type="danger" v-if="scope.row.importance === 1">重要/紧急</el-button>
              <el-button type="primary" v-if="scope.row.importance === 2">重要/不紧急</el-button>
              <el-button type="warning" v-if="scope.row.importance === 3">不重要/紧急</el-button>
              <el-button type="success" v-if="scope.row.importance === 4">不重要/不紧急</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="content"
            label="内容"
            width="120">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.type === 1">工作</span>
              <span v-if="scope.row.type === 2">学习</span>
              <span v-if="scope.row.type === 3">生活</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="remindTime"
            label="提醒时间"
            width="200">
          </el-table-column>
          <el-table-column
            label="操作"
            width="250">
            <template slot-scope="scope">
            <el-button size="small" type="success" @click="finish(scope.row)">完成</el-button>
            <el-button size="small" type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="taskDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <pagenation :totalItems="totalItems" :pageSize="queryInfo.pageSize" @pageChange="pageChange"></pagenation>
      </el-row>
    </div>
    <!-- 详情弹窗 -->
    <el-dialog
      title="任务详情"
      v-if="showEditor"
      :visible.sync="showEditor"
      width="60%">
      <editor :formData="taskForm" @cancle="cancle"></editor>
    </el-dialog>
  </div>
</template>

<script>
import editor from './components/editor'
export default {
  name: '',
  data () {
    return {
      taskList: [],
      taskForm: {},
      showEditor: false,
      queryInfo: {
        accessToken: localStorage.getItem('accessToken'),
        pageSize: 8,
        page: 1
      },
      totalItems: 0
    }
  },
  components: {
    editor
  },
  activated: function () {},
  created: function () {},
  mounted: function () {
    this.getTaskList()
  },
  methods: {
    getTaskList () {
      this.$api.task.getTasks(this.queryInfo).then(res => {
        if (res.data.code === 200) {
          this.taskList = res.data.data.items
          this.totalItems = res.data.data.totalItems
        }
      })
    },
    finish (data) {
      let obj = Object.assign({}, data)
      obj.finished = true
      this.$api.task.updateTask(obj).then(res => {
        this.getTaskList()
      })
    },
    edit (data) {
      this.showEditor = true
      this.taskForm = null
      this.taskForm = Object.assign({}, data)
      console.log(this.taskForm)
    },
    cancle () {
      this.showEditor = false
    },
    pageChange (pageIndex) {
      this.queryInfo.page = pageIndex
      this.getTaskList()
    },
    taskDelete (data) {
      let obj = Object.assign({}, data)
      obj.isDeleted = true
      this.$api.task.updateTask(obj).then(res => {
        this.getTaskList()
      })
    }
  },
  watch: {}
}
</script>

<style scoped lang="less">
.taskList{
  padding: 25px;
}
</style>
