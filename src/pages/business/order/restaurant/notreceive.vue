<template>
<div>
	
		<div class="orders">
			<div class="order" v-for='(item,index) in order'>
				<div class="order_sn">
    				<span style="font-size:12px">订单编号</span>：{{item.order_sn}}
    			</div>
				<div class="order_information">
				<div>
				<div class="goodsimg" v-for='items in item.goodsinfo'>
					<img :src='items.goods_img' v-if="item.is_kj==0">
					<img :src='item.goodsimage' v-if="item.is_kj==1">
					<div class="goodsinfo">
					 	<div class="goodsname" v-if="item.is_kj==0">{{items.goodsname}}</div>
					 	<div class="goodsname" v-if="item.is_kj==1">{{item.goods_name}}</div>
					 	<div class="timeprice">
					 		<div class="pay">
					 			<div class="pay_money" v-if="item.is_kj==0">￥{{items.goodscost}}</div>
					 			<div class="pay_money" v-if="item.is_kj==1">￥{{item.get_price}}</div>
					 			<div class="pay_sum" v-if="item.is_kj==0">/ <span style="font-size:14px">数量</span>：{{items.goodsnum}}</div>
					 			<div class="pay_sum" v-if="item.is_kj==1">/ <span style="font-size:14px">数量</span>：1</div>
					 		</div>
					 	</div>
					</div>
				</div>
				<div class="ordertime">下单时间：{{item.order_time}}</div>
				</div>
				<div class="customer">
					<div class="customer_info">桌号:{{item.desk_num}}</div>
					<!-- <div class="customer_info">联系方式：{{item.phone}}</div>
					<div class="customer_info">收货地址：{{item.address}}</div> -->
					<div class="customer_info">买家留言：<span style="color:#ff6c34">{{item.message}}</span></div>
				</div>
				<div class="status">已出餐</div>
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
import {admin_already,get_shipping} from '@/utils/api' 
	export default{
		data(){
			return{
				pagecount:1,
				currentPage:1,
				order:[],
				expressinfo:10000,
				ordernone:'',
				info_datas:[],
				info_datas_num:100,
				info_datas_statu:0,
				show_express_info:false,
				order_id:''
			}
		},
		methods:{
		handleCurrentChange(){
			this.admin_already()
		},
		admin_already(){
			admin_already({shop_id:store.get('currentshopid'),page:this.currentPage,order_type:2}).then((res)=>{
				var order_goods=[]
				if (res.error_code==1000) {
					this.order=res.data.order
					this.pagecount=res.data.totalpage
					for (var i = this.order.length - 1; i >= 0; i--) {
						for (var p = this.order[i].goodsid.length - 1; p >= 0; p--) {
						order_goods.push({goodscost:this.order[i].goodscost[p],
										  goodsid:this.order[i].goodsid[p],
										  goodsname:this.order[i].goodsname[p],
										  goodsnum:this.order[i].goodsnum[p],
										  goods_img:this.order[i].goodsimg[p]
							})
						};
						this.order[i].goodsinfo=order_goods
						order_goods=[]
					};
				}else if (res.error_code==1001){
			 			this.order = ''
			 			this.$message.error('暂无待收货订单')
			 	}
			})
		
		},
		express_close(done){
			this.info_datas=[]
			this.info_datas_num=100
			this.info_datas_statu=0
			done(true)
		},

		showexpress(id){
			 this.show_express_info=true
			 get_shipping({order_id:id}).then((res)=>{
			 	if (res.error_code==1000) {
			 		this.info_datas=res.data.data
			  		this.info_datas_num=res.data.data.length
			  		this.info_datas_statu=0
			 	}else if (res.error_code==1001) {
			 		this.info_datas_num=100
			 		this.info_datas_statu=1
			 	}else if (res.error_code==1002) {
			 		this.info_datas_num=0
			 		this.info_datas_statu=0
			 	};
			  })
		},
	},
		created(){
			console.log('eeee')
			this.admin_already()
		},

}
</script>

