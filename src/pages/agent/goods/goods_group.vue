<template>
	<div class="cates_page">
		<div class="addcates">
		</div>
		<div class="cates">
			<div class="cate" v-for="item in cates">
				<div class="cate_sort_name">
					<div class="sort">{{item.sort}}、</div>
					<div class="cate_name">{{item.cate_name}}</div>
				</div>
				<div class="goods_num">
					商品数：{{item.goods_num}}
				</div>
				<div class="editcates">
					<div class="edit" @click="toeditcate(item.cate_id)">查看</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import {sel_cate,del_cate,add_cate,edit_cate} from '@/utils/api'
	export default{
		data(){
			return{
				showcates:false,
				cates:[],
				showaddcate:false,
				showeditcate:false,
				is_delete:false,
				cate_id:'',
				indexnum:'',
				delete_all:false,
				addedcate:{
					name:"",
					sort:'',
				},
				editcate:{
					name:'',
					sort:'',
					id:'',
				},
			}
		},
		methods:{
			toeditcate(id){
				this.$router.push({path:'/agent/goods/goods',query:{cate_id:id}})
			},
			showcate(){
				sel_cate({shop_id:32}).then((res)=>{
					this.cates = res.data
				})
			},
		},
		created(){
			this.showcate()
		}
	}
</script>
<style lang="stylus" scoped>
.cates_page
	background-color #f9f9f9
.addcates
	background-color white
	padding 5px 20px
	display flex
	height 40px
	justify-content space-between
	.addcates_button
		padding 5px 
		cursor pointer
		color #409EFF
	.delete_all
		cursor pointer
		width 200px
		text-align center
		color #aaaaaa
		padding 5px
.cates
	margin-top 10px
	background-color white
	padding 20px 20px
	.cate
		display flex
		justify-content space-between
		align-items center
		padding 40px 0
		border-bottom 1px solid #ebedef
		.cate_sort_name
			width 200px
			display flex
			justify-content flex-start
		.goods_num
			width 100px
		.editcates
			width 200px
			text-align center
			.edit
				color #409EFF
				cursor pointer
			.delete	
				color #C0C4CC
				margin-top 15px
				cursor pointer
.remove
	width 50%
	margin-left 25%
	.question
		margin-top 20px
		display flex 
		justify-content space-between
		padding 0 15%
.cancle
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
	border 1px solid #409EFF
.addcate_dialog
	width 50%
	margin-left 25%
.editcate_dialog
	width 50%
	margin-left 25%
.options
	display flex
	justify-content space-between
	padding 0 20%	
</style>