<template>
  <div class="">
    <!-- 交易明细 -->
    <div class="sales_title">
      <a><img src="@/assets/images/back.png" alt="" @click="back"></a>
      <span>王小明细</span>
    </div>

    <div class="member_page">
      <div class="memberList">
        <el-tabs v-model="activeName">
          <!-- 交易明细 -->
          <el-tab-pane label="交易明细" name="first" class="tabpane">
            <table style="width:100%" class="table">
              <thead class="tabelheader">
                <tr>
                  <th>流水号</th>
                  <th>交易类型</th>
                  <th>日期</th>
                  <th>收入</th>
                  <th>支出</th>
                  <th>余额</th>
                </tr>
              </thead>
              <tbody class="tabelbody">
                <tr v-for="(item,index) in tableData" :key='index'>
                  <td><span class="mobile">流水号:</span><span class='value_right'>{{item.name}}</span></td>
                  <td><span class="mobile">交易类型:</span><span class='value_right'>{{item.cash}}</span></td>
                  <td><span class="mobile">日期:</span><span class='value_right'>{{item.total}}</span></td>
                  <td><span class="mobile">收入:</span><span class='value_right tabe-prices'>￥{{item.count}}</span></td>
                  <td><span class="mobile">支出:</span><span class='value_right tabe-price'>￥{{item.phone}}</span></td>
                  <td><span class="mobile">余额:</span><span class='value_right'>￥{{item.industry}}</span></td>
                  <!-- <td>{{item.name}}</td>
									<td>{{item.cash}}</td>
									<td>{{item.total}}</td>
									<td>{{item.count}}</td>
									<td>{{item.phone}}</td>
									<td>{{item.industry}}</td> -->
                </tr>
                <div class="empty" v-if="tableData.length==0">该列表为空</div>
              </tbody>
            </table>
            <div class="pages">
              <el-pagination  layout="prev, pager, next" :total="50" @size-change="handleChange"></el-pagination>
            </div>
          </el-tab-pane>

          <!-- 二级销售名单 -->
          <el-tab-pane label="二级销售名单" name="second" class="tabpane">
            <table style="width:100%" class="table">
              <thead class="tabelheader">
                <tr>
                  <th>姓名</th>
                  <th>可提现金额</th>
                  <th>等级</th>
                  <th>类型</th>
                  <th>手机号</th>
                  <th>行业</th>
                  <th>描述</th>
                  <th></th>
                </tr>
              </thead>
              <tbody class="tabelbody">
                <tr v-for="(item,index) in tableData2" :key='index'>
                  <td><span class="mobile">姓名:</span><span class='value_right'>{{item.name}}</span></td>
                  <td><span class="mobile">可提现金额:</span><span class='value_right tabe-price'>￥{{item.cash}}</span></td>
                  <td><span class="mobile">等级:</span><span class='value_right'>{{item.total}}</span></td>
                  <td><span class="mobile">类型:</span><span class='value_right'>{{item.count}}</span></td>
                  <td><span class="mobile">手机号:</span><span class='value_right'>{{item.phone}}</span></td>
                  <td><span class="mobile">行业:</span><span class='value_right'>{{item.industry}}</span></td>
                  <td class='min_width'><span class="mobile">描述:</span><span class='value_right' :title="item.describe">{{item.describe}}</span></td>
                  <td><a class="personal">查看个人资料</a></td>
                </tr>
                <div class="empty" v-if="tableData2.length==0">该列表为空</div>
              </tbody>
            </table>
            <div class="pages">
              <el-pagination  layout="prev, pager, next" :total="50" @size-change="handleChange"></el-pagination>
            </div>
          </el-tab-pane>

          <!-- 三级销售名单 -->
          <el-tab-pane label="三级销售名单" name="third" class="tabpane">
            <table style="width:100%" class="table">
              <thead class="tabelheader">
                <tr>
                  <th>姓名</th>
                  <th>可提现金额</th>
                  <th>等级</th>
                  <th>类型</th>
                  <th>手机号</th>
                  <th>行业</th>
                  <th>描述</th>
                  <th></th>
                </tr>
              </thead>
              <tbody class="tabelbody">
                <tr v-for="(item,index) in tableData3" :key='index'>
                  <td><span class="mobile">姓名:</span><span class='value_right'>{{item.name}}</span></td>
                  <td><span class="mobile">可提现金额:</span><span class='value_right tabe-price'>￥{{item.cash}}</span></td>
                  <td><span class="mobile">等级:</span><span class='value_right'>{{item.total}}</span></td>
                  <td><span class="mobile">类型:</span><span class='value_right'>{{item.count}}</span></td>
                  <td><span class="mobile">手机号:</span><span class='value_right'>{{item.phone}}</span></td>
                  <td><span class="mobile">行业:</span><span class='value_right'>{{item.industry}}</span></td>
                  <td class='min_width'><span class="mobile">描述:</span><span class='value_right' :title="item.describe">{{item.describe}}</span></td>
                  <td><a class="personal">查看个人资料</a></td>
                </tr>
                <div class="empty" v-if="tableData3.length==0">该列表为空</div>
              </tbody>
            </table>
            <div class="pages">
              <el-pagination  layout="prev, pager, next" :total="50" @size-change="handleChange"></el-pagination>
            </div>
          </el-tab-pane>

          <!-- 卖出小程序 -->
          <el-tab-pane label="卖出小程序" name="fourth" class="tabpane">
            <table style="width:100%" class="table">
              <thead class="tabelheader">
                <tr>
                  <th>店铺序列号</th>
                  <th>店铺名称</th>
                  <th>商家姓名</th>
                  <th>商家联系电话</th>
                  <th>商家地址</th>
                  <th>描述</th>
                  <th></th>
                </tr>
              </thead>
              <tbody class="tabelbody">
                <tr v-for="(item,index) in tableData4" :key='index'>
                  <td><span class="mobile">店铺序列号:</span><span class='value_right'>{{item.name}}</span></td>
                  <td><span class="mobile">店铺名称:</span><span class='value_right'>{{item.cash}}</span></td>
                  <td><span class="mobile">商家姓名:</span><span class='value_right'>{{item.total}}</span></td>
                  <td><span class="mobile">商家联系电话:</span><span class='value_right'>{{item.phone}}</span></td>
                  <td class='min_width'><span class="mobile">商家地址:</span><span class='value_right'>{{item.count}}</span></td>
                  <td class='min_width'><span class="mobile">描述:</span><span class='value_right' :title="item.describe">{{item.describe}}</span></td>
                  <!-- <td>{{item.name}}</td>
									<td>{{item.cash}}</td>
									<td>{{item.total}}</td>
									<td>{{item.count}}</td>
									<td>{{item.phone}}</td>
									<td>{{item.describe}}</td> -->
                  <td><a class="personal">进入店铺</a></td>
                </tr>
                <div class="empty" v-if="tableData4.length==0">该列表为空</div>
              </tbody>
            </table>
            <div class="pages">
              <el-pagination  layout="prev, pager, next" :total="50" @size-change="handleChange"></el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import "../../../assets/css/distribution.css";
