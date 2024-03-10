<template>
  <div class="personal">
    <!-- 导航栏 -->
    <nav class="navbar">
      <router-link class="navbar-brand" to="/home">大学城校园超市</router-link>
      <span class="nav_title">个人中心</span>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" @click="logout">退出登录</a>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/home">返回商城</router-link>
        </li>
      </ul>
    </nav>
    <!-- 侧边选项栏 -->
    <el-container style="height: 600px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu default-active="1" class="el-menu-vertical-demo">
          <el-menu-item index="1" @click="goTo('/personal/personaldata')">
            <i class="el-icon-document-copy"></i>
            <span slot="title">个人资料</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-edit"></i>
              <span>编辑个人资料</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="goTo('/personal/update')">修改基本信息</el-menu-item>
              <el-menu-item index="2-2" @click="goTo('/personal/editphone')">修改手机号</el-menu-item>
              <el-menu-item index="2-3" @click="goTo('/personal/editpassword')">修改密码</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="3" @click="goTo('/personal/sales')">
            <i class="el-icon-collection-tag"></i>
            <span>我的订单</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 路由页面展示 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
export default {
  name: "Personal",
  methods: {
    // 路由跳转
    goTo(path) {
      this.$router.replace(path);
    },
    // 返回首页
    goBack() {
      this.$router.replace("/home");
    },
    // 用户在个人中心退出登录
    logout() {
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
          this.$store.dispatch("userLogout");
          this.$router.replace("/home");
          // 退出登录的时候把本地存储的用户信息清掉
          localStorage.removeItem("userInfo");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出！",
          });
        });
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #ccc;
}
a:hover {
  color: white;
}

/* 最上方的导航栏 */
.navbar {
  width: 100%;
  height: 48px;
  background: #343a40;
  box-sizing: border-box;
  position: relative;
}
.navbar-brand {
  display: inline-block;
  width: 196px;
  height: 48px;
  line-height: 48px;
  font-size: 1rem;
  text-align: left;
  color: white;
  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
  margin-left: 0px;
  padding-left: 5px;
  text-decoration: none;
}
.nav_title {
  display: inline-block;
  width: 30%;
  height: 35px;
  color: white;
  position: absolute;
  text-align: center;
  font-size: 1.2rem;
  line-height: 35px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.navbar-nav {
  flex-direction: row !important;
  width: 20%;
  height: 48px;
  float: right;
  background: #343a40;
}
.navbar-nav > .nav-item {
  display: block;
  height: 48px;
  float: right;
  line-height: 48px;
  margin-right: 40px;
  cursor: pointer;
}

.el-aside {
  color: #333;
}
</style>