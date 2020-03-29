<template>
	<div class="logistics_page">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="商家配送" name="first">
				<div class="big_box">
					<div class="l-container-open">
						<div class="l-container-left">是否开启配送方式：</div>
						<el-switch class="l-container-right" v-model="form1.is_dispatching" active-color="#13ce66" inactive-color="#ff4949" @change="handleOpen1"></el-switch>
					</div>
					<div class="l-container">
						<div class="l-container-left">请输入快递费用：</div>
						<el-input class="l-container-right" size="small" v-model="form1.cost" placeholder="请输入配送费用（免快递费输入 0 ）"></el-input>
					</div>
					<div class="l-container-btn">
						<el-button  class="l-btn-left" type="primary" @click="handleSubmit1">保存</el-button>						
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="达达配送" name="second">
				<div class="l-container-open">
					<div class="l-container-left">是否开启配送方式：</div>
					<el-switch class="l-container-right" v-model="form2.is_show" active-color="#13ce66" inactive-color="#ff4949" @change="handleOpen2"></el-switch>
				</div>
				<div class="balance">
						当前余额：<span class='money'>{{form2.balance}}</span> 元&nbsp;&nbsp;<span class="Add_money" @click="handleAlert"> 充值 </span>&nbsp;&nbsp;<span>配费说明 &nbsp;
								<el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
									<i class="el-icon-question"></i>
    							</el-tooltip>
							</span>
				</div>
				<div class="l-container">
					<div class="l-container-left">店铺名称：</div>
					<el-input class="l-container-right" v-model="form2.shop_name"></el-input>
				</div>
				<div class="l-container">
					<div class="l-container-left">收货人姓名：</div>
					<el-input type="tel" class="l-container-right" v-model="form2.user_name"></el-input>
				</div>
				<div class="l-container">
					<div class="l-container-left">联系电话：</div>
					<el-input type="tel" class="l-container-right" v-model="form2.shop_phone"></el-input>
				</div>
				<div class="l-container">
					<div class="l-container-left">所在城市：</div>
					<div class="l-container-select">
						<el-select v-model="form2.cityone" placeholder="请选择" @change=handleprovinceList>
							<el-option v-for="(item,index) in form2.provinceList.province" :label="item.province" :key="item.provinceId" :value="item.provinceId"></el-option>
  						</el-select>
						<el-select v-model="form2.citytwo" placeholder="请选择" :disabled="form3.province_disabel" @change="handlecity">
							<el-option v-for="(item,index) in form2.provinceList.City"  :label="item.city" :key="item.cityID" :value="item.cityID"></el-option>
  						</el-select>
						<el-select v-model="form2.citythree" placeholder="请选择" :disabled="form3.city_disabel">
							<el-option v-for="(item,index) in form2.provinceList.county" :key="item.countyId" :label="item.county" :value="item.county"></el-option>
  						</el-select>
						  <!--<el-select v-model="form2.city" placeholder="请选择" @change=handleprovinceList>
							<el-option v-for="(item,index) in form2.provinceList" :label="item.cityName" :key="index" :value="item.cityCode"></el-option>
  						</el-select>-->
					</div>
				</div>
				<div class="l-container">
					<div class="l-container-left">详细地址：</div>
					<el-input type="tel" class="l-container-right" v-model="form2.address"></el-input>
				</div>
				<div class="l-container">
					<div class="l-container-left">地理定位：</div>
					<div class="l-container-right">
						<el-input type="text" class="l-input" v-model="form2.longitude" placeholder="请输入经度 ( 如120.136244)" />
						<el-input type="text" class="l-input" v-model="form2.latitude" placeholder="请输入纬度 ( 如30.121542)" />
					</div>
				</div>
				<div class="l-container">
					<div class="lee-map">
						可通过<a target="_blank" href='https://lbs.qq.com/tool/getpoint/'> 腾讯地图 </a>获取经纬度
					</div>
				</div>
				<div class="l-radio-group">
					<div class="l-container">
						<div class="radio-group-list">业务类型：</div>
						<el-radio-group v-model="form2.radio_group">
							<el-radio :label="1">食品小吃</el-radio>
							<el-radio :label="2">食品饮料</el-radio>
							<el-radio :label="3">鲜花</el-radio>
							<el-radio :label="8">文印票务</el-radio>
							<el-radio :label="9">便利店</el-radio>
							<el-radio :label="13">水果生鲜</el-radio>
							<el-radio :label="19">同城电商</el-radio>
							<el-radio :label="20">医药</el-radio>
							<el-radio :label="21">蛋糕</el-radio>
							<el-radio :label="24">酒品</el-radio>
							<el-radio :label="25">小商品市场</el-radio>
							<el-radio :label="26">服装</el-radio>
							<el-radio :label="27">汽修零配</el-radio>
							<el-radio :label="28">数码</el-radio>
							<el-radio :label="5">其他</el-radio>
						</el-radio-group>
					</div>
				</div>
				<div class="l-container">
					<div class="l-container-left">收取用户费用：</div>
					<el-input type="tel" class="l-container-right" v-model="form2.cost"></el-input>
				</div>
				<div class="l-container-btn">
					<el-button  class="l-btn-left" type="primary" @click='handleSubmit2'>保存</el-button>						
				</div>
				<!--充值弹出层-->
				<el-dialog title="充值" :visible.sync="form2.DialogVisible" width="35%" center>
					<div class="form">
						<div class="form-container">
								<div class="form-container-left">充值金额：</div>
								<el-input class="form-container-value" placeholder="请输入充值金额" v-model="form2.recharge"></el-input>
						</div>
						<div class="form-container">
								<ul class="form-container-type">
									<li v-for="(item,index) in form2.radioList" :key="index" :class="form2.selectedNum==index?'active':''" class="type_pay" @click="select(index)">
										<img :src="item.img" alt="">
										{{item.title}}
									</li>
								</ul>
						</div>
					</div>
					<span slot="footer" class="dialog-footer">
						<el-button type="primary" @click="handleRecharge">充 值</el-button>
					</span>
					</el-dialog>
			</el-tab-pane>
			<el-tab-pane label="快递配送" name="third">
				<div class="l-container-open">
					<div class="l-container-left">是否开启配送方式：</div>
					<el-switch class="l-container-right" v-model="form3.is_show" active-color="#13ce66" inactive-color="#ff4949" @change="handleOpen3"></el-switch>
				</div>
				<div class="explain">
					<div class='explain_title'>快递使用说明</div>
					<div class='explain_strip'>1. 按订单金额：总订单金额多少钱，收取多少快递费用；如果某些城市免邮费，都可以选择城市，把订单金额与快递费用输入0元；</div>
				</div>
				<div class="l-container">
					<div class="l-container-left">选择快递公司：</div>
						<el-select v-model="form3.express" placeholder="请选择快递" @change="handleSelected">
							<el-option label="申通" :value="1"></el-option>
							<el-option label="圆通" :value="2"></el-option>
							<el-option label="中通" :value="3"></el-option>
							<el-option label="韵达" :value="4"></el-option>
							<el-option label="天天" :value="5"></el-option>
							<el-option label="百世汇通" :value="6"></el-option>
							<el-option label="京东快递" :value="7"></el-option>
							<el-option label="EMS" :value="8"></el-option>
							<el-option label="德邦" :value="9"></el-option>
							<el-option label="全峰" :value="10"></el-option>
							<el-option label="中铁快运" :value="11"></el-option>
							<el-option label="如风达" :value="12"></el-option>
							<el-option label="宅急送" :value="13"></el-option>
							<el-option label="其它" :value="14"></el-option>
						</el-select>
				</div>
				<div class="l-container">
					<div class="l-container-left">计算方式：</div>
					<div class="l-container-right">
						<el-radio-group v-model="form3.Billingway">
							<el-radio :label="1">按订单金额</el-radio>
							<el-radio :label="2">按件数</el-radio>
							<el-radio :label="3">按重量</el-radio>
						</el-radio-group>
					</div>
				</div>
				<div class="l-tabel">
					<div class="l-tabel-left">配送区域：</div>
					<table class="table">
						<thead class="tabelheader">
								<tr>
									<th class="min_width">可配送区域</th>
									<th>订单金额</th>
									<th>快递费用</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody class="tabelbody">
								<tr v-for="(item,index) in form3.list" :key="index">
									<td class="min_width"><span class="mobile">可配送区域:</span><span>{{item.province | toStr}}</span></td>
									<td>
										<span class="mobile">订单金额:</span>
										<span class='price_row'>
											<el-input class="clo" v-model="item.order_price[index]" v-for="(items,index) in item.order_price" :key='index'></el-input>
											<!--<el-input class="clo" v-model="item.order_price"></el-input>-->
										</span>
									</td>
									<td>
										<span class="mobile">快递费用:</span>
										<span class='price_row'>
											<el-input class="clo" v-model="item.express_fee[index]" v-for="(items,index) in item.express_fee" :key='index'></el-input>
											<!--<el-input class="clo" v-model="item.express_fee"></el-input>-->
										</span>
									</td>
									<td class="last_btn">
										<span class="data_btn btn_info" @click="handle_Add(index)">添加</span>
										<span class="data_btn btn_success" @click="handleEditor(item.province,index,item.provinceId)">编辑</span>
										<!--<span class="data_btn btn_danger" :key='index' @click="handleDelete(item.id)">删除</span>-->
										<span class="del">
											<span class="data_btn btn_danger"  v-for="(items,i) in item.express_fee" :key='i' @click="handleDelete(index,i,item.id)">删除</span>
										</span>
									</td>
								</tr>
							</tbody>	
					</table>
					<div class="area"><span @click="handleAdd">指定可配送区域和运费</span></div>					
				</div>
				<div class="l-container-btn">
					<el-button  class="l-btn-left" type="primary" @click="handleSubmit3">保存</el-button>						
				</div>
				<el-dialog title="选择可配送区域" :visible.sync="form3.dialogVisible" width="40%"
				 :modal-append-to-body='false' :show-close='false' :close-on-press-escape='false' :close-on-click-modal='false'>
					<div class="transfer">
						<el-transfer v-model="form3.value1" :props="{key:'province'}" :data="form3.data" :titles="['可选省、市、区', '已选省、市、区']" target-order='unshift' @change='handleChange'>
							<!--<el-button class="transfer-footer" slot="right-footer" size="small">保存</el-button>-->
						</el-transfer>
					</div>
					<span slot="footer" class="dialog-footer">
						<el-button @click="handleCant">取 消</el-button>
						<el-button type="primary" @click="handleConfirm">确 定</el-button>
					</span>
					</el-dialog>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import {get_province,get_city,get_county,get_dispatch,up_dispatch,get_showArea,add_expressFee,del_express,addCity,add_dada_shop,get_shop_dada_config,edit_data_shop,recharge,select_one} from '@/utils/api'
