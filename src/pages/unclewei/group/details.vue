<template>
	<div class="member_page">
		<div class="details">
			<div class="sales_title">
				<a><img src="@/assets/images/back.png" alt="" @click="back"></a>
      			<span>{{details.name}} 明细</span>
			</div>
			 <el-tabs v-model="activeName" class="tabs" @tab-click=handleChanges>
			 	 <el-tab-pane  label="交易明细" name="first"  class="tabpane">
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
								<tr v-for="(item,index) in cash_group.data" :key='index'>
									<!--<td><span class="mobile">流水号:</span><span class='value_right'>{{item.cash_id}}</span></td>-->
									<td><span class="mobile">交易类型:</span><span class='value_right'>{{item.cash_type=='2'?'支付宝':item.cash_type=='3'?'银行卡':'拼团成功'}}{{item.refund_status=='2'?'—拒绝提现':''}}</span></td>
									<td><span class="mobile">日期:</span><span class='value_right'>{{item.create_time*1000 | dataFilter(2)}}</span></td>
									<td><span class="mobile">收入:</span><span class='value_right income'>￥{{Number(item.status=='2'?item.sale_money:'0.00').toFixed(2)}}</span></td>
									<td><span class="mobile">支出:</span><span class='value_right spending'>￥{{Number(item.status=='1'?item.sale_money:'0.00').toFixed(2)}}</span></td>
								</tr>
							</tbody>
						</table>
					<div class="empty" v-if="this.cash_group.data.length==0">该列表为空</div>
					<div class="pages" v-if="cash_group.data.length!='0'">
							<el-pagination layout="prev, pager, next, jumper" :pager-count="5" :page-count='cash_group.pageCount'
							:page-size="cash_group.page" @current-change="handlePage0" :current-page.sync="cash_group.pno"></el-pagination>
					</div>
				 </el-tab-pane>
				 <el-tab-pane :label="'待成团 ('+this.details.waitGroup+')'" name="second" class="tabpane">
				 	<div class='table'>
						<ul class="tabelheader thead">
							<li>
								<span class="table-li"></span>
								<span class="min_width2">订单号</span>
								<span class="min_width2">拼团名称</span>
								<span>类型</span>
								<span>开团人数</span>
								<span class='min_width'>开团时间</span>
								<span class="min_width2">地址</span>
								<span>操作</span>
							</li>
						</ul>
						<ul class="tabelbody">
							<li v-for="(item,index) in wait.data" :key="index">
								<div class='w-content'>
									<div class='td arrow td1'>
										<i class="el-icon-arrow-right" @click="handlepayment"></i>
									</div>
									<div class='td min_width2'><span class="mobile">订单号:</span><span class='value_right'>{{item.sign}}</span></div>
									<div class='td min_width2' :title="item.goods_name"><span class="mobile">拼团名称:</span><span class='value_right'>{{item.goods_name}}</span></div>
									<div class='td'><span class="mobile">类型:</span><span class='value_right'>{{item.send_type=='1'?'自取':item.send_type=='3'?'送货上门':'快递'}}</span></div>
									<div class='td'><span class="mobile">开团人数:</span><span class='value_right'>{{item.groupNum}}/{{item.group_num}}</span></div>
									<div class='td min_width2'><span class="mobile">开团时间:</span><span class='value_right'>{{item.create_time*1000 | dataFilter(2)}}</span></div>
									<div class='td min_width'><span class="mobile">地址:</span><span class='value_right address'>
										<span>{{item.address}}</span>
										<span>{{item.address_detail}}</span>
										</span></div>
									<div class="last_btn td table-li1">
										<div class="data_btn btn_info" @click="DyamicDate(item.sign)">配置</div>
									</div>
								</div>
								<div class="paymentInfo">
									<ul class="user_list">
										<li v-for="(items,index) in item.group" :key="index">
											<div><span>头像：</span><span><img :src="items.photo"></span></div>
											<div><span>下单时间：</span><span>{{items.order_time*1000 | dataFilter(2)}}</span></div>
											<div><span>拼团姓名：</span><span>{{items.buyer}}</span></div>
											<div><span>手机号：</span><span>{{items.phone}}</span></div>
											<div class="ads"><span>地址：</span><span>{{items.address}}</span></div>
										</li>
									</ul>
								</div>
							</li>
						</ul>
					</div>
					<div class="empty" id="box" v-if="this.wait.data.length==0">该列表为空</div>
					<div class="pages" v-if="wait.data.length!='0'">
							<el-pagination layout="prev, pager, next, jumper" :pager-count="5" :page-count='wait.pageCount'
							:page-size="wait.page" @current-change="handlePage1" :current-page.sync="wait.pno"></el-pagination>
					</div>
				 </el-tab-pane>
				 <el-tab-pane  label="已拼团" name="third" class="tabpane">
				 	<div class='table'>
						<ul class="tabelheader thead">
							<li>
								<span class="table-li"></span>
								<span class="min_width2">订单号</span>
								<span class="min_width2">拼团名称</span>
								<span>类型</span>
								<span>开团人数</span>
								<span class='min_width'>开团时间</span>
								<span class="min_width2">地址</span>
								<!--<span>操作</span>-->
							</li>
						</ul>
						<ul class="tabelbody">
							<li v-for="(item,index) in alreadly.data" :key="index">
								<div class='w-content'>
									<div class='td arrow td1'>
										<i class="el-icon-arrow-right" @click="handlepayment"></i>
									</div>
									<div class='td min_width2'><span class="mobile">订单号:</span><span class='value_right'>2018102320230398598</span></div>
									<div class='td min_width2' :title="item.goods_name"><span class="mobile">拼团名称:</span><span class='value_right'>{{item.goods_name}}</span></div>
									<div class='td'><span class="mobile">类型:</span><span class='value_right'>{{item.send_type=='1'?'自取':item.send_type=='3'?'送货上门':'快递'}}</span></div>
									<div class='td'><span class="mobile">开团人数:</span><span class='value_right'>{{item.groupNum}}/{{item.group_num}}</span></div>
									<div class='td min_width2'><span class="mobile">开团时间:</span><span class='value_right'>{{item.create_time*1000 | dataFilter(2)}}</span></div>
									<div class='td min_width'><span class="mobile">地址:</span><span class='value_right address'>
										<span>{{item.address}}</span>
										<span>{{item.address_detail}}</span>
										</span></div>
									<!--<div class="last_btn td table-li1">
										<div class="data_btn btn_info">配置</div>
									</div>-->
								</div>
								<div class="paymentInfo">
									<ul class="user_list">
										<li v-for="(items,index) in item.group" :key="index">
											
											<div><span>头像：</span><span><img :src="items.photo"></span></div>
											<div><span>下单时间：</span><span>{{items.order_time*1000 | dataFilter(2)}}</span></div>
											<div><span>拼团姓名：</span><span>{{items.buyer}}</span></div>
											<div><span>手机号：</span><span>{{items.phone}}</span></div>
											<div class="ads"><span>地址：</span><span>{{items.address}}</span></div>
											<div v-if="items.fictitious_status == 1" class="virtual">虚拟数据</div>
										</li>
									</ul>
								</div>
							</li>
						</ul>
					</div>
					<div class="empty" v-if="this.alreadly.data.length==0">该列表为空</div>
					<div class="pages" v-if="alreadly.data.length!='0'">
							<el-pagination layout="prev, pager, next, jumper" :pager-count="5" :page-count='alreadly.pageCount'
							:page-size="alreadly.page" @current-change="handlePage2" :current-page.sync="alreadly.pno"></el-pagination>
					</div>
				 </el-tab-pane>
				 <el-tab-pane  label="失败团" name="fourth" class="tabpane">
				 	<div class='table'>
						<ul class="tabelheader thead">
							<li>
								<span class="table-li"></span>
								<span class="min_width2">订单号</span>
								<span class="min_width2">拼团名称</span>
								<span>类型</span>
								<span>开团人数</span>
								<span class='min_width'>开团时间</span>
								<span class="min_width2">地址</span>
								<!--<span>操作</span>-->
							</li>
						</ul>
						<ul class="tabelbody">
							<li v-for="(item,index) in reduse.data" :key="index">
								<div class='w-content'>
									<div class='td arrow td1'>
										<i class="el-icon-arrow-right" @click="handlepayment"></i>
									</div>
									<div class='td min_width2'><span class="mobile">订单号:</span><span class='value_right'>2018102320230398598</span></div>
									<div class='td min_width2' :title="item.goods_name"><span class="mobile">拼团名称:</span><span class='value_right'>{{item.goods_name}}</span></div>
									<div class='td'><span class="mobile">类型:</span><span class='value_right'>{{item.send_type=='1'?'自取':item.send_type=='3'?'送货上门':'快递'}}</span></div>
									<div class='td'><span class="mobile">开团人数:</span><span class='value_right'>{{item.groupNum}}/{{item.group_num}}</span></div>
									<div class='td min_width2'><span class="mobile">开团时间:</span><span class='value_right'>{{item.create_time*1000 | dataFilter(2)}}</span></div>
									<div class='td min_width'><span class="mobile">地址:</span><span class='value_right address'>
										<span>{{item.address}}</span>
										<span>{{item.address_detail}}</span>
										</span></div>
									<!--<div class="last_btn td table-li1">
										<div class="data_btn btn_info">配置</div>
									</div>-->
								</div>
								<div class="paymentInfo">
									<ul class="user_list">
										<li v-for="(items,index) in item.group" :key="index">
											<div><span>头像：</span><span><img :src="items.photo"></span></div>
											<div><span>下单时间：</span><span>{{items.order_time*1000 | dataFilter(2)}}</span></div>
											<div><span>拼团姓名：</span><span>{{items.buyer}}</span></div>
											<div><span>手机号：</span><span>{{items.phone}}</span></div>
											<div class="ads"><span>地址：</span><span>{{items.address}}</span></div>
										</li>
									</ul>
								</div>
							</li>
						</ul>
					</div>
					<div class="empty" v-if="this.reduse.data.length==0">该列表为空</div>
					<div class="pages" v-if="reduse.data.length!='0'">
							<el-pagination layout="prev, pager, next, jumper" :pager-count="5" :page-count='reduse.pageCount'
							:page-size="reduse.page" @current-change="handlePage3" :current-page.sync="reduse.pno"></el-pagination>
					</div>
				 </el-tab-pane>
			 </el-tabs>
		</div>
	</div>
