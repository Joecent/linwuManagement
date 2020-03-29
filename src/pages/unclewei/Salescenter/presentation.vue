<template>
  <!-- 账户提现 -->
  <div>
    <div class="presen-con">
      <p class="presen-price">总金额:￥ <span> 1000.00</span></p>
      <!-- <div class="presen">
                 <span  @click="wx" class="wx">微信</span>
                 <span  @click="wx1" class="wx1"> 支付宝</span>
           </div>
           <div class="ws">
               微信111111
           </div>
 
           <div class="zfb">
             支付宝222222
           </div> -->

      <div class="login_con">
        <div class="login_ways_tab clearfix">
          <ul>
            <li :class="{ on: ison}" @click="_loginway()">支付宝</li>
            <li :class="{ on: !ison}" @click="_loginway()">银行卡</li>
          </ul>
        </div>
        <div class="login_ways_con clearfix">
          <div class="con" v-show="ison">
            <!--支付宝  -->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

              <el-form-item label="收款人姓名" prop="name">
                <el-input v-model="ruleForm.name" placeholder="收款人姓名"></el-input>
              </el-form-item>

              <el-form-item label="输入账号" prop="phone">
                <el-input v-model.number="ruleForm.phone" placeholder='输入支付宝账号/手机号'></el-input>
              </el-form-item>

              <el-form-item label="提现金额" prop="price">
                <el-input v-model.number="ruleForm.price" placeholder="提现金额"></el-input>
              </el-form-item>

              <div class="explain">
                <p>提现说明:</p>
                <p>1.不支持信用卡方式充值。</p>
                <p>2.提现后，平台工作人员会在72小时之内进行处理。</p>
                <p>3.如果填写信息不正确，我们会把提现金额重新返回到你邻伍平台账号上。</p>
              </div>
              <el-form-item prop="type">
                <!-- <el-checkbox-group v-model="ruleForm.type">
                  <el-checkbox label="我已了解，并进行提现申请1" name="type" class="box"></el-checkbox>
                </el-checkbox-group> -->
                <el-checkbox v-model="checked">我已了解，并进行提现申请</el-checkbox>
              </el-form-item>
              <div class="btns">
                <el-form-item>
                  <el-button type="primary" :disabled="!checked"  class="btn" @click="centerDialogVisible = true">提现</el-button>
                  <!-- <el-button @click="resetForm('Form')">重置</el-button> -->
                </el-form-item>
              </div>
            </el-form>
          </div>

          <div class="con" v-show="!ison">
            <!--银行卡  -->
            <el-form :model="Form" :rules="rules" ref="Form" label-width="100px" class="demo-ruleForm">

              <el-form-item label="开户人姓名" prop="name">
                <el-input v-model="Form.name" placeholder="开户人姓名"></el-input>
              </el-form-item>

              <el-form-item label="银行卡号" prop="bank">

                <el-input v-model.number="ruleForm.bank" maxlength="23" placeholder="请输入银行卡号"></el-input>

              </el-form-item>

              <el-form-item label="所属银行" prop="region">
                <el-select v-model="Form.region" placeholder="请选择银行">
                  <el-option label="中国人民银行" value="zgrmyh"></el-option>
                  <el-option label="建设银行" value="jsyh"></el-option>
                  <el-option label="工商银行" value="gsyh"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="提现金额" prop="price">
                <el-input v-model.number="ruleForm.price" placeholder="提现金额"></el-input>
              </el-form-item>
              <div class="explain">
                <p>提现说明:</p>
                <p>1.不支持信用卡方式充值。</p>
                <p>2.提现后，平台工作人员会在72小时之内进行处理。</p>
                <p>3.如果填写信息不正确，我们会把提现金额重新返回到你邻伍平台账号上。</p>
              </div>
              <el-form-item prop="type">
                <el-checkbox v-model="checked">我已了解，并进行提现申请</el-checkbox>
              </el-form-item>
              <div class="btns">
                <el-form-item>
                  <el-button type="primary"  @click="centerDialogVisible = true" :disabled="!checked" class="btn">提现</el-button>
                  <!-- <el-button @click="submitForm('Form')">重置</el-button> -->
                </el-form-item>
              </div>
            </el-form>
          </div>
        </div>
        <!-- 弹出框 -->
          <el-dialog title="确认提现" :visible.sync="centerDialogVisible" width="30%" center :modal-append-to-body='false'>
            <span>是否确定提现，确认提现需要等级商家进行操作，如果拒绝钱会自动转回到你的邻伍平台账户中？</span>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary"  @click="submitForm('Form')">确定提交</el-button>
               <el-button @click="centerDialogVisible = false">取 消</el-button>
            </span>
          </el-dialog>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        resource: "",
        phone: "",
        price: ""
      },
      ison: true,
      checked: false,
     centerDialogVisible:false,
      Form: {
        name: "",
        region: "",
        bank: ""
      },

      rules: {
        name: [
          { message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        region: [{ message: "请选择银行", trigger: "change" }]
      }
    };
  },

  methods: {
 
    // wx1() {
    //   document.querySelector(".ws").style.display = "none";
    //   document.querySelector(".zfb").style.display = "block";
    // },
    // wx() {
    //   document.querySelector(".ws").style.display = "block";
    //   document.querySelector(".zfb").style.display = "none";
    // },

    _loginway() {
      this.ison == true ? (this.ison = false) : (this.ison = true);
      this.checked = false;
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
           alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // }
  }
};
</script>

