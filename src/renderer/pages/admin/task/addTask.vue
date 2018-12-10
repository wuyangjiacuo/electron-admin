<template>
  <div class="">
    <!-- 表单 -->
    <div class="timeType">
      <el-form ref="form" :model="taskForm" label-width="80px">
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
          <el-radio-group v-model="importance">
            <el-radio :label="1"><span class="danger">重要</span></el-radio>
            <el-radio :label="2"><span class="normal">不重要</span></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="紧急程度">
          <el-radio-group v-model="emergency">
            <el-radio :label="1"><span class="warming">紧急</span></el-radio>
            <el-radio :label="2"><span class="success">不紧急</span></el-radio>
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
        <el-form-item>
          <el-button type="primary" @click="Submit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <div class="actions">
      <el-button type="primary" @click="save">保存</el-button>
    </div> -->
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      importance: 1,
      emergency: 1,
      remindDay: '',
      taskForm: {
        type: 1, // 类型；1-工作；2-学习；3-生活
        isRemind: false, // 是否提醒
        importance: 0, // task类型,0-不需要提醒的记事类;1-重要且紧急;2-不重要但紧急；3-重要但不紧急；4-不重要也不紧急；5-长期任务(可打卡)
        content: '', // 任务内容描述
        remindTime: '', // 提醒的时间
        taskChildren: [], // 检查项
        accessToken: ''
      }
    }
  },
  activated: function () {},
  created: function () {},
  mounted: function () {},
  methods: {
    Submit () {
      // 判断重要性
      if (this.importance === 1) {
        if (this.emergency === 1) {
          this.taskForm.importance = 1
        } else {
          this.taskForm.importance = 2
        }
      } else {
        if (this.emergency === 1) {
          this.taskForm.importance = 3
        } else {
          this.taskForm.importance = 4
        }
      }
      this.taskForm.accessToken = localStorage.getItem('accessToken')
      // console.log(this.taskForm)
      this.$api.task.addNewTask(this.taskForm).then(res => {
        if (res.data.code === 200) {
          console.log(res.data)
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
.danger{
  display: inline-block;
  padding: 10px;
  color: #fff;
  background: #F56C6C;
  border-radius: 5px;
}
.warming{
  display: inline-block;
  padding: 10px;
  color: #fff;
  background: #E6A23C;
  border-radius: 5px;
}
.normal{
  display: inline-block;
  padding: 10px;
  color: #fff;
  background: #409EFF;
  border-radius: 5px;
}
.success{
  display: inline-block;
  padding: 10px;
  color: #fff;
  background: #67C23A;
  border-radius: 5px;
}
</style>
