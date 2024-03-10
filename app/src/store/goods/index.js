import Vue from 'vue'
// 和商品信息有关的仓库
import {reqGoodsDetail,reqAddToShopCart,reqShopCartData,reqUpdateShopCart,reqDeleCartGoods,reqClearCartAll,reqSubmitTrade,reqUpdateTradeGoods,reqGetComment,reqDelCartAccordingtoTrade} from '@/api/index'


const state = {
    goodsDetail: [],
    cartgoods: []
}
const mutations = {
    GOODSDETAIL(state,goodsDetail){
        state.goodsDetail = goodsDetail
    },
    SHOPCART(state,cartgoods){
        state.cartgoods = cartgoods
    },
    UPDATESHOPCART(state,{goods,count}){
        // 更新某个商品的购买数量
        let index = state.cartgoods.indexOf(goods)
        state.cartgoods[index].buycount = count
    },
    SELECTEDALLGOODS(state,isSelectedAll){
        state.cartgoods.forEach((goods) => {
            if(goods.checked){
                // 该属性存在的话
                goods.checked = !isSelectedAll
            }else{
                // Vue监视对象里的数据
                Vue.set(goods,'checked',!isSelectedAll)
            }
        })
    },
    SINGLESELECTED(state,{goods}){
        let index = state.cartgoods.indexOf(goods)
        if(!goods.checked){
            state.cartgoods[index].checked = true
        }else{
            state.cartgoods[index].checked = !state.cartgoods[index].checked
        }
    },
    DELSOMEGOODS(state,goods){
        goods.buycount = 0
        let index = state.cartgoods.indexOf(goods)
        state.cartgoods.splice(index,1)
    },
    CLEARCARTGOODS(state){
        state.cartgoods = []
    }
}
const actions = {
    // 获取商品详情信息
    async getGoodsDetail({commit},data){
        let result = await reqGoodsDetail(data)
        let goodsdetail = result.message
        commit('GOODSDETAIL',goodsdetail)
    },
    // 获取商品评价
    async getComment({commit},data){
        let result = await reqGetComment(data)
        if(result.errcode == 101){
            return 'notcomment'
        }else if(result.successcode == 200){
            return result.message
        }
    },
    // 添加商品到购物车
    async getToShopCart({commit},data){
        let result = await reqAddToShopCart(data)
        if(result.successcode == 200){
            let message = result.message
            return 'success'
        }else if(result.errcode == 2){
            return 'UnknownErr'
        }else if(result.errcode == 1){
            return 'occupyErr'
        }
    },
    // 查看购物车信息
    async getShopCartData({commit},data){
        let result = await reqShopCartData(data)
        if(result.successcode == 200){
            let cartgoods = result.message
            commit('SHOPCART',cartgoods)
        }
    },
    // 购物车界面可以修改商品数量，这个时候要继续更新用户id下的购物车数据
    async UpdateShopCart({commit},data){
        let result = await reqUpdateShopCart(data)
        if(result.successcode == 200){
            let goods = data.goods
            let count = data.count
            commit('UPDATESHOPCART',{goods,count})
        }
    }, 
    // 是否选中所有商品
    selectedAll({commit},isSelectedAll){
        commit('SELECTEDALLGOODS',isSelectedAll)
    },
    // 是否选中单个商品
    singleSelected({commit},goods){
        commit('SINGLESELECTED',goods)
    },
    // 删除购物车里的某个商品
    async delSomeGoods({commit},data){
        let result = await reqDeleCartGoods(data)
        if(result.successcode == 200){
            let goods = data.goods
            commit('DELSOMEGOODS',goods)
        }
    },
    // 清空购物车
    async clearCartGoods({commit},data){
        let result = await reqClearCartAll(data)
        if(result.successcode == 200){
            commit('CLEARCARTGOODS')
        }
    },
    // 用户提交订单
    async submitTradeInfo({commit},data){
        let result = await reqSubmitTrade(data)
        if(result.successcode == 200){
            return 'ok'
        }
    },
    // 订单生成成功，更新相应商品库存信息
    async updateTradeGoodsCount({commit},data){
        let result = await reqUpdateTradeGoods(data)
    },
    // 订单生成成功，购买成功的商品从购物车删除
    async delCartAccordingtoTrade({commit},data){
        let result = await reqDelCartAccordingtoTrade(data)
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