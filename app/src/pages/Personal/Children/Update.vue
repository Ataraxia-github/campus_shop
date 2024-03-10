<template>
  <div class="user-detail">
    <div class="user-detail-top">基本信息</div>
    <div class="user-detail-group">
      <div class="user-icon">
        <span>头像</span>
        <el-upload
          class="avatar-uploader"
          action=""
          :auto-upload="false"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-change="handleAvatarChange"
        >
          <img v-if="useravatar" class="avatar" :src="avatarimgurl" />
          <img v-else class="avatar" />
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="user-item">
        <span>手机</span>
        <span>{{ userInfo.userphone || "暂未设置" }}</span>
      </div>
      <div class="user-item">
        <span>用户名</span>
        <span>{{ userInfo.username || "暂未设置" }}</span>
      </div>
      <div class="user-item">
        <span>昵称</span>
        <el-input
          type="text"
          placeholder="请输入内容"
          v-model="usernickname"
          style="width: 200px"
        >
        </el-input>
      </div>
      <div class="user-item">
        <span>性别</span>
        <el-select placeholder="请选择" v-model="usersex" style="width: 100px">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="user-item">
        <span>宿舍地址</span>
        <el-input
          type="text"
          placeholder="请输入具体宿舍门牌号例如46-1209"
          v-model="useraddress"
          maxlength="25"
          style="width: 280px"
        >
        </el-input>
      </div>
      <el-button type="success" @click="submitInfo()">确认修改</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Update",
  data() {
    return {
      useraddress: "",
      usernickname: "",
      usersex: "",
      userphone: "",
      useravatar: null,
      avatarimgurl: "",
      options1: [
        {
          value: "男",
          label: "男",
        },
        {
          value: "女",
          label: "女",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  created() {
    this.usernickname = this.userInfo.usernickname || "";
    this.usersex = this.userInfo.usersex || "";
    this.useraddress = this.userInfo.useraddress || "";
    this.userphone = this.userInfo.userphone || "";
  },
  methods: {
    // 在上传图片之前限制一下格式
    beforeAvatarUpload(file) {
      // 用户只能上传jpg格式或png格式的头像
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      // 用户上传的头像图片大小不能超过2MB
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG、PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 可以更换上传的图片
    handleAvatarChange(file, fileList) {
      // 创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。
      this.avatarimgurl = URL.createObjectURL(file.raw);
      // file.raw是elementUI自带的处理图片函数，转成二进制
      // file.raw代表的就是图片的二进制形式
      this.useravatar = file.raw;
    },
    // 用户点击修改个人信息
    async submitInfo() {
      // 新建一个表单对象，收集用户填写的表单数据
      let form = new FormData();
      form.append("userid", this.userInfo.id);
      form.append("useraddress", this.useraddress);
      form.append("usersex", this.usersex);
      form.append("usernickname", this.usernickname);
      // 如果用户上传了头像图片，那么也进行收集
      if (this.useravatar) {
        form.append("useravatar", this.useravatar);
      }
      // 派发action进行修改
      let result = await this.$store.dispatch("EditPersonalData", form);
      if (result == "ok") {
        this.$message({
          type: "success",
          message: "个人信息上传成功！",
        });
        // 再次获取数据库里的用户信息
        this.$store.dispatch('getUserInfo',{
          userid: this.userid
        })
        // 返回个人信息页面
        this.$router.replace('/personal/personaldata')
      }
    },
  },
};
</script>

<style scoped>
.user-detail {
  width: 70%;
  height: 100%;
  margin: 40px auto;
}
.user-detail-top {
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding-left: 10px;
  font-weight: bold;
}
.user-detail-group .user-icon {
  height: 60px;
  padding: 0 10px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user-detail-group .user-item {
  height: 50px;
  padding: 0 10px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user-detail-group input {
  border: 1px solid #ccc;
  outline: none;
  text-align: right;
  width: 200px;
}
.user-detail-group button {
  margin: 60px 0;
  width: 15%;
  font-size: 16px;
  border-radius: 10px;
  border: none;
  outline: none;
  float: right;
}
.right-title-color {
  color: #999;
  font-size: 14px;
}
.avatar-uploader {
  position: relative;
  width: 56px;
  height: 56px;
}
.avatar-uploader-icon {
  position: absolute;
  left: 0;
  top: 0;
  font-size: 28px;
  color: green;
  width: 100%;
  height: 100%;
  line-height: 56px;
  text-align: center;
  opacity: 0;
}
.avatar-uploader-icon:hover {
  opacity: 1;
}
.avatar {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>