</template>
<script type="text/javascript">
import '@/assets/css/distribution.css';
import {cash_group_detail,waitGroupAdmin,alreadlyGroupAdmin,reduseGroupAdmin} from '@/utils/api'
import * as store from '@/utils/sdk/store'
import pics from '@/assets/images/avatar.png'
import pic from '@/assets/images/downsimg.png'
	export default{
		data(){
			return{
                details:{
                    user_id:'',
                    name:'',
                    waitGroup:''
                },
                activeName: "second", //当前选择的导航
                cash_group:{
					data:[],
					pno:1,
					page:10,
       				pageCount:3,
                },
                wait:{//待拼团数据
					data:[],
					pno:1,
					page:10,
       				pageCount:3,
				},
				alreadly:{//已成团数据
					data:[],
					pno:1,
					page:10,
       				pageCount:3,
				},
				reduse:{//失败团数据
					data:[],
					pno:1,
					page:10,
       				pageCount:3,
				}
			}
		},
		methods:{
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
            DyamicDate(sign){
				this.$router.push({path:'/business/group/DynamicData',query:{sign:sign}})
			},
            handledata0(page,limit){
				cash_group_detail({
					user_id:this.details.user_id,
					shop_id:store.get('currentshopid'),
					limit:limit,
       				page:page,
				}).then(res=>{
					this.cash_group.data=res.detail
					this.cash_group.pageCount = res.totalPage
					this.cash_group.pno=Number(res.page)
				})
			},
			handledata1(page,limit){//待成团数据
				waitGroupAdmin({
					user_id:this.details.user_id,
					shop_id:store.get('currentshopid'),
					limit:limit,
       				page:page,
				}).then(res=>{
					if(res.error_code=='1'){
						this.wait.data=res.data.group
						this.wait.pageCount = res.data.totalPage
						this.wait.pno=Number(res.data.page)
					}
				})
			},
			handledata2(page,limit){//已拼团数据
				alreadlyGroupAdmin({
					user_id:this.details.user_id,
					shop_id:store.get('currentshopid'),
					limit:limit,
       				page:page,
				}).then(res=>{//已成团数据
					if(res.error_code=='1'){
						this.alreadly.data=res.data.group
						this.alreadly.pageCount = res.data.totalPage
						this.alreadly.pno=Number(res.data.page)
					}
				})
			},
			handledata3(page,limit){
				reduseGroupAdmin({
					user_id:this.details.user_id,
					shop_id:store.get('currentshopid'),
					limit:limit,
       				page:page,
				}).then(res=>{//失败团数据
					if(res.error_code=='1'){
						this.reduse.data=res.data.group
						this.reduse.pageCount = res.data.totalPage
						this.reduse.pno=Number(res.data.page)
					}
				})
            },
            back(){
				this.$router.go(-1)
			},
            handleChanges(tab, event){
				
            },
            handlePage0(){
				this.handledata0(this.cash_group.pno,this.cash_group.page)
			},
			handlePage1(e){
				this.handledata1(this.wait.pno,this.wait.page)
			},
			handlePage2(){
				this.handledata2(this.alreadly.pno,this.alreadly.page)
			},
			handlePage3(){
				this.handledata3(this.reduse.pno,this.reduse.page)
			},
		},
		created(){
            this.details.user_id = this.$route.query.id
            this.details.name = this.$route.query.name
			this.details.waitGroup = this.$route.query.waitGroup		          
            this.handledata0(this.cash_group.pno,this.cash_group.page)
            this.handledata1(this.wait.pno,this.wait.page)
            this.handledata2(this.alreadly.pno,this.alreadly.page)
            this.handledata3(this.reduse.pno,this.reduse.page)
		}
	}
