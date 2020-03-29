<template>
<div class="goodspage">
		<div class="addgoods">
			<div  class="addgoods_button" @click = "showaddgoodsmethod"><i class="el-icon-plus" style="margin-right:5px"></i>添加商品</div>
			<div class="search"><input placeholder="请输入商品名称" v-model='search_input'/><img src="../../../assets/images/search.png" @click='search()'></div>
		</div>
		<div class="lee-title1">商品列表</div>
		<div class="goods_infos">
		<!-- 电商页面 -->
		<div v-for="(item,index) in goodsinfo" class="goods_info" v-if='shop_type==1'>
			<div class="goods-lee">
				<div class="adjust_sort">{{item.adjustorder}}、</div>
			<img :src="item.goods_img" class="goods_info_image">
			<div class="nameinfo">
				<div class="goods_info_name">{{item.goods_name}}</div>
				<div class="prices">
					<div class="price">￥{{item.goods_price[0]}}</div>
					<div class="market_price">￥{{item.market_price[0]}}</div>
				</div>
				<div class="score"><span>库存：{{item.goods_score[0]}} </span>
        <!-- <span>可开团次数：{{item.group_times[0]}}</span> -->
        </div>
				<div class="time">上架时间：<span>{{item.create_time}}</span></div>
			</div>
			</div>
			<!-- <div class="goods_score">
				<div class="real_score">真实库存：{{item.real_goods_score}}</div>
				<div class="score_tip">库存阈值：{{item.goods_score_expect}}</div>
				<div class="goods_source"><a :href="item.goods_source" target="_blank">进货链接</a></div>
			</div> -->
			<!-- <div class="profit">
				<div class="p_price">商品进价：￥{{item.p_price}}</div>
				<div class="single_profit">售出利润：<span class="price">￥{{item.single_p_profit[0]}}</span></div>
				<div class="group_profit">团购利润：<span class="price">￥{{item.group_p_profit[0]}}</span></div>
			</div> -->
			<div class="is_group">
				<div class="isgroup" v-if="item.is_group==1">已开启团购</div>
				<div class="group_price" v-if="item.is_group==1">团购价格：<span>￥{{item.group_price[0]}}</span></div>
				<div class="group_num" v-if="item.is_group==1">要求参团人数：<span>{{item.group_num}}</span></div>
				<div class="notgroup" v-if="item.is_group==0">未开启团购</div>
			</div>
			<div class="editgoods">
				<div class="edit" @click="toeditgoodsinfo(item.goods_id,index)">编辑</div>
				<div class="editgoods_sort" @click="to_editgoods_sort(item.goods_id,item.adjustorder)">排序</div>
				<div class="recommend" @click="to_set_recommend(item.goods_id)" v-if="item.is_commend==0">设为推荐</div>
				<div class="recommended" v-if="item.is_commend==1">已设为推荐，<span class="recommend" @click="to_cancle_recommend(item.goods_id)">取消</span></div>
				<div class="delete" @click="todeletegoods(item.goods_id)">下架</div>
			</div>
		</div>
		<!-- 餐饮页面 -->
		<div v-for="(item,index) in goodsinfo" class="goods_info" v-if='shop_type==2'>
			<div class="goods-lee">
				<div class="adjust_sort">{{item.adjustorder}}、</div>
			<img :src="item.goods_img" class="goods_info_image">
			<div class="nameinfo">
				<div class="goods_info_name">{{item.goods_name}}</div>
				<div class="prices">
					<div class="price">￥{{item.goods_price[0]}}</div>
					<div class="market_price">￥{{item.market_price[0]}}</div>
				</div>
				<div class="score">库存：{{item.goods_score[0]}}</div>
				<div class="time">上架时间：{{item.create_time}}</div>
			</div>
			</div>
			<div class="editgoods">
				<div class="edit" @click="toeditgoodsinfo(item.goods_id,index)">编辑</div>
				<div class="editgoods_sort" @click="to_editgoods_sort(item.goods_id,item.adjustorder)">排序</div>
				<div class="recommend" @click="to_set_recommend(item.goods_id)" v-if="item.is_commend==0">设为推荐</div>
				<div class="recommended" v-if="item.is_commend==1">已设为推荐，<span class="recommend" @click="to_cancle_recommend(item.goods_id)">取消</span></div>
				<div class="delete" @click="todeletegoods(item.goods_id)">下架</div>
			</div>
		</div>
		<!-- 票务页面 -->
		<div v-for="(item,index) in goodsinfo" class="goods_info" v-if='shop_type==3'>
			<div class="goods-lee">
				<div class="adjust_sort">{{item.adjustorder}}、</div>
			<img :src="item.goods_img" class="goods_info_image">
			<div class="nameinfo">
				<div class="goods_info_name">{{item.goods_name}}</div>
				<div class="prices">
					<div class="price">￥{{item.goods_price[0]}}</div>
					<div class="market_price">￥{{item.market_price[0]}}</div>
				</div>
				<div class="score">库存：{{item.goods_score[0]}}</div>
				<div class="time">上架时间：{{item.create_time}}</div>
			</div>
			</div>
			<div class="editgoods">
				<div class="edit" @click="toeditgoodsinfo(item.goods_id,index)">编辑</div>
				<div class="editgoods_sort" @click="to_editgoods_sort(item.goods_id,item.adjustorder)">排序</div>
				<div class="recommend" @click="to_set_recommend(item.goods_id)" v-if="item.is_commend==0">设为推荐</div>
				<div class="recommended" v-if="item.is_commend==1">已设为推荐，<span class="recommend" @click="to_cancle_recommend(item.goods_id)">取消</span></div>
				<div class="delete" @click="todeletegoods(item.goods_id)">下架</div>
			</div>
		</div>
		<!--商超页面 -->
		<div v-for="(item,index) in goodsinfo" class="goods_info" v-if='shop_type==4'>
			<div class="goods-lee">
				<div class="adjust_sort">{{item.adjustorder}}、</div>
			<img :src="item.goods_img" class="goods_info_image">
			<div class="nameinfo">
				<div class="goods_info_name">{{item.goods_name}}</div>
				<div class="prices">
					<div class="price">￥{{item.goods_price[0]}}</div>
					<div class="market_price">￥{{item.market_price[0]}}</div>
				</div>
				<div class="score">库存：{{item.goods_score[0]}}</div>
				<div class="time">上架时间：{{item.create_time}}</div>
			</div>
			</div>
			<div class="editgoods">
				<div class="edit" @click="toeditgoodsinfo(item.goods_id,index)">编辑</div>
				<div class="editgoods_sort" @click="to_editgoods_sort(item.goods_id,item.adjustorder)">排序</div>
				<div class="recommend" @click="to_set_recommend(item.goods_id)" v-if="item.is_commend==0">设为推荐</div>
				<div class="recommended" v-if="item.is_commend==1">已设为推荐，<span class="recommend" @click="to_cancle_recommend(item.goods_id)">取消</span></div>
				<div class="delete" @click="todeletegoods(item.goods_id)">下架</div>
			</div>
		</div>
		<!--美业页面 -->
		<!-- <div v-for="(item,index) in goodsinfo" class="goods_info" v-if='shop_type==5'>
			<div  class="goods-lee">
				<div class="adjust_sort">{{item.adjustorder}}、</div>
			<img :src="item.goods_img" class="goods_info_image">
			<div class="nameinfo">
				<div class="goods_info_name">{{item.goods_name}}</div>
				<div class="prices">
					<div class="price">￥{{item.goods_price[0]}}</div>
					<div class="market_price">￥{{item.market_price[0]}}</div>
				</div>
				<div class="score">库存：{{item.goods_score[0]}}</div>
				<div class="time">上架时间：{{item.create_time}}</div>
			</div>
			</div>
			<div class="editgoods">
				<div class="edit" @click="toeditgoodsinfo(item.goods_id,index)">编辑</div>
				<div class="editgoods_sort" @click="to_editgoods_sort(item.goods_id,item.adjustorder)">排序</div>
				<div class="recommend" @click="to_set_recommend(item.goods_id)" v-if="item.is_commend==0">设为推荐</div>
				<div class="recommended" v-if="item.is_commend==1">已设为推荐，<span class="recommend" @click="to_cancle_recommend(item.goods_id)">取消</span></div>
				<div class="delete" @click="todeletegoods(item.goods_id)">下架</div>
			</div>
		</div> -->
		<!--培训页面 -->
		<!-- <div v-for="(item,index) in goodsinfo" class="goods_info" v-if='shop_type==6'>
			<div class="goods-lee">
				<div class="adjust_sort">{{item.adjustorder}}、</div>
			<img :src="item.goods_img" class="goods_info_image">
			<div class="nameinfo">
				<div class="goods_info_name">{{item.goods_name}}</div>
				<div class="prices">
					<div class="price">￥{{item.goods_price[0]}}</div>
					<div class="market_price">￥{{item.market_price[0]}}</div>
				</div>
				<div class="score">库存：{{item.goods_score[0]}}</div>
				<div class="time">上架时间：{{item.create_time}}</div>
			</div>
			</div>
			<div class="editgoods">
				<div class="edit" @click="toeditgoodsinfo(item.goods_id,index)">编辑</div>
				<div class="editgoods_sort" @click="to_editgoods_sort(item.goods_id,item.adjustorder)">排序</div>
				<div class="recommend" @click="to_set_recommend(item.goods_id)" v-if="item.is_commend==0">设为推荐</div>
				<div class="recommended" v-if="item.is_commend==1">已设为推荐，<span class="recommend" @click="to_cancle_recommend(item.goods_id)">取消</span></div>
				<div class="delete" @click="todeletegoods(item.goods_id)">下架</div>
			</div>
		</div> -->
		<!--住宿页面 -->
		<!-- <div v-for="(item,index) in goodsinfo" class="goods_info" v-if='shop_type==7'>
			<div class="goods-lee">
				<div class="adjust_sort">{{item.adjustorder}}、</div>
			<img :src="item.goods_img" class="goods_info_image">
			<div class="nameinfo">
				<div class="goods_info_name">{{item.goods_name}}</div>
				<div class="prices">
					<div class="price">￥{{item.goods_price[0]}}</div>
					<div class="market_price">￥{{item.market_price[0]}}</div>
				</div>
				<div class="score">库存：{{item.goods_score[0]}}</div>
				<div class="time">上架时间：{{item.create_time}}</div>
			</div>
			</div>
			<div class="editgoods">
				<div class="edit" @click="toeditgoodsinfo(item.goods_id,index)">编辑</div>
				<div class="editgoods_sort" @click="to_editgoods_sort(item.goods_id,item.adjustorder)">排序</div>
				<div class="recommend" @click="to_set_recommend(item.goods_id)" v-if="item.is_commend==0">设为推荐</div>
				<div class="recommended" v-if="item.is_commend==1">已设为推荐，<span class="recommend" @click="to_cancle_recommend(item.goods_id)">取消</span></div>
				<div class="delete" @click="todeletegoods(item.goods_id)">下架</div>
			</div>
		</div> -->
			<div class="w-block">
            	 <el-pagination @current-change="handleCurrentChange" :page-size="10" layout="prev, pager, next, jumper" :page-count="pagecount" :pager-count="5" :current-page.sync="currentPage" v-if="pagecount != 1"></el-pagination>
       		 </div>
		</div>
		<!-- 删除商品 -->
		 <el-dialog title="下架商品" class="remove" :visible.sync="is_delete" :modal-append-to-body='false'>
            <div class="message">是否确定下架该商品 ？</div>
            <div class="question">
              <button class="cancle" @click="is_delete=false">取消</button>
              <button class="comfirm" @click="set_on_sale()">确认</button>
            </div>
        </el-dialog>
        <!-- 设为推荐 -->
        <el-dialog title="设置推荐" class="remove" :visible.sync="show_recommend" :modal-append-to-body='false'>
			<div class="message">是否确定将该商品设为推荐？</div>
			<div class="question">
				<button class="cancle" @click="show_recommend=false">取消</button>
				<button class="comfirm" @click="recommend_comfirm()">确认</button>
			</div>
        </el-dialog>
        <!-- 取消推荐 -->
        <el-dialog title="取消推荐" class="remove" :visible.sync="cancle_recommend" :modal-append-to-body='false'>
			<div class="message">是否确定将该商品取消推荐？</div>
			<div class="question">
				<button class="cancle" @click="cancle_recommend=false">取消</button>
				<button class="comfirm" @click="cancle_recommend_comfirm()">确认</button>
			</div>
        </el-dialog>
		<!--排序-->
		<el-dialog title="设置排序" class="remove" :visible.sync="show_editgoods_sort" :modal-append-to-body='false'>
			<el-form :model="editgoods_sort">
				<el-form-item label="分类排序"><el-input v-model="editgoods_sort.adjustorder"></el-input></el-form-item>
				<div class="question">
					<button class="cancle" @click="show_editgoods_sort=false">取消</button>
					<button class="comfirm" @click="adjust_order()">确认</button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import {sel_cate,goods_show,goods_del,admin_search_goods,set_on_sale,admin_goods_list,set_commend,adjust_order} from '@/utils/api'
	export default{
		data(){
			return{
				shop_type:store.get('shop_type'),
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
				goodsinfo:{

				},
				show_recommend:false,
				cancle_recommend:false,
				show_editgoods_sort:false,
				editgoods_sort:{
					adjustorder:'',
				},
			}
		},
		methods:{
			showcate(){
				sel_cate({shop_id:store.get('currentshopid')}).then((res)=>{
					this.cates = res.data
				})
			},
			search(){
        this.currentPage=1
				admin_search_goods({goods_name:this.search_input,shop_id:store.get('currentshopid')}).then((res)=>{
					if (res.error_code==1003) {
            this.$message.error(res.msg)
					};
					if (res.error_code==1000) {
            this.goodsinfo = res.data
					};
				})
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
			to_editgoods_sort(id,sort){
				this.goods_id=id
				this.editgoods_sort.adjustorder=sort
				this.show_editgoods_sort=true
			},
			adjust_order(){
				if(this.editgoods_sort.adjustorder==''){
					this.$message.error('请输入商品序号')
				}else{adjust_order({adjustorder:this.editgoods_sort.adjustorder,goods_id:this.goods_id}).then((res)=>{
					if(res.error_code==1003){
						this.$message.error(res.msg)
					};
					if(res.error_code==1000){
						this.$message.success('排序成功')
						this.show_editgoods_sort=false
						if(this.cate_id==""){
						this.goods_show()
						}else{
						this.show_cate_goods()
						}
					}
				})
				}
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
			todeletegoods(id){
				this.is_delete=true
				this.goods_id=id
			},
			set_on_sale(){
				set_on_sale({goods_id:this.goods_id,is_on_sale:0}).then((res)=>{
					if (res.error_code==1003) {
						this.$message.error(res.msg)
					};
					if (res.error_code==1000) {
						this.$message('下架成功')
						this.is_delete=false
						if(this.cate_id==""){
						this.goods_show()
						}else{
						this.show_cate_goods()
						}
					};
				})
			},
			goods_show(){
				goods_show({shop_id:store.get('currentshopid'),page:this.currentPage}).then((res)=>{
					if (res.error_code==1003) {
						this.$message.error(res.msg)
					};
					if (res.error_code==1000) {
						this.goodsinfo = res.data.goods
						this.pagecount = res.data.totalPage
					};
				})
			},
			//分类显示上架商品
			show_cate_goods(){
				admin_goods_list({
					shop_id:store.get('currentshopid'),
					cate_id:this.cate_id,
					page:this.currentPage,
					is_on_sale:1
				}).then((res)=>{
					if (res.error_code==1000) {
						this.goodsinfo=res.data.goods
						this.pagecount=res.data.totalpage
						if (res.data.goods=='') {
							this.$message.error('该分类下暂无商品！')
						};
					}
				})
			},
			handleCurrentChange(){
				console.log('翻页')
				if (this.cate_id=='') {
          store.set('goodsPagination',this.currentPage)
          console.log(store.get('goodsPagination'))
					this.goods_show()
				}else{
					this.show_cate_goods()
				}

			},
			showaddgoodsmethod(){
				this.$router.push('/business/goods/goods_add')
			},
			uploadsuccess(res,file){
				this.imageUrl.push(URL.createObjectURL(file.raw))
      			this.addgoodsinfo.goods_img.push(res.data.img_url)
			},
			toeditgoodsinfo(id,index){

				this.$router.push({path:'/business/goods/goods_edit',query:{goods_id:id}})
			}

		},
		created(){
      if(store.get('goodsPagination')){
          this.currentPage=store.get('goodsPagination')
           console.log( this.currentPage)
      }
			if (this.$route.query.cate_id) {
			this.cate_id=this.$route.query.cate_id
			this.show_cate_goods()
			console.log(this.cate_id)
			}else{
			this.goods_show()
			}

		},
	}
</script>
<style lang="stylus" scoped>
.goods_infos
	background-color #f9f9f9
	margin-top 10px
	padding-top 10px
	font-size 14px
	.goods_info
		border-bottom 1px solid #ededed
		padding 20px 30px
		display flex
		justify-content space-between
		align-items center
		.adjust_sort
			line-height 100px
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
				color #AAAAAA
				margin-top 15px
				cursor pointer
		.is_group
			width 150px
			color #484848
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
.recommend
	color #409EFF
	margin-top 15px
	cursor pointer
.recommended
	color #AAAAAA
	margin-top 15px
.goodspage
	background-color #f9f9f9

.addgoods
	background-color #f9f9f9
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
.remove .question
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
.w-block
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
.editgoods_sort
	color #409EFF
	cursor pointer
	margin-top 15px
</style>

<style lang="stylus" scoped>

	.goods-lee{
		    display: flex;
    width: 400px;
	}
	@media(max-width:900px ) {

		.goods_infos{
			margin-top: 0;
			padding: 0;
		}

		.addgoods{
			padding: 0;
			height: auto;
			display: block;
		}

		.addgoods .addgoods_button{
			background: #777;
			color: #FFFFFF;
			height: 30px;
			line-height: 30px;
			text-align: center;
			padding: 0;
			font-size: 14px;
			width: 90%;
			margin: 25px auto 0px;
			}

			.addgoods .search{
				padding: 15px;
				padding-bottom: 0;
				width: 100%;
				margin: 15px auto 0;
				border-top: 2px solid #777;

			}

			.addgoods .search input{
				width: 100%;
					height: 30px;
					line-height: 30px;
					color: #555555;
			}
			.addgoods .search img{
				top:20px;
				right: 23px;

			}

		.goods_infos .goods_info{
			display: inline-block;
			width: 100%;
			padding: 10px;
		}

		.goods_infos .goods_info .nameinfo{
			margin-left: 10px;
		}
		.goods_infos .goods_info .nameinfo .goods_info_name,
		.goods_infos .goods_info .nameinfo .time{
			overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
		}

		.goods_infos .goods_info .nameinfo .goods_info_name,
		{
			font-size: 14px;
			color: #555555;
		}

		.goods_infos .goods_info .score,
		.goods_infos .goods_info .nameinfo .time{
			font-size: 12px;
			color: #C0C4CC;
			height: auto;
			padding-top: 5px;
			margin: 0;
		}

		.goods_infos .goods_info .nameinfo .prices{
			height: 24px;
		}

		.goods_infos .goods_info .is_group{
			font-size: 12px;
			color: #555555;
			margin-left: 130px;
		}

		.goods_infos .goods_info .is_group span{
			color: #777;
		}

		.goods_infos .goods_info .editgoods{
			width: 100%;
			font-size: 14px;
			text-align: right;
		}

		.recommended,
		.editgoods_sort,
		.goods_infos .goods_info .editgoods .edit,
		.goods_infos .goods_info .editgoods .delete{
			font-size: 14px;
			display: inline-block;
			float: none;
		}

		.el-dialog__header{
			text-align: center;
		}

		.goods_infos .goods_info .editgoods .delete{
			margin-right: 0;
		}

		.goods_infos .goods_info .editgoods:after{
			clear: both;
			content: "";
			display: table;
		}

		.goods-lee{
			width: 100%;
		}

		.editgoods div{
			float: left;
			margin-right:15px
		}

		.remove{
			width: 100%;
			margin-left: 0;
		}

		.el-dialog{
			width: 500px;
		}
	}

	@media(max-width:500px ) {
		.el-dialog{
			width: 90%;
		}
	}
</style>
