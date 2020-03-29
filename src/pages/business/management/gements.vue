<template>
	<div class="">
		<div class="conter">
		  <div class="search">
          <input placeholder="按销售姓名搜索" v-model="searchString" />
	      	<img src="@/assets/images/search.png">
		  </div>
		  <div class="ments" @click="addsasles">添加销售</div>
		</div>
    <div class="member_page">
	    <div class="memberList">
       <el-tabs v-model="activeName">
          <!-- 全部销售 -->
			   <el-tab-pane label="全部销售" name="first" class="tabpane">
						<table style="width:100%" class="table">
							<thead class="tabelheader">
								<tr>
									<th>姓名</th>
									<th>可提现金额</th>
									<th>等级</th>
									<th>类型</th>
									<th>手机号</th>
									<th>行业</th>
									<th class="min_width">描述</th>
									<th>卖出小程序</th>
									<th>操作</th>
									<th></th>
								</tr>
							</thead>

							<tbody class="tabelbody">
								<tr v-for="(item,index) in tableDatas" :key='index'>
									<td><span class="mobile">姓名:</span><span class='value_right'>{{item.name}}</span></td>
                  <td><span class="mobile">可提现金额:</span><span class='value_right'>{{item.cash}}</span></td>
                  <td><span class="mobile">等级:</span><span class='value_right'>{{item.total}}</span></td>
                  <td><span class="mobile">类型:</span><span class='value_right'>{{item.count}}</span></td>
									<td><span class="mobile">手机号:</span><span class='value_right'>{{item.phone}}</span></td>
                  <td><span class="mobile">行业:</span><span class='value_right'>{{item.industry}}</span></td>
                  <td class='min_width'><span class="mobile">描述:</span><span class='value_right' :title="item.describe">{{item.describe}}</span></td>
                  <td><span class="mobile">卖出小程序:</span><span class='value_right'>{{item.Qrcode}}</span></td>
									<td class="last_btn">
									   	<!-- <el-button size="small" type="success" @click="edit(index)">编辑</el-button> -->
                       <div class="data_btn btn_success" @click="edit(index)">编辑</div>
                       <div class="data_btn btn_danger" @click="handledisable(index)">禁用</div>
									</td>
									<td> <a @click="Lookmore">查看更多</a>	</td>
								</tr>
								<div class="empty"  v-if="tableDatas.length==0">该列表为空</div>
							</tbody>
						</table>
            	<div class="pages">
							 <el-pagination layout="prev, pager, next" :total="50" @size-change="handleChange"></el-pagination>
						</div>
				</el-tab-pane>

			    <!-- 待处理申请 -->
					<el-tab-pane :label="'待处理申请 ('+this.tableData2.length+')'" name="second" class="tabpane">
						<table style="width:100%" class="table">
							<thead class="tabelheader">
								<tr>
									<th>姓名</th>
									<th>等级</th>
								  <th>类型</th>
									<th>手机号</th>
									<th>行业</th>
									<th>描述</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody class="tabelbody">
								<tr v-for="(item,index) in tableData2" :key='index'>
									 <td><span class="mobile">姓名:</span><span class='value_right'>{{item.name}}</span></td>
                   <td><span class="mobile">等级:</span><span class='value_right'>{{item.total}}</span></td>
                   <td><span class="mobile">类型:</span><span class='value_right'>{{item.count}}</span></td>
                   <td><span class="mobile">手机号:</span><span class='value_right'>{{item.phone}}</span></td>
                   <td><span class="mobile">行业:</span><span class='value_right'>{{item.industry}}</span></td>
                   <td class='min_width'><span class="mobile">描述:</span><span class='value_right' :title="item.describe">{{item.describe}}</span></td>
									 <td  class="last_btn">
                      <div class="data_btn btn_success  btn_su" @click="handlethrough(index)">通过</div>
                      <div class="data_btn btn_danger" @click="handleRefused(index)">拒绝</div>
										<!-- <el-button size="small" type="success" @click="handlethrough(index)">通过</el-button>
										<el-button size="small" type="danger" @click="handleRefused(index)">拒绝</el-button> -->
									</td>
								</tr>
								<div class="empty"  v-if="tableData2.length==0">该列表为空</div>
							</tbody>
						</table>
            	<div class="pages">
							 <el-pagination layout="prev, pager, next" :total="50" @size-change="handleChange"></el-pagination>
						</div>
				</el-tab-pane>

				<!-- 禁用人员 -->

          <el-tab-pane label="已禁用人员" name="third" class="tabpane">
						<table style="width:100%" class="table">
							<thead class="tabelheader">
								<tr>
									<th>姓名</th>
									<th>可提现金额</th>
									<th>等级</th>
									<th>类型</th>
									<th>手机号</th>
									<th>行业</th>
									<th class="min_width">描述</th>
									<th>卖出小程序</th>
									<th>操作</th>
									<th></th>
								</tr>
							</thead>
							<tbody class="tabelbody">
								<tr v-for="(item,index) in tableData3" :key='index'>
                <!-- <td><span class="mobile">姓名:</span><span class='value_right'>{{item.name}}</span></td> -->
                <td><span class="mobile">姓名:</span><span class='value_right'>{{item.name}}</span></td>
                <td><span class="mobile">可提现金额:</span><span class='value_right'>{{item.cash}}</span></td>
                <td><span class="mobile">等级:</span><span class='value_right'>{{item.total}}</span></td>
                <td><span class="mobile">类型:</span><span class='value_right'>{{item.count}}</span></td>
                <td><span class="mobile">手机号:</span><span class='value_right'>{{item.phone}}</span></td>
                <td><span class="mobile">行业:</span><span class='value_right'>{{item.industry}}</span></td>
                <td class='min_width'><span class="mobile">描述:</span><span class='value_right' :title="item.describe">{{item.describe}}</span></td>
                <td><span class="mobile">卖出小程序:</span><span class='value_right'>{{item.Qrcode}}</span></td>
								<td class="last_btn"> 
                   <div class="data_btn btn_success btn_su" @click="handleOpen(index)">开启</div>
                  <!-- <el-button size="small" type="success" @click="handleOpen(index)">开启</el-button> -->
                </td>
								<td> <a>查看更多</a></td>
								</tr>
								<div class="empty"  v-if="tableData3.length==0">该列表为空</div>
							</tbody>
						</table>
            	<div class="pages">
							 <el-pagination layout="prev, pager, next" :total="50" @size-change="handleChange"></el-pagination>
						</div>
				  </el-tab-pane>

		  	</el-tabs>
	    </div>
    </div>
             <!-- 更新销售等级 -->
    
    <div class="genm-contes">
	    <el-dialog title="更新销售等级" :visible.sync="editVisible" width="30%" center :modal-append-to-body='false'>
				<div class="genm">
                <div class="gemn-title">销售等级人</div>
				<el-select v-model="value" placeholder="请选择">
                  <el-option
                   v-for="item in options"
                   :key="item.value"
                   :value="item.value">
                 </el-option>
               </el-select>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="cancelDialog">取 消</el-button>
					<el-button type="primary" @click="conDialog">提 交</el-button>
				</span>
		   </el-dialog>
    </div>
              <!--待审批人员拒绝-->
			<el-dialog title="填写拒绝理由" :visible.sync="DialogVisible" width="30%" center :modal-append-to-body='false'>
				<el-input class="txt" type="textarea" :autosize="{minRows:4}" placeholder="请输入拒绝理由" v-model="textarea3">
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
      activeName: "first", //当前选择的导航
      count: 5,
      textarea3: "",
      index: "",
      DialogVisible: false,
      editVisible: false,
      searchString: "",
      tableData: [
        {
          id: "1",
          name: "李白",
          cash: "10000",
          total: "销售人1",
          count: "全职",
          phone: "15212345678",
          industry: "互联网",
          describe: "落霞与孤鹜齐飞,秋水共长天一色水共长水共长",
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
        },
        {
          id: "6",
          name: "柳永",
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
      tableData3: [],

      options: [
        {
          value: "销售人"
        },
        {
          value: "初级销售"
        },
        {
          value: "中级销售"
        },
        {
          value: "高级销售"
        }
      ],
      value: ""
    };
  },

  methods: {
    handledisable(index) {
      //点击禁用
      this.tableData3.push(this.tableData[index]);
      this.tableData.splice(index, 1);
    },

    handleRefused(index) {
      //点击拒绝时
      this.DialogVisible = true;
      this.index = index;
    },

    edit(index) {
      //点击编辑
      // console.log(index);
      this.editVisible = true;
      this.index = index;
    },

    conDialog() {
      //编辑提交
      // console.log(this.value)
      this.editVisible = false;
    },

    cancelDialog() {
      //取消Dialog
      this.DialogVisible = false;
      this.editVisible = false;
      this.textarea2 = "";
      this.textarea3 = "";
    },

    handlethrough(index) {
      //点击通过时
      this.tableData.push(this.tableData2[index]);
      this.tableData2.splice(this.index, 1);
    },
    confirmDialog() {
      //确认Dialog
      if (this.textarea3.trim() == "") {
        this.$message.error("请填写拒绝理由");
      } else {
        // var dat=new Date()
        this.tableData2.splice(this.index, 1);
        this.DialogVisible = false;
        this.textarea3 = "";
        //console.log(this.tabel3)
      }
    },

    handleOpen(index) {
      //点击开启
      this.tableData.push(this.tableData3[index]);
      this.tableData3.splice(index, 1);
    },

    addsasles(id, index) {
      //点击添加销售
      console.log("1111");
      this.$router.push({ path: "/business/management/Addsales" });
    },

    Lookmore() {
      this.$router.push({ path: "/business/management/Lookmore" });
    },

    handleChange(e) {
      console.log(e);
    }
  },

  computed: {
    // 搜索功能
    tableDatas: function() {
      var articles_array = this.tableData,
        searchString = this.searchString;
      if (!searchString) {
        return articles_array;
      }
      searchString = searchString.trim().toLowerCase();
      articles_array = articles_array.filter(function(item) {
        if (item.name.toLowerCase().indexOf(searchString) !== -1) {
          return item;
        }
      });
      return articles_array;
    }
  }
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

