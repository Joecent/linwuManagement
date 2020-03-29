<template>
	<div class="member_page">
			<div class="row"><span class="l-required">*</span>是否开启分销：
				<el-switch v-model="is_open" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
			</div>
			<div v-if='is_open'>
			<div class="row"><span class="l-required">*</span>是否需要审批：
				<el-switch v-model="is_verify" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
			</div>
			<div class="secret">AppSecret：
				<el-input v-model="secret" size='small' :disabled="open_disabled" placeholder="请输入AppSecret 开通分销人员下载小程序二维码功能" class="input_box">
					<el-button v-if="secret!=''" slot="append" @click="handleOpen">编辑</el-button>
				</el-input>
				<a href="https://jingyan.baidu.com/article/642c9d340305e3644a46f795.html" target="_blank"> 如何查看？</a>
			</div>
			<div class="row">
				提现方式：
					<el-checkbox-group v-model="cash_type" class="checklist">
						<el-checkbox label="1" class="checkbox"  disabled>微信</el-checkbox>
						<el-checkbox label="2" class="checkbox">支付宝</el-checkbox>
						<el-checkbox label="3" class="checkbox">银行卡</el-checkbox>
					</el-checkbox-group>
			</div>
			<div class="row">金额：<el-input size='small' class="money" v-model="percent"><template slot="append">%</template></el-input></div>
			</div>
			<div class="btn row"><el-button type="success" @click="handleClick">确认更新</el-button></div>
	</div>
</template>
<script type="text/javascript">
	import {get_shopConfigDetail,post_shopConfigDetail} from '@/utils/api'
	import * as store from '@/utils/sdk/store'
	export default{
		data(){
			return{
				is_open:false,
				is_verify:false,
				cash_type:['2','3'],
				percent:'0',
				secret:'',
				open_disabled:true
			}
		},
		methods:{
			handleOpen(){
				this.open_disabled=!this.open_disabled
			},
			handleClick(){
				if(this.cash_type.length=='0'){
					this.$message.error('提现方式不能为空')
				}else if(this.secret==''){
					this.$message.error('AppSecret不能为空')
				}else{
					//提交接口
					post_shopConfigDetail({
						shop_id:store.get('currentshopid'),
						is_verify:this.is_verify?1:0,
						cash_type:this.cash_type,
						percent:this.percent,
						secret:this.secret,
						is_share:this.is_open?'1':'0'
					}).then((res)=>{
						if(res.status=='1'){
							this.$message.success('提交成功')
						}
					})
				}
			}
		},
		created(){
			get_shopConfigDetail({
				shop_id:store.get('currentshopid')
			}).then((res)=>{
				console.log(res)
				this.cash_type=res.config.cash_type,
				this.is_verify=res.config.is_verify=='1'?true:false,
				this.percent=res.config.percent,
				this.secret=res.secret
				this.is_open=res.config.is_share=='1'?true:false
				if(this.secret==''){
					this.open_disabled=false
				}
			})
		 }
	}
</script>
<style lang="stylus" scoped>
.member_page
	background-color #f9f9f9
	padding 20px 0px 0px 20px
	width 100%
	height 100%
	font-size 14px
.btn{
	display:flex;
}
.row{
	margin:15px 0px;
	vertical-align:middle;
}
.l-required{
	color:#f00;
	font-size:24px;
	font-weight:bold;
}
.secret{
	display:flex;
	align-items:center;
}
.input_box{
	width:28%;
	margin-right:5px
}
.secret a{
	color:#409EFF;

}	
.checkbox{
		display:inline-block;
		margin-right:0px
	 }
.money{
	font-size:16px;
	color:#fe0000;
	width:130px
}
@media(max-width:900px) {
	.el-input-group__append button.el-button{
			padding-left:5px;
		}
	.member_page{
		padding:50px 15px
	}
	.box-card{
		min-width:320px;
	}
	.checklist{
		display:block;
	}
	.row{
		margin:20px 0px;
	}
 	.checkbox{
		 display:flex;
		 margin-left:15%
	 }
	 .secret{
		 display:inherit;
	 }
	 .input_box{
		 display:flex;
		 width:60%;
		 margin:5px 0 5px 15px
	 }
	 .secret a{
		 margin-left:15px
	 }
}
</style>