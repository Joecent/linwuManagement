<template>
<div>
		<div class="orders">
			<div class="order_null" v-if='message'>暂无订单信息</div>
			<div class="order" v-for='item in order'>
				<div class="order_sn">
    				<span style="font-size:12px">订单编号</span>：{{item.order_sn}}
    			</div>
				<div class="order_information">
				<!-- <div class="goodsimg">
					<img :src='item.goods_img'>
					<div class="goodsinfo">
					 	<div class="goodsname">{{item.goods_name}}</div>
					 	<div class="timeprice">
					 		<div class="pay"><div class="pay_money">￥{{item.pay_money}}</div><div class="pay_sum">/ <span style="font-size:14px">数量</span>：{{item.pay_sum}}</div></div>
					 	
					 		<div class="ordertime">下单时间：{{item.order_time}}</div>
					 		<div class="refund_time">申请退款时间：{{item.create_time}}</div>
					 	</div>
					</div>
				</div> -->
				<div>
				<div class="goodsimg" v-for='items in item.goodsinfo'>
					<!-- <img :src='items.goods_img' v-if="item.is_kj==0"> -->
					<span class="shop_img"><img :src='items.goods_img'></span>
					<div class="goodsinfo">
					 	<div class="goodsname">{{items.goods_name}}</div>
					 	<div class="timeprice">
					 		<div class="pay">
					 			<div class="pay_money">￥{{items.goods_cost}}</div>
					 			<!-- <div class="pay_money" v-if="item.is_kj==1">￥{{item.get_price}}</div> -->
					 			<div class="pay_sum">/ <span style="font-size:14px">数量</span>：{{items.goods_num}}</div>
					 			<!-- <div class="pay_sum" v-if="item.is_kj==1">/ <span style="font-size:14px">数量</span>：1</div> -->
					 		</div>
							 <div class='send_type'>{{item.send_type=='1'?'自取':item.send_type=='3'?'送货上门':'快递'}}</div>
					 	</div>
					</div>
				</div>
					<div class="ordertime">下单时间：{{item.order_time}}</div>
					<div class="refund_time">申请退款时间：{{item.create_time}}</div>
				</div>
				<div class="customer" v-if="item.buyer!=''">
					<div class="customer_info">收货人:{{item.buyer}}</div>
					<div class="customer_info">联系方式：{{item.phone}}</div>
					<div class="customer_info">收货地址：{{item.address}}</div>
					<div class="customer_info">买家留言：<span style="color:#ff6c34">{{item.message}}</span></div>
				</div>
				<div v-if="item.send_type=='1'||item.send_type=='3'" class='customer'>
					<div class='send_info'>
						<div class="customer_info">团长姓名:{{item.group_username}}</div>
						<div class="customer_info">联系方式:{{item.group_phone}}</div>
					</div>
					<div class="customer_info">地址:{{item.group_address}}{{item.group_address_detail}}</div>
				</div>
				<div class="refund">
					<div class="refund_info">退款原因:{{item.cause}}</div>
				</div>
				<div class="button" v-if="item.status==0">
				<div><div class="postbutton"  @click="to_approve(item.refund_id)">同意退款</div></div>
				<div><div class="postbutton"  style="color:#C0C4CC" @click="to_reject(item.refund_id)">拒绝退款</div></div>
				</div>
				<div class="refund_status" v-if="item.status==1">
					<div>已经同意退款</div>
				</div>
				<div class="refund_status" v-if="item.status==2">
					<div class="recommit" @click="to_approve(item.refund_id)">改为同意</div>
					<div>已经拒绝退款</div>
				</div>
				<div class="refund_status" v-if="item.status==3">
					<div>已完成退款</div>
				</div>
				<div class="refund_status" v-if="item.status==4">
					<div>用户已取消退款</div>
				</div>
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
		<el-dialog title="同意退款" class="remove" :visible.sync="is_approve" :modal-append-to-body='false'>
            <div class="message">是否确定同意退款 ？</div>
            <div class="question">
              <button class="cancle" @click="is_approve=false">取消</button>
              <button class="approve_comfirm" @click="approve()">确认</button>
            </div>
        </el-dialog>
        <el-dialog title="拒绝退款" class="remove" :visible.sync="is_reject" :modal-append-to-body='false'>
            <div class="message">是否确定拒绝退款？</div>
            <div class="question">
              <button class="cancle" @click="is_reject=false">取消</button>
              <button class="reject_comfirm" @click="reject()">确认</button>
            </div>
        </el-dialog>
