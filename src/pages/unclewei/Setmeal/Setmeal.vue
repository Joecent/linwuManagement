<template>
    <!-- 购买套餐 -->
    <div>
        <ul class="login_ways_tab clearfix">
            <li :class="{ on: ison}" @click="_loginway()">年付</li>
            <li :class="{ on: !ison}" @click="_loginway()">月付</li>
        </ul>
        <div class="login_ways_con clearfix">
            <p class="login_ways_con-title"><span>购买套餐</span> </p>
            <div class="con" v-show="ison">
                <!-- 年付 -->
                <ul class="con-list">
                    <li>
                        <div class="con-title">
                            <span>基础版</span>
                        </div>
                        <div class="con-conter">
                            <p>内容</p>
                            <p>1.微信附件小程序广告位置;</p>
                            <p>2.店内热卖商品展示;</p>
                            <p>3.商店地址，联系方式等资料展示;</p>
                        </div>
                        <div class="con-price">2288/年</div>
                        <div class="go-shop" @click="centerDialogVisible">立即购买</div>
                    </li>
                    <li>
                        <div class="con-title">
                            <span>高级版</span>
                        </div>
                        <div class="con-conter">
                            <p>内容</p>
                            <p>1.微信附件小程序广告位置;</p>
                            <p>2.店内热卖商品展示;</p>
                            <p>3.商店地址，联系方式等资料展示;</p>
                            <p>4.拼团、特权价、代金券推广多种营销玩法;</p>
                            <p>5.全平台数据分析;</p>
                            <p>6.多模板自动切换;</p>
                        </div>
                        <div class="con-price">2288/年</div>
                        <div class="go-shop">立即购买</div>
                    </li>

                    <li>
                        <div class="con-title">
                            <span>企业版</span>
                        </div>
                        <div class="con-conter">
                            <p>内容</p>
                            <p>1.微信附件小程序广告位置;</p>
                            <p>2.店内热卖商品展示;</p>
                            <p>3.商店地址，联系方式等资料展示;</p>
                            <p>4.拼团、特权价、代金券推广多种营销玩法;</p>
                            <p>5.全平台数据分析;</p>
                            <p>6.多模板自动切换;</p>
                            <p>7.分销裂变，让粉丝替你卖货;</p>
                            <p>8."多重有礼"实现精细化会员营销;</p>
                            <p>9.多店同时使用</p>
                        </div>
                        <div class="con-price">6288/年</div>
                        <div class="go-shop">立即购买</div>
                    </li>
                </ul>
            </div>
            <div class="con" v-show="!ison">
                <ul class="con-list">
                    <li>
                        <div class="con-title">
                            <span>基础版</span>
                        </div>
                        <div class="con-conter">
                            <p>内容</p>
                            <p>1.微信附件小程序广告位置;</p>
                            <p>2.店内热卖商品展示;</p>
                            <p>3.商店地址，联系方式等资料展示;</p>
                        </div>
                        <div class="con-price">588/年</div>

                        <div class="go-shop">立即购买</div>
                    </li>

                    <li>
                        <div class="con-title">
                            <span>高级版</span>
                        </div>
                        <div class="con-conter">
                            <p>内容</p>
                            <p>1.微信附件小程序广告位置;</p>
                            <p>2.店内热卖商品展示;</p>
                            <p>3.商店地址，联系方式等资料展示;</p>
                            <p>4.拼团、特权价、代金券推广多种营销玩法;</p>
                            <p>5.全平台数据分析;</p>
                            <p>6.多模板自动切换;</p>
                        </div>
                        <div class="con-price">2008/年</div>

                        <div class="go-shop">立即购买</div>
                    </li>
                    <li>
                        <div class="con-title">
                            <span>企业版</span>
                        </div>
                        <div class="con-conter">
                            <p>内容</p>
                            <p>1.微信附件小程序广告位置;</p>
                            <p>2.店内热卖商品展示;</p>
                            <p>3.商店地址，联系方式等资料展示;</p>
                            <p>4.拼团、特权价、代金券推广多种营销玩法;</p>
                            <p>5.全平台数据分析;</p>
                            <p>6.多模板自动切换;</p>
                            <p>7.分销裂变，让粉丝替你卖货;</p>
                            <p>8."多重有礼"实现精细化会员营销;</p>
                            <p>9.多店同时使用</p>
                        </div>
                        <div class="con-price">488/年</div>
                        <div class="go-shop">立即购买</div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 套餐对比 -->
        <div class="tabs">
            <p> <span>套餐对比</span> </p>
            <table class="table-striped">
                <thead class="table-title">
                    <tr></tr>
                    <tr>体验版</tr>
                    <tr>基础版</tr>
                    <tr>高级版</tr>
                    <tr>企业版</tr>
                </thead>
                <tbody class="table-tbody">
                    <!-- <tr v-for="(item,index) in tab" :key="index">
                        <td>{{item.name}}</td>
                        <td>{{item.dui}}</td>
                        <td>{{item.dui}}</td>
                        <td>{{item.wu}}</td>
                        <td>{{item.wu}}</td>
                    </tr> -->
                    <tr>
                        <td>公众号</td>
                        <td>✔</td>
                        <td>—</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>小程序</td>
                        <td>✔</td>
                        <td>—</td>
                        <td>✔</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>团购</td>
                        <td>✔</td>
                        <td>—</td>
                        <td>—</td>
                        <td>✔</td>
                    </tr>
                    <tr>
                        <td>砍价</td>
                        <td>✔</td>
                        <td>✔</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>渠道</td>
                        <td>✔</td>
                        <td>—</td>
                        <td>—</td>
                        <td>✔</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 弹出框 -->
        <div class="purchase">
            <el-dialog title="购买店铺套餐" :visible.sync="DialogVisible" width="30%" center :modal-append-to-body='false'>
                <div>
                    <div class="purchase-title">
                        <p>店铺名称: <span>邻伍</span> </p>
                        <p>店铺类型: <span>电商</span> </p>
                        <p>购买套餐: <span>高级版</span> </p>
                        <p>套餐价格: <span>￥2888.00</span> </p>
                        <p>到期时间: <span>2019-10-10</span> </p>
                    </div>
                    <div class="purchase-input">
                        销售邀请手机号: <input type="text" placeholder="请输入邀请人手机号"> <a>验证</a>
                    </div>
                    <ul class="zf">
                        <li class="zfs">支付方式:</li>
                        <li v-for="(item,index) in radioList" :key="index" :class="selectedNum==index?'active':''" class="zf1" @click="select(index)">
                            <img :src="item.img" alt="">
                            {{item.title}}
                        </li>
                    </ul>

                    <div class="purchase-price">实际支付:<span>￥2888.00</span></div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="cancelDialog">确 定</el-button>
                    <el-button @click="cancelDialog">取 消</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>


