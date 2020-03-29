<template>
  <div class="member_page">
    <div class="details">
      <div class="sales_title">
        <a>
          <img src="@/assets/images/back.png" alt @click="back">
        </a>
        <span>{{details.name}} 明细</span>
      </div>
      <div class="data_btn btn_success distance" @click="allhandleprint(3)">一键快递打印</div>
      <div class="data_btn btn_success distance" @click="allhandleprint(0)">一键专送打印</div>
       <div v-if="this.atpresent == '待发货' " class="data_btn btn_success distance" style="margin-bottom:15px;margin-left:20px" @click="AkeyDelivery">一键发货</div>
      <el-tabs v-model="activeName" class="tabs" @tab-click="handleChanges">
        <el-tab-pane label="交易明细" name="first" class="tabpane">
          <table style="width:100%" class="table">
            <thead class="tabelheader">
              <tr>
                <!--<th>流水号</th>-->
                <th>交易类型</th>
                <th>日期</th>
                <th>收入</th>
                <th>支出</th>
              </tr>
            </thead>
            <tbody class="tabelbody">
              <tr v-for="(item,index) in cash_group.data" :key="index">
                <!--<td><span class="mobile">流水号:</span><span class='value_right'>{{item.cash_id}}</span></td>-->
                <td>
                  <span class="mobile">交易类型:</span>
                  <span
                    class="value_right"
                  >{{item.cash_type=='2'?'支付宝':item.cash_type=='3'?'银行卡':'拼团成功'}}{{item.refund_status=='2'?'—拒绝提现':''}}</span>
                </td>
                <td>
                  <span class="mobile">日期:</span>
                  <span class="value_right">{{item.create_time*1000 | dataFilter(2)}}</span>
                </td>
                <td>
                  <span class="mobile">收入:</span>
                  <span
                    class="value_right income"
                  >￥{{Number(item.status=='2'?item.sale_money:'0.00').toFixed(2)}}</span>
                </td>
                <td>
                  <span class="mobile">支出:</span>
                  <span
                    class="value_right spending"
                  >￥{{Number(item.status=='1'?item.sale_money:'0.00').toFixed(2)}}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="empty" v-if="this.cash_group.data.length==0">该列表为空</div>
          <div class="pages" v-if="cash_group.data.length!='0'">
            <el-pagination
              layout="prev, pager, next, jumper"
              :pager-count="5"
              :page-count="cash_group.pageCount"
              :page-size="cash_group.page"
              @current-change="handlePage0"
              :current-page.sync="cash_group.pno"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="'待成团 ('+this.details.waitGroup+')'" name="second" class="tabpane">
          <div class="table">
            <ul class="tabelheader thead">
              <li>
                <span class="table-li"></span>
                <!-- <span class="min_width2">订单号</span> -->
                <span class="min_width2">拼团名称</span>
                <span>类型</span>
                <span>开团人数</span>
                <span class="min_width">成团时间</span>
                <span class="min_width2">地址</span>
                <span>操作</span>
              </li>
            </ul>
            <ul class="tabelbody">
              <li v-for="(item,index) in wait.data" :key="index">
                <div class="w-content">
                  <div class="td arrow td1">
                    <i class="el-icon-arrow-right" @click="handlepayment"></i>
                  </div>
                  <!-- <div class="td min_width2">
                    <span class="mobile">订单号:</span>
                    <span class="value_right">{{item.sign}}</span>
                  </div>-->
                  <div class="td min_width2" :title="item.goods_name">
                    <span class="mobile">拼团名称:</span>
                    <span class="value_right">{{item.goods_name}}</span>
                  </div>
                  <div class="td">
                    <span class="mobile">类型:</span>
                    <!-- <span v-if=""
                      class="value_right"
                    >{{item.send_type=='1'?'自取':item.send_type=='3'?'送货上门':'快递'}}</span> -->
                    <span
                      class="value_right"
                    >{{item.send_type=='1'?'自取':item.send_type=='3'?'送货上门':'快递'}}</span>
                  </div>
                  <div class="td">
                    <span class="mobile">开团人数:</span>
                    <span class="value_right">{{item.groupNum}}/{{item.group_num}}</span>
                  </div>
                  <div class="td min_width2">
                    <span class="mobile">成团时间:</span>
                    <span class="value_right">{{item.funture_time*1000 | dataFilter(2)}}</span>
                  </div>
                  <div class="td min_width">
                    <span class="mobile">地址:</span>
                    <span class="value_right address">
                      <span>{{item.address}}</span>
                      <span>{{item.address_detail}}</span>
                    </span>
                  </div>
                  <div class="last_btn td table-li1">
                    <div class="data_btn btn_info" @click="DyamicDate(item.sign)">配置</div>
                  </div>
                </div>

                <div v-if="item.group&&item.clickstatus" class="paymentInf">
                  <ul class="user_list">
                    <li v-for="(items,index) in item.group" :key="index">
                      <div style="display: flex;flex-direction: row;align-items: center;">
                        <div>
                          <span>头像：</span>
                          <span>
                            <img :src="items.photo">
                          </span>
                        </div>
                        <div>
                          <span>下单时间：</span>
                          <span>{{items.order_time*1000 | dataFilter(2)}}</span>
                        </div>
                        <div>
                          <span>姓名：</span>
                          <span>{{items.buyer}}</span>
                        </div>
                        <div>
                          <span>手机号：</span>
                          <span>{{items.phone}}</span>
                        </div>
                        <div class="ads">
                          <span>地址：</span>
                          <span>{{items.address}}</span>
                        </div>
                      </div>
                      <div
                        v-if="item.is_group==0"
                        style="display: flex;flex-direction: column;width:100%;padding-left:20px"
                      >
                        <div
                          v-for="(eve,index) in items.goods"
                          :key="index"
                          style="display: flex;flex-direction: row;align-items: center;margin-top:20px"
                        >
                          <div style="display: flex;flex-direction: row;align-items: center;">
                            <span>图片：</span>
                            <span>
                              <img
                                style=" border-radius: 0;width:130px;height:75px"
                                :src="eve.goods_img"
                              >
                            </span>
                          </div>
                          <div style="margin-left:10px">
                            <span>名称：</span>
                            <span>{{eve.goods_name}}</span>
                          </div>
                          <div style="margin-left:10px">
                            <span>价格：</span>
                            <span style="color:#f2681c">￥{{eve.goods_price}}</span>
                          </div>
                          <div style="margin-left:10px">
                            <span>数量：</span>
                            <span>{{eve.goods_num}}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div class="empty" id="box" v-if="this.wait.data.length==0">该列表为空</div>
          <div class="pages" v-if="wait.data.length!='0'">
            <el-pagination
              layout="prev, pager, next, jumper"
              :pager-count="5"
              :page-count="wait.pageCount"
              :page-size="wait.page"
              @current-change="handlePage1"
              :current-page.sync="wait.pno"
              v-if="wait.pageCount!=0"
            ></el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane label="待发货" name="third" class="tabpane">
          <div class="table">
            <ul class="tabelheader thead">
              <li>
                <span class="table-li"></span>
                <!-- <span class="min_width2">订单号</span> -->
                <span class="min_width2">拼团名称</span>
                <span>类型</span>
                <span>开团人数</span>
                <span class="min_width">成团时间</span>
                <span class="min_width2">地址</span>
                <span>操作</span>
              </li>
            </ul>
            <ul class="tabelbody">
              <li v-for="(item,index) in waitShipments.data" :key="index">
                <div class="w-content">
                  <div class="td arrow td1">
                    <i
                      v-bind:class="item.clickstatus?'el-icon-arrow-down':'el-icon-arrow-right'"
                      @click="handlepayment(item.clickstatus,item.sign)"
                    ></i>
                  </div>
                  <!-- <div class="td min_width2">
                    <span class="mobile">订单号:</span>
                    <span class="value_right">2018102320230398598</span>
                  </div>-->
                  <div class="td min_width2" :title="item.goods_name">
                    <span class="mobile">拼团名称:</span>
                    <span class="value_right">{{item.goods_name}}</span>
                  </div>
                  <div class="td">
                    <span class="mobile">类型:</span>
                   <span
                      v-if="(item.group[0].order_type!=3)"
                      class="value_right"
                    >{{item.send_type=='1'?'自取':item.send_type=='3'?'送货上门':'快递'}}</span>
                    <span v-if="(item.group[0].order_type==3)" class="value_right">快递</span>
                  </div>
                  <div class="td">
                    <span class="mobile">已参团团人数:</span>
                    <span class="value_right">{{item.group.length}}</span>
                  </div>
                  <div class="td min_width2">
                    <span class="mobile">成团时间:</span>
                    <span class="value_right">{{item.success_time*1000 | dataFilter(2)}}</span>
                  </div>
                  <div class="td min_width">
                    <span class="mobile">地址:</span>
                    <span class="value_right address">
                      <span>{{item.address}}</span>
                      <span>{{item.address_detail}}</span>
                    </span>
                  </div>
                  <div class="operation">
                    <div
                      v-if="(item.delivery_status==true&&item.group[0].order_type!=3)"
                      class="data_btn btn_success"
                      @click="handleAll(item.sign)"
                    >一键发货</div>
                    <div
                      class="data_btn btn_success distance"
                      @click="handleprint(item.group_price,item.goods_price,item.send_type,item.goods_name,item.is_group,item.sign,item.group)"
                    >打印小票</div>
                  </div>
                  <!--<div class="last_btn td table-li1">
										<div class="data_btn btn_info">配置</div>
                  </div>-->
                </div>
                <div v-if="item.group&&item.clickstatus" class="paymentInf">
                  <ul class="user_list">
                    <li v-for="(items,index) in item.group" :key="index">
                      <div style="display: flex;flex-direction: row;align-items: center;">
                        <div>
                          <span>头像：</span>
                          <span>
                            <img :src="items.photo">
                          </span>
                        </div>
                        <div>
                          <span>下单时间：</span>
                          <span>{{items.order_time}}</span>
                        </div>
                        <div>
                          <span>姓名：</span>
                          <span>{{items.buyer}}</span>
                        </div>
                        <div>
                          <span>手机号：</span>
                          <span>{{items.phone}}</span>
                        </div>
                        <div class="ads">
                          <span>地址：</span>
                          <span>{{items.address}}</span>
                        </div>
                      </div>
                      <div v-if="items.fictitious_status == 1" class="virtual">虚拟数据</div>
                      <div class="btn">
                        <div
                          v-if="(items.print_status==1)"
                          class="data_btn btn_info"
                          @click="tosendgoods(items.order_id)"
                        >发 货</div>
                        <div
                          class="data_btn btn_info print_btn"
                          @click="goodsprint(items.order_id,item.is_group==0? item.goods_price:item.group_price,item.goods_price,items.phone,items.buyer,items.address,item.send_type,item.goods_name,item.is_group,item.sign,items.order_time,items.message,items.day_times,items.goods)"
                        >小 票</div>
                      </div>
                      <div
                        v-if="item.is_group==0"
                        style="display: flex;flex-direction: column;width:100%;padding-left:20px"
                      >
                        <div
                          v-for="(eve,index) in items.goods"
                          :key="index"
                          style="display: flex;flex-direction: row;align-items: center;margin-top:20px"
                        >
                          <div style="display: flex;flex-direction: row;align-items: center;">
                            <span>图片：</span>
                            <span>
                              <img
                                style=" border-radius: 0;width:130px;height:75px"
                                :src="eve.goods_img"
                              >
                            </span>
                          </div>
                          <div style="margin-left:10px">
                            <span>名称：</span>
                            <span>{{eve.goods_name}}</span>
                          </div>
                          <div style="margin-left:10px">
                            <span>价格：</span>
                            <span style="color:#f2681c">￥{{eve.goods_price}}</span>
                          </div>
                          <div style="margin-left:10px">
                            <span>数量：</span>
                            <span>{{eve.goods_num}}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <!-- 发货弹出框 -->
            <el-dialog
              title="发货"
              :visible.sync="tosend"
              label-width="80px"
              style="width:100%;margin-top:100px"
              :modal-append-to-body="false"
            >
              <div class="radios">
                <el-radio v-model="send_type" label="1">自取</el-radio>
                <el-radio v-model="send_type" label="2">快递</el-radio>
                <el-radio v-model="send_type" label="3">送货上门</el-radio>
              </div>
              <div>
                <el-form ref="sendinfo" :model="sendinfo" v-if="send_type==2">
                  <el-form-item label=" 选择快递 " class="courier">
                    <el-select v-model="sendinfo.express" placeholder="请选择快递" style="width:40%">
                      <el-option label="申通" value="申通"></el-option>
                      <el-option label="圆通" value="圆通"></el-option>
                      <el-option label="中通" value="中通"></el-option>
                      <el-option label="韵达" value="韵达"></el-option>
                      <el-option label="天天" value="天天"></el-option>
                      <el-option label="百世汇通" value="百世汇通"></el-option>
                      <el-option label="京东快递" value="京东快递"></el-option>
                      <el-option label="EMS" value="EMS"></el-option>
                      <el-option label="德邦" value="德邦"></el-option>
                      <el-option label="全峰" value="全峰"></el-option>
                      <el-option label="中铁快运" value="中铁快运"></el-option>
                      <el-option label="如风达" value="如风达"></el-option>
                      <el-option label="宅急送" value="宅急送"></el-option>
                      <el-option label="其它" value="其它"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="填写快递单号" class="courier">
                    <el-input placeholder="请填写快递单号" v-model="sendinfo.number" class="order_number">
                      <el-button slot="append" @click="sys_click()">扫一扫</el-button>
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>
              <!--<div class="express" v-if="send_type==2">是否呼叫达达配送员取货配送？</div>
              <div class="express" v-if="send_type==3">是否确认自己进行配送？</div>-->
              <div>
                <div style="width:60%;display:inline-block;" class="comfirm_option">
                  <div style="display:flex;justify-content:space-between;">
                    <button class="data_btn btn_info" @click="tosend=false">取消</button>
                    <button class="data_btn btn_success" @click="onSubmit">确认</button>
                  </div>
                </div>
              </div>
            </el-dialog>
          </div>
          <div class="empty" v-if="this.waitShipments.data.length==0">该列表为空</div>
          <div class="pages" v-if="waitShipments.data.length!='0'">
            <el-pagination
              layout="prev, pager, next, jumper"
              :pager-count="5"
              :page-count="waitShipments.pageCount"
              :page-size="waitShipments.page"
              @current-change="handlePage4"
              :current-page.sync="waitShipments.pno"
            ></el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane label="待收货" name="fifth" class="tabpane">
          <div class="table">
            <ul class="tabelheader thead">
              <li>
                <span class="table-li"></span>
                <!-- <span class="min_width2">订单号</span> -->
                <span class="min_width2">拼团名称</span>
                <span>类型</span>
                <span>开团人数</span>
                <span class="min_width">成团时间</span>
                <span class="min_width2">地址</span>
                <span>操作</span>
              </li>
            </ul>
            <ul class="tabelbody">
              <li v-for="(item,index) in waitReceiving.data" :key="index">
                <div class="w-content">
                  <div class="td arrow td1">
                    <i
                      v-bind:class="item.clickstatus?'el-icon-arrow-down':'el-icon-arrow-right'"
                      @click="handlepayment(item.clickstatus,item.sign)"
                    ></i>
                  </div>
                  <!-- <div class="td min_width2">
                    <span class="mobile">订单号:</span>
                    <span class="value_right">2018102320230398598</span>
                  </div>-->
                  <div class="td min_width2" :title="item.goods_name">
                    <span class="mobile">拼团名称:</span>
                    <span class="value_right">{{item.goods_name}}</span>
                  </div>
                  <div class="td">
                    <span class="mobile">类型:</span>
                    <span
                      class="value_right"
                    >{{item.send_type=='1'?'自取':item.send_type=='3'?'送货上门':'快递'}}</span>
                  </div>
                  <div class="td">
                    <span class="mobile">成团人数:</span>
                    <span class="value_right">{{item.group_num}}</span>
                  </div>
                  <div class="td min_width2">
                    <span class="mobile">成团时间:</span>
                    <span class="value_right">{{item.success_time*1000 | dataFilter(2)}}</span>
                  </div>
                  <div class="td min_width">
                    <span class="mobile">地址:</span>
                    <span class="value_right address">
                      <span>{{item.address}}</span>
                      <span>{{item.address_detail}}</span>
                    </span>
                  </div>
                  <!-- <div class="operation"> -->
                  <div
                    class="data_btn btn_success distance"
                    @click="handleprint(item.group_price,item.goods_price,item.send_type,item.goods_name,item.is_group,item.sign,item.group)"
                  >打印小票</div>
                  <!-- </div> -->
                </div>
                <div v-if="item.group&&item.clickstatus" class="paymentInf">
                  <ul class="user_list">
                    <li v-for="(items,index) in item.group" :key="index">
                      <div style="display: flex;flex-direction: row;align-items: center;">
                        <div>
                          <span>头像：</span>
                          <span>
                            <img :src="items.photo">
                          </span>
                        </div>
                        <div>
                          <span>下单时间：</span>
                          <span>{{items.order_time}}</span>
                        </div>
                        <div>
                          <span>姓名：</span>
                          <span>{{items.buyer}}</span>
                        </div>
                        <div>
                          <span>手机号：</span>
                          <span>{{items.phone}}</span>
                        </div>
                        <div class="ads">
                          <span>地址：</span>
                          <span>{{items.address}}</span>
                        </div>
                        <div v-if="items.fictitious_status == 1" class="virtual">虚拟数据</div>
                        <div class="btn">
                          <div
                            class="data_btn btn_info print_btn"
                            @click="goodsprint(items.order_id,item.is_group==0? item.goods_price:item.group_price,item.goods_price,items.phone,items.buyer,items.address,item.send_type,item.goods_name,item.is_group,item.sign,items.order_time,items.message,items.day_times,items.goods)"
                          >小 票</div>
                        </div>
                      </div>
                      <div
                        v-if="item.is_group==0"
                        style="display: flex;flex-direction: column;width:100%;padding-left:20px"
                      >
                        <div
                          v-for="(eve,index) in items.goods"
                          :key="index"
                          style="display: flex;flex-direction: row;align-items: center;margin-top:20px"
                        >
                          <div style="display: flex;flex-direction: row;align-items: center;">
                            <span>图片：</span>
                            <span>
                              <img
                                style=" border-radius: 0;width:130px;height:75px"
                                :src="eve.goods_img"
                              >
                            </span>
                          </div>
                          <div style="margin-left:10px">
                            <span>名称：</span>
                            <span>{{eve.goods_name}}</span>
                          </div>
                          <div style="margin-left:10px">
                            <span>价格：</span>
                            <span style="color:#f2681c">￥{{eve.goods_price}}</span>
                          </div>
                          <div style="margin-left:10px">
                            <span>数量：</span>
                            <span>{{eve.goods_num}}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div class="empty" v-if="this.waitReceiving.data.length==0">该列表为空</div>
          <div class="pages" v-if="waitReceiving.data.length!='0'">
            <el-pagination
              layout="prev, pager, next, jumper"
              :pager-count="5"
              :page-count="waitReceiving.pageCount"
              :page-size="waitReceiving.page"
              @current-change="handlePage5"
              :current-page.sync="waitReceiving.pno"
            ></el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane label="已完成" name="sixth" class="tabpane">
          <div class="table">
            <ul class="tabelheader thead">
              <li>
                <span class="table-li"></span>
                <!-- <span class="min_width2">订单号</span> -->
                <span class="min_width2">拼团名称</span>
                <span>类型</span>
                <span>开团人数</span>
                <span class="min_width">成团时间</span>
                <span class="min_width2">地址</span>
              </li>
            </ul>
            <ul class="tabelbody">
              <li v-for="(item,index) in alreadly.data" :key="index">
                <div class="w-content">
                  <div class="td arrow td1">
                    <i
                      v-bind:class="item.clickstatus?'el-icon-arrow-down':'el-icon-arrow-right'"
                      @click="handlepayment(item.clickstatus,item.sign)"
                    ></i>
                  </div>
                  <!-- <div class="td min_width2">
                    <span class="mobile">订单号:</span>
                    <span class="value_right">2018102320230398598</span>
                  </div>-->
                  <div class="td min_width2" :title="item.goods_name">
                    <span class="mobile">拼团名称:</span>
                    <span class="value_right">{{item.goods_name}}</span>
                  </div>
                  <div class="td">
                    <span class="mobile">类型:</span>
                    <span
                      class="value_right"
                    >{{item.send_type=='1'?'自取':item.send_type=='3'?'送货上门':'快递'}}</span>
                  </div>
                  <div class="td">
                    <span class="mobile">开团人数:</span>
                    <span class="value_right">{{item.group_num}}</span>
                  </div>
                  <div class="td min_width2">
                    <span class="mobile">成团时间:</span>
                    <span class="value_right">{{item.success_time*1000 | dataFilter(2)}}</span>
                  </div>
                  <div class="td min_width">
                    <span class="mobile">地址:</span>
                    <span class="value_right address">
                      <span>{{item.address}}</span>
                      <span>{{item.address_detail}}</span>
                    </span>
                  </div>
                </div>
                <div v-if="item.group&&item.clickstatus" class="paymentInf">
                  <ul class="user_list">
                    <li v-for="(items,index) in item.group" :key="index">
                      <div style="display: flex;flex-direction: row;align-items: center;">
                        <div>
                          <span>头像：</span>
                          <span>
                            <img :src="items.photo">
                          </span>
                        </div>
                        <div>
                          <span>下单时间：</span>
                          <span>{{items.order_time}}</span>
                        </div>
                        <div>
                          <span>姓名：</span>
                          <span>{{items.buyer}}</span>
                        </div>
                        <div>
                          <span>手机号：</span>
                          <span>{{items.phone}}</span>
                        </div>
                        <div class="ads">
                          <span>地址：</span>
                          <span>{{items.address}}</span>
                        </div>
                        <div v-if="items.fictitious_status == 1" class="virtual">虚拟数据</div>
                      </div>
                      <div
                        v-if="item.is_group==0"
                        style="display: flex;flex-direction: column;width:100%;padding-left:20px"
                      >
                        <div
                          v-for="(eve,index) in items.goods"
                          :key="index"
                          style="display: flex;flex-direction: row;align-items: center;margin-top:20px"
                        >
                          <div style="display: flex;flex-direction: row;align-items: center;">
                            <span>图片：</span>
                            <span>
                              <img
                                style=" border-radius: 0;width:130px;height:75px"
                                :src="eve.goods_img"
                              >
                            </span>
                          </div>
                          <div style="margin-left:10px">
                            <span>名称：</span>
                            <span>{{eve.goods_name}}</span>
                          </div>
                          <div style="margin-left:10px">
                            <span>价格：</span>
                            <span style="color:#f2681c">￥{{eve.goods_price}}</span>
                          </div>
                          <div style="margin-left:10px">
                            <span>数量：</span>
                            <span>{{eve.goods_num}}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div class="empty" v-if="this.alreadly.data.length==0">该列表为空</div>
          <div class="pages" v-if="alreadly.data.length!='0'">
            <el-pagination
              layout="prev, pager, next, jumper"
              :pager-count="5"
              :page-count="alreadly.pageCount"
              :page-size="alreadly.page"
              @current-change="handlePage6"
              :current-page.sync="alreadly.pno"
            ></el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane label="失败团" name="fourth" class="tabpane">
          <div class="table">
            <ul class="tabelheader thead">
              <li>
                <span class="table-li"></span>
                <!-- <span class="min_width2">订单号</span> -->
                <span class="min_width2">拼团名称</span>
                <span>类型</span>
                <span>开团人数</span>
                <span class="min_width">开团时间</span>
                <span class="min_width2">地址</span>
                <!--<span>操作</span>-->
              </li>
            </ul>
            <ul class="tabelbody">
              <li v-for="(item,index) in reduse.data" :key="index">
                <div class="w-content">
                  <div class="td arrow td1">
                    <i
                      v-bind:class="item.clickstatus?'el-icon-arrow-down':'el-icon-arrow-right'"
                      @click="handlepayment(item.clickstatus,item.sign)"
                    ></i>
                  </div>
                  <!-- <div class="td min_width2">
                    <span class="mobile">订单号:</span>
                    <span class="value_right">2018102320230398598</span>
                  </div>-->
                  <div class="td min_width2" :title="item.goods_name">
                    <span class="mobile">拼团名称:</span>
                    <span class="value_right">{{item.goods_name}}</span>
                  </div>
                  <div class="td">
                    <span class="mobile">类型:</span>
                    <span
                      class="value_right"
                    >{{item.send_type=='1'?'自取':item.send_type=='3'?'送货上门':'快递'}}</span>
                  </div>
                  <div class="td">
                    <span class="mobile">开团人数:</span>
                    <span class="value_right">{{item.groupNum}}/{{item.group_num}}</span>
                  </div>
                  <div class="td min_width2">
                    <span class="mobile">开团时间:</span>
                    <span class="value_right">{{item.create_time*1000 | dataFilter(2)}}</span>
                  </div>
                  <div class="td min_width">
                    <span class="mobile">地址:</span>
                    <span class="value_right address">
                      <span>{{item.address}}</span>
                      <span>{{item.address_detail}}</span>
                    </span>
                  </div>
                  <!--<div class="last_btn td table-li1">
										<div class="data_btn btn_info">配置</div>
                  </div>-->
                </div>
                <div v-if="item.group&&item.clickstatus" class="paymentInf">
                  <ul class="user_list">
                    <li v-for="(items,index) in item.group" :key="index">
                      <div style="display: flex;flex-direction: row;align-items: center;">
                        <div>
                          <span>头像：</span>
                          <span>
                            <img :src="items.photo">
                          </span>
                        </div>
                        <div>
                          <span>下单时间：</span>
                          <span>{{items.order_time*1000 | dataFilter(2)}}</span>
                        </div>
                        <div>
                          <span>姓名：</span>
                          <span>{{items.buyer}}</span>
                        </div>
                        <div>
                          <span>手机号：</span>
                          <span>{{items.phone}}</span>
                        </div>
                        <div class="ads">
                          <span>地址：</span>
                          <span>{{items.address}}</span>
                        </div>
                      </div>
                      <div
                        v-if="item.is_group==0"
                        style="display: flex;flex-direction: column;width:100%;padding-left:20px"
                      >
                        <div
                          v-for="(eve,index) in items.goods"
                          :key="index"
                          style="display: flex;flex-direction: row;align-items: center;margin-top:20px"
                        >
                          <div style="display: flex;flex-direction: row;align-items: center;">
                            <span>图片：</span>
                            <span>
                              <img
                                style=" border-radius: 0;width:130px;height:75px"
                                :src="eve.goods_img"
                              >
                            </span>
                          </div>
                          <div style="margin-left:10px">
                            <span>名称：</span>
                            <span>{{eve.goods_name}}</span>
                          </div>
                          <div style="margin-left:10px">
                            <span>价格：</span>
                            <span style="color:#f2681c">￥{{eve.goods_price}}</span>
                          </div>
                          <div style="margin-left:10px">
                            <span>数量：</span>
                            <span>{{eve.goods_num}}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div class="empty" v-if="this.reduse.data.length==0">该列表为空</div>
          <div class="pages" v-if="reduse.data.length!='0'">
            <el-pagination
              layout="prev, pager, next, jumper"
              :pager-count="5"
              :page-count="reduse.pageCount"
              :page-size="reduse.page"
              @current-change="handlePage3"
              :current-page.sync="reduse.pno"
            ></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script type="text/javascript">
