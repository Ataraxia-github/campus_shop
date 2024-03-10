import Vue from "vue";
import Vuex from "vuex";
//记得要先使用一次插件
Vue.use(Vuex);

import home from './home/index'
import user from "./user/index";
import goods from "./goods";
import admin from "./admin";


//对外暴露store类的一个实例
export default new Vuex.Store({
    modules: {
        home,
        user,
        goods,
        admin
    }
})