<template>
	<div class="coupon_page">
		<div class="lee-title1 w-scan"><span>线下核销优惠券11</span> <span @click="sys_click()" class="scan">扫一扫</span></div>
		<!-- <div class="deletecoupon">
			<div class="title">线下核销优惠券</div>
			<div>
				<el-input class="code_input" id="user" v-model="code" @input="codeinput"  placeholder="请将光标移入输入框" />
			</div>
		</div> -->
		<div class="addcoupon">
			<div  class="addcoupon_button" @click = "showaddcoupon=true"><i class="el-icon-plus" style="margin-right:5px"></i>新增优惠券</div>
			<div class="to_delete" @click="show_use=false" v-if="show_use==true">编 辑</div>
			<div class="to_delete" @click="show_use=true" v-if="show_use==false">编辑完成</div>
		</div>
		<div class="lee-title1">优惠券列表</div>
		<div class="coupons_list">
			<div class="coupon_frame" v-for="item in coupons">
				<div class="coupon_info">
					<div class="background-image"><img src="@/assets/images/coupon.png"></div>
					<div class="money_info">
							<div class="price_money" v-if="item.cash_type==0">￥<span class="cash_money">{{item.cash_money}}</span></div>
							<div class="type" v-if="item.cash_type==0">抵用券</div>
							<!-- <div class="price" v-if="item.cash_type==1"><span class="cash_discount">{{item.cash_money}}</span>折</div>
							<div class="type" v-if="item.cash_type==1">折扣券</div> -->
					</div>
					<div class="condition_info">
						<div class="money_condition" v-if="item.cash_type==0">满{{item.pay_money}}减{{item.cash_money}}</div>
						<!-- <div class="money_condition" v-if="item.cash_type==1">满{{item.pay_money}}享{{item.cash_money}}折优惠</div> -->
						<div class="range" v-if="item.cash_state==2">新人领取</div>
						<div class="range" v-if="item.cash_state==0">转发领取</div>
						<div class="range" v-if="item.cash_state==3">下单领取</div>
						<div class="time">{{item.start_time}} - {{item.end_time}}</div>
					</div>
					<a class="delete" v-if="show_use" :href="item.cashQrcode">二 维 码</a>
					<div class="delete" v-if="show_use==false" @click="to_delete(item.id)">下架</div>
				</div>
			</div>
		</div>
		<el-dialog title="新增优惠券" :visible.sync="showaddcoupon"  :modal-append-to-body='false'>
			<el-form :model="coupon">
			 	<el-form-item label="优惠券名称" :label-width="formLabelWidth">
			 		<el-input placeholder="请输入优惠券名称" v-model="coupon.cash_name" style="width:80%" size="medium"></el-input>
			 	</el-form-item>
				<!-- <el-form-item label="优惠券类型" :label-width="formLabelWidth">
					<el-select placeholder="请选择优惠券类型"v-model="coupon.cash_type" style="width:80%" size="medium">
						<el-option label ="抵用券" :value="0"></el-option>
						<el-option label ="折扣券" :value="1"></el-option>
					</el-select>
				</el-form-item>
 -->				<el-form-item label="使用场景" :label-width="formLabelWidth">
					<el-select placeholder="请选择优惠券类型"v-model="coupon.cash_state" style="width:80%" size="medium">
						 <el-option label ="新人领取" :value="2"></el-option> 
						 <el-option label ="转发领取" :value="0"></el-option>
						<!-- <el-option label ="下单领取" :value="3"></el-option> -->
					</el-select>
				</el-form-item>
				<el-form-item label="优惠券额度" :label-width="formLabelWidth">
					<el-input placeholder="请输入优惠金额" v-if="this.coupon.cash_type==0" style="width:80%" size="medium" v-model="coupon.cash_money"></el-input>
					<!-- <el-input placeholder="请输入优惠折扣" v-if="this.coupon.cash_type==1" style="width:80%" size="medium" v-model="coupon.cash_money"></el-input> -->
				</el-form-item>
				<el-form-item label="满足消费金额" :label-width="formLabelWidth">
					<el-input placeholder="请输入使用最低消费金额" size="medium" style="width:80%" v-model="coupon.pay_money"></el-input>
				</el-form-item>
				<el-form-item label="开始使用时间" :label-width="formLabelWidth">
					<el-date-picker
      					v-model="coupon.start_time"
      					style="width:80%"
      					size="medium"
      					type="datetime"
      					placeholder="选择开始时间">
    				</el-date-picker>
    			</el-form-item>
    			<el-form-item label="结束使用时间" :label-width="formLabelWidth">
    				<el-date-picker
      					v-model="coupon.end_time"
      					style="width:80%"
      					size="medium"
      					type="datetime"
      					placeholder="选择结束时间">
   					</el-date-picker>
				</el-form-item>
				<el-form-item label="每人限领张数" :label-width="formLabelWidth">
					<el-input placeholder="请输入每人限领张数" style="width:80%" size="medium" v-model="coupon.get_num"></el-input>
				</el-form-item>
				<el-form-item label="优惠券总数量" :label-width="formLabelWidth">
					<el-input placeholder="请输入优惠券数量" style="width:80%" size="medium" v-model="coupon.cash_num"></el-input>
				</el-form-item>
			</el-form>
			<div class="question">
              			<button class="cancle" @click="showaddcoupon=false">取消</button>
              			<button class="comfirm" @click="add_coupon()">确认</button>
            	</div>
		</el-dialog>
		<!-- 删除优惠券 -->
		<el-dialog title="删除商品" class="remove" :visible.sync="is_delete" :modal-append-to-body='false'>
            <div class="message">删除该优惠券将会使其不再支持领取，但不影响已经领取的部分，确定删除优惠券？</div>
            <div class="question">
              <button class="cancle" @click="is_delete=false">取消</button>
              <button class="comfirm" @click="delete_coupon()">确认</button>
            </div>
        </el-dialog>
        <!-- 消除优惠券 -->
        <el-dialog title="核销优惠券" class="w-delete" :visible.sync="show_delete" :modal-append-to-body='false'>
			<div class="message">确定核销该优惠券？</div>
            <div class="question">
              <button type="button" autofocus class="cancle" @click="show_delete=false">取消</button>
              <el-button id="comfirm" class="comfirm" @click="use_coupon()">确认</el-button>
            </div>
        </el-dialog>
	</div>
