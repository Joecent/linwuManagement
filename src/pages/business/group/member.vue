<template>
  <div class="member_page">
    <div class="memberList">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!--审批成功区块-->
        <el-tab-pane label="审批成功" name="first" class="tabpane">
          <table style="width:100%" class="table">
            <thead class="tabelheader">
              <tr>
                <th>姓名</th>
                <th>手机号</th>
                <th>待成团</th>
                <th>余额</th>
                <th class="min_width max_width">社群名称</th>
                <th>来源二维码</th>
                <th>操作</th>
                <th></th>
                <th>配置</th>
              </tr>
            </thead>
            <tbody class="tabelbody">
              <tr v-for="(item,index) in staff.tableData" :key="index">
                <!--<a :href="item.code" download='QrCode'>-->
                <td>
                  <span class="mobile">姓名:</span>
                  <span class="value_right">{{item.username}}</span>
                </td>
                <td>
                  <span class="mobile">手机号:</span>
                  <span class="value_right">{{item.phone}}</span>
                </td>
                <td>
                  <span class="mobile">待成团:</span>
                  <span class="value_right">{{item.waitGroup}}</span>
                </td>
                <td>
                  <span class="mobile">余额:</span>
                  <span class="value_right">￥{{Number(item.group_money).toFixed(2)}}</span>
                </td>
                <td class="td min_width max_width">
                  <span class="mobile">社群名称:</span>
                  <span class="value_right">{{item.group_name}}</span>
                </td>
                <td>
                  <span class="mobile">来源二维码:</span>
                  <img class="value_right imgUrl" @click="downloadFile(item.user_id)" :src="imgUlr">
                </td>
                <td class="last_btn">
                  <div class="data_btn btn_danger" @click="handledisable(item.id)">禁 用</div>
                  <div class="data_btn btn_info" @click="handleSort(item.id,item.user_id)">排 序</div>
                </td>
                <td class="last_btn">
                  <div
                    class="data-info"
                    @click="handleSearch(item.user_id,item.username,item.waitGroup)"
                  >查看个人资料</div>
                </td>
                <td class="last_btn">
                  <div class="data-info" @click="addGroupFriends(item.user_id)">添加</div>
                  <!-- 合伙人选择 -->
    <el-select v-model="value" placeholder="请选择">
      <el-option v-for="item in friendlist" :key="item.friend_id" :label="item.name" :value="item.friend_id"></el-option>
    </el-select>
                  <div
                    style="margin-top:10px"
                    class="data-info"
                    @click="delGroupFriends(item.user_id)"
                  >删除</div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="empty" v-if="staff.tableData.length==0">该列表为空</div>
          <div class="pages" v-if="staff.tableData.length!=0">
            <!--<el-pagination layout="prev, pager, next, jumper" :pager-count="5" :page-count='accept.pageCount'
            :page-size="accept.page" @current-change="handleChangeTab1" :current-page.sync="accept.pno"></el-pagination>-->
            <el-pagination
              layout="prev, pager, next, jumper"
              :pager-count="5"
              :page-count="staff.pageCount"
              :page-size="staff.page"
              @current-change="handleChangeOne"
              :current-page.sync="staff.pno"
              v-if="staff.tableData!=[]"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <!--待审批人员区块-->
        <el-tab-pane
          :label="'待审批人员 ('+this.pending.tableData.length+')'"
          name="second"
          class="tabpane"
        >
          <table class="table">
            <thead class="tabelheader">
              <tr>
                <th>姓名</th>
                <th>手机号</th>
                <th class="min_width max_width">申请日期</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody class="tabelbody">
              <tr v-for="(item,index) in pending.tableData" :key="index">
                <td>
                  <span class="mobile">姓名:</span>
                  <span class="value_right">{{item.username}}</span>
                </td>
                <td>
                  <span class="mobile">手机号:</span>
                  <span class="value_right">{{item.phone}}</span>
                </td>
                <td class="td min_width max_width">
                  <span class="mobile">申请日期:</span>
                  <span class="value_right">{{item.create_time*1000 | dataFilter(1)}}</span>
                </td>
                <td class="last_btn">
                  <div class="data_btn btn_success" @click="handlethrough(item.id)">通 过</div>
                  <div class="data_btn btn_danger" @click="handleRefused(item.id)">拒 绝</div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="empty" v-if="pending.tableData.length==0">该列表为空</div>
          <div class="pages" v-if="pending.tableData.length!=0">
            <el-pagination
              layout="prev, pager, next, jumper"
              :pager-count="5"
              :page-count="pending.pageCount"
              :page-size="pending.page"
              @current-change="handleChangeTwo"
              :current-page.sync="pending.pno"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <!--审批失败区块-->
        <el-tab-pane label="禁用列表" name="third" class="tabpane">
          <table style="width:100%" class="table">
            <thead class="tabelheader">
              <tr>
                <th>姓名</th>
                <th>手机号</th>
                <th class="min_width max_width">申请日期</th>
                <th>来源二维码</th>
                <th>操作</th>
                <th></th>
              </tr>
            </thead>
            <tbody class="tabelbody">
              <tr v-for="(item,index) in disabled.tableData" :key="index">
                <td>
                  <span class="mobile">姓名:</span>
                  <span class="value_right">{{item.username}}</span>
                </td>
                <td>
                  <span class="mobile">手机号:</span>
                  <span class="value_right">{{item.phone}}</span>
                </td>
                <td class="td min_width max_width">
                  <span class="mobile">申请日期:</span>
                  <span class="value_right">{{item.create_time*1000 | dataFilter(1)}}</span>
                </td>
                <td>
                  <span class="mobile">来源二维码:</span>
                  <img class="value_right imgUrl" @click="downloadFile(item.user_id)" :src="imgUlr">
                </td>
                <td class="last_btn">
                  <div class="data_btn btn_success" @click="handleOpen(item.id)">开 启</div>
                </td>
                <td class="last_btn">
                  <div class="data-info">查看个人资料</div>
                </td>
              </tr>
              <div class="empty" v-if="disabled.tableData.length==0">该列表为空</div>
            </tbody>
          </table>
          <div class="pages" v-if="disabled.tableData.length!=0">
            <el-pagination
              layout="prev, pager, next, jumper"
              :pager-count="5"
              :page-count="disabled.pageCount"
              :page-size="disabled.page"
              @current-change="handleChangeThree"
              :current-page.sync="disabled.pno"
            ></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--待审批人员拒绝-->
    <el-dialog
      title="填写拒绝理由"
      :visible.sync="DialogVisible"
      width="30%"
      center
      :modal-append-to-body="false"
    >
      <el-input
        class="txt"
        type="textarea"
        :autosize="{minRows:4}"
        placeholder="请输入拒绝理由"
        v-model="textarea3"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="confirmDialog">提 交</el-button>
      </span>
    </el-dialog>
    <!--排序的弹窗  -->
    <el-dialog title="设置排序" :visible.sync="sortalert" width="30%" :modal-append-to-body="false">
      <div class="head">
        <span class="infoname">团长排序:</span>
        <el-input v-model="sortValue" class="txt"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sortalert=false">取 消</el-button>
        <el-button type="primary" @click="confirmSort">提 交</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script type="text/javascript">
