<template>
	<div class="spread">
		<div class="methods">
		<div class="title">二维码推广： </div>
		<div class="qrcode_show"><img src="@/assets/images/qrcode.jpg"></div>
		<a :href="shopqrcode" class="download">点击下载</a>
		</div>
		<div class="methods">
			<div class="title">分享推广：</div>
			<a href="https://wx.qq.com/" target="_blank"><img class="images" src="../../assets/images/wechat.png"></a>
		</div>
		<div class="methods">
			<div class="title">平台推荐：</div>
			<div class="context">邻伍商城将通过社交媒体及线下地推团队向目标用户推荐平台的商品</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				shopqrcode:'https://www.linwushop.com/downfile?filename=http://images.linwushop.com/2018/06/09-14:06:17-/fd907c0da35205396af795528a464a67.jpeg'
			}
		}
	}
</script>
<style lang="stylus" scoped>
.spread
	background-color #f9f9f9
	font-size 15px
	color #323232
	.methods
		background-color white
		display flex
		justify-content flex-start
		padding 20px
		align-items center
		margin-bottom 5px
		.qrcode_show
			padding-top 20px
			img
				width 80px
				height 80px
		.download
			margin-left 20px
			color #409EFF
			cursor pointer
.title
	margin-right 20px
	width 120px
.images
	width 25px
	height 25px
	border-radius 50%
	cursor pointer		
</style>