<template>
  <div class="container">
    <div class="loginBox">
      <el-form ref="form" :model="loginInfo" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="loginInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="loginInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="记住密码">
          <el-switch v-model="remember"></el-switch>
        </el-form-item>
        <div class="reg">
          <span>忘记密码</span>
        </div>
        <el-form-item>
          <div class="btns">
            <el-button type="success" @click="onSubmit">立即登录</el-button>
            <el-button type="primary" @click="onSubmit">注册</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      remember: true,
      loginInfo: {
        phone: '',
        password: ''
      }
    }
  },
  activated: function () {},
  created: function () {},
  mounted: function () {},
  methods: {
    onSubmit () {
      if (this.loginInfo.phone === '') {
        this.$message({
          message: '请填写正常的电话号码',
          type: 'warning'
        })
        return
      }
      if (this.loginInfo.password === '') {
        this.$message({
          message: '请填写密码',
          type: 'warning'
        })
        return
      }
      this.$api.user.userLogin(this.loginInfo).then(res => {
        if (res.data.code === 200) {
          localStorage.setItem('accessToken', res.data.data.accessToken)
          this.$router.push('/admin')
        } else {
          this.$message({
            message: res.data.message,
            type: 'warning'
          })
        }
      })
    }
  },
  watch: {}
}
</script>

<style scoped lang="less">
.container{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #eee;
  background: url('./../../assets/loginBG.png') no-repeat;
  background-size: 100%;
}
.loginBox{
  width: 35%;
  padding: 20px;
  margin: 100px auto;
  background: #fff;
  border-radius: 10px;
}
.btns{
  display: flex;
  justify-content: space-between
}
.reg{
  display: flex;
  justify-content: flex-end;
  margin: 10px auto 25px auto;
  span{
    font-size: 12px;
    margin-left: 10px;
  }
}
</style>
