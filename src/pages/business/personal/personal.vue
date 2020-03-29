<template>
    <div class="form">
        <!-- 账号管理 -->
        <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="手机号" prop="phone">
                <el-input type="text" placeholder="手机号" v-model="ruleForm.phone" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="旧密码" prop="cipher">
                <el-input type="password" v-model="ruleForm.cipher" autocomplete="off" placeholder="请输入原来密码"></el-input>
            </el-form-item>

            <el-form-item label="设置密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入新密码"></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请再次输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确认提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/javascript">
export default {
  data() {
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("手机号不能为空"));
      } else {
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        phone: "",
        cipher: ""
      },
      rules2: {
        phone: [{ validator: validatePhone }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped  lang="stylus">
.form {
    max-width: 500px;
}

@media (max-width: 900px) {
    .form {
        margin: 20px;
    }

    .form .el-button {
        margin-top: 20px;
    }
}
</style>
<style>
.form .el-form-item__content {
  margin-left: 0 !important;
}

.form .el-button {
  display: block;
  margin: 0 auto;
}
.form .el-form-item.is-success .el-input__inner,
.form .el-form-item.is-success .el-input__inner:focus,
.form .el-form-item.is-success .el-textarea__inner,
.form .el-form-item.is-success .el-textarea__inner:focus {
  border-color: #dcdfe6;
}

.form .el-button--primary {
  background-color: #2589FF;
  border-color: #2589FF;
}
</style>


