<template>
	<div class="member_page">
		<!--发布内容页面-->
		<div v-if="pages=='1'">
			<div class="header">配置功能页面</div>
			<div class="action">
				<div class="l-content-box">
					<span class="l-content-left">功能页面：</span>
					<!--<el-input  class="l-content-right"></el-input>-->
					<el-select v-model="value" class="l-content-right" disabled>
					</el-select>
				</div>
				<div class="l-content-box">
					<span class="l-content-left">标题：</span>
					<el-input v-model="title" class="l-content-right" disabled></el-input>				
				</div>
				<div class="l-content-box">
					<span class="l-content-left">所在服务类：</span>
					<el-select v-model="first_class" class="selectorClass" @change="handleSelected">
						<el-option v-for="(item,index) in ServiceItem" :value='item.first_class' :key='item.first_id'></el-option>
					</el-select>
					<el-select v-model="second_class" class="selectorClass" @change="handleSelected2" v-if="index!==''">
						<el-option  :value='ServiceItem[this.index].second_class' ></el-option>
					</el-select>		
				</div>
				<div class="placehoulder">
					功能页面和服务类目必须一一对应，且功能页面提供的内容必须符合该类目范围
				</div>
				<div class="l-content-box">
					<span class="l-content-left">标签：</span>
					<el-input v-model="tag" class="l-content-right"></el-input>				
				</div>
				<div class="placehoulder">
					标签用空格分开，填写与页面功能相关的标签，更容易被搜索
				</div>
			</div>
			<div class="footer">
				<el-button type="primary" @click="handleSubmit">提交审核</el-button>
			</div>
		</div>
		<!--二维码列表-->
		<!--正式版-->
		<div v-if="pages=='2'">
			<div class="l-container-row" >
				<div class="version">线上版本</div>
				<!--<div>版本号</div>
				<div>{{editionList.edis}}</div>-->
				<div class="active qr_code">
					<i class="el-icon-star-on"></i>正式小程序二维码
					<img :src="images2">
				</div>
			</div>
		<!--体验版-->
			<div class="l-container-row l-container-two">
				<div class="info version">体验版 <span>{{msg}}</span></div>
				<!--<div>版本号</div>
				<div>1.0.1</div>-->
				<div><span  class="time">更新时间</span><span class="time"> {{experience.time}}</span></div>
				<div class="notactive qr_code">
					<i class="el-icon-star-on"></i>体验小程序二维码
					<img :src='images'>
				</div>
				<div class="btn">
					<el-button v-if="code==''|| code=='1002' || code=='1000'" type="primary" @click="handleExper">提交体验版</el-button><!--失败或第一次提交时显示查看原因-->
					<el-button v-if="code=='1002'" @click="handlefailure">查看原因</el-button><!--失败时显示查看原因-->
					<el-button v-if="code=='1000'" type="success" @click="handleRelease">发布正式版</el-button><!--成功时,显示发布正式版-->
				</div>
				<div class="wechat">
					<div class="l-button" @click="is_show_wechat=!is_show_wechat">设置体验权限</div>
					<el-input class="l-input" placeholder="请输入微信号" size="small" v-model="value_wechat" v-if='is_show_wechat'>
						<el-button slot="append" @click="handleWechat">确定</el-button>
					</el-input>					
				</div>
			</div>
		</div>

	</div>
</template>
<script type="text/javascript">
import {get_category,submit_audit,app_get,get_exp_version,get_audit_status,release,bind_tester,update_access_token} from '@/utils/api'
import * as store from '@/utils/sdk/store'
	export default{
		data(){
			return{
				value:'pages/shoppages/index/index',
				title:'砚茶春',
				msg:'',
				reason:'',
				index:'',
				code:'',
				is_show_wechat:false,
				images:'',
				value_wechat:'',
				images2:store.get('qrcode'),
				pages:'2',
				tag:'',
				authorizer_appid:'',
				ServiceItem:[],
				first_class:'',
				second_class:'',
				editionList:{edis:'1.0.0.1',time:'2018-10-31'},
				experience:{
					 edis:'2.0.0.1',time:''
				}					 				 
			}
		},
		methods:{
			handlefailure(){//审核失败时查看原因
					this.$message.error(this.reason)
			},
			handleWechat(){
				if(this.value_wechat==''){
					this.$message.error('微信号不能为空')
				}else{
					bind_tester({
						authorizer_appid:this.authorizer_appid,
						wechatid:this.value_wechat
					}).then((res)=>{
						console.log(res)
						if(res.error_code=='1000'){
							this.$message.success('提交成功')
							this.is_show_wechat=false
						}else{
							this.$message.error('未查找到微信账号，或已经添加成功')
						}
					})
				}				
			},
			handleRelease(){
				release({
					authorizer_appid:this.authorizer_appid
				}).then((res)=>{
					if(res.error_code=='1001'){
						this.$message.error("发布已完成")
					}else if(res.error_code=='1000'){
						this.$message.success('发布成功')
					}
				})
			},
			handleSelected(e){
				this.second_class=''
				for(var i=0;i<this.ServiceItem.length;i++){
					if(this.ServiceItem[i].first_class==e){
						this.index=i;
						return 
					}
				}
			},
			handleSelected2(e){
			},
			handleExper(){
				this.pages='1';
			},
			handleSubmit(){//提交数据
				if(this.first_class==''||this.second_class==''){
					this.$message.error("服务类不能为空")
				}else if(this.tag==''){
					this.$message.error("标签不能为空")
				}else{
					submit_audit({
						shop_id:store.get('currentshopid'),
						authorizer_appid:this.authorizer_appid,
						first_id:this.ServiceItem[this.index].first_id,
						second_id:this.ServiceItem[this.index].second_id,
						first_class:this.first_class,
						second_class:this.second_class,
						tag:this.tag.split(" ").join(",")
					}).then((res)=>{
						if(res.error_code=='1000'){
							this.$message.success('提交成功')
							this.pages='2'
						}
						if(res.error_code=='1002'){
							this.$message.error(res.msg)
							this.first_class='',
							this.second_class=''
						}
					})
				}								
			},
		},
		created(){
			this.reason=''
			this.code=''
			this.authorizer_appid=store.get('appId')//获取储存再本地的appid
			get_category({//通过appid获取数据
				authorizer_appid:this.authorizer_appid
			}).then((res)=>{
				if(res.error_code=='1000'){
					this.ServiceItem=res.data.category_list;
					this.title=res.data.title
				}
			})
			//获取二维码
			get_exp_version({
				authorizer_appid:this.authorizer_appid,
				path:'pages/shoppages/index/index'
			}).then((res)=>{
				this.images='data:image/png;base64,'+res;
			})			
			//获取审核状态版本
			get_audit_status({
				authorizer_appid:this.authorizer_appid
			}).then((res)=>{
				console.log(res)
				if(res.error_code=='1000'){
					this.experience.time=res.data
					this.msg=res.msg//审核通过
					this.code=res.error_code
				}else if(res.error_code=='1003'){
					this.msg=res.msg//审核中
					this.code=res.error_code
				}else if(res.error_code=='1002'){
					this.msg=res.msg//审核失败
					this.code=res.error_code
					this.reason=res.data.reason
				}else if(res.error_code=='1005'){
					this.$message.error('您还未授权,请重新授权')
				}
			})
		}
	}
