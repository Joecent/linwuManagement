<template>
<div>
		<div class="orders">
			<div class="order" v-for='item in order'>
				<div class="order_sn">
    				<span style="font-size:12px">订单编号</span>：{{item.order_sn}}
    			</div>
				<div class="order_information">
				<div>
				<div class="goodsimg" v-for='items in item.goodsinfo'>
					<!-- <img :src='items.goods_img' v-if="item.is_kj==0"> -->
					<img :src='items.goods_img'>
					<div class="goodsinfo">
					 	<div class="goodsname">{{items.goods_name}}</div>
					 	<div class="timeprice">
					 		<div class="pay">
					 			<div class="pay_money">￥{{items.goods_cost}}</div>
					 			<!-- <div class="pay_money" v-if="item.is_kj==1">￥{{item.get_price}}</div> -->
					 			<div class="pay_sum">/ <span style="font-size:14px">数量</span>：{{items.goods_num}}</div>
					 			<!-- <div class="pay_sum" v-if="item.is_kj==1">/ <span style="font-size:14px">数量</span>：1</div> -->
					 		</div>
					 	</div>
					</div>
				</div>
					<div class="ordertime">下单时间：{{item.order_time}}</div>
					<div class="refund_time">申请退款时间：{{item.create_time}}</div>
				</div>
				<div class="customer">
					<div class="customer_info">收货人:{{item.consignee_name}}</div>
					<div class="customer_info">联系方式：{{item.consignee_phone}}</div>
					<div class="customer_info">收货地址：{{item.consignee_address}}</div>
					<div class="customer_info">买家留言：<span style="color:#ff6c34">{{item.message}}</span></div>
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
		<el-dialog title="同意退款" class="remove" :visible.sync="is_approve">
            <div class="message">是否确定同意退款 ？</div>
            <div class="question">
              <button class="cancle" @click="is_approve=false">取消</button>
              <button class="approve_comfirm" @click="approve()">确认</button>
            </div>
        </el-dialog>
        <el-dialog title="拒绝退款" class="remove" :visible.sync="is_reject">
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
		to_approve(id){
			this.is_approve=true
			this.refund_id=id
		},
		approve(){
			solve({refund_id:this.refund_id,status:1}).then((res)=>{
				this.is_approve=false
				this.$message('已同意退款')
				this.get_refund()
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
		handleCurrentChange(){
			this.get_refund()
		},
		get_refund(){
			get_refund({shop_id:store.get('currentshopid'),order_type:1,page:this.currentPage}).then((res)=>{
				var order_goods=[]
				if (res.error_code==1000) {
					this.order=res.data.order
					this.pagecount=res.data.totalpage
					for (var i = this.order.length - 1; i >= 0; i--) {
						for (var p = this.order[i].goods_name.length - 1; p >= 0; p--) {
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
				}else if (res.error_code==1001){
			 			this.order = ''
			 			this.$message.error('暂无退款订单')
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
.remove
	width 50%
	margin-left 25%
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
	.refund_time{
		paddin-top:10px;
		color:#AAAAAA;
		font-size:12px;
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
.block
	padding 20px 30px
	font-size 18px
.el-pagination
	text-align right

</style>