<template>
	<div class="withdrawal">
		<div class="withdrawalList">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<!--待处理区块-->
				<el-tab-pane :label="'待处理 ('+this.accept.tabel.length+')'" name="first" class="tabpane">
					<div class='table'>
						<ul class="tabelheader thead">
							<li>
								<span class="table-li"></span>
								<span class="min_width2">流水号</span>
								<span>姓名</span>
								<span>手机号</span>
								<span>提现金额</span>
								<span>提现类型</span>
								<span class="table-li1">操作</span>
							</li>
						</ul>
						<ul class="tabelbody">
							<li v-for="(item,index) in accept.tabel" :key="index">
								<div class='w-content'>
									<div class='td arrow td1'>
										<i class="el-icon-arrow-right" @click="handlepayment"></i>
									</div>
									<div class='td min_width2'><span class="mobile">流水号:</span><span class='value_right'>{{item.cash_id}}</span></div>
									<div class='td'><span class="mobile">姓名:</span><span class='value_right'>{{item.sale_name}}</span></div>
									<div class='td'><span class="mobile">手机号:</span><span class='value_right'>{{item.phone}}</span></div>
									<div class='td'><span class="mobile">提现金额:</span><span class='value_right'>{{item.sale_money}}</span></div>
									<div class='td'><span class="mobile">提现类型:</span><span class='value_right'>{{item.cash_name}}</span></div>
									<div class="last_btn td table-li1">
										<div class="data_btn btn_success" @click="handlethrough(item.cash_type,item.id)">已付款</div>
										<div v-if="item.cash_name!='微信'" class="data_btn btn_danger" @click="handleRefused(item.cash_type,item.id)">拒绝付款</div>
									</div>
								</div>
								<div class="paymentInfo" v-if="item.cash_name=='微信'">
									<span class="paymentInfo-px">支付方式：{{item.cash_name}}</span>
								</div>
								<div class="paymentInfo" v-if="item.cash_name=='支付宝'">
									<span class="paymentInfo-px">支付方式：{{item.cash_name}}</span>
									<span>付款手机号：{{item.phone}}</span>
									<span>付款姓名：{{item.zfb_username}}</span>
								</div>
								<div class="paymentInfo" v-if="item.cash_name=='银行卡'">
									<span class="paymentInfo-px">支付方式：{{item.cash_name}}</span>
									<span>银行卡号：{{item.yhk_username}}</span>
									<span>付款银行：{{item.yhk_bank}}</span>
									<span>付款姓名：{{item.yhk_name}}</span>
								</div>
							</li>
						</ul>
					</div>
					<div class="empty" v-if="accept.tabel.length==0">该列表为空</div>
					<div class="pages" v-if="accept.tabel.length!='0'">
							<el-pagination layout="prev, pager, next, jumper" :pager-count="5" :page-count='accept.pageCount'
							:page-size="accept.page" @current-change="handleChangeTab1" :current-page.sync="accept.pno"></el-pagination>
					</div>
				</el-tab-pane>
				<!--已付款区块-->
				<el-tab-pane label="已付款" name="second" class="tabpane">
					<div class="block">
						<div class="block-box">
							<div class="demonstration">起止时间
								<el-date-picker v-model="payment.startTime" type="date" placeholder="选择开始日期" @change="success_search"> </el-date-picker>
							</div>

							<div class="demonstration">结束时间
								<el-date-picker v-model="payment.endTime" type="date" placeholder="选择结束日期" @change="success_search">
								</el-date-picker>
								<el-button type="primary" @click="success_search">查询</el-button>
							</div>
						</div>
						<div class="demonstration">
							<span class="table_info">总提现数据：{{payment.tabel.length}}</span>
							<span>总金额：{{payment.cashMoneyCount}}</span>
						</div>
					</div>
					<div class="table">
						<ul class="tabelheader thead">
							<li style="padding-right:30px">
								<span class="table-li"></span>
								<span class="min_width2">流水号</span>
								<span>姓名</span>
								<span class="min_width max_width">提现日期</span>
								<span class="min_width max_width">手机号</span>
								<span>提现金额</span>
								<span>提现类型</span>
								<span></span>
							</li>
						</ul>
						<ul class="tabelbody">
							<li v-for="(item,index) in payment.tabel" :key="index">
								<div class='w-content'>
									<div class='td arrow td1'>
										<i class="el-icon-arrow-right" style="font-weight:bold" @click="handlepayment"></i>
									</div>
									<div class='td min_width2 '><span class="mobile">流水号:</span><span class='value_right'>{{item.cash_id}}</span></div>
									<div class='td'><span class="mobile">姓名:</span><span class='value_right'>{{item.sale_name}}</span></div>
									<div class='td min_width max_width'><span class="mobile">提现日期:</span><span class='value_right'>{{item.create_time*1000 | dataFilter(1)}}</span></div>
									<div class='td min_width max_width'><span class="mobile">手机号:</span><span class='value_right'>{{item.phone}}</span></div>
									<div class='td'><span class="mobile">提现金额:</span><span class='value_right'>{{item.sale_money}}</span></div>
									<div class='td'><span class="mobile">提现类型:</span><span class='value_right'>{{item.cash_name}}</span></div>
									<div><span @click="handlepayment2" class="search_datum">查看个人资料</span></div>
								</div>
									<div class="paymentInfo" v-if="item.cash_name=='微信'">
									<span class="paymentInfo-px">支付方式：{{item.cash_name}}</span>
								</div>
								<div class="paymentInfo" v-if="item.cash_name=='支付宝'">
									<span class="paymentInfo-px">支付方式：{{item.cash_name}}</span>
									<span>付款手机号：{{item.phone}}</span>
									<span>付款姓名：{{item.zfb_username}}</span>
								</div>
								<div class="paymentInfo" v-if="item.cash_name=='银行卡'">
									<span class="paymentInfo-px">支付方式：{{item.cash_name}}</span>
									<span>银行卡号：{{item.yhk_name}}</span>
									<span>付款银行：{{item.yhk_bank}}</span>
									<span>付款姓名：{{item.yhk_username}}</span>
								</div>
							</li>
						</ul>
					</div>
					<div class="empty" v-if="payment.tabel.length==0">该列表为空</div>
					<div class="pages" v-if="payment.tabel.length!='0'">
						<el-pagination layout="prev, pager, next, jumper" :pager-count="5" :page-count='payment.pageCount' :page-size="payment.page" @current-change="handleChangeTab2" :current-page.sync="payment.pno"></el-pagination>
					</div>
				</el-tab-pane>
				<!--已拒绝区块-->
				<el-tab-pane label="已拒绝" name="third" class="tabpane">
					<div class="block">
						<div class="block-box">
							<div class="demonstration">起止时间
								<el-date-picker v-model="notPayment.startTime" type="date" @change="search_date" placeholder="选择开始日期"> </el-date-picker>
							</div>

							<div class="demonstration">结束时间
								<el-date-picker v-model="notPayment.endTime" type="date" @change="search_date" placeholder="选择结束日期">
								</el-date-picker>
								<el-button type="primary">查询</el-button>
							</div>
						</div>
						<div class="demonstration">
							<span class="table_info">总提现数据：{{notPayment.tabel.length}}</span>
							<span>总金额：{{notPayment.cashMoneyCount}}</span>
						</div>
					</div>

					<div class='table'>
						<ul class="tabelheader thead">
							<li>
								<span class="table-li"></span>
								<span class="min_width2">流水号</span>
								<span>姓名</span>
								<span class="min_width max_width" >提现日期</span>
								<span class="table-li1">手机号</span>
								<span>提现金额</span>
								<span>提现类型</span>
								<span class="min_width max_width">拒绝理由</span>
							</li>
						</ul>
						<ul class="tabelbody">
							<li v-for="(item,index) in notPayment.tabel" :key="index">
								<div class='w-content'>
									<div class='td arrow td1'>
										<i class="el-icon-arrow-right" style="font-weight:bold" @click="handlepayment"></i>
									</div>
									<div class='td min_width2'><span class="mobile">流水号:</span><span class='value_right'>{{item.cash_id}}</span></div>
									<div class='td'><span class="mobile">姓名:</span><span class='value_right'>{{item.sale_name}}</span></div>
									<div class='td min_width max_width'><span class="mobile">提现日期:</span><span class='value_right'>{{item.create_time*1000 | dataFilter(1)}}</span></div>
									<div class='td table-li1'><span class="mobile">手机号:</span><span class='value_right'>{{item.phone}}</span></div>
									<div class='td'><span class="mobile">提现金额:</span><span class='value_right'>{{item.sale_money}}</span></div>
									<div class='td'><span class="mobile">提现类型:</span><span class='value_right'>{{item.cash_name}}</span></div>
									<div class='td min_width max_width'><span class="mobile">拒绝理由:</span><span class='value_right'>{{item.extra}}</span></div>
								</div>
								
									<div class="paymentInfo" v-if="item.cash_name=='微信'">
									<span class="paymentInfo-px">支付方式：{{item.cash_name}}</span>
								</div>
								<div class="paymentInfo" v-if="item.cash_name=='支付宝'">
									<span class="paymentInfo-px">支付方式：{{item.cash_name}}</span>
									<span>付款手机号：{{item.phone}}</span>
									<span>付款姓名：{{item.zfb_username}}</span>
								</div>
								<div class="paymentInfo" v-if="item.cash_name=='银行卡'">
									<span class="paymentInfo-px">支付方式：{{item.cash_name}}</span>
									<span>银行卡号：{{item.yhk_name}}</span>
									<span>付款银行：{{item.yhk_bank}}</span>
									<span>付款姓名：{{item.yhk_username}}</span>
								</div>
							</li>
						</ul>
					</div>
					<div class="empty" v-if="notPayment.tabel.length==0">该列表为空</div>
					<div class="pages" v-if="notPayment.tabel.length!='0'">
						<el-pagination layout="prev, pager, next, jumper" :pager-count="5" :page-count='notPayment.pageCount'
						 :page-size="notPayment.page" @current-change="handleChangeTab3" :current-page.sync="notPayment.pno"></el-pagination>						
					</div>
				</el-tab-pane>			
			</el-tabs>
		</div>
		<!--待审批人员拒绝-->
		<el-dialog title="填写拒绝理由" :visible.sync="DialogVisible" width="30%" center :modal-append-to-body='false'>
			<el-input class="txt" type="textarea" :autosize="{minRows:4}" placeholder="请输入拒绝理由" v-model="extra">
			</el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="cancelDialog">取 消</el-button>
				<el-button type="primary" @click="confirmDialog">提 交</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
