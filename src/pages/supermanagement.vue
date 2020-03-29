	<template>
		<div class="choosepage">
			<!-- c超级管理员系统 -->
			<div class="title">
				<div class="avatarname">
					<div class="topavatar"><img src="../assets/images/logo.png"></div>
					<!-- <div class="name">选择店铺</div> -->
				</div>
				<div class="outname">
					<!-- <div class="adminname">是我哈哈哈</div> -->
					<div class="out" @click="out">注销</div>
				</div>
			</div>
			
			<div class="choose">
						<div class="choose-con">
						<div class="add">
							<!-- 创建店铺 -->
						<button class="add_button" @click="addshop = true"><i class="el-icon-plus"></i> 创建店铺</button>
						
							<!-- 权限管理 -->
						<button class="add_button" ><i class="el-icon-plus"></i> 权限管理</button>
						</div>
						</div>
							
						<div class="logo-name"> <a>选择店铺</a></div>
						
						<div class="shops">
						<div class="lee-title1">店铺列表</div>
						<div class="shop" v-for='item in shops' @click='chooseShop(item)'>
							<div class="shop_info">
								<img :src="item.photo">
								<h2>{{item.name}}</h2>
							</div>
							<div class="hot-title">基础班</div>
						</div>
						<div class="shop" @click="addshop = true">
							<img src="../assets/images/build.png" class="build_image">
						</div>
						</div>
					</div>

					<!-- 创建店铺 -->
			<div class="dialog_dialog">
				<el-dialog title="创建店铺" :visible.sync="addshop">
					<el-form :model="form">
						<el-form-item label="店铺名称" :label-width="formLabelWidth">
							<el-input v-model="form.name" placeholder='请输入店铺名称' auto-complete="off"></el-input>
						</el-form-item>
						<!-- <el-form-item label="店铺地址" :label-width="formLabelWidth">
							<el-input v-model="form.shop_address" placeholder='请输入店铺地址' auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="店铺定位" :label-width="formLabelWidth">
							<el-input v-model="form.longitude" style='width:49%' placeholder='请输入经度' auto-complete="off"></el-input>
							<el-input v-model="form.latitude" style='width:49%' placeholder='请输入纬度' auto-complete="off"></el-input>
							<div class="lee-map">
								可通过<a target="_blank" href='https://lbs.qq.com/tool/getpoint/'> 腾讯地图 </a>获取经纬度
							</div>
						</el-form-item>
						<el-form-item label="营业时间" :label-width="formLabelWidth">
							<el-input v-model="form.business_hours" placeholder='请输入店铺营业时间（如：9：00-22：00）' auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="客服电话" :label-width="formLabelWidth">
							<el-input v-model="form.cs_phone" placeholder="请输入客服电话（选填）" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="店铺WIFI" :label-width="formLabelWidth">
							<el-input v-model="form.shop_wifi_name" style='width:49%' placeholder='WIFI名称（选填）' auto-complete="off"></el-input>
							<el-input v-model="form.shop_wifi_pwd" style='width:49%' placeholder='WIFI密码(选填)' auto-complete="off"></el-input>
						</el-form-item> -->
						<!-- <el-form-item label="上传店铺logo" :label-width="formLabelWidth">
							<el-upload class="avatar-uploader" action="https://www.linwushop.com/upload_img" list-type="picture-card"
							:on-success="handleAvatarSuccess" :on-remove="remove_avatar" :before-upload="beforeAvatarUpload">
								<div class="logo_preview" v-if="logo_upload_success">
									<div>预览：</div><img :src="imageUrl">
								</div>
								<div v-if="logo_upload_success==false" class="add_picture">
									<i class="el-icon-plus avatar-uploader-icon"></i>
									<div class="add_picture_text">（可选）</div>
								</div>
							</el-upload>
						</el-form-item>
						<el-form-item label="上传背景图片" :label-width="formLabelWidth">
							<el-upload class="upload-demo" drag action="https://www.linwushop.com/upload_img" :on-success='uploadsuccess'
							:before-upload="beforeDemoUpload" :on-remove="remove_photo">
								<div v-if="upload_success" class="shop_photo"><img :src="backimageUrl"></div>
								<i v-if="upload_success==false" class="el-icon-upload"></i>
								<div v-if="upload_success==false" class="el-upload__text">将文件拖到此处，或<em> 点击上传</em></div>
								<div v-if="upload_success==false" class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2M</div>
							</el-upload>
						</el-form-item> -->
						<el-form-item label="请选择模板类型" :label-width="formLabelWidth">
							<el-radio-group v-model="form.shop_type" class="type_choose">
								<el-radio label="电商" class="type-one"></el-radio>
								<el-radio label="餐饮"></el-radio>
								<el-radio label="服务"></el-radio>
								<el-radio label="票务"></el-radio>
							</el-radio-group>
						</el-form-item>
						<!-- <el-form-item label="请输入推广码" :label-width="formLabelWidth">
				<el-input v-model="form.plan_code" auto-complete="off" placeholder='请输入推广码'></el-input>
				</el-form-item> -->
						<!-- <el-form-item label="选择会员加入形式" :label-width="formLabelWidth">
				<el-switch
					v-model="form.member_type"
					active-text="付费加入"
					inactive-text="免费进入">
					</el-switch>
				</el-form-item>

				<el-form-item label="每年收费" :label-width="formLabelWidth" v-if='form.member_type'>
				<el-input v-model="form.member_money" auto-complete="off" placeholder='请输入金额'></el-input>
				</el-form-item> -->

					</el-form>
					<div class="options">
						<button class="cancle_edit" @click="addshop = false">取消</button>
						<button class="comfirm" @click="complete" v-loading.fullscreen.lock="fullscreenLoading">完成</button>
					</div>
				</el-dialog>
			</div>
		</div>
	</template>


