<template>
	<div class="order_data">
		<div class="lee-title1">增长数据</div>
   <div class="shop_title">
      <div class="shop_info_onsale">
      	<div class="shop_info">
        <div class="shop_image"><img :src="image"></div>
        <div class="shop_name">{{name}}</div>
        <div v-if="is_pay==1" class="pay_status">已付费</div>
		    <div v-if="is_pay!=1" class="pay_status">正在试用你请店铺，试用期至{{valid_time}}</div>
		</div>
		<div>
			<span v-if="onsale==false">已打烊</span>
			<span v-if="onsale">营业中</span>
			<el-switch v-model="onsale" @change="shop_status" :disabled="is_pay==2" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
		</div>
      </div>
        <el-row style="overflow:hidden">
            <el-col :span="8" align="center" style="padding-bottom:10px">
            <h2>{{newin}}</h2>
            <p>新增人数</p>
            </el-col>
            <el-col :span="8" align="center" style="padding-bottom:10px">
            <h2>{{weekin}}</h2>
            <p>本周增长人数</p>
            </el-col>
            <el-col :span="8" align="center" style="padding-bottom:10px">
            <h2>{{totalpeople}}</h2>
            <p>总用户数</p>
            </el-col>

        </el-row>
  </div>
  <div class="data_form">
		<div class="lee-title1">订单状态</div>
    <div class="order_statu">
      <div class="title">订单状态</div>
      <div class="post_receive">
        <div class="post" @click="jump_post">
            <div class="statu_info">
              <div class="statu_text"><div class="text">待发货</div><div class="num">{{notpost_num}}</div></div>
              <div class="statu_img"><img src="@/assets/images/post.png"></div>
            </div>
        </div>
        <div class="receive" @click="jump_receive">
           <div class="statu_info">
              <div class="statu_text"><div class="text">待收货</div><div class="num">{{notreceive_num}}</div></div>
              <div class="statu_img"><img src="@/assets/images/receive.png"></div>
            </div>
        </div>
      </div>
      <div class="finish_refund">
        <div class="post" @click="jump_finish">
          <div class="statu_info">
              <div class="statu_text"><div class="text">已完成</div><div class="num">{{finish_num}}</div></div>
              <div class="statu_img"><img src="@/assets/images/finish.png"></div>
            </div>
        </div>
        <div class="receive" @click="jump_refund">
          <div class="statu_info">
              <div class="statu_text"><div class="text">售后</div><div class="num">{{refund_num}}</div></div>
              <div class="statu_img"><img src="@/assets/images/refund.png"></div>
            </div>
        </div>
      </div>
    </div>
    <div class="money_num">
			<div class="lee-title1">订单数</div>
      <div class="order_num">
        <div class="title">订单数</div>
        <div class="num_info">
          <div class="text_num">
            <div class="num">{{day_ordernum}}</div>
						<div class="text">今日订单</div>
          </div>
          <div class="text_num">
            <div class="num">{{week_ordernum}}</div>
						<div class="text">7天订单数</div>
          </div>
          <div class="text_num">
            <div class="num">{{count_ordernum}}</div>
						<div class="text">总订单数</div>

          </div>
        </div>
      </div>
      <div class="lee-title1">交易额</div>
      <div class="money_info">
        <div class="title">交易额</div>
        <div class="text_num">
					<div class="text">今日交易额</div>
          <div class="num">￥ {{day_moneynum}}</div>
					
        </div>
        <div class="text_num">
					<div class="text">七天交易额</div>
          <div class="num">￥ {{week_moneynum}}</div>
        </div>
        <div class="text_num">
					<div class="text">总交易额</div>
          <div class="num">￥ {{total_money}}</div>
          <!-- <div class="get_money" @click="get_money"> <img src="@/assets/images/get_money.png">提现</div> -->
        </div>
        <div class="time_search" @click="time_search">分时段查询</div>
      </div>
    </div>
  </div>
		<!--付款弹窗-->
		<el-dialog title="付费页面" :visible.sync = "show_pay_dialog" :modal-append-to-body="false">
			<div>1、您将获得你请店铺一年的使用权，包括自动出单、拼团裂变、新人优惠、拉新优惠等功能，助力您的营业增长！</div>
			<div>2、将有运营人员与您取得联系，得到“你请”专属运营方案支持，该方案已为数百位商家带来收入增长！</div>
      <div>3、您可以在网站上浏览店铺的使用方法，包括视频和文字讲解，如有不理解的地方，可以联系您的推荐人或者官方客服。</div>
      <div>4、店铺销售额扣除0.6%的支付提成之后，将在您店铺对应的店主的余额中，您可以随时进行提现，提现后立即到达店主的微信余额。</div>
			<div>5、您将支付￥1988作为店铺的一年的使用权，如需发票请联系官方客服！</div>
			<div class="question">
              <button class="cancle" @click="show_pay_dialog=false">取消</button>
              <button class="comfirm" @click="handleRecharge()">确认</button>
            </div>
		</el-dialog>
    <!-- 分时段查询交易额弹窗 -->
    <el-dialog title="分时段查询" :visible.sync="show_time_search" :modal-append-to-body="false">
            <div class="time_content">
            <el-date-picker
              v-model="value1"
              type="daterange"
              size="medium"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:60%">
            </el-date-picker>
            <div @click="time_search_button" class="search_button">
              搜索
            </div>
            </div>
            <div class="money_show">
              <span>交易金额：{{moneySearch}}元</span>
            </div>
    </el-dialog>
    </div>
