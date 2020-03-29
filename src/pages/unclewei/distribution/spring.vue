<template>
	<div class="choosepage">
		<div class="title">
			<div class="avatarname">
				<div class="topavatar">{{user_name}}</div>
				<div class="name">{{user_phone}}</div>
			</div>
			<div class="outname">
				 <div class="adminname">今日收益：<span class="money">￥{{todayMoney}}</span></div> 
				<div class="adminname">余额：<span class="money">￥{{totalMoney}}</span></div>
				<div class="out" @click="to_get_money">提现</div> 
			</div>
		</div>
		<div class="choose">
			<!-- <div class="add">
				<div class="add_button">代理店铺</div>
				<button class="out_button" @click="out">注销</button> 
				
			</div> -->
			<div class="shops">
				<div class="lee-title1">店铺列表</div>
				<div class="shop" v-for='item in shops' @click='chooseShop'>
					<div class="shop_info">
						<img :src="item.photo">
						<h2>{{item.name}}</h2>
						<div class="trade">今日交易：<span class="money">￥{{item.recordMoney}}</span></div>
					</div>
				</div>

			</div>
		</div>
		<!-- 提现申请-->
			<el-dialog title="支付宝提现申请" :visible.sync="get_money_dialog" :modal-append-to-body='false'>
				<el-form :model="form">
					<el-form-item label="支付宝账号" :label-width="formLabelWidth">
						<el-input v-model="form.number" placeholder='请输入支付宝账号' auto-complete="off"></el-input>
					</el-form-item>
					
					<el-form-item label="真实姓名" :label-width="formLabelWidth">
						<el-input v-model="form.name" placeholder='请输入真实姓名' auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="提现金额" :label-width="formLabelWidth">
						<el-input v-model="form.money" placeholder="请输入提现金额" auto-complete="off"></el-input>
					</el-form-item>
				</el-form>
				<div class="options">
					<button class="comfirm" @click="complete">确认</button>
				    <button class="cancle_edit" @click="get_money_dialog = false">取消</button>
				</div>
			</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import {newCreateShop,
			show_shop,
			getFriendIncome,
			friendCash} from '@/utils/api'
	import * as store from '@/utils/sdk/store'
	export default{
		data(){
			return{
				fullscreenLoading: false,
				show: false,
				shops: [],
				get_money_dialog: false,
				secondStep: false,
				logo_upload_success: false,
				upload_success: false,
				form: {
					name: '',
					number: '',
					money: '',
				},
				formLabelWidth: '',
				imageUrl: '',
				backimageUrl: '',
				user_name:store.get('user').nickname,
				user_phone:store.get('user').phone,
				todayMoney:'0',
				totalMoney:'0'
			}
		},
		methods:{
		remove_photo() {
				this.upload_success = false
			},
			remove_avatar() {
				this.logo_upload_success = false
			},
			out() {
				this.$router.push('/login')
			},
			//admin_id后台管理员id  blance_cash 提现余额 cash_type=2 zfb_name支付宝姓名 zfb_username支付宝账号
			complete() {
			 	var flag = true
				if (this.form.number == '') {
					this.$message.error('请输入支付宝账号')
				} else if (this.form.name == '') {
					this.$message.error('请输入真实姓名')
				} else if (this.form.money == '') {
					this.$message.error('请输入提现金额')
				}else if (this.form.money>this.totalMoney) {
					this.$message.error('提现金额超出余额')
				}else {
					flag = false
				}
				if (flag == false) {
					friendCash({
						admin_id:store.get('user').id,
						blance_cash:this.form.money,
						cash_type:2,
						zfb_name:this.form.name,
						zfb_username:this.form.number
					}).then((res) => {
						if (res.status==1) {
							this.$message.success('提现成功，48小时内到账！')
							this.get_money_dialog=false
							this.show_shop()
						};
					})
				};
			},
			to_get_money(){
				this.get_money_dialog = true
			},
			get_money(){
				// friendCash({
				// 	admin_id: store.get('user').id,
				// 	 blance_cash:
				// 	  cash_type:2,
				// 	  zfb_name:
				// 	  zfb_username:
				// })
			},
			show_shop() {
				console.log(store.get('user'),'4444')
				getFriendIncome({
					admin_id: store.get('user').id
				}).then((res) => {
					if (res.error_code == 1000) {
						this.shops = res.data.shop
						this.todayMoney = res.data.totalMoney
						this.totalMoney = res.data.currentDayMoney
					};
				})
			},
			 chooseShop(item) {
			 	this.$router.push('/login')
			 }
			},
			created(){
					//console.log('22222')
					this.show_shop()
				 }
}
</script>

  <style lang="stylus" scoped>
.choosepage{
	width:94%;
	margin-left:3%;
	.title{
		display:flex;
		justify-content:space-between;
		margin-top:50px;
		.avatarname{
			height:50px;
			display:flex;
			.topavatar{
				margin-top:10px;
				font-size:18px;
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
			color:#409EFF;
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
.add
	width 100%
	height 50px
	display flex
	justify-content space-between
	background-color #409EFF
	.add_button
		background-color #409EFF
		color white
		line-height 50px
		margin auto 20px
		padding 0 10px
	.out_button
		background-color #409EFF
		color white
		line-height 50px
		margin auto 20px
		padding 0 10px
		cursor pointer
.trade
	text-align center
	font-size 15px
	color #323232
.money
	color #409EFF
.shops
	display flex
	flex-wrap wrap
	background-color white
	padding 30px 32px
	.shop
		width 209px
		height 220px
		float left
		display flex
		justify-content center
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
	padding 0 30%
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
	// margin-left 20px
	// display flex
	// justify-content space-between
	  width 100%
	//margin-top 10px
	display flex


.el-radio+.el-radio
	margin-left 0

.el-radio
	// width 50%

   // 选择店铺样式


  .type_chooss-title p{
	  margin inherit
  }

	.type_choos-imgs img{
		max-width 200px;
		min-height 140px;
	}

// .type_chooss-title{
// 	border 1px solid #999
// }

.is-checked .type_choose-con{
	border 1px solid red
	box-sizing border-box
}

.type_choose-con{
	border 1px solid #fff
}

.type_chooss-title {
	background #2589FF
	min-height 80px;
	color #fff;
	text-align center
    padding-top 15px;
	font-size 14px;
	box-sizing border-box
}

.type_chooss-title p{
	line-height 2
}

 </style>

<style lang="stylus" scoped>
	@import '../../../assets/css/chooseshop.css';
	.el-dialog {
		width: 600px;
	}

	.el-radio {
		float: left;
		box-sizing border-box
	}

	// .type_choose {
	// 	display: block;
	// }
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
		.add .out_button{
			background: none;
			border: none;
			width:80px;
		}
		.type_choose{
			margin-left 20px
		}
		.options{
			padding 0 15%
		}
	}

	@media(max-width:760px) {
		.choosepage,
		.choosepage .choose {
			padding: 0;
		}
		.choosepage .title{
			padding:0;
			display:inline;
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
		.outname{
			padding-top:0;
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
			margin-left 50px

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

	@media(max-width:760px) {
		.type_choose{
        //    margin-left 25px;
		}
	}
</style>


<style>
  .type_choose .el-radio__inner ,.type_choose .el-radio__input {
     display: none;
   }

   .type_choose .el-radio__label{
	   font-size: 0
   }

</style>