import "@/assets/css/distribution.css";
import {
  send,
  deliver,
  printGroupSignture,
  bulkPrint,
  newWaitGroupOrder,
  cash_group_detail,
  waitGroupAdmin,
  alreadlyGroupAdmin,
  reduseGroupAdmin,
  printUserAll,
  getGroupUserDetail,
  get_plat_info
} from "@/utils/api";
import * as store from "@/utils/sdk/store";
import pics from "@/assets/images/avatar.png";
import pic from "@/assets/images/downsimg.png";
import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      atpresent: "",
      send_type: "3",
      tosend: false,
      details: {
        user_id: "",
        name: "",
        waitGroup: ""
      },
      activeName: "second", //当前选择的导航
      cash_group: {
        data: [],
        pno: 1,
        page: 10,
        pageCount: 3
      },
      wait: {
        //待拼团数据
        data: [],
        pno: 1,
        page: 10,
        pageCount: 3
      },
      waitShipments: {
        //待发货数据
        data: [],
        pno: 1,
        page: 10,
        pageCount: 3
      },
      waitReceiving: {
        //待收货数据
        data: [],
        pno: 1,
        page: 10,
        pageCount: 3
      },
      alreadly: {
        //已完成数据
        data: [],
        pno: 1,
        page: 10,
        pageCount: 3
      },
      reduse: {
        //失败团数据
        data: [],
        pno: 1,
        page: 10,
        pageCount: 3
      },
      sendinfo: {
        express: "",
        number: ""
      }
    };
  },

  methods: {
      //总一键发货
    AkeyDelivery() {
      var shipments = "";
      this.waitShipments.data.forEach(item => {
        if (item.delivery_status) {
          shipments += item.sign + ",";
        }
      });
      if (shipments.length > 0) {
        shipments = shipments.substr(0, shipments.length - 1);
      }
      deliver({
        order_type:0,
        user_id: this.details.user_id,
        shop_id: store.get("currentshopid")
        // sign: shipments, //一件发货暂无快递
        // shipping_name:
        //   this.sendinfo.express == "" ? "申通" : this.sendinfo.express,
        // shipping_code: this.sendinfo.number == "" ? "1" : this.sendinfo.number
      }).then(res => {
        if (res.error_code == "1000") {
          this.$message.success(res.msg);
          this.handlePage4()
          // this.notpostrequest(this.notpost.pno);
          // if(this.notpost.data.length<=1&&this.notpost.pno>1){
          // 	this.notpostrequest(this.notpost.pno-1)
          // }else{
          // 	this.notpostrequest(this.notpost.pno)
          // }
          //this.notpostrequest(this.notpost.pno)
          // this.notreceiveRequest(this.notreceive.pno)
        }
      });
      console.log(shipments, "1111");
    },
    //打开扫一扫
    sys_click() {
      get_plat_info({
        url: location.href,
        shop_id:store.get("currentshopid")
       }).then(res => {
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.appid, // 必填，公众号的唯一标识
          timestamp: res.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.noncestr, // 必填，生成签名的随机串
          signature: res.data.signature, // 必填，签名
          jsApiList: ["checkJsApi", "scanQRCode"] // 必填，需要使用的JS接口列表
        });

        wx.error(res => {
          this.$message.error("出错了" + res.errMsg);
        });
        wx.ready(function() {
          wx.checkJsApi({
            jsApiList: ["scanQRCode"]
          });
        });
        wx.scanQRCode({
          needResult: 1,
          scanType: ["qrCode", "barCode"],
          success: function(res) {
            var result = res.resultStr.split(",")[1];
            window.location.href =
              "https://www.linwushop.com/business/group/details?code=" +
              result;
          }
        });
      });
    },
    handlepayment(clickstatus, sign) {
      if (this.atpresent == "待发货") {
        this.waitShipments.data.forEach(item => {
          if (item.sign == sign) {
            getGroupUserDetail({
              sign: sign
            }).then(res => {
              item.group = res.data.data;
              item.clickstatus = !item.clickstatus;
            });
          }
        });
        console.log(this.waitShipments.data);
      } else if (this.atpresent == "待收货") {
        this.waitReceiving.data.forEach(item => {
          if (item.sign == sign) {
            getGroupUserDetail({
              sign: sign,
              shipping_status: "1"
            }).then(res => {
              item.group = res.data.data;
              item.clickstatus = !item.clickstatus;
            });
          }
        });
      } else if (this.atpresent == "已完成") {
        this.alreadly.data.forEach(item => {
          if (item.sign == sign) {
            getGroupUserDetail({
              sign: sign,
              shipping_status: "2",
              order_status: "4"
            }).then(res => {
              item.group = res.data.data;
              item.clickstatus = !item.clickstatus;
            });
          }
        });
        console.log(this.finish.data);
      } else if (this.atpresent == "失败") {
        this.reduse.data.forEach(item => {
          if (item.sign == sign) {
            getGroupUserDetail({
              sign: sign,
              status: "2"
            }).then(res => {
              item.group = res.data.data;
              item.clickstatus = !item.clickstatus;
            });
          }
        });
      }
    },
    //一键打印
    allhandleprint(order_type) {
      printUserAll({
        order_type:order_type,
        user_id: this.details.user_id,
        shop_id: store.get("currentshopid")
      }).then(res => {
        this.handlePage5();
      });
    },

    //单独打印小票
    goodsprint(
      order_id,
      pay_price,
      goods_price,
      phone,
      buyer,
      address,
      send_type,
      goods_name,
      is_group,
      sign,
      order_time,
      message,
      day_times,
      goods
    ) {

      // 单独打印小票
      printGroupSignture({
        order: goods,
        day_times: day_times,
        shop_id: store.get("currentshopid"),
        order_id: order_id,
        pay_price: pay_price,
        goods_price: goods_price,
        phone: phone,
        message: message,
        order_time: order_time,
        name: buyer,
        address: address,
        order_type: send_type,
        goods_name: goods_name,
        is_group: is_group,
        sign: sign
      }).then(res => {
        this.handledata4(this.waitShipments.pno, this.waitShipments.page);
      });
    },
    onSubmit() {
      //单独发货提交按钮
      this.tosend = false;
      send({
        order_id: this.order_id,
        shipping_name:
          this.sendinfo.express == "" ? "申通" : this.sendinfo.express, //只有选择快递时才有快递名称和快递单号，其他方式，默认为空
        shipping_code:
          this.sendinfo.number == "" ? "15221458186" : this.sendinfo.number
      }).then(res => {
        if (res.error_code == "1000") {
          this.$message.success("已发货");
          this.handledata4(this.waitShipments.pno, this.waitShipments.page);
          this.handledata5(this.waitReceiving.pno, this.waitReceiving.page);
        }
      });
    },
    tosendgoods(id) {
      //点击发货显示弹窗
      this.tosend = true;
      this.order_id = id;
    },
    handleAll(sign) {
      //一键发货
      deliver({
        sign: sign, //一件发货暂无快递
        shipping_name:
          this.sendinfo.express == "" ? "申通" : this.sendinfo.express,
        shipping_code: this.sendinfo.number == "" ? "1" : this.sendinfo.number
      }).then(res => {
        if (res.error_code == "1000") {
          this.$message.success("已发货");
          this.handledata4(this.waitShipments.pno, this.waitShipments.page);
          this.handledata5(this.waitReceiving.pno, this.waitReceiving.page);
        }
      });
    },
    handleprint(
      pay_price,
      goods_price,
      send_type,
      goods_name,
      is_group,
      sign,
      group
    ) {
      //一键打印
      bulkPrint({
        shop_id: store.get("currentshopid"),
        pay_price: pay_price,
        goods_price: goods_price,
        order_type: send_type,
        goods_name: goods_name,
        is_group: is_group,
        sign: sign
      }).then(res => {
        this.handledata4(this.waitShipments.pno, this.waitShipments.page);
      });
    },
    DyamicDate(sign) {
      this.$router.push({
        path: "/business/group/DynamicData",
        query: { sign: sign }
      });
    },
    handledata0(page, limit) {
      cash_group_detail({
        user_id: this.details.user_id,
        shop_id: store.get("currentshopid"),
        limit: limit,
        page: page
      }).then(res => {
        this.cash_group.data = res.detail;
        this.cash_group.pageCount = res.totalPage;
        this.cash_group.pno = Number(res.page);
      });
    },
    handledata1(page, limit) {
      //待成团数据
      waitGroupAdmin({
        user_id: this.details.user_id,
        shop_id: store.get("currentshopid"),
        limit: limit,
        page: page
      }).then(res => {
        if (res.error_code == "1") {
          res.data.group.forEach(item => {
            item.clickstatus = false;
          });
          this.wait.data = res.data.group;
          this.wait.pageCount = res.data.totalPage;
          this.wait.pno = Number(res.data.page);
        }
      });
    },
    // handledata2(page, limit) {
    //   //已拼团数据
    //   alreadlyGroupAdmin({
    //     user_id: this.details.user_id,
    //     shop_id: store.get("currentshopid"),
    //     limit: limit,
    //     page: page
    //   }).then(res => {
    //     //已成团数据
    //     if (res.error_code == "1") {
    //       this.alreadly.data = res.data.group;
    //       this.alreadly.pageCount = res.data.totalPage;
    //       this.alreadly.pno = Number(res.data.page);
    //     }
    //   });
    // },
    handledata3(page, limit) {
      reduseGroupAdmin({
        user_id: this.details.user_id,
        shop_id: store.get("currentshopid"),
        limit: limit,
        page: page
      }).then(res => {
        //失败团数据
        if (res.error_code == "1") {
          res.data.group.forEach(item => {
            item.clickstatus = false;
          });
          this.reduse.data = res.data.group;
          this.reduse.pageCount = res.data.totalPage;
          this.reduse.pno = Number(res.data.page);
        }
      });
    },
    handledata4(page, limit) {
      //待发货数据
      alreadlyGroupAdmin({
        user_id: this.details.user_id,
        shop_id: store.get("currentshopid"),
        limit: limit,
        page: page
      }).then(res => {
        if (res.data.data != "") {
          res.data.data.forEach(item => {
            item.clickstatus = false;
          });
          this.waitShipments.data = res.data.data;
          this.waitShipments.pageCount = res.data.totalPage;
          this.waitShipments.pno = Number(res.data.page);
        }
        // console.log(this.waitShipments.data, res.data.data, "1111");
      });
    },
    handledata5(page, limit) {
      //待收货数据
      alreadlyGroupAdmin({
        user_id: this.details.user_id,
        shop_id: store.get("currentshopid"),
        limit: limit,
        shipping_status: 1,
        page: page
      }).then(res => {
        if (res.data.data != "") {
          res.data.data.forEach(item => {
            item.clickstatus = false;
          });
          this.waitReceiving.data = res.data.data;
          this.waitReceiving.pageCount = res.data.totalPage;
          this.waitReceiving.pno = Number(res.data.page);
        }
        // console.log(this.waitReceiving.data, res.data.data, "2222");
      });
    },

    handledata6(page, limit) {
      //已完成数据
      alreadlyGroupAdmin({
        user_id: this.details.user_id,
        shop_id: store.get("currentshopid"),
        limit: limit,
        page: page,
        shipping_status: 2,
        order_status: 4
      }).then(res => {
        if (res.data.data != "") {
          res.data.data.forEach(item => {
            item.clickstatus = false;
          });
          this.alreadly.data = res.data.data;
          this.alreadly.pageCount = res.data.totalPage;
          this.alreadly.pno = Number(res.data.page);
        }
        // console.log(this.alreadly.data, res.data.data, "3333");
      });
    },

    back() {
      this.$router.go(-1);
      store.set("detailsPagination", "");
    },
    handleChanges(tab, event) {
      if (tab.paneName == "first") {
        this.handlePage0();
        this.atpresent = "交易明细";
      } else if (tab.paneName == "second") {
        this.handlePage1();
        this.atpresent = "待成团";
      } else if (tab.paneName == "third") {
        this.handlePage4();
        this.atpresent = "待发货";
      } else if (tab.paneName == "fifth") {
        this.handlePage5();
        this.atpresent = "待收货";
      } else if (tab.paneName == "sixth") {
        this.handlePage6();
        this.atpresent = "已完成";
      } else if (tab.paneName == "fourth") {
        this.handlePage3();
        this.atpresent = "失败团";
      }
    },
    handlePage0() {
      this.handledata0(this.cash_group.pno, this.cash_group.page);
    },
    handlePage1(e) {
      store.set("detailsPagination", this.wait.pno);
      // console.log("tiaozhuan", store.get("detailsPagination"));
      this.handledata1(this.wait.pno, this.wait.page);
    },
    // handlePage2() {
    //   this.handledata2(this.alreadly.pno, this.alreadly.page);
    // },
    handlePage3() {
      this.handledata3(this.reduse.pno, this.reduse.page);
    },
    handlePage4() {
      this.handledata4(this.waitShipments.pno, this.waitShipments.page);
    },
    handlePage5() {
      this.handledata5(this.waitReceiving.pno, this.waitReceiving.page);
    },
    handlePage6() {
      this.handledata6(this.alreadly.pno, this.alreadly.page);
    }
  },

  created() {
    if (store.get("detailsPagination")) {
      this.wait.pno = store.get("detailsPagination");
    }
    // console.log('111',this.cash_group.pno)
    //     if(this.$route.query.detailsPagination){
    // this.wait.pno=this.$route.query.detailsPagination
    //     }
    this.details.user_id = this.$route.query.id;
    this.details.name = this.$route.query.name;
    this.details.waitGroup = this.$route.query.waitGroup;
    // this.handledata0(this.cash_group.pno, this.cash_group.page);
    this.handledata1(this.wait.pno, this.wait.page);

    // this.handledata3(this.reduse.pno, this.reduse.page);
    // this.handledata4(this.waitShipments.pno, this.waitShipments.page);
    // this.handledata5(this.waitReceiving.pno, this.waitReceiving.page);
    // this.handledata6(this.alreadly.pno, this.alreadly.page);
  }
};
</script>
<style lang="stylus" scoped>
.operation {
  display: flex;
  flex-direction: row;
  margin-left: 20px;
  width: 150px;
}

.distance {
  margin-left: 5px;
}

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

.details .paymentInf span {
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

.tabs .paymentInf span:last-child {
  text-align: left;
}

.paymentInf {
  padding-left: 0;
}

.paymentInf li {
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px dashed #ccc;
}

.paymentInf li>div:first-child {
  min-width: 105px;
}

.paymentInf li>div:nth-child(2) {
  min-width: 215px;
}

.paymentInf li>div:nth-child(3) {
  min-width: 145px;
}

.paymentInf li>div:nth-child(4) {
  min-width: 175px;
}

.paymentInf li>div {
  display: flex;
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

.address {
  display: flex;
  flex-flow: column nowrap;
}

.address span {
  line-height: 25px;
}

.tabpane .table .paymentInf li {
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

.paymentInf li:last-child {
  border: none;
}

.paymentInf li:first-child {
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
  .paymentInf li {
    padding: 15px 0;
    display: block;
    border-bottom: 1px dashed #ccc;
  }

  .tabpane .table .mobile, .tabpane .table li .mobile {
    width: 25%;
  }

  .paymentInf li>div {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin: 5px 0px;
  }

  .tabpane .table .paymentInf li {
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
