<template>
	<div>
		<div class="goods_infos">
		<div v-for="(item,index) in goodsinfo" class="goods_info">
			<div style="display:flex;width:300px">
			<img :src="item.goods_img" class="goods_info_image">
			<div class="nameinfo">
				<div class="goods_info_name">{{item.goods_name}}</div>
				<div class="prices">
					<div class="price">￥{{item.goods_price}}</div>
					<div class="market_price">￥{{item.market_price}}</div>
				</div>
				<div class="score">库存：{{item.goods_score}}<span class="recommended" v-if="item.is_commend==1">荐</span></div>
				<div class="time">上架时间：{{item.create_time}}</div>
			</div>
			</div>
			<div class="goods_score">
				<div class="real_score">真实库存：{{item.real_goods_score}}</div>
				<div class="score_tip">库存阈值：{{item.goods_score_expect}}</div>
				<div class="goods_source"><a :href="item.goods_source" target="_blank">进货链接</a></div>
			</div>
			<div class="profit">
				<div class="p_price">商品进价：￥{{item.p_price}}</div>
				<div class="single_profit">售出利润：<span class="price">￥{{item.single_p_profit}}</span></div>
				<div class="group_profit">团购利润：<span class="price">￥{{item.group_p_profit}}</span></div>
			</div>
			<div class="is_group">
				<div class="isgroup" v-if="item.is_group==1">已开启团购</div>
				<div class="group_price"v-if="item.is_group==1">团购价格：￥{{item.group_price}}</div>
				<div class="group_num"v-if="item.is_group==1">要求参团人数：{{item.group_num}}</div>
				<div class="notgroup" v-if="item.is_group==0">未开启团购</div>
			</div>
			<div class="editgoods">
				<div class="edit" @click="toeditgoodsinfo(item.goods_id,index)">编辑</div>
				<div class="delete" @click="todeletegoods(item.goods_id)">上架</div>
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
		<!-- 删除商品 -->
		 <el-dialog title="删除商品" class="remove" :visible.sync="is_delete">
            <div class="message">是否确定上架该商品 ？</div>
            <div class="question">
              <button class="cancle" @click="is_delete=false">取消</button>
              <button class="comfirm" @click="set_on_sale()">确认</button>
            </div>
        </el-dialog>
	</div>
</template>
<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import {sel_cate,goods_del,search_goods,show_no_sale,set_on_sale} from '@/utils/api'
	export default{
		data(){
			return{
				pagecount:1,
				currentPage:1,
				search_input:'',
				cates:[],
				showaddgoods:false,
				showeditgoods:false,
				editcatenum:1000,
				is_delete:false,
				goods_id:'',
				goodsinfo:{
					
				},
				show_recommend:false,
				cancle_recommend:false
			}
		},
		methods:{
			showcate(){
				sel_cate({shop_id:store.get('currentshopid')}).then((res)=>{
					this.cates = res.data
				})
			},
			search(){
				search_goods({shop_id:store.get('currentshopid'),goods_name:this.search_input}).then((res)=>{
					if (res.error_code==1003) {
						this.$message.error(res.msg)
					};
					if (res.error_code==1000) {
						this.goodsinfo = res.data
					};
				})
			},
			todeletegoods(id){
				this.is_delete=true
				this.goods_id=id
			},
			set_on_sale(){
				set_on_sale({shop_id:store.get('currentshopid'),goods_id:this.goods_id,is_on_sale:1}).then((res)=>{
					if (res.error_code==1000) {
						this.$message('上架成功')
						this.is_delete=false
						this.goods_show()
					}else{
						this.$message(res.msg)
						this.is_delete=false
						this.goods_show()
					}
				})
			},
			goods_show(){
				show_no_sale({shop_id:store.get('currentshopid'),page:this.currentPage}).then((res)=>{
					if (res.error_code==1003) {
						this.$message.error(res.msg)
					};
					if (res.error_code==1000) {
						this.goodsinfo = res.data.goods
						this.pagecount = res.data.totalpage
					};
					if (res.error_code==1001) {
						this.$message.error(res.msg)
						this.goodsinfo = {}
						this.pagecount = 1
					};
					if (rea.error_code==1002) {
						this.$message.error(res.msg)
						this.goodsinfo = {}
						this.pagecount = 1
					};
				})
			},
			handleCurrentChange(){
				this.goods_show()
			},
			showaddgoodsmethod(){
				this.$router.push('/home/goods/goods_edit')
			},
			uploadsuccess(res,file){
				this.imageUrl.push(URL.createObjectURL(file.raw))
      			this.addgoodsinfo.goods_img.push(res.data.img_url)
			},
			toeditgoodsinfo(id,index){
				store.set("goodsinfo",this.goodsinfo[index])
				this.$router.push({path:'/home/goods/goods_edit',query:{goods_id:id}})
			}
			
		},
		created(){
			this.showcate()
			this.goods_show()
		},
	}
</script>
<style lang="stylus" scoped>
.goods_infos
	background-color white
	margin-top 10px
	padding-top 10px
	font-size 15px
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
			width 150px
			text-align right
			margin-right 20px
			.edit
				color #409EFF
				cursor pointer
				margin-top 15px
			.delete	
				color #409EFF
				margin-top 15px
				cursor pointer
				
		.is_group
			padding-top 20px
			width 200px
		.goods_score
			font-size 14px
			color #484848
			.real_score
				margin-bottom 15px
			.score_tip
				margin-bottom 15px
			.goods_source
				color #409EFF
				cursor pointer
.recommended
	color #FF6C34
	color 15px
	margin-left	20px
.goodspage
	background-color #f9f9f9

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
.el-icon-plus.avatar-uploader-icon
	margin-top 8px
	font-size 25px
.editcates
	.el-button
		float right
		margin-right 20px
.upload_img
	position relative
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
.addgoodstyle
	width 100%
	.el-dialog
		width 80px
		.el-input
			width 80%
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
.comfirm
	color white
	background-color #409EFF
	cursor pointer
	padding 5px 20px
	border-radius 3px
	border 1px solid #409EFF
.price_input
	display flex
	justify-content space-between
 	.input.el-input
		width 88%!important
.block
	padding 20px 30px
	font-size 18px
.el-pagination
	text-align right	
.profit
	color #484848
	font-size 14px
	width 150px
	.p_price
		margin-bottom 15px
	.single_profit
		margin-bottom 15px
.price
	color #FF6C34
</style>