.conter {
  width: 100%;
  background: #293643;
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
}

.search {
  position: relative;
  max-width: 225px;
}

.search input {
  background-color: #efeff4;
  line-height: 26px;
  // border-radius: 3px;
  font-size: 14px;
  padding-left: 15px;
  margin-left: 20px;
  padding-right: 30px;
}

.search img {
  width: 18px;
  height: 18px;
  position: absolute;
  top: 17px;
  right: 0;
  cursor: pointer;
}

.ments {
  width: 100px;
  height: 36px;
  background: #1CC09E;
  text-align: center;
  line-height: 36px;
  color: #fff;
  margin: 6px 20px 6px 0;
  cursor: pointer;
  font-size: 14px;
}

.el-button--success {
  // background-color: inherit;
  // color: #1cc09e;
  // border-color: #1cc09e;
}

.el-button--danger {
  background-color: inherit;
  color: #f56c6c;
}

.genm {
  display: flex;
  align-items: center;
}

.gemn-title {
  flex: 1;
}

.el-select {
  flex: 4;
}

.tabelbody a {
  font-size: 14px;
  cursor: pointer;
  color:#2589FF
}


.btn_su{
  border: 1px solid #2589FF;
  color: #2589FF;
}

.memberList {
  width: 100%;
}

.pages {
  text-align: right;
  margin-top: 20px;
}

@media (max-width: 900px) {
  .ments {
    font-size: 12px;
    margin: 6px;
  }

  .search input {
    margin-left: 6px;
  }

  .search img {
    right: 10px;
  }

  .tabelbody a {
    width: 100%;
    text-align: center;
    color: #1cc09E;
  }
}
</style>


<style>
@media (max-width: 900px) {
  .genm-contes .el-input__icon {
    line-height: 1;
  }
  .genm-contes .el-select {
    flex: 3;
  }
}
</style>

