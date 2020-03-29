<template>
	<div class="member_page">
		 <el-tabs v-model="activeName">
			 <el-tab-pane label="二维码" name="first">
					<div class="explain">
						<div class='explain_title'>来源二维码说明</div>
						<div class='explain_strip'>1.  如果你所在的是餐饮、服务等行业，需要区分不同来源的用户，可以在下方进行生成。
     						<div>比如：餐饮堂吃，生成1，2，3...来源二维码，线下贴在餐桌上，用户点餐之后，订单可以显示出，是哪一桌下的单。</div>
						</div>
					</div>
					<div class="l-container">
						<div class="l-container-left">请输入来源名称：</div>
						<el-input class="l-container-right" size="small" v-model="code_name" placeholder="例如（1、2、3 ）"></el-input>
					</div>
					<div class="l-container">
							<el-button type="primary" class="l-btn-right" @click="handleClick">生 成</el-button>
					</div>
					<div class="l-container" v-if="img!=''">
						<div class="l-container-left">来源二维码：</div>
						<div class="l-container-code">
							<img :src="img">
							<div><a :href="img" download><i class="el-icon-download"></i>下载</a></div>
						</div>
					</div>
			</el-tab-pane>
		</el-tabs>	 
	</div>
</template>
<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import {get_plat_info,access_print,deskQrcode} from '@/utils/api'
	export default{
		data(){
			return{
				activeName:'first',
				code_name:'',
				img:'',
			}
		},
		methods:{
			handleClick(){
				if(this.code_name==''){
					this.$message.error('名称编号不能为空')
				}else{
					deskQrcode({
						shop_id:store.get('currentshopid'),
						num:this.code_name
					}).then(res=>{
						if(res.status=='1'){
							this.img=res.goods_code
						}
					})
				}	
			}
		},
		created(){

		}
	}
</script>
<style lang="stylus" scoped>
.member_page{
	padding-top:30px;
	padding-left:20px;
	font-size:15px;
}
.explain{
	margin-top:15px;
	padding:15px 15px 40px;
	background:#f5f7fa;
	border:1px solid #bbb;
	border-radius:4px;
	.explain_title{
		padding-left:15px;
		border-left:5px solid #409EFF;
		font:700 17px '宋体';
		margin-bottom:10px
	}
	.explain_strip{
		padding-left:30px;
		div{
			margin:10px 0px 0px;
			padding-left:20px;
		}
	}
}
.l-container{
	display:flex;
	align-items:center;
	margin:15px 0;
	.l-container-left{
		min-width:110px;
	}
	.l-btn-right{
		margin-left:130px;
	}
	.l-container-code{
		text-align:center;
		img{
			width:150px;
			height:150px;
			margin-bottom:10px;
		}
		div{
			display:inline-block;
			cursor: pointer;
			a{
				color:#409EFF;
			}
		}
	}
	.l-container-right{
		width:25%;
		margin-left:10px;
	}
}
@media(max-width:900px) {
	.member_page{
		padding:0 20px;
		padding-top:20px;
        font-size:14px;
	}
	.explain{
		margin-top:15px;
		.explain_strip{
			padding-left:30px;
			div{
				margin:10px 0;
				padding-left:0px;
			}
		}
	}
	.l-container{
		display:block;
		.l-container-left{
			display:flex;
		}
		.l-btn-right{
			margin-left:10px;
		}
		.l-container-right{
			display:flex;
			flex-direction: column;
			width:80%;
			margin:10px 0px 10px 10px;
		}
		.l-container-code{
			width:50%;
			display:flex;
			flex-direction: column;
			margin:10px 0px 10px 10px;
		}
	}
}
</style>