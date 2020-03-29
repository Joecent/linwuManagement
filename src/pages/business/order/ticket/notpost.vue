<template>
<div class="orders">
    <div class="order" v-for='item in order'>
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
					<div class="customer_info">收货人:{{item.receiver}}</div>
					<div class="customer_info">联系方式：{{item.phone}}</div>
					<div class="customer_info">收货地址：{{item.address}}{{item.detail}}</div>
					<div class="customer_info">买家留言：<span style="color:#ff6c34">{{item.message}}</span></div>
				</div>
			
				<div class="postbutton" @click="tosendgoods(item.order_id)"> 发货</div>
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
    <el-dialog title="填写发货信息" :visible.sync="tosend" label-width="80px" style="width:1000px;margin-left:300px;margin-top:100px">
		  <el-form ref='sendinfo':model="sendinfo">
			<el-form-item label="选择快递">
				<el-select v-model="sendinfo.express" placeholder="请选择快递"style="margin-left:27px;width:40%">
					<el-option label="顺丰" value="顺丰"></el-option>
					<el-option label="申通" value="申通"></el-option>
					<el-option label="圆通" value="圆通"></el-option>
					<el-option label="中通" value="中通"></el-option>
					<el-option label="韵达" value="韵达"></el-option>
					<el-option label="天天" value="天天"></el-option>
					<el-option label="百世汇通" value="百世汇通"></el-option>
					<el-option label="京东快递" value="京东快递"></el-option>
					<el-option label="EMS" value="EMS"></el-option>
					<el-option label="德邦" value="德邦"></el-option>
					<el-option label="全峰" value="全峰"></el-option>
					<el-option label="中铁快运" value="中铁快运"></el-option>
					<el-option label="如风达" value="如风达"></el-option>
					<el-option label="宅急送" value="宅急送"></el-option>
					<el-option label="其它" value="其它"></el-option>
				</el-select>
			<!-- </el-form-item :visible.sync="expresselse">
				<el-input placeholder="请填写快递名称"  style="width:60%"></el-input>
			</el-form-item> -->
			</el-form-item> 
			<el-form-item label="填写快递单号">
				<el-input placeholder="请填写快递单号" v-model="sendinfo.number" style="width:60%"></el-input>
			</el-form-item>
			<el-form-item style="margin-left:65px;margin-top:30px;" class="comfirm_option">
					<button class="cancle" @click="tosend=false">取消</button>
  				    <button class="post_comfirm" @click="onSubmit(post_order_id)">确认</button>
  			</el-form-item>	
		</el-form>
	  </el-dialog>
</div>

	


</template>

<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import {admin_wait,send,admin_waits,admin_all_wait} from '@/utils/api' 
	export default{
		data(){
			return{
				pagecount:1,
				currentPage:1,
				order:[],
				ordernone:'',
				tosend:false,
				expresselse:false,
				post_order_id:'',
				sendinfo:{
					express:'',
					number:''
				}			
			}
		},
		methods:{
		handleCurrentChange(){
			this.admin_wait()
		},
		tosendgoods(id){
			this.post_order_id=id
			this.tosend=true
		},
		admin_wait(){
			admin_waits({shop_id:store.get('currentshopid'),page:this.currentPage}).then((res)=>{
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
			 			this.$message.error('暂无待发货订单')
			 	}
			})
			// admin_wait({shop_id:store.get('currentshopid')}).then((res)=>{
			// 	console.log(res.data)
				
			// 	if (res.error_code==1002) {
			// 		this.$message.error('请先登录')
			// 		this.$router.push({ path: '/login' })
			// 	}else if (res.error_code==1003) {
			// 		this.$message.error('参数错误')
			// 	}else if (res.error_code==1001){
			// 			this.order = res.data
			// 			this.$message.error('暂无代发货订单')
			// 	}else if (res.error_code==1000) {
			// 		this.order=res.data
			// 	}
				
			// })
		
		},
		onSubmit(order_id){
			var full = true
			if (this.sendinfo.express=='') {
				this.$message.error('请选择快递名称')
				full = false
				}
			
			else if (this.sendinfo.number=='') {
			 	this.$message.error('快递单号不能为空')
			 	full=false
			}
			 else {
			 	full = true
			 }
			 if (full== true){
			console.log(this.sendinfo)
			send({order_id:order_id,shipping_name:this.sendinfo.express,shipping_code:this.sendinfo.number}).then((res)=>{
				this.admin_wait()
			})
				this.tosend=false
		}
		},
		},
		created(){
			this.admin_wait()
		},
	}
</script>

<style lang="stylus" scoped>

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
  margin-left 200px
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
	width 60px
	height 30px
	color #409EFF
	line-height 30px
	margin-right 50px
	background-color #fff
	cursor pointer
.block
	padding 20px 30px
	font-size 18px
.el-pagination
	text-align right
	


</style>
<style>
	
</style>