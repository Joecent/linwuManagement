<template>
<div class="orders">
	<div style="display:flex;">
		<div class="search"><input placeholder="请输入手机尾号搜索" v-model='search_input'/><img src="../../../../assets/images/search.png" @click='search()'></div>
		<div class="search" style="margin-left:40px;" ><input placeholder="请输入买家姓名搜索" v-model='name_input'/><img src="../../../../assets/images/search.png" @click='search_name()'></div>
	</div>
    <div class="order" v-for='item in order'>
    		<div class="order_sn">
    			<span style="font-size:12px">订单编号</span>：{{item.order_sn}}
    		</div>
    		<div class="order_information">
				<div>
				<div class="goodsimg" v-for='items in item.goods'>
					<img :src='items.goods_img'>
					<!-- <img :src='item.goodsimage' v-if="item.is_kj==1"> -->
					<div class="goodsinfo">
					 	<!-- <div class="goodsname" >{{items.goodsname}}</div> -->
					 	<div class="goodsname" >{{items.goods_name}}</div>
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
				</div>
				<div class="customer">
					<div class="customer_info" v-if="item.order_type==1">订单类型：外卖</div>
					<div class="customer_info" v-if="item.order_type==2">订单类型：堂吃</div>
					<div class="customer_info" v-if="item.order_type==2">桌号：{{item.desk_num}}</div>
					<div class="customer_info" v-if="item.order_type==1">收货人:{{item.buyer}}</div>
					<div class="customer_info" v-if="item.order_type==1">联系方式：{{item.phone}}</div>
					<div class="customer_info" v-if="item.order_type==1">收货地址：{{item.address}}{{item.detail}}</div>
					<div class="customer_info">买家留言：<span style="color:#ff6c34">{{item.message}}</span></div>
				</div>
			
				<!-- <div class="postbutton" v-if="item.status==0" @click="tosendgoods(item.order_id,item.pay_money,item.receiver,item.address,item.detail,item.latitude,item.longitude,item.phone)"> 出餐</div>
				<div class="postbutton_wait" v-if="item.status==1">等待配送员取餐</div> -->
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
    <el-dialog title="是否确认发货" :visible.sync="tosend" label-width="80px" style="width:100%;margin-top:100px">
    	<div style="text-align:center;">
		<div style="width:60%;display:inline-block;" class="comfirm_option">
				<div style="display:flex;justify-content:space-between;">
					<button class="cancle" @click="tosend=false">取消</button>
  				    <button class="post_comfirm" @click="onSubmit()">确认</button>
  				</div>
  		</div>
  		</div>	
	  </el-dialog>
</div>

	


</template>

<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import {admin_wait,send,admin_waits,admin_all_wait,dada_index,get_dada_status,newWaitOrder,getDistriBution} from '@/utils/api' 
	export default{
		data(){
			return{
				name_input:'',
				search_input:'',
				send_type:store.get('send_type'),
				pagecount:1,
				currentPage:1,
				order:[],
				ordernone:'',
				tosend:false,
				expresselse:false,
				post_order_id:'',
				pay_money:'',
				sendinfo:{
					send_type:'',
					number:''
				}			
			}
		},
		methods:{
		search(){
			getDistriBution({
				shop_id:store.get('currentshopid'),
				phone:this.search_input
			}).then(res=>{
				var order_goods=[]
				if (res.error_code==1000) {
					this.order=res.data.data
					this.pagecount=res.data.totalPage
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
			 			this.$message.error('暂无此人订单')
			 	}
			})

		},
		search_name(){
			getDistriBution({
				shop_id:store.get('currentshopid'),
				name:this.name_input
			}).then(res=>{
				var order_goods=[]
				if (res.error_code==1000) {
					this.order=res.data.data
					this.pagecount=res.data.totalPage
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
			 			this.$message.error('暂无此人订单')
			 	}
			})
		},
		handleCurrentChange(){
			this.admin_wait()
		},
		tosendgoods(id,pay_money,receiver,address,detail,latitude,longitude,phone){
			this.post_order_id=id
			this.pay_money=pay_money
			this.receiver=receiver
			this.address=address+detail
			this.latitude=latitude
			this.longitude=longitude
			this.phone=phone
			this.tosend=true
		},
		admin_wait(){
			newWaitOrder({shop_id:store.get('currentshopid'),page:this.currentPage,order_type:0}).then((res)=>{
				var order_goods=[]
				if (res.error_code==1000) {
					this.order=res.data.data
					this.pagecount=res.data.totalPage
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
			 			this.$message.error('暂无待处理订单')
			 	}
			})
		},
		onSubmit(){
			if (this.send_type==1) {
			send({order_id:this.post_order_id,shipping_name:'',shipping_code:''}).then((res)=>{
				this.admin_wait()
			})
			}else if (this.send_type==2) {

			}else if (this.send_type==3) {
				dada_index({
					shop_no: 11047059,
					origin_id:this.post_order_id,
					city_code: 21,
					cargo_price:this.pay_money,
					is_prepay:0,
					receiver_name:this.receiver,
					receiver_address:this.address,
					receiver_lat:this.latitude,
					receiver_lng:this.longitude,
					receiver_phone:this.phone
				}).then((res)=>{
					this.admin_wait()
				})
			};
			this.tosend=false
		},
	},
	created(){
			this.admin_wait()
			console.log(this.send_type,'222')
	},
}
</script>

<style lang="stylus" scoped>
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
			left 195px
			width 18px
			height 18px
			cursor pointer
.cancle
  color #c0c4cc
  border 1px solid #c0c4cc
  cursor pointer
  padding 5px 20px
  border-radius 3px
  background-color white
.post_comfirm
  color white
  background-color #409EFF
  cursor pointer
  padding 5px 20px
  border-radius 3px
.el-form-item.comfirm_option
  margin-bottom 0
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
	.customer_info
		margin-bottom 7px
		width 300px

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
	}
}
.ordertime{	
		color:#AAAAAA;
		font-size:12px;
		margin-left:20px;
		margin-bottom:10px;
	}
.postbutton
	width 120px
	height 30px
	color #409EFF
	line-height 30px
	margin-right 50px
	text-align center
	background-color #fff
	cursor pointer
.postbutton_wait
	width 120px
	height 30px
	color #aaaaaa
	text-align center
	line-height 30px
	margin-right 50px
	background-color #fff 
.type-one
	margin-right 10px
.type_choose
	margin-top 12px
.block
	padding 20px 30px
	font-size 18px
.el-pagination
	text-align right
	


</style>
<style lang="stylus" scoped>
	@media (max-width: 1200px){
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

		.postbutton_wait{
			font-size:12px;
			text-align:left;
		}
	}
</style>