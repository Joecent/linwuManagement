<template>
   <div class="">
       <div class="sales_title">
           <a><img src="@/assets/images/back.png" alt="" @click="back"></a>
           <span>添加等级</span>
        </div> 

        <!-- 更新 -->
        <div class="sales-form">
            <el-form  label-width="120px" :model="formLabelAlign" ref="formLabelAlign">
              
              <el-form-item label="等级名称" prop="name" :rules="[{ required: true,message: '不能为空'}]">
                <el-input v-model="formLabelAlign.name" placeholder="请输入等级名称"></el-input>
              </el-form-item>

             <el-form-item label="一级销售提成" prop="one" :rules="[{ required: true,message: '不能为空'},{ type: 'number', message: '必须为数字值'}]">
                <el-input v-model.number="formLabelAlign.one" placeholder="请输入一级销售提成"></el-input>
              </el-form-item>

              <el-form-item label="二级销售提成" prop="two" :rules="[{ required: true,message: '不能为空'},{ type: 'number', message: '必须为数字值'}]">
                <el-input v-model.number="formLabelAlign.two" placeholder="请输入二级销售提成"></el-input>
              </el-form-item>

               <el-form-item label="三级销售提成" prop="three" :rules="[{ required: true,message: '不能为空'},{ type: 'number', message: '必须为数字值'}]">
                <el-input v-model.number="formLabelAlign.three"  placeholder="请输入三级销售提成"></el-input>
              </el-form-item>

               <el-form-item label="商家优惠金额" prop="price" :rules="[{ required: true,message: '不能为空'},{ type: 'number', message: '必须为数字值'}]">
                <el-input v-model.number="formLabelAlign.price"  placeholder="请输入商家优惠金额"></el-input>
              </el-form-item>

              <el-form-item size="large">
               <el-button type="primary" @click="onSubmit('formLabelAlign')">更新</el-button>
              </el-form-item>
           </el-form>
        </div>
   </div>    
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      labelPosition: "left",
      formLabelAlign: {
        name: "",
        one: "",
        two: "",
        three: "",
        price: ""
      }
    };
  },

  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    back() {
      this.$router.go(-1); //返回上一层
    }
  }
};
</script>

<style lang="stylus" scoped>
.sales_title {
    display: flex;
    width: 100%;
    background: #293643;
    height: 50px;
    line-height: 50px;
    align-items: center;
}

.sales_title a img {
    width: 12px;
    display: block;
    cursor: pointer;
}

.sales_title span, .sales_title a {
    padding-left: 20px;
    color: #fff;
}

.sales-form {
    max-width: 350px;
    margin: 50px auto;
}

@media (max-width: 900px) {
    .sales-form {
        padding: 0 20px;
        margin: 30px auto;
    }
}
</style>

<style>
@media (max-width: 900px) {
  .sales-form .el-form-item__content .el-button {
    margin: 0 auto;
    display: block;
  }
}
</style>
