<template>
<div class="orders" style="background-color:white;">
	<div v-if="shop_id=='144'||shop_id=='226'">
	<div class="order_null" v-if="message">暂无订单信息</div>
    <div class="order" v-for='item in order'>
    		<div class="order_sn">
    			<span style="font-size:12px">订单编号</span>：{{item.order_sn}}
    		</div>
    		<div class="order_information">
				<div>
				<div class="goodsimg">
					<span class="shop_img"><img :src='item.goods_img'></span>
					<div class="goodsinfo">
					 	<div class="goodsname">{{item.goodsname}}</div>
					 	<div class="goodsname">{{item.goods_name}}</div>
					 	<div class="timeprice">
					 		<div class="pay">
					 			<div class="pay_money">￥{{item.goods_amount}}</div>
					 			<div class="pay_sum">/ <span style="font-size:14px">数量</span>：{{item.goodsnum}}</div>
							</div>
							 <div class='send_type'>{{item.send_type=='1'?'自取':item.send_type=='3'?'送货上门':'快递'}}</div>
					 	</div>
					</div>
				</div>
				<div class="ordertime">下单时间：{{item.order_time}}</div>
				</div>
				<div class="customer" v-if="item.buyer!=''">
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
				<div class="postbutton" @click="tosendgoods(item.order_id,item.pay_money,item.buyer,item.address,item.latitude,item.longitude,item.phone)"> 发货</div>
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
    <el-dialog title="发货" :visible.sync="tosend" label-width="80px" style="width:100%;margin-top:100px" :modal-append-to-body='false'>
    	<div class="radios">
    		<el-radio v-model="send_type" label="1">快递</el-radio>
    		<el-radio v-model="send_type" label="2">达达</el-radio>
    		<el-radio v-model="send_type" label="3">自己配送</el-radio>
    	</div>
		  <el-form ref='sendinfo':model="sendinfo" v-if="send_type==1">
			<el-form-item label=" 选择快递 ">
				<el-select v-model="sendinfo.express" placeholder="请选择快递" @change="choose_express" style="width:40%">
					<!--<el-option label="顺丰" value="顺丰"></el-option>-->
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
			<el-form-item label="填写快递单号" class="courier">
				<el-input placeholder="请填写快递单号" v-model="sendinfo.number" class="order_number">
					<el-button slot="append" @click="sys_click()">扫一扫</el-button>
				</el-input>
			</el-form-item>
		
		</el-form>
		<div class="express" v-if="send_type==2">是否呼叫达达配送员取货配送？</div>
		<div class="express" v-if="send_type==3">是否确认自己进行配送？</div>
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
<div v-else>
	<div class="order_null" v-if="message">暂无订单信息</div>
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
				<div class="customer" v-if="item.buyer!=''">
					<div class="customer_info">收货人:{{item.buyer}}</div>
					<div class="customer_info">联系方式：{{item.phone}}111111111111</div>
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
				<div class="postbutton" @click="tosendgoods(item.order_id,item.pay_money,item.buyer,item.address,item.latitude,item.longitude,item.phone)"> 发货</div>
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
    <el-dialog title="发货" :visible.sync="tosend" label-width="80px" style="width:100%;margin-top:100px" :modal-append-to-body='false'>
    	<div class="radios">
    		<el-radio v-model="send_type" label="1">快递</el-radio>
    		<el-radio v-model="send_type" label="2">达达</el-radio>
    		<el-radio v-model="send_type" label="3">自己配送</el-radio>
    	</div>
		  <el-form ref='sendinfo':model="sendinfo" v-if="send_type==1">
			<el-form-item label=" 选择快递 ">
				<el-select v-model="sendinfo.express" placeholder="请选择快递" @change="choose_express"style="width:40%">
					<!--<el-option label="顺丰" value="顺丰"></el-option>-->
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
			<el-form-item label="填写快递单号" class="courier">
				<el-input placeholder="请填写快递单号" v-model="sendinfo.number" class="order_number">
					<el-button slot="append" @click="sys_click()">扫一扫</el-button>
				</el-input>
				<!--<div class="scan" @click="sys_click()">扫一扫</div>-->
			</el-form-item>
		
		</el-form>
		<div class="express" v-if="send_type==2">是否呼叫达达配送员取货配送？</div>
		<div class="express" v-if="send_type==3">是否确认自己进行配送？</div>
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
</div>
</template>

