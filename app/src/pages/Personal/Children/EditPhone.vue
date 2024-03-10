<template>
  <div id="part">
    <div class="toppart">
      <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" />
      <button
        v-if="!timeout"
        class="changetip"
        :class="{ phonepass: phonePass }"
        @click.prevent="getcode"
      >
        获取验证码
      </button>
      <button v-else disabled="disabled" class="changetip">
        已发送({{ timeout }}s)
      </button>
    </div>
    <div class="getcode">
      <input type="tel" maxlength="8" placeholder="验证码" v-model="code" />
    </div>
    <div class="bottompart">
      <el-button type="info" @click="goTo('/personal')">返回</el-button>
      <el-button type="danger" @click="changePhone">确认修改</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { MessageBox } from "element-ui";
export default {
  data() {
    return {
      // 获得用户输入的电话号码
      phone: "",
      // 获得用户输入的验证码
      code: "",
      // 每次请求验证码有六十秒的倒计时
      timeout: 0,
    };
  },
  computed: {
    // 读取获取登录的用户信息
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
    // 计算属性，验证手机号是否合理
    phonePass() {
      // 手机号码由1开头，第二位是3，4，5，7，8的其中一个
      // 只要匹配的字符出现在方括号内，即可表示匹配成功
      // test 方法检查字符串是否与给出的正则表达式模式相匹配，如果是则返回 true，否则就返回 false。
      return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone);
    },
  },
  methods: {
    // 路由跳转
    goTo(path) {
      this.$router.replace(path);
    },
    // 获取短信验证码
    async getcode() {
      // 用户输入的手机号码合法
      if (this.phonePass) {
        // 60秒倒计时
        this.timeout = 60;
        // 设置一个计时器，每秒读一次
        let timer = setInterval(() => {
          this.timeout--;
          // 60秒时间到
          if (this.timeout == 0) {
            // 清除计时器
            clearInterval(this.timer);
          }
        }, 1000);
      }
      // 发送请求获取短信验证码
      let res = await this.$store.dispatch("getCode", {
        phone: this.phone,
      });
      if (res == "ok") {
        // 成功
        this.$message({
            message: "验证码获取成功！",
            type: 'success'
          });
      } else if (res == "err") {
        // 失败
        this.$message.error("验证码获取失败！");
        // 清除定时器
        clearInterval(this.timer);
        // 倒计时归零
        this.timeout = 0;
      }
    },

    // 修改电话号码
    async changePhone() {
      // 必须输入电话号码
      if (!this.phone) {
        this.$message("手机号不得为空！");
        return;
        // 必须输入短信验证码
      } else if (!this.code) {
        this.$message("验证码不得为空！");
        return;
      }
      // 派发action发送请求
      // 携带的参数是用户的id，用户的手机号，及输入的验证码
      let res = await this.$store.dispatch("changeUserPhone", {
        userid: this.userInfo.id,
        phone: this.phone,
        code: this.code,
      });
      if (res == "ok") {
        this.$message({
          message: "手机号修改成功！",
          type: "success",
        });
        // 修改成功后重新获取用户信息
        this.$store.dispatch('getUserInfo',{
          userid: this.userInfo.id
        })
        this.$router.replace('/personal/personaldata')
      }else if(res == 'err'){
        this.$message.error('手机号修改失败！');
      }
    },
  },
};
</script>

<style scoped>
#part {
  padding-top: 10%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#part input {
  width: 100%;
  height: 100%;
  padding-left: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: 0;
  font: 400 14px Arial;
}
#part input:focus {
  border: 1px solid #409eff;
}
.toppart {
  position: relative;
  width: 300px;
  height: 40px;
  font-size: 14px;
}
.changetip {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  border: none;
  color: #ccc;
  font-size: 14px;
  background: transparent;
  cursor: pointer;
}
.phonepass {
  color: rgb(64, 131, 255);
}
.getcode {
  position: relative;
  margin-top: 24px;
  width: 300px;
  height: 40px;
  font-size: 14px;
}
.bottompart {
  margin: 50px auto;
  width: 25%;

  display: flex;
  justify-content: space-between;
}
.bottompart .el-button {
  width: 100px;
  outline: none;
}
</style>