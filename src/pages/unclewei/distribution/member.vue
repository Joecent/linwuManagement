<template>
	<div class="member_page">
		<div class="memberList">
			<el-tabs v-model="activeName" @tab-click="handleClick">
			<!--分销人员区块-->
				<el-tab-pane label="分销人员" name="first" class="tabpane">
						<table style="width:100%" class="table">
							<thead class="tabelheader">
								<tr>
									<th>姓名</th>
									<th>可提现金额</th>
									<th>卖出总金额</th>
									<th>卖商品数</th>
									<th>手机号</th>
									<th>行业</th>
									<th class='min_width'>描述</th>
									<th>来源二维码</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody class="tabelbody">
								<tr v-for="(item,index) in staff.tableData" :key='index'>
									<td><span class="mobile">姓名:</span><span class='value_right'>{{item.sale_name}}</span></td>
									<td><span class="mobile">可提现金额:</span><span class='value_right'>{{item.balance_cash}}</span></td>
									<td><span class="mobile">卖出总金额:</span><span class='value_right'>{{item.balance}}</span></td>
									<td><span class="mobile">卖商品数:</span><span class='value_right'>{{item.goodsCount}}</span></td>
									<td><span class="mobile">手机号:</span><span class='value_right'>{{item.phone}}</span></td>
									<td><span class="mobile">行业:</span><span class='value_right'>{{item.industry}}</span></td>
									<td class='min_width'><span class="mobile">描述:</span><span class='value_right'>{{item.instruction}}</span></td>
									<td><span class="mobile">来源二维码:</span><a :href="'https://www.linwushop.com/api/downfile?filename='+item.code"><img class='value_right imgUrl' :src="imgUlr"></a></td>
									<td class="last_btn">
										<div class="data_btn btn_danger" @click="handledisable(item.user_id)">禁 用</div>
									</td>
								</tr>
							</tbody>
						</table>
						<div class="empty" v-if="staff.tableData.length==0">该列表为空</div>
						<div class="pages" v-if="staff.tableData.length!=0">
							<!--<el-pagination layout="prev, pager, next, jumper" :pager-count="5" :page-count='accept.pageCount'
							:page-size="accept.page" @current-change="handleChangeTab1" :current-page.sync="accept.pno"></el-pagination>-->
							<el-pagination layout="prev, pager, next, jumper" :pager-count="5" :page-count='staff.pageCount'
							:page-size="staff.page" @current-change="handleChangeOne" :current-page.sync="staff.pno"></el-pagination>
						</div>
				</el-tab-pane>
			<!--待审批人员区块-->
				<el-tab-pane :label="'待审批人员 ('+this.pending.tableData.length+')'" name="second" class="tabpane">
						<table class="table">
							<thead class="tabelheader">
								<tr>
									<th>姓名</th>
									<th>手机号</th>
									<th>行业</th>
									<th class='min_width'>描述</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody class="tabelbody">
								<tr v-for="(item,index) in pending.tableData" :key='index'>
									<td><span class="mobile">姓名:</span><span class='value_right'>{{item.sale_name}}</span></td>
									<td><span class="mobile">手机号:</span><span class='value_right'>{{item.phone}}</span></td>
									<td><span class="mobile">行业:</span><span class='value_right'>{{item.industry}}</span></td>
									<td class='min_width'><span class="mobile">描述:</span><span class='value_right'>{{item.instruction}}</span></td>
									<td class="last_btn">
										<div class="data_btn btn_success" @click="handlethrough(item.user_id)">通 过</div>
										<div class="data_btn btn_danger" @click="handleRefused(item.user_id)">拒 绝</div>
									</td>
								</tr>
							</tbody>
						</table>
						<div class="empty" v-if="pending.tableData.length==0">该列表为空</div>
						<div class="pages" v-if="pending.tableData.length!=0">
							<el-pagination layout="prev, pager, next, jumper" :pager-count="5" :page-count='pending.pageCount'
							:page-size="pending.page" @current-change="handleChangeTwo" :current-page.sync="pending.pno"></el-pagination>
						</div>
				</el-tab-pane>
			<!--已禁用人员区块-->
				<el-tab-pane label="已禁用人员" name="third" class="tabpane">
						<table style="width:100%" class="table">
							<thead class="tabelheader">
								<tr>
									<th>姓名</th>
									<th>可提现金额</th>
									<th>卖出总金额</th>
									<th>卖出商品数</th>
									<th>手机号</th>
									<th>行业</th>
									<th class='min_width'>描述</th>
									<th>来源二维码</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody class="tabelbody">
								<tr v-for="(item,index) in disabled.tableData" :key='index'>
									<td><span class="mobile">姓名:</span><span class='value_right'>{{item.sale_name}}</span></td>
									<td><span class="mobile">可提现金额:</span><span class='value_right'>{{item.balance_cash}}</span></td>
									<td><span class="mobile">卖出总金额:</span><span class='value_right'>{{item.balance}}</span></td>
									<td><span class="mobile">卖出商品数:</span><span class='value_right'>{{item.goodsCount}}</span></td>
									<td><span class="mobile">手机号:</span><span class='value_right'>{{item.phone}}</span></td>
									<td><span class="mobile">行业:</span><span class='value_right'>{{item.industry}}</span></td>
									<td class='min_width'><span class="mobile">描述:</span><span class='value_right'>{{item.instruction}}</span></td>
									<td><span class="mobile">来源二维码:</span><a :href="'https://www.linwushop.com/api/downfile?filename='+item.code"><img class='value_right imgUrl' :src="imgUlr"></a></td>
									<td class="last_btn">
										<div class="data_btn btn_success" @click="handleOpen(item.user_id)">开 启</div>
									</td>
								</tr>
								<div class="empty" v-if="disabled.tableData.length==0">该列表为空</div>
							</tbody>
						</table>
						<div class="pages" v-if="disabled.tableData.length!=0">
							<el-pagination layout="prev, pager, next, jumper" :pager-count="5" :page-count='disabled.pageCount'
							:page-size="disabled.page" @current-change="handleChangeThree" :current-page.sync="disabled.pno"></el-pagination>
						</div>
				</el-tab-pane>
  			</el-tabs>
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
				<!--<img :src="my_img">-->
	</div>
