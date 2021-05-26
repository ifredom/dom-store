import { withInstall } from "../utils/with-install";
import _NoticeBar from "./notice-bar.vue";

const NoticeBar2 = {
  //'component-name'这就是后面可以使用的组件的名字，install是默认的一个方法
  install: function(Vue) {
    Vue.component("NoticeBar", _NoticeBar);
  },
};
console.log(NoticeBar2);
const NoticeBar = withInstall(_NoticeBar);

console.log(NoticeBar);
export default NoticeBar;
