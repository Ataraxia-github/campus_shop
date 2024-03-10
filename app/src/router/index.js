// 1. 引入对应模块
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store';

const Home = () => import('../pages/Home/index.vue');
const Register = () => import('../pages/Register/index.vue');
const Login = () => import('../pages/Login/index.vue');
const Goods = () => import('../pages/Goods/index.vue')
const Personal = () => import('../pages/Personal/index.vue');
const ShopCar = () => import('../pages/Shopcar/index.vue');
const Trade = () => import('../pages/Trade/index.vue')
const Pay = () => import('../pages/Pay/index.vue')
const Search = () => import('../pages/Search/index.vue');
const SearchDetail = () => import('../pages/SearchDetail/index.vue');
const EditPhone = () => import('../pages/Personal/Children/EditPhone.vue')
const EditPassword = () => import('../pages/Personal/Children/EditPassword.vue')
const PersonalData = () => import('../pages/Personal/Children/PersonalData.vue')
const Update = () => import('../pages/Personal/Children/Update.vue')
const Sales = () => import('../pages/Personal/Children/Sales.vue')
const AdminLogin = () => import('../pages/AdminLogin/index.vue')
const Admin = () => import('../pages/Admin/index.vue')
const EditAdminPwd = () => import('../pages/Admin/Children/EditAdminPwd.vue')
const AddGoods = () => import('../pages/Admin/Children/AddGoods.vue')
const EditGoods = () => import('../pages/Admin/Children/EditGoods.vue')
const MasterGoods = () => import('../pages/Admin/Children/MasterGoods.vue')
const MasterSales = () => import('../pages/Admin/Children/MasterSales.vue')
const MasterUsers = () => import('../pages/Admin/Children/MasterUsers.vue')
const supplierAllBack = () => import('../pages/Admin/Children/supplierAllBack.vue')
const Addnotice = () => import('../pages/Admin/Children/Addnotice.vue')
const Recommend = () => import('../pages/Admin/Children/Recommend.vue')
const HandleComments = () => import('../pages/Admin/Children/HandleComments.vue')

// 2. 声明使用
Vue.use(VueRouter);
// 解决重复跳转会报错的问题
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => {})
}

// 3. 输出路由对象
let router = new VueRouter({
  routes: [{
      path: '/home',
      component: Home,
      meta: {
        showHeaderTop: true,
        showHeaderSearch: true,
        showHeaderFoot: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register,
    },
    {
      // 动态路由接收传递过来的params参数
      path: '/search/:id/:pageNo',
      component: Search,
      meta: {
        showHeaderTop: true,
        showHeaderSearch: true
      }
    },
    {
      path: '/searchdetail',
      component: SearchDetail,
      meta: {
        showHeaderTop: true,
        showHeaderSearch: true
      }
    },
    {
      path: '/goods/:id',
      component: Goods,
      meta: {
        showHeaderTop: true
      }
    },
    {
      path: '/personal',
      component: Personal,
      showHeaderTop: false,
      showHeaderFoot: false,
      children: [{
          path: 'personaldata',
          component: PersonalData
        },
        {
          path: 'update',
          component: Update
        },
        {
          path: 'editpassword',
          component: EditPassword
        },
        {
          path: 'editphone',
          component: EditPhone
        },
        {
          path: 'sales',
          component: Sales
        },
        {
          path: '/personal',
          redirect: '/personal/personaldata'
        }
      ],
    },
    {
      path: '/shopcar',
      component: ShopCar,
      meta: {
        showHeaderTop: true,
        showHeaderFoot: false
      }
    },
    // 支付路由
    {
      path: '/pay',
      component: Pay,
      meta: {
        showHeaderTop: true,
        showHeaderSearch: false,
        showHeaderFoot: false
      },
      beforeEnter: (to, from, next) => {
        if (from.path == '/trade') {
          next()
        } else {
          // 其他的路由组件而来，停留在当前
          next(false)
        }
      }
    },
    // 结算路由
    {
      path: '/trade',
      component: Trade,
      meta: {
        showHeaderTop: true,
        showHeaderSearch: false,
        showHeaderFoot: false
      },
      // 路由独享守卫
      beforeEnter: (to, from, next) => {
        // 去交易页面，必须是从购物车而来
        if (from.path == '/shopcar') {
          next()
        } else {
          // 其他的路由组件而来，停留在当前
          next(false)
        }
      }
    },
    {
      path: '/adminlogin',
      component: AdminLogin,
      meta: {
        showHeaderTop: false,
        showHeaderFoot: false
      }
    },
    {
      path: '/admin',
      component: Admin,
      children: [{
          path: 'editadminpwd',
          component: EditAdminPwd
        },
        {
          path: 'addgoods',
          component: AddGoods
        },
        {
          path: 'editgoods',
          component: EditGoods
        },
        {
          path: 'mastergoods',
          component: MasterGoods
        },
        {
          path: 'mastersales',
          component: MasterSales
        },
        {
          path: 'masterusers',
          component: MasterUsers
        },
        {
          path: 'supplierallback',
          component: supplierAllBack
        },
        {
          path: 'addnotice',
          component: Addnotice
        },
        {
          path: 'recommend',
          component: Recommend
        },
        {
          path: 'handlecomments',
          component: HandleComments
        },
        // 重定向
        {
          path: '/admin',
          redirect: '/admin/mastergoods'
        }
      ]
    },
    // 重定向
    {
      path: '*',
      redirect: '/home'
    },
  ]
})
// 全局守卫、前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
  // to 可以获取到你要跳转到那个路由信息
  // from 可以获取到你从哪个路由而来的信息
  // next放行函数   next()放行  next(path)放行到指定路由
  if (store.state.user.userInfo != null) {
    // 仓库里的用户信息不为空
    let userid = store.state.user.userInfo.id
    // 用户登录成功
    if (userid) {
      if (to.path == '/login') {
        // 不能再去login了，只能停留在首页home
        next('/home')
      } 
      else {
        next()
      }
    }
    else {
       // 没有id值，登录情况异常
       let toPath = to.path
       if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/personal') != -1) {
         // 把想去而没有去成的信息，存储于地址栏当中
         next('/login?redirect=' + toPath)
       } else {
         next()
       }
     }
  } 
  // 仓库里没有用户的信息，说明压根未登录
  else if (store.state.user.userInfo == null)
  {
    let toPath = to.path
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/personal') != -1) {
      // 把未登录时候想去而没有去成的信息，存储于地址栏当中
      next('/login?redirect=' + toPath)
    } else {
      next()
    }
  }
})

export default router