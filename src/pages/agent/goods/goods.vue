<template>
	<div class="goodspage">
		<div class="addgoods">
			<div class="search"><input placeholder="请输入商品名称" v-model='search_input'/><img src="@/assets/images/search.png" @click="tosearch"></div>
		</div>
		<div class="goods_infos">
		<div v-for="(item,index) in goodsinfo" class="goods_info">
			<div style="display:flex;width:300px">
			<img :src="item.goods_img" class="goods_info_image">
			<div class="nameinfo">
				<div class="goods_info_name">{{item.goods_name}}</div>
				<div class="prices">
					<div class="price">￥{{item.goods_price[0]}}</div>
					<div class="market_price">￥{{item.market_price[0]}}</div>
				</div>
				<div class="score">库存：{{item.goods_score[0]}}<span class="recommended" v-if="item.is_commend==1">荐</span></div>
				<div class="time">上架时间：{{item.create_time}}</div>
			</div>
			</div>
			<div class="profit">
				<div class="single_profit">售出利润：<span class="price">￥{{item.single_p_profit[0]}}</span></div>
				<div class="group_profit">团购利润：<span class="price">￥{{item.group_p_profit[0]}}</span></div>
			</div>
			<div class="is_group">
				<div class="isgroup" v-if="item.is_group==1">已开启团购</div>
				<div class="group_price"v-if="item.is_group==1">团购价格：￥{{item.group_price[0]}}</div>
				<div class="group_num"v-if="item.is_group==1">要求参团人数：{{item.group_num}}</div>
				<div class="notgroup" v-if="item.is_group==0">未开启团购</div>
			</div>
			<div class="editgoods">
				<div class="edit" @click="toeditgoodsinfo(item.goods_id,index)">查看详情</div>
			</div>
		</div>
			<div class="block">
            	 <el-pagination
              @current-change="handleCurrentChange"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :page-count="pagecount"
              :pager-count="5"
              :current-page.sync="currentPage">
           		 </el-pagination>
       		 </div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import * as store from '@/utils/sdk/store'
import {sel_cate,goods_add,goods_show,goods_del,goods_edit,search_goods,set_commend,admin_goods_list} from '@/utils/api'
	export default{
		data(){
			return{
				pagecount:1,
				currentPage:1,
				search_input:'',
				cates:[],
				cate_id:'',
				showaddgoods:false,
				showeditgoods:false,
				editcatenum:1000,
				is_delete:false,
				goods_id:'',
				editgoodsinfo:[],
				editgoodsinfo_goods_image_pre:[],
				editgoods_id:'',
				images_list:[],
				addgoodsinfo:{
					name:"",
					cate:"",
					price:"",
					market_price:"",
					score:"",
					goods_img:[],
					desc:"",
					is_group:true,
					group_price:"",
					group_num:"",
				},
				imageUrl:[],
				goodsinfo:{
				
				},
				show_recommend:false,
				cancle_recommend:false
			}
		},
		methods:{
			handleRemove(file){
				for (var i = this.addgoodsinfo.goods_img .length - 1; i >= 0; i--) {
					if (file.response.data.img_url==this.addgoodsinfo.goods_img[i]) {
						this.addgoodsinfo.goods_img.splice(i,1)
					}
				};
			},
			to_cancle_recommend(id){
				this.cancle_recommend=true
				this.goods_id=id
			},
			cancle_recommend_comfirm(){
				set_commend({goods_id:this.goods_id,is_commend:0}).then(()=>{
					this.cancle_recommend=false
					this.$message('已取消推荐')
					this.goods_show()
				})
			},
			to_set_recommend(id){
				this.goods_id = id
				this.show_recommend = true
			},
			recommend_comfirm(){
				set_commend({goods_id:this.goods_id,is_commend:1}).then((res)=>{
					this.show_recommend = false
					this.$message('已设为推荐')
					this.goods_show()
				})
			},
			tosearch(){
				search_goods({shop_id:32,goods_name:this.search_input}).then((res)=>{
					if (res.error_code==1003) {
						this.$message.error(res.msg)
					};
					if (res.error_code==1000) {
						this.goodsinfo = res.data
					};
				})
			},
			goods_show(){
				goods_show({shop_id:32,page:this.currentPage}).then((res)=>{
					if (res.error_code==1003) {
						this.$message.error(res.msg)
					};
					if (res.error_code==1000) {
						this.goodsinfo = res.data.goods
						this.pagecount = res.data.totalPage
					};
				})
			},
			//分类显示商品
			show_cate_goods(){
				admin_goods_list({
					cate_id:this.cate_id,
					page:this.currentPage,
					is_on_sale:1
				}).then((res)=>{
					if (res.error_code==1000) {
						this.goodsinfo=res.data.goods
						this.pagecount=res.data.totalpage
					};
				})
			},
			handleCurrentChange(){
				if (this.cate_id=='') {
					this.goods_show()
				}else{
					this.show_cate_goods()
				}
				
			},
			toeditgoodsinfo(id,index){
				store.set("goodsinfo",this.goodsinfo[index])
				this.$router.push({path:'/agent/goods/goods_edit',query:{goods_id:id}})
			}	
		},
		created(){
			if (this.$route.query.cate_id) {
			this.cate_id=this.$route.query.cate_id
			this.show_cate_goods()
			}else{
			this.goods_show()				
			}
		},
	}