import "@/assets/css/distribution.css";
import {
  getGroupFriends,
  addGroupFriends,
  delGroupFriends,
  get_saleUserAdmin,
  get_requestStatus,
  downfile,
  get_groupApplyAdmin,
  up_groupApplyAdmin,
  downloadGroupQRcode,
  getGroupSort,
  upGroupSort
} from "@/utils/api";
import * as store from "@/utils/sdk/store";
import pics from "@/assets/images/avatar.png";
import pic from "@/assets/images/downsimg.png";
export default {
  data() {
    return {
      value:'',
      friendlist:[],
      friend_id: "",
      lee: 0,
      imgs1: pics,
      step_type: "1",
      activeName: "first", //当前选择的导航
      textarea3: "",
      user_id: "",
      my_img: "",
      sort_id: "",
      imgUlr: pic,
      is_second: true,
      is_third: true,
      DialogVisible: false,
      sortalert: false, //排序的弹窗
      sortValue: "", //排序的值
      staff: {
        tableData: [],
        pno: 1,
        page: 10,
        pageCount: 3
      },
      pending: {
        tableData: [],
        pno: 1,
        page: 10,
        pageCount: 3
      },
      disabled: {
        tableData: [],
        pno: 1,
        page: 10,
        pageCount: 3
      },
      details: {
        name: "",
        user_id: "",
        activeName: "second",
        waitGroup: "" //带成团的数量
      }
    };
  },
  methods: {
    handleSort(id, user_id) {
      //排序
      this.sortalert = true;
      this.sort_id = id;
      getGroupSort({
        shop_id: store.get("currentshopid"),
        user_id: user_id
      }).then(res => {
        if (res.status == "1") {
          this.sortValue = res.sort_status;
        }
      });
    },
    confirmSort() {
      upGroupSort({
        id: this.sort_id,
        sort_status: this.sortValue
      }).then(res => {
        if (res.status == "1") {
          this.sortalert = false;
          this.$message.success("修改成功！");
          this.handleTable1(this.staff.page, this.staff.pno); //排序成功后台没返回数据，就再次调用请求团长页面，后续让后台修改该排序后直接返回新的团长顺序，就不用请求
        }
      });
    },
    DyamicDate(sign) {
      this.$router.push({
        path: "/business/group/DynamicData",
        query: { sign: sign }
      });
    },
    handleChanges(tab) {
      if (tab.paneName == "second") {
        this.handledata1(this.wait.pno, this.wait.page);
      } else if (tab.paneName == "third") {
        this.handledata2(this.alreadly.pno, this.alreadly.page);
      } else if (tab.paneName == "fourth") {
        this.handledata3(this.reduse.pno, this.reduse.page);
      }
    },
    handleSearch(id, name, waitGroup) {
      //查看详情
      this.$router.push({
        path: "/business/group/details",
        query: { id: id, name: name, waitGroup: waitGroup }
      });
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
    handleTable1(page, pno) {
      get_groupApplyAdmin({
        //待审批
        shop_id: store.get("currentshopid"),
        limit: page,
        page: pno
      }).then(res => {
        if (res.status == "1") {
          this.pending.pageCount = res.totalPage;
          this.pending.tableData = res.data;
          this.pending.pno = Number(res.page);
        }
      });
    },
    downloadFile(id) {
      //window.open("http://116.62.187.206/api/downloadGroupQRcode?shop_id=144&user_id="+id)
      location =
        "http://116.62.187.206/api/downloadGroupQRcode?shop_id=144&user_id=" +
        id;
    },
    handleTable2(page, pno) {
      get_groupApplyAdmin({
        //审批成功
        shop_id: store.get("currentshopid"),
        limit: page,
        page: pno,
        verify_status: "1"
      }).then(res => {
        if (res.status == "1") {
          this.staff.pageCount = res.totalPage;
          this.staff.pno = Number(res.page);
          this.staff.tableData = res.data;
        }
      });
    },
    handleTable3(page, pno) {
      get_groupApplyAdmin({
        //审批失败
        shop_id: store.get("currentshopid"),
        limit: page,
        page: pno,
        status: "0"
      }).then(res => {
        if (res.status == "1") {
          this.disabled.pageCount = res.totalPage;
          this.disabled.tableData = res.data;
          this.disabled.pno = Number(res.page);
        }
      });
    },
    handlePage0() {
      this.handledata0(this.cash_group.pno, this.cash_group.page);
    },
    handlePage1(e) {
      this.handledata1(this.wait.pno, this.wait.page);
    },
    handlePage2() {
      this.handledata2(this.alreadly.pno, this.alreadly.page);
    },
    handlePage3() {
      this.handledata3(this.reduse.pno, this.reduse.page);
    },
    handleChangeOne(e) {
      //分页一
      this.staff.pno = e;
      store.set("memberPagination", this.staff.pno);
      // console.log(store.get("memberPagination"));
      this.handleTable2(this.staff.page, this.staff.pno);
    },
    handleChangeTwo(e) {
      //分页二
      this.pending.pno = e;
      this.handleTable1(this.pending.page, this.pending.pno);
    },
    handleChangeThree(e) {
      //分页三
      this.disabled.pno = e;
      this.handleTable3(this.disabled.page, this.disabled.pno);
    },
    handleClick(tab, event) {
      store.set("memberPagination", "");
      if (tab.paneName == "second") {
        if (this.is_second) {
          this.staff.pno = 1;
          this.handleTable1(this.staff.page, this.staff.pno);
          this.is_second = false;
        }
      } else if (tab.paneName == "third") {
        if (this.is_third) {
          this.disabled.pno = 1;
          this.handleTable3(this.disabled.page, this.disabled.pno);
          this.is_third = false;
        }
      }
    },
    handledisable(id) {
      //点击禁用
      up_groupApplyAdmin({
        shop_id: store.get("currentshopid"),
        id: id,
        verify_status: "refuse",
        status: "0"
      }).then(res => {
        if (res.status == "1") {
          this.handleTable2(this.pending.page, this.pending.pno);
          this.handleTable3(this.disabled.page, this.disabled.pno);
          this.$message.success("已禁用");
        }
      });
    },
    handleOpen(id) {
      //点击开启
      up_groupApplyAdmin({
        shop_id: store.get("currentshopid"),
        id: id,
        verify_status: "allow",
        status: "1"
      }).then(res => {
        if (res.status == "1") {
          this.handleTable2(this.pending.page, this.pending.pno);
          this.handleTable3(this.disabled.page, this.disabled.pno);
          this.$message.success("已开启");
        }
      });
    },
    handlethrough(id) {
      //点击通过时
      up_groupApplyAdmin({
        shop_id: store.get("currentshopid"),
        id: id,
        verify_status: "allow"
      }).then(res => {
        if (res.status == "1") {
          this.handleTable1(this.staff.page, this.staff.pno);
          this.handleTable2(this.pending.page, this.pending.pno);
        }
      });
    },
    handleRefused(id) {
      //点击拒绝时
      this.DialogVisible = true;
      this.user_id = id;
    },
    cancelDialog() {
      //取消Dialog
      this.DialogVisible = false;
      this.textarea3 = "";
    },
    confirmDialog() {
      //确认Dialog
      if (this.textarea3 == "") {
        this.textarea3 = "无";
      }
      up_groupApplyAdmin({
        shop_id: store.get("currentshopid"),
        id: this.user_id,
        verify_status: "refuse",
        extra: this.textarea3
      }).then(res => {
        if (res.status == "1") {
          this.$message.success("已拒绝");
          this.handleTable1(this.staff.page, this.staff.pno);
        }
      });
      this.textarea3 = "";
      this.DialogVisible = false;
    },
    // 获取合伙人列表
    getGroupFriends() {
      getGroupFriends({
        shop_id: store.get("currentshopid")
      }).then(res => {
        if (res.status == "1") {
          this.friend_id = res.data[0].friend_id;
          this.friendlist=res.data
        }
      });
    },
    //添加合伙人
    addGroupFriends(user_id) {
      addGroupFriends({
        shop_id: store.get("currentshopid"),
        user_id: user_id,
        friend_id: this.value
      }).then(res => {
        		this.$message.success(res.msg)
        // if (res.status == "1") {
        // }
      });
    },
    //删除合伙人
    delGroupFriends(user_id) {
      delGroupFriends({
        user_id: user_id
      }).then(res => {
         		this.$message.success(res.msg)
        // if (res.status == "1") {
        // }
      });
    }
  },
  created() {
    if (store.get("memberPagination")) {
      this.pending.pno = store.get("memberPagination");
    }
    this.getGroupFriends();
    this.handleTable2(this.pending.page, this.pending.pno);
    this.handleTable1(this.staff.page, this.staff.pno);
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

.memberList {
  width: 100%;
}

.data-info {
  color: #1cc09E;
  cursor: pointer;
}

.details {
  width: 100%;
}

.details .paymentInfo span {
  margin-left: 10px;
}

.member_page .table {
  cursor: default;
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

.tabs {
  padding: 20px 0 0 10px;
}

.tabs .paymentInfo span:last-child {
  text-align: left;
}

.paymentInfo {
  padding-left: 0;
}

.paymentInfo li {
  padding: 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px dashed #ccc;
}

.paymentInfo li>div:first-child {
  min-width: 105px;
}

.paymentInfo li>div:nth-child(2) {
  min-width: 215px;
}

.paymentInfo li>div:nth-child(3) {
  min-width: 145px;
}

.paymentInfo li>div:nth-child(4) {
  min-width: 175px;
}

.paymentInfo li>div {
  display: flex;
  align-items: center;
}

.user_list img {
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.table-li1 {
  min-width: 10% !important;
}

.income {
  color: #1cc09E;
  font-weight: 700;
}

.spending {
  color: #E51c23;
  font-weight: 700;
}

.head {
  display: flex;
}

.infoname {
  min-width: 65px;
  display: flex;
  align-items: center;
}

.address {
  display: flex;
  flex-flow: column nowrap;
}

.address span {
  line-height: 25px;
}

.tabpane .table .paymentInfo li {
  line-height: normal;
  position: relative;
}

.ads {
  width: 370px;
  align-items: center;
}

.ads span:nth-child(1) {
  min-width: 50px;
}

.details .tabpane .table .min_width2 {
  width: 205px !important;
}

.paymentInfo li:last-child {
  border: none;
}

.paymentInfo li:first-child {
  border-top: 1px dashed #ccc;
}

.virtual {
  position: absolute;
  left: 0;
  border: solid 1px #f00;
  -webkit-transform: rotate(-30deg);
  transform: rotate(-30deg);
  display: inline;
  width: 72px !important;
  top: 10px;
  padding: 0 5px;
}

@media (max-width: 900px) {
  .paymentInfo li {
    padding: 15px 0;
    display: block;
    border-bottom: 1px dashed #ccc;
  }

  .tabpane .table .mobile, .tabpane .table li .mobile {
    width: 25%;
  }

  .paymentInfo li>div {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin: 5px 0px;
  }

  .tabpane .table .paymentInfo li {
    text-align: left;
  }

  .details .tabpane .table .min_width2 {
    width: auto !important;
    white-space: inherit !important;
  }

  .details .tabpane .table .tabelbody .min_width2 {
    width: 315px !important;
  }

  .tabpane .table li .mobile {
    margin-right: 0px;
  }

  .tabpane .table tr td {
    margin: 5px 0px;
  }

  // .table .value_right, .table .value_right{
  // width:auto!important;
  // }
  .details .table .value_right {
    width: 70%;
  }
}
</style>
