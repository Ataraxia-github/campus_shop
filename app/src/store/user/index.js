// 登录与注册的模块
import {
    reqLogin,
    reqLogout,
    reqUserInfo,
    reqUserRegister,
    reqEditPassword,
    reqEditPersonalData,
    reqGetPhoneCode,
    reqChangePhoneNum,
    reqPersonalTrade,
    reqSubmitComment
} from "@/api";

const state = {
    userInfo: {}
}
const mutations = {
    USERLOGIN(state, userInfo) {
        state.userInfo = userInfo || {}
    },
    CLEAR(state) {
        // 把仓库中相关信息清空
        state.userInfo = {}
    },
    USERINFO(state, {
        userInfo
    }) {
        state.userInfo = userInfo
    }
}
const actions = {
    // 用户注册
    async userRegister({
        commit
    }, data) {
        let result = await reqUserRegister(data)
        if (result.successcode == 200) {
            // 注册成功
            return 'ok'
        } else if (result.errcode == 1) {
            // 用户名被占用
            return 'occupyname'
        }
    },
    // 用户登录
    async userLogin({
        commit
    }, data) {
        let result = await reqLogin(data)
        if (result.successcode == 200) {
            // 用户登录成功
            commit('USERLOGIN', result.data)
            return result
        } else if (result.errcode == 1) {
            // 用户名不存在
            return 'errusername'
        } else if (result.errcode == 2) {
            // 用户名正确，密码输错
            return 'errpwd'
        }
    },
    // 退出登录
    async userLogout({
        commit
    }) {
        // 向服务器发起一次请求
        let result = await reqLogout()
        if (result.successcode == 200) {
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('false'))
        }
    },
    // 获取用户信息
    async getUserInfo({
        commit
    }, data) {
        let userInfo = {}
        let result = await reqUserInfo(data)
        if (result.successcode == 200) {
            // 获取到用户信息了，存储在本地
            userInfo = result.data
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
        } else {
            // 检查本地是否有用户的登录信息
            userInfo = JSON.parse(localStorage.getItem('userInfo'))
        }
        // 提交存储
        commit('USERINFO', {
            userInfo
        })
    },
    // 用户修改密码
    async EditPassword({
        commit
    }, data) {
        let result = await reqEditPassword(data)
        if(result.successcode == 200){
            return 'ok'
        }else if(result.errcode == 101){
            return 'errpwd'
        }
    },
    // 用户修改个人信息
    async EditPersonalData({commit},data){
        let result = await reqEditPersonalData(data)
        if(result.successcode == 200){
            return 'ok'
        }
    },
    // 用户获取短信验证码
    async getCode({commit},data){
        let result = await reqGetPhoneCode(data)
        if(result.successcode == 200){
            return 'ok'
        }else if(result.errcode == 0){
            return 'err'
        }

    },
    // 用户提交修改电话号码
    async changeUserPhone({commit},data){
        let result = await reqChangePhoneNum(data)
        if(result.successcode == 200){
            return 'ok'
        }else if(result.errcode == 101){
            return 'err'
        }
    },
    // 用户查询自己的订单信息
    async getPersonalTradeInfo({commit},data){
        let result = await reqPersonalTrade(data)
        if(result.errcode == 1){
            return 'noexist'
        }else if(result.successcode == 200){
            return result.message
        }
    },
    // 用户对商品进行评价
    async submitComment({commit},data){
        let result = await reqSubmitComment(data)
        if(result.successcode == 200){
            return 'ok'
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}