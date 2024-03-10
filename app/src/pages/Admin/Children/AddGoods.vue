<template>
  <div class="addgoods">
    <h3>商品上新</h3>
    <!-- 表单，rules是各项的填写规则 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="商品ID" prop="goodsid" style="width: 250px">
        <el-input type="number" v-model="ruleForm.goodsid"></el-input>
      </el-form-item>
      <el-form-item label="商品名称" prop="goodsname" style="width: 500px">
        <el-input v-model="ruleForm.goodsname"></el-input>
      </el-form-item>

      <el-form-item label="商品图片" style="width: 500px">
        <el-upload
          action="http://localhost:8000"
          list-type="picture-card"
          :auto-upload="false"
          :on-change="handleChange"
          limit:1
          :class="{ disabled: this.fileList.length > 0 }"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img class="el-upload-list__item-thumbnail" :src="file.url" />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="商品价格" prop="price" style="width: 250px">
        <el-input v-model="ruleForm.price" ></el-input>
      </el-form-item>

      <el-form-item label="商品库存" prop="counts" style="width: 250px">
        <el-input v-model="ruleForm.counts" ></el-input>
      </el-form-item>

      <el-form-item label="商品分类" prop="category">
        <el-select v-model="ruleForm.category" placeholder="请选择">
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item.catename"
            :value="item.categoryId"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品简述" prop="shortname" style="width: 500px">
        <el-input
          type="textarea"
          v-model="ruleForm.shortname"
          autosize
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >上架商品</el-button
        >
        <el-button @click="resetForm('ruleForm')">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AddGoods",
  data() {
    return {
      ruleForm: {
        goodsid: null,
        shortname: "",
        goodsname: "",
        price: null,
        counts: null,
        category: "",
      },
      rules: {
        goodsid: [
          // 商品ID必须填写
          { required: true, message: "请输入商品ID", trigger: "blur" },
          // ID必须填写规范
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        shortname: [
          { required: true, message: "请填写商品简述信息", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        counts: [
          { required: true, message: "请输入商品库存", trigger: "blur" },
        ],
        category: [
          { required: true, message: "请选择商品分类", trigger: "blur" },
        ],
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      // 商品分类选项
      options: [],
      // 存放上传的图片信息
      fileList: [],
      // 全部表单数据
      form: {},
    };
  },
  methods: {
    // 上传图片按钮
    handleChange(file, fileList) {
      if (fileList.length > 1) {
        // 只能上传一张照片
        fileList = fileList.slice(-1);
      }
      this.fileList = fileList;
    },
    // 获取分类信息
    async getCateData() {
      let result = await this.$store.dispatch("changeGoodsCate");
      this.options = result;
    },
    // 上传后移除图片
    handleRemove(file) {
      // 把存储图片信息的数组出栈一位
      this.fileList = this.fileList.pop()
    },
    // 上传后点击图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let flag = false;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$refs[formName].model.goodsid = Number(
                this.$refs[formName].model.goodsid
              );
              this.$refs[formName].model.counts = Number(
                this.$refs[formName].model.counts
              );
              this.$refs[formName].model.price = Number(
                this.$refs[formName].model.price
              );
              // console.log(this.$refs[formName].model);
              flag = true;
            }
          });
          if (!this.fileList.length) {
            flag = false;
          }
          if (flag) {
            let formData = new FormData();
            formData.append("goodsid", this.$refs[formName].model.goodsid);
            formData.append("shortname", this.$refs[formName].model.shortname);
            formData.append("goodsname", this.$refs[formName].model.goodsname);
            formData.append("counts", this.$refs[formName].model.counts);
            formData.append("price", this.$refs[formName].model.price);
            formData.append("category", this.$refs[formName].model.category);
            formData.append("goodsimg", this.fileList[0].raw);

            this.form = formData;
            /* this.$store.dispatch("submitFormData", formData); */
            this.Supplyapi()
          }
        }
      });
    },
    // 发请求，本来应该写在上面的提交表单函数中，但会和异步函数冲突报错，所以单独封装
    async Supplyapi() {
      let result = await this.$store.dispatch("submitFormData", this.form);
      if (result == "ok") {
        this.$message({
          type: "success",
          message: "商品上架成功",
        });
        this.$router.replace('/admin')

      }else if(result == 'errexist'){
        this.$message({
            type: "info",
            message: "商品ID已存在，不能重复添加！",
          });
      }else if(result == 'servererr'){
        this.$message({
            type: "error",
            message: "服务器内部繁忙，请稍后再试！",
          });
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    this.getCateData();
  },
};
</script>

<style>
.disabled .el-upload--picture-card  {
  display: none;
}

.addgoods {
  padding-top: 20px;
}
h3 {
  font-weight: bolder;
  margin: 10px 10px 30px 10px;
}
</style>