export default {
  data() {
    return {
      activeName: "first", //当前选择的导航
      count: 10,
      textarea3: "",
      index: "",
      DialogVisible: false,
      editVisible: false,
      tableData: [
        {
          id: "1",
          name: "wx123456",
          cash: "卖出小程序",
          total: "2018年10月31",
          count: "200",
          phone: "150",
          industry: "1000",
          refuse: ""
        },

        {
          id: "2",
          name: "wx123456",
          cash: "卖出小程序",
          total: "2018年10月31",
          count: "200",
          phone: "2000",
          industry: "10000",
          refuse: ""
        }
      ],
      tableData2: [
        {
          id: "1",
          name: "李白",
          cash: "10000",
          total: "销售人",
          count: "全职",
          phone: "15212345678",
          industry: "互联网",
          describe: "落霞与孤鹜齐飞,秋水共长天一色",
          Qrcode: "1",
          refuse: ""
        },
        {
          id: "2",
          name: "杜甫",
          cash: "10000",
          total: "销售人",
          count: "全职",
          phone: "15212345678",
          industry: "互联网",
          describe: "落霞与孤鹜齐飞,秋水共长天一色",
          Qrcode: "1",
          refuse: ""
        },
        {
          id: "3",
          name: "杜牧",
          cash: "10000",
          total: "销售人",
          count: "全职",
          phone: "15212345678",
          industry: "互联网",
          describe: "落霞与孤鹜齐飞,秋水共长天一色",
          Qrcode: "1",
          refuse: ""
        },
        {
          id: "4",
          name: "李商隐",
          cash: "10000",
          total: "销售人",
          count: "全职",
          phone: "15212345678",
          industry: "互联网",
          describe: "落霞与孤鹜齐飞,秋水共长天一色",
          Qrcode: "1",
          refuse: ""
        },
        {
          id: "5",
          name: "李清照",
          cash: "10000",
          total: "销售人",
          count: "全职",
          phone: "15212345678",
          industry: "互联网",
          describe: "落霞与孤鹜齐飞,秋水共长天一色",
          Qrcode: "1",
          refuse: ""
        }
      ],
      tableData3: [
        {
          id: "1",
          name: "李",
          cash: "100",
          total: "销售人",
          count: "全职",
          phone: "15212345678",
          industry: "互联网",
          describe: "落霞与孤鹜齐飞,秋水共长天一色",
          Qrcode: "1",
          refuse: ""
        }
      ],

      tableData4: [
        {
          id: "1",
          name: "wx1",
          cash: "商城",
          total: "小王",
          count: "上海市",
          phone: "15212345678",
          describe: "落霞与孤鹜齐飞,秋水共长天一色",
          refuse: ""
        },
        {
          id: "2",
          name: "wx2",
          cash: "商城",
          total: "小王",
          count: "上海市",
          phone: "",
          describe: "落霞与孤鹜齐飞,秋水共长天一色",
          refuse: ""
        },
        {
          id: "6",
          name: "wx3",
          cash: "商城",
          total: "小王",
          count: "上海市",
          phone: "15212345678",
          describe: "落霞与孤鹜齐飞,秋水共长天一色",
          refuse: ""
        }
      ]
    };
  },

  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },

    handleChange(e) {
      console.log(e);
    }
  },
  created() {}
};
</script>


<style lang="stylus" scoped>
.member_page {
  background-color: #f9f9f9;
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
}

.memberList {
  width: 100%;
}

.sales_title {
  display: flex;
  width: 100%;
  background: #293643;
  height: 50px;
  line-height: 50px;
  align-items: center;
}

.sales_title a img {
  width: 12px;
  display: block;
  cursor: pointer;
}

.sales_title span, .sales_title a {
  padding-left: 20px;
  color: #fff;
}

.personal {
  font-size: 14px;
  color: #2589FF;
}

.pages {
  text-align: right;
  margin-top: 20px;
}

.empty {
  width: auto;
  font-size: 16px;
  margin-top: 20px;
  color: #aaa;
  display: flex;
  padding: 10px;
}

.tabe-prices {
  color: #1cc09e;
}

.tabe-price {
  color: #fb5652;
}
</style>