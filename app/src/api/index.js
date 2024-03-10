import {requests,HandleQuery,Server_URL} from "./request";


// 获取首页轮播图
export const reqHomeCasual = () => {
    //发请求，axios发请求返回结果promise对象
    return requests({
        url: '/homecasual',
        method: 'get'
    })
}

// 获取首页商品分类列表
export const reqHomeCategory = () => {
    return requests({
        url: '/category',
        method: 'get'
    })
}

// 获取首页公告信息
export const reqGetNoticeInfo = () => {
    return requests({
        url: '/getnoticeinfo',
        method: 'get'
    })
}

// 获取首页推荐的商品卡片
export const reqRecommendList = () => {
    return requests({
        url: '/getrecommendlist',
        method: 'get'
    })
}

// 随机获取商品卡片进行展示
export const reqRandomGoods = () => {
    return requests({
        url: '/randomgoods',
        method: 'get'
    })
}

// 带query参数的get请求！！！！
// 点击首页商品分类列表展示商品卡片，特地处理路径中的query参数
export const reqCategoryToGoods = (params) => HandleQuery(Server_URL + '/categorytogoods', params);

// 带query参数的get请求！！！！
// 请求商品详细数据
export const reqGoodsDetail = (params) => HandleQuery(Server_URL + '/goodsdetail', params);

// 带query参数的get请求！！！！
// 查看购物车信息
export const reqShopCartData = (params) => HandleQuery(Server_URL + '/watchshopcart', params);


// 用户注册
export const reqUserRegister = (data) => {
    return requests({
        url: '/userregister',
        method: 'post',
        data
    })
}

// 用户名和密码登录
export const reqLogin = (data) => {
    return requests({
        url: '/userlogin',
        method: 'post',
        data
    })
}

// 用户退出登录
export const reqLogout = () => {
    return requests({
        url:'/userlogout',
        method: 'get'
    })
}

// 用户成功登录后，根据session获取用户信息
export const reqUserInfo = (data) => {
    return requests({
        url: '/userinfo',
        method: 'get',
        data
    })
}

// 添加商品到购物车
export const reqAddToShopCart = (data) => {
    return requests({
        url: '/addshopcart',
        method: 'post',
        data
    })
}

// 购物车页面还可以修改购买数量，这时要更新购物车数据
export const reqUpdateShopCart = (data) => {
    return requests({
        url: '/changegoodscount',
        method: 'post',
        data
    })
}

// 删除购物车的某个商品
export const reqDeleCartGoods = (data) => {
    return requests({
        url: '/deletecartgoods',
        method: 'post',
        data
    })
}

// 清空购物车
export const reqClearCartAll = (data) => {
    return requests({
        url: '/clearcartallgoods',
        method: 'post',
        data
    })
}

// 搜索商品
export const reqSearchGoods = (data) => {
    return requests({
        url: '/searchgoods',
        method: 'post',
        data
    })
}

// 用户提交订单
export const reqSubmitTrade = (data) => {
    return requests({
        url: '/tradeinfo',
        method: 'post',
        data
    })
}

// 订单生成后，更新相应商品的库存信息
export const reqUpdateTradeGoods = (data) => {
    return requests({
        url: '/updatetradegoodscount',
        method: 'post',
        data
    })
}

// 订单生成后，购买成功的商品从购物车中删除
export const reqDelCartAccordingtoTrade = (data) => {
    return requests({
        url: '/delcartaccordingtotrade',
        method: 'post',
        data
    })
}

// 用户修改密码
export const reqEditPassword = (data) => {
    return requests({
        url: '/editpassword',
        method: 'post',
        data
    })
}

// 用户修改个人信息
export const reqEditPersonalData = (data) => {
    return requests({
        url: '/edituserinfo',
        method: 'post',
        data
    })
}

// 用户修改电话号码时获取验证码
export const reqGetPhoneCode = (data) => {
    return requests({
        url: '/getphonecode',
        method: 'post',
        data
    })
}

// 用户修改电话号码提交后台
export const reqChangePhoneNum = (data) => {
    return requests({
        url: '/changephonenum',
        method: 'post',
        data
    })
}

// 用户查询自己的订单信息
export const reqPersonalTrade = (data) => {
    return requests({
        url: '/getpersonaltrade',
        method: 'post',
        data
    })
}

// 用户对商品进行评价
export const reqSubmitComment = (data) => {
    return requests({
        url: '/submitcomment',
        method: 'post',
        data
    })
}

// 商品详情页面获取评价信息
export const reqGetComment = (data) => {
    return  requests({
        url: '/getcomment',
        method: 'post',
        data
    })
}


// 管理员登录
export const reqAdminLogin = (data) => {
    return requests({
        url: '/adminlogin',
        method: 'post',
        data
    })
}

// 管理员退出登录
export const reqAdminLogout = () => {
    return requests({
        url: '/adminlogout',
        method: 'get',
    })
}

// 管理员修改密码
export const reqEditAdminPwd = (data) => {
    return requests({
        url: '/editadminpwd',
        method: 'post',
        data
    })
}

// 管理员查看用户信息
export const reqAllUsersData = () => {
    return requests({
        url: '/getallusers',
        method: 'get'
    })
}

// 管理员查看所有商品的信息
export const reqAllgoods = () => {
    return requests({
        url: '/getallgoods',
        method: 'get'
    })
}

// 管理员下架某个商品
export const reqDeleGoods = (data) => {
    return requests({
        url: '/deletegoods',
        method: 'post',
        data
    })
}

// 管理员修改编辑某个商品
export const reqEditGoods = (data) => {
    return requests({
        url: '/updategoodsinfo',
        method:'post',
        data
    })
}

// 管理员改变商品分类
export const reqChangeGoodscate = () => {
    return requests({
        url: '/admincategoryname',
        method: 'get'
    })
}

// 管理员上新商品提交表单
export const reqSubmitFormData = (data) => {
    return requests({
        url: '/addgoodsinfo',
        method: 'post',
        data
    })
}

// 管理员查看所有订单数据
export const reqGetAllTradeInfo = () => {
    return requests({
        url: 'getAllTradeInfo',
        method: 'get'
    })
}

// 管理员查看订单的具体信息
export const reqTradeDetailInfo = (data) => {
    return requests({
        url: '/gettradedetail',
        method: 'post',
        data
    })
}

// 管理员删除当前已发布了的公告
export const reqDeleteNotice = () => {
    return requests({
        url: '/deletecurrentnotice',
        method: 'post'
    })
}

// 管理员发布新公告
export const reqSubmitNotice = (data) => {
    return requests({
        url: '/publishnotice',
        method: 'post',
        data
    })
}

// 管理员输入推荐的商品ID
export const reqConfirmGoodsId = (data) => {
    return requests({
        url: '/confirmgoodsid',
        method: 'post',
        data
    })
}

// 管理员确认提交推荐商品
export const reqAdmitRecommend = (data) => {
    return requests({
        url: '/admitRecommend',
        method: 'post',
        data
    })
}

// 管理员处理订单状态
export const reqHandleTradeStatus = (data) => {
    return requests({
        url: '/handletradestatus',
        method: 'post',
        data
    })
}

// 管理员查看所有评价信息
export const reqAllComments = () => {
    return requests({
        url: '/allcomments',
        method: 'get'
    })
}

// 管理员删除某条评价
export const reqDelComment = (data) => {
    return requests({
        url: '/delcomment',
        method: 'post',
        data
    })
}