</template>

<script type="text/javascript">
	import {day_order,count_order,day_money,mon_money,money,order_num,week_order,new_people,week_people,get_order,show_forum,admin_shop_info,sumpeople,get_plat_info,get_money,recharge,pay_status,onsale_status,time_trade} from '@/utils/api'
	import * as store from '@/utils/sdk/store'
  //import 'https://res.wx.qq.com/open/js/jweixin-1.0.0.js'
	export default{
		data(){
		return{
        value1:'',
        start_time:'',
        end_time:'',
        show_time_search:false,
		    onsale:true,
		    valid_time:"00年00月00日",
		    show_pay_dialog:false,
		    is_pay:1,
        num:'99',
		    day_ordernum:0,
        week_ordernum:0,
        count_ordernum:0,
        day_moneynum:0,
        week_moneynum:0,
        total_money:0,
        refund_num:0,
        notpost_num:0,
        finish_num:0,
        notreceive_num:0,
        image:'',
        name:'',
        newin:1,
        weekin:1,
        totalpeople:1,
        moneySearch:0,
			}
		},
		methods:{
    //开启分时段查询窗口
    time_search(){
      this.show_time_search = true
    },
    //分时段查询
    time_search_button(){
      console.log(this.value1[0],'44444')
      console.log(Number(this.value1[0]),'55555555')
      console.log(Number(this.value1[1]),'55555555')
      time_trade({
        shop_id:store.get('currentshopid'),
        date_start:this.value1[0],
        date_end:this.value1[1]
      }).then(res=>{
        this.moneySearch = res.data.money
      })
    },
	  //店铺开闭状态更改
	  shop_status(e){
	  	onsale_status({
	  		shop_id:store.get('currentshopid'),
	  		status:e?1:0
	  	}).then(res=>{
	  		if (res.error_code==1000) {
	  			this.$message.success('修改店铺营业状态成功！')
	  			this.onsale = e
	  		};
      })
	  },
	  to_pay(){
				this.show_pay_dialog = true
	  },
	  handleRecharge(){//充值
				recharge({
					money:1988,
					shop_id:store.get('currentshopid')
				}).then(res=>{
					window.open(res)
					//window.location.href=res
					//this.get_dada()
				})
				this.show_pay_dialog = false
					
	  },
      jump_post(){
          //this.$router.push('/business/order/online/notpost')
      },
      jump_receive(){
          //this.$router.push('/business/order/online/notreceive')
      },
      jump_finish(){
          //this.$router.push('/business/order/online/finish')
      },
      jump_refund(){
          //this.$router.push('/business/order/online/refund')
      },
       new_people(){
      new_people({shop_id:store.get('currentshopid')}).then((res)=>{
        this.newin = res.data.new_people
      })
    },
    get_pay_status(){
    	pay_status({
    		shop_id:store.get('currentshopid')
    	}).then(res=>{
    		if (res.data.status==1) {
    			this.is_pay=1
    			this.valid_time =res.data.valid_time
    		}else if (res.data.status==0) {
    			this.is_pay = 0
    			this.valid_time = res.data.valid_time
    		}else if(res.data.status==2){
          this.is_pay = 2
          this.valid_time = res.data.valid_time
        }
    	})
    },
    week_people(){
      week_people({shop_id:store.get('currentshopid')}).then((res)=>{
        this.weekin = res.data.weeek_people
      })
    },
    sumpeople(){
      sumpeople({shop_id:store.get('currentshopid')}).then((res)=>{
        this.totalpeople = res.data.sum
      })
      },
      shop_info(){
      admin_shop_info({shop_id:store.get('currentshopid')}).then((res)=>{
        store.set('appId',res.data.appid)
        store.set('secret',res.data.secret)
        store.set('color',res.data.color)
        this.name=res.data.name
        // this.image=res.data.logo
        this.onsale = res.data.onsale_status==1?true:false
        var str= res.data.logo;
        var str1 = str.replace("https","http")
        this.image =str1


        store.set('send_type',res.data.send_type)
      })
      },
      order_num(){
        order_num({shop_id:store.get('currentshopid')}).then((res)=>{
          this.notpost_num=res.data.wait[0].order_num
          this.notreceive_num=res.data.shipped[0].order_num
          this.finish_num=res.data.finish[0].order_num
          this.refund_num=res.data.refund[0].order_num
        })
      },
			// get_money(){
			// 	this.$router.push('/home/shopinfo')
			// },
            get_order(){
              get_order({shop_id:store.get('currentshopid')}).then(res=>{
                if(res.error_code=='1000'){
                    this.count_ordernum=res.data.count
                    this.week_ordernum=res.data.week_order
                    this.day_ordernum=res.data.day_order
                }
              })
            },
            get_moneys(){//请求交易额
              get_money({shop_id:store.get('currentshopid')}).then(res=>{
                  if(res.error_code=='1000'){
                     this.week_moneynum=res.data.before7day_money//七天交易额
                     this.day_moneynum = res.data.day_money//当天交易额
                     this.total_money=res.data.account_money//总数交易额
                  }
              })              
            },
            },
            created(){
              this.get_pay_status()
              this.new_people()
              this.sumpeople()
              this.shop_info()
              this.get_moneys()
              this.get_order()
              this.order_num()
            },
            
}
</script>

