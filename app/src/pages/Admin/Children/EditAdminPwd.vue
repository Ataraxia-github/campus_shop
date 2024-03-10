<template>
  <div id="edit-pwd">
    <h2>修改商家登录密码:</h2>
    <el-input
      placeholder="请输入原登录密码"
      v-model="oripassword"
      show-password
    ></el-input>
    <el-input
      placeholder="请输入新登录密码"
      v-model="newpassword"
      show-password
    ></el-input>
    <el-input
      placeholder="请再次输入新登录密码"
      v-model="reassurepwd"
      show-password
    ></el-input>
    <div class="btn-section">
      <el-button type="danger" @click="submitpwd">确认修改</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditAdminPwd",
  data() {
    return {
      oripassword: "",
      newpassword: "",
      reassurepwd: "",
    };
  },
  methods: {
    //  修改密码的回调
    async submitpwd() {
      if (!this.oripassword || !this.newpassword || !this.reassurepwd) {
        this.$message("输入框内容不能为空！");
        return;
      }
      if (this.newpassword != this.reassurepwd) {
        this.$message("两次输入的新密码不一致！");
        return;
      }
      let result = await this.$store.dispatch("EditAdminPwd", {
        oripassword: this.oripassword,
        newpassword: this.newpassword,
      });
      if (result == "ok") {
        this.$message({
          message: "登录密码修改成功！",
          type: "success",
        });
        this.oripassword = "";
        this.newpassword = "";
        this.reassurepwd = "";
        this.$router.replace("/admin/mastergoods");
      } else if (result == "errpwd") {
        this.oripassword = "";
        this.newpassword = "";
        this.reassurepwd = "";
        this.$message({
          message: "初始密码输入不正确！",
          type: "error",
        });
      }
    },
  },
  watch: {
    $route() {
      this.oripassword = "";
      this.newpassword = "";
      this.reassurepwd = "";
    },
  },
};
</script>

<style scoped>
h2 {
    margin-left: 30px;
    margin-top: 0;
    margin-bottom: 20px;
}

#edit-pwd {
  padding-top: 30px;
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