import "@/assets/css/distribution.css";
import {up_groupCashStatus,groupCashAdminDetail} from "@/utils/api";
import * as store from "@/utils/sdk/store";
export default {
  data() {
    return {
      cash_type: "",
			id:'',
      DialogVisible: false, //拒绝理由弹出框
      extra: "",
      activeName: "first", //当前选择的导航
			is_second:true,
			is_third:true,
      accept: {
        //待受理
        tabel: [],
       	pno: 1,
        page:10,
        pageCount:3
      },
      payment: {
        //已付款
        tabel: [],
				startTime:'',
				endTime:'',
        pno: 1,
        page:10,
        pageCount:3,
				cashMoneyCount:''
      },
      notPayment:{
        //拒绝付款
        tabel: [],
				startTime:'',
				endTime:'',
       	pno: 1,
        page:10,
        pageCount:3,
				cashMoneyCount:''
      },
      tabel3: []
    };
  },
  methods: {
    //请求待处理页面
    updateTable1(limit, page, startTime, endTime) {
      groupCashAdminDetail({
        shop_id: store.get("currentshopid"),
        limit: limit,
        page: page,
				cash_status:'3',
        startTime: startTime,
        endTime: endTime
      }).then(res => {
        if (res.status == "1") {
          this.accept.tabel = res.cashInfo;
          this.accept.pageCount = res.totalPage;
          this.accept.pno =Number(res.page)
        }
      });
    },
		//请求已付款页面
		updateTable2(limit, page, startTime, endTime){
				groupCashAdminDetail({
						shop_id: store.get("currentshopid"),
						limit: limit,
						page: page,
						cash_status:'1',
						startTime: startTime,
						endTime: endTime
				}).then((res)=>{
					console.log(res)
						if (res.status == "1"){
								this.payment.tabel = res.cashInfo
          			this.payment.pageCount = res.totalPage
          			this.payment.pno = Number(res.page)
								this.payment.cashMoneyCount=res.cashMoneyCount
						}
				})
		},
		//拒绝付款页面
		updateTable3(limit, page, startTime, endTime){
				groupCashAdminDetail({
						shop_id: store.get("currentshopid"),
						limit: limit,
						page: page,
						cash_status:'2',
						startTime: startTime,
						endTime: endTime
				}).then((res)=>{
					console.log(res)
						if (res.status == "1") {
								this.notPayment.tabel= res.cashInfo
          			this.notPayment.pageCount = res.totalPage
          			this.notPayment.pno=Number(res.page)
								this.notPayment.cashMoneyCount=res.cashMoneyCount
						}
				})
		},
	dateTime(value,type){
        var data = new Date(value);		
				var year = data.getFullYear();
        var month = data.getMonth() + 1;
        var day = data.getDate();
        month < 10 ? (month = "0" + month) : month;
        day < 10 ? (day = "0" + day) : day;
				if(type=='1'){
					return year+"-"+month+"-"+day
				}else{
					return year+"年"+month+"月"+day+'日'
				}		
	},
    success_search() {
      if (this.payment.startTime == "") {
        	this.$message.error("请选择开始时间");
      } else if (this.payment.endTime == "") {
        	this.$message.error("请选择结束时间");
      } else if (this.payment.startTime.getTime() > this.payment.endTime.getTime()) {
        	this.$message.error("开始时间不能大于结束时间");
      } else {
        	var stime=this.dateTime(this.payment.startTime,'1')
					var etime=this.dateTime(this.payment.endTime,'1')
					this.updateTable2(10, this.payment.pno, stime, etime);
      }
    },
		search_date(){
				if (this.notPayment.startTime == "") {
						this.$message.error("请选择开始时间");
				} else if (this.notPayment.endTime == "") {
						this.$message.error("请选择结束时间");
				} else if (this.notPayment.startTime.getTime() > this.notPayment.endTime.getTime()) {
						this.$message.error("开始时间不能大于结束时间");
				} else {
						var stime=this.dateTime(this.notPayment.startTime,'1')
						var etime=this.dateTime(this.notPayment.endTime,'1')
						this.updateTable3(10,this.notPayment.pno, stime, etime);
				}
		},
		handleChangeTab1(e){
			this.accept.pno=e
			this.updateTable1(10, this.accept.pno)
		},
    handleChangeTab2(e) {
			this.payment.pno=e
      this.updateTable2(10, this.payment.pno);
    },
    handleChangeTab3(e){
			this.notPayment.pno=e
			this.updateTable3(10, this.notPayment.pno);
		},		
    handleClick(tab, event) {
			if(tab.paneName=='second'){
				if(this.is_second){
						//请求已付款页面
					this.updateTable2(10,this.notPayment.pno);
					this.is_second=false
				}					
			}else if(tab.paneName=='third'){
				if(this.is_third){
						//请求已拒绝页面
						this.updateTable3(10,this.notPayment.pno);
						this.is_third=false
				}
					
			}
		},
    handlepayment(e) {
      if (e.target.className == "el-icon-arrow-right") {
        e.target.className = "el-icon-arrow-down";
        e.target.parentNode.parentNode.parentNode.lastElementChild.style.display =
          "block";
      } else {
        e.target.className = "el-icon-arrow-right";
        e.target.parentNode.parentNode.parentNode.lastElementChild.style.display =
          "none";
      }
    },
    handlepayment2(e) {
      var ev =
        e.target.parentNode.parentNode.firstElementChild.firstElementChild;
      if (ev.className == "el-icon-arrow-right") {
        ev.className = "el-icon-arrow-down";
        e.target.parentNode.parentNode.parentNode.lastElementChild.style.display =
          "block";
      } else {
        ev.className = "el-icon-arrow-right";
        e.target.parentNode.parentNode.parentNode.lastElementChild.style.display =
          "none";
      }
    },
    handlethrough(cash_type,id) {
      //已付款
      up_groupCashStatus({
					shop_id: store.get("currentshopid"),
					isAllow:'allow',
					cash_type:cash_type,
					id:id
			}).then((res)=>{
					if(res.status == "1"){
						this.$message.success('付款成功')
						this.updateTable1(10,this.accept.pno)
						this.updateTable2(10, this.notPayment.pno)
					}
			})
     
    },
    handleRefused(cash_type,id) {
      //拒绝付款
      this.DialogVisible = true;
      this.cash_type = cash_type;
			this.id=id;
    },
    cancelDialog() {
      //取消Dialog
      this.DialogVisible = false;
      this.extra = "";
    },
    confirmDialog() {
      //确认Dialog
      if (this.extra.trim() == ""){
        this.$message.error("请填写拒绝理由");
      }else{
					up_groupCashStatus({
							shop_id: store.get("currentshopid"),
							isAllow:'fefuse',
							cash_type:this.cash_type,
							id:this.id,
							extra:this.extra
					}).then((res)=>{
							if(res.status == "1") {
								this.$message.success('拒绝成功')
								this.updateTable1(10,this.accept.pno)
								this.updateTable3(10, this.notPayment.pno)
							}							
					})
      }
			this.DialogVisible = false;
			this.extra=''
			this.cash_type=''
			this.id=''
    }
  },
  computed: {
    total() {
      var price = 0;
      for (var i = 0; i < this.payment.tabel.length; i++) {
        price += parseInt(this.payment.tabel[i].sale_money);
      }
      return price;
    },
    total2() {
      var price = 0;
      for (var i = 0; i < this.notPayment.tabel.length; i++) {
        price += parseInt(this.notPayment.tabel[i].sale_money);
      }
      return price;
    }
  },
  created() {
    //请求待处理页面
    this.updateTable1(10,this.accept.pno)
  }
};
</script>
<style lang="stylus" scoped>
.withdrawal {
	background-color: #f9f9f9;
	padding: 20px;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: flex-start;
}

.withdrawalList {
	width: 100%;
}

.tabpane>table tr .table_info {
	margin-right: 25px;
	display: inline-block;
}

.search_datum {
	color: #1CC09E;
	cursor: pointer;
}

.max_width{
	max-width:110px !important;
	width:110px;
}
@media (max-width: 1200px){
  .table .thead li, .w-content{
		padding-right: 0; 
	}

	.tabpane .table .min_width2{
		max-width: 120px;
	}	
}
@media (max-width: 900px) {
  .tabpane .table .min_width2{
		max-width:inherit;
	}
.withdrawal .table .value_right, .table .value_right{
		width:65%
}
.withdrawal .tabpane .table .mobile, .tabpane .table li .mobile{
		width:30%
}
	.max_width{
     max-width:310px !important;
    	width:310px;
   }

	 .tabpane table .min_width, .tabpane .table .min_width{
		 line-height:1;
	 }
}
</style>
<style>
   @media (max-width: 1200px){
  
	.demonstration .el-date-editor.el-input, .el-date-editor.el-input__inner{
     width: 200px;
	}
}
</style>