<script type="text/javascript">
	import * as store from '@/utils/sdk/store'
	import {
		create_shop,
		show_shop
	} from '@/utils/api'

	export default {
		data() {
			return {
				fullscreenLoading: false,
				show: false,
				shops: [],
				addshop: false,
				secondStep: false,
				logo_upload_success: false,
				upload_success: false,
				form: {
					name: '',
					photo: '',
					shop_type: '',
					logo: '',
				},
				formLabelWidth: '',
				imageUrl: '',
				backimageUrl: '',
			}
		},

		methods: {
			remove_photo() {
				this.upload_success = false
			},
			remove_avatar() {
				this.logo_upload_success = false
			},
			out() {
				this.$router.push('/login')
			},
			uploadsuccess(res, file, fileList) {
				this.backimageUrl = URL.createObjectURL(file.raw)
				this.upload_success = true
				this.form.photo = res.data.img_url
			},
			nextStep() {
				this.addshop = false
				this.secondStep = true
			},
			laststep() {
				this.secondStep = false
				this.addshop = true
			},
			handleAvatarSuccess(res, file) {
				this.logo_upload_success = true
				this.imageUrl = URL.createObjectURL(file.raw)
				this.form.logo = res.data.img_url
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/bmp'
				const isLt2M = file.size / 1024 / 1024 < 1

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG/PNG/BMP 格式!')
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 1MB!')
				}
				return isJPG && isLt2M
			},
			beforeDemoUpload(file) {
				const isJPG = file.type === 'image/jpeg' || 'iamge/png' || 'image/bmp'
				const isLt2M = file.size / 1024 / 1024 < 2

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!')
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!')
				}
				return isJPG && isLt2M
			},
			complete() {
				var flag = true
				if (this.form.name == '') {
					this.$message.error('请输入店铺名称')
				} else if (this.form.type == '') {
					this.$message.error('请选择行业类型')
				} else {
					flag = false
				}
				
				if (flag == false) {
					console.log("aa")	
					this.fullscreenLoading = true
					let params = Object.assign({}, this.form)
					params.token = store.get('token')
					create_shop({
						params
					}).then((res) => {
						if (res.error_code == 1000) {
							this.$message.success('创建成功')
							this.addshop = false
							this.show_shop()
							this.form = {
								name: '',
								//photo: '',
								shop_type: '',
								//logo: '',
								//shop_address: '',
								//longitude: '',
								//latitude: '',
								//cs_phone: '',
								//business_hours: '',
								//shop_wifi_name: '',
								//shop_wifi_pwd: '',
								bg_picture_url: ''
							}
							this.fullscreenLoading = false
						} else if (res.error_code == 404) {
							this.$message.error('用户认证失败，请重新登录')
							this.fullscreenLoading = false
						} else if (res.error_code == 1003) {
							this.$message.error(res.msg)
							this.fullscreenLoading = false
						} else if (res.error_code == 1001) {
							this.$message.error('非法请求')
							this.fullscreenLoading = false
						};

					})
				};

			},

			show_shop() {
				show_shop({
					token: store.get('token')
				}).then((res) => {
					if (res.error_code == 1000) {
						this.shops = res.data
					};
				})
			},

			chooseShop(item) {
				store.set('currentshopid', item.id)
				if (item.shop_type == '电商') {
					store.set('shop_type', 1)
				} else if (item.shop_type == '餐饮') {
					store.set('shop_type', 2)
				} else if (item.shop_type == '服务') {
					store.set('shop_type', 3)
				} else if (item.shop_type == '票务') {
					store.set('shop_type', 4)
				}
				if (store.get('shopAuth') == 1) {
					this.$router.push({
						path: '/home/order/order_data'
					})
				} else if (store.get('shopAuth') == 3) {
					this.$router.push({
						path: '/business/order/order_data'
					})
				} else if (store.get('shopAuth') == 2) {
					this.$router.push({
						path: '/agent/order/order_data'
					})
				};
			}


		},
		created() {
			this.show_shop()
		}
	}
