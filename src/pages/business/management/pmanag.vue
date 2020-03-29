<template>
	<div class="withdrawal">
		<div class="withdrawalList">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<!--待处理区块-->
				<el-tab-pane :label="'待处理 ('+this.tabel1.length+')'" name="first" class="tabpane">
					<div class='table'>
						<ul class="tabelheader thead">
							<li>
								<span class="table-li"></span>
								<span>流水号</span>
								<span>姓名</span>
								<span>等级</span>
								<span>手机号</span>
								<span>行业</span>
								<span>提现金额</span>
								<span>提现类型</span>
								<span class="table-li1">操作</span>
							</li>
						</ul>
						<ul class="tabelbody">
							<li v-for="(item,index) in tabel1" :key="index">
								<div class='w-content'>
									<div class='td arrow td1'>
										<i class="el-icon-arrow-right" @click="handlepayment"></i>
									</div>
									<div class='td'><span class="mobile">流水号:</span><span class='value_right'>{{item.Serial}}</span></div>
									<div class='td'><span class="mobile">姓名:</span><span class='value_right'>{{item.name}}</span></div>
									<div class='td'><span class="mobile">等级:</span><span class='value_right'>{{item.total}}</span></div>
									<div class='td'><span class="mobile">手机号:</span><span class='value_right'>{{item.phone}}</span></div>
									<div class='td'><span class="mobile">行业:</span><span class='value_right'>{{item.industry}}</span></div>
									<div class='td'><span class="mobile">提现金额:</span><span class='value_right tabe-price'>￥{{item.price}}</span></div>
									<div class='td'><span class="mobile">提现类型:</span><span class='value_right'>{{item.paytype}}</span></div>

									<div class="last_btn td table-li1">
										<div class="data_btn btn_success btn_su" @click="handlethrough(index)">已付款</div>
										<div class="data_btn btn_danger" @click="handleRefused(index)">拒绝付款</div>
									</div>
								</div>

								<div class="paymentInfo">
									<div>
										<span class="paymentInfo-px">{{item.paytype}}</span>
										<span>付款手机号：{{item.phone}}</span>
										<span>付款姓名：{{item.name}}</span>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div class="pages">
						<el-pagination layout="prev, pager, next" :total="50" @size-change="handleChange"></el-pagination>
					</div>
				</el-tab-pane>

				<!--已付款区块-->
				<el-tab-pane label="已付款" name="second" class="tabpane">
					<div class="block">
						<div class="block-box">
							<div class="demonstration">起止时间
								<el-date-picker v-model="value3" type="date" placeholder="选择开始日期"> </el-date-picker>
							</div>

							<div class="demonstration">
								<!-- <span class="demo-bk">至</span>
									<span class="demo-bn"></span> -->
								结束时间
								<el-date-picker v-model="value4" type="date" placeholder="选择结束日期">
								</el-date-picker>
								<el-button type="primary">查询</el-button>
							</div>
						</div>
						<div class="demonstration">
							<span class="table_info">总提现数据：{{tabel2.length}}条</span>
							<span>总金额：￥{{total}}</span>
						</div>
					</div>

					<div class="table">
						<ul class="tabelheader thead">
							<li>
								<span class="table-li"></span>
								<span class="table-li1">流水号</span>
								<span>姓名</span>
								<span class="table-li1">提现日期</span>
								<span>等级</span>
								<span class="table-li1">手机号</span>
								<span>行业</span>
								<span>提现金额</span>
								<span>提现类型</span>
								<span></span>
							</li>
						</ul>

						<ul class="tabelbody">
							<li v-for="(item,index) in tabel2" :key="index">
								<div class='w-content'>
									<div class='td arrow td1'>
										<i class="el-icon-arrow-right" @click="handlepayment"></i>
									</div>
									<div class='td table-li1'><span class="mobile">流水号:</span><span class='value_right'>{{item.Serial}}</span></div>
									<div class='td'><span class="mobile">姓名:</span><span class='value_right'>{{item.name}}</span></div>
									<div class='td table-li1'><span class="mobile">提现日期:</span><span class='value_right'>{{item.time | dataFilter(1)}}</span></div>
									<div class='td'><span class="mobile">等级:</span><span class='value_right'>{{item.total}}</span></div>
									<div class='td table-li1'><span class="mobile">手机号:</span><span class='value_right'>{{item.phone}}</span></div>
									<div class='td'><span class="mobile">行业:</span><span class='value_right'>{{item.industry}}</span></div>
									<div class='td'><span class="mobile">提现金额:</span><span class='value_right tabe-price'>￥{{item.price}}</span></div>
									<div class='td'><span class="mobile">提现类型:</span><span class='value_right'>{{item.paytype}}</span></div>
									<div><span @click="Lookmore" class="search_datum">查看个人资料</span></div>
								</div>
								<div class="paymentInfo">
									<span class="paymentInfo-px">{{item.paytype}}</span>
									<span>付款手机号：{{item.phone}}</span>
									<span>付款姓名：{{item.name}}</span>
								</div>
							</li>
						</ul>
					</div>
					<div class="pages">
						<el-pagination layout="prev, pager, next" :total="50" @size-change="handleChange"></el-pagination>
					</div>
				</el-tab-pane>

				<!--已拒绝区块-->
				<el-tab-pane label="已拒绝" name="third" class="tabpane">
					<div class="block">
						<div class="block-box">
							<div class="demonstration">起止时间
								<el-date-picker v-model="value3" type="date" placeholder="选择开始日期"> </el-date-picker>
							</div>

							<div class="demonstration">结束时间
								<el-date-picker v-model="value4" type="date" placeholder="选择结束日期">
								</el-date-picker>
								<el-button type="primary">查询</el-button>
							</div>
						</div>
						<div class="demonstration">
							<span class="table_info">总提现数据：{{tabel3.length}}条</span>
							<span>总金额：￥{{total2}}</span>
						</div>
					</div>
					<div class="table">
						<ul class="tabelheader thead">
							<li>
								<span class="table-li"></span>
								<span>流水号</span>
								<span>姓名</span>
								<span>提现日期</span>
								<span>等级</span>
								<span>手机号</span>
								<span>行业</span>
								<span>提现金额</span>
								<span>提现类型</span>
								<span>拒绝理由</span>
							</li>
						</ul>
						<ul class="tabelbody">
							<li v-for="(item,index) in tabel3" :key="index">
								<div class='w-content'>
									<div class='td arrow td1'>
										<i class="el-icon-arrow-right" @click="handlepayment"></i>
									</div>
									<div class='td '><span class="mobile">流水号:</span><span class='value_right'>{{item.Serial}}</span></div>
									<div class='td'><span class="mobile">姓名:</span><span class='value_right'>{{item.name}}</span></div>
									<div class='td '><span class="mobile">提现日期:</span><span class='value_right'>{{item.time | dataFilter(1)}}</span></div>
									<div class='td'><span class="mobile">等级:</span><span class='value_right'>{{item.total}}</span></div>
									<div class='td'><span class="mobile">手机号:</span><span class='value_right'>{{item.phone}}</span></div>
									<div class='td'><span class="mobile">行业:</span><span class='value_right'>{{item.industry}}</span></div>
									<div class='td'><span class="mobile">提现金额:</span><span class='value_right tabe-price'>￥{{item.price}}</span></div>
									<div class='td'><span class="mobile">提现类型:</span><span class='value_right'>{{item.paytype}}</span></div>
									<div class='td min-td'><span class="mobile">拒绝理由:</span><span class='value_right'>{{item.refuse}}</span></div>
									<!-- <td>{{item.Serial}}</td>
									<td>{{item.name}}</td>
									<td>{{item.time | dataFilter}}</td>
									<td>{{item.phone}}</td>
									<td>{{item.industry}}</td>
									<td>{{item.price}}</td>
									<td>{{item.paytype}}</td>
									<td>{{item.refuse}}</td> -->
								</div>
								<div class="paymentInfo">
									<span class="paymentInfo-px">{{item.paytype}}</span>
									<span>付款手机号：{{item.phone}}</span>
									<span>付款姓名：{{item.name}}</span>
								</div>
							</li>
						</ul>
					</div>
					<div class="pages">
						<el-pagination layout="prev, pager, next" :total="50" @size-change="handleChange"></el-pagination>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>

		<!--待审批人员拒绝-->
		<el-dialog title="填写拒绝理由" :visible.sync="DialogVisible" width="30%" center :modal-append-to-body='false'>
			<el-input class="txt" type="textarea" :autosize="{minRows:4}" placeholder="请输入拒绝理由" v-model="reason">
			</el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="cancelDialog">取 消</el-button>
				<el-button type="primary" @click="confirmDialog">提 交</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