<style lang='stylus' scoped>
.el-row
  border-top 1px solid #bbb
  border-bottom 1px solid #bbb
  padding 10px 0px
.data_form
  display flex
  justify-content space-between
  .order_statu
    width 49%
    background-color white
    .title
      background-color #293643
      padding 0 40px
      color white
      line-height 40px
    .post_receive
      display flex
      .post
        width 50%
        padding 60px 0
        border-bottom 1px solid #e1e1e1
        border-right 1px solid #e1e1e1
      .receive
        width 50%
        padding 60px 0
        border-bottom 1px solid #e1e1e1
    .finish_refund
      display flex
      .post
        width 50%
        padding 60px 0
        border-right 1px solid #e1e1e1
      .receive
        width 50%
        padding 60px 0
  .money_num
    width 49%
    .order_num
      background-color white
      .title
        background-color #293643
        padding 0 40px
        color white
        line-height 40px
      .num_info
        display flex
        justify-content space-between
        padding 50px 50px
        .text_num
          text-align center
          line-height 40px
    .money_info 
      background-color white
      margin-top 20px
      .title
        background-color #293643
        padding 0 40px
        color white
        line-height 40px
      .text_num
        display flex
        padding 0 50px
        line-height 54px
        display flex
        justify-content space-between
        .blank
          width 80px
        .num
          width 100px
        .text
          width 150px
        .get_money
          cursor pointer
          margin-top 15px
          width 80px
          display flex
          background-color #3D8CBF
          padding 0 16px
          height 24px
          border-radius 5px
          line-height 24px
          color white
          font-size 12px
          img
            width 12px
            height 10px
            margin-right 10px
            margin-top 6px