<script type="text/javascript">
import pic from "@/assets/images/wx.png";

import pic1 from "@/assets/images/zfb.png";

export default {
  data() {
    return {
      ison: true,
      DialogVisible: false,
      selectedNum: "",
      radioList: [
        {
          title: "微信支付",
          img: pic
        },
        {
          title: "支付宝支付",
          img: pic1
        }
      ]
      //   tab: [
      //     {
      //       name: "公众号",
      //       dui: "✔",
      //       wu: "—"
      //     },
      //     {
      //       name: "小程序",
      //       dui: "✔",
      //       wu: "—"
      //     },
      //     {
      //       name: "团购",
      //       dui: "✔",
      //       wu: "—"
      //     },
      //     {
      //       name: "砍价",
      //       dui: "✔",
      //       wu: "—"
      //     },
      //     {
      //       name: "渠道",
      //       dui: "✔",
      //       wu: "—"
      //     }
      //   ]
    };
  },
  methods: {
    _loginway() {
      this.ison == true ? (this.ison = false) : (this.ison = true);
    },

    centerDialogVisible() {
      // 购买
      this.DialogVisible = true;
      //this.index = index;
    },

    cancelDialog() {
      //取消Dialog
      this.DialogVisible = false;
    },

    //单选
    select(i) {
      this.selectedNum = i;
    }
  }
};
</script>