</template>
<script type="text/javascript">
import {add_cash,cash_list,del_cash,update_cash,remove_cash,get_plat_info} from '@/utils/api'
import * as store from '@/utils/sdk/store'
import wx from 'weixin-js-sdk'
export default{
		data(){
			return{
				showaddcoupon:false,
				show_use:true,
				show_delete:false,
				coupons:[],
				is_delete:false,
				cash_id:'',
				code:'',
				formLabelWidth:'120px',
				coupon:{
					cash_name:'',
					cash_type:0,
					cash_money:'',
					cash_state:2,
					get_num:1,
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
          needResult:1,
          scanType:["qrCode","barCode"],
          success:function(res){
            var result = res.resultStr.split(',')[1]
            window.location.href='https://www.linwushop.com/unclewei/marketing/coupon?code='+result
          }
        })
       })
      },
			show_coupons(){
				cash_list({shop_id:store.get('currentshopid')}).then((res)=>{
					if (res.error_code==1000&&res.data.length!=0) {
						res.data.forEach(function(item){
						item.cashQrcode = 'https://www.linwushop.com/api/cash_qrcode?shop_id='+store.get('currentshopid')+'&cash_id='+item.id+'&cash_money='+item.cash_money+'&pay_money='+item.pay_money+'&cash_name='+item.cash_name
						})
						this.coupons=res.data
					}
				})
			},
			codeinput(value){
				if (value.length==16) {
					this.show_delete=true
					this.code=value
					//var buttonelement=document.getElementById('comfirm')
      				//buttonelement.focus()
				};
				//console.log(value.length)
			},
			use_coupon(){
				remove_cash({rand_num:this.code}).then(res=>{
					if (res.error_code==1000) {
						this.$message.success('使用成功')
					}else if (res.error_code==1001) {
						this.$message.error('使用失败')
					};
					this.show_delete=false
				})
			},
			to_delete(id){
				this.is_delete=true
				this.cash_id=id
			},
			delete_coupon(){
				del_cash({cash_id:this.cash_id}).then((res)=>{
					if (res.error_code==1000) {
						this.is_delete=false
						this.$message.success('删除成功')
						this.show_coupons()
					}else{
						this.$message.error('删除失败')
					}
				})
			},
			add_coupon(){
				var flag=true
				if (this.coupon.cash_name=='') {
					this.$message.error('请输入优惠券名称')
				}else if (this.coupon.cash_money==''&&this.coupon.cash_type==0) {
					this.$message.error('请输入优惠金额')
				}else if (this.coupon.cash_money==''&&this.coupon.cash_type==1) {
					this.$message.error('请输入优惠折扣')
				}else if (this.start_time=='') {
					this.$message.error('请选择开始时间')
				}else if (this.end_time=='') {
					this.$message.error('请选择结束时间')
				}else if (this.cash_num=='') {
					this.$message.error('请输入优惠券数量')
				}else{
					flag=false
				}
				if (flag==false) {
				if (this.coupon.cash_state==2) {
					this.coupon.cash_name='新人专享'
				};
				add_cash({
					cash_name:this.coupon.cash_name,
					cash_num:this.coupon.cash_num,
					cash_type:this.coupon.cash_type,
					cash_money:this.coupon.cash_money,
					start_time:this.coupon.start_time,
					end_time:this.coupon.end_time,
					pay_money:this.coupon.pay_money,
					get_num:this.coupon.get_num,
					shop_id:store.get('currentshopid'),
					cash_state:this.coupon.cash_state
				}).then((res)=>{
					if (res.error_code==1000) {
						this.$message.success('添加成功')
						this.showaddcoupon=false
						this.show_coupons()
					}else if (res.error_code==1004) {
						this.$message.error('该使用场景下已有优惠券，请先下架原有优惠券')
					}else{
						this.$message.error('添加失败')
					}
				})
			}
			}
		},
		created(){
			this.show_coupons()
			if (this.$route.query.code) {
				this.show_delete=true
				this.code=this.$route.query.code
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
.coupon_page
	padding-top:30px;
	padding-left:20px;
	font-size:15px;
.deletecoupon
	background-color white
	padding 10px 20px
	.title
		color #484848
		padding-bottom 10px
.addcoupon
	background-color #293643
	padding 5px 50px 5px 20px
	height 50px
	display flex
	justify-content flex-end
	align-items center
	.addcoupon_button
		padding 5px 10px
		margin-right 10px
		cursor pointer
		background-color #409eff
		color #fff
	.to_delete
		padding 5px 10px
		cursor pointer
		color #fff
		background-color #1cc09E
.coupons_list
	background-color #f9f9f9
	margin-top 20px
	padding 20px
	overflow hidden
.coupon_frame
	width 50%
	float left
	display flex
	justify-content center
	margin-bottom 20px
.background-image
	img
		width 300px
		height 80px
.coupon_info
	position relative
.money_info
	position absolute
	color #FF6B34
	top 10px
	left 20px
	text-align center
	.price_money
		margin-top 3px
	.price
		font-size 15px
	.cash_discount
		font-size 30px
	.cash_money
		font-size 25px	
.condition_info
	position absolute
	color #323232
	top 10px
	left 100px
	.money_condition
		color #FF6B34
	.range
		font-size 12px
		margin-top 3px
	.time
		font-size 10px
		margin-top 3px
.delete 
	position absolute
	top 14px
	left 265px
	color white
	cursor pointer
	writing-mode tb
	-webkit-writing-mode tb
	-ms-writing-mode tb
.remove
	width 50%
	margin-left 25%
.question
	margin-top 20px
	display flex 
	justify-content space-between
	padding 0 15%
.cancle
	color #C0C4CC
	background-color white
	cursor pointer
	padding 5px 20px 
	border-radius 3px
	border 1px solid #C0C4CC
.comfirm
	color white
	background-color #409EFF
	cursor pointer
	padding 5px 20px
	border-radius 3px
	border 1px solid #409EFF
</style>
<style lang="stylus" scoped>
	.scan{
		margin-left:30px;
		border:1px solid #609EFF;
		color:#609EFF;
		border-radius:5px;
		padding:2px 8px;
		cursor:pointer;
	}
	.remove{
		margin-left: 0;
		width: 100%;
	}
	.el-dialog{
		width: 500px;
	}
	@media(max-width:900px ) {
		.coupon_page{
			padding:0 20px;
			padding-top:20px;
			font-size:14px;
		}
		.el-dialog{
			width: 500px;
		}
		.scan{
			display:inline-block;
			height:24px;
			line-height:20px;
		}
		.coupon_page .w-scan{
			item-align:center;
			display:flex;
			justify-content:space-between;
			padding-right:15px;
		}
		.coupon_frame{
			display: inline-block;
			width: 50%;
		}
		.el-dialog{
			width: 90%;
		}
		.el-dialog__body{
			padding: 10px;
		}
		.deletecoupon .title{
			display: none;
		}
		.el-input__inner{
			width: 100%;
			height: 30px;
			line-height: 30px;
			background-color: #efeff4;
    line-height: 26px;
    border-radius: 3px;
    font-size: 14px;
    padding-left: 15px;
		border: none;
		color: #555555;
		}
		.deletecoupon{
			padding: 15px;
		}
		
		.addcoupon{
			padding: 15px;
			height: auto;
			background-color:#f9f9f9;
			}
			.addcoupon .addcoupon_button{
				width: 45%;
				display: block;
				text-align: center;
				color: #FFFFFF;
				background:#ff8661 ;
				}
				.addcoupon .to_delete{
					background: #409eff;
					color: #FFFFFF;
					width: 45%;
					text-align: center;
				}
				.coupons_list{
					margin-top: 0;
				
				}
				.coupon_frame{
					float: none;
					text-align: left;
				}
				
				.background-image img{
					width: 350px;
				}
				.delete{
					left: 305px;
				}
				.money_info .cash_money,
				.money_info .cash_discount{
					font-size: 18px;
				}
				
				.money_info{
					font-size: 16px;
				}
				.el-dialog__header{
					text-align: center;
				}
				.el-dialog__body .message{
					font-size: 14px;
					color: #555555;
				}
				.div .body .el-main .content-wrapper
				{
					padding-bottom: 0;
				}
				.deletecoupon{
					    border-bottom: 2px solid #FF8661;
				}
				.condition_info .money_condition{
					overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;	
width: 160px;
				}
				.money_info .price{
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;	
					width: 60px;
					text-align: left;
				}
				.money_info{
					display: inline-block;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;	
					width: 60px;
					
				}
				.el-form-item__label{
					display: block;
					float: none;
					text-align: left;
					height: 24px;
					line-height: 24px;
				}
				.el-form-item__content{
					float: none;
					width: 100%;
					margin-left: 0 !important;
				}
				.el-input--medium,.el-select{
					width: 100% !important;
					position: relative;
				}
	}
	@media(max-width:700px ) {
		.el-dialog{
			width: 90%;
		}
		.coupon_frame{
			width: 100%;
		}
		
		.background-image img{
			width: 320px;
		}
		
		.delete{
			left: 280px;
		}
		
	}
</style>