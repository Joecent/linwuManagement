<template>
  <div class="reset_password">
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container" >
    <h3 class="title">重置密码</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    
    <el-form-item prop="code">
      <el-input type="text" v-model="ruleForm2.code" auto-complete="off" placeholder="验证码" class="identify"></el-input>
      <el-button  type="text" @click.native.prevent="send_code" class="get_identify">获取验证码</el-button>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="新密码"></el-input>
    </el-form-item>
    <!--
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    -->
    <el-form-item style="width:100%;">
      <el-button type="primary" class="reset_comfirm" @click.native.prevent="handleSubmit2" :loading="logining">确认重置</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      
    </el-form-item>
      <el-button class="login" type="text" @click.native.prevent="handleLogin">登录</el-button>
  </el-form>
  </div>
</template>

<script>
import { find_password, send_code } from '@/utils/api'

export default {
  name: 'reset-password',
  data () {
    return {
      logining: false,
      ruleForm2: {
        account: '',
        code: '',
        checkPass: ''
      },
      rules2: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
          // { validator: validaePass }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
          // { validator: validaePass2 }
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
          // { validator: validaePass2 }
        ]
      },
      checked: true
    }
  },
  methods: {
    send_code () {
      if (!this.ruleForm2.account) {
        this.$message.warning({
          message: '请输入账号'
        })
        return
      }
      send_code({
        phone: this.ruleForm2.account
      }).then((res) => {
        if (res) {
          this.$message.success({
            message: '验证码已发送，请注意查收'
          })
        }
      })
    },
    handleLogin () {
      this.$router.push({ name: 'login' })
    },
    handleSubmit2 () {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          this.logining = true

          const loginParams = {
            phone: this.ruleForm2.account,
            code: this.ruleForm2.code,
            password: this.ruleForm2.checkPass
          }
          find_password(loginParams).then((ret) => {
            this.logining = false
            if (ret) {
              this.$router.push({ name: 'login' })
            }
          })
        } else {
          console.log('error submit!!')
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  background-clip: padding-box;
  margin: 20px auto;
  width: 350px;
  padding: 35px 35px 25px 35px;
  background: rgba(255,255,255,0.6);
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
}
.reset_comfirm
  width 100%
  height 40px
.reset_password
  width 100%
.login
  float right
  margin-top -15px
.identify
  width 70%
.get_identify
  width 30%
</style>
