<template>
	<div class="coupon_page">
		<div class="deletecoupon">
			<div class="title">线下核销优惠券</div>
			<div>
				<el-input class="code_input" id="user" v-model="code" @input="codeinput"  placeholder="请将光标移入输入框" />
			</div>
		</div>
		<div class="addcoupon">
			<div  class="addcoupon_button" @click = "showaddcoupon=true"><i class="el-icon-plus" style="margin-right:5px"></i>新增优惠券</div>
			<div class="to_delete" @click="show_use=false" v-if="show_use==true">编辑</div>
			<div class="to_delete" @click="show_use=true" v-if="show_use==false">编辑完成</div>
		</div>
		<div class="coupons_list">
			<div class="coupon_frame" v-for="item in coupons">
				<div class="coupon_info">
					<div class="background-image"><img src="@/assets/images/coupon.png"></div>
					<div class="money_info">
							<div class="price_money" v-if="item.cash_type==0">￥<span class="cash_money">{{item.cash_money}}</span></div>
							<div class="type" v-if="item.cash_type==0">抵用券</div>
							<div class="price" v-if="item.cash_type==1"><span class="cash_discount">{{item.cash_money}}</span>折</div>
							<div class="type" v-if="item.cash_type==1">折扣券</div>
					</div>
					<div class="condition_info">
						<div class="money_condition" v-if="item.cash_type==0">满{{item.pay_money}}减{{item.cash_money}}</div>
						<div class="money_condition" v-if="item.cash_type==1">满{{item.pay_money}}享{{item.cash_money}}折优惠</div>
						<div class="range">全场通用</div>
						<div class="time">{{item.start_time}} - {{item.end_time}}</div>
					</div>
					<div class="delete" v-if="show_use" @click="to_use(item.id)">应用</div>
					<div class="delete" v-if="show_use==false" @click="to_delete(item.id)">删除</div>
				</div>
			</div>
		</div>
		<el-dialog title="新增优惠券" :visible.sync="showaddcoupon" width="30%">
			<el-form :model="coupon">
			 	<el-form-item label="优惠券名称" :label-width="formLabelWidth">
			 		<el-input placeholder="请输入优惠券名称" v-model="coupon.cash_name" style="width:80%" size="medium"></el-input>
			 	</el-form-item>
				<el-form-item label="优惠券类型" :label-width="formLabelWidth">
					<el-select placeholder="请选择优惠券类型"v-model="coupon.cash_type" style="width:80%" size="medium">
						<el-option label ="抵用券" :value="0"></el-option>
						<el-option label ="折扣券" :value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="使用场景" :label-width="formLabelWidth">
					<el-select placeholder="请选择优惠券类型"v-model="coupon.cash_state" style="width:80%" size="medium">
						<el-option label ="店内领取" :value="0"></el-option>
						<el-option label ="转发领取" :value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="优惠券额度" :label-width="formLabelWidth">
					<el-input placeholder="请输入优惠金额" v-if="this.coupon.cash_type==0" style="width:80%" size="medium" v-model="coupon.cash_money"></el-input>
					<el-input placeholder="请输入优惠折扣" v-if="this.coupon.cash_type==1" style="width:80%" size="medium" v-model="coupon.cash_money"></el-input>
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
				<el-form-item label="优惠券数量" :label-width="formLabelWidth">
					<el-input placeholder="请输入优惠券数量" style="width:80%" size="medium" v-model="coupon.cash_num"></el-input>
				</el-form-item>
				<div class="question">
              			<button class="cancle" @click="showaddcoupon=false">取消</button>
              			<button class="comfirm" @click="add_coupon()">确认</button>
            	</div>
			</el-form>
		</el-dialog>
		<!-- 删除优惠券 -->
		<el-dialog title="删除商品" class="remove" :visible.sync="is_delete">
            <div class="message">删除该优惠券将会使其不再支持领取，但不影响已经领取的部分，确定删除优惠券？</div>
            <div class="question">
              <button class="cancle" @click="is_delete=false">取消</button>
              <button class="comfirm" @click="delete_coupon()">确认</button>
            </div>
        </el-dialog>
        <!-- 消除优惠券 -->
        <el-dialog title="核销优惠券" class="delete" :visible.sync="show_delete">
			<div class="message">确定核销该优惠券？</div>
            <div class="question">
              <button type="button" autofocus class="cancle" @click="show_delete=false">取消</button>
              <el-button id="comfirm" class="comfirm" @click="use_coupon()">确认</el-button>
            </div>
        </el-dialog>
	</div>
</template>
<script type="text/javascript">
import {add_cash,cash_list,del_cash,update_cash,remove_cash} from '@/utils/api'
import * as store from '@/utils/sdk/store'
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
					cash_state:0,
				}
			}
		},
		methods:{
			show_coupons(){
				cash_list({shop_id:store.get('currentshopid')}).then((res)=>{
					if (res.error_code==1000&&res.data.length!=0) {
						this.coupons=res.data
					};
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
				add_cash({
					cash_name:this.coupon.cash_name,
					cash_num:this.coupon.cash_num,
					cash_type:this.coupon.cash_type,
					cash_money:this.coupon.cash_money,
					start_time:this.coupon.start_time,
					end_time:this.coupon.end_time,
					pay_money:this.coupon.pay_money,
					shop_id:store.get('currentshopid'),
					cash_state:this.coupon.cash_state
				}).then((res)=>{
					if (res.error_code==1000) {
						this.$message.success('添加成功')
						this.showaddcoupon=false
						this.show_coupons()
					}else{
						this.$message.error('添加失败')
					}
				})
			}
			}
		},
		created(){
			this.show_coupons()
		},
		mounted(){
     		let inputelement=document.getElementById('user')
     		inputelement.focus()
   		}
	}
</script>
<style lang="stylus" scoped>
.coupon_page
	background #f9f9f9
.deletecoupon
	background-color white
	padding 10px 20px
	.title
		color #484848
		padding-bottom 10px
.addcoupon
	background-color white
	padding 5px 100px 5px 20px
	height 40px
	display flex
	justify-content space-between
	.addcoupon_button
		padding 5px 
		cursor pointer
		color #409EFF
	.to_delete
		padding 5px
		cursor pointer
		color #409EFF
.coupons_list
	background-color white
	margin-top 20px
	padding 20px
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
		font-size 12px
		margin-top 3px
.delete 
	position absolute
	top 30px
	left 260px
	color white
	cursor pointer
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