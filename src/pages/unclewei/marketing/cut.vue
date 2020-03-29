<template>
	<div class="cut_page">
		<div class="lee-content">
		<div class="title" @click="toadd"> <div>添加砍价商品</div></div>
		</div>
		<div class="lee-title1">砍价商品列表</div>
			<div class="goodslist">
				<div class="cut_list">砍价商品列表<span style="color:#ff6c34" v-if='cut_none'>（暂未设置砍价商品）</span></div>
				<div v-for="(item,index) in cut_goodsinfo" class="goods_infos">
					<div class="lee-img-content">
					<img :src="item.goods_img" class="goods_info_image">
					</div>
				<div class="nameinfo">
					<div class="goods_info_name">{{item.goods_name}}</div>
					<div class="prices">
					<div class="price">￥{{item.get_price}}</div>
					<div class="market_price">￥{{item.goods_price}}</div>
					</div>
				</div>
				<div class="score_info">
					<div class="score">库存：{{item.goods_score}}</div>
					<div class="score">要求砍价人数：{{item.kj_num}}</div>
					<div class="cut_num">{{item.goods_num}}人砍价成功</div>
				</div>
				<div class="delete" @click="delete_cut(item.goods_id)">下架商品砍价</div>
				</div>
			</div>
		<!-- 添加砍价商品 -->
		<el-dialog title="添加砍价商品" :visible.sync="showadd" :modal-append-to-body='false'>
			<div class="lee-content2">
				<el-input placeholder="输入商品名称搜索" size="medium" style="width:80%" v-model="search_input"></el-input><span class="search" @click="tosearch">搜索</span>
			</div>
			<div class="lee-style2">
			<div class="search_goodslist">
				<div v-for="(item,index) in goodsinfo" class="search_goodsinfo">
					<img :src="item.goods_img" class="goods_info_image">
				<div class="nameinfo">
					<div class="goods_info_name">{{item.goods_name}}</div>
					<!-- <div class="prices">
						<div class="price">￥{{item.goods_price}}</div>
						<div class="market_price">￥{{item.market_price}}</div>
					</div> -->
					<div class="score">库存：{{item.goods_score[0]}}<!-- <span class="recommended" v-if="item.is_commend==1">荐</span> --></div>
				</div>
				<div class="choose" v-if="goods_id!=item.goods_id" @click="choose_cut(item,index)">选择</div>
				<div class="choosed" v-if="goods_id==item.goods_id">已选择</div>
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
import * as store from '@/utils/sdk/store'
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
				},
				cut_none:''
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
			show_cut({shop_id:store.get('currentshopid')}).then((res)=>{
				if (res.error_code==1000) {
					this.cut_goodsinfo=res.data.goods
				}else if (res.error_code==1001) {
					this.cut_none=true
					this.cut_goodsinfo=[]
				};
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
				shop_id:store.get('currentshopid'),
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
			admin_search_goods({shop_id:store.get('currentshopid'),goods_name:this.search_input,page:this.currentPage}).then((res)=>{
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
.lee-content
	padding-top 30px
	padding-left 20px
.title
	padding 5px 50px 5px 20px
	height 50px
	color #609eff
	cursor pointer
	background-color #293643
	display flex
	justify-content flex-end
	align-items center
	div
		padding 5px 10px
		margin-right 10px
		cursor pointer
		background-color #409eff
		color #fff
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
	border-bottom 1px solid #ededed
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
	padding 20px 20px
	width:93%
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

<style lang="stylus" scoped >
	.el-dialog{
		width: 810px;
	}
	
	.lee-style2{
		display: flex;
	}
	@media(max-width:900px ) {
		.cut_list{
			display: none;
		}
		
	.lee-content{
		background: #FFFFFF;
		padding: 15px;
		}
		.el-dialog{
		width: 90%;
	}
	.title{
		width: 90%;
		background-color: #777777;
		color: #FFFFFF;
		margin:0 auto;
		height:30px;
		padding: 0;
		justify-content:center;
		line-height: 30px;
		border-bottom: none;
		div{
			background-color: #777777;
			height:30px;
			padding:0px;
			margin-right:0px;
		}
	}
	.div .body .el-main .breadcrumb-container{
		margin-bottom: 0;
	}
	.goodslist{
		background: #FFFFFF;
	}
	
	.goods_infos{
		display: block;
		padding: 10px 15px;
		border-bottom: 1px solid #e1e1e1;
	}
	.goods_infos .lee-img-content{
		width: 28%;
		display: inline-block;
		vertical-align: top;
	}
	
	.goods_infos .nameinfo{
		width: 68%;
		margin-left: 2%;
		display: inline-block;
		padding-top: 20px;
		color: #555555;
		font-size: 14px;
	}
	.goods_infos .score_info{
		color: #555555;
		font-size: 14px;
		width: 100%;
	}
	.goods_infos .score_info .score,
	.goods_infos .score_info .cut_num{
		display: inline-block;
		width: 49%;
		margin-top:15px;
		text-align: left;
	}
	
	.delete{
		font-size: 14px;
		padding-top: 10px;
		text-align: right;
	}
	.div .body .el-main .content-wrapper{
		
	}
	
	.search_goodslist .search_goodsinfo{
		padding: 0;
	}
	
	.search_goodslist .nameinfo{
		width: 100px;
		margin-left: 10px;
	}
	
	.search{
		position: absolute;
		right:20px;
		top:10px;
	}
	.el-input{
		width: 100% !important;
		position: relative;
	}
	.el-dialog__header{
		text-align: center;
	}
	
	.lee-content2{
		position: relative;
	}
	
	.el-form-item__label{
		width: 100%;
		display: block;
		text-align: left;
	}
	
	.el-form-item__content{
		display: block;
		width: 100%;
	}
	
	.el-form-item__label{
		height: 24px;
		line-height: 24px;
		color: #555555;
		font-size: 14px;
	}
	.search_goodslist{
		font-size: 12px;
	}
	
	}
	
	@media(max-width:700px ) {
		
		.lee-style2{
		display: block;
	}
		
		
		
		.search_goodslist{
			width: 100%;
		}
		.search{
			margin-left: 10px;
		}
		
		.cut_info{
			padding: 20px 0;
			div{
				width:100%;
				.el-form{
					width:100%;
				}
			}
		}
	}
</style>
<style>
.cut_page .el-dialog{
	width:50%
}
</style>
