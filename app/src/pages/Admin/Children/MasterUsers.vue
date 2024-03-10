<template>
  <div id="admin-users">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="用户ID">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="userphone"
        label="手机号码">
      </el-table-column>
      <el-table-column
        prop="usernickname"
        label="用户昵称">
      </el-table-column>
      <el-table-column
        prop="useraddress"
        label="宿舍地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: "MasterUsers",
  data() {
    return {
      tableData: []
    };
  },
  mounted(){
    this.getData()
  },
  methods: {
    // 获取用户信息
    async getData(){
      let results = await this.$store.dispatch('getUsersData')
      this.tableData = results
    }
  }
};
</script>

<style>
</style>