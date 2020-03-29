<template>
<div class="w-pages">
		<div class="authorization_page" v-if="step==1">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>你还没有授权小程序给邻伍</span>
				</div>
				<div class="container">
					<p>1. 为什么将小程序授权给邻伍？</p>
					<p class="answer">因为程序程序要获取到你的小程序ID与密钥，以便生成相应的代码包。</p>
					<p>2. 授权之后能完成什么功能？</p>
					<p class="answer">
						授权之后，邻伍系统可以后台自动配置你的小程序开发配置相关的参数，比如API请求i接口的URL。
							除此之外，你还可以直接在邻伍系统中提交体验版本，在小程序上线之前提前预览。</p>
				</div>
				<div class="footer">
					<div class="btn" @click="handleClick">立即授权小程序</div>
				</div>
			</el-card>
		</div>
	<div v-if="step==2" class="authorization_info">		
			<div class="l-content-row">
				<div class="l-content-left"><label>小程序头像</label></div>
				<div class="l-content-right"><img :src="value_img"></div>
			</div>
			<div class="l-content-row">
				<div class="l-content-left"><label>小程序名称</label></div>
				<div class="l-content-right"><el-input v-model="value_name" disabled></el-input></div>
			</div>
			<div class="l-content-row">
				<div class="l-content-left"><label>原始ID</label></div>
				<div class="l-content-right"><el-input v-model="value_ID" disabled></el-input></div>
			</div>
			<div class="l-content-row">
				<div class="l-content-left"><label>小程序AppID</label></div>
				<div class="l-content-right"><el-input v-model="value_AppID" disabled></el-input></div>
			</div>
			<div class="l-content-row">
				<div class="l-content-left"><label>运营主体</label></div>
				<div class="l-content-right">
					<el-input v-model="value_owner" disabled></el-input>
				</div>
			</div>
			<!-- <div class="l-content-row">
				<div class="l-content-left"><label>AppSecret</label></div>
				<div class="l-content-right">
					<el-input v-model="value_Secret" :disabled="is_disabled" placeholder="请输入 APP Secret">
						<el-button  slot="append" size='small' @click='handleWrite'>编辑</el-button>
					</el-input>
					</div>
			</div> -->
			<!-- <div  class="l-content-target">
					<a href="#" target="_blank">什么是Secret ？</a>
			</div> -->
			<div class="l-btn-row">
				<div class="l-btn-left"><el-button type="primary" @click="handleUpdate">确定</el-button></div>
				<div class="l-btn-right"><el-button type="primary" @click="handleagain">重新授权</el-button></div>
			</div>
	</div>
	
</div>
</template>
<script type="text/javascript">
import {set_auth,app_set,submit_code,set_business_domain,set_server_domain,get_app_info} from '@/utils/api'
import * as store from '@/utils/sdk/store'
	export default{
		data(){
			return{
				step:2,
				data:'',
				is_disabled:true,
				value_name:'',
				value_img:'https://www.linwushop.com/static/img/logo.cab6bee.png',
				value_ID:'',
				value_AppID:'',
				value_Secret:'',
				value_owner:'',
				qrcode_url:''		
			}
		},
		methods:{
			handleagain(){
				this.step=1
			},
			handleWrite(){
				this.is_disabled=!this.is_disabled
			},
			handleClick(){
				set_auth().then((res)=>{
					this.data=res
					this.$alert('是否同意授权','微信小程序授权',{
						dangerouslyUseHTMLString: true,
						showCancelButton:true,
						beforeClose: (action, instance, done) => {
							//console.log(action)//点击的是取消还是确定
							if(action=='cancel'){
								done()
							}
							if(action=='confirm'){
								location=res.data
								done()
							}
						}
					});					 
				})
			},
			handleUpdate(){
					this.$router.push('/business/authorization/wechatPay')//扫描成功后跳转到微信支付页面
			}
		},
		created(){
			if (this.$route.query.nick_name) {
				this.step=2
				this.value_name=this.$route.query.nick_name
				this.value_img=this.$route.query.head_img
				this.value_ID=this.$route.query.user_name
				this.value_AppID=this.$route.query.authorizer_appid
				store.set('appId',this.$route.query.authorizer_appid)//储存appId,
				this.value_owner=this.$route.query.principal_name
				this.qrcode_url=this.$route.query.qrcode_url
				this.is_disabled=false
				//上传小程序代码
					submit_code({
						template_id:'15',//模板ID
						user_version:'1.0.1',//版本号
						user_desc:'new version',//代码描述
						authorizer_appid:this.value_AppID,
						shop_id:store.get('currentshopid'),
						color:store.get('color')
					}).then((res)=>{
						//设置服务器域名
						set_server_domain({
							authorizer_appid:this.value_AppID,
							domain:'www.linwushop.com'
						}).then((res)=>{
								//设置小程序业务域名
								set_business_domain({
									authorizer_appid:this.value_AppID,
									domain:'www.linwushop.com'
								}).then((res)=>{})
						})
					})										
					//提交数据
					app_set({
						shop_id:store.get('currentshopid'),
						appid:this.value_AppID,
						//appsecret:this.value_Secret
						qrcode_url:this.qrcode_url
					}).then((res)=>{
						if(res.error_code=='1000'){
						}
					})
			}else{
				if(store.get('appId')==''){
					this.step=1
				}else{
					this.step=2
					get_app_info({
						authorizer_appid:store.get('appId'),
						shop_id:store.get('currentshopid')
					}).then((res)=>{
						if(res.error_code==1000){
							this.value_name=res.data.nick_name
							this.value_img=res.data.head_img
							this.value_ID=res.data.user_name
							this.value_owner=res.data.principal_name
							store.set('qrcode',res.data.qrcode_url)
						}
					})
					this.is_disabled=true
					this.value_Secret=store.get('secret')
					this.value_AppID=store.get('appId')
				}
			}
		}
	}
