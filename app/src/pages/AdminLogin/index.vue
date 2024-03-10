<template>
  <!-- 包住整个页面的大框 -->
  <div class="container">
    <!-- 包住登录页面的框 -->
    <div class="login-inner">
      <!-- 登录框头部 -->
      <div class="login-header">欢迎来到后台管理系统</div>
      <!-- 表单验证部分 -->
      <div class="login-content">
        <form>
          <input
            type="text"
            placeholder="用户名"
            class="input"
            v-model="adminname"
          />
          <input
            type="password"
            placeholder="密码"
            class="input"
            v-model="adminpwd"
            maxlength="18"
          />
        </form>
      </div>
      <!-- 按钮 -->
      <div class="login-button">
        <button class="login-submit" @click.prevent="login">登录</button>
        <button class="login-back" @click.prevent="goBack">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "element-ui";
export default {
  name: "AdminLogin",
  data() {
    return {
      adminname: "",
      adminpwd: "",
      adminInfo: {},
    };
  },
  methods: {
    // 管理员登录
    async login() {
      if (!this.adminpwd) {
        MessageBox({
          type: "info",
          message: "请输入管理员密码!",
          showClose: true,
        });
        return;
      }
      let res = await this.$store.dispatch("getAdminLogin", {
        adminname: this.adminname,
        adminpwd: this.adminpwd,
      });
      if (res == "notexist") {
        MessageBox({
          type: "info",
          message: "该管理员账号不存在！",
          showClose: true,
        });
      } else if (res == "errlogin") {
        MessageBox({
          type: "info",
          message: "密码不正确，登录失败!",
          showClose: true,
        });
      } else {
        MessageBox({
          type: "success",
          message: "登录成功!",
          showClose: true,
        });
        this.adminInfo.adminname = this.adminname;
        this.$router.replace("/admin");
        // 把管理者账号信息存到本地
        localStorage.setItem("adminInfo", JSON.stringify(this.adminInfo));
        // 删掉原来本地存放的用户信息
        localStorage.removeItem("userInfo");
        // 清空输入框的输入
        this.adminname = ''
        this.adminpwd = ''
      }
    },
    // 返回按钮
    goBack(){
      this.$router.replace('/home')
    }
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background: #fff;
}
.login-inner {
  width: 25%;
  height: 100%;
  margin: 50px auto;
}
.login-header {
  height: 100px;
  font: 600 25px Arial;
  text-align: center;
  padding-top: 50px;
  box-sizing: border-box;
}
.login-content {
  width: 100%;
  height: 200px;
  display: flex; /*设置为flex布局*/
  justify-content: center; /*水平居中*/
  align-items: center; /*垂直居中*/
}
.login-content > form {
  width: 100%;
}

.input {
  display: block;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  outline: 0;
  margin: 20px 0px;
  border-radius: 4px;
  font: 400 14px Arial;
}

.input:focus {
  border: 1px solid mediumpurple;
}

.login-submit {
  display: block;
  width: 100%;
  height: 42px;
  margin-top: 10px;
  border-radius: 4px;
  background: mediumpurple;
  color: #fff;
  text-align: center;
  font-size: 16px;
  line-height: 42px;
  border: 0;
}

.login-back {
  display: block;
  width: 100%;
  height: 42px;
  margin-top: 15px;
  border-radius: 4px;
  background: transparent;
  border: 1px solid mediumpurple;
  color: mediumpurple;
  text-align: center;
  font-size: 16px;
  line-height: 42px;
}
</style>