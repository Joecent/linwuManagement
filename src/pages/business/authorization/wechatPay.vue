<template>
	<div class="member_page">
		<div class="l-form">
			<div class="l-content-box">
				<span class="l-content-left">微信支付商户号：</span>
				<el-input v-model="wx_pay_id" class="l-content-right" :disabled="is_wx_pay_id">
					<el-button slot="append" v-if="wx_pay_id!=''" @click="is_wx_pay_id=!is_wx_pay_id">编辑</el-button>
				</el-input>
			</div>
			<div class="placehoulder">
				<span class="l-required">*</span>
				微信支付后台，基本信息中的“微信支付商户号“
			</div>
			<div class="l-content-box">
				<span class="l-content-left">微信支付安全密钥：</span>
				<el-input v-model="wx_pay_key"  class="l-content-right" :disabled="is_wx_pay_key">
					<el-button slot="append" v-if="wx_pay_key!=''" @click="is_wx_pay_key=!is_wx_pay_key">编辑</el-button>
				</el-input>
			</div>
			<div class="placehoulder">
				<span class="l-required">*</span>
				微信支付后台，账号设置下面的AIP安全中的“设置密码“
			</div>
			<div class="l-content-box">
				<span class="l-content-left">是否开通退款功能：</span>
				<div  class="l-content-right"><el-switch v-model="refund" active-color="#13ce66" inactive-color="#ff4949"></el-switch></div>
			</div>
			<div class="l-content-box certificate" v-if="refund">
				<span class="l-content-left">上传证书（.zip格式）：</span>
				<!--<input type='file' @change="handleChange" class="l-content-right"/>-->
				<el-upload
				class="upload-demo"
				action="https://www.linwushop.com/upload_img"
				:on-change="handleChange"
				:limit=1
				>
					<el-button size="small" type="primary">点击上传</el-button>
				</el-upload>
			</div>
			<div class="placehoulder">
				微信支付后台，账号设置下面的AIP安全中的“下载证书“
			</div>
			<div class="l-content-footer">
				<el-button class="l-content-submit" type="primary"  @click="handleClick">提交</el-button>
				<div  class="l-content-target"><a href="">什么是商户号和密钥?</a></div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import {wxpay_set,wxpay_get} from '@/utils/api'
	export default{
		data(){
			return{
				wx_pay_id:'',
				wx_pay_key:'',
				refund:true,
				file:'',
				is_wx_pay_id:true,
				is_wx_pay_key:true
			}
		},
		methods:{
			handleChange(file){
				this.file=file.response.data.img_url
			},
			handleClick(){
				if(this.wx_pay_id==''){
					this.$message.error('请填写微信支付商户号')
				}else if(this.wx_pay_key==''){
					this.$message.error('微信支付安全密钥')
				}else{
					wxpay_set({
						shop_id:store.get('currentshopid'),
						wx_pay_id:this.wx_pay_id,
						wx_pay_key:this.wx_pay_key
					}).then((res)=>{
						if(res.error_code=='1000'){
							this.$message.success('提交成功')
							this.$router.push('/business/authorization/release')
						}
					})
				}
			}
		},
		created(){
			wxpay_get({
				shop_id:store.get('currentshopid')
			}).then((res)=>{
				if(res.error_code=='1000'){
					this.wx_pay_id=res.data.wx_pay_id,
					this.wx_pay_key=res.data.wx_pay_key,
					this.refund=res.refund_open?true:false
					if(this.wx_pay_id==''){
						this.is_wx_pay_id=false
					}
					if(this.wx_pay_key==''){
						this.is_wx_pay_key=false
					}
				}
			})
		}
	}
</script>
<style lang="stylus" scoped>
.member_page
	background-color #f9f9f9
	padding 20px 0px 0 20px
	width 100%
	height 100%
	font-size 14px
	display flex
.l-form
	width 550px
	.l-content-box
		margin-top 15px
		display flex
		align-items center
		height auto
		.l-content-left
			display flex
			width 30%
		.l-content-right
			width 70%
	.placehoulder
		color #aaaaaa
		margin-left:30%
		margin-top 5px
		.l-required
			color #f00
			font-size 18px
			font-weight bold
			vertical-align middle
.l-content-footer
	margin-top 15px
	display flex
	align-items center
	justify-content space-between
	height auto
	.l-content-target a
		color #409EFF
</style>
<style scoped>
	@media(max-width:900px) {
		.el-input-group__append button.el-button{
			padding-left:5px;
		}
		.member_page{
			padding:50px 15px
		}
		.l-form{
			width:100%;
		}
		.l-form .l-content-box{
			display:block;
		}
		.l-form .l-content-box .l-content-left,.l-form .l-content-box .l-content-right{
			display:flex;width:90%;margin:5px 0;
		}
		.l-form .placehoulder{
			margin-left:0px;width:90%;
		}
	}
</style>
