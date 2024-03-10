<template>
  <div id="admin">
    <!-- 导航栏 -->
    <nav class="navbar">
      <router-link class="navbar-brand" to="/home">大学城校园超市</router-link>
      <span class="nav_title">欢迎来到大学城校园超市后台系统</span>
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
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-menu-item index="1" @click="goTo('/admin/editadminpwd')">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">修改登录密码</span>
          </el-menu-item>
          <el-menu-item index="2" @click="goTo('/admin/mastergoods')">
            <i class="el-icon-s-shop"></i>
            <span slot="title">商品信息</span>
          </el-menu-item>
          <el-menu-item index="3" @click="goTo('/admin/addgoods')">
            <i class="el-icon-edit"></i>
            <span slot="title">商品上新</span>
          </el-menu-item>
          <el-menu-item index="4" @click="goTo('/admin/masterusers')">
            <i class="el-icon-s-custom"></i>
            <span>查看用户</span>
          </el-menu-item>
          <el-menu-item index="5" @click="goTo('/admin/mastersales')">
            <i class="el-icon-s-data"></i>
            <span>订单管理</span>
          </el-menu-item>
          <el-menu-item index="6" @click="goTo('/admin/addnotice')">
            <i class="el-icon-folder-add"></i>
            <span>发布公告</span>
          </el-menu-item>
          <el-menu-item index="7" @click="goTo('/admin/recommend')">
            <i class="el-icon-thumb"></i>
            <span>首页推荐</span>
          </el-menu-item>
          <el-menu-item index="8" @click="goTo('/admin/handlecomments')">
            <i class="el-icon-notebook-2"></i>
            <span>管理评价</span>
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
export default {
  name: "Admin",
  methods: {
    // 管理员退出登录
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
          this.$store.dispatch("AdminLogout");
          this.$router.replace("/home");
          // 退出登录的时候把本地存储的用户信息清掉
          localStorage.removeItem("adminInfo");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出！",
          });
        });
    },
    // 路由页面显示
    goTo(path){
        this.$router.replace(path);
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