</script>

 <style lang="stylus" scoped>
.choosepage{
	width:900px;
	margin:0 auto;
	.title{
		width:900px;
		display:flex;
		justify-content:space-between;
		margin-top:50px;
		.avatarname{
			height:50px;
			display:flex;
			.topavatar{
				margin-top:10px;
			img{
				height:24px;
				width:80px;

			}
		}
		.name{
			height:50px;
			padding-top:15px;
			font-size:15px;
			margin-left:20px;
		}
		}
		
		.outname{
			height:50px;
			padding-top:18px;
			display:flex;
			font-size:14px;
			.out{
			color:#409EFF;
			cursor:pointer;
		}
		.adminname{
			margin-right:20px;
		}
		}
	}
	.choose{
		width:100%;
		
	}
	#el-title .el-dialog{
		width:100%;
	}
}
#el-title .el-dialog__wrapper{
	.el-dialog{
		height:100px;
		float:right;
	}
}
.el-button--primary{
	border: 1.5px solid white
	background-color:#409EFF;
	font-size:16px;
}
.el-button--primary:hover{
	
}

.logo-name{
	text-align:center;
	margin:30px 0;
	font-size 16px;
	color:#409eff;
}

.logo-name a{
	text-decoration: underline
}

.avatar-uploader{
	display flex
}
.logo_preview{
	margin-top 80px
	margin-left 30px
	img{
		width:80px;
		height:80px;
		margin-top 20px
		border-radius 50%
	}
}
.add_picture{
	display flex
	font-size 14px
	.add_picture_text{
		width 80px
		line-height 80px
	}

}



.avatar-uploader .el-upload {
    border: 1px dashed black;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 30px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
	width 60px
	height 60px
  }
  .el-icon-upload{
  	margin 20px 0 0
  }


.hot-title{
	width:68px;
	height 68px;
	border 1px solid #999;
	border-radius 50%;
	text-align:center;
	line-height 68px;
	position:absolute;
	top:-30px;
	right 0;
	background:#fff;
	font-size 14px;
}



.add
	width 100%
	height 50px
	display flex
	justify-content flex-end
	background-color #409EFF
	.add_button
		background-color #409EFF
		border 1px solid white
		color white
		height 30px
		margin auto 20px
		padding 0 10px
		border-radius 3px
		cursor pointer
.shops
	display flex
	flex-wrap wrap
	// background-color white
	padding 30px 32px
	.shop
		width 209px
		height 220px
		float left
		display flex
		justify-content center
		position relative
		margin-top 20px
		.shop_info
			display inline-block
			width 144px
			height 180px
			border-radius 6px
			over-flow hidden
			position relative
			cursor pointer
			img
				width 100%
				height 100%
				border-radius: 6px;
			h2
				position absolute
				bottom 0
				width 144px
				height 60px
				background-color #FFFFFF
				opacity 0.85
				font-size 15px
				font-weight normal
				font-stretch normal
				line-height 60px
				text-align  center
				letter-spacing: 0px
				colo: #323232
.build_image
	width 144px
	height 180px
	cursor pointer
#el-title .el-form-item
	.el-form-item__label
		width 150px !important
		font-size 15px
.el-input
	width 80%
.backimage
	width 300px
	height 184px
.options
	margin-top 20px
	display flex
	justify-content space-between
	padding 0 15%
.cancle_edit
	color #C0C4CC
	background-color white
	cursor pointer
	padding 5px 20px
	border-radius 3px
	border 1px solid #C0C4CC
.comfirm
	color white
	background-color #409EFF
	cursor pointer
	padding 5px 20px
	border-radius 3px
