<template>
	<div>
		<div class="lee-title1">下架商品</div>
		<div class="addgoods">
			<div class="search"><input placeholder="请输入商品名称" v-model='search_input'/><img src="../../../assets/images/search.png" @click='search()'></div>
		</div>
		<div class="goods_infos">
		<div v-for="(item,index) in goodsinfo" class="goods_info">
			<div style="display:flex;width:300px">
			<img :src="item.goods_img" class="goods_info_image">
			<div class="nameinfo">
				<div class="goods_info_name">{{item.goods_name}}</div>
				 <div class="prices">
					<div class="price"><span>￥{{item.goods_price[0]}}</span></div>
					<!-- <div class="market_price"><span>￥{{item.market_price}}</span></span></div> -->
				</div>
				<div class="score">库存：<span>{{item.goods_score[0]}}</span></div>
				<div class="time">上架时间：<span>{{item.create_time}}</span></div>
			</div>
			</div>
			<!-- <div class="goods_score">
				<div class="real_score">真实库存：{{item.real_goods_score}}</div>
				<div class="score_tip">库存阈值：{{item.goods_score_expect}}</div>
				<div class="goods_source"><a :href="item.goods_source" target="_blank">进货链接</a></div>
			</div>
			<div class="profit">
				<div class="p_price">商品进价：￥{{item.p_price}}</div>
				<div class="single_profit">售出利润：<span class="price">￥{{item.single_p_profit}}</span></div>
				<div class="group_profit">团购利润：<span class="price">￥{{item.group_p_profit}}</span></div>
			</div> -->
			<!-- <div class="is_group">
				<div class="isgroup" v-if="item.is_group==1">已开启团购</div>
				<div class="group_price"v-if="item.is_group==1">团购价格：<span>￥{{item.group_price}}</span></div>
				<div class="group_num"v-if="item.is_group==1">要求参团人数：<span>{{item.group_num}}</span></div>
				<div class="notgroup" v-if="item.is_group==0">未开启团购</div>
			</div> -->
			<div class="editgoods">
				<div class="edit" @click="toeditgoodsinfo(item.goods_id,index)">编辑</div>
				<div class="sale" @click="tosalegoods(item.goods_id)">上架</div>
				<div class="delete" @click="todeletegoods(item.goods_id)">删除</div>
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
		<!-- 上架商品 -->
		 <el-dialog title="上架商品" class="remove" :visible.sync="is_sale" :modal-append-to-body='false'>
            <div class="message">是否确定上架该商品 ？</div>
            <div class="question">
              <button class="cancle" @click="is_sale=false">取消</button>
              <button class="comfirm" @click="set_on_sale()">确认</button>
            </div>
        </el-dialog>
        <!-- 删除商品 -->
		 <el-dialog title="删除商品" class="remove" :visible.sync="is_delete" :modal-append-to-body='false'>
            <div class="message">是否确定删除该商品 ？</div>
            <div class="question">
              <button class="cancle" @click="is_delete=false">取消</button>
              <button class="comfirm" @click="delete_goods()">确认</button>
            </div>
        </el-dialog>
	</div>
