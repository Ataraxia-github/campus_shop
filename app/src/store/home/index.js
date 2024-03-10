import {
    reqCategoryToGoods,
    reqHomeCasual, reqHomeCategory,reqSearchGoods,reqGetNoticeInfo,reqRecommendList,reqRandomGoods
} from '@/api'

const state = {
    homecasual: [],
    homecategory: [],
    catetogoodsitem: [],
    searchres: []
}
const mutations = {
    HOMECASUAL(state,homecasual){
        state.homecasual = homecasual
    },
    HOMECATEGORY(state,homecategory){
        state.homecategory = homecategory
    },
    CATETOGOODSITEM(state,catetogoodsitem){
        state.catetogoodsitem = catetogoodsitem
    },
    SEARCHKEYWORDS(state,searchres){
        state.searchres = searchres
    },
    CLEARSEARCHINFO(state){
        state.searchres = []
    }
}
const actions = {
    // 获取首页轮播图
    async getHomeCasual({commit}){
        let result = await reqHomeCasual()
        if(result.successcode == 200){
            commit('HOMECASUAL',result.message) 
        }
    },
    // 获取首页商品列表
    async getCategory({commit}){
        let result = await reqHomeCategory()
        if(result.successcode == 200){
            commit('HOMECATEGORY',result.message) 
        }
    },
    // 点击首页商品列表后获取商品信息卡片
    // 携带的参数是，分类，页码，每一页展示多少
    async getCategoryToGoods({commit},data){
        let result = await reqCategoryToGoods(data)
        if( result.successcode == 200){
            commit('CATETOGOODSITEM',result.message)
        }
    },
    // 搜索商品
    async goToSearch({commit},data){
        let result = await reqSearchGoods(data)
        if(result.successcode == 200 ){
            let searchres = result.message
            commit('SEARCHKEYWORDS',searchres)
        }else if(result.errcode == 0){
            // 如果找不到商品，就把仓库里存储的搜索信息清掉
            commit('CLEARSEARCHINFO')
        }
    },
    // 获取公告信息
    async getNoticeInfo({commit}){
        let result = await reqGetNoticeInfo()
        if(result.successcode == 200){
            return result.message
        }else if (result.errcode == 101){
            return 'null'
        }
    },
    // 获取推荐的商品卡片
    async getRecommend({commit}){
        let result = await reqRecommendList()
        if(result.successcode == 200){
            return result.message
        }
    },
    // 随机获取商品卡片进行展示
    async getRandomGoods({commit}){
        let result = await reqRandomGoods()
        if(result.successcode == 200){
            return result.message
        }
    }
}
const getters = {
}

export default {
    state,
    mutations,
    actions,
    getters
}