import wx from "@/assets/images/wx.png";
import zfb from "@/assets/images/zfb.png";
	export default{
		data(){
			return{
				activeName:'first',
				index:'',
				form1:{//商家配送信息
					cost:'',//快递费用
					is_dispatching:true,
				},
				form2:{//达达
					is_show:true,
					balance:'0.00',//达达余额
					shop_name:'邻伍',//店铺名称
					shop_phone:'15212345678',
					//city:'021',
					user_name:'周礼义',
					cityone:'',
					edit:false,
					recharge:'0.01',//充值的金额
					citytwo:'',
					citythree:'',
					address:'颛桥镇沪闵路383号',//详细地址
					latitude:'121.69',//经度
					longitude:"31.25",//纬度
					radio_group:1,
					cost:'99.88',//费用
					 radioList: [
						{
							title: "微信支付",
							img:wx
						},
						{
							title: "支付宝支付",
							img: zfb
						}
					],
					selectedNum: "",
					DialogVisible:false,//充值页面的弹出层
					//provinceList:'',
					provinceList:{//省市区
						province:[],
						City:[],
						county:[]
					},
					is_second:true
				},
				form3:{
					is_show:true,
					express:1,//选择快递公司
					order_price:'',//订单金额
					express_fee:'',//快递费用
					Billingway:1,//计费方式
					value1:[],//穿梭框的值
					list:[
						{id:"1",provinceId:"110000,120000",province:"北京市、天津市",order_price:'10.00,20.00',express_fee:'2.00,5.00'},
						{id:"2",provinceId:"130000,140000",province:"河北省、山西省",order_price:'810.00,150',express_fee:'1.00,9.00'},
					],
					data:[//穿梭框的数据来源
					],
					open_Editor:false,//编辑穿梭框开关
					province_disabel:true,
					city_disabel:true,
					dialogVisible:false,//弹窗是否可见
					is_third:true	
				},
				index:0,//记录当前编辑的第几个
			}	
		},
		methods:{
			handleOpen1(e){
				if(e){
					select_one({
						shop_id:store.get('currentshopid'),
						dispatchType:'1'
					})
					this.form2.is_second=true
					this.form3.is_third=true
				}	
			},
			handleOpen2(e){
				if(e){
					select_one({
						shop_id:store.get('currentshopid'),
						dispatchType:'3'
					})
					this.form3.is_third=true
				}	
			},
			handleOpen3(e){
				if(e){
					select_one({
						shop_id:store.get('currentshopid'),
						dispatchType:'4'
					})
					this.form2.is_second=true
				}	
			},
			select(i){
				this.form2.selectedNum = i;
			},
			get_dada(){
				get_shop_dada_config({//请求达达页面数据
					shop_id:store.get('currentshopid'),
					dispatchType:'3'
				}).then(res=>{
					if(res.status=='1'){
						this.form2.balance=res.data.accountMoney
						this.form2.shop_name=res.data.station_name
						this.form2.user_name=res.data.contact_name
						this.form2.cityone=res.data.city_name
						this.form2.citytwo=res.data.area_name.split(',')[0]
						this.form2.citythree=res.data.area_name.split(',')[1]
						this.form2.address=res.data.station_address
						this.form2.latitude=res.data.lng
						this.form2.shop_phone=res.data.phone
						this.form2.longitude=res.data.lat
						this.form2.is_show=res.data.is_show=='1'?true:false
						this.form2.radio_group=Number(res.data.business)
						this.form2.cost=res.data.money
						if(res.data.id!=undefined){
							this.form2.edit=true
						}
					}
				})
			},
			handleRecharge(){//充值
				if(this.form2.recharge==''){
					this.$message.error('充值金额不能为空')
				}else{
					recharge({
						money:this.form2.recharge,
						shop_id:store.get('currentshopid'),
					}).then(res=>{
						window.open(res)
						//window.location.href=res
						this.get_dada()
					})
					this.form2.DialogVisible = false
				}	
			},
			handleAlert(){
				this.form2.DialogVisible=true
				this.form2.recharge=''
			},
			handleSubmit1(){//第一个页面提交
					if(this.form1.cost==''){
						this.$message.error('请填写快递费用')
					}else{
						up_dispatch({
							shop_id:store.get('currentshopid'),
							dispatchType:'1',
							money:this.form1.cost,
							is_show:this.form1.is_dispatching?'1':'0'
						}).then(res=>{
							if(res.status=='1'){
								this.$message.success('提交成功')
							}
						})
					}
			
			},
			handleSubmit2(){//第二个页面提交
				var area_name=''
				if(this.form2.shop_name==''){
					this.$message.error('店铺名称不能为空')
				}else if(this.form2.shop_phone==''){
					this.$message.error('手机号不能为空')
				}else if(this.form2.user_name==''){
					this.$message.error('收货人姓名不能为空')
				}else if(this.form2.cityone==''&&this.form2.citytwo==''&&this.form2.citythree==''){
					this.$message.error('所在城市不能为空')
				}else if(this.form2.address==''){
					this.$message.error('详细地址不能为空')
				}else if(this.form2.longitude==''&&this.form2.latitude==''){
					this.$message.error('经纬度不能为空')
				}else if(this.form2.cost==''){
					this.$message.error('用户费用不能为空')
				}else if(this.form2.radio_group==''){
					this.$message.error('业务类型不能为空')
				}else{
					// if(this.form2.citytwo.indexOf('辖')!=-1||this.form2.citytwo=='县'){
					// 	area_name=this.form2.citythree
					// }else{
					// 	area_name=this.form2.citytwo
					// }
					area_name=this.form2.citytwo+','+this.form2.citythree
					if(this.form2.edit){//判断是编辑还是新增
						edit_data_shop({
							shop_id:store.get('currentshopid'),
							shopName:this.form2.shop_name,//店铺名称
							receiverName:this.form2.user_name,
							receiverPhone:this.form2.shop_phone,//电话
							//cityCode:this.form2.city,//所选城市
							city_name:this.form2.cityone,
							area_name:area_name,
							is_show:this.form2.is_show?'1':'0',
							receiverAddress:this.form2.address,//详细地址
							receiverLat:this.form2.longitude,//纬度
							receiverLng:this.form2.latitude,//经度
							cargoPrice:this.form2.cost,
							dispatchType:'3',
							cargo_type:this.form2.radio_group//订单类型
						}).then(res=>{
							if(res.status=='1'){
								this.$message.success('修改成功')
							}
						})
					}else{
						add_dada_shop({
							shop_id:store.get('currentshopid'),
							shopName:this.form2.shop_name,//店铺名称
							receiverName:this.form2.user_name,
							receiverPhone:this.form2.shop_phone,//电话
							//cityCode:this.form2.city,//所选城市
							city_name:this.form2.cityone,
							area_name:area_name,
							is_show:this.form2.is_show,
							receiverAddress:this.form2.address,//详细地址
							receiverLat:this.form2.longitude,//纬度
							receiverLng:this.form2.latitude,//经度
							cargoPrice:this.form2.cost,
							dispatchType:'3',
							cargo_type:this.form2.radio_group//订单类型
						}).then(res=>{
							if(res.status=='1'){
								this.$message.success('提交成功')
							}
						})
					}
					
				}
				
			},
			handleSubmit3(){//第三个页面提交
				console.log(this.form3.list)
				for(var i=0,arr=[];i<this.form3.list.length;i++){
					arr.push({
						provinceId:this.form3.list[i].provinceId,
						order_price:this.form3.list[i].order_price.join(','),
						express_fee:this.form3.list[i].express_fee.join(','),
						province:this.form3.list[i].province
					})
				}
				add_expressFee({
					is_show:this.form3.is_show?'1':'0',
					shop_id:store.get('currentshopid'),
					express_company:this.form3.express,
					account_mode:this.form3.Billingway,
					dispatchType:'4',
					area:arr
				}).then(res=>{
					if(res.status=='1'){
						this.$message.success('提交成功')
					}
				})
			},
			handle_Add(i){
				 this.form3.list[i].order_price.push('0.00')
				 this.form3.list[i].express_fee.push('0.00')
			},
			handleCant(){//取消按钮时
				this.form3.dialogVisible = false
				if(this.form3.open_Editor){
					for(var i=0;i<this.form3.value1.length;i++){
						for(var j=0;j<this.form3.data.length;j++){
							if(this.form3.value1[i]==this.form3.data[j].province){
								this.form3.data.splice(j,1)
								console.log(this.form3.data)
								console.log(j)
							}
						}
					}
				}
				this.form3.value1=[]			
			},
			handleDelete(index,i,id){//删除
				if(this.form3.list[index].express_fee.length=='1'){
					del_express({
						shop_id:store.get('currentshopid'),
						id:id
					}).then(res=>{
						if(res.status=='1'){
							this.getRequery()
							this.$message.success('删除成功')
						}
					})
				}
				this.form3.list[index].express_fee.splice(i,1)
				this.form3.list[index].order_price.splice(i,1)
			},
			handleChange(e){//穿梭框change事件
				console.log(e)
			},
			handleAdd(){//增加城市区域事件
				this.form3.dialogVisible = true
				this.form3.value1=[]
				this.form3.open_Editor=false
			},
			handleEditor(item,index,id){
				console.log('编辑的值',item,index,id)
				//console.log('编辑前的数据源',this.form3.data)
				 	// var reg=/\d$/;
					//  var provinceId=''
					//  if(reg.test(id)){
					// 	 provinceId=id
					//  }else{
					// 	 provinceId=id.slice(0,id.length-1)
					//  }
					 var reg=/[\u4E00-\u9FA5]$/;
					 var items=''
					 if(reg.test(item)){
						 items=item.split('、')
					 }else{
						 items=item.slice(0,item.length-1).split('、')
					 }
					 console.log(items)
					this.index=index
					for(var i=0;i<items.length;i++){//遍历编辑的值
						var falg=true
						for(var j=0;j<this.form3.data.length;j++){//遍历数据源	
							if(items[i]==this.form3.data[j].province){//若当前编辑的值在数据源中没找到，就添加，否则不添加
							 	falg=false
							}
						}
						if(falg){	
							this.form3.data.push({province:items[i]})
						}	
					}
				 this.form3.value1=items
				 this.form3.dialogVisible=true
				 this.form3.open_Editor=true
				//console.log('编辑后的数据源',this.form3.data)
			},
			handleClick(tab, event){
				if(tab.paneName=='first'){
					this.get_show()
				}else if(tab.paneName=='second'){
					if(this.form2.is_second){
						this.get_dada();
						this.form2.is_second=false
					}
				}else if(tab.paneName=='third'){
					if(this.form3.is_third){
						get_showArea({//请求表格数据==>配送区域
							shop_id:store.get('currentshopid')
						}).then(res=>{
							if(res.status=='1'){
								this.form3.data=res.area
							}
						})
						this.getRequery()
						this.form3.is_third=false
					}					
				}
      		},
			getRequery(){
				get_dispatch({//请求快递配送的数据
					shop_id:store.get('currentshopid'),
					dispatchType:'4'
				}).then(res=>{
					if(res.status=='1'){
						this.form3.is_show=res.is_show=='1'?true:false
						this.form3.Billingway=Number(res.account_mode)
						this.form3.express=Number(res.express_company)
						this.form3.list=res.is_get
						for(var i=0;i<this.form3.list.length;i++){
							var order_price=[],express_fee=[]
							order_price=this.form3.list[i].order_price.split(',')
							express_fee=this.form3.list[i].express_fee.split(',')
							this.form3.list[i].order_price=order_price
							this.form3.list[i].express_fee=express_fee
						}
					}
				})
			},
			handleSelected(e){
			},
			handleConfirm(){
				if(this.form3.value1!=''){
					//选中城市后，删除原来数组里面的相同城市
					var proinceId=[];
					for(var i=0;i<this.form3.value1.length;i++){//外层遍历选中的城市
						for(var j=0;j<this.form3.data.length;j++){//内层遍历数据源
							if(this.form3.value1[i]==this.form3.data[j].province){//获取选中的城市在数据源中的下标
								proinceId.push(this.form3.data[j].provinceId)
								this.form3.data.splice(j,1)
							}
						}
					}
					if(this.form3.open_Editor){
						//this.form3.list[this.index].province=this.form3.value1
						console.log(this.form3.list[this.index])
						this.form3.list[this.index]={
							id:this.form3.list[this.index].id,
							provinceId:proinceId.join(),
							province:this.form3.value1.join('、'),
							order_price:this.form3.list[this.index].order_price,
							express_fee:this.form3.list[this.index].express_fee
						}
						console.log(this.form3.list[this.index])
					}else{
						this.form3.list.unshift({
							provinceId:proinceId.join(),
							province:this.form3.value1.join('、'),
							 order_price:['0.00'],
							 express_fee:['0.00'],
							//order_price:'0.00',
							//express_fee:'0.00'
						})
					}
				}
				this.form3.value1=[]
				this.form3.dialogVisible = false
				console.log(this.form3.list)
			},
			handleprovinceList(e){
				for(var i=0;i<this.form2.provinceList.province.length;i++){
					if(this.form2.provinceList.province[i].provinceId==e){
						this.form2.cityone=this.form2.provinceList.province[i].province
					}
				}
				console.log(this.form2.cityone)
				this.form2.citytwo=''
				this.form2.citythree=''
				this.form3.province_disabel=false
				get_city({
					provinceId:e
				}).then(res=>{//请求市区
					this.form2.provinceList.City=res.data
				})
			},
			handlecity(e){
				for(var i=0;i<this.form2.provinceList.City.length;i++){
					if(this.form2.provinceList.City[i].cityID==e){
						this.form2.citytwo=this.form2.provinceList.City[i].city
					}
				}
				console.log(this.form2.citytwo)
				this.form2.citythree=''
				this.form3.city_disabel=false
				get_county({
					cityId:e
				}).then(res=>{
					this.form2.provinceList.county=res.data
				})
			},
			get_show(){
				get_dispatch({//得到商家配送信息
					shop_id:store.get('currentshopid'),
					dispatchType:'1'
				}).then(res=>{
					if(res.status=='1'){
						this.form1.is_dispatching=res.data.is_show=='1'?true:false
						this.form1.cost=res.data.money
					}
				})
			}		
 		},
		created(){
			this.get_show()
			get_province({}).then(res=>{//请求省份
				this.form2.provinceList.province=res.data
			})
			// addCity({}).then(res=>{//达达城市接口
			// 	if(res.status=='success'){
			// 		this.form2.provinceList=res.result
			// 	}
			// })
			
		}
	}
