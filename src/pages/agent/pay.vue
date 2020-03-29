<template>
	<div class="pay_page">
		<div class="pay_title">
		<div class="title">
			<div>邻伍电商合作押金</div>
			<div class="money">￥499</div>
		</div>
		</div>
		<div class="tips">
			<div class="tips_bottom">
			<div class="topay"><img src="@/assets/images/alipay.png"><span class="way">*暂仅支持支付宝支付押金</span></div>
			</div>
		</div>
		<div class="infos">
			<div class="titles"><span>说明</span></div>
		</div>
		<div class="detail_info">
			<div class="detail">
			<div class="information">1、交付押金前请先完善<span class="self_info">个人信息</span></div>
			<div class="information">2、交付押金后，将会在三天内收到由邻伍商城寄出的宣传资料，请注意查收</div>
			<div class="information">3、成为邻伍合伙人之后，系统将根据订单中买家的收货地址判断订单归属的合伙人</div>
			<div class="information">4、当合伙人申请退出邻伍商城时，押金将退还到原付费账户中</div>
			<div class="information">5、有其他疑问请咨询客服</div>
			<div class="buttons">
			<button class="cancle"  @click="back">返回</button>
			<a href="https://www.linwushop.com/registerpay"><button class="comfirm">去支付</button></a>
			</div>
			</div>

		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{

			}	
		},
		methods:{
			back(){
				this.$router.push('/agent/joininfo')
			}
		}
	}
</script>
<style lang="stylus" scoped>
.money
	color #ff6c34
.pay_page
	background-color #f9f9f9
.pay_title
	display flex
	justify-content center
.title
	background-color #FFE0A4
	margin-top 40px
	width 800px
	padding	60px 60px
	display flex
	justify-content space-between
	font-size 20px
.tips
	display flex
	justify-content center
	.tips_bottom
		width 800px
		background-color white
		padding 30px 60px
	.topay
		display flex
		img
			width 100px
			height 30px
			cursor pointer
		.way
			line-height 30px
			font-size 12px
			margin-left 40px
.infos
	display flex
	justify-content center
	.titles
		width 800px
		background-color white
		color #323232
		text-align center
.detail_info
	display flex
	justify-content center
	.detail
		width 800px
		background-color white
		padding 20px 60px
		font-size 14px
		color #323232
		line-height 30px
.buttons
	padding 40px 100px
	text-align center
.cancle
		margin-right 20px
		background-color white
		color #aaaaaa
		cursor pointer
		border 1px solid #aaaaaa
		padding 5px 15px
		border-radius 4px
.comfirm
		margin-left 80px
		background-color #409eff
		border 1px solid #409eff
		color white
		cursor pointer
		padding 5px 10px
		border-radius 3px
</style>