<template>
<div>
	
		<div class="orders">
			<div class="order" v-for='(item,index) in order'>
				<div class="order_sn">
    				<span style="font-size:12px">订单编号</span>：{{item.order_sn}}
    			</div>
				<div class="order_information">
				<div class="goodsimg">
					<img :src='item.goods_img'>
					<div class="goodsinfo">
					 	<div class="goodsname">{{item.goods_name}}</div>
					 	<div class="timeprice">
					 		<div class="pay"><div class="pay_money">￥{{item.pay_money}}</div><div class="pay_sum">/ <span style="font-size:14px">数量</span>：{{item.pay_sum}}</div></div>
					 	
					 		<div class="ordertime">下单时间：{{item.order_time}}</div>
					 		<div class="sendtime">发货时间：{{item.send_time}}</div>
					 	</div>
					</div>
				</div>
				<div class="customer">
					<div class="customer_info">收货人:{{item.receiver}}</div>
					<div class="customer_info">联系方式：{{item.phone}}</div>
					<div class="customer_info">收货地址：{{item.address}}{{item.detail}}</div>
					<div class="customer_info">买家留言：<span style="color:#ff6c34">{{item.message}}</span></div>
				</div>
				<div class="shipping" >
					<div class="shipping_name">快递名称：{{item.shipping_name}}</div>
					<div class="shipping_code">快递单号：{{item.shipping_code}}</div>
					<div class="showshipping" @click="showexpress(item.order_id)">物流状态</div>
					
					<!-- <div class="expressinfo" v-if="expressinfo==index">
						<div class="exressinfo_content" v-if="info_datas_num!=0&&info_datas_num!=100">
						   <div class="info_datas" v-for="items in info_datas">
							  <div class="context">
							  <img src="../../../assets/images/dot.png">{{items.context}}
							  </div>
							  <div class="time">{{items.time}}</div>
						   </div>
						</div>
						<div class="none" v-if="info_datas_num==0">
								暂无物流信息！
						</div>
						<div class="error" v-if="info_datas_statu==1">
							无效的快递单号！
						</div>
					</div> -->
				</div>
				<div class="status">等待买家收货</div>
				</div>
			</div>
		</div>
		<el-dialog title="物流状态"class="expressinfo" :visible.sync="show_express_info" :before-close="express_close">
		<div class="exressinfo_content" v-if="info_datas_num!=0&&info_datas_num!=100">
						   <div class="info_datas" v-for="items in info_datas">
							  <div class="context">
							  <img src="../../../assets/images/dot.png">{{items.context}}
							  </div>
							  <div class="time">{{items.time}}</div>
						   </div>
		</div>
						<div class="none" v-if="info_datas_num==0">
								暂无物流信息！
						</div>
						<div class="error" v-if="info_datas_statu==1">
							无效的快递单号！
		</div>
		</el-dialog>

</div>
</template>

<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import {admin_already,get_shipping} from '@/utils/api' 
	export default{
		data(){
			return{
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
		admin_already(){
			admin_already({shop_id:store.get('currentshopid')}).then((res)=>{
				if (res.error_code==1002) {
					this.$message.error('请先登录')
					this.$router.push({ path: '/login' })
				}else if (res.error_code==1003) {
					this.$message.error('参数错误')
				}else if (res.error_code==1001){
						this.$message.error('暂无待收货订单')
						this.ordernone=1
				}else if (res.error_code==1000) {
					this.order=res.data

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