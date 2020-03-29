<template>
	<div class="l-container modify_page">
		<el-tabs v-model="activeName">
			<!-- 店铺信息 -->
			<el-tab-pane label="店铺信息" name="first">
				<div class="l-content-box">
					<div class="l-renovation-box-title">
						<label>商铺编号：</label>
					</div>
					<div class="l-renovation-box-content">
						{{shop_id}}
					</div>
				</div>

				<div class="l-content-box">
					<div class="l-renovation-box-title">
						<label>创建日期：</label>
					</div>
					<div class="l-renovation-box-content">
						{{form.create_time}}
					</div>
				</div>

				<div class="l-content-box">
					<div class="l-renovation-box-title">商铺名称：</div>
					<div class="l-renovation-box-content">
						<el-input size='medium' type="text" class="l-input" v-model="form.name" placeholder="请输入店铺名称" />
					</div>
				</div>
				<div class="l-content-box">
					<div class="l-renovation-box-title">运营合伙人：</div>
					<div class="l-renovation-box-content">
						<!-- <el-input size='medium' type="text" class="l-input" v-model="form.name" placeholder="请输入店铺名称" /> -->
						<span>{{form.nickname}}</span>
						<span>{{form.admin_phone}}</span>
					</div>
				</div>
				<div class="l-content-box">
					<div class="l-renovation-box-title">店铺分享图：<br />
						<div class="l-cc">建议尺寸400px*300px</div>
					</div>
					<div class="l-renovation-box-content">
						<el-form :model="form">
							<el-form-item>
								<el-upload action="https://www.linwushop.com/api/upload_img" :on-success='uploadsuccess' :before-upload="logoUploadif" :on-remove="remove_share" :limit='1' :show-file-list="false">
									<div class="shop_photo">
										<img class="l-modify-logo" :src="form.ShareimageUrl" />
										<a>重新上传</a>
									</div>
								</el-upload>
							</el-form-item>
						</el-form>
					</div>
				</div>

				<div class="l-content-box">
					<div class="l-renovation-box-title">店铺二维码：<br />
					</div>
					<div class="l-renovation-box-content qrcode">
						<div>
							<img class="l-modify-logo qrcode"  :src="form.qrcode">
							<a class="download" :href="download_qrcode">下载图片</a>
						</div>
						
					</div>

				</div>

				 <div class="l-content-box" >
					 <div class="l-renovation-box-title">餐饮方式：</div>
					 <div class="l-renovation-box-content">
						 <div class="l-renovation-box-content restaurant">
						 	 <div class="foods">
                                <el-switch v-model="form.is_out_food" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
							     <span>外卖</span>
							 </div>
							 <div class="Tong">
                                <el-switch v-model="form.is_in_food" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
							     <span>自提/堂吃</span>
							 </div>
							 
						</div>
					 </div>
				 </div>
				<div class="l-content-box" >
					 <div class="l-renovation-box-title">配送方式：</div>
					 <div class="l-renovation-box-content">
						 <div class="l-renovation-box-content restaurant">
							 <div class="Tong">
                                <el-switch v-model="form.send_type" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
							     <span>开启达达配送</span>
							     <span>请先</span><span class="dada_register">注册</span><span>达达账号</span>
							 </div>
							 <!-- <div class="foods">
                                <el-switch v-model="form.is_out_food" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
							     <span>外卖</span>
							 </div> -->
						</div>
					 </div>
				 </div>
				<div class="l-content-box">
					<div class="l-renovation-box-title">店铺banner：<br />
						<div class="l-cc">建议尺寸750px*400px</div>
					</div>
					<div class="l-renovation-box-content">
						<el-form :model="form">
							<el-form-item>
								<el-upload action="https://www.linwushop.com/api/upload_img" :on-success='uploadBdg' :before-upload="bgdUploadif" :on-remove="remove_bgd" :show-file-list=false>
									<div class="shop_photo2" v-if="upload_bgd">
										<div class="bg_img" v-for="(item,index) in form.bgdimageUrl" :key='index'>
											<img class="l-modify-img" :src="item" /><i @click.stop="del(index)" class="el-icon-delete del"></i>
										</div>
										<div class="l-el-icon-plus">
											<i class="el-icon-plus" style="font-size:22px"></i>
											<span>增加banner图片</span>
										</div>
									</div>
								</el-upload>
							</el-form-item>
						</el-form>
					</div>
				</div>
				<div class="l-footer">
					<!-- <div class="l-footer-submit2" @click="Return">返回</div> -->
					<div class="l-footer-submit" @click="complete">保存</div>
				</div>
			</el-tab-pane>

			<!-- 店铺风格 -->
			<!-- <el-tab-pane label="店铺风格" name="second">
				<div class="block">
					<span class="demonstration">当前页面主颜色:</span>
					<div class="colors">
						<el-color-picker v-model="form1.color"></el-color-picker>
						<span class="change">更改颜色</span>
					</div>
				</div>
				<ul class="lee-list">
					<li>
						<div>
							<img src="@/assets/images/sc1.png">
						</div>
						<div class="lee-list-title" :style="{ background:form1.color}">
							<span>邻伍商城</span>
						</div>
					</li>
					<li>
						<div>
							<img src="@/assets/images/sc2.png">
						</div>
						<div class="lee-list-title" :style="{ background:form1.color}">
							<span>商品详情</span>
						</div>

						<div class="lee-list-title1" :style="{ background:form1.color}">
							<span>立即购买</span>
						</div>
						<div class="lee-list-fs lee-list1" :style="{ color:form1.color}">
                             <span>￥65</span>
						</div>
					</li>
					<li>
						<div>
							<img src="@/assets/images/sc3.png">
						</div>
						<div class="lee-list-title" :style="{ background:form1.color}">
							<span>购物车</span>
						</div>
						<div class="lee-list-title1 lee-list-title2" :style="{ background:form1.color}">
							<span>立即购买</span>
						</div>
						<div class="lee-list-fs1  lee-list1" :style="{ color:form1.color}">
                             <span>￥1300</span>
						</div>
						<div class="lee-list-fs2  lee-list1" :style="{ color:form1.color}">
                             <span>X1</span>
						</div>
						<div class="lee-list-fs3  lee-list1" :style="{ color:form1.color}">
                             <span>￥1300</span>
						</div>
						<div class="lee-list-fsimg  lee-list1" :style="{ background:form1.color}">
							<img src="@/assets/images/sc3_03.png">
						</div>
						<div class="lee-list-fsimg1  lee-list1" :style="{ background:form1.color}">
							<img src="@/assets/images/sc3_03.png">
						</div>

						<div class="lee-list-fsimg2  lee-list1" :style="{ background:form1.color}">
							<img src="@/assets/images/sc3_03.png">
						</div>

					</li>
				</ul>
				<div class="l-footer">
					<div class="l-footer-submit2" @click="Return">返回</div> 
					<div class="l-footer-submit" @click="completec">保存</div>
				</div>
			</el-tab-pane> -->
			<!--店铺设置 -->
			<el-tab-pane label="店铺设置" name="third">
				<!-- 搜索框 -->
				<!-- <div class="setting" v-if='shop_type==1'>
					<div class="l-content-box">
						<div class="l-renovation-box-title">是否开启搜索框：</div>
						<div class="l-renovation-box-content">
							<el-switch v-model="form2.is_search" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
						</div>
					</div>
					<div class="l-content-box" v-if="form2.is_search">
						<div class="l-renovation-box-title">首页排列顺序：</div>
						<div class="l-renovation-box-content">
							<el-input type="text" class="inputs" v-model="form2.order[0].orOne" @change="go1"></el-input>
						</div>
					</div>
				</div> -->
				<!-- banner图 -->
				<!-- <div class="setting">
					<div class="l-content-box">
						<div class="l-renovation-box-title">是否开启banner图：</div>
						<div class="l-renovation-box-content">
							<el-switch v-model="form2.is_slide" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
						</div>
					</div>

					<div class="l-content-box" v-if="form2.is_slide">
						<div class="l-renovation-box-title">首页排列顺序：</div>
						<div class="l-renovation-box-content">
							<el-input type="text" class="inputs" v-model="form2.order[1].orOne" @change="go2"></el-input>
						</div>
					</div>
				</div> -->

				<!--首页是否优惠券-->
				<!-- <div class="setting">
					<div class="l-content-box">
						<div class="l-renovation-box-title">是否开启优惠券：</div>
						<div class="l-renovation-box-content">
							<el-switch v-model="form2.is_cash" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
						</div>
					</div>
					<div class="l-content-box" v-if="form2.is_cash">
						<div class="l-renovation-box-title">首页排列顺序：</div>
						<div class="l-renovation-box-content">
							<el-input type="text" class="inputs" v-model="form2.order[2].orOne" @change="go3"></el-input>
						</div>
					</div>
					<div class="l-content-box" v-if="form2.is_cash">
						<div class="l-renovation-box-title">上传优惠券缩略图：<br />
							<div class="l-cc">*建议尺寸700px*300px</div>
						</div>
						<div class="l-renovation-box-content">
							<el-form :model="form2">
								<el-form-item>
									<el-upload action="https://www.linwushop.com/api/upload_img" :limit='1' list-type="picture-card" :on-success="uploadCash" :on-remove="remove_cash" :show-file-list=false>
										<img class="l-modify-img" :src="form2.cash_bg_img" />
										<i v-if="form2.cash_bg_img==''" class="el-icon-plus"></i>
										<a class="upload">重新上传</a>
									</el-upload>
								</el-form-item>
							</el-form>
						</div>
					</div>
				</div> -->

				<!--分组 -->
				<!-- <div class="setting">
					<div class="l-content-box">
						<div class="l-renovation-box-title">是否开启分组：</div>
						<div class="l-renovation-box-content">
							<el-switch v-model="form2.is_goods_group" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
						</div>
					</div>

					<div class="l-content-box" v-if="form2.is_goods_group">
						<div class="l-renovation-box-title">首页排列顺序：</div>
						<div class="l-renovation-box-content">
							<el-input type="text" class="inputs" v-model="form2.order[3].orOne" @change="go4"></el-input>
						</div>
					</div>
				</div> -->
                
				<!--是否显示店铺信息-->
				<div class="setting">
					<!-- <div class="l-content-box">
						<div class="l-renovation-box-title">是否开启自提/堂吃：</div>
						<div class="l-renovation-box-content">
							<el-switch v-model="form2.is_in_food" active-color="#13ce66" inactive-color="#eeeeee"></el-switch>
						</div>
					</div>  -->
					<!-- <div class="l-content-box" v-if="form2.shop_info_isshow">
						<div class="l-renovation-box-title">首页排列顺序：</div>
						<div class="l-renovation-box-content">
							<el-input type="text" class="inputs" v-model="form2.order[4].orOne" @change="go5"></el-input>
						</div>
					</div> -->
					<!-- <div class="l-content-box">
					<div class="l-renovation-box-title">设置小程序颜色：</div>
					<div class="l-renovation-box-content">
						<el-color-picker v-model="form.color"></el-color-picker>
					</div>
				    </div> -->
					<div class="l-content-box">
						<div class="l-renovation-box-title">店铺地址：</div>
						<div class="l-renovation-box-content">
							<el-input size='medium' type="text" class="l-input" v-model="form2.shop_address" placeholder="请输入店铺地址（选填）" />
						</div>
					</div>

					<div class="l-content-box">
						<div class="l-renovation-box-title">店铺定位：</div>
						<div class="l-renovation-box-content2">
							<el-input size='medium ' type="text" class="l-input" v-model="form2.latitude" placeholder="请输入纬度（如30.121542）" />
						</div>
						<div class="l-renovation-box-content2">
							<el-input size='medium' type="text" class="l-input" v-model="form2.longitude" placeholder="请输入经度（如120.136244）" />
						</div>

						<div class="lee-map">
							可通过<a target="_blank" href='https://lbs.qq.com/tool/getpoint/'> 腾讯地图 </a>获取经纬度
						</div>
					</div>


					<div class="l-content-box">
						<div class="l-renovation-box-title">营业时间：</div>
						<div class="l-renovation-box-content">
							<!-- <el-input type="text" class="l-input" v-model="form2.business_hours_start" placeholder="请输入开始营业时间（如：9：00-22：00）" /> -->
							<el-time-picker
						    is-range
						    size='medium'
						    v-model="form2.business_hours"
						    :picker-options="format"
						    format="HH:mm"
						    value-format="HH:mm"
						    @change="change"
						    start-placeholder="开始时间"
						    end-placeholder="结束时间"
						    placeholder="选择时间范围">
						  </el-time-picker>
						</div>
					</div>
					
					<div class="l-content-box">
						<div class="l-renovation-box-title">客服电话：</div>
						<div class="l-renovation-box-content">
							<el-input size='medium' type="text" class="l-input" v-model="form2.cs_phone" placeholder="请输入客服电话" />
						</div>
					</div>
					<div class="l-content-box" v-if="form.is_out_food">
						<div class="l-renovation-box-title">配送费：</div>
						<div class="l-renovation-box-content">
							<el-input size='medium' type="text" class="l-input" v-model="form2.send_price" placeholder="请输入配送费" />
						</div>
					</div>
					<div class="l-content-box" v-if="form.is_out_food">
						<div class="l-renovation-box-title">免配送价格：</div>
						<div class="l-renovation-box-content">
							<el-input size='medium' type="text" class="l-input" v-model="form2.low_price" placeholder="请输入起送价" />
						</div>
					</div>
				    <div class="l-content-box">
						<div class="l-renovation-box-title">店铺WIFI：</div>
						<div class="l-renovation-box-content2">
							<el-input size='medium' type="text" class="l-input" v-model="form2.shop_wifi_name" placeholder="请输入WIFI名称" />
						</div>
						<div class="l-renovation-box-content2">
							<el-input size='medium' type="text" class="l-input" v-model="form2.shop_wifi_pwd" placeholder="请输入WIFI密码" />
						</div>
					</div> 
					<div class="l-content-box" v-if="form.is_out_food">
						<div class="l-renovation-box-title">配送说明：</div>
						<div class="l-renovation-box-content">
							<el-input type="text" class="l-input" v-model="form2.send_info" placeholder="请输入配送时间的说明" />
						</div>
					</div>
					<div class="l-content-box">
						<div class="l-renovation-box-title">备注选择：</div>
						<div class="l-renovation-box-content">
							<div class="tags" >
								<div class="tag" v-for="(item,index) in form2.tag" v-if="form2.tag!=''">
									<span>{{item}}</span>
									<img src="@/assets/images/cancel.png" class="close_tag" @click="del_tag(index)">
								</div>
								<div><i class="el-icon-plus add_tag" @click="addTag=true"></i></div>
							</div>
						</div>
					</div>
				</div>

		    <!-- 增加备注-->
			<el-dialog title="新增备注" :visible.sync="addTag" :modal-append-to-body='false'>
				<el-form>
					<el-form-item label="备注名" :label-width="formLabelWidth">
						<el-input v-model="pre_tag" placeholder='请输入可选备注' auto-complete="off"></el-input>
					</el-form-item>
				</el-form>
				<div class="options">
					<button class="comfirm" @click="complete_tag">确认</button>
				    <button class="cancle_edit" @click="addTag = false">取消</button>
				</div>
			</el-dialog>

				<!--首页是否显示团购-->
				<!-- <div class="setting" v-if='shop_type==2'>
					<div class="l-content-box">
						<div class="l-renovation-box-title">是否开启团购：</div>
						<div class="l-renovation-box-content">
							<el-switch v-model="form2.is_group" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
						</div>
					</div>
					<div class="l-content-box" v-if="form2.is_group">
						<div class="l-renovation-box-title">首页排列顺序：</div>
						<div class="l-renovation-box-content">
							<el-input type="text" class="inputs" v-model="form2.order[5].orOne" @change="go6"></el-input>
						</div>
					</div>
					<div class="l-content-box" v-if="form2.is_group">
						<div class="l-renovation-box-title">上传团购缩略图：<br />
							<div class="l-cc">*建议尺寸700px*300px</div>
						</div>
						<div class="l-renovation-box-content">
							<el-form :model="form2">
								<el-form-item>
									<el-upload action="https://www.linwushop.com/api/upload_img" :limit='1' list-type="picture-card" :on-success="uploadgroup" :on-remove="removegroup" :show-file-list=false>
										<img class="l-modify-img" :src="form2.group_bg_img" />
										<i v-if="form2.group_bg_img==''" class="el-icon-plus"></i>
										<a class="upload">重新上传</a>
									</el-upload>
								</el-form-item>
							</el-form>
						</div>
					</div>
				</div> -->
				<!--首页是否显示砍价-->
				<!-- <div class="setting" v-if='shop_type==2'>
					<div class="l-content-box">
						<div class="l-renovation-box-title">是否开启砍价：</div>
						<div class="l-renovation-box-content">
							<el-switch v-model="form2.is_bargain" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
						</div>
					</div>
					<div class="l-content-box" v-if="form2.is_bargain">
						<div class="l-renovation-box-title">首页排列顺序：</div>
						<div class="l-renovation-box-content">
							<el-input type="text" class="inputs" v-model="form2.order[6].orOne" @change="go7"></el-input>
						</div>
					</div>
					<div class="l-content-box" v-if="form2.is_bargain">
						<div class="l-renovation-box-title">上传砍价缩略图：<br />
							<div class="l-cc">*建议尺寸700px*300px</div>
						</div>
						<div class="l-renovation-box-content">
							<el-form :model="form2">
								<el-form-item>
									<el-upload action="https://www.linwushop.com/api/upload_img" :limit='1' list-type="picture-card" :on-success="uploadBargain" :on-remove="removeBargain" :show-file-list=false>
										<img class="l-modify-img" :src="form2.bargain_bg_img" />
										<i v-if="form2.bargain_bg_img==''" class="el-icon-plus"></i>
										<a class="upload">重新上传</a>
									</el-upload>
								</el-form-item>
							</el-form>
						</div>
					</div>
				</div> -->

				<!-- 显示热推 -->
				<!-- <div class="setting">
					<div class="l-content-box">
						<div class="l-renovation-box-title">是否开启热推：</div>
						<div class="l-renovation-box-content">
							<el-switch v-model="form2.is_hot_pust" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
						</div>
					</div>

					<div class="l-content-box" v-if="form2.is_hot_pust">
						<div class="l-renovation-box-title">首页排列顺序：</div>
						<div class="l-renovation-box-content">
							<el-input type="text" class="inputs" v-model="form2.order[7].orOne" @change="go8"></el-input>
						</div>
					</div>
				</div> -->

				<div class="l-footer">
					<!-- <div class="l-footer-submit2" @click="Return">返回</div> -->
					<div class="l-footer-submit" @click="complete2">保存</div>
				</div>
				<!-- <div class="psfr">
					<div class="psfr-con">
						<ul>   
							<li style="order:-1">
								<img src="@/assets/images/rt.png">
							</li>
							<li id="order" :style="{order:form2.order[0].orOne}" v-if="form2.is_search">
								<img src="@/assets/images/rs.png">
							</li>
							<li id="order1" :style="{order:form2.order[1].orOne}" v-if="form2.is_slide">
								<img src="@/assets/images/tb.png">
							</li>
							<li id="order2" :style="{order:form2.order[2].orOne}" v-if="form2.is_cash">
								<img src="@/assets/images/r2.png">
							</li>
							<li id="order3" :style="{order:form2.order[3].orOne}" v-if="form2.is_goods_group">
								<img src="@/assets/images/rf.png">
							</li>
							<li id="order4" :style="{order:form2.order[4].orOne}" v-if="form2.shop_info_isshow">
								<img src="@/assets/images/r3.png">
							</li>
							<li id="order5" :style="{order:form2.order[5].orOne}" v-if="form2.is_group">
								<img src="@/assets/images/r4.png">
							</li>
							<li id="order6" :style="{order:form2.order[6].orOne}" v-if="form2.is_bargain">
								<img src="@/assets/images/r5.png">
							</li>
							<li id="order7" :style="{order:form2.order[7].orOne}" v-if="form2.is_hot_pust">
								<img src="@/assets/images/r6.png">
							</li>
							<li style="order:10">
								<img src="@/assets/images/r7.png">
							</li>
						</ul>
					</div>
				</div> -->
			</el-tab-pane>
		  </el-tabs>
		<div class="l-content">
		</div>
	</div>
