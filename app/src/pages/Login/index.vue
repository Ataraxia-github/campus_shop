<template>
  <div class="maincontainer">
    <!-- 登录 -->
    <div class="loginbackground">
      <div class="login">
        <div class="loginform">
          <div class="loginformtop">
            <a class="title">账户登录</a>
          </div>
          <div class="content">
            <form action="##">
              <div class="inputcontent">
                <span></span>
                <input
                  type="text"
                  placeholder="请输入用户名"
                  v-model="username"
                />
              </div>
              <div class="inputcontent">
                <span class="pwd"></span>
                <input
                  type="password"
                  placeholder="请输入密码"
                  v-model="userpwd"
                />
              </div>
              <div class="inputcontent">
                <span></span>
                <input
                  type="text"
                  placeholder="请输入验证码"
                  v-model="code"
                  class="codeinput"
                />
                <div class="code" @click="refreshCode">
                  <Sidentify :identifyCode="identifyCode"></Sidentify>
                </div>
              </div>
              <button class="btn" @click.prevent="login">
                登&nbsp;&nbsp;录
              </button>
            </form>
            <div>
              <router-link class="register" to="/register"
                >还没有账号？立即去注册-></router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <HeaderFoot></HeaderFoot>
  </div>
</template>

<script>
import HeaderFoot from "@/components/HeaderFoot";
// 引入elementUI消息弹出框
import { MessageBox } from "element-ui";
import Sidentify from "@/components/Identify/index.vue";

export default {
  name: "Login",
  data() {
    return {
      username: "", //登录输入的用户名
      userpwd: "", //登录输入的密码
      userInfo: {}, //用户信息
      code: "", //验证码
      identifyCodes: "1234567890",
      identifyCode: "",
    };
  },
  components: {
    HeaderFoot,
    Sidentify,
  },
  methods: {
    // 点击登录按钮
    async login() {
      if (!this.username) {
        MessageBox({
          type: "info",
          message: "请输入用户名!",
          showClose: true,
        });
        return;
      } else if (!this.userpwd) {
        MessageBox({
          type: "info",
          message: "请输入密码!",
          showClose: true,
        });
        return;
      } else if (!this.code) {
        MessageBox({
          type: "info",
          message: "请输入验证码!",
          showClose: true,
        });
        return;
      }
      if (
        this.username &&
        this.userpwd &&
        this.code &&
        this.code == this.identifyCode
      ) {
        // 解构，传送数据
        const { username, userpwd } = this;
        // 调用登录接口，发送请求
        let res = await this.$store.dispatch("userLogin", {
          username,
          userpwd,
        });
        // 用户名输错
        if (res == "errusername") {
          MessageBox({
            type: "info",
            message: "对不起，该用户名不存在!",
            showClose: true,
          });
          // 密码输错
        } else if (res == "errpwd") {
          MessageBox({
            type: "info",
            message: "登录失败, 密码不正确!",
            showClose: true,
          });
        } else {
          MessageBox({
            type: "info",
            message: "登录成功!",
            showClose: true,
          });
          // 用户名和密码都输对，登录成功，拿到用户登录信息
          this.userInfo = res.data;
          // 清空用户刚才的登录输入
          this.username = "";
          this.userpwd = "";
          this.$router.push("/home");
          // 因为localStorage/sessionStorage默认只能存储字符串
          localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
          // 删掉原来可能存放的管理者账户信息
          window.localStorage.removeItem("adminInfo");
        }
      } else if (
        this.username &&
        this.userpwd &&
        this.code &&
        this.code != this.identifyCode
      ) {
        MessageBox({
          type: "error",
          message: "验证码错误，请重新输入！",
        });
        this.code = "";
        this.refreshCode();
      }
    },
    // 生成随机数字
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 点击刷新验证码
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode +=
          this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
      }
      // console.log(this.identifyCode);
    },
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  watch: {
    $route() {
      try {
        this.code = "";
        this.refreshCode();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;

  .maincontainer {
    // 背景图片
    .loginbackground {
      height: 600px;
      background: url(./images/loginbg.png) no-repeat;
      background-position: -200px -150px;

      .login {
        width: 1200px;
        height: 600px;
        margin: 0 auto;
      }

      .loginform {
        width: 420px;
        height: 420px;
        box-sizing: border-box;
        background: #fff;
        float: right;
        top: 100px;
        position: relative;
        padding: 20px;

        .loginformtop {
          .title {
            border-bottom: none;
            color: #1d6409;
            width: 100%;
            display: block;
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 20px;
            font-weight: 700;
            border-top: 1px solid #ddd;
            border-left: 1px solid #ddd;
            border-right: 1px solid #ddd;
            box-sizing: border-box;
            text-decoration: none;
          }
        }

        .content {
          width: 380px;
          height: 330px;
          box-sizing: border-box;
          border: 1px solid #ddd;
          border-top: none;
          padding: 18px;

          form {
            margin: 15px 0 18px 0;
            font-size: 12px;
            line-height: 18px;

            .inputcontent {
              margin-bottom: 20px;

              span {
                float: left;
                width: 37px;
                height: 32px;
                border: 1px solid #ccc;
                background: #479232;
                box-sizing: border-box;
                border-radius: 2px 0 0 2px;
                margin-top: 10px;
              }

              .pwd {
                background-position: -72px -201px;
                margin-top: 10px;
              }

              .codeinput {
                width: 180px;
                height: 32px;
              }

              .code {
                display: inline-block;
                margin-top: 5px;
                margin-left: 5px;
              }

              input {
                width: 302px;
                height: 32px;
                box-sizing: border-box;
                border: 1px solid #ccc;
                border-left: none;
                float: left;
                padding-top: 6px;
                padding-bottom: 6px;
                font-size: 14px;
                line-height: 22px;
                padding-right: 8px;
                padding-left: 8px;
                border-radius: 0 2px 2px 0;
                outline: none;
                margin-top: 10px;
              }
            }

            .btn {
              background-color: #479232;
              padding: 6px;
              border-radius: 0;
              font-size: 16px;
              font-family: 微软雅黑;
              word-spacing: 4px;
              border: 1px solid black;
              color: #fff;
              width: 100%;
              height: 40px;
              margin-top: 40px;
              outline: none;
            }
          }

          .register {
            float: right;
            font-size: 15px;
            line-height: 38px;
            text-decoration: underline;
          }

          .register:hover {
            color: #fa1d11;
          }
        }
      }
    }
  }
}
</style>