</script>
<style lang="stylus" scoped>
.logistics_page{
	padding-top:30px;
	padding-left:20px;
	font-size:15px;
}
a,.Add_money{
	color:#2589FF;
	cursor:pointer;	
}
.transfer{//穿梭框样式
	display:flex;
	justify-content:center;
}
.form{
	text-align:center;
	.form-container{
		display:flex;
		padding:0 15px;
		margin-bottom:15px;
		line-height:40px;
		.form-container-left{
			min-width:70px;
			margin-right:15px;
		}
		.form-container-value{
			width:50%;
			display: flex;
		}
		.form-container-type{
			display: flex;
			margin-left:75px
		}
	}
}
.type_pay {
    width: 120px;
    margin-left: 10px;
    border: 1px solid #bbbbbb;
    text-align: center;
	cursor:pointer;		
}
.type_pay img {
    display: inline-block;
    width: 22px;
    height: 22px;
}
.active {
    border: 1px solid #409eff
}
.l-radio-group{
	border-top:1px solid #bbb;
	border-bottom:1px solid #bbb;
	margin:15px 0;
	padding:10px 0;
	.el-radio{
		margin:5px 20px;
		max-width:90px
	}
}
.balance{
	padding:30px 20px;
	background:#f5f7fa;
	border:1px solid #bbb;
	border-radius:4px;
	margin:15px 0;
	.money{
		color:#fe1111;
		font:700 17px '微软雅黑'
	}
}
.table .mobile{
	display:none;
}
.explain{
	margin-top:15px;
	padding:15px 15px 40px;
	background:#f5f7fa;
	border:1px solid #bbb;
	border-radius:4px;
	.explain_title{
		padding-left:15px;
		border-left:5px solid #409EFF;
		font:700 17px '宋体';
		margin-bottom:10px
	}
	.explain_strip{
		padding-left:30px;
	}
}
.l-container-open{
	display:flex;
}
.l-container{
	display:flex;
	align-items:center;
	margin:15px 0;
	.lee-map{
		padding-left:120px
	}
	.l-container-left,.radio-group-list{
		min-width:110px;
	}
	.l-container-right{
		width:30%;
		.l-input{
			width:190px;
		}
	}
	.l-container-select{
		display:flex;
		.el-select{
			width:130px;
			margin-right:5px;
		}
	}
}
.area{
	padding-left:20px;
	height:50px;
	line-height:50px;
	border-bottom:1px solid #bbb;
	color:#2589FF;
	cursor:pointer;
	span{
		display:inline-block;
		height:100%;
	}
}
.l-container-btn{
	margin-top:20px;
	display:flex;
	padding-left:130px;
}
.table{
	width:100%;
	display:table;
	margin-left:15px;
	margin-top:20px;
	text-align:center;
	thead{
		background:#293643;
		color:#fff;border-radius:4px;
	}
	tbody tr{
		border-bottom:1px solid #bbb;
	}
	tr{
		height:50px;
		td .el-input{
			width:100px;
			text-align:center;			
		}
		.min_width{
			max-width:180px;
		}
		.price_row{
			display:flex;
			flex-flow:column wrap;
			align-items:center;
			.clo{
				margin:5px 0
			}
		}
	}
}
.last_btn{
	display:flex;
	justify-content:center;
	span{
		margin:5px;
	}
	.del{
		display:flex;
		flex-flow:column wrap;
		justify-content:center;
		margin:0px 0px;
	}
}
@media(max-width:900px) {
.logistics_page{
	padding-top:30px;
	padding:20px;
	font-size:14px
}
.data_btn{
	height:32px;
	line-height:32px;
}
.form .form-container {
	line-height:30px;
	.form-container-left{
		min-width:70px;
		margin-right:15px;
	}
	.form-container-value{
		flex:1;
		margin-right:5px;
		display: flex;
	}	
}
.form .form-container .form-container-type{
	margin-left:5px;
}
.table .mobile{
	display:inline-block;
	margin-right:30px;
	text-align:left;
	min-width:80px;
}
.tabelheader{
	display:none;
}
.l-container{
	display:block;
	.l-container-right{
		width:90%;
	}
	.l-container-left{
		margin-bottom:5px;
	}
}
.balance{
	margin: 15px 5px;
}
.l-container .l-container-select .el-select{
	width:80%;
	margin-right:10px;
	height:30px;
}
.l-container .l-container-right .l-input{
		margin:5px 0px
	}
.l-radio-group .el-radio{
	width:80px;
}
.table{
	margin-top:10px;
	tbody tr{
		display:block;
		height:auto;
		line-height:inherit;
		td{
			width:90%;
			display:flex;
			margin:0px 0px 10px;
			line-height:30px;
		}
		.min_width{
			max-width:100%;
		}
		.last_btn{
			margin:15px;
			display:flex;
			justify-content:space-around;
		}
}
}		  
	}
</style>
<style>
 .table .el-input__inner{
	text-align:center;
	}
.logistics_page .el-dialog .el-dialog__header{
	background:#409eff;/*穿梭框头部样式*/
}
.logistics_page .el-dialog__title{
	color:#fff;/*穿梭框头部样式*/
}
/*.logistics_page .el-transfer-panel__header{
	background:#409eff;
}*/
.logistics_page  .el-dialog__headerbtn .el-dialog__close{
	color:#fff/*穿梭框头部样式*/
}
  @media(max-width:900px) {
	  .l-container-select .el-input__inner{
         height: 30px !important;
        line-height: 30px;
	  }
	  .l-container .el-input__icon{
			line-height:1;
	  }
	  .table .el-input__inner{
		text-align:center;
		}
  }
</style>