import "../../../assets/css/distribution.css";
export default {
  data() {
    return {
      value1: "", //开始时间
      value2: "", //结束时间
      value3: "", //开始时间
      value4: "", //结束时间
      count: "5",
      index: "",
      DialogVisible: false, //拒绝理由弹出框
      reason: "",
      activeName: "first", //当前选择的导航
      tabel1: [
        {
          id: "1",
          Serial: "chengyu12345678",
          name: "西施",
          price: 100,
          total: "销售人",
          phone: "15221458186",
          industry: "互联网",
          paytype: "支付宝",
          refuse: "",
          time: ""
        },
        {
          id: "2",
          Serial: "luoyan12345678",
          name: "王昭君",
          price: 200,
          total: "销售人",
          phone: "15221458186",
          industry: "互联网",
          paytype: "微信",
          refuse: "",
          time: ""
        },
        {
          id: "3",
          Serial: "biyue12345678",
          name: "貂蝉",
          price: 300,
          total: "销售人",
          phone: "15221458186",
          industry: "互联网",
          paytype: "支付宝",
          refuse: "",
          time: ""
        },
        {
          id: "4",
          Serial: "xiuhua12345678",
          name: "杨玉环",
          price: 400,
          total: "销售人",
          phone: "15221458186",
          industry: "互联网",
          paytype: "银行卡",
          refuse: "",
          time: ""
        }
      ],
      tabel2: [],
      tabel3: []
    };
  },
  methods: {
    success_search() {
      if (this.value1 == "") {
        this.$message.error("请选择开始时间");
      } else if (this.value2 == "") {
        this.$message.error("请选择结束时间");
      } else {
        console.log(
          "开始时间",
          new Date(this.value1),
          "结束时间",
          new Date(this.value2).getTime()
        );
      }
    },
    handleChange(e) {
      console.log(e);
    },
    handleClick(tab, event) {},
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

    // handlepayment2(e){
    // 	var ev=e.target.parentNode.parentNode.firstElementChild.firstElementChild
    // 	if(ev.className=="el-icon-arrow-right"){
    // 		ev.className='el-icon-arrow-down'
    // 		e.target.parentNode.parentNode.lastElementChild.style.display='block'
    // 	}else{
    // 		ev.className="el-icon-arrow-right"
    // 		e.target.parentNode.parentNode.lastElementChild.style.display='none'
    // 	}
    // },
    Lookmore() {
      this.$router.push({ path: "/business/management/Lookmore" });
    },

    handlethrough(index) {
      //已付款
      var dat = new Date().getTime();
      this.tabel1[index].time = dat;
      this.tabel2.push(this.tabel1[index]);
      this.tabel1.splice(index, 1);
      console.log(this.tabel2);
    },

    handleRefused(index) {
      //拒绝付款
      this.DialogVisible = true;
      this.index = index;
    },

    cancelDialog() {
      //取消Dialog
      this.DialogVisible = false;
      this.reason = "";
    },
    confirmDialog() {
      //确认Dialog
      if (this.reason.trim() == "") {
        this.$message.error("请填写拒绝理由");
      } else {
        var dat = new Date().getTime();
        this.tabel1[this.index].time = dat;
        this.tabel1[this.index].refuse = this.reason;
        this.tabel3.push(this.tabel1[this.index]);
        this.tabel1.splice(this.index, 1);
        this.DialogVisible = false;
        this.reason = "";
        console.log(this.tabel3);
      }
    }
  },

  computed: {
    total() {
      //	console.log('计算属性执行了')
      var price = 0;
      for (var i = 0; i < this.tabel2.length; i++) {
        price += parseInt(this.tabel2[i].price);
      }
      return price;
    },
    total2() {
      //	console.log('计算属性执行了')
      var price = 0;
      for (var i = 0; i < this.tabel3.length; i++) {
        price += parseInt(this.tabel3[i].price);
      }
      return price;
    }
  },
  created() {}
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

.tabpane>table tbody tr {
	position: relative;
}

// .block{
// margin:15px 0;
// display:flex;
// justify-content:space-between;
// align-items:center
// }
.pages {
	text-align: right;
	margin-top: 20px;
}

.tabpane>table tr .table_info {
	margin-left: 25px;
	display: inline-block;
}

.search_datum {
	color: #1CC09E;
	cursor: pointer;
}

.tabe-price {
	color: #fb5652;
}

.btn_su {
	border: 1px solid #2589ff;
	color: #2589ff;
}

@media (max-width: 900px) {
	.pages {
		text-align: center;
		margin-top: 20px;
	}
}
</style>