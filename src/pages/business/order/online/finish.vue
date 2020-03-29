<template>
		<div class="orders">
		<div class="order_null" v-if='message'>暂无订单信息</div>
			<div class="order" v-for='item in order'>
			<div class="order_sn">
    				<span style="font-size:12px">订单编号</span>：{{item.order_sn}}
    			</div>
				<div class="order_information">
				<div>
				<div class="goodsimg" v-for='items in item.goodsinfo'>
					<span class="shop_img"><img :src='items.goods_img' v-if="item.is_kj==0"></span>
					<span class="shop_img"><img :src='item.goodsimage' v-if="item.is_kj==1"></span>
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
							 <div class='send_type'>{{item.send_type=='1'?'自取':item.send_type=='3'?'送货上门':'快递'}}</div>
					 	</div>
					</div>
				</div>
				<div class="ordertime">下单时间：{{item.order_time}}</div>
				</div>
				<div class="customer"  v-if="item.buyer!=''">
					<div class="customer_info">收货人:{{item.buyer}}</div>
					<div class="customer_info">联系方式：{{item.phone}}</div>
					<div class="customer_info">收货地址：{{item.address}}{{item.detail}}</div>
					<div class="customer_info">买家留言：<span style="color:#ff6c34">{{item.message}}</span></div>
				</div>
				<div v-if="item.send_type=='1'||item.send_type=='3'" class='customer'>
					<div class='send_info'>
						<div class="customer_info">团长姓名:{{item.group_username}}</div>
						<div class="customer_info">联系方式:{{item.group_phone}}</div>
					</div>
					<div class="customer_info">地址:{{item.group_address}}{{item.group_address_detail}}</div>
				</div>
				<div class="status">买家已收货</div>
				</div>
			</div>
			<div class="w-block">
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
</template>

<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import {admin_finish} from '@/utils/api' 
	export default{
		data(){
			return{
				message:'',
				pagecount:1,
				currentPage:1,
				order:[],
				ordernone:''
			}
		},
		methods:{
		handleCurrentChange(){
			this.admin_finish()
		},
		admin_finish(){
			admin_finish({shop_id:store.get('currentshopid'),order_type:0,page:this.currentPage}).then((res)=>{
				var order_goods=[]
				if (res.error_code==1000) {
					this.message=false
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
			 			this.message=true
			 	}
			})
		
		}
		},
		created(){
			this.admin_finish()
		},
	}
</script>
<style lang="stylus" scoped>
.orders
	background #fff	
.order_null
	display flex
	justify-content flex-start
	padding 15px
	color #888
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
	.customer
		width 350px
		.customer_info
			margin-bottom 7px
.order_information
	display flex
	justify-content space-between
	align-items center
.send_type
	margin-top 10px
.goodsimg{
	display:flex;
	justify-content:flex-start;
	width:380px;
	height:120px;
	img,.shop_img{
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
	margin-right:80px;
	text-align:center;
}

</style>

<style lang="stylus" scoped>
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

.goodsimg{
	height:auto;
}

		.order .order_sn{
			margin: 0;
    		border-bottom: 1px solid #e1e1e1;
    		margin-bottom: 10px;
   		 	padding: 0 10px 5px;
		}

		.order .customer_info{
			font-size:12px;
		}

		.postbutton{
			font-size:12px;
		}

		.order{
			 padding: 10px;
   			 position: relative;
		}

		.goodsimg img{
			display:inline-block;
			margin-right:30px;
			vertical-align: top;
		}
		.order_information{
			display:block;
		}

		.goodsimg{
			display:block;
			width:100%;
		}

		.goodsimg .goodsinfo{
			width:auto;
			display:inline-block;
			margin-left:0;
		}

		.ordertime{
			 	margin-left:0;
		}

		.status{
			font-size:12px;
			text-align:left;
		}
	}
.w-block
	padding 20px 30px
	font-size 18px
.el-pagination
	text-align right
</style>