<template>
  <div id="app">
    <p class="box">{{msg}}</p>
  </div>
</template>
<script>
export default {
  name: 'index',
  data () {
    return {
      msg: 'this is page01'
    }
  }
}
</script>
<style>
.box {
  color: red;
  font-size: 14px;
}
</style>