.statu_info
  display flex
  justify-content center
  .statu_text
    text-align center
    line-height 40px
  .statu_img
    margin-left 30px
    img
      width 50px
      height 48px
      margin-top 16px
.title
  padding 0 40px 10px
  color #323232
  width 100%
  border-bottom 1px solid #e1e1e1
.el-col 
    padding 10px 0px
.el-pagination
  text-align right
.block
  background-color white
  padding 20px 30px
  font-size 18px
.shop_title
  margin-bottom 20px
  background-color white
.shop_info_onsale
	display flex
	justify-content space-between
	padding 20px 20px 20px 0
	align-items center
.shop_info
  display flex
  justify flex-start
  .shop_image
    margin-left 50px
    img
      width 50px
      height 50px
      border-radius 50%
  .shop_name
    margin-left 20px
    line-height 50px
    font-size 18px
    font-weight bold
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
.pay_status
	line-height 50px
	height 50px
	margin-left 20px
	font-size 15px
.to_pay
	margin-left 20px
	color #409EFF
	cursor pointer
.order_data
	background-color #f9f9f9
h2
	color #409eff
	padding-bottom 10px
.data_top
	margin-bottom 20px
	background-color white
	padding 20px 0

.data_bottom
	font-size 15px
	background-color white
	padding 20px 0
    display flex
.to_get_money
	cursor pointer
	color #409eff
.time_content
  display flex
.time_search
  color #809EFF
  text-align right
  padding-right 30px
  font-size 12px
  padding-bottom 10px
  cursor pointer
.search_button
  cursor pointer
  color #809EFF
  line-height 36px
  margin-left 30px
.money_show
  padding 20px 0
</style>

