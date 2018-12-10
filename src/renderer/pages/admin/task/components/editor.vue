<template>
  <div class="">
    <el-form ref="form" v-if="taskForm" :model="taskForm" label-width="80px">
      <el-form-item label="任务类型:">
        <el-radio-group v-model="taskForm.type">
          <el-radio :label="1">工作</el-radio>
          <el-radio :label="2">学习</el-radio>
          <el-radio :label="3">生活</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="任务说明:">
        <el-input v-model="taskForm.content"></el-input>
      </el-form-item>
      <el-form-item label="重要程度">
        <el-radio-group v-model="taskForm.importance">
          <el-radio :label="1"><span class="danger">重要/紧急</span></el-radio>
          <el-radio :label="2"><span class="normal">重要/不紧急</span></el-radio>
          <el-radio :label="3"><span class="normal">不重要/紧急</span></el-radio>
          <el-radio :label="4"><span class="normal">不重要/不紧急</span></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否提醒">
        <el-switch
          v-model="taskForm.isRemind"
          active-color="#13ce66"
          inactive-color="grey">
        </el-switch>
      </el-form-item>
      <!-- 需要提醒时才显示提醒时间 -->
      <el-form-item v-if="taskForm.isRemind" label="提醒时间">
        <el-col :span="11">
          <el-date-picker type="datetime" placeholder="选择日期" v-model="taskForm.remindTime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="子任务">
        <el-col :span="24" v-for="(goal, index) in taskForm.taskChildren" :key="index">
          <el-checkbox v-model="goal.finished">{{goal.content}}</el-checkbox>
          <el-button size="mini" icon="el-icon-delete" circle @click="deletGoal(index)"></el-button>
        </el-col>
        <el-col :span="24">
          <el-button type="success" size="mini" icon="el-icon-plus" circle @click="addGoal"></el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="Submit">提交</el-button>
        <el-button @click="$emit('cancle')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['formData'],
  name: '',
  data () {
    return {
      taskForm: null
    }
  },
  activated: function () {},
  created: function () {},
  mounted: function () {
    console.log(this.formData)
    this.taskForm = Object.assign({}, this.formData)
  },
  methods: {
    addGoal () {
      this.$prompt('请输入目标', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        console.log(123)
        let Obj = {
          finished: false,
          content: value,
          deleted: false
        }
        this.taskForm.taskChildren.push(Obj)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    deletGoal (index) {
      console.log(this.taskForm.taskChildren[index])
      this.taskForm.taskChildren.splice(index, 1)
    },
    Submit () {
      // this.taskForm.accessToken = localStorage.getItem('accessToken')
      console.log(this.taskForm)
      this.$api.task.updateTask(this.taskForm).then(res => {
        if (res.data.code === 200) {
          console.log(res.data)
        }
      })
    }
  },
  watch: {
    formData: {
      handler: function (val, oldval) {
        this.taskForm = Object.assign({}, val)
        console.log(this.taskForm)
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="less">
</style>