<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import {admin_wait,send,admin_waits,admin_all_wait,get_plat_info,dada_index,waitAdminGroup} from '@/utils/api'
import wx from 'weixin-js-sdk'
	export default{
		data(){
			return{
				send_type:'1',
				message:'',
				pagecount:1,
				currentPage:1,
				order:[],
				ordernone:'',
				shop_id:store.get('currentshopid'),
				tosend:false,
				expresselse:false,
				post_order_id:'',
				sendinfo:{
					express:store.get('express'),
					number:'823478264821'
				}			
			}
		},
		methods:{
		//打开扫一扫
      sys_click(){
     	get_plat_info({url:location.href}).then(res=>{
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.appid, // 必填，公众号的唯一标识
          timestamp: res.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.noncestr, // 必填，生成签名的随机串
          signature: res.data.signature,// 必填，签名
          jsApiList: ['checkJsApi','scanQRCode'] // 必填，需要使用的JS接口列表
        });

        wx.error(res=>{
          this.$message.error('出错了'+res.errMsg)
        })
        wx.ready(function(){
          wx.checkJsApi({
            jsApiList:['scanQRCode'],
          })
        })
        wx.scanQRCode({
          needResult:1,// 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType:["qrCode","barCode"],// 可以指定扫二维码还是一维码，默认二者都有
          success:function(res){// 当needResult 为 1 时，扫码返回的结果
            var result = res.resultStr.split(',')[1]
            window.location.href='https://www.linwushop.com/business/order/online/notpost?number='+result//因为我这边是扫描后有个链接，然后跳转到该页面
            //alert(result)
          }
        })
       })
      },
      choose_express(){
      	store.set('express',this.sendinfo.express)
      },
		handleCurrentChange(){
			this.admin_wait()
		},
		tosendgoods(id,pay_money,receiver,address,latitude,longitude,phone){
			store.set('order_id',id)
			this.post_order_id=id
			this.pay_money=pay_money
			this.receiver=receiver
			this.address=address
			this.latitude=latitude
			this.longitude=longitude
			this.phone=phone
			this.tosend=true
		},
		admin_wait(){
			waitAdminGroup({
				shop_id: store.get('currentshopid'),
				order_type:0,
				page:this.currentPage
			}).then(res=>{
				this.order=res.data.order
				this.currentPage=Number(res.data.page)
				this.pagecount=Number(res.data.totalpage)
			})
		},
		onSubmit(order_id){
			if (this.send_type==1) {
			var full = true
			if (this.sendinfo.express=='') {
				this.$message.error('请选择快递名称')
				full = false
			}else {
			 	full = true
			 }
			 if (full== true){
			send({order_id:order_id,shipping_name:this.sendinfo.express,shipping_code:this.sendinfo.number}).then((res)=>{
				if (res.error_code==1000) {
					this.admin_wait()
					this.$message.success('发货成功')
				}else{
					this.$message.error('发货失败！')
				}
			})
				this.tosend=false
			}
			}else if (this.send_type==2) {
				dada_index({
					shop_id:store.get('currentshopid'),
					//shop_no: 11047059,
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
					if (res.error_code==1000) {
						this.admin_wait()
					}else if(res.error_code==1001){
					this.$message.error('该订单已经发货！')
					}else if(res.error_code==1003){
					this.$message.error('运费余额不足，请充值余额！')
					}else{
						this.$message.error('发货失败！')
					}
				})
					this.tosend=false
			};			
		},
		},
		created(){
			this.admin_wait()
			if (this.$route.query.number) {
				this.tosend=true
				this.sendinfo.number=this.$route.query.number
				this.sendinfo.express=store.get('express')
				this.post_order_id=store.get('order_id')
			};
		},
		beforeRouteEnter (to, from, next) {
              var u = navigator.userAgent;
              var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
              // XXX: 修复iOS版微信HTML5 History兼容性问题
              if (isiOS && to.path !== location.pathname) {
              // 此处不可使用location.replace
              location.assign(to.fullPath)
              } else {
                next()
              }
        }
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
.radios
	height 30px
.express
	margin-bottom 10px
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
.order_number
	width 50%
.consignee
	color:#888
	font-size:14px
.scan_show
	display none
.send_type
	margin-top 10px
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
	.customer_info
		margin-bottom 7px
		width 300px

.order_information
	display flex
	justify-content space-between
	align-items center
.goodsimg{
	display:flex;
	width:380px;
	justify-content:flex-start;
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
.w-block
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
				margin-top: 10px;
		}
	}
	@media (max-width:900px){
		.order_number{
			width:90%;
		}
		.scan_show{
			display:inline;
		}
	}	
</style>