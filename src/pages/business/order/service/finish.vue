<template>
<div>
		<div class="orders">

			<div class="order" v-for='item in order'>
			<div class="order_sn">
    				<span style="font-size:12px">订单编号</span>：{{item.order_sn}}
    			</div>
				<div class="order_information">
				<div class="goodsimg">
					<img :src='item.goods_img'>
					<div class="goodsinfo">
					 	<div class="goodsname">{{item.goods_name}}</div>
					 	<div class="timeprice">
					 		<div class="pay"><div class="pay_money">￥{{item.goods_price}}</div></div>
					 	
					 		
					 	</div>
					</div>
				</div>
				<div class="ordertime">下单时间：{{item.order_time}}</div>
				<div class="customer">
					<div class="customer_info">联系人:{{item.service_name}}</div>
					<div class="customer_info">联系方式：{{item.service_phone}}</div>
					<div class="customer_info">预约时间：{{item.service_time}}</div>
					<div class="customer_info">买家留言：<span style="color:#ff6c34">{{item.message}}</span></div>
				</div>
				<div class="status">订单已完成</div>
				</div>
			</div>
		</div>

</div>
</template>

<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import {admin_already_experience} from '@/utils/api' 
	export default{
		data(){
			return{
				order:[],
				ordernone:''
			}
		},
		methods:{
		admin_finish(){
			admin_already_experience({shop_id:store.get('currentshopid')}).then((res)=>{		
				if (res.error_code==1002) {
					this.$message.error('请先登录')
					this.$router.push({ path: '/login' })
				}else if (res.error_code==1003) {
					this.$message.error('参数错误')
				}else if (res.error_code==1001){
						this.$message.error('暂无完成订单')
				}else if (res.error_code==1000) {
					this.order=res.data
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
	background-color white
	padding-bottom 30px
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
.order_information
	display flex
	justify-content space-between
	align-items center
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
.block
	padding 20px 30px
	font-size 18px
.el-pagination
	text-align right
</style>