<style lang="stylus" scoped>
.presen-con {
  max-width: 700px;
  margin: 50px auto;
}

.presen-price {
  font-size: 16px;
}

.presen-price span {
  color: #c31111;
}

// .presen span {
// width: 50%;
// }

// .zfb {
// display: none;
// }
.login_ways_tab ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 700px;
  height: 68px;
  line-height: 68px;
}

.login_ways_tab ul li {
  border: 1px solid #bbbbbb;
  flex: 1;
  text-align: center;
  cursor: pointer;
}

.login_ways_tab ul li.on {
  background: #2589FF;
  color: #fff;
}

.explain {
  width: 70%;
  margin: 0 auto;
  font-size: 12px;
  padding-left: 63px;
}

.login_ways_con {
  border: 1px solid #bbbbbb;
}

.btn {
  width: 120px;
  // height: 48px;
  // line-height: 48px;
  text-align: center;
  border: 1px solid #999;
  background: #2589FF;
  margin: 0 auto;
  display: block;
  color: #fff;
}

.btn:disabled {
  background: #bbb;
  // color #fff
}

@media (max-width: 900px) {
  .presen-con {
    margin: 20px;
  }

  .login_ways_tab ul {
    height: 50px;
    line-height: 50px;
  }

  .explain {
    width: 80%;
    padding-left: 0;
  }

  .con .el-button {
    display: flex;
    margin: 0 auto;
  }

  .login_con {
    margin-bottom: 50px;
  }
}
</style>

<style>
.con .el-form-item {
  width: 80%;
  margin: 15px auto;
}
.con .el-select {
  width: 100%;
}

/* .con .el-button {
  margin: 20px auto;
  padding: 12px 30px;
} */

.con .el-button--primary {
  background-color: #2589ff;
  /* border-color: #2589ff; */
}


.con .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #2589ff;
}
.con .el-checkbox__input.is-checked .el-checkbox__inner,
.con .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #2589ff;
  border-color: #2589ff;
}

.con .el-input__icon {
  line-height: 1;
}

.btns .el-form-item__content {
  margin-left: 0 !important;
}

.el-form-item.is-success .el-input__inner,
.el-form-item.is-success .el-input__inner:focus,
.el-form-item.is-success .el-textarea__inner,
.el-form-item.is-success .el-textarea__inner:focus {
  border-color: #dcdfe6;
}
</style>
