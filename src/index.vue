<template>
  <div class="index">
    <div class="demo1">
      <NoticeBar text="开始滚动吧！"></NoticeBar>
    </div>
  </div>
</template>
<script>
// import Vue from "vue";
import NoticeBar from "../lib/notice-bar";
console.log(NoticeBar);
// Vue.use(NoticeBar.install);
export default {
  data() {
    return {};
  },
  components: {
    NoticeBar
  },
};
</script>