</template>
<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import {sel_cate,goods_del,admin_search_goods,show_no_sale,set_on_sale,goods_delete} from '@/utils/api'
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
				is_sale:false,
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
				admin_search_goods({shop_id:store.get('currentshopid'),goods_name:this.search_input,status:0}).then((res)=>{
					if (res.error_code==1003) {
						this.$message.error(res.msg)
					};
					if (res.error_code==1000) {
						this.goodsinfo = res.data
					};
				})
			},
			tosalegoods(id){
				this.is_sale=true
				this.goods_id=id
			},
			set_on_sale(){
				set_on_sale({shop_id:store.get('currentshopid'),goods_id:this.goods_id,is_on_sale:1}).then((res)=>{
					if (res.error_code==1000) {
						this.$message.success('上架成功')
						this.is_sale=false
						this.goods_show()
					}else{
						this.$message(res.msg)
						this.is_sale=false
						this.goods_show()
					}
				})
			},
			todeletegoods(id){
				this.is_delete=true
				this.goods_id=id
			},
			delete_goods(){
				goods_delete({goods_id:this.goods_id}).then(res=>{
					if (res.error_code==1000) {
						this.$message('删除成功')
						this.is_delete=false
						this.goods_show()
					};
				})
			},
			goods_show(){
				show_no_sale({shop_id:store.get('currentshopid'),page:this.currentPage}).then((res)=>{
					if (res.error_code==1003) {
						this.$message.error(res.msg)
					};
					if (res.error_code==1000) {
						this.goodsinfo = res.data.goods
						this.pagecount = res.data.totalPage
					};
					if (res.error_code==1001) {
						this.$message.error(res.msg)
						this.goodsinfo = {}
						this.pagecount = 1
					};
					if (res.error_code==1002) {
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
				this.$router.push('/unclewei/goods/goods_edit')
			},
			uploadsuccess(res,file){
				this.imageUrl.push(URL.createObjectURL(file.raw))
      			this.addgoodsinfo.goods_img.push(res.data.img_url)
			},
			toeditgoodsinfo(id,index){
				store.set("goodsinfo",this.goodsinfo[index])
				this.$router.push({path:'/unclewei/goods/goods_edit',query:{goods_id:id}})
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
			.edit,.sale,.delete	
				color #409EFF
				cursor pointer
				margin-top 10px							
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
	justify-content flex-end
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
<style lang="stylus" scoped>
	
	.remove{
		width: 100%;
		margin-left: 0;
	}
	
	.el-dialog{
		width: 500px;
	}
	@media(max-width:1200px ) {
		.goods_infos{
			text-align: center;
		}
		
		.goods_infos .goods_info{
			width: 49%;
			display: inline-block;
			border-right: 1px solid #ededed;
			text-align: left;
		}
		
		.goods_infos .goods_info:nth-child(even){
			border-right: none
		}
		
		.goods_infos .goods_info .nameinfo{
			width: 100%;
		}
		
		.goods_infos .goods_info .editgoods{
			width: 100%;
			overflow:hidden;
			display:flex;
		}
		
		.goods_infos .goods_info .editgoods .edit,
		.goods_infos .goods_info .editgoods .delete,
		.goods_infos .goods_info .editgoods .sale{
			width:33%;
			display: inline-block;
			text-align: center;
		}
	}
	
	@media(max-width:900px ) {
		
		.goods_infos .goods_info .nameinfo .goods_info_name{
			font-size: 14px;
			color: #555555;
			}
		
		.goods_infos .goods_info .nameinfo .goods_info_name,
		.goods_infos .goods_info .nameinfo .time{
			overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
			}
			.goods_infos .goods_info .nameinfo .prices{
				line-height: 24px;
				height: 24px;
			}
			
			.goods_infos .goods_info .score,
			.goods_infos .goods_info .nameinfo .time{
				margin-top: 0;
				padding-top: 5px;
				font-size: 12px;
			}
		
		.goods_infos .goods_info .is_group{
			margin-top: 0;
			font-size: 12px;
			color: #555555;
			margin-left: 90px;
			padding-top: 0;
		}
		.goods_infos .goods_info .adjust_sort{
			width: 100px;
			}
			
			.goods_infos .goods_info .goods_info_image{
				width: 80px !important;
			}
		
		
		.goods_infos .goods_info{
				width: 100%;
			}
			
		
		.el-dialog{
		width: 90%;
	}
	.goods_infos .goods_info{
			width: 100%;
			border-right:none;
			padding: 10px;

		}
		.profit{
			width: 100%;
		}
		
		.goods_infos .goods_info .is_group{
			width: 100%;
		}
		
		.goods_infos .goods_info .editgoods{
			text-align:center;
		}
		
		.goods_infos .goods_info .editgoods .edit,
		.goods_infos .goods_info .editgoods .delete,
		.goods_infos .goods_info .editgoods .sale{
			width:33%;
			text-align:center;
			font-size: 14px;
			float: left;
			margin-top: 10px;
		}
		.goods_infos .goods_info .is_group span{
			color: #ff8661;
		}
	}
</style>