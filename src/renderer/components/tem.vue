<template>
  <div class="">
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: '',
  data () {
    return {}
  },
  computed: {
    ...mapState({
      queryInfo: state => state.query.queryData
    })
  },
  activated: function () {},
  created: function () {},
  mounted: function () {},
  methods: {},
  watch: {
    queryInfo: {
      handler: function (val, oldval) {
        console.log(val)
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="less">
</style>