</template>
<script type="text/javascript">
import '@/assets/css/distribution.css';
import {get_saleUserAdmin,get_requestStatus,downfile} from '@/utils/api'
import * as store from '@/utils/sdk/store'		
import pic from '@/assets/images/downsimg.png'
	export default{
		data(){
			return{
				lee:0,
				activeName: "first", //当前选择的导航
				textarea3:'',
				user_id:'',
				my_img:"",
				imgUlr:pic,
				is_second:true,
				is_third:true,
				DialogVisible:false,
				staff:{
					tableData:[],
					pno: 1,
					page:10,
					pageCount:3
				},
				pending:{
					tableData:[],
					pno: 1,
					page:10,
					pageCount:3
				},
				disabled:{
					tableData:[],
					pno: 1,
					page:10,
					pageCount:3
				},
			}
		},
		methods:{
			downfile(url){//下载二维码
				downfile({
					filename:url
				}).then((res)=>{
					
				})
			},
			updateTab1(limit,page){//更新分销人员数据
				get_saleUserAdmin({
					shop_id:store.get('currentshopid'),
					limit:limit,
					page:page,
					verify_status:'1',
					is_no:'1',
				}).then((res)=>{
					if(res.status=='1'){
						this.staff.tableData=res.detail
						this.staff.pageCount = res.totalPage;
          				this.staff.pno =Number(res.page)
					}
				})
			},
			updateTab2(limit,page){//更新待审批人员数据
				get_saleUserAdmin({
					shop_id:store.get('currentshopid'),
					limit:limit,
					page:page,
					verify_status:'0',
					is_no:'1',
				}).then((res)=>{
					if(res.status=='1'){
						this.pending.tableData=res.detail;
						this.pending.pageCount = res.totalPage;
          				this.pending.pno =Number(res.page);
					}
				})
			},
			updateTab3(limit,page){//更新禁用人员数据
				get_saleUserAdmin({
					shop_id:store.get('currentshopid'),
					limit:limit,
					page:page,
					is_no:'0',
					verify_status:'2',				
				}).then((res)=>{
					console.log(res)
					if(res.status=='1'){
						this.disabled.tableData=res.detail;
						this.disabled.pageCount = res.totalPage;
          				this.disabled.pno =Number(res.page);
					}
				})
			},
			handleChangeOne(e){//分页一
				this.staff.pno=e
				this.updateTab1(10, this.staff.pno)
			},
			handleChangeTwo(e){//分页二
				this.pending.pno=e
				this.updateTab2(10, this.pending.pno)
			},
			handleChangeThree(e){//分页三
				this.disabled.pno=e
				this.updateTab3(10, this.disabled.pno)
			},
			handleClick(tab, event){			
				if(tab.paneName=='second'){
					if(this.is_second){
						this.updateTab2(10, this.pending.pno)
						this.is_second=false
					}
				}else if(tab.paneName=='third'){
					if(this.is_third){
						this.updateTab3(10, this.disabled.pno)
						this.is_third=false
					}					
				}
      		},
			handledisable(user_id){//点击禁用
				get_requestStatus({
					user_id:user_id,
					status:'0'
				}).then((res)=>{
					if(res.status=='1'){
						this.$message.success('禁用成功')
						this.updateTab1(10, this.staff.pno)
						this.updateTab3(10, this.disabled.pno)
					}
				})
			},
			handleOpen(user_id){//点击开启
				get_requestStatus({
					user_id:user_id,
					status:'1'
				}).then((res)=>{
					if(res.status=='1'){
						this.$message.success('已开启')
						this.updateTab1(10, this.staff.pno)
						this.updateTab3(10, this.disabled.pno)
					}
				})
			},
			handlethrough(user_id){//点击通过时
				get_requestStatus({
					user_id:user_id,
					allow:'1'
				}).then((res)=>{
					if(res.status=='1'){
						this.$message.success('已通过')
						this.updateTab1(10, this.staff.pno)
						this.updateTab2(10, this.pending.pno)
					}
				})
			},
			handleRefused(user_id){//点击拒绝时
				this.DialogVisible=true
				this.user_id=user_id
			},
			cancelDialog(){//取消Dialog
				this.DialogVisible=false;
				this.textarea3=''
			},
			confirmDialog(){//确认Dialog
				if(this.textarea3==""){
					this.textarea3="无"
				}
				get_requestStatus({
					user_id:this.user_id,
					allow:'2',
					extra:this.textarea3
				}).then((res)=>{
					console.log(res)
					if(res.status=='1'){
						this.$message.success('已拒绝')
						this.updateTab1(10, this.staff.pno)
						this.updateTab2(10, this.disabled.pno)
					}
				})
				
				
				this.textarea3=''
				this.DialogVisible=false;
			}
		},
		created(){
			//分销成员数据
			this.updateTab1(10, this.staff.pno)
			this.updateTab2(10, this.pending.pno)
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
		 						
</style>