<style lang="stylus" scoped>
.order_information
	display flex
	justify-content space-between
	align-items center
.orders
	background-color white
.order
	height auto
	padding 20px 20px 0 40px
	border-bottom 1px solid #ebedef
	font-size 15px
	color #323232
	.order_sn
		font-size 13px
		color #bbbbbb
		margin-bottom 10px
		margin-left 20px
	.customer
		width 350px
		.customer_info
			margin-bottom 7px

.goodsimg{
	display:flex;
	justify-content:flex-start;
	width:500px;
	height:120px;
	img{
		width:90px;
		height:100px;
	}
	.goodsinfo{
	margin-left:30px;
	height:120px;
	width:500px;
	.pay{
		display:flex;
		justify-content:flex-start;
		padding-top:15px;
		.pay_money{
			color:#f2681c;
		}
		.pay_sum{
			color:#323232;
			margin-left:5px;
			font-size:15px;
			line-height:21px;
		}
	}
	.ordertime{	
		padding-top:18px;
		color:#AAAAAA;
		font-size:12px;
	}
	.sendtime{
		paddin-top:10px;
		color:#AAAAAA;
		font-size:12px;
	}
	}
}
.status{
	width:100px;
	height:30px;
	color:#9a9b9b;
	line-height:30px;
	text-align:center;
}
.shipping{
	position:relative;
	width:150px
	margin-right 50px
}
.shipping_name{
	color:#323232;
}
.shipping_code{
	color:#323232;
	margin-top:7px;
}
.showshipping{
	color:#0a9cfa;
	cursor:pointer;
	margin-top:7px;
	width:80px;
	height:30px;
}
.expressinfo
	padding 0 15%
	width 100%
.exressinfo_content
	height auto
	border-radius 4px
	padding-left 5px
.context
	font-size 12px
	color #323232
	img
		width 3px
		height 3px
.time
	font-size 10px
	color #aaaaaa
.none
	font-size 12px
	color #C0C4CC
	border-radius 4px
	padding-left 5px
.error
	font-size 12px
	color #C0C4CC
	border-radius 4px
	padding-left 5px
</style>
<style lang="stylus" scoped>
	.expressinfo{
		padding: 0;
	}
	.el-dialog{
		width: 500px;
	}
	.ordertime{
		color: #aaa;
    font-size: 12px;
    margin-left: 20px;
    margin-bottom: 10px;
	}
@media(max-width:900px ) {
.ordertime{
	margin-left:0;
}
		.order .customer .customer_info{
	margin-left: 0px;
}
		.el-dialog{
			width: 90%;
		}
	.order_information{
		display: block;
	}
	
	.goodsimg,
	.order .customer,
	.order_information,
	.status{
		width: 100%;
		display: block !important;
		height: auto !important;
	}
	
	.goodsimg .goodsinfo,
	.order .order_sn{
		margin-left: 0;
	}
	.order{
		padding: 10px 0;
		position: relative;
		
	}
	.order .order_sn{
		margin: 0;
		border-bottom: 1px solid #e1e1e1;
		margin-bottom: 10px;
		padding: 0 10px 5px;
	}
	.order_information{
		height: auto;
		display: block;
		padding:0 10px;
	}
	
	.goodsimg{
		height: auto;
	}

	.goodsimg img{
		display:inline-block;
		margin-right:30px;
		vertical-align: top;
	}
	
	.goodsimg .goodsinfo{
		display:inline-block;
		width:auto;
		margin-left: 10px;
		height: auto;
	}
	
	.order .customer{
		width: 100%;
		display: block;
	}
	
	.order .customer{
		font-size: 12px;
	}
	.shipping{
		font-size: 12px;
	}
	
	.status{
		width: auto;
		font-size: 12px;
		position: absolute;
		right: 10px;
		top: 10px;
		height: auto;
		line-height: inherit;

	}
	}
.block
	padding 20px 30px
	font-size 18px
.el-pagination
	text-align right
</style>