</script>
<style lang="stylus" scoped>
.member_page{
		background-color:#f9f9f9;
		padding:20px;
		width:100%;
		height:100%;
		display:flex;
		justify-content:flex-start;
	}
	.memberList{
		width:100%;
	}
	.data-info{
		color:#1cc09E;
		cursor:pointer;
	}
.details{
	width:100%
}
.details .paymentInfo span{
	margin-left:10px;
}
.member_page .table{
	cursor:default;
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
.tabs{
	padding:20px 0 0 10px;
}
.tabs .paymentInfo span:last-child{
	text-align:left;
}
.paymentInfo{
	padding-left:0;
}
.paymentInfo li{
    padding:15px 0;
    display:flex;
    align-items:center;
    justify-content:space-around;
    border-bottom:1px dashed #ccc
}
.paymentInfo li>div:first-child{
	min-width:105px
}
.paymentInfo li>div:nth-child(2){
	min-width:215px
}
.paymentInfo li>div:nth-child(3){
	min-width:145px
}
.paymentInfo li>div:nth-child(4){
	min-width:175px
}
.paymentInfo li>div{
   display:flex;
   align-items:center; 
}
.user_list img{
	display:flex;
    width:40px;
    height:40px;
    border-radius:50%;
}	
.table-li1 {
    min-width: 10% !important;
}
.income{
	color:#1cc09E;
	font-weight: 700;
}
.spending{
	color:#E51c23;
	font-weight: 700;
}
.address{
	display:flex;
	flex-flow:column nowrap
}
.address span{
	line-height:25px;
}
.tabpane .table .paymentInfo li{
	line-height:normal;
	position: relative;
}
.ads{
	width:370px;
	align-items:center;
}
.ads span:nth-child(1){
	min-width:50px
}
.details .tabpane .table .min_width2{
	width:205px!important;
}
.paymentInfo li:last-child{
	border:none
}
.paymentInfo li:first-child{
	border-top:1px dashed #ccc;
}

.virtual{
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
@media(max-width:900px){
	.paymentInfo li{
		padding:15px 0;
		display:block;
		border-bottom:1px dashed #ccc
	}
	.tabpane .table .mobile, .tabpane .table li .mobile{
		width:25%;
	}
	.paymentInfo li>div{
		width:100%;
		display:flex;
		justify-content:flex-start;
		margin:5px 0px;
	}
	 .tabpane .table  .paymentInfo li{
	   text-align: left; 
	}
.details .tabpane .table .min_width2{
		width:auto!important;
		white-space:inherit !important
}
.details .tabpane .table .tabelbody .min_width2{
		width:315px !important;
}
.tabpane .table li .mobile{
	margin-right:0px;
}
.tabpane .table tr td{
	margin:5px 0px;
}
// .table .value_right, .table .value_right{
// 		width:auto!important;
// }
.details .table .value_right{
	width:70%
}


}
</style>