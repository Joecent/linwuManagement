<template>
  <div class="member_page">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="待发货" name="notpost" class="tabpane">
        <!-- <div class="data_btn btn_success" style="margin-bottom:15px" @click="AkeyDelivery">一键发货</div> -->
        <div class="table">
          <ul class="tabelheader thead">
            <li>
              <span class="table-li"></span>
              <span class="min_width4">订单号</span>
              <span class="min_width3">商品信息</span>
              <span class="group_info">团长信息</span>
              <span class="min_width2">下单时间</span>
              <span>操作</span>
            </li>
          </ul>
          <ul class="tabelbody">
            <li v-for="(item,index) in notpost.data" :key="index">
              <div class="w-content">
                <div class="td arrow td1">
                  <i
                    v-bind:class="item.clickstatus?'el-icon-arrow-down':'el-icon-arrow-right'"
                    @click="handlepayment(item.clickstatus,item.sign)"
                  ></i>
                </div>
                <div class="td min_width4">
                  <span class="mobile">订单号:</span>
                  <span class="value_right">2018102320230398598</span>
                </div>
                <div class="td min_width3">
                  <div class="shop_info">
                    <div class="goodsimg">
                      <img :src="item.goods_img">
                    </div>
                    <div class="goodsinfo">
                      <div class="goodsname">{{item.goods_name}}</div>
                      <div class="pay">
                        <span
                          class="pay_money"
                        >￥{{item.goods_cost}}</span>
                        <span
                          class="pay_sum"
                        >/ 数量：{{item.goods_num}}</span>
                      </div>
                       <div
                        class="send_type"
                      >店主：{{item.group_name}}</div> 

                    </div>
                  </div>
                </div>
                <div class="td group_info">
                  <div class="customer_info">
                    <span>买家姓名:</span>
                    <span>{{item.buyer}}</span>
                  </div>
                  <div class="customer_info">
                    <span>联系方式</span>
                    <span>{{item.phone}}</span>
                  </div>
                  <div class="address">地址:{{item.address}}</div>
                </div>
                <div class="td min_width2">
                  <div>
                    <span class="mobile create_time"下单时间：</span>
                    <span class="value_right">{{item.order_time}}</span>
                  </div>
                </div>
                <div class="last_btn td table-li1">
                  <div
                    class="data_btn btn_success"
                    @click="tosendgoods(item.id)"
                  >发货</div>
                  <!-- <div
                    class="data_btn btn_success"
                    @click="handleprint(item.is_group==0? item.goods_price:item.group_price,item.goods_price,item.send_type,item.goods_name,item.is_group,item.sign,item.group)"
                  >打印小票</div> -->
                </div>
              <!-- 发货弹出框 -->
            <el-dialog
              title="发货"
              :visible.sync="tosend"
              label-width="80px"
              style="width:100%;margin-top:100px"
              :modal-append-to-body="false"
            >
              <!-- <div class="radios">
                <el-radio v-model="send_type" label="1">自取</el-radio>
                <el-radio v-model="send_type" label="2">快递</el-radio>
                <el-radio v-model="send_type" label="3">送货上门</el-radio>
              </div> -->
              <div>
                <el-form ref="sendinfo" :model="sendinfo" >
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
              <!-- <div v-if="item.group&&item.clickstatus" class="paymentInf">
                <ul class="user_list">
                  <li v-for="(items,index) in item.group" :key="index">
                    <div>
                      <div style="display: flex;flex-direction: row;align-items: center;">
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
                        <span>拼团姓名：</span>
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
                    </div>
                    <div v-if="item.is_group==0" style="display: flex;flex-direction: column;width:100%;padding-left:20px">
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
              </div> -->
            </li>
          </ul>
          
        </div>
        <div class="empty" id="box" v-if="this.notpost.data.length==0">该列表为空</div>
        <div class="pages" v-if="this.notpost.data.length!='0'">
          <el-pagination
            layout="prev, pager, next, jumper"
            :pager-count="5"
            :page-count="notpost.pageCount"
            :page-size="notpost.page"
            @current-change="handlePage1"
            :current-page.sync="notpost.pno"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <!-- 待收货列表 -->
      <el-tab-pane label="待收货" name="notreceive" class="tabpane">
        <div class="table">
          <ul class="tabelheader thead">
            <li>
              <span class="table-li"></span>
              <span class="min_width4">订单号</span>
              <span class="min_width3">商品信息</span>
              <span class="group_info">买家信息</span>
              <span class="min_width2">下单时间</span>
              <span>操作</span>
            </li>
          </ul>
          <ul class="tabelbody">
            <li v-for="(item,index) in notreceive.data" :key="index">
              <div class="w-content">
                <div class="td arrow td1">
                  <i
                    v-bind:class="item.clickstatus?'el-icon-arrow-down':'el-icon-arrow-right'"
                    @click="handlepayment(item.clickstatus,item.sign)"
                  ></i>
                </div>
                <div class="td min_width4">
                  <span class="mobile">订单号:</span>
                  <span class="value_right">2018102320230398598</span>
                </div>
                <div class="td min_width3">
                  <div class="shop_info">
                    <div class="goodsimg">
                      <img :src="item.goods_img">
                    </div>
                    <div class="goodsinfo">
                      <div class="goodsname">{{item.goods_name}}</div>
                      <div class="pay">
                        <span
                          class="pay_money"
                        >￥{{item.goods_cost}}</span>
                        <span
                          class="pay_sum"
                        >/ 数量：{{item.goods_num}}</span>
                      </div>
                       <div class="send_type">店主：{{item.group_name}}</div> 
                      <!-- <div
                        class="send_type"
                      >{{item.send_type=='1'?'自取':item.send_type=='2'?'快递':'送货上门'}}</div> -->
                    </div>
                  </div>
                </div>
                <div class="td group_info">
                  <div class="customer_info">
                    <span>买家姓名:</span>
                    <span>{{item.buyer}}</span>
                  </div>
                  <div class="customer_info">
                    <span>联系方式</span>
                    <span>{{item.phone}}</span>
                  </div>
                  <div class="address">地址:{{item.address}}</div>
                </div>
                <div class="td min_width2">
                  <div>
                    <span class="mobile create_time">下单时间：</span>
                    <span class="value_right">{{item.order_time}}</span>
                  </div>
                </div>
                <div class="last_btn td table-li1">
                  <div>等待买家收货</div>
                  <div
                    class="data_btn btn_success"
                    @click="toshowlogistics(item.id)"
                  >查看物流</div>
                </div>
              </div>
              <div v-if="item.group&&item.clickstatus" class="paymentInf">
                <ul class="user_list">
                  <li v-for="(items,index) in item.group" :key="index">
                    <div>
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
                        <span>买家姓名：</span>
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
                        style="display: flex;flex-direction: row;align-items: center;"
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
        <div class="empty" id="box" v-if="this.notreceive.data.length==0">该列表为空</div>
        <div class="pages" v-if="this.notreceive.data.length!='0'">
          <el-pagination
            layout="prev, pager, next, jumper"
            :pager-count="5"
            :page-count="notreceive.pageCount"
            :page-size="notreceive.page"
            @current-change="handlePage2"
            :current-page.sync="notreceive.pno"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已完成" name="finish" class="tabpane">
        <div class="table">
          <ul class="tabelheader thead">
            <li>
              <span class="table-li"></span>
              <span class="min_width4">订单号</span>
              <span class="min_width3">商品信息</span>
              <span class="group_info">买家信息</span>
              <span class="min_width2">下单时间</span>
              <span>操作</span>
            </li>
          </ul>
          <ul class="tabelbody">
            <li v-for="(item,index) in finish.data" :key="index">
              <div class="w-content">
                <div class="td arrow td1">
                  <i
                    v-bind:class="item.clickstatus?'el-icon-arrow-down':'el-icon-arrow-right'"
                    @click="handlepayment(item.clickstatus,item.sign)"
                  ></i>
                </div>
                <div class="td min_width4">
                  <span class="mobile">订单号:</span>
                  <span class="value_right">2018102320230398598</span>
                </div>
                <div class="td min_width3">
                  <div class="shop_info">
                    <div class="goodsimg">
                      <img :src="item.goods_img">
                    </div>
                    <div class="goodsinfo">
                      <div class="goodsname">{{item.goods_name}}</div>
                      <div class="pay">
                        <span
                          class="pay_money"
                        >￥{{item.is_group==0? item.goods_price:item.group_price}}</span>
                        <span
                          class="pay_sum"
                        >/ 数量：{{item.is_group==0? item.goods_num:item.group_num}}</span>
                      </div>
                      <div
                        class="send_type"
                      >{{item.send_type=='1'?'自取':item.send_type=='2'?'快递':'送货上门'}}</div>
                    </div>
                  </div>
                </div>
                <div class="td group_info">
                  <div class="customer_info">
                    <span>团长姓名:</span>
                    <span>{{item.username}}</span>
                  </div>
                  <div class="customer_info">
                    <span>联系方式</span>
                    <span>{{item.phone}}</span>
                  </div>
                  <div class="address">地址:{{item.address}}</div>
                </div>
                <div class="td min_width2">
                  <div>
                    <span class="mobile create_time">成团时间：</span>
                    <span class="value_right">{{item.success_time*1000 | dataFilter(2)}}</span>
                  </div>
                </div>
                <div class="last_btn td table-li1">
                  <div>买家已收货</div>
                </div>
              </div>
              <div v-if="item.group&&item.clickstatus" class="paymentInf">
                <ul class="user_list">
                  <li v-for="(items,index) in item.group" :key="index">
                    <div>
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
                        <span>拼团姓名：</span>
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
                        style="display: flex;flex-direction: row;align-items: center;"
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
        <div class="empty" id="box" v-if="this.finish.data.length==0">该列表为空</div>
        <div class="pages" v-if="this.finish.data.length!='0'">
          <el-pagination
            layout="prev, pager, next, jumper"
            :pager-count="5"
            :page-count="finish.pageCount"
            :page-size="finish.page"
            @current-change="handlePage3"
            :current-page.sync="finish.pno"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="失败" name="failure" class="tabpane">
        <div class="table">
          <ul class="tabelheader thead">
            <li>
              <span class="table-li"></span>
              <span class="min_width4">订单号</span>
              <span class="min_width3">商品信息</span>
              <span class="group_info">团长信息</span>
              <span class="min_width2">成团时间</span>
              <span>操作</span>
            </li>
          </ul>
          <ul class="tabelbody">
            <li v-for="(item,index) in failure.data" :key="index">
              <div class="w-content">
                <div class="td arrow td1">
                  <i
                    v-bind:class="item.clickstatus?'el-icon-arrow-down':'el-icon-arrow-right'"
                    @click="handlepayment(item.clickstatus,item.sign)"
                  ></i>
                </div>
                <div class="td min_width4">
                  <span class="mobile">订单号:</span>
                  <span class="value_right">2018102320230398598</span>
                </div>
                <div class="td min_width3">
                  <div class="shop_info">
                    <div class="goodsimg">
                      <img :src="item.goods_img">
                    </div>
                    <div class="goodsinfo">
                      <div class="goodsname">{{item.goods_name}}</div>
                      <div class="pay">
                        <span
                          class="pay_money"
                        >￥{{item.is_group==0? item.goods_price:item.group_price}}</span>
                        <span
                          class="pay_sum"
                        >/ 数量：{{item.is_group==0? item.goods_num:item.group_num}}</span>
                      </div>
                      <div
                        class="send_type"
                      >{{item.send_type=='1'?'自取':item.send_type=='2'?'快递':'送货上门'}}</div>
                    </div>
                  </div>
                </div>
                <div class="td group_info">
                  <div class="customer_info">
                    <span>团长姓名:</span>
                    <span>{{item.username}}</span>
                  </div>
                  <div class="customer_info">
                    <span>联系方式</span>
                    <span>{{item.phone}}</span>
                  </div>
                  <div class="address">地址:{{item.address}}</div>
                </div>
                <div class="td min_width2">
                  <div>
                    <span class="mobile create_time">成团时间：</span>
                    <span class="value_right">{{item.success_time*1000 | dataFilter(2)}}</span>
                  </div>
                </div>
                <div class="last_btn td table-li1">
                  <div>失败</div>
                </div>
              </div>
              <div v-if="item.group&&item.clickstatus" class="paymentInf">
                <ul class="user_list">
                  <li v-for="(items,index) in item.group" :key="index">
                    <div>
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
                        <span>拼团姓名：</span>
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
                        style="display: flex;flex-direction: row;align-items: center;"
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
        <div class="empty" id="box" v-if="this.failure.data.length==0">该列表为空</div>
        <div class="pages" v-if="this.failure.data.length!='0'">
          <el-pagination
            layout="prev, pager, next, jumper"
            :pager-count="5"
            :page-count="failure.pageCount"
            :page-size="failure.page"
            @current-change="handlePage4"
            :current-page.sync="failure.pno"
          ></el-pagination>
        </div>
      </el-tab-pane> -->
      <el-tab-pane label="退款" name="refund" class="tabpane refund">
        <div class="table">
          <ul class="tabelheader thead">
            <li>
              <span class="table-li"></span>
              <span class="min_width4">订单号</span>
              <span class="min_width3">商品信息</span>
              <span class="group_info">团长信息</span>
              <span class="min_width2">开团时间</span>
            </li>
          </ul>
          <ul class="tabelbody">
            <li v-for="(item,index) in refund.data" :key="index">
              <div class="w-content">
                <div class="td arrow td1">
                  <i
                    v-bind:class="item.clickstatus?'el-icon-arrow-down':'el-icon-arrow-right'"
                    @click="handlepayment(item.clickstatus,item.sign)"
                  ></i>
                </div>
                <div class="td min_width4">
                  <span class="mobile">订单号:</span>
                  <span class="value_right">2018102320230398598</span>
                </div>
                <div class="td min_width3">
                  <div class="shop_info">
                    <div class="goodsimg">
                      <img :src="item.goods_img">
                    </div>
                    <div class="goodsinfo">
                      <div class="goodsname">{{item.goods_name}}</div>
                      <div class="pay">
                        <span
                          class="pay_money"
                        >￥{{item.is_group==0? item.goods_price:item.group_price}}</span>
                        <span
                          class="pay_sum"
                        >/ 数量：{{item.is_group==0? item.goods_num:item.group_num}}</span>
                      </div>
                      <div
                        class="send_type"
                      >{{item.send_type=='1'?'自取':item.send_type=='2'?'快递':'送货上门'}}</div>
                    </div>
                  </div>
                </div>
                <div class="td group_info">
                  <div class="customer_info">
                    <span>团长姓名:</span>
                    <span>{{item.username}}</span>
                  </div>
                  <div class="customer_info">
                    <span>联系方式</span>
                    <span>{{item.phone}}</span>
                  </div>
                  <div class="address">地址:{{item.address}}</div>
                </div>
                <div class="td min_width2">
                  <div>
                    <span class="mobile create_time">开团时间：</span>
                    <span class="value_right">{{item.group_create_time}}</span>
                  </div>
                </div>
                <!--<div class="last_btn td table-li1">

                </div>-->
              </div>
              <div v-if="item.group&&item.clickstatus" class="paymentInf">
                <ul class="user_list">
                  <li v-for="(items,index) in item.group" :key="index">
                    <div>
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
                        <span>拼团姓名：</span>
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
                      <div class="reason">
                        <span>申请理由：</span>
                        <span>{{items.group[0].refond_reason}}</span>
                      </div>
                      <div class="btn" v-if="items.group[0].refond_status=='0'">
                        <div class="data_btn btn_danger" @click="to_reject(items.group[0].refond_id)">拒绝退款</div>
                        <div
                          class="data_btn btn_success my-btn"
                          @click="to_approve(items.group[0].refond_id)"
                        >同意退款</div>
                      </div>
                      <div class="btn" v-if="items.group[0].refond_status=='1'">
                        <div>已经同意退款</div>
                      </div>
                      <div class="btn" v-if="items.group[0].refond_status=='2'">
                        <div class="recommit" @click="to_approve(items.group[0].refond_id)">改为同意</div>
                        <div>已经拒绝退款</div>
                      </div>
                      <div class="btn" v-if="items.group[0].refond_status=='3'">
                        <div>已完成退款</div>
                      </div>
                      <div class="btn" v-if="items.group[0].refond_status=='4'">
                        <div>用户已取消退款</div>
                      </div>
                    </div>
                    <div
                      v-if="item.is_group==0"
                      style="display: flex;flex-direction: column;width:100%;padding-left:20px"
                    >
                      <div
                        v-for="(eve,index) in items.goods"
                        :key="index"
                        style="display: flex;flex-direction: row;align-items: center;"
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
        <div class="empty" id="box" v-if="this.refund.data.length==0">该列表为空</div>
        <div class="pages" v-if="this.refund.data.length!='0'">
          <el-pagination
            layout="prev, pager, next, jumper"
            :pager-count="5"
            :page-count="refund.pageCount"
            :page-size="refund.page"
            @current-change="handlePage5"
            :current-page.sync="refund.pno"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="同意退款" class="remove" :visible.sync="is_approve" :modal-append-to-body="false">
      <div class="message">是否确定同意退款 ？</div>
      <div class="question">
        <button class="cancle" @click="is_approve=false">取消</button>
        <button class="approve_comfirm" @click="approve">确认</button>
      </div>
    </el-dialog>
    <el-dialog title="拒绝退款" class="remove" :visible.sync="is_reject" :modal-append-to-body="false">
      <div class="message">是否确定拒绝退款？</div>
      <div class="question">
        <button class="cancle" @click="is_reject=false">取消</button>
        <button class="reject_comfirm" @click="reject">确认</button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import "@/assets/css/distribution.css";
