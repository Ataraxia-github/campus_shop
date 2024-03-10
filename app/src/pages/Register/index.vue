<template>
  <div class="maincontainer">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        益达超市---注册新用户
        <span class="go"
          >我有账号，去 <router-link to="/login">登录</router-link>
        </span>
      </h3>
      <div class="content">
        <label>用户名:</label>
        <input
          type="text"
          placeholder="请输入用户名"
          v-model="username"
          name="username"
        />
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="password"
          placeholder="请输入您的登录密码"
          v-model="userpwd"
          name="userpwd"
        />
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="password"
          placeholder="请输入确认密码"
          v-model="userpwd1"
          name="userpwd1"
        />
      </div>
      <div class="content">
        <label>验证码:</label>
        <input
          type="text"
          placeholder="请输入验证码"
          v-model="code"
          name="code"
        />
        <div class="code" @click="refreshCode">
          <Sidentify :identifyCode="identifyCode"></Sidentify>
        </div>
      </div>
      <div class="controls">
        <input type="checkbox" v-model="agree" />
        <span>同意协议并注册《益达超市协议》</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>
  </div>
</template>

<script>
// 引入elementUI消息弹出框
import { MessageBox } from "element-ui";
import Sidentify from "@/components/Identify/index.vue";
export default {
  name: "Register",
  components: {
    Sidentify,
  },
  data() {
    return {
      // 收集表单用户名
      username: "",
      // 用户输入的验证码
      code: "",
      // 密码
      userpwd: "",
      // 确认密码
      userpwd1: "",
      // 是否同意
      agree: true,
      identifyCodes: "1234567890",
      identifyCode: "",
    };
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    // 点击登录
    async userRegister() {
      if (!this.username || !this.userpwd || !this.userpwd1 || !this.code) {
        MessageBox({
          type: "error",
          message: "必填项不能为空！",
        });
      }
      if (this.userpwd != this.userpwd1) {
        MessageBox({
          type: "error",
          message: "两次密码输入不一致！请重新输入！",
        });
      }

      if (
        this.username &&
        this.userpwd &&
        this.userpwd1 &&
        this.code &&
        this.userpwd == this.userpwd1 &&
        this.code == this.identifyCode
      ) {
        const { username, userpwd, userpwd1 } = this;
        let res = await (username &&
          userpwd == userpwd1 &&
          this.$store.dispatch("userRegister", { username, userpwd }));
        if (res == "ok") {
          MessageBox({
            type: "info",
            message: "注册成功!",
            showClose: true,
          });
          this.username = "";
          this.userpwd = "";
          this.userpwd1 = "";
          this.$router.push("/login");
        } else if (res == "occupyname") {
          MessageBox({
            type: "info",
            message: "该用户名已被占用!",
            showClose: true,
          });
        }
      } else if (this.code != this.identifyCode) {
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
    },
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
.maincontainer {
  .register {
    width: 1200px;
    height: 500px;
    border: 1px solid rgb(223, 223, 223);
    margin: 60px auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #479232;
      font-size: 20px;
      line-height: 30px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: green;
        }
      }
    }

    .content {
      margin-top: 40px;
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;
      display: flex;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
        padding-top: 5px;
      }

      input {
        width: 270px;
        height: 35px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      .code {
        display: inline-block;
        margin-left: 5px;
        margin-bottom: 0px;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 20px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #479232;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }
}
</style>