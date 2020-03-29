<template>
	<div class="cut_page">
		<div class="title" @click="toadd">添加砍价商品</div>
			<div class="goodslist">
				<div class="cut_list">砍价商品列表</div>
				<div v-for="(item,index) in cut_goodsinfo" class="goods_infos">
					<img :src="item.goods_img" class="goods_info_image">
				<div class="nameinfo">
					<div class="goods_info_name">{{item.goods_name}}</div>
					<div class="prices">
					<div class="price">￥{{item.get_price}}</div>
					<div class="market_price">￥{{item.goods_price}}</div>
					</div>
				</div>
				<div class="score_info">
					<div class="score">库存：{{item.goods_score}}</div>
					<div class="cut_num">{{item.goods_num}}人砍价成功</div>
				</div>
				<div class="delete" @click="delete_cut(item.goods_id)">下架商品砍价</div>
				</div>
			</div>
		<!-- 添加砍价商品 -->
		<el-dialog title="添加砍价商品" :visible.sync="showadd" width="60%">
			<div>
				<el-input placeholder="输入商品名称搜索" size="medium" style="width:80%" v-model="search_input"></el-input><span class="search" @click="tosearch">搜索</span>
			</div>
			<div style="display:flex">
			<div class="search_goodslist">
				<div v-for="(item,index) in goodsinfo" class="search_goodsinfo">
					<img :src="item.goods_img" class="goods_info_image">
				<div class="nameinfo">
					<div class="goods_info_name">{{item.goods_name}}</div>
					<!-- <div class="prices">
						<div class="price">￥{{item.goods_price}}</div>
						<div class="market_price">￥{{item.market_price}}</div>
					</div> -->
					<div class="score">库存：{{item.goods_score}}<!-- <span class="recommended" v-if="item.is_commend==1">荐</span> --></div>
				</div>
				<div class="choose" v-if="goods_id!=item.goods_id" @click="choose_cut(item,index)">选择</div>
				<div class="choosed" v-if="goods_id==item.goods_id">选择</div>
				</div>
			</div>
			<div class="cut_info">
				<div>
					<el-form :model="goods">
						<el-form-item label="最低价格">
							<el-input v-model="goods.get_price"placeholder="请输入最低能砍到的价格" size="medium"/>
						</el-form-item>
						<el-form-item label='商品原价'>
							<el-input v-model="goods.market_price" placeholder="请输入商品原价" size="medium"/>
						</el-form-item>
						<el-form-item label="砍价刀数">
							<el-input v-model="goods.kj_num"placeholder="请输入最低需要砍的刀数" size="medium"/>
						</el-form-item>
						<el-form-item label="可砍数量">
							<el-input v-model="goods.goods_score"placeholder="请输入参与砍价的商品件数" size="medium"/>
						</el-form-item>
						<el-form-item label="商品规格">
							<el-input v-model="goods.goods_item"placeholder="请输入商品的规格信息" size="medium"/>
						</el-form-item>
					</el-form>
					<div class="buttons">
						<button class="button" @click="add">确定</button>
					</div>
				</div>
			</div>
			</div>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
import {show_cut,admin_search_goods,add_cut,set_cut} from '@/utils/api'
	export default{
		data(){
			return{
				showadd:false,
				currentPage:'',
				goodsinfo:[],
				cut_goodsinfo:[],
				search_input:'',
				goods_id:'',
				goods:{
					get_price:'',
					goods_score:'',
					goods_name:'',
					goods_price:'',
					goods_img:'',
					kj_num:'',
					goods_item:'',
					market_price:''
				}
			}
		},
		methods:{
		delete_cut(id){
			set_cut({goods_id:id,status:0}).then((res)=>{
				if (res.error_code==1000) {
					this.$message.success('下架成功')
					this.show_cut()
				};
			})
		},
		show_cut(){
			show_cut({shop_id:32}).then((res)=>{
				this.cut_goodsinfo=res.data
			})
		},
		add(){
			add_cut({
				goods_name:this.goods.goods_name,
				goods_price:this.goods.market_price,
				goods_img:this.goods.goods_img,
				goods_id:this.goods_id,
				get_price:this.goods.get_price,
				kj_num:this.goods.kj_num,
				goods_score:this.goods.goods_score,
				shop_id:32,
				status:1,
				goods_item:this.goods.goods_item
			}).then((res)=>{
				if (res.error_code==1000) {
					this.showadd=false
					this.$message.success('添加砍价成功')
					this.show_cut()
				};
			})
		},
		toadd(){
			this.showadd=true
		},
		choose_cut(item,index){
			this.goods.goods_name=item.goods_name
			//this.goods.goods_price=item.goods_price
			this.goods.goods_img=item.goods_img
			this.goods_id=item.goods_id
		},
		tosearch(){
			this.currentPage=1
			admin_search_goods({goods_name:this.search_input,page:this.currentPage}).then((res)=>{
					if (res.error_code==1003) {
						this.$message.error(res.msg)
					};
					if (res.error_code==1000) {
						this.goodsinfo = res.data
					};
				})
		}
		},
		created(){
			this.show_cut()
		}
	}
</script>
<style lang="stylus" scoped>
.title
	padding 30px 30px
	color #609eff
	cursor pointer
	border-bottom 10px solid #f9f9f9
.search
	cursor pointer
	color #609eff
	margin-left 30px
.cut_list
	padding 30px 
.goods_infos
	display flex
	justify-content space-between
	align-items center
	padding 10px 100px
	.goods_info_image
		width 80px
		height 100px
	.nameinfo
		width 150px
	.prices
		display flex
		margin-top 10px
		.price
			color #ff6c34
		.market_price
			text-decoration line-through
			color #cccccc
			margin-left 10px
	.score_info
		width 150px
.search_goodslist
	width 60%
	.search_goodsinfo
		display flex
		justify-content space-between
		padding 10px 20px
		align-items center
	.goods_info_image
		width 80px
		height 100px
	.nameinfo
		margin-left 20px
		width 200px
		.prices 
			display flex
			.price 
				color #ff6c34
			.market_price
				text-decoration line-through
				color #cccccc
	.choose
		cursor pointer
	.choosed
		color #409eff
.cut_info
	display 1
	padding 20px 20px
.button
	background-color #609eff
	padding 3px 10px
	color white
	border-radius 3px
	float right
	cursor pointer
.delete
	color #609eff
	cursor pointer
</style>