import {
  newWaitGroupOrder,
  send,
  deliver,
  solve,
  printGroupSignture,
  bulkPrint,
  newWaitRefuseGroupOrder,
  getGroupUserDetail,
  NewSend
} from "@/utils/api";
import * as store from "@/utils/sdk/store";
import pic from "@/assets/images/kenan.jpg";
import pics from "@/assets/images/avatar.png";
export default {
  data() {
    return {
      atpresent: "待发货",
      activeName: "notpost",
      imgUrl: pics,
      img_url: pic,
      refund_id: "",
      order_id: "",
      tosend: false,
      send_type: "3",
      is_approve: false, //同意退款的弹窗
      is_reject: false, //拒绝退款弹窗
      sendinfo: {
        express: "",
        number: ""
      },
      notpost: {
        //待发货数据
        data: [],
        pno: 1,
        page: 10,
        pageCount: 3
      },
      notreceive: {
        //待收货数据
        data: [],
        pno: 1,
        page: 10,
        pageCount: 3
      },
      finish: {
        //已完成数据
        data: [],
        pno: 1,
        page: 10,
        pageCount: 3
      },
      failure: {
        //失败数据
        data: [],
        pno: 1,
        page: 10,
        pageCount: 3
      },
      refund: {
        //退款数据
        data: [],
        pno: 1,
        page: 10,
        pageCount: 3
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      if (tab.paneName == "notpost") {
        this.notpostrequest(this.notpost.pno);
        this.atpresent = "待发货";
      } else if (tab.paneName == "notreceive") {
        this.notreceiveRequest(this.notreceive.pno);
        this.atpresent = "待收货";
      } else if (tab.paneName == "finish") {
        this.finishRequest(this.finish.pno);
        this.atpresent = "已完成";
      } 
      // else if (tab.paneName == "failure") {
      //   this.failureRequest(this.failure.pno);
      //   this.atpresent = "失败";
      // } 
      else if (tab.paneName == "refund") {
        this.refundRequest(this.refund.pno);
        this.atpresent = "退款";
      }
    },
    //显示发货窗口
    tosendgoods(id) {
      //点击发货显示弹窗
      this.tosend = true;
      this.order_id = id;
    },
    //发货
    onSubmit() {
      console.log('222')
      //单独发货提交按钮
      var flag=true
      if (this.sendinfo.express=='') {
        this.$message.error('请选择快递')
      }else if (this.sendinfo.number=='') {
        this.$message.error('请填写快递单号')
      }else  {
        flag=false
      }
      if (flag==false) {
        NewSend({
        id: this.order_id,
        shipping_name:this.sendinfo.express,//只有选择快递时才有快递名称和快递单号，其他方式，默认为空
        shipping_code:this.sendinfo.number
      }).then(res => {
        if (res.error_code == "1000") {
          this.$message.success("发货成功");
          this.tosend = false;
          this.handledata4(this.waitShipments.pno, this.waitShipments.page);
          this.handledata5(this.waitReceiving.pno, this.waitReceiving.page);
        }
      });
      };
      
      
    },
    notpostrequest(pno) {
      //待发货请求
      newWaitGroupOrder({
        shop_id: store.get("currentshopid"),
        page: pno,
        shipping_status:0
      }).then(res => {
        console.log(res,'2333')
        if (res.error_code == "1000") {
          // res.data.data.forEach(item => {
          //   item.clickstatus = false;
          // });
          this.notpost.data = res.data.group;
          this.notpost.pno = Number(res.data.page);
          this.notpost.pageCount = Number(res.data.totalPage);
        }
      });
    },
    to_approve(id) {
      //同意退款弹窗
      this.is_approve = true;
      this.refund_id = id;
    },
    approve() {
      //同意退款确认
      solve({ refund_id: this.refund_id, status: 1 }).then(res => {
        if (res.error_code == 1000) {
          this.is_approve = false;
          this.$message("已同意退款");
          this.refundRequest(this.refund.pno); //同意退款，重新请求退款页面
        } else {
          this.$message.error("退款失败！");
        }
      });
    },
    to_reject(id) {
      //拒绝退款弹窗
      this.is_reject = true;
      this.refund_id = id;
    },
    reject() {
      //同意拒绝退款确认
      solve({ refund_id: this.refund_id, status: 0 }).then(res => {
        this.is_reject = false;
        this.$message("已拒绝退款");
        this.refundRequest(this.refund.pno); //拒绝退款，重新请求退款页面
      });
    },
    notreceiveRequest(pno) {
      //待收货请求
      newWaitGroupOrder({
        shop_id: store.get("currentshopid"),
        page: pno,
        shipping_status: "1"
      }).then(res => {
        if (res.error_code == "1000") {
          // res.data.data.forEach(item => {
          //   item.clickstatus = false;
          // });
          this.notreceive.data = res.data.group;
          this.notreceive.pno = Number(res.data.page);
          this.notreceive.pageCount = Number(res.data.totalPage);
        }
      });
    },
    toshowlogistics(id){
      this.showlogistics=true
      this.order_id=id
      
    },
    finishRequest(pno) {
      //已完成请求
      newWaitGroupOrder({
        shop_id: store.get("currentshopid"),
        page: pno,
        shipping_status: "2",
        order_status: "4"
      }).then(res => {
        if (res.error_code == "1000") {
          res.data.data.forEach(item => {
            item.clickstatus = false;
          });
          this.finish.data = res.data.data;
          this.finish.pno = Number(res.data.page);
          this.finish.pageCount = Number(res.data.totalPage);
        }
      });
    },
    failureRequest(pno) {
      //失败请求
      newWaitGroupOrder({
        shop_id: store.get("currentshopid"),
        page: pno,
        status: "2"
      }).then(res => {
        if (res.error_code == "1000") {
          res.data.data.forEach(item => {
            item.clickstatus = false;
          });
          this.failure.data = res.data.data;
          this.failure.pno = Number(res.data.page);
          this.failure.pageCount = Number(res.data.totalPage);
        }
      });
    },
    refundRequest(pno) {
      /退款请求/;
      newWaitRefuseGroupOrder({
        shop_id: store.get("currentshopid"),
        page: pno
        // order_status:'3',
        // status:'0,1,2'
      }).then(res => {
        if (res.error_code == "1000") {
          res.data.data.forEach(item => {
            item.clickstatus = false;
          });
          this.refund.data = res.data.data;
          this.refund.pno = Number(res.data.page);
          this.refund.pageCount = Number(res.data.totalPage);
        }
      });
    },
    handlepayment(clickstatus, sign) {
      if (this.atpresent == "待发货") {
        this.notpost.data.forEach(item => {
          if (item.sign == sign) {
            getGroupUserDetail({
              sign: sign
            }).then(res => {
              item.group = res.data.data;
              item.clickstatus = !item.clickstatus;
            });
          }
        });
      } else if (this.atpresent == "待收货") {
        this.notreceive.data.forEach(item => {
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
        this.finish.data.forEach(item => {
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
        this.failure.data.forEach(item => {

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
      } else {
        this.refund.data.forEach(item => {
          if (item.sign == sign) {
            getGroupUserDetail({
              sign: sign,
              status:'1,2,3',
              order_status:'3',
              shipping_status:'0,1'
            }).then(res => {
              item.group = res.data.data;
              item.clickstatus = !item.clickstatus;
            });
          }
        });
      }

      // if (e.target.className == "el-icon-arrow-right") {
      //   e.target.className = "el-icon-arrow-down";
      //   e.target.parentNode.parentNode.parentNode.lastElementChild.style.display =
      //     "block";
      // } else {
      //   e.target.className = "el-icon-arrow-right";
      //   e.target.parentNode.parentNode.parentNode.lastElementChild.style.display =
      //     "none";
      // }
    },
    //发货
    // handleAll(sign) {
    //   this.tosend=true

      
      // deliver({
      //   sign: sign, //一件发货暂无快递
      //   shipping_name:
      //     this.sendinfo.express == "" ? "申通" : this.sendinfo.express,
      //   shipping_code: this.sendinfo.number == "" ? "1" : this.sendinfo.number
      // }).then(res => {
      //   if (res.error_code == "1000") {
      //     this.$message.success('已发货')
      //     this.notpostrequest(this.notpost.pno);
      //     if(this.notpost.data.length<=1&&this.notpost.pno>1){
      //    	this.notpostrequest(this.notpost.pno-1)
      //    }else{
      //    	this.notpostrequest(this.notpost.pno)
      //      }
      //     this.notpostrequest(this.notpost.pno)
      //      this.notreceiveRequest(this.notreceive.pno)
      //   }
      // });
    // },
    //总一键发货
    AkeyDelivery() {
      var shipments = "";
      this.notpost.data.forEach(item => {
        if (item.delivery_status) {
          shipments += item.sign + ",";
        }
      });
      if (shipments.length > 0) {
        shipments = shipments.substr(0, shipments.length - 1);
      }
      deliver({
        sign: shipments, //一件发货暂无快递
        shipping_name:
          this.sendinfo.express == "" ? "申通" : this.sendinfo.express,
        shipping_code: this.sendinfo.number == "" ? "1" : this.sendinfo.number
      }).then(res => {
        if (res.error_code == "1000") {
          this.$message.success(res.msg);
          this.notpostrequest(this.notpost.pno);
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
        this.notpostrequest(this.notpost.pno);
      });
    },
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
      //单独打印小票
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
        this.notpostrequest(this.notpost.pno);
      });
    },
    handlePage1() {
      this.notpostrequest(this.notpost.pno);
    },
    handlePage2() {
      this.notreceiveRequest(this.notreceive.pno);
    },
    handlePage3() {
      this.finishRequest(this.finish.pno);
    },
    handlePage4() {
      this.failureRequest(this.failure.pno);
    },
    handlePage5() {
      this.refundRequest(this.refund.pno);
    }
  },
  created() {
    this.notpostrequest(this.notpost.pno);
    // this.notreceiveRequest(this.notreceive.pno)
    // this.finishRequest(this.finish.pno)
    // this.failureRequest(this.failure.pno)
    // this.refundRequest(this.refund.pno)
  }
};
</script>
<style lang="stylus" scoped>
.member_page {
  background-color: #f9f9f9;
  padding: 20px;
  width: 100%;
  height: 100%;
  font-size: 15px;
}

.order_number {
  width: 50%;
}

.consignee {
  color: #888;
  font-size: 14px;
}

.scan_show {
  display: none;
}

.send_type {
  margin-top: 10px;
}

.remove {
  .question {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    padding: 0 15%;

    .approve_comfirm {
      color: white;
      background-color: #409EFF;
      cursor: pointer;
      padding: 5px 20px;
      border-radius: 3px;
    }

    .reject_comfirm {
      color: white;
      background-color: #409EFF;
      cursor: pointer;
      padding: 5px 20px;
      border-radius: 3px;
    }

    .cancle {
      color: #C0C4CC;
      background-color: white;
      cursor: pointer;
      padding: 5px 20px;
      border-radius: 3px;
      border: 1px solid #C0C4CC;
    }
  }
}

.goodsimg {
  width: 85px;
  height: 85px;
  margin-right: 10px;

  img {
    width: 85px;
    height: 85px;
  }
}

.print_btn {
  margin-left: 5px;
}

.table .thead li, .w-content {
  align-items: center;
}

.shop_info {
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    line-height: 30px;
    text-align: left;
  }
}

.table .thead .group_info, .table .tabelbody .group_info {
  min-width: 200px;

  div {
    line-height: 30px;
    text-align: left;
  }
}

.my-btn {
  margin-left: 5px;
}

.table .thead .min_width3, .table .tabelbody .min_width3 {
  min-width: 260px;
}

.table .thead .min_width4, .table .tabelbody .min_width4 {
  min-width: 60px;
  max-width: 160px;
}

.address {
  max-width: 230px;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
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

.paymentInf span {
  margin-left: 0;
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

.paymentInf li>div.btn {
  justify-content: center;
}

.user_list img {
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.table .thead li, .w-content {
  padding: 8px 0;
}

.shop_info .goodsname {
  max-width: 200px;
  max-height: 60px;
  line-height: 20px;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.reason {
  max-width: 180px;
  line-height: normal;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.paymentInf li:last-child {
  border: none;
}

.paymentInf li:first-child {
  border-top: 1px dashed #ccc;
}

.radios {
  height: 35px;
}

.pay_money {
  color: #f2681c;
}

.goodsinfo {
  min-width: 200px;
}

.refund .ads {
  width: 270px;
}

.ads {
  width: 370px;
  align-items: center;
}

.ads span:nth-child(1) {
  min-width: 50px;
}

.ads span:nth-child(2) {
  text-align: left;
  line-height: normal;
}

@media (max-width: 900px) {
  .table .thead .min_width4, .table .tabelbody .min_width4 {
    min-width: 60px;
    max-width: 80%;
  }

  .table .value_right, .table .value_right {
    width: 75%;
  }

  .tabpane .table .tabelbody li .group_info {
    display: inline-block;
  }

  .goodsimg {
    margin-right: 20px;
  }

  .paymentInf li {
    padding: 15px 0;
    display: block;
    border-bottom: 1px dashed #ccc;
  }

  .paymentInf li>div {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin: 5px 0px;
  }

  .paymentInf li>div.btn {
    justify-content: center;
  }

  .tabpane .table li .create_time {
    min-width: 75px;
  }

  .customer_info span:first-child {
    margin-right: 30px;
  }
}
</style>