</script>
<style lang="stylus" scoped>
.el-form-item__content{
	background-color:red;
}

	
.goods_infos
	background-color white
	margin-top 10px
	padding-top 10px
	font-size 14px
	.goods_info
		border-bottom 1px solid #ededed
		padding 20px 30px
		display flex
		justify-content space-between
		align-items center
		.goods_info_image
			width 80px
			height 100px
		.nameinfo
			margin-left 30px
			.goods_info_name
				color #323232
			.prices
				display flex
				height 30px
				margin-top 5px
				.price
					color #FF6C34
					weight 200
					line-height 30px
				.market_price
					color #AAAAAA
					margin-left 10px
					font-size 13px
					line-height 31px
					text-decoration line-through
			.time
				font-size 12px
				color #aaaaaa
				margin-top 8px
		.score
			color #AAAAAA
			font-size 14px
		.editgoods
			width 60px
			text-align right
			margin-right 20px
			.edit
				color #409EFF
				cursor pointer
				margin-top 15px
			.recommended
				color #aaaaaa
			.recommend
				color #409EFF
				cursor pointer
			.delete	
				color #C0C4CC
				margin-top 15px
				cursor pointer
				
		.is_group
			font-size 14px
			width 200px
.goodspage
	background-color #f9f9f9

.profit
	color #484848
	font-size 14px
	width 150px
	.single_profit
		margin-bottom 15px
.price
	color #FF6C34
.delete_img
	z-index 100
	width 12px
	height 12px
	position absolute
	top -10px
	right 3px
.uploadedimg
	width 80px
	height 110px
	margin-right 15px
.addcate
	margin-left 15px
	padding-bottom 10px
	width 100px
	color #0089e1
	cursor pointer
	.el-icon-plus
		margin-right 20px
.sort
	width 30px
	text-align center
.catename
	margin-left 20px

.inputaddcate
	width 80%
.inputsort
	width 80%
.cancel
	float right
	margin-right 50px
	margin-top 10px
.submmit
	margin-left 50px
	margin-top 10px
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
.addgoods
	background-color white
	padding 5px 50px 5px 20px
	display flex
	height 40px
	justify-content space-between
	.addgoods_button
		padding 5px 
		cursor pointer
		color #409EFF
	.search
		margin-top 4px
		position relative
		input
			line-height 26px
			background-color #EFEFF4
			border-radius 3px
			font-size 13px
			padding-left 15px
			width 190px
		img
			position absolute
			top 3px 
			right 5px
			width 18px
			height 18px
			cursor pointer
.price_input
	display flex
	justify-content space-between
 	.input.el-input
		width 88%!important
.group_info_input
	display flex
	justify-content space-between
	.group_input.el-input
		width 88%!important
.el-form-item__content
	display flex
	padding-right 10px
.el-switch
	width 180px
	margin-top 10px
.el-textarea
	width 97%
.goods_name_input.el-input
	width 97%!important
.buttons
	margin-top 35px
	display flex
	justify-content space-between
	padding 0 20%
.block
	padding 20px 30px
	font-size 18px
.el-pagination
	text-align right	
</style>