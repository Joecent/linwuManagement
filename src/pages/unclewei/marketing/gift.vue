<template>
	<div class="member_page">
		<el-carousel height="300px">
      		<el-carousel-item v-for="item in 4" :key="item">
        		<h3>{{ item }}</h3>
      		</el-carousel-item>
    	</el-carousel>
		<!-- <div class="developing"><img src="@/assets/images/developing.png">
		<div class="tips">开发团队正在全力完善功能，请大家继续关注哦！</div>
		</div> -->
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
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
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