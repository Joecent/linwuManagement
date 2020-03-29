 <template>
 <div class="account_login">
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container" >
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" class="login_button" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
      
    </el-form-item>
      <el-button type="text" class="regist" @click.native.prevent="handleReset3">注册</el-button>
      <el-button type="text" class="forget" @click.native.prevent="handleReset2">忘记密码？</el-button>
  </el-form>
</div>
</template>

<script>
import * as store from '@/utils/sdk/store'
import { admin_login } from '@/utils/api'

export default {
  name: 'login',
  data () {
    return {
      logining: false,
      ruleForm2: {
        account: '',
        checkPass: ''
      },
      rules2: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      checked: true
    }
  },
  methods: {
    handleReset3(){
      this.$router.push({name: 'register'})
    },
    handleReset2 () {
      this.$router.push({ name: 'resetPassword' })
    },
    handleSubmit2 () {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          var ua = navigator.userAgent.toLowerCase();
          var isWeixin = ua.indexOf('micromessenger') != -1;
          if (isWeixin) {
              console.log('444')
          }else{
              console.log('555')
          }
          if (this.checked == true) {
                            //传入账号名，密码，和保存天数3个参数
                            this.setCookie(this.ruleForm2.account, this.ruleForm2.checkPass, 7);
                        }else {
                          //清空Cookie
                          this.clearCookie();
                        }
          this.logining = true
          const loginParams = { phone: this.ruleForm2.account, password: this.ruleForm2.checkPass }
          admin_login(loginParams).then((res) => {
            this.logining = false

            //auth_level  1 超级用户  2 合作商家 3 小程序商家   4分销代理

            if (res) {
              if (res.data.user.auth_level==1) {
                 store.set('user', res.data.user)
                 store.set('token', res.data.token)
                  store.set('shopAuth',1)
                 this.$router.push({path:'/shopchoose'})
              }else if (res.data.user.auth_level==3||2) {
                store.set('user',res.data.user)
                store.set('token',res.data.token)
                store.set('shopAuth',3)
                this.$router.push({path:'/shopchoose'})
              }else if (res.error_code==1006) {
                this.$message.error(res.msg)
              }else if (res.error_code==1007) {
                this.$message.error(res.msg)
              }
            }
          })
        } else {
          this.$message.error('登录错误！')
        }
      })
    },
    //设置cookie
    setCookie(c_name, c_pwd, exdays) {
                var exdate = new Date(); //获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
                //字符串拼接cookie
                window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
                window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
            },
    //读取cookie
    getCookie: function() {
                if (document.cookie.length > 0) {
                    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                    for (var i = 0; i < arr.length; i++) {
                        var arr2 = arr[i].split('='); //再次切割
                        //判断查找相对应的值
                        if (arr2[0] == 'userName') {
                            this.ruleForm2.account = arr2[1]; //保存到保存数据的地方
                        } else if (arr2[0] == 'userPwd') {
                            this.ruleForm2.checkPass = arr2[1];
                        }
                    }
                }
            },
            //清除cookie
            clearCookie: function() {
                this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
            }
  },
  mounted () {
    this.getCookie();
  }
}
</script>

<style lang="stylus" scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
}
.logo{
  height: 77px;
  margin: 10px auto;
}
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
  .remember {
    margin: 0px 0px 20px 0px;
  }
}

.full-screen {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.bg-purple-dark {
  background: #99a9bf;
}
.grid-content {
  border-radius: 4px;
  text-align: center;
  height: 36px;
  line-height: 36px;
}
.el-menu--horizontal .el-menu-item {
  float: right !important;
}
.el-menu{
  padding-right: 60px;
}
.account_login
  width 100%
.login_button
  padding 0 20px
  width 100%
  height 40px
.regist
  margin-top -15px
  float left
.forget
  margin-top -15px
  float right
</style>
