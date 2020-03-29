<template>
<div class="register">
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">注册</h3>
    <el-form-item prop="name">
      <el-input type="text" v-model="ruleForm2.name" auto-complete="off" placeholder="昵称"></el-input>
    </el-form-item>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="手机号"></el-input>
    </el-form-item>
    
    <el-form-item prop="code">
      <el-input type="text" v-model="ruleForm2.code" auto-complete="off" placeholder="验证码" class="identify"></el-input>
      <el-button style="" type="text" @click.native.prevent="sendCode" class="get_identify">获取验证码</el-button>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <!-- <el-form-item prop="type">
      <el-radio-group v-model="ruleForm2.type">
          <el-radio :label="3">商家</el-radio>
          <el-radio :label="2">合伙人</el-radio>
      </el-radio-group>
    </el-form-item> -->
    <!--
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    -->
    <el-form-item style="width:100%;">
      <el-button type="primary" class="registe_button" @click.native.prevent="register" :loading="logining">注册</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
     <el-button class="login" type="text" @click.native.prevent="handleLogin">登录</el-button>
  </el-form>
</div>
</template>

<script>
import {
  admin_register,
  send_code,
  admin_login,
  create_shop
} from "@/utils/api";

export default {
  name: "register",
  data() {
    return {
      logining: false,
      ruleForm2: {
        account: "",
        code: "",
        checkPass: "",
        type:3
      },
      rules2: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" }
          // { validator: validaePass }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" }
          // { validator: validaePass2 }
        ],
        checkPass: [
          { required: true, message: "请输入密码", trigger: "blur" }
          // { validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  methods: {
    sendCode() {
      if (!this.ruleForm2.account) {
        this.$message.warning({
          message: "请输入账号"
        });
        return;
      }
      send_code({
        phone: this.ruleForm2.account
      }).then(res => {
        if (res.error_code == 1000) {
          this.$message.success({
            message: "验证码已发送，请注意查收"
          });
        } else if (res.error_code == 1004) {
          this.$message.error({
            message: "发送过于频繁"
          });
        }
      });
    },

    handleLogin() {
      this.$router.push({ name: "login" });
    },
    register() {
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.logining = true;
          const loginParams = {
            phone: this.ruleForm2.account,
            code: this.ruleForm2.code,
            nickname: this.ruleForm2.name,
            password: this.ruleForm2.checkPass,
            auth_level:this.ruleForm2.type
          };
          console.log(loginParams);
          admin_register(loginParams).then(res => {
            this.logining = false;
            let params = Object.assign({}, {});
            params.token = res.data.token;
            if (res.error_code == 1000) {
              this.$message.success("注册成功，请登录");
              this.$router.push({ name: "login" });
            } else if (res.error_code == 1004) {
              this.$message.error("验证码错误");
            } else if (res.error_code == 1003) {
              this.$message.error(res.msg);
            } else if (res.error_code == 1002) {
              this.$message.error("注册失败");
            } else if (res.error_code == 1001) {
              this.$message.error("非法请求");
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.login-container {
  /* box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02); */
  background-clip: padding-box;
  margin: 20px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: rgba(255, 255, 255, 0.6);

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
}

.identify {
  width: 70%;
}

.get_identify {
  width: 30%;
}

.registe_button {
  width: 100%;
}

.login {
  float: right;
  margin-top: -22px;
}
</style>