</div>
</template>

<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import {get_refund,solve} from '@/utils/api' 
	export default{
		data(){
			return{
				message:'',
				pagecount:1,
				currentPage:1,
				order:[],
				ordernone:'',
				is_approve:false,
				is_reject:false,
				refund_id:''
			}
		},
		methods:{
		handleCurrentChange(){
			this.get_refund()
		},
		to_approve(id){
			this.is_approve=true
			this.refund_id=id
		},
		approve(){
			solve({refund_id:this.refund_id,status:1}).then((res)=>{
				if (res.error_code==1000) {
					this.is_approve=false
					this.$message('已同意退款')
					this.get_refund()
				}else  {
					this.$message.error('退款失败！')
				};
				
			})
		},
		to_reject(id){
			this.is_reject=true
			this.refund_id=id
		},
		reject(){
			solve({refund_id:this.refund_id,status:0}).then((res)=>{
				this.is_reject=false
				this.$message('已拒绝退款')
				this.get_refund()
			})
		},
		get_refund(){
			get_refund({shop_id:store.get('currentshopid'),order_type:0,page:this.currentPage}).then((res)=>{
				var order_goods=[]
				if (res.error_code==1000) {
					this.message=false
					this.order=res.data.order
					this.pagecount=res.data.totalpage
					for (var i = this.order.length - 1; i >= 0; i--) {
						for (var p = this.order[i].goods_cost.length - 1; p >= 0; p--) {
						order_goods.push({
										  goods_cost:this.order[i].goods_cost[p],
										  goods_name:this.order[i].goods_name[p],
										  goods_num:this.order[i].goods_num[p],
										  goods_img:this.order[i].goods_img[p],
							})
						};
						this.order[i].goodsinfo=order_goods
						order_goods=[]
					};
					console.log(this.order,'2222')
				}else if (res.error_code==1001){
			 			this.order = ''
			 			this.message=true
			 	}
			})
		
		}
		},
		created(){
			this.get_refund()
		},
	}
</script>

<style lang="stylus" scoped>
.order_null
	display flex
	justify-content flex-start
	padding 15px
	color #888
.orders
	background-color white
.send_type
	margin-top 10px
.remove
	.question
		margin-top 20px
		display flex
		justify-content space-between
		padding 0 15%
		.approve_comfirm
			color white
			background-color #409EFF
			cursor pointer
			padding 5px 20px 
			border-radius 3px
		.reject_comfirm 
			color white
			background-color #409EFF
			cursor pointer
			padding 5px 20px 
			border-radius 3px
		.cancle
			color #C0C4CC
			background-color white
			cursor pointer
			padding 5px 20px
			border-radius 3px
			border 1px solid #C0C4CC

.order_information
	display flex
	justify-content space-between
	align-items center
	padding-bottom 10px
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
	.customer
		width 350px
		.customer_info
			margin-bottom 7px
	.refund
		width 150px
.refund_status
	color #C0C4CC
.recommit
	color #409EFF
	cursor pointer
	margin-bottom 20px	
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
	}
}
.ordertime{	
		color:#AAAAAA;
		font-size:12px;
	}
	.refund_time{
		paddin-top:10px;
		color:#AAAAAA;
		font-size:12px;
	}
.postbutton{
	width:80px;
	height:30px;
	color:#409EFF;
	line-height:30px;
	margin-right:30px;
	text-align:center;
	cursor:pointer;
}


</style>
<style lang="stylus" scoped>
	.expressinfo{
		padding: 0;
	}
	.el-dialog{
		width: 500px;
	}
	@media(max-width:900px ) {
		
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
	
	.goodsimg .goodsinfo{
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
.w-block
	padding 20px 30px
	font-size 18px
.el-pagination
	text-align right
</style>	