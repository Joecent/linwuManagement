<template>
	<div class="member_page">
		<div class="developing"><img src="@/assets/images/developing.png">
		<div class="tips">开发团队正在全力完善功能，请大家继续关注哦！</div>
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
		
		},
		created(){

		}
	}
</script>
<style lang="stylus" scoped>
.member_page
	background-color #f9f9f9
	padding 150px 0
	width 100%
	height 100%
	display flex
	justify-content center
.developing
	width 400px
	text-align center
	img 
		width 240px
		height 180px
		margin-left 80px
	.tips
		margin-top 20px
		font-size 18px
		color #aaaaaa
</style>