import Vue from "vue";
import MyNotice from "../lib/notice-bar";

var name = createNamespace(MyNotice.name);

// Vue.component(createNamespace(MyNotice.name), MyNotice);

Vue.use(MyNotice)

export default MyNotice;