</script>
<style lang="stylus" scoped>
.w-pages
	padding-left 20px
	padding-top 10px
.authorization_page
	background-color #f9f9f9
	padding 150px 0
	width 100%
	height 100%
	display flex
	justify-content center
.authorization_info
	font-size 15px
	.l_images_box
		width 400px
		display flex
		margin 15px 0px
		align-items center
		.l_images-right 
			margin-left 120px
			justify-content flex-start
			img
				width 60px
				height 60px
				border-radius 50%
	.l-content-operating
		width 400px
		display flex
		margin 20px 0px
		align-items center
		.l-content-right
			color #888
			margin-left 132px
			justify-content center
	.l-content-target
		width 500px
		display flex
		justify-content flex-end
		a
			color #ee0000
	.l-content-row,.l-btn-row
		display flex
		width 500px
		align-items center
		margin-bottom 10px
		position: relative
		.l-content-left,.l-btn-left
			width 150px
			display inline-block
			font-size 15px
		.l-content-right,.l-btn-right
			width 345px
			display inline-block
			img 
				width 75px
				border-radius 8px
	.l-content-btn
		width 400px
		display flex
		margin 15px 0px
		align-items center
.l-row
	width 400px
	text-align left
.textInfo
	color #aaa
	margin-left 10px
	font-size 14px
	line-height 28px
.box-card
	width 600px
	background #283643
	color #fff
	font-size 14px
	.clearfix
		display flex
		justify-content center	
p
	margin 5px 0
.answer
	text-indent 25px
.footer
	display flex
	justify-content center
	.btn
		background-color #1CC09E
		color #fff
		width 120px
		height 35px
		text-align center
		padding 0 8px
		border-radius 4px
		cursor pointer
		margin 5px 0 10px 0
		line-height 35px
	.btn:hover
		background-color #1bb08a	
@media(max-width:900px) {
	.authorization_info .l-content-row .l-content-right img{
		height:75px;
		width:auto;
	}
	.authorization_info .l-btn-row{
		display:flex
	}
	.w-pages{
		padding-left:15px;
	}
	.authorization_info .l-content-row  .l-content-right,
	.authorization_info .l-content-row  .l-content-left{
		width:100%
		
		box-sizing :border-box;
		-webkit-box-sizing :border-box
	}
	.authorization_info .l-content-row  .l-content-left{
		padding-bottom:5px;
	}

	.authorization_info{
		padding:0;
	}
	.box-card{
		width:80%;
		font-size:12px;
	}
	.authorization_info .l-content-row,
	.authorization_info .l-content-operating,
	.authorization_info .l_images_box{
		display:block;width:auto;margin:15px 0;
	}
	.l-content-row .l-content-left,.authorization_info .l-content-row .l-content-right,.authorization_info .l_images_box .l_images-left,.authorization_info .l_images_box .l_images-right,.authorization_info .l-content-target{
		display:flex;margin:0;padding:0;
	}
	.authorization_info .l_images_box .l_images-right{
		justify-content:flex-start
	}
	.authorization_info .l-content-operating .l-content-right{
		margin:10px 0;justify-content:flex-start
	}	
	.authorization_info .l-content-btn{
		width:auto;justify-content:space-between
	}
	.authorization_info .l-content-btn .textInfo{
		display:flex;
	}
	.authorization_info .l-content-target{
		width:100%;
	}
	.textInfo{
		font-size:12px;
	}

	
}
</style>