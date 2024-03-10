import {
    reqAdminLogin,
    reqAdminLogout,
    reqAllUsersData,
    reqAllgoods,
    reqDeleGoods,
    reqEditGoods,
    reqChangeGoodscate,
    reqSubmitFormData,
    reqGetAllTradeInfo,
    reqTradeDetailInfo,
    reqSubmitNotice,
    reqDeleteNotice,
    reqConfirmGoodsId,
    reqAdmitRecommend,
    reqEditAdminPwd,
    reqSearchGoods,
    reqHandleTradeStatus,
    reqAllComments,
    reqDelComment
} from "@/api"

const state = {
    recommendlist: []
}
const mutations = {
    RECOMMEND(state,recommendlist){
        // 清空之前的存储
        this.recommendlist = []
        state.recommendlist = recommendlist
    }
}
const actions = {
    // 管理员登录
    async getAdminLogin({
        commit
    }, data) {
        let result = await reqAdminLogin(data)
        if (result.errcode == 1) {
            return 'notexist'
        }
        if (result.errcode == 2) {
            return 'errlogin'
        } else if (result.successcode == 200) {
            return result.message
        }
    },
    // 管理员退出系统
    async AdminLogout({
        commit
    }) {
        let result = await reqAdminLogout()
        if (result.successcode == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('false'))
        }
    },
    // 管理员修改密码
    async EditAdminPwd({commit},data){
        let result = await reqEditAdminPwd(data)
        if(result.successcode == 200){
            return 'ok'
        }else if(result.errcode == 101){
            return 'errpwd'
        }
    },
    // 管理员查看所有用户信息
    async getUsersData({commit}){
        let result = await reqAllUsersData()
        if(result.successcode == 200){
            return result.message
        }
    },
    // 管理员查看所有商品的信息
    async getAllGoods({commit}){
        let result = await reqAllgoods()
        if(result.successcode == 200){
            return result.message
        }
    },
    // 管理员下架某个商品
    async deleteGoods({commit},data){
        let result = await reqDeleGoods(data)
        if(result.successcode == 200 ){
            return 'ok'
        }
    },
    // 管理员编辑修改某个商品信息
    async editGoods({commit},data){
        let result = await reqEditGoods(data)
        if(result.successcode == 200){
            return 'ok'
        }
    },
    // 管理员获取商品具体分类名字和id
    async changeGoodsCate({commit}){
        let result = await reqChangeGoodscate()
        return result.message
    },
    // 管理员上架商品提交表单
    async submitFormData({commit},data){
        let result = await reqSubmitFormData(data)
        if(result.successcode == 200){
            return 'ok'
        }else if(result.errcode == 100){
            return 'errexist'
        }else if(result.errcode == 101){
            return 'servererr'
        }
    },
    // 管理员查看所有订单的数据
    async getAllTradeInfo({commit}){
        let result = await reqGetAllTradeInfo()
        if(result.successcode == 200){
            return result.message
        }
    },
    // 管理员查看每一笔订单的具体信息
    async getTradeDetailInfo({commit},data){
        let result = await reqTradeDetailInfo(data)
        if(result.successcode == 200){
            // 这里返回的就是每一个订单里的商品信息
            return result.message[0]
        }
    },
    // 管理员删除当前已发布的公告
    async deleteCurrent({commit}){
        let result = await reqDeleteNotice()
    },
    // 管理员发布新公告
    async publishNotice({commit},data){
        let result = await reqSubmitNotice(data)
        if(result.successcode == 200){
            return 'ok'
        }
    },
    // 管理员输入推荐的商品ID
    async confirmGoodsId({commit},data){
        let result = await reqConfirmGoodsId(data)
        if(result.successcode == 200){
            return 'ok'
        }else if(result.errcode == 101){
            return 'err'
        }
    },
    // 管理员确认提交推荐商品
    async admitRecommend({commit},data){
        let result = await reqAdmitRecommend(data)
        if(result.successcode == 200){
            commit('RECOMMEND',result.message)
        }
    },
    // 管理员搜索商品
    async adminQuickSearch({commit},data){
        let result = await reqSearchGoods(data)
        if(result.successcode == 200 ){
            return result.message    
        }else if(result.errcode == 0){
            return 'null'
        }
    },
    // 管理员处理订单状态
    async handleTradeStatus({commit},data){
        let result = await reqHandleTradeStatus(data)
        if(result.successcode == 200){
            return 'ok'
        }
    },
    // 管理员查看所有评价信息
    async LookAllComments({commit}){
        let result = await reqAllComments()
        if(result.successcode == 200){
            return result.message
        }
    },
    // 商家删除某条评价
    async delComment({commit},data){
        let result = await reqDelComment(data)
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