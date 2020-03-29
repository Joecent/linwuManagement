<template>
	<div>
		<div class="none" v-if="ispay==0">
			<img src="@/assets/images/none.png">
			<div class="text">您还没有成为邻伍合伙人哦，现在<span class="join" @click="tojoin">去加入</span>吧</div>
		</div>
		<div class="shopinfo" v-if="ispay==1">
			<div class="top">
				<div class="avatar"><img src="@/assets/images/shop.png"></div>
				<div class="name">{{realname}}</div>
				<div class="sex">{{sex}}</div>
			</div>
			<div class="bottom">
				<div class="number">身份证号：{{id_number}}</div>
				<div class="phone">手机号码：
					<div>
					<div>第一联系人：{{phone}}</div>
					<div>第二联系人：{{urgent_phone}}</div>
					</div>
				</div>
				<div class="e-mail">电子邮箱：{{email}}</div>
				<div class="address">地址：{{address}}</div>
				<div class="detail_address">详细地址：{{detail_address}}</div>
				<div class="statu" v-if="ispay==0">状态：暂无加入</div>
				<div class="statu" v-if="ispay==1">状态：初级合伙人</div>
				<div class="money">余额：￥{{money}}<span class="get" @click="showmoney=true">提现</span></div>
			</div>
		</div>
		<!-- 余额提现 -->
       <el-dialog title="余额提现" :visible.sync="showmoney" class="get_money_dialog">
          <el-form :model="money_form" label-width="100px">
            <el-form-item label="可提现余额" class='get_money_num'>￥{{money}}</el-form-item>
            <el-form-item label="提现金额">
              <el-input class="moneyinput" placeholder="请输入提现金额，最低1元" v-model="money_form.money"></el-input>
            </el-form-item>
            <el-form-item label="支付宝">
              <el-input placeholder="暂只支持支付宝提现，请输入支付宝账号" v-model="money_form.phone"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名">
              <el-input placeholder="请输入您的姓名以便验证账户" v-model="money_form.realname"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <button @click="showmoney = false" class="cancle">取 消</button>
            <button class="get_money_comfirm" @click="money_comfirm">确认</button>
          </div>
       </el-dialog>
       <!-- 提现成功 -->
       <el-dialog title="提现成功" :visible.sync="show_success" class="get_money_success">
          <div class="success_message">￥{{this.money_form.money}} 已提现成功，将在三个工作日内转至您的支付宝账户！有任何问题请随时联系客服！</div>
       </el-dialog>
	</div>
</template>
<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import {join_info,deposit} from '@/utils/api'
	export default{
		data(){
			return{
				show_success:false,
				showmoney:false,
				ispay:store.get('user').ispay,
				realname:'',
				sex:'',
				id_number:'',
				phone:'',
				urgent_phone:'',
				email:'',
				money:'',
				address:'',
				detail_address:'',
				money_form:{
           			 phone:'',
            		realname:'',
            		money:''
          	},
			}
		},
		methods:{
			money_comfirm(){
            var flag=true
            if (this.money_form.money=='') {
                this.$message.error('请输入提现金额')
            }
            else if (eval(this.money)<eval(this.money_form.money)){
              this.$message.error('提现金额必须小于账户余额')
            }
            else if (this.money_form.realname=='') {
              this.$message.error('请输入您的姓名，方便进行账户验证')
            }
            else if (this.money_form.phone=='') {
              this.$message.error('请输入您的支付宝账号')
            }else {
              flag=false
            }
            if (flag==false) {
              deposit({
                phone:this.money_form.phone,
                realname:this.money_form.realname,
                money:this.money_form.money
              }).then((res)=>{
                if (res.error_code==1000) {
                  this.showmoney=false
                  this.money()
                  this.show_success=true
                }else{
                  this.$message.error(res.msg)
                };
                
              })
            };
            
        	},
			tojoin(){
				this.$router.push('/agent/joininfo')
			},
			shopinfo(){
				if (this.ispay==1) {
					join_info({}).then(res=>{
						console.log(res)
						this.realname=res.data.joininfo.realname,
						this.sex=res.data.joininfo.sex==1?'男':'女',
						this.id_number=res.data.joininfo.id_number,
						this.phone=res.data.joininfo.phone,
						this.urgent_phone=res.data.joininfo.urgent_phone,
						this.email=res.data.joininfo.email,
						this.address=res.data.joininfo.address,
						this.detail_address=res.data.joininfo.detail_address,
						this.money=res.data.joininfo.money
					})
				};
			}
		},
		created(){
			this.shopinfo()
		}
	}
</script>
<style lang="stylus" scoped>
.none
	background-color #f9f9f9
	padding-top 150px
	text-align center
	img
		margin 0 auto
.text
	margin-top 20px
	.join 
		color #ff6b34
		cursor pointer	
.top
	display flex
	padding 20px 30px
	align-items center
	.avatar
		img
			width 75px
			height 75px
			border-radius 2px
	.name
		margin-left 30px
	.sex
		margin-left 20px
		font-size 13px
.bottom
	border-top 20px solid #f9f9f9
	padding 50px 500px
	.phone
		display flex
		width 400px
		margin-bottom 30px
	.number
		margin-bottom 30px
		width 400px
	.e-mail
		margin-bottom 30px
		width 400px
	.address
		margin-bottom 30px
		width 400px
	.detail_address
		margin-bottom 30px
		width 400px
	.statu
		margin-bottom 30px
		width 400px
	.money
		.get
			color #ff6b34
			margin-left 30px
			cursor pointer
.get_money_dialog
	width 70%
	left 15%
.get_money_num
	color #ff6C34
	margin-bottom 8px
.el-input
	width 90%
.dialog-footer
	display flex
	justify-content space-between
	padding 0 90px
.cancle
	color #c0c4cc
	border 1px solid #c0c4cc
	cursor pointer
	padding 5px 20px
	border-radius 3px
	background-color white
.get_money_comfirm
	color white
	background-color #409EFF
	cursor pointer
	padding 5px 20px
	border-radius 3px
</style>