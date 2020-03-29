<template>
	<div class="order_data">
   <div class="shop_title">
      <div class="shop_info">
        <div class="shop_image"><img :src="image"></div>
        <div class="shop_name">{{name}}</div>
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
    <div class="order_statu">
      <div class="title">订单状态</div>
      <div class="post_receive">
        <div class="post">
            <div class="statu_info">
              <div class="statu_text"><div class="text">待发货</div><div class="num">{{notpost_num}}</div></div>
              <div class="statu_img"><img src="@/assets/images/post.png"></div>
            </div>
        </div>
        <div class="receive">
           <div class="statu_info">
              <div class="statu_text"><div class="text">待收货</div><div class="num">{{notreceive_num}}</div></div>
              <div class="statu_img"><img src="@/assets/images/receive.png"></div>
            </div>
        </div>
      </div>
      <div class="finish_refund">
        <div class="post">
          <div class="statu_info">
              <div class="statu_text"><div class="text">已完成</div><div class="num">{{finish_num}}</div></div>
              <div class="statu_img"><img src="@/assets/images/finish.png"></div>
            </div>
        </div>
        <div class="receive">
          <div class="statu_info">
              <div class="statu_text"><div class="text">退款</div><div class="num">{{refund_num}}</div></div>
              <div class="statu_img"><img src="@/assets/images/refund.png"></div>
            </div>
        </div>
      </div>
    </div>
    <div class="money_num">
      <div class="order_num">
        <div class="title">订单数</div>
        <div class="num_info">
          <div class="text_num">
            <div class="text">今日订单</div>
            <div class="num">{{day_ordernum}}</div>
          </div>
          <div class="text_num">
            <div class="text">7天订单数</div>
            <div class="num">{{week_ordernum}}</div>
          </div>
          <div class="text_num">
            <div class="text">总订单数</div>
            <div class="num">{{count_ordernum}}</div>
          </div>
        </div>
      </div>
      
      <div class="money_info">
        <div class="title">订单数</div>
        <div class="text_num">
          <div class="text">今日交易额</div>
          <div class="num">￥ {{day_moneynum}}</div>
          <div class="blank"></div>
        </div>
        <div class="text_num">
          <div class="text">七天交易额</div>
          <div class="num">￥ {{week_moneynum}}</div>
          <div class="blank"></div>
        </div>
        <div class="text_num">
          <div class="text">总交易额</div>
          <div class="num">￥ {{day_moneynum}}</div>
          <div class="get_money" @click="get_money"> <img src="@/assets/images/get_money.png">提现</div>
        </div>
      </div>
    </div>
  </div>
	
    </div>
</template>

<script type="text/javascript">
	import {day_order,count_order,day_money,mon_money,money,order_num,week_order,new_people,week_people,show_forum,admin_shop_info,sumpeople} from '@/utils/api'
	import * as store from '@/utils/sdk/store'
	export default{
		data(){
			return{
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
			}
		},

		methods:{
       new_people(){
      new_people({shop_id:store.get('currentshopid')}).then((res)=>{
        this.newin = res.data.new_people
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
        this.name=res.data.name
        this.image=res.data.logo
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
			get_money(){
				this.$router.push('/home/shopinfo')
			},
			day_order(){
                day_order({shop_id:store.get('currentshopid')}).then((res)=>{
                  if (res.error_code==1002) {
                    this.$message.error(res.msg)
                  };
                  if (res.error_code==1003) {
                    this.$message.error(res.msg)
                  };
                  if (res.error_code==1000) {
                    this.day_ordernum = res.data[0].day_order
                  };
                })
              },
        week_order(){
          week_order({shop_id:store.get('currentshopid')}).then((res)=>{
                  if (res.error_code==1002) {
                    this.$message.error(res.msg)
                  };
                  if (res.error_code==1003) {
                    this.$message.error(res.msg)
                  };
                  if (res.error_code==1000) {
                    this.week_ordernum = res.data[0].day_order
                  };
                })
        },
              count_order(){
                count_order({shop_id:store.get('currentshopid')}).then((res)=>{
                   if (res.error_code==1002) {
                    this.$message.error(res.msg)
                  };
                  if (res.error_code==1003) {
                    this.$message.error(res.msg)
                  };
                  if (res.error_code==1000) {
                    this.count_ordernum = res.data[0].count_order
                  };
                })
              },
              day_money(){
                day_money({shop_id:store.get('currentshopid')}).then((res)=>{
                   if (res.error_code==1002) {
                    this.$message.error(res.msg)
                  };
                  if (res.error_code==1000) {
                    this.day_moneynum = res.data[0].day_money
                  };
              })
            },
            mon_money(){
              mon_money({shop_id:store.get('currentshopid')}).then((res)=>{
                if (res.error_code==1002) {
                    this.$message.error(res.msg)
                  };
                  if (res.error_code==1000) {
                    this.week_moneynum = res.data[0].mon_money
                  };
              })
            },
            money(){
            	money({shop_id:store.get('currentshopid')}).then((res)=>{
            		if (res.error_code==1002) {
            			this.$message.error(res.msg)
            		};
            		if(res.error_code==1000){
            			this.total_money = res.data
            		}
            	})
            },
            },
            created(){
              this.day_order()
              this.count_order()
              this.day_money()
              this.mon_money()
              this.order_num()
              this.new_people()
              this.week_people()
              this.sumpeople()
              this.shop_info()
            }
         }
</script>

<style lang='stylus' scoped>
.data_form
  display flex
  justify-content space-between
  .order_statu
    width 49%
    background-color white
    .title
      background-color #A2BAC9
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
        background-color #A2BAC9
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
        background-color #A2BAC9
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
.shop_info
  padding-top 20px
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
</style>