</script>
<style lang="stylus" scoped>
.member_page
	background-color #f9f9f9
	padding 50px 20px 180px
	width 100%
	height 100%
	font-size 14px
.header
	font-size 16px
	font-weight bold
.action
	width 550px
	height auto
	.l-content-box
		margin-top 15px
		display flex
		align-items center
		height auto
		.l-content-left
			padding-left 20px
			display flex
			width 35%
		.l-content-right
			width 65%
		.selectorClass
			width 160px
			margin-right 10px
	.placehoulder
		color #aaaaaa
		margin-left:35%
		margin-top 5px
</style>
<style scoped>
	.l-container-row{
		width:100%;
		height: auto;
		margin-bottom:20px;
		border:1px solid rgba(187,187,187,1);
		background: #f2f2f2;
		color: rgba(16, 16, 16, .8);
		font-size: 15px;
		font-family: Roboto;
		padding:5px 0px 5px 30px;
		position: relative;
	}
	/*.version{
		font-weight:bold
	}*/
	.textInfo{
		color:#aaa;
		margin-left:10px;
		font-size:14px;
		line-height:28px
	}	
	.l-container-two .info{
		display:flex;
		justify-content: space-between;
		padding-right:20px
	}
	.l-container-two .info span{
		text-align:right;font-size:18px
	}
	.l-container-row>div{
		margin-top:8px
	 } 
	 .l-container-row .qr_code{
		 width:155px;
		 display:inline-block;
		 padding:5px;
		 cursor: pointer;
		 position: relative;
	 }
	 .l-container-row>div.active{
		 margin:8px 0;
		 border:1px solid #1cc09e;
		 color:#1cc09e;
	 }
	.l-container-row>div.notactive{
		 border:1px solid #409EFF;
		 color:#409EFF;
	 }
	 .l-container-row .qr_code img{
		 width:100%;
		 position: absolute;
		 top:31px;
		 right:0;
		 height:0;
		 transition: .3s linear;
		 z-index:100;
	 }
	 .l-container-row .qr_code:hover>img{
		height:150px;
	 }
	 .l-container-row>.btn{
		 position: absolute;
		 right:5%;
		 bottom:20%;
	 }
	 .l-container-row>.btn span{
		 display:inline-block;
		 padding:8px;
		 margin:0 5px;
		 color:#409EFF;
		 border: 1px solid #409eff
	 }
	 .l-button{
		color:#888;
		margin-right:5px;
		text-align:center;
		cursor:pointer;
		height:32px;
		line-height:32px;
	 }
	 .wechat{
		 display:flex;
	 }
	 .wechat>.l-input{
		 width:220px;
	 }
	@media(max-width:900px ) {
		.l-container-row{
			height: auto;
			font-size:14px
		}
		.l-container-row>.btn{
		 	display: block;
		 	position:static;
	 	}
		.action{
			width:auto;
			height: auto;
		}
		.l-container-row .qr_code{
			width:155px;
			display:inline-block;
		 	padding:8px;
			position:static;
		 	cursor: pointer;
	 	}
		.l-container-row .qr_code img{
			width:150px;
		 	position: absolute;
		 	right:5px;
			top:8px;
		 	height:0;
		 	transition: .3s linear
		}
		.action .l-content-box{
			display:block;
			margin-top:15px;
			padding-left:10px;
		}
		.action .l-content-box .l-content-left,.action .l-content-box .l-content-right{
				display:flex;
				width:80%;
				padding-left:0px;
				margin:5px 0;
		}
		.action .placehoulder{
			width:80%;
			margin-left:0;
			padding-left:10px;
			margin-bottom:5px;
		}
		.l-container-row>div .time{
			display:block;margin:5px 0;
		}
	}
</style>
