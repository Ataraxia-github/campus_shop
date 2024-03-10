<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ notice }}</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="delcurrentnotice"
          >删除当前公告</el-button
        >
      </div>
    </el-card>
    <h2>发布新公告</h2>
    <h4>
      ------请注意，在这里您可以向顾客们通知一些消息，内容将展示在超市首页。------
    </h4>
    <el-input
      class="noticeinput"
      type="textarea"
      :rows="5"
      placeholder="请输入内容"
      v-model="textarea"
      clearable
    >
    </el-input>
    <br />
    <el-button type="success" plain @click="submitnotice">确认发布</el-button>
    <el-button type="info" plain @click="clearnotice">重置</el-button>
  </div>
</template>

<script>
export default {
  name: "Addnotice",
  data() {
    return {
      // 发布新公告内容
      textarea: "",
      // 当前发布了的公告内容
      notice: "",
    };
  },
  methods: {
    // 查询当前已发布了的公告
    async getNotice() {
      try {
        let noticeinfo = await this.$store.dispatch("getNoticeInfo");
        if (noticeinfo != "null") {
          this.notice = noticeinfo[0].notice;
        }
      } catch (error) {
        this.notice = "------暂未发布公告信息------";
      }
    },
    // 删除当前已发布的公告
    delcurrentnotice() {
      this.$confirm("您确定要删除此条公告吗?", "删除公告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("deleteCurrent");
          this.notice = "------暂未发布公告信息------";
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 发布公告
    submitnotice() {
      this.$confirm("您确定发布此条公告吗?", "发布", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await this.$store.dispatch("publishNotice", {
            notice: this.textarea,
          });
          if (result == "ok") {
            this.$message({
              type: "success",
              message: "公告发布成功！",
            });
          }
          // 公告发布后清除输入框的输入
          this.textarea = "";
          // 展示当前已发布的公告信息
          this.getNotice();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发布",
          });
        });
    },
    // 重置清空公告内容
    clearnotice() {
      this.textarea = "";
    },
  },
  mounted() {
    this.getNotice();
  },
};
</script>

<style scoped>
h2 {
  margin-left: 30px;
  margin-top: 50px;
}

h4 {
  margin-left: 30px;
  margin-top: 50px;
  font-size: 16px;
  color: gray;
}
.noticeinput {
  width: 80%;
  margin-top: 10px;
  margin-left: 30px;
  font-size: 16px;
}
.el-button {
  margin-top: 30px;
  float: right;
  font-weight: bold;
  font-size: 16px;
}

.el-button--success {
  margin-right: 230px;
  margin-left: 100px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  margin: 10px 10px;
  width: 80%;
  height: 80px;
}
</style>