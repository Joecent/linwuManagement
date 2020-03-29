<template>
	<div class="member_page">
			<!--<div class="row"><span class="l-required">*</span>是否开启分销：
				<el-switch v-model="is_open" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
			</div>-->
			<div class="row"><span class="l-required">*</span>是否需要审批：
				<el-switch v-model="is_verify" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
			</div>
			<div class="row">
				提现方式：
					<el-checkbox-group v-model="cash_type" class="checklist">
						<el-checkbox label="1" class="checkbox" disabled>微信</el-checkbox>
						<el-checkbox label="2" class="checkbox">支付宝</el-checkbox>
						<el-checkbox label="3" class="checkbox">银行卡</el-checkbox>
					</el-checkbox-group>
			</div>
			<div class="btn row"><el-button type="success" @click="handleClick">确认提交</el-button></div>
	</div>
</template>
<script type="text/javascript">
	import {get_shopConfigDetail,post_shopConfigDetail} from '@/utils/api'
	import * as store from '@/utils/sdk/store'
	export default{
		data(){
			return{
				//is_open:false,
				is_verify:false,
				cash_type:['2','3']
			}
		},
		methods:{
			handleClick(){
				if(this.cash_type.length=='0'){
					this.$message.error('提现方式不能为空')
				}else{
					//提交接口
				}
			}
		},
		created(){
		 }
	}
</script>
<style lang="stylus" scoped>
.member_page
	background-color #f9f9f9
	padding 20px 0px 0px 20px
	width 100%
	height 100%
	font-size 15px
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
.input_box{
	width:28%;
	margin-right:5px
}

.checkbox{
	display:inline-block;
	margin-right:0px
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
	 .input_box{
		 display:flex;
		 width:60%;
		 margin:5px 0 5px 15px
	 }
}
</style>