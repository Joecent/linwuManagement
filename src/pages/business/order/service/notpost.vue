<template>
<div class="orders">
    <div class="order" v-for='item in order'>
    		<div class="order_sn">
    			<span style="font-size:12px">订单编号</span>：{{item.order_sn}}
    		</div>
    		<div class="order_information">
				<div>
				<div class="goodsimg">
					<img :src='item.goods_img'>
					<div class="goodsinfo">
					 	<div class="goodsname">{{item.goods_name}}</div>
					 	<div class="timeprice">
					 		<div class="pay">
					 			<div class="pay_money">￥{{item.goods_price}}</div>
					 			<!-- <div class="pay_sum">/ <span style="font-size:14px">数量</span>：{{item.goodsnum}}</div> -->
					 		</div>
					 	</div>
					</div>
				</div>
				<div class="ordertime">下单时间：{{item.order_time}}</div>
				</div>
				<div class="customer">
					<div class="customer_info">联系人:{{item.service_name}}</div>
					<div class="customer_info">联系方式：{{item.service_phone}}</div>
					<div class="customer_info">预约时间：{{item.service_time}}</div>
					<div class="customer_info">买家留言：<span style="color:#ff6c34">{{item.message}}</span></div>
				</div>
			
				<div class="postbutton" @click="tosendgoods(item.order_id)">完成</div>
	  		</div>	
    </div>
    <!-- <div class="block">
            	 <el-pagination
              @current-change="handleCurrentChange"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :page-count="pagecount"
              :pager-count="5"
              :current-page.sync="currentPage">
           		 </el-pagination>
     </div>	 -->
    <el-dialog title="是否确认完成该订单" :visible.sync="tosend" label-width="80px" style="width:100%;margin-top:100px">
		<div style="text-align:center;">
		<div style="width:60%;display:inline-block;" class="comfirm_option">
				<div style="display:flex;justify-content:space-between;">
					<button class="cancle" @click="tosend=false">取消</button>
  				    <button class="post_comfirm" @click="onSubmit(post_order_id)">确认</button>
  				</div>
  		</div>
  		</div>		
	  </el-dialog>
</div>

	


</template>

<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import {admin_wait_experience,send,confirm_experience} from '@/utils/api' 
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
			admin_wait_experience({shop_id:store.get('currentshopid')}).then((res)=>{	
				if (res.error_code==1002) {
					this.$message.error('请先登录')
					this.$router.push({ path: '/login' })
				}else if (res.error_code==1003) {
					this.$message.error('参数错误')
				}else if (res.error_code==1001){
						this.order = res.data
						this.$message.error('暂无待体验订单')
				}else if (res.error_code==1000) {
					this.order=res.data
				}
				
			})
		
		},
		onSubmit(order_id){
			confirm_experience({order_id:order_id}).then((res)=>{
					this.admin_wait()
			})
				this.tosend=false
		
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
<style  lang="stylus" scoped>
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
	}
</style>