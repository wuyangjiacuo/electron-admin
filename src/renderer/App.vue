<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'my-project',
    data () {
      return {
        notificationList: [] // 存储已经发了提示的数组
      }
    },
    mounted () {
      let that = this
      // 每1分钟清空一次已发提示数组
      setInterval(function () {
        this.notificationList = []
      }, 60000)
      setInterval(function () {
        that.checkForMessage()
      }, 5000)
    },
    methods: {
      checkForMessage () {
        const path = require('path')
        let obj = {
          accessToken: localStorage.getItem('accessToken')
        }
        this.$api.message.checkMessage(obj).then(res => {
          // console.log(res.data.data)
          for (let i = 0; i < res.data.data.length; i++) {
            // 半小时内到期的任务才提示
            if (res.data.data[i].remain < 1800000) {
              let bodyText = ''
              let minit = parseInt(res.data.data[i].remain / 60000)
              let mini = Math.floor(minit) // 向上取整
              if (mini > 0) {
                bodyText = '仅剩:' + mini + '分钟了'
              } else {
                if (mini === 0) {
                  bodyText = '时间到了,赶紧完成吧！'
                } else {
                  mini = -mini
                  bodyText = '已超时:' + mini + '分钟'
                }
              }
              const notification = {
                title: res.data.data[i].task.content,
                body: bodyText,
                icon: path.join(__dirname, '../renderer/assets/notification.jpg')
              }
              // 不在已通知数组中就提醒，然后push进去
              if (this.notificationList.indexOf(res.data.data[i].task._id) === -1) {
                this.notificationList.push(res.data.data[i].task._id)
                const myNotification = new window.Notification(notification.title, notification)
                myNotification.onclick = () => {
                  console.log(res.data.data[i].task._id)
                }
              }
            }
          }
        })
      },
      viewNotification (id) {
        // 添加查看通知的接口
        console.log(id)
      }
    }
  }
</script>

<style>
#app{
  margin: 0;
}
</style>
