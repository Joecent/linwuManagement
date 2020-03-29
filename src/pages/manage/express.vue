<template>
	<div class="spread">
		<div class="methods">
		<div class="title">二维码推广： </div>
		<div class="qrcode_show"><img :src="shopqrcode_show"></div>
		<a :href="shopqrcode" class="download">点击下载</a>
		</div>
		<div class="methods">
			<div class="title">分享推广：</div>
			<a href="https://wx.qq.com/" target="_blank"><img class="images" src="../../assets/images/wechat.png"></a>
		</div>
		<div class="methods">
			<div class="title">平台推荐：</div>
			<div class="context">会先锋将根据商家的行业、地理位置、满意度综合推荐给用户</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import {shop_desc,downfile,shop_info} from '@/utils/api'
	export default{
		data(){
			return{
				shopqrcode:'',
				shopqrcode_show:'',
				// editorText: '',
			}
		},
		methods:{
			// onContentChange(val) {
			// 	console.log('90909')

   //  		},
   //  			afterChange(){
   //  				console.log('9090')
   //  		},
			shop_info(){
				const downloadUrl = 'https://www.huixianfeng.net/downfile?filename='
				shop_info({shop_id:store.get('currentshopid')}).then((res)=>{
					console.log(res,'0')
					if (res.error_code==1000) {
					this.shopqrcode = downloadUrl + res.data.qrcode
					this.shopqrcode_show =res.data.qrcode
					}else{
						this.$message.error('未知错误！请联系客服')
					}
				})
			},
		},
		created(){
			this.shop_info()
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
.title
	margin-right 20px
	width 120px
.images
	width 25px
	height 25px
	border-radius 50%
	cursor pointer		
</style>