<style lang="stylus" scoped>
.login_ways_tab {
    display: flex;
    margin-top: 30px;
}

.login_ways_tab li {
    width: 200px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border: 1px solid #bbbbbb;
    cursor: pointer;
}

.login_ways_tab li.on {
    border: 1px solid #1CC09E;
    color: #1CC09E;
}

.login_ways_con {
    margin-top: 20px;
}

.login_ways_con .login_ways_con-title {
    text-align: center;
}

.login_ways_con p span {
    border-bottom: 2px solid #101010;
    padding-bottom: 10px;
    font-size: 16px;
}

.con {
    margin-top: 50px;
}

.con-list {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
}

.con li {
    width: 308px;
    border: 1px solid #bbbbbb;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
}

.con li .con-title {
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    background: #B99336;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
}

.con-price {
    width: 120px;
    height: 40px;
    background: #1CC09E;
    text-align: center;
    line-height: 40px;
    color: #fff;
    position: absolute;
    left: -33px;
    top: 8px;
    transform: rotate(-45deg);
}

.con-conter {
    padding: 15px;
    min-height: 340px;
}

.con-conter p {
    margin: inherit;
    line-height: 2;
    font-size: 14px;
}

.go-shop {
    width: 120px;
    height: 47px;
    line-height: 47px;
    text-align: center;
    background: #B99336;
    margin: 20px auto;
    color: #fff;
    cursor: pointer;
}

.purchase-title span {
    color: #E51C23;
    padding-left: 10px;
}

.purchase-input input {
    border: 1px solid #999;
    height: 40px;
    padding: 0 10px;
}

.purchase-input a {
    color: #1CC09E;
    padding-left: 10px;
    cursor: pointer;
}

.purchase-price {
    margin-top: 10px;
}

.purchase-price span {
    font-size: 28px;
    color: #E51C23;
}

.zf {
    display: flex;
    height: 42px;
    line-height: 42px;
    margin-top: 20px;
}

.zf .zf1 {
    width: 120px;
    margin-left: 10px;
    border: 1px solid #bbbbbb;
    text-align: center;
}

.zf .zf1 img {
    display: inline-block;
    width: 22px;
    height: 22px;
}

.zf .zf1.active {
    border: 1px solid #1CC09E;
}

// 表格
.tabs {
    margin-bottom: 50px;
}

.tabs p {
    text-align: center;
    margin: 30px 0;
}

.tabs p span {
    padding-bottom: 10px;
    font-size: 16px;
    color: #333;
    border-bottom: 2px solid #333;
    font-weight: 600;
}

.table-striped {
    width: 100%;
    text-align: center;
    background: #293643;
    color: #fff;
}

.table-title {
    display: flex;
    align-items: center;
}

.table-title tr, .table-tbody tr td {
    flex: 1;
    height: 50px;
    line-height: 50px;
}

.table-tbody tr {
    display: flex;
    align-items: center;
}

@media (max-width: 900px) {
    .login_ways_tab {
        padding: 0 30px;
    }

    .con {
        margin-top: 0;
    }

    .con li {
        margin: 15px 0;
    }

    .con li .con-title {
        height: 85px;
        line-height: 85px;
    }

    .zf .zf1, .zfs {
        width: 100px;
    }

    .purchase-input input, .purchase-input a {
        margin-top: 5px;
    }
}
</style>

<style>
.purchase .el-dialog__header {
  background: #1cc09e;
  color: #ffffff;
}
.purchase .el-dialog__header .el-dialog__title {
  color: #ffffff;
}
.purchase .el-dialog__headerbtn .el-dialog__close {
  color: #ffffff;
}

/* .dialog-footer .el-button--primary{
    background-color: #1cc09e;
    border-color: #1cc09e;
}
 .el-button:focus,  .el-button:hover{
  color:inherit
} */
</style>

