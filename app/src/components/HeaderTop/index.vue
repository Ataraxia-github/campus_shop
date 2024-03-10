<template>
  <div class="nav">
    <div>
      <p>欢迎来到校园生活超市!</p>
    </div>
    <ul>
     <li v-if="!userInfo||!userInfo.id">
        <router-link to="/login">您好,请登录</router-link>
        <router-link to="/register">免费注册</router-link>
      </li>
      <li v-else>
        <a v-if="userInfo.usernickname">您好，{{ userInfo.usernickname }}</a>
        <a v-else>您好，{{ userInfo.username }}</a>
        <a @click="headerLogout">退出登录</a>
      </li>
      <li v-if="this.$route.path.indexOf('/home') === -1">
        <router-link to="/home">返回首页</router-link>
      </li>
      <li><a @click.prevent="goPersonal">个人中心</a></li>
      <li><a @click.prevent="goShopCar">我的购物车</a></li>
      <li><a @click.prevent="goAdmin">商家后台</a></li> 
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { MessageBox } from 'element-ui';
export default {
  name: "HeaderTop",
  computed: {
    ...mapState({
      // 辅助函数写法，这样就可以直接用，不用写this.$store
      userInfo: (state) => state.user.userInfo
    }),
  },
  mounted(){
    // 如果识别到本地存储有用户的数据的话，则直接登录
    if(localStorage.getItem('userInfo')){
      let userid = this.userInfo.id
      this.$store.dispatch('getUserInfo',userid)
    }else{
      // 本地没有存储用户的登录信息，则是游客身份
      this.$message('您是用户未登录状态！')
    }
  },
  methods: {
    // 前往个人中心
    goPersonal() {
      if(this.userInfo.id){
        this.$router.replace("/personal");
      }else{
        MessageBox({
          type: 'info',
          message: '请先登录！',
          showClose: true,
        })
      }
    },
    // 前往购物车
    goShopCar() {
      if(this.userInfo.id){
        this.$router.replace("/shopcar");
      }else{
        MessageBox({
          type: 'info',
          message: '请先登录！',
          showClose: true,
        })
      }
    },
    // 退出登录
    headerLogout() {
      this.$confirm("是否确定退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!",
          });
          // 派发action，退出登录状态
          this.$store.dispatch('userLogout')
          // 退出登录的时候把本地存储的用户信息清掉
          localStorage.removeItem('userInfo')
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出！",
          });
        });
    },
    // 商家前往后台
    goAdmin(){
      this.$router.replace('/adminlogin')
    }
  },
};
</script>

<style scoped>
.nav {
  width: 100%;
  height: 30px;
  background: #f2f2f2;
  top: 0px;
  /* flex布局 */
  display: flex;
  /* 垂直居中 */
  align-items: center;
  /* 两端对齐，中间平分 */
  justify-content: space-between;
  border-bottom: 1px solid green;
}

.nav > div p {
  margin: 0 30px 0 20px;
  color: green;
  font-size: 15px;
  font-weight: bold;
}
.nav > ul {
  margin: 0 50px;
  list-style: none;
  display: flex;
  align-items: center;
}

.nav > ul > li > a {
  display: inline-block;
  padding: 5px 20px;
  font-size: 12px;
  line-height: 20px;
  color: #999;
  text-decoration: none;
  cursor: pointer;
}
/* 悬浮效果 */
.nav > ul > li > a:hover {
  color: green;
}
/* 默认高亮效果 */
.nav > ul > li:first-child > a:nth-child(2) {
  padding-left: 0;
  color: green;
}

</style>