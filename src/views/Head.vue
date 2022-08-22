<template>
  <div class="head-content">
    <div class="head-title">
      <span>{{head}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      head: '制作答题卡'
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/publicColor.less';
.head-content{
  height: 50px;
}
.head-title {
  height: 50px;
  line-height: 50px;
  width: 100%;
  background-color: @main;
  position: fixed;
  z-index: 10;
  text-align: center;
  color: @white;
  font-size: 16px;
  top: 0;
}
</style>
