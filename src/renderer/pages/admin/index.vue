<template>
  <div class="">
    <appContainer @jump="jump">
      <router-view></router-view>
    </appContainer>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {}
  },
  activated: function () {},
  created: function () {},
  mounted: function () {},
  methods: {
    jump (path) {
      this.$router.replace(path)
    }
  },
  watch: {}
}
</script>

<style scoped lang="less">
</style>
