<template>
  <div class="user-detail">
    <div class="user-detail-top">基本信息</div>
    <div class="user-detail-group">
      <div class="user-icon">
        <span>头像</span>
        <img :src="userInfo.useravatar" v-if="userInfo.useravatar"/>
        <img src="@/pages/Home/img/nouseravatar.jpg" v-else>
      </div>
      <div class="user-item">
        <span>手机</span>
        <span>{{ userInfo.userphone || "暂无" }}</span>
      </div>
      <div class="user-item">
        <span>用户名</span>
        <span>{{ userInfo.username || "暂无" }}</span>
      </div>
      <div class="user-item">
        <span>用户昵称</span>
        <span>{{ userInfo.usernickname || "暂无" }}</span>
      </div>
      <div class="user-item">
        <span>性别</span>
        <span>{{ userInfo.usersex || "暂无" }}</span>
      </div>
      <div class="user-item">
        <span>宿舍地址</span>
        <span>{{ userInfo.useraddress || "暂无" }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "PersonalData",
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo
    }),
    
  },
};
</script>

<style scoped>
.user-detail {
  width: 80%;
  height: 100%;
  margin: 10px auto;
}

.user-detail-top {
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding-left: 10px;
  font-weight: bold;
}

.user-icon {
  height: 60px;
  padding: 0 10px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  /* 两端对齐 */
  justify-content: space-between;
  /* 居中对齐 */
  align-items: center;
}

img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.user-item {
  height: 50px;
  padding: 0 10px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
