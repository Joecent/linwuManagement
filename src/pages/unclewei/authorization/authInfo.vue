<template>
	<div class="authorization_info">
			<div class="l_images_box">
				<div class="l_images-left"><label>小程序头像</label></div>
				<div class="l_images-right"><img src="http://images.huixianfeng.net/crop/2018/05/18-19:14:14-216-2439170.jpeg"></div>
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
			<div class="l-content-operating">
				<div class="l-content-left"><label>运营主体</label></div>
				<div class="l-content-right">
					<div class="l-content-listitem" v-for="(item,index) in value_list" :key="index">
						{{item}}
					</div>
				</div>
			</div>
			<div class="l-content-row">
				<div class="l-content-left"><label>AppSecret(小程序密钥)</label></div>
				<div class="l-content-right"><el-input v-model="value_Secret" placeholder="请输入 APP Secret"></el-input></div>
			</div>
			<div class="l-content-row">
				<div class="l-content-left"><el-button type="primary">更新</el-button></div>
				<div class="l-content-right"><el-button type="primary" plain @click="handleagain">重新授权小程序</el-button></div>
			</div>
	</div>
</template>
<script type="text/javascript">
import {set_auth} from '@/utils/api'
	export default{
		data(){
			return{
				data:'',
				value_name:'研茶春',
				value_ID:'123456789',
				value_AppID:'987654321',
				value_Secret:'',
				value_list:[
					'罗贯中>三国演义',
					'吴承恩>西游记',
					'曹雪芹>红楼梦',
					'施耐庵>水浒传'
				]			
			}
		},
		methods:{
			
		},
		created(){

		}
	}
</script>
<style lang="stylus" scoped>
.authorization_info
	padding 40px 20px
	.l_images_box
		width 400px
		display flex
		margin 15px 0px
		align-items center
		.l_images-right 
			margin-left 120px
			justify-content center
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
			margin-left 120px
			justify-content center
	.l-content-row
		width 400px
		display flex
		margin 15px 0px
		justify-content space-between
		align-items center
		.l-content-right 
			margin-left 30px
			justify-content center
p
	margin 5px 0
@media(max-width:900px) {
	.box-card{
		width:50%;
		font-size:12px;
	}
	.l-content-row{
		width:320px
	}	
}
</style>