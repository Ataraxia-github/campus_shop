<template>
  <div id="edit-pwd">
    <el-input placeholder="请输入原密码" v-model="oripassword" show-password></el-input>
    <el-input placeholder="请输入新密码" v-model="newpassword" show-password></el-input>
    <el-input placeholder="请再次输入新密码" v-model="reassurepwd" show-password></el-input>
    <div class="btn-section">
      <el-button type="info" @click="goTo('/personal')">返回</el-button>
      <el-button type="danger" @click="submitpwd">确认修改</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "EditPassword",
  data() {
    return {
      oripassword: "",
      newpassword: "",
      reassurepwd: "",
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  methods: {
    goTo(path) {
      this.$router.replace(path);
    },

    // 提交修改密码
    async submitpwd() {
      if (!this.oripassword || !this.newpassword || !this.reassurepwd) {
        this.$message("输入框内容不能为空！");
        return;
      }
      if (this.newpassword != this.reassurepwd) {
        this.$message("两次输入的新密码不一致！");
        return
      }
      let result = await this.$store.dispatch("EditPassword", {
        userid: this.userInfo.id,
        oripassword: this.oripassword,
        newpassword: this.newpassword,
      });
      if (result == "ok") {
        this.$message({
          message: '密码修改成功！',
          type: "success",
        });
        this.$router.replace('/personal/personaldata');
      }else if(result == 'errpwd'){
        this.$message({
          message: '初始密码输入不正确！',
          type: "error",
        });
      }
    },
  },
};
</script>

<style scoped>
#edit-pwd {
  padding-top: 60px;
  width: 100%;
  height: 100%;
}
.el-input {
  display: block;
  margin: 0 auto 20px;
  width: 30%;
}
p {
  margin-top: 40px;
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: #999;
}
.btn-section {
  margin: 50px auto;
  width: 25%;

  display: flex;
  justify-content: space-between;
}
.btn-section .el-button {
  width: 100px;
  outline: none;
}
</style>