<style lang='stylus' scoped >
@media(max-width:900px) {
	.el-row{
    border:none
  }
	.el-col{
		font-size: 14px;
		color: #555555;
	}
	
	h2{
		padding-bottom: 0;
	}
	
	.shop_info{
		display: none;
	}
	
	.div .body .el-main .breadcrumb-container{
		margin-bottom: 0;
	}
	.data_form .order_statu .title,
	.data_form .money_num .order_num .title,
	.data_form .money_num .money_info .title{
		display: none;
	}
	.shop_title{
		margin-bottom: 0;
	}
	
	.data_form .money_num .money_info{
		margin-top: 0;
	}
	
	.data_form .order_statu .post_receive .post,
	.data_form .order_statu .post_receive .receive,
	.data_form .order_statu .finish_refund .post,
	.data_form .order_statu .finish_refund .receive{
		padding: 20px 0;
		font-size: 14px;
		color: #555555;
	}
	.statu_info .statu_text{
		line-height: 25px;
	}
	.statu_info .statu_img img{
		margin-top: 0;
	}
	.data_form .money_num .order_num .num_info{
		padding: 10px 0;
		display: block;
	}
	.data_form .money_num .order_num .num_info .text_num{
		display: inline-block;
		width: 32%;
		font-size: 14px;
		color: #555555;
	}
	
	.data_form .money_num .order_num .num_info .text_num .num{
		color: #409eff;
		font-weight: bold;
	}
	
	.data_form .money_num .money_info .text_num .text{
		font-size: 14px;
		line-height: 36px;
	}
	.data_form .money_num .money_info .text_num{
		line-height: 36px;
	}
	}
	
	.el-aside{
			
		}
		
		.el-popper[x-placement^=bottom]{
		position: absolute;
	    top: 30px;
	    right: 5px;
	    transform-origin: center top 0px;
	    z-index: 2001;
		}
		
		.lee-title1 {
			display: none;
		}
		
		@media(max-width:900px ) {
			
			.nav-buttom{
					width: 25px;
					height: 20px;
					position: absolute;	
					top: 7px;
					left: 20px;
					z-index: 3;
					cursor: pointer;
				}
				
				.div .body .el-aside .active{
					display: block;
					position: fixed;
				}
				
				.nav-buttom:before,
				.nav-buttom:after{
					content: "";
					position: absolute;
					width: 100%;
					position: absolute;
					left: 0;
					height: 1px;
					background: #FFFFFF;
					transition: all 1s;
					-webkit-transition: all 1s;
					-moz-transition: all 1s;
					-ms-transition: all 1s;
				}
			
				.nav-buttom:before{
					top: 0;
				}
				
				.nav-buttom:after{
					bottom:0;
				}
				
				.nav-buttom span{
					position: absolute;
					display: block;
					width: 100%;
					height: 1px;
					margin-top: 9.5px;
					background: #FFFFFF;
					z-index: 2;
				}
				
				.nav-buttoms span{
					display: none;
				}
				
				.nav-buttoms:before{
					transform: rotateZ(45deg);
					top: 9.5px;
				}
				
				.nav-buttoms:after{
					transform: rotateZ(-45deg);
					bottom: 9.5px;
				}
			
			.div .body .el-aside .menu_second .title{
				text-align: center;
			}
			.div .body .el-aside .menu_second .title .title_name{
				width: 100%;
				color: #FFFFFF;
			}
			
			.div .body .el-aside{
				position: static;
				float: left;
				width: 0 !important;
			}
			
			.div .body .el-aside .menu_second .title{
				background: none;
			}
			
			.div .body .el-aside .menu_second{
				position: fixed;
				width: 100%;
				height: auto;
				z-index: 2;
				background: #ff8661;
				color: #FFFFFF;
				font-weight: bold;
			}
			
			.div .body .el-aside .menu_second .el-menu{
				width: 100%;
				text-align: center;
				margin-top: 0 !important;
				position: fixed;
				bottom: 0;
				background: #ff8661;
				color: #FFFFFF;
			}
			
			.div .body .el-aside .menu_second .el-menu .el-menu-item{
				background: #ff8661 !important;
				color: #FFFFFF !important;
			}
			
			.div .body .el-aside .menu_second .el-menu .el-menu-item{
				display: inline-block;
				width: 100px;
				text-align: center;
				height: 35px;
				line-height: 35px;
			}
			
			.menu_first{
				position: absolute;
				top: 36px;
				display: none;
				z-index: 3;
			}
			
			.div .body .el-aside .avatar .avatar_img{
				margin: 0;
				width: auto;
				background: #e1e1e1;
				border-radius: 0;
			}
			
			.div .body .el-aside .el-menu{
				margin-top: 0;
			}
			
			.div .body .el-aside .el-dropdown{
				position: absolute;
				top: 0 !important;
				left: 80%;
				background: none;
				z-index: 3;
				color: #409eff;
				line-height: 36px;
				height: 36px;
			}
			
			.div .body .el-main{
				padding: 0;
				width: 100%;
			}
			
			.div .body .el-main .content-wrapper{
				width: 100%;
				box-sizing: border-box;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				margin-left: 0;
				margin-bottom: 30px;
			}
			
			.shop_info .shop_image{
				margin-left: 35px !important;
			}
			
			.data_form{
				display: block !important;
			}
			
			.order_statu{
				width: 100%;
			}
			
			.data_form .money_num{
				width: 100% !important;
			}
			
			.data_form .order_statu,.goodsimg{
				width: 100% !important;
			}
	.div .body .el-aside .el-dropdown div{
		display: none;
	}
	
	
	.lee-title1 {
				display: block;
				color: #1a1a1a;
				border-left: 3px solid #ff8661;
				height: 18px;
				line-height: 18px;
				text-align: left;
				margin: 10px 20px;
				padding-left: 8px;
				font-size: 14px;
				position: relative;
			}
	
			.lee-title1:before {
				content: "";
				position: absolute;
				height: 18px;
				width: 1px;
				background: #ff8661;
				left: 2px;
				top: 0;
			}
			
		}
</style>