</template>
<script type="text/javascript">
import * as store from "@/utils/sdk/store";
import {
  get_shop_user,
  admin_shop_info,
  update_shop,
  submit_code,
  show_admin_shop_info,
  up_shopInfo,
  downfile
} from "@/utils/api";
import "@/utils/jquery";

export default {
  data() {
    return {
       download_qrcode:'',
       format:{
       	format:'HH:mm'
       },
      //  店铺信息提交
      form: {
        name: "", //店铺名称
        LogoimageUrl: "", //logo上传
        ShareimageUrl:"",//分享图上传
        bgdimageUrl: [], //背景上传
        logo: "",//LOGO
        share_bg_img:"",//分享图设置
		create_time: "",//创建店铺时间
		is_out_food:true, // 外卖
        is_in_food:true, //堂吃
        send_type:1
      },

      //店铺风格
      form1: {
        color: "" //颜色
      },
      pre_tag:'',
      formLabelWidth:'',
      //  店铺设置
      form2: {
      	//is_in_food:false,
      	send_info:'',
      	low_price:'',
        shop_address: "", //店铺地址
        longitude: "", //定位经度
        latitude: "", //地址纬度
        business_hours: "", //营业时间
        cs_phone: "", //客服电话
        shop_wifi_name: "", //wifi名称
        shop_wifi_pwd: "", //wifi密码
        photo: "1",
        shop_info_isshow: true, //是否显示店铺信息
        is_group: true, //首页是否显示团购
        group_bg_img: "", //团购页面缩略图
        is_bargain: true, //首页是否显示砍价
        bargain_bg_img: "", //砍价缩略图
        is_cash: true, //是否显示优惠券
		cash_bg_img: "", //优惠券缩略图
		send_price:0,
        is_search: true, //搜索框
        is_slide: true, //banner图
        is_goods_group: true, //分组
        is_hot_pust: true, //热推
        tag:['去冰','微热'],
        order: [
          {
            orOne: ""
          },
          {
            orOne: ""
          },
          {
            orOne: ""
          },
          {
            orOne: ""
          },
          {
            orOne: ""
          },
          {
            orOne: ""
          },
          {
            orOne: ""
          },
          {
            orOne: ""
          }
        ]
      },
      addTag:false,//设置备注
      inputEmptys: true, //提示清空方法
      upload_logo: false, //logo上传成功切换内容
      upload_share: false, //分享图上传成功切换内容
      upload_bgd: false, //背景上传成功切换内容
      CashVisible: false,
      activeName: "first", //当前选择的导航
      shop_id: store.get("currentshopid"), //店铺id
      //color: "#E51C23", //颜色
	  styleInner: "",
	  shop_type:store.get('shop_type'),
    };
  },
  methods: {
  	change(){
  		console.log(this.form2.business_hours)
  	},
    //判断提示
    inputEmpty() {
      this.inputEmptys = true;
      if (this.form.name == "") {
        this.$message.error("请输入店铺名称");
      } else if (this.form.ShareimageUrl == "") {
        this.$message.error("请上传店铺分享图");
      } else if (this.form.bgdimageUrl == "") {
        this.$message.error("请上传店铺背景");
      }else if (this.form.is_out_food == false&&this.form.is_in_food==false) {
        this.$message.error("请至少开启一种订餐方式");
      } else {
        this.inputEmptys = false;
      }
    },
    //增加备注
    complete_tag(){
    	this.form2.tag.push(this.pre_tag)
    	this.addTag=false
    	this.pre_tag=''
    },
    //删除备注
    del_tag(index){
    	this.form2.tag.splice(index,1)
    },
    del(index) {
      this.form.bgdimageUrl.splice(index, 1);
	  console.log(this.form.bgdimageUrl)
    },

    //删除优惠券缩略图
    remove_cash() {
      this.form2.cash_bg_img = "";
     
    },
    //上传优惠券缩略图
    uploadCash(file) {
      this.form2.cash_bg_img = "";
      this.form2.cash_bg_img = file.data.img_url;
    },
    removeBargain(file) {
      this.form2.bargain_bg_img = "";
    },
    uploadBargain(file) {
      this.form2.bargain_bg_img = file.data.img_url;
    },
    uploadgroup(file) {
      this.form2.group_bg_img = file.data.img_url;
    },
    removegroup(file) {
      this.form2.group_bg_img = "";
    },

    // 店铺信息获取信息
    card_number() {
      show_admin_shop_info({
        shop_id: store.get("currentshopid"),
        type: "info"
      }).then(res => {
       
        if (res.status == 1) {
          //店铺名称输出
          this.form.name = res.data.name;
          //创建店铺时间
		  this.form.create_time = res.data.create_time;
		  this.form.nickname = res.data.nickname;
		  this.form.admin_phone = res.data.admin_phone;
		  //堂吃是否显示
		  this.form.is_in_food = res.data.is_in_food == "1" ? true :false;
          //外卖是否显示
		 this.form.is_out_food = res.data.is_out_food == "1" ? true :false;
		 this.form.send_type = res.data.send_type=="3"?true:false
		 this.form.qrcode = res.data.qrcode;
		 this.download_qrcode="https://www.linwushop.com/api/downfile?filename="+res.data.qrcode
          // //logo输出
          // if (res.data.logo != "") {
          //   this.upload_logo = true;
          //   this.form.LogoimageUrl =str1
          // }
          //分享图
          this.form.ShareimageUrl = res.data.share_bg_img;
          if (res.data.bg_picture_url == null) {
            this.form.bg_picture_url = [];
          } else {
            this.form.bg_picture_url = res.data.bg_picture_url.split(",");
          }
          //背景输出
          if (res.data.bg_picture_url != ""){
            this.upload_bgd = true;
			//this.form.bgdimageUrl = this.form.bg_picture_url;
			 var str2= this.form.bg_picture_url;
             //var str3 = str2.replace("https","http")
			 // this.form.bgdimageUrl =str3
			   var str3 =[]
			   for(var i=0;i<str2.length;i++){
		 	     str3[i]=str2[i].replace("https","http")
			  }
			  this.form.bgdimageUrl =str3
		  }
        } else {
          this.$message.error("参数错误！");
        }
      });
    },

    // 店铺风格获取信息
    card_numberc() {
      show_admin_shop_info({
        shop_id: store.get("currentshopid"),
        type: "style"
      }).then(res => {
       
        if (res.status == 1) {
          this.form1.color = res.data.color;
        }else{
			this.$message.error("参数错误！");
		}
      });
    },

    // 店铺设置获取信息
    card_numbers() {
      show_admin_shop_info({
        shop_id: store.get("currentshopid"),
        type: "setup"
      }).then(res => {
      
        if (res.status == 1) {
          //店铺地址
          this.form2.shop_address = res.data.shop_address;
          //经度
          this.form2.longitude = res.data.longitude;
          //纬度
          this.form2.latitude = res.data.latitude;
          //创建店铺时间
          this.form2.create_time = res.data.create_time;
          //营业时间
          this.form2.business_hours = res.data.business_hours.split('-');
          //客服电话
          this.form2.low_price=res.data.initial_price;
          //免配送费价格
          this.form2.send_price = res.data.send_price;
          //配送费
          this.form2.send_info=res.data.shop_extra;
          //配送说明
          this.form2.tag = res.data.tag;
          //备注标签选择
          this.form2.cs_phone = res.data.cs_phone;
          //wifi 名称
          this.form2.shop_wifi_name = res.data.shop_wifi_name;
          //wifi 密码
          this.form2.shop_wifi_pwd = res.data.shop_wifi_pwd;
          //是否显示店铺信息
          this.form2.shop_info_isshow =res.data.shop_info_isshow == "1" ? true : false;
          //首页是否显示团购
          this.form2.is_group = res.data.is_group == "1" ? true : false;
          //团购页面缩略图
		 // this.form2.group_bg_img = res.data.group_bg_img;
		   var group_bg1= res.data.group_bg_img;
           var group_bgs = group_bg1.replace("https","http")
           this.form2.group_bg_img =group_bgs


          //首页是否显示砍价
          this.form2.is_bargain = res.data.is_bargain == "1" ? true : false;
          //砍价缩略图
		  //this.form2.bargain_bg_img = res.data.bargain_bg_img;
		   var bargain_bg1= res.data.bargain_bg_img;
           var bargain_bgs = bargain_bg1.replace("https","http")
           this.form2.bargain_bg_img =bargain_bgs
		   

          //显示优惠券
          this.form2.is_cash = res.data.is_cash == "1" ? true : false;
		  //是否显示搜索框
		  this.form2.is_search = res.data.is_search == "1" ? true :false; 
		  
		  //是否显示轮播
		   this.form2.is_slide = res.data.is_slide == "1" ? true :false; 
		  
		  //是否开启商品分组
		  this.form2.is_goods_group = res.data.is_goods_group == "1" ? true :false; 
		  
		  //是否开启热推
		  this.form2.is_hot_pust = res.data.is_hot_pust == "1" ? true :false; 

		  this.form2.photo = res.data.photo;
		  //this.form2.cash_bg_img = res.data.cash_bg_img;

		   //优惠券图片
		   var cash_bg_img1= res.data.cash_bg_img;
           var cash_bg_imgs = cash_bg_img1.replace("https","http")
           this.form2.cash_bg_img =cash_bg_imgs

		  
          this.form2.order[0].orOne = res.data.order.is_search_order; //搜索排序
          this.form2.order[1].orOne = res.data.order.is_slide_order; // 是否显示轮播排序
		  this.form2.order[2].orOne = res.data.order.is_cash_order; // 是否显示优惠券排序
		  this.form2.order[3].orOne = res.data.order.is_goods_group_order; // 是否商品分组排序
		  this.form2.order[4].orOne = res.data.order.shop_info_isshow_order; // 是否开启模块排序
		  this.form2.order[5].orOne = res.data.order.is_group_order; // 是否开启团购排序
		  this.form2.order[6].orOne = res.data.order.is_bargain_order; //是否开启砍价排序'
		  this.form2.order[7].orOne = res.data.order.is_hot_pust_order; // 是否热推排序
        } else {
          this.$message.error("参数错误！");
        }
      });
	},
	
	 order_up(value){
		var values="";
        $(".inputs input").each(function(i,item){
		var value=$(this).val(); 
		 values+=value; //获取所有的名称
		 });
	   var val=value; //获得当前输入框的值
	
	   var orders = this.form2.order;
	   var newValue=values.replace(val,""); //去除当前输入框的值
	  
    //    if(newValue==""){
    //      return false;
    //    }
        // if(newValue.indexOf(val)>-1){  //当前值和newValue作比较
        //     alert("有相同吗");
        //     $(value).focus();
		// }
		for(var i=0;i < newValue.length; i++){
           if (value == newValue[i]) {
			    this.form2.order[i+1].orOne ='9'
		  }
		}
	 },

    //清空logo
    // remove_logo() {
    //   this.upload_logo = false;
    //   this.form.LogoimageUrl = "";
    // },
    //清空分享图
    remove_share() {
      this.upload_share = false;
      this.form.share_bg_img = "";
    },
    //logo获取
    uploadsuccess(res, file, fileList) {
      this.form.ShareimageUrl = URL.createObjectURL(file.raw);
      this.upload_share = true;
      this.form.share_bg_img = res.data.img_url;
    },
    //logo上传判断
    logoUploadif(file) {
      const isJPG = file.type === "image/jpeg" || "iamge/png" || "image/bmp";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //清空背景
    remove_bgd(file) {
      this.upload_bgd = false;
      this.form.bgdimageUrl = "";
      if (file.response) {
        for (var i = this.form.bg_picture_url.length - 1; i >= 0; i--) {
          if (file.response.data.img_url == this.form.gdimageUrl[i]) {
            this.form.gdimageUrl.splice(i, 1);
          }
        }
      }
     
    },
    //背景获取
    uploadBdg(res, file, fileList) {
      this.form.gdimageUrl = URL.createObjectURL(file.raw);
      this.upload_bgd = true;
	  this.form.bg_picture_url.push(res.data.img_url);
	  this.form.bgdimageUrl = this.form.bg_picture_url
    },
    //背景上传判断
    bgdUploadif(file) {
      const isJPG = file.type === "image/jpeg" || "iamge/png" || "image/bmp";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    // 店铺信息提交
    complete(file) {
      this.inputEmpty();
      if (this.inputEmptys == false) {
        // if (this.form.logo == "") {
        //   this.form.logo = this.form.LogoimageUrl;
        // }
        if (this.form.share_bg_img == "") {
          this.form.share_bg_img = this.form.ShareimageUrl;
        }
        const params = {
          shop_id: store.get("currentshopid"),
          name: this.form.name,
          //logo: this.form.logo,
          share_bg_img:this.form.share_bg_img,
          type: "info",
          phone:this.form.admin_phone,
		  //bargain_bg_img: this.form.bargain_bg_img,
		  is_out_food: this.form.is_out_food ? "1" : "0", //外卖
		  is_in_food: this.form.is_in_food ? "1" : "0", //堂吃  
		  send_type:this.form.send_type?"3":"1",
          //bg_picture_url: this.form.bg_picture_url.join(",")
          bg_picture_url: this.form.bgdimageUrl.join(",")
        };
        up_shopInfo(params).then(res => {
          if (res.status == 1) {
            this.$message.success("更新完成");
            this.activeName='third';
          } else {
            this.$message.error(res.msg);
          }
        });
      }
      // submit_code({
      //   template_id: "13", //模板ID
      //   user_version: "1.0.1", //版本号
      //   user_desc: "new version", //代码描述
      //   authorizer_appid: store.get("appId"),
      //   shop_id: store.get("currentshopid"),
      // }).then(res => {});
    },

    // 店铺风格提交
    completec(file) {
      const params = {
        shop_id: store.get("currentshopid"),
        type: "style",
        color: this.form1.color
      };
      up_shopInfo(params).then(res => {
        if (res.status == 1) {
          this.$message.success("更新完成");
        } else {
          this.$message.error(res.msg);
        }
      });
	},
	
    // 店铺设置提交
    complete2(file) {
      this.inputEmpty();
     
      if (this.inputEmptys == false) {
			var falg=true
			if(this.form2.is_search == 1){
				if(this.form2.order[0].orOne==''){
					this.$message.error('搜索排序不能为空')
					falg=false
				}else{
					this.form2.order[0].orOne = this.form2.order[0].orOne //搜索排序
				}
			}else{
				this.form2.order[0].orOne = '0'
			}

			if(this.form2.is_slide==1){
				if(this.form2.order[1].orOne==""){
                    this.$message.error('排序不能为空')
					falg=false
				}else{
					this.form2.order[1].orOne = this.form2.order[1].orOne //轮播
				}
			}else{
				this.form2.order[1].orOne = '0'
			}

			if(this.form2.is_cash==1){
				if(this.form2.order[2].orOne==""){
                    this.$message.error('排序不能为空')
					falg=false
				}else{
					this.form2.order[2].orOne = this.form2.order[2].orOne //优惠券排序
				}
			}else{
				this.form2.order[2].orOne = '0'
			}

			if(this.form2.is_goods_group==1){
				if(this.form2.order[3].orOne==""){
                    this.$message.error('排序不能为空')
					falg=false
				}else{
					this.form2.order[3].orOne = this.form2.order[3].orOne //分组排序
				}
			}else{
				this.form2.order[3].orOne = '0'
			}

			if(this.form2.shop_info_isshow==1){
				if(this.form2.order[4].orOne==""){
                    this.$message.error('排序不能为空')
					falg=false
				}else{
					this.form2.order[4].orOne = this.form2.order[4].orOne //开启模块排序
				}
			}else{
				this.form2.order[4].orOne = '0'
			}

			if(this.form2.is_group==1){
				if(this.form2.order[5].orOne==""){
                    this.$message.error('排序不能为空')
					falg=false
				}else{
					this.form2.order[5].orOne = this.form2.order[5].orOne //开启团购排序
				}
			}else{
				this.form2.order[5].orOne = '0'
			}
			if(this.form2.is_bargain==1){
				if(this.form2.order[6].orOne==""){
                    this.$message.error('排序不能为空')
					falg=false
				}else{
					this.form2.order[6].orOne = this.form2.order[6].orOne //砍价排序'
				}
			}else{
				this.form2.order[6].orOne = '0'
			}
			if(this.form2.is_hot_pust==1){
				if(this.form2.order[7].orOne==""){
                    this.$message.error('排序不能为空')
					falg=false
				}else{
					this.form2.order[7].orOne = this.form2.order[7].orOne //热推排序
				}
			}else{
				this.form2.order[7].orOne = '0'
			}
			//store.set('shop_name',this.form2.)
        const params = {
          shop_id: store.get("currentshopid"),
          //token: store.get("token"),
          type: "setup",

          is_search: this.form2.is_search ? "1" : "0", //是否开启搜索                                               启搜索
          is_slide: this.form2.is_slide ? "1" : "0", //是否开启轮播
          is_goods_group: this.form2.is_goods_group ? "1" : "0", //是否开启商品分组
          is_hot_pust: this.form2.is_hot_pust ? "1" : "0", //是否开启热推
          //is_in_food: this.form2.is_in_food ? "1" : "0", //堂吃 
          shop_address: this.form2.shop_address, //店铺地址
          longitude: this.form2.longitude, // 经度
          latitude: this.form2.latitude, // 纬度
          business_hours: this.form2.business_hours[0]+'-'+this.form2.business_hours[1], // 营业时间
          cs_phone: this.form2.cs_phone, // 客服电话
          shop_wifi_name: this.form2.shop_wifi_name, // wifi账号
          shop_wifi_pwd: this.form2.shop_wifi_pwd, // wifi密码
          initial_price:this.form2.low_price,//免配送费价格
          send_price:this.form2.send_price,//配送费
          shop_extra:this.form2.send_info,//配送说明
          shop_info_isshow: this.form2.shop_info_isshow ? "1" : "0", //是否开启模块              
          is_group: this.form2.is_group ? "1" : "0", //是否开启团购
          group_bg_img: this.form2.group_bg_img, //团购缩略图
          is_bargain: this.form2.is_bargain ? "1" : "0", //是否开启砍价
          bargain_bg_img: this.form2.bargain_bg_img, //砍价缩略图
          is_cash: this.form2.is_cash ? "1" : "0", //是否开启优惠劵
		  cash_bg_img: this.form2.cash_bg_img, //优惠券的缩略图
		  is_search_order:this.form2.order[0].orOne, //搜索
          is_slide_order: this.form2.order[1].orOne, //轮播排序
		  is_cash_order: this.form2.order[2].orOne, //优惠券排序
		  is_goods_group_order: this.form2.order[3].orOne, //商品分组排序
		  shop_info_isshow_order: this.form2.order[4].orOne, //模块排序
          is_group_order: this.form2.order[5].orOne, //团购排序
          is_bargain_order: this.form2.order[6].orOne, //砍价排序
		  is_hot_pust_order: this.form2.order[7].orOne, //热推排序
		  tag:this.form2.tag.join(';')
		};
		
		  
     
        if (this.form2.is_cash && this.form2.cash_bg_img == "") {
          this.$message.error("请上传优惠券缩略图");
        } else if (this.form2.is_group && this.form2.group_bg_img == "") {
          this.$message.error("请上传团购缩略图");
        } else if (this.form2.is_bargain && this.form2.bargain_bg_img == "") {
          this.$message.error("请上传砍价缩略图");
        } else {
          if(falg){
				up_shopInfo(params).then(res => {
					if (res.status == 1) {
					this.$message.success("更新完成");
					this.$router.push("/unclewei/shop/shopinfo");
					} else {
					this.$message.error(res.msg);
					}
				});
		  }
        }
      }
      // submit_code({
      //   template_id: "13", //模板ID
      //   user_version: "1.0.1", //版本号
      //   user_desc: "new version", //代码描述
      //   authorizer_appid: store.get("appId"),
      //   shop_id: store.get("currentshopid"),
      //   //color: this.form.color
      // }).then(res => {});
	},
	
    // 点击input 右边图片排列顺序
    go1(e) {
	
      this.order_up(e);
      this.orOne = e;
      document.getElementById("order").style.order = this.orOne;
    },
    go2(e) {
	 this.order_up(e);
      this.orOne = e;
      document.getElementById("order1").style.order = this.orOne;
    },
    go3(e) {
		 this.order_up(e);
      this.orOne = e;
      document.getElementById("order2").style.order = this.orOne;
    },
    go4(e) {
		 this.order_up(e);
      this.orOne = e;
      document.getElementById("order3").style.order = this.orOne;
    },

    go5(e) {
		 this.order_up(e);
      this.orOne = e;
      document.getElementById("order4").style.order = this.orOne;
    },
    go6(e) {
		 this.order_up(e);
      this.orOne = e;
      document.getElementById("order5").style.order = this.orOne;
    },
    go7(e) {
		 this.order_up(e);
      this.orOne = e;
      document.getElementById("order6").style.order = this.orOne;
    },
    go8(e) {
		 this.order_up(e);
      this.orOne = e;
      document.getElementById("order7").style.order = this.orOne;
    }
  },

  created() {
    this.card_number();
    this.card_numberc();
    this.card_numbers();
  }
};

// export default {
//   data() {
//     return {
//       form: {
//         name: "", //店铺名称
//         shop_address: "", //店铺地址
//         longitude: "", //定位经度
//         latitude: "", //地址纬度
//         business_hours: "", //营业时间
//         cs_phone: "", //客服电话
//         shop_wifi_name: "", //wifi名称
//         shop_wifi_pwd: "", //wifi密码
//         LogoimageUrl: "", //logo上传
//         bgdimageUrl: [], //背景上传
//         logo: "",
//         color: "#609EFF",
//         photo: "1",
//         //is_Free:'1',//是否包邮
//         //logistics:'1',//物流配送方式
//         //logistics_price:'',//物流费用
//         shop_info_isshow: true, //是否显示店铺信息
//         is_group: true, //首页是否显示团购
//         group_bg_img: "", //团购页面缩略图
//         is_bargain: true, //首页是否显示砍价
//         bargain_bg_img: "", //砍价缩略图
//         is_cash: true, //是否显示优惠券
//         cash_bg_img: "", //优惠券缩略图
//         bg_picture_url: [], //背景图的url
//         create_time: "", //创建店铺时间
//         is_search: true, //搜索框
// 	       is_slide: true, //banner图
// 	    	is_goods_group:true //分组
//       },
//       inputEmptys: true, //提示清空方法
//       upload_logo: false, //logo上传成功切换内容
//       upload_bgd: false, //背景上传成功切换内容
//       CashVisible: false,
//       activeName: "first", //当前选择的导航
//       shop_id: store.get("currentshopid"), //店铺id
//       color1: "#E51C23", //颜色
//       styleInner: "",

//       orOne:1,
//       orOne1:2,
//       orOne2:3,
// 	    orOne3:4,
// 	    orOne4:5,
// 	    orOne5:6,
// 	    orOne6:7,
//     };
//   },
//   methods: {
//     //判断提示
//     inputEmpty() {
//       this.inputEmptys = true;
//       if (this.form.name == "") {
//         this.$message.error("请输入店铺名称");
//       } else if (this.form.LogoimageUrl == "") {
//         this.$message.error("请上传店铺logo");
//       } else if (this.form.bgdimageUrl == "") {
//         this.$message.error("请上传店铺背景");
//       } else {
//         this.inputEmptys = false;
//       }
//     },
//     del(index) {
//       this.form.bgdimageUrl.splice(index, 1);
//     },
//     //删除优惠券缩略图
//     remove_cash() {
//       this.form.cash_bg_img = "";
//     
//     },
//     //上传优惠券缩略图
//     uploadCash(file) {
//       this.form.cash_bg_img = "";
//       this.form.cash_bg_img = file.data.img_url;
//     },
//     removeBargain(file) {
//       this.form.bargain_bg_img = "";
//     },
//     uploadBargain(file) {
//       this.form.bargain_bg_img = file.data.img_url;
//     },
//     uploadgroup(file) {
//       this.form.group_bg_img = file.data.img_url;
//     },
//     removegroup(file) {
//       this.form.group_bg_img = "";
//     },
//     //获取信息
//     card_number() {
//       admin_shop_info({
//         shop_id: store.get("currentshopid")
//       }).then(res => {
//        
//         if (res.error_code == 1000) {
//           //店铺名称输出
//           this.form.name = res.data.name;
//           //店铺地址
//           this.form.shop_address = res.data.shop_address;
//           this.form.color = res.data.color;
//           //经度
//           this.form.longitude = res.data.longitude;
//           //纬度
//           this.form.latitude = res.data.latitude;
//           //创建店铺时间
//           this.form.create_time = res.data.create_time;
//           //营业时间
//           this.form.business_hours = res.data.business_hours;
//           //客服电话
//           this.form.cs_phone = res.data.cs_phone;
//           //wifi 名称
//           this.form.shop_wifi_name = res.data.shop_wifi_name;
//           //wifi 密码
//           this.form.shop_wifi_pwd = res.data.shop_wifi_pwd;
//           //是否显示店铺信息
//           this.form.shop_info_isshow =
//             res.data.shop_info_isshow == "1" ? true : false;
//           //首页是否显示团购
//           this.form.is_group = res.data.is_group == "1" ? true : false;
//           //团购页面缩略图
//           this.form.group_bg_img = res.data.group_bg_img;
//           //首页是否显示砍价
//           this.form.is_bargain = res.data.is_bargain == "1" ? true : false;
//           //砍价缩略图
//           this.form.bargain_bg_img = res.data.bargain_bg_img;
//           //显示优惠券
//           this.form.is_cash = res.data.is_cash == "1" ? true : false;
//           this.form.photo = res.data.photo;
//           if (res.data.bg_picture_url == null) {
//             this.form.bg_picture_url = [];
//           } else {
//             this.form.bg_picture_url = res.data.bg_picture_url.split(",");
//           }
//           this.form.cash_bg_img = res.data.cash_bg_img;
//           //logo输出
//           if (res.data.logo != "") {
//             this.upload_logo = true;
//             this.form.LogoimageUrl = res.data.logo;
//           }
//           //背景输出
//           if (res.data.bg_picture_url != "") {
//             this.upload_bgd = true;
//             this.form.bgdimageUrl = this.form.bg_picture_url;
//           }
//         } else {
//           this.$message.error("发生错误！");
//         }
//       });
//     },
//     //清空logo
//     remove_logo() {
//       this.upload_logo = false;
//       this.form.LogoimageUrl = "";
//     },
//     //logo获取
//     uploadsuccess(res, file, fileList) {
//       this.form.LogoimageUrl = URL.createObjectURL(file.raw);
//       this.upload_logo = true;
//       this.form.logo = res.data.img_url;
//     },
//     //logo上传判断
//     logoUploadif(file) {
//       const isJPG = file.type === "image/jpeg" || "iamge/png" || "image/bmp";
//       const isLt2M = file.size / 1024 / 1024 < 2;

//       if (!isJPG) {
//         this.$message.error("上传头像图片只能是 JPG 格式!");
//       }
//       if (!isLt2M) {
//         this.$message.error("上传头像图片大小不能超过 2MB!");
//       }
//       return isJPG && isLt2M;
//     },
//     //清空背景
//     remove_bgd(file) {
//       this.upload_bgd = false;
//       this.form.bgdimageUrl = "";
//       if (file.response) {
//         for (var i = this.form.bg_picture_url.length - 1; i >= 0; i--) {
//           if (file.response.data.img_url == this.form.gdimageUrl[i]) {
//             this.form.gdimageUrl.splice(i, 1);
//           }
//         }
//       }
//    
//     },
//     //背景获取
//     uploadBdg(res, file, fileList) {
//       this.form.gdimageUrl = URL.createObjectURL(file.raw);
//       this.upload_bgd = true;
//       this.form.bg_picture_url.push(res.data.img_url);
//     },
//     //背景上传判断
//     bgdUploadif(file) {
//       const isJPG = file.type === "image/jpeg" || "iamge/png" || "image/bmp";
//       const isLt2M = file.size / 1024 / 1024 < 2;

//       if (!isJPG) {
//         this.$message.error("上传头像图片只能是 JPG 格式!");
//       }
//       if (!isLt2M) {
//         this.$message.error("上传头像图片大小不能超过 2MB!");
//       }
//       return isJPG && isLt2M;
//     },
//     //提交
// complete(file) {
//   this.inputEmpty();
//   
//   if (this.inputEmptys == false) {
//     if (this.form.logo == "") {
//       this.form.logo = this.form.LogoimageUrl;
//     }
//     const params = {
//       shop_id: store.get("currentshopid"),
//       token: store.get("token"),
//       name: this.form.name,
//       shop_address: this.form.shop_address,
//       longitude: this.form.longitude,
//       latitude: this.form.latitude,
//       business_hours: this.form.business_hours,
//       cs_phone: this.form.cs_phone,
//       shop_wifi_name: this.form.shop_wifi_name,
//       shop_wifi_pwd: this.form.shop_wifi_pwd,
//       logo: this.form.logo,
//       shop_info_isshow: this.form.shop_info_isshow ? "1" : "0",
//       is_group: this.form.is_group ? "1" : "0",
//       group_bg_img: this.form.group_bg_img,
//       is_bargain: this.form.is_bargain ? "1" : "0",
//       bargain_bg_img: this.form.bargain_bg_img,
//       is_cash: this.form.is_cash ? "1" : "0",
//       cash_bg_img: this.form.cash_bg_img, //优惠券的缩略图
//       bg_picture_url: this.form.bg_picture_url.join(","),
//       photo: this.form.photo,
//       color: this.form.color
//     };
//    
//     if (this.form.is_cash && this.form.cash_bg_img == "") {
//       this.$message.error("请上传优惠券缩略图");
//     } else if (this.form.is_group && this.form.group_bg_img == "") {
//       this.$message.error("请上传团购缩略图");
//     } else if (this.form.is_bargain && this.form.bargain_bg_img == "") {
//       this.$message.error("请上传砍价缩略图");
//     } else {
//       update_shop(params).then(res => {
//         if (res.error_code == 1000) {
//           this.$message.success("更新完成");
//           this.$router.push("/business/shopinfo");
//         } else {
//           this.$message.error(res.msg);
//         }
//       });
//     }
//   }
//   submit_code({
//     template_id: "13", //模板ID
//     user_version: "1.0.1", //版本号
//     user_desc: "new version", //代码描述
//     authorizer_appid: store.get("appId"),
//     shop_id: store.get("currentshopid"),
//     color: this.form.color
//   }).then(res => {});
// },
//     Return() {
//       this.$router.push("/business/shopinfo");
//     },

//     // 点击input 右边图片排列顺序
//     go1(e) {
//       this.orOne = e;
//       document.getElementById("order").style.order = this.orOne;
//     },
//     go2(e) {
//       this.orOne1 = e;
//       document.getElementById("order1").style.order = this.orOne1;
//     },
//     go3(e) {
//       this.orOne2 = e;
//       document.getElementById("order2").style.order = this.orOne2;
//     },
//     go4(e) {
//       this.orOne3 = e;
//       document.getElementById("order3").style.order = this.orOne3;
// 		 },

//     go5(e) {
//       this.orOne4 = e;
//       document.getElementById("order4").style.order = this.orOne4;
// 	    },
// 	  go6(e) {
//       this.orOne5 = e;
//       document.getElementById("order5").style.order = this.orOne5;
// 	  },
// 	  go7(e) {
//       this.orOne6 = e;
//       document.getElementById("order6").style.order = this.orOne6;
//      }
//   },

//   created() {
//     this.card_number();
//   }
// };
</script>
<style lang="stylus" scoped>
.tags
	display flex
	align-items cneter
	.tag
		padding 2px 8px
		margin 0 10px
		background-color #eeeeee
		border-radius 5px
		position relative
	.close_tag
		position absolute
		right -8px
		top -8px
		cursor pointer
		width 14px
		height 14px
	.add_tag
		cursor pointer
		font-size 16px
		line-height 22px
		margin-left 10px
.options
	margin-top 20px
	display flex
	justify-content space-between
	padding 0 30%
.cancle_edit
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
.modify_page{
	padding-top: 30px;
    padding-left: 20px;
    font-size: 15px;
}
.qrcode{
	display:inline-block;
}
.download{
	margin-left:30px;
	cursor:pointer;
	color:#0089e1;
	font-size:12px;
}
.shop_logo {
	height: 50px;
	border-radius: 50%;
}
.dada_register{
	cursor:pointer;
	color:#0089e1;
}
.del {
	z-index: 100;
}

.l-content {
	width: 96%;
	margin: 0 auto;
	padding-top: 30px;
	// background: #FFFFFF;
}

.l-content-box {
	margin: 18px 0;
}

.banner {
	margin-top: 80px;
	margin-bottom: 40px;
}

.l-renovation-box-title {
	// margin-left: 60px;
	width: 150px;
	font-size: 15px;
	color: #323232;
	display: inline-block;
}

.free_info {
	margin-left: 77px;
	display: inline-block;
	color: rgba(250, 16, 16, 1);
	font-size: 13px;
	text-align: left;
	font-family: SourceHanSansSC-regular;
}

// .l-renovation-box-content .inputs {
// border: 1px solid #dcdfe6;
// padding: 5px;
// }
.l-renovation-box-content {
	display: inline-block;
	width: 400px;
	font-size: 15px;
	color: #323232;
}

.l-renovation-box-content2 {
	display: inline-block;
	width: 190px;
	font-size: 15px;
	color: #323232;
	margin-right: 17px;
}

.l-renovation-box-content3 {
	display: block;
	width: 100%;
	font-size: 15px;
	color: #323232;
	margin-right: 17px;
	margin-top: 10px;
}

.l-renovation-box-content2:nth-child(odd) {
	margin-right: 0;
}

.l-renovation-box-content .l-input, .l-renovation-box-content2 .l-input {
	width: 100%;
	height: 36px;
	line-height: 36px;
	// padding: 0 15px;
}

.l-input::-webkit-input-placeholder, .l-input::-webkit-input-placeholder {
	color: #C0C4CC;
}

.l-input:focus {
	border-style: solid;
	border-color: #03a9f4;
	box-shadow: 0 0 2px #03a9f4;
}

.l-footer {
	padding: 30px 0;
	text-align: center;
}

.l-footer-submit {
	display: inline-block;
	width: 100px;
	height: 35px;
	color: #FFFFFF;
	background: #0089E1;
	text-align: center;
	margin: 0 auto;
	line-height: 35px;
	font-size: 14px;
	cursor: pointer;
	border-radius: 5px;
}

.l-footer-submit2 {
	display: inline-block;
	width: 100px;
	height: 35px;
	color: #0089E1;
	border: 1px solid #0089E1;
	border-radius: 5px;
	text-align: center;
	margin: 0 auto;
	line-height: 35px;
	font-size: 14px;
	cursor: pointer;
	margin-right: 20px;
}

.lee-map {
	padding-left: 230px;
	padding-top: 15px;
	font-size: 12px;
	color: #c0c4cc;
}

.lee-map a {
	color: #409eff;
}

.bg_img {
	display: inline-block;
	vertical-align: middle;
	white-space: nowrap;
}

.l-renovation-box-content img, .shop_photo {
	// text-align: left;
	margin: 0px;
}

.shop_photo a {
	color: #0089e1;
	font-size: 12px;
	text-align: center;
}

.shop_photo2 {
	width: 100%;
	margin: 0px auto;
}

.shop_photo2 span {
	color: #0089e1;
	font-size: 12px;
	display: block;
}

.l-el-icon-plus {
	height: 100px;
	width: 100px;
	border: 1px #dcdfe6 dotted;
	vertical-align: top;
	margin-left: 10px;
}

.l-el-icon-plus i {
	line-height: 100px;
}

.l-cc {
	color: #999999;
	font-size: 12px;
}

.l-modify-logo {
	width: 120px;
}

.l-renovation-box-content .l-modify-img {
	height: 64px;
	width: 120px;
	margin-right: 5px;
}

// 店铺风格样式
.block, .colors {
	display: flex;
	align-items: center;
}

.block .demonstration, .change {
	font-size: 12px;
}

.block .colors, .change {
	padding-left: 20px;
}

.change {
	color: #0089e1;
}

.lee-list {
	display: flex;
	justify-content: space-evenly;
	margin-top: 40px;
	flex-wrap: wrap;
}

.lee-list li {
	max-width: 270px;
	position: relative;
}

.lee-list li img {
	width: 100%;
}

.lee-list-title {
	width: 100%;
	max-height: 48px;
	line-height: 48px;
	text-align: center;
	color: #fff;
	position: absolute;
	top: 0;
	left: 0;
}

.lee-list-title1 {
	width: 84px;
	max-height: 37px;
	line-height: 37px;
	text-align: center;
	color: #fff;
	position: absolute;
	bottom: 0;
	right: 0;
	font-size: 12px;
}

.lee-list1{
   position: absolute;
   background: #fff;
}

.lee-list-fs{
   left:5px;
   bottom: 107px;
}

.lee-list-fs1{
   left:100px;
   top:110px;
   font-size: 12px;
}

.lee-list-fs2{
   right:7px;
   top:112px;
   font-size: 12px;
}

.lee-list-fs3{
   right:84px;
   bottom: 46px;
   font-size: 12px;
}

.lee-list-fsimg{
	width: 18px;
    height: 18px;
    top: 55px;
    left: 7px;
    border-radius: 50%;
}
.lee-list-fsimg img,.lee-list-fsimg1 img,.lee-list-fsimg2 img{
	width: 100%;
	height: 100%;
}

.lee-list-fsimg1{
	width: 18px;
    height: 18px;
    top: 110px;
    left: 7px;
    border-radius: 50%;
}

.lee-list-fsimg2{
	width: 18px;
    height: 18px;
    bottom: 45px;
    left: 7px;
    border-radius: 50%;
}

.lee-list-title2 {
	bottom: 34px;
}

.lee-list-color {
	background: #00ff00;
}

// 店铺设置
.setting {
	border-bottom: 1px dashed #bbb;
	padding-bottom: 20px;
}

.el-tab-pane .setting:last-child {
	// border-bottom: none;
}

.upload {
	font-size: 12px;
	color: #0089e1;
}

.psfr {
	position: fixed;
	//position: absolute;
	width: 400px;
	height: 600px;
	z-index: 100;
	right: 50px;
	top:120px;;
	overflow: hidden;
	box-shadow: 2px 2px 20px #bbb;
}

.psfr-con {
	position: absolute;
	left: 0;
	top: 0;
	right: -17px;
	bottom: 0;
	overflow-x: hidden;
	overflow-y: scroll;
}

.psfr ul {
	display: flex;
	flex-direction: column;
}

.psfr li img {
	width: 100%;
}

// 餐饮方式
.restaurant{
	margin-top:20px;
}
.Tong{
	margin-top:18px;
}

@media (max-width: 900px) {
	.l-renovation-box-title {
		width: 100%;
	}

	.modify_page{
	   padding-top: 15px;
       padding-left: 0px;
       font-size: 14px;
     }

	.l-el-icon-plus {
		height: 100px;
		width: 100px;
		border: 1px #dcdfe6 dotted;
		vertical-align: top;
		// margin-left: 40px;
		margin-top: 20px;
	}

	.l-content {
		width: 100%;
		padding: 15px;
	}

	.bg_img:nth-child(2n) {
		margin-left: 20px;
	}

	.l-renovation-box-title {
		margin-left: 0;
	}

	// .l-renovation-box-content {
	// width: 100%;
	// }
	.l-renovation-box-content2 {
		width: 49%;
		margin-right: 0;
		margin-right: 2%;
	}

	.l-renovation-box-content2:nth-child(odd) {
		margin-left: -5px;
	}

	.lee-map {
		padding-left: 0;
	}

	.l-renovation-box-title {
		padding-bottom: 5px;
	}

	.l-renovation-box-content .l-input[data-v-3e271a51], .l-renovation-box-content2 .l-input[data-v-3e271a51] {
		padding: 0 3px;
	}
}
</style>
<style>
.modify_page .l-renovation-box-content .el-upload--picture-card {
  height: 0 !important;
}

@media (max-width: 900px) {
  .modify_page .el-tabs--top .el-tabs__content {
    /* padding-left: 20px; */
    padding: 0 20px;
  }

  .l-renovation-box-content .l-input,
  .l-renovation-box-content2 .l-input {
    /* width: 80% !important; */
  }
   .modify_page .el-tabs--top .el-tabs__nav-wrap {
    margin: 0 20px;
  }

   .modify_page .lee-list {
    margin-top: 0 !important;
  }
  .modify_page .lee-list li {
    margin-top: 20px;
  }

   .modify_page .psfr {
    display: none;
  }
}
</style>

