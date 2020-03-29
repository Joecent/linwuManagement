<template>
    <!-- 审核状态 -->
    <div class="examine">
        <div>
            <p class="title">认证</p>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>名称</span>
                </div>
                <div class="text item">
                    <div v-if="step=='1'" class="items">
                        <span>等待审核中...</span>
                    </div>
                    <div v-else-if="step=='2'">
                        <span>已拒绝！</span>
                        <p>拒绝理由:信息不全</p>
                    </div>
                    <div v-else class="items"> <span>已禁用销售权限</span> </div>
                </div>
            </el-card>

            <div class="box-bt">
                <div v-if="step=='1'">
                    <p>销售权限正在审批中，我们将在24小时之内进行处理，请耐心等待。</p>
                    <p>客服电话：xxxxxxxx</p>
                </div>
                <div v-else-if="step=='2'" class="btns">
                    <el-button type="primary" @click="dialogFormVisible = true">重新申请</el-button>
                </div>
                <div v-else>
                    <p>销售权限已经被禁用，无法进行操作。客服电话：xxxxxxxx</p>
                </div>
            </div>
        </div>

        <!-- 提交表单 -->
        <div class="forms">
            <el-dialog title="重新申请" :visible.sync="dialogFormVisible" :modal-append-to-body='false'>
                <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="80px" class="demo-ruleForm login-container">

                    <el-form-item prop="name" label="昵称">
                        <el-input type="text" v-model="ruleForm2.name" auto-complete="off" placeholder="昵称">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="account" label="手机号">
                        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="手机号"></el-input>
                    </el-form-item>

                    <el-form-item prop="code" label="验证码">
                        <el-input type="text" v-model="ruleForm2.code" auto-complete="off" placeholder="验证码" class="identify"></el-input>
                        <el-button style="" type="text" @click.native.prevent="sendCode" class="get_identify">获取验证码</el-button>
                    </el-form-item>

                    <el-form-item prop="checkPass" label="密码">
                        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
                    </el-form-item>

                    <el-form-item prop="resource" label="类型">
                        <el-radio-group v-model="ruleForm2.resource">
                            <el-radio label="兼职"></el-radio>
                            <el-radio label="全职"></el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item prop="desc" label="描述">
                        <el-input type="textarea" v-model="ruleForm2.desc" placeholder="请输入描述"></el-input>
                    </el-form-item>
                    <!--<el-form-item style="width:100%;">
                            <el-button type="primary" class="registe_button" @click.native.prevent="register" :loading="logining">注册</el-button>
                            </el-form-item> -->
                </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogFormVisible = false">提交</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      step: "1",
      dialogFormVisible: false,
      ruleForm2: {
        account: "",
        code: "",
        checkPass: "",
        resource: ""
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
        ],
        resource: [{ required: true, message: "请选择类型", trigger: "change" }]
      },
      //   formLabelWidth: "120px",
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
            password: this.ruleForm2.checkPass
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

<style lang="stylus" scoped>

.title{
    width:100%;
    height 30px;
    line-height:30px;
    font-size 14px;
    border-left:3px solid #2589ff;
    padding-left:15px;
}

.items {
    margin-top: 40px;
}

.item span {
    text-align: center;
    display: block;
    color: #E51C23;
    font-size: 18px;
}

.item p {
    font-size: 14px;
}

.clearfix:before, .clearfix:after {
    display: table;
    content: '';
}

.clearfix:after {
    clear: both;
}

.box-card {
    max-width: 480px;
    margin: 50px auto 0;
    border-radius 10px;
}

.box-bt {
    max-width: 480px;
    margin: 0 auto;
    // text-align:center;
    font-size: 14px;
}

@media (max-width: 900px) {
    .box-card, .box-bt {
        margin: 20px;
    }
}
</style>

<style>
.examine .el-card__body {
  min-height: 150px;
  /* line-height: 150px; */
}

.examine .el-card__header {
  background: #2589FF;
  color: #fff;
}

.box-bt .btns .el-button {
  margin: 20px auto;
  display: block;
}

.box-bt .btns .el-button--primary {
  background-color: #2589FF;
  border-color: #2589FF;
}

.examine .el-card.is-always-shadow,
.examine .el-card.is-hover-shadow:focus,
.examine .el-card.is-hover-shadow:hover {
  box-shadow: inherit;
}

.forms .el-radio-group {
  margin-top: 10px;
}

.forms .el-dialog__header {
  text-align: center;
}

.forms .el-button--text {
  color: #2589FF;
}

.forms .el-dialog__footer {
  text-align: center;
}

.forms .el-dialog {
  width: 550px;
}
</style>
