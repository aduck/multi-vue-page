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
      msg: 'this is page02'
    }
  }
}
</script>
<style>
.box {
  color: blue;
  font-size: 14px;
}
</style>
