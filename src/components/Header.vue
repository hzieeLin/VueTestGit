<template>
  <div>
    <div class="header-container">
      <div class="header-left">logo</div>
      <div class="header-right">
        <div class="header-input">222</div>
        <div class="header-info">333</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style lang="scss" scoped>
  .header-container {
    height: 60px;
    width: 1226px;
    margin: 0 auto;
    background-color: aquamarine;
    .header-left {
      width: 300px;
      text-align: center;
      line-height: 50px;
      float: left;
    }
    .header-right {
      float: right;
      .header-input {
        float: left;
        height: 60px;
        width: 100px;
        line-height: 60px;
        text-align: center;
      }
      .header-info {
        width: 100px;
        float: right;
        line-height: 60px;
        text-align: center;
      }
    }
  }
</style>