.el-checkbox-group
	display flex
	flex-wrap wrap
	width 88%
.el-checkbox
	margin-right 60px
.shop_photo
	img
		width 300px
		height 184px
.type_choose
	margin-left 20px
	display flex
	justify-content space-between
	width 80%
	margin-top 10px
.el-radio+.el-radio
	margin-left 0
.el-radio
	width 50%
 </style>

<style lang="stylus" scoped>
	@import '../assets/css/chooseshop.css';
	.el-dialog {
		width: 600px;
	}

	.el-radio {
		float: left;
	}

	.type_choose {
		display: block;
	}
	.lee-title1 {
		display: none;
	}

	@media(max-width:900px) {
		.lee-title1 {
			display: block;
			color: #1a1a1a;
			border-left: 3px solid #ff8661;
			height: 18px;
			line-height: 18px;
			text-align: left;
			margin-bottom: 10px;
			padding-left: 8px;
			font-size: 14px;
			position: relative;
		}

		.lee-title1:before {
			content: "";
			position: absolute;
			height: 18px;
			width: 1px;
			background: #ff8661;
			left: 2px;
			top: 0;
		}

		.choosepage,
		.choosepage .title,
		.choosepage .choose {
			width: 100%;
			padding: 0 50px;
			box-sizing: border-box;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;

		}

		.shops {
			text-align: center;
			display: block;
			flex-wrap: initial;
			border-top: 2px solid #FF8661;
		}

		.shops .shop {
			display: inline-block;
			float: none;
			vertical-align: top;
		}

		.build_image {
			margin: 0 auto;
		}

		.choosepage .title {
			margin-top: 0;
			border-bottom: 2px solid #FF8661;
		}

		.choosepage .title .outname {
			padding-top: 15px;
		}

		.add {
			background: #ff8661;
			margin: 15px auto;
			width: 90%;
			height: 40px;
		}

		.add .add_button {
			background: none;
			border: none;
			width: 100%;
		}
	}

	@media(max-width:760px) {
		.choosepage,
		.choosepage .title,
		.choosepage .choose {
			padding: 0;
		}

		.shops .shop {
			width: 47%;
			margin-right: 4%;
			height: auto;
			margin-bottom: 15px;
			vertical-align: top;
		}

		.shops .shop .shop_info,
		.build_image,
		.shops .shop .shop_info h2 {
			width: 100%;
		}

		.shops .shop:nth-child(odd) {
			margin-right: 0;
		}

		.shops .shop .shop_info h2 {
			opacity: 1;
			background: rgba(255, 255, 255, .9);
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 14px;
			padding: 0 10px;
			height: 30px;
			line-height: 30px;

		}

		.lee-map {
			font-size: 12px;
			margin-top: 5px;
			color: #C0C4CC;
		}

		.lee-map a {
			color: #409eff;
		}

		.avatar-uploader,
		.add_picture,
			{
			display: block;
			width: 100%;
		}

		.el-upload__tip {
			color: #C0C4CC;
		}

		.add_picture .add_picture_text {
			color: #409eff;
		}

		.el-upload-dragger .el-upload__text {
			padding-top: 30px;
		}


		.shops {
			width: 100%;
			padding: 15px 5%;
			box-sizing: border-box;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
		}

		.el-radio {
			float: left;
			margin-bottom: 5px;
		}

		.type_choose {
			display: block;
		}

		.el-dialog {
			width: 90%;
		}

		.el-upload-dragger {
			width: 100%;
		}

		.choosepage .title {
			padding: 0 20px;
		}

		.adminname,
		.name {
			display: none;
		}

		.el-input {
			width: 100%;
			height: 30px;
			line-height: 30px;
		}

		.el-form-item {
			margin-bottom: 10px;
		}

		.el-input__inner {
			height: 30px;
			line-height: 30px;
		}

		.el-form-item__label {
			width: 100%;
			text-align: left;
			font-size: 14px;
			line-height: 25px;
			height: 25px;
			float: none;
		}

		.el-form-item__content {
			line-height: inherit;
			height: auto;
		}

		.el-dialog__header {
			text-align: center;
		}

		.el-form-item__content {
			display: block;
			width: 100%;
		}

		.shop_photo img {
			width: 100%;
			height: auto;
		}

		.el-upload-list--picture-card {
			display: block;
			width: 100%;
		}

		.el-upload-list--picture-card .el-upload-list__item {
			width: 100%;
			height: auto;
		}
	}
</style>
