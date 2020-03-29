<template>
	<div class="withdrawal">
		<div class="withdrawalList tabpane">
		
				<div class="block ">
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
							  <span>总金额：￥{{total}}0</span>
						 </div>
					 </div>
          
					<div class="table">
						<ul class="tabelheader thead">
							<li>
								<span class="table-li1">流水号</span>
								<span class="table-li1">交易类型</span>
								<span class="table-li1">日期</span>
								<span>收入</span>
								<span>支出</span>
								<span>余额</span>
							</li>
						</ul>

						<ul class="tabelbody">
							<li v-for="(item,index) in tabel1" :key="index">
								<div class='w-content'>
								<div class='td table-li1'><span class="mobile">流水号:</span><span class='value_right'>{{item.Serial}}</span></div>
								<div class='td table-li1'><span class="mobile">交易类型:</span><span class='value_right'>{{item.name}}</span></div>
								<div class='td table-li1'><span class="mobile">日期:</span><span class='value_right'>{{item.time}}</span></div>
	              <div class='td'><span class="mobile">收入:</span><span class='value_right tabe-prices'>￥{{item.total}}</span></div>
								<div class='td'><span class="mobile">支出:</span><span class='value_right tabe-price'>￥{{item.industry}}</span></div>
								<div class='td'><span class="mobile">余额:</span><span class='value_right '>￥{{item.price}}</span></div>
								</div>
							</li>
						</ul>
					</div>

				 <div class="pages">
              <el-pagination layout="prev, pager, next" :total="50" @size-change="handleChange"></el-pagination>
         </div>		
		</div>

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
          name: "销售-卖出小程序",
          price: 100,
          total: "200",
          phone: "15221458186",
          industry: "300",
          paytype: "支付宝",
          refuse: "",
          time: "2018.11.10"
        },
        {
          id: "2",
          Serial: "luoyan12345678",
          name: "支付宝-提现",
          price: 200,
          total: "300",
          phone: "15221458186",
          industry: "500",
          paytype: "微信",
          refuse: "",
          time: "2018.11.10"
        },
        {
          id: "3",
          Serial: "biyue12345678",
          name: "本人-卖出小程序",
          price: 300,
          total: "210",
          phone: "15221458186",
          industry: "420",
          paytype: "支付宝",
          refuse: "",
          time: "2018.11.10"
        },
        {
          id: "4",
          Serial: "xiuhua12345678",
          name: "银行卡-提现",
          price: 400,
          total: "230",
          phone: "15221458186",
          industry: "260",
          paytype: "银行卡",
          refuse: "",
          time: "2018.11.10"
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
  },

  computed: {
    // total() {
    //   //	console.log('计算属性执行了')
    //   var price = 0;
    //   for (var i = 0; i < this.tabel2.length; i++) {
    //     price += parseInt(this.tabel2[i].price);
    //   }
    //   return price;
    // },
    // total2() {
    //   //	console.log('计算属性执行了')
    //   var price = 0;
    //   for (var i = 0; i < this.tabel3.length; i++) {
    //     price += parseInt(this.tabel3[i].price);
    //   }
    //   return price;
    // }
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

.tabe-prices {
    color: #1CC09E;
} 



@media (max-width: 900px) {
    .pages {
        text-align: center;
        margin-top: 20px;
    }
    .withdrawalList{
      margin-bottom:50px
    }
}
</style>