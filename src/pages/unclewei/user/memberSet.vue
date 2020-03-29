<template>
	<div class="members_page">
		<div  class="search_member">
	      <div class="search">
	      	<input placeholder="请输入会员微信名称" v-model="search_input"/>
	      	<img src="@/assets/images/search.png" @click="search_user()">
	      </div>
	    </div>
			<div class="lee-title1">用户列表</div>
		<div class="members" v-if='show_info'>
			<div class="member">
				<div class="avatar_info">
					<div class="avatar"><img :src="searchInfo.photo"></div>
				  <div class="info">
							<div class="name">{{searchInfo.name}}</div>
							<!-- <div  class="phone">{{item.card_phone}} <i class="el-icon-edit" @click="dialogFormVisible = true"></i></div> -->
							<!-- <div class="datetime">时间：{{item.update_time}}</div> -->
				  </div>
				</div>
				<!-- <div class="bonus">积分：<span>{{item.number}}</span></div> -->
				<div class="options">
						<div class="record" v-if="ownerInfo.length==0" @click='set_owner()'> 设为店主</div>
						<div class="record" @click='set_sender()'> 设置店员</div>
						<div class="record" @click='set_seller()'>设置分销员</div>
						<!-- <div class="remove" @click='del_member(item.card_id)'></div> -->
				</div>
			</div>
		    <!-- <div class="block">
            	 <el-pagination
              @current-change="handleCurrentChange"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :page-count="pagecount"
              :pager-count="5"
              :current-page.sync="currentPage">
           		 </el-pagination>
       		</div> -->
	    </div>
		<div class="owner">
	    	<div>店长:</div>
			<div class="member" v-for='(item,index) in ownerInfo' :key='index'>
				<div class="avatar_info">
					<div class="avatar"><img :src="item.photo"></div>
				  <div class="info">
							<div class="name">{{item.name}}</div>
							<div  class="phone">{{item.card_phone}} <!-- <i class="el-icon-edit" @click="dialogFormVisible = true"></i> --></div>
							<div class="datetime">设置时间：{{item.set_time}}</div>
				  </div>
				</div>
				<!-- <div class="bonus">积分：<span>{{item.number}}</span></div> -->
				<div class="options">
						<!-- <div class="record" @click='set_owner(item.card_id)'> 设为店主</div> -->
						  <!-- <div class="record" @click='del_owner(item.user_id)'> 取消店长</div>   -->
						<!-- <div class="remove" @click='del_member(item.card_id)'></div> -->
				</div>
			</div>
		    <!-- <div class="block">
            	 <el-pagination
              @current-change="handleCurrentChange"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :page-count="pagecount"
              :pager-count="5"
              :current-page.sync="currentPage">
           		 </el-pagination>
       		</div> -->
	    </div>
	    <div class="sender">
	    	<div>店员:</div>
			<div class="member" v-for='(item,index) in members' :key='index'>
				<div class="avatar_info">
					<div class="avatar"><img :src="item.photo"></div>
				  <div class="info">
							<div class="name">{{item.name}}</div>
							<div  class="phone">{{item.card_phone}} <!-- <i class="el-icon-edit" @click="dialogFormVisible = true"></i> --></div>
							<div class="datetime">设置时间：{{item.set_time}}</div>
				  </div>
				</div>
				<!-- <div class="bonus">积分：<span>{{item.number}}</span></div> -->
				<div class="options">
						<!-- <div class="record" @click='set_owner(item.card_id)'> 设为店主</div> -->
						<div class="record" @click='del_sender(item.user_id)'> 取消店员</div>
						<!-- <div class="remove" @click='del_member(item.card_id)'></div> -->
				</div>
			</div>
		    <!-- <div class="block">
            	 <el-pagination
              @current-change="handleCurrentChange"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :page-count="pagecount"
              :pager-count="5"
              :current-page.sync="currentPage">
           		 </el-pagination>
       		</div> -->
	    </div>
	    <div class="seller">
	    	<div>分销员:</div>
			<div class="member" v-for='(item,index) in sellers' :key='index'>
				<div class="avatar_info">
					<div class="avatar"><img :src="item.photo"></div>
				  <div class="info">
							<div class="name">{{item.name}}</div>
							<div class="datetime">设置时间：{{item.set_time}}</div>
				  </div>
				</div>
				<div class="sell_info">
				<div>销售额：￥{{item.sell_money}}</div> 
				<div>销售收入：￥{{item.sell_income}}</div>
				</div >
				<div class="sell_option">
				<div class="bonus">提成比例：<span>{{item.sell_radio}}%</span><span class="change" @click="change_radio(item.user_id)">修改</span></div>
				<div class="options">
						<!-- <div class="record" @click='set_owner(item.card_id)'> 设为店主</div> -->
						<div class="record" @click='del_seller(item.user_id)'> 取消分销员</div>
						<!-- <div class="remove" @click='del_member(item.card_id)'></div> -->
				</div>
				</div>
			</div>
		    <!-- <div class="block">
            	 <el-pagination
              @current-change="handleCurrentChange"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :page-count="pagecount"
              :pager-count="5"
              :current-page.sync="currentPage">
           		 </el-pagination>
       		</div> -->
	    </div>

	<el-dialog title="消费记录" :visible.sync="dialogTableVisible" :modal-append-to-body='false'>
	  <el-table :data="gridData">
	    <el-table-column property="create_time" label="时间" width="150"></el-table-column>
	    <el-table-column property="content" label="内容" width="200"></el-table-column>
	    <el-table-column property="number" label="数量"></el-table-column>
	  </el-table>
	</el-dialog>

	<el-dialog title="请输入新的手机号" :visible.sync="dialogFormVisible" :modal-append-to-body='false'>
	  <el-form :model="form">
	    <el-form-item label="手机号" :label-width="formLabelWidth">
	      <el-input v-model="phone" auto-complete="off"></el-input>
	    </el-form-item>
	    
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogFormVisible = false">取 消</el-button>
	    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
	  </div>
	</el-dialog>

	<el-dialog title="充值金额" :visible.sync="chargeshow" :modal-append-to-body='false'>
	  <el-form :model="form">
	    <el-form-item label="充值金额" :label-width="formLabelWidth">
	      <el-input v-model="phone" auto-complete="off"></el-input>
	    </el-form-item>
	    
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="chargeshow = false">取 消</el-button>
	    <el-button type="primary" @click="chargeshow = false">确 定</el-button>
	  </div>
	</el-dialog>

	<el-dialog title="消费金额" :visible.sync="consumeshow" :modal-append-to-body='false'>
	  <el-form :model="form">
	    <el-form-item label="消费金额" :label-width="formLabelWidth">
	      <el-input v-model="phone" auto-complete="off"></el-input>
	    </el-form-item>
	    
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="consumeshow = false">取 消</el-button>
	    <el-button type="primary" @click="consumeshow = false">确 定</el-button>
	  </div>
	</el-dialog>
	<!-- 修改分销提成比例 -->
	<el-dialog title="修改提成比例" :visible.sync="radioChangeShow" :modal-append-to-body='false'>
	  <el-form :model="form">
	    <el-form-item label="输入新的提成比例" :label-width="formLabelWidth">
	      <el-input placeholder="请输入 0-100 的整数" size="medium" v-model="radio" auto-complete="off"></el-input>
	    </el-form-item>
	    
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button size="medium" @click="radioChangeShow= false">取 消</el-button>
	    <el-button size="medium" type="primary" @click="changeRadio">确 定</el-button>
	  </div>
	</el-dialog>
	

	</div>
	

</template>
<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import { card_number,show_record,search_card,updateSellerRadio,remove_card,get_shop_user,getUserInfo,getUserDistriBution,addUserInfo,delUserInfo} from '@/utils/api'
export default{
  data () {
    return {
      search_input:'',
      formLabelWidth:120,
      dialogTableVisible:false,
      dialogFormVisible: false,
      chargeshow:false,
      consumeshow:false,
      bonusshow:false,
      radioChangeShow:false,
      user_id:0,
      members:[],
      sellers:[],
      radio:'',
      gridData: [],
      form:'member',
      card_id:'',
      currentPage:1,
      pagecount:1,
      searchInfo:'',
      show_info:false,
      ownerInfo:[]
    }
  },
  methods:{
  	handleCurrentChange(){
  		this.card_number()
  	},
  	show_senders(){
  		getUserDistriBution({shop_id:store.get('currentshopid'),page:this.currentPage}).then((res)=>{
  			if (res.error_code==1000) {
  				this.members=res.data
  			}else{
  				this.$message.error('发生错误！')
  			}
  		})
  	},
  	show_owner(){
  		getUserDistriBution({shop_id:store.get('currentshopid'),type:1}).then((res)=>{
  			if (res.error_code==1000) {
  				this.ownerInfo=res.data
  			}else{
  				this.$message.error('发生错误！')
  			}
  		})
  	},
  	set_sender(){
  		addUserInfo({
  			shop_id:store.get('currentshopid'),
  			user_id:this.searchInfo.user_id,
  			type:0
  		}).then(res=>{
  			console.log(res,'4444')
  			if (res.error_code==1000) {
  				this.$message.success('已成功设置为配送员')
  				this.show_senders()
  			}else{
  				this.$message('设置失败')
  			}
  		})
  	},
  	del_owner(id){
  		delUserInfo({
  			shop_id:store.get('currentshopid'),
  			type:1,
  			user_id:id
  		}).then(res=>{
  			if (res.error_code==1000) {
  				this.$message.success('取消店长成功')
  				this.show_owner()
  			}else {
  				this.$message.error('取消失败')
  			}
  		})
  	},
  	del_sender(id){
  		delUserInfo({
  			shop_id:store.get('currentshopid'),
  			type:0,
  			user_id:id
  		}).then(res=>{
  			if (res.error_code==1000) {
  				this.$message.success('取消配送员成功')
  				this.show_senders()
  			}else {
  				this.$message.error('取消失败')
  			}
  		})
  	},
  	set_owner(){
  		addUserInfo({
  			shop_id:store.get('currentshopid'),
  			user_id:this.searchInfo.user_id,
  			type:1
  		}).then(res=>{
  			if (res.error_code==1000) {
  				this.$message.success('已成功设置为店长')
  				this.show_owner()
  			}else{
  				this.$message('设置失败')
  			}
  		})
  	},
  	show_record(id){
  		this.dialogTableVisible = true
  		show_record({card_id:id}).then((res)=>{
  			this.gridData = res.record
  		})
  	},
  	search_user(){
  		getUserInfo ({userName:this.search_input,shop_id:store.get('currentshopid')}).then((res)=>{
  			if (res.error_code==1000) {
  				this.searchInfo=res.data
  				this.show_info=true
  			}else if(res.error_code==1001){
  				this.$message.error('为查询到该用户!')
  			}
  		})
  	},
  	del_member(id){
  		 this.$confirm('确认移除该会员吗?', '提示', {
          // type: 'warning'
        }).then(() => {
          remove_card({card_id:id}).then(()=>{
          	 this.$message({
            message: '已移除',
          });
          this.card_number()
          })
       
        }).catch(() => {
          this.$message({
            message: '您取消了移除',
          });
        });
      
  	},
  	//显示分销员
  	show_seller(){
  		getUserDistriBution({shop_id:store.get('currentshopid'),type:2}).then((res)=>{
  			if (res.error_code==1000) {
  				this.sellers=res.data
  			}else{
  				this.$message.error('发生错误！')
  			}
  		})
  	},
  	//设置分销员
  	set_seller(){
  		addUserInfo({
  			shop_id:store.get('currentshopid'),
  			user_id:this.searchInfo.user_id,
  			type:2
  		}).then(res=>{
  			if (res.error_code==1000) {
  				this.$message.success('已成功设置为分销员')
  				this.show_seller()
  			}else{
  				this.$message('设置失败')
  			}
  		})
  	},
  	//取消分销员
  	del_seller(id){
  		delUserInfo({
  			shop_id:store.get('currentshopid'),
  			type:2,
  			user_id:id
  		}).then(res=>{
  			if (res.error_code==1000) {
  				this.$message.success('取消分销员成功')
  				this.show_seller()
  			}else {
  				this.$message.error('取消失败')
  			}
  		})
  	},
  	//显示修改分销比例框
  	change_radio(id){
  		this.user_id = id
  		this.radioChangeShow=true
  	},
  	//修改提成比例
  	changeRadio(){
  		var flag = true
  		var reg = /(^[1-9][0-9]$|^[0-9]$|^100$)/
  		if (!reg.test(this.radio)) {
  			this.$message.error('请输入0-100的整数')
  		}else{
  			flag = false
  		}
  		if (flag==false) {
  			updateSellerRadio({
  			shop_id:store.get('currentshopid'),
  			radio:this.radio,
  			user_id:this.user_id
  		}).then(res=>{
  			if (res.error_code==1000) {
  				this.$message.success('修改提成比例成功')
  				this.radioChangeShow=false
  				this.show_seller()
  			}else{
  				this.$message.success('修改失败')
  			}
  		})
  		};
  	},
  },
  created(){
  	this.show_senders()
  	this.show_owner()
  	this.show_seller()
  }
}
</script>

<style lang="stylus" scoped>
.block
	background #f9f9f9
	padding 20px 30px 0
	font-size 18px
.el-pagination
	text-align right
.dialog-footer
	display flex
	justify-content space-between
	padding 0 20%
.members_page
	background-color #f9f9f9
	padding-top 30px
	padding-left 20px
	font-size 15px
.search_member
	background-color #293643
	height 50px
	padding-left 20px
	display flex
	align-items center
	.search
		position relative
		height 26px
		input
			background-color #EFEFF4
			line-height 26px
			width 225px
			border-radius 3px
			font-size 13px
			padding-left 15px
		img
			width 18px
			height 18px
			position absolute
			top 4px
			left 197px
			cursor pointer
.members
	padding 0 20px 20px 20px
	margin-top 15px
	background-color #f9f9f9
	.member
		height 120px
		display flex
		font-size 15px
		color #323232
		align-items center
		justify-content space-between
		border-bottom 1px solid #ededed
		.avatar_info
			display flex
			align-items center
			.avatar
				img
					height 60px
					width 60px
					border-radius 50%
		.info
			margin-left 15px
			width 200px
			.name
				margin-bottom 8px
			.phone
				margin 5px 0
				.el-icon-edit
					color #409EFF
					cursor pointer
			.datetime
				font-size 12px
				color #AAAAAA
		.balance
			display flex
			align-items center
			margin-left 70px
		.charge
			margin-right 15px
		.options
			.record
				color #409EFF
				margin-bottom 10px
				cursor pointer
			.remove 
				color #C0C4CC
				cursor pointer 
		.bonus
			margin-left 70px
.sender
	padding 0 20px 20px 20px
	margin-top 15px
	background-color #f9f9f9
	.member
		height 120px
		display flex
		font-size 15px
		color #323232
		align-items center
		justify-content space-between
		border-bottom 1px solid #ededed
		.avatar_info
			display flex
			align-items center
			.avatar
				img
					height 60px
					width 60px
					border-radius 50%
		.info
			margin-left 15px
			.name
				margin-bottom 8px
			.phone
				margin 5px 0
				.el-icon-edit
					color #409EFF
					cursor pointer
			.datetime
				font-size 12px
				color #AAAAAA
		.balance
			display flex
			align-items center
			margin-left 70px
		.charge
			margin-right 15px
		.options
			.record
				color #409EFF
				margin-bottom 10px
				cursor pointer
			.remove 
				color #C0C4CC
				cursor pointer 
		.bonus
			margin-left 70px
			
.owner
	padding 0 20px 20px 20px
	margin-top 15px
	background-color #f9f9f9
	.member
		height 120px
		display flex
		font-size 15px
		color #323232
		align-items center
		justify-content space-between
		border-bottom 1px solid #ededed
		.avatar_info
			display flex
			align-items center
			.avatar
				img
					height 60px
					width 60px
					border-radius 50%
		.info
			margin-left 15px
			width 200px
			.name
				margin-bottom 8px
			.phone
				margin 5px 0
				.el-icon-edit
					color #409EFF
					cursor pointer
			.datetime
				font-size 12px
				color #AAAAAA
		.balance
			display flex
			align-items center
			margin-left 70px
		.charge
			margin-right 15px
		.options
			.record
				color #409EFF
				margin-bottom 10px
				cursor pointer
			.remove 
				color #C0C4CC
				cursor pointer 
		.bonus
			margin-left 70px
.seller
	padding 0 20px 20px 20px
	margin-top 15px
	background-color #f9f9f9
	.member
		height 120px
		display flex
		font-size 15px
		color #323232
		align-items center
		justify-content space-between
		border-bottom 1px solid #ededed
		.avatar_info
			display flex
			align-items center
			width 25%
			.avatar
				img
					height 60px
					width 60px
					border-radius 50%
		.sell_info
			width 25%
			margin-left 40px
			display flex
			justify-content space-between
		.sell_option
			width 30%
			display flex
			justify-content space-between
			align-items center
		.info
			margin-left 15px
			.name
				margin-bottom 8px
			.phone
				margin 5px 0
				.el-icon-edit
					color #409EFF
					cursor pointer
			.datetime
				font-size 12px
				color #AAAAAA
		.balance
			display flex
			align-items center
			margin-left 70px
		.charge
			margin-right 15px
		.options
			.record
				color #409EFF
				cursor pointer
			.remove 
				color #C0C4CC
				cursor pointer 
		.bonus
			.change
				margin-left 10px
				color #409EFF
				cursor pointer
	

</style>
<style type="text/css"  lang="stylus" scoped>
	@media(max-width:900px ) {
		.search_member{
			box-sizing: border-box;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			height: 50px;
			padding:0;
      font-size:14px;
			margin: 0 auto;
			justify-content:center
		}
		.members_page{
			padding:20px 15px 0px;
		}
		.search_member .search img{
			right: 20px !important;
			left: auto;
			top: 6px;
		}
		.search_member .search{
			height: 30px;
		}
		.search_member .search input{
			width: 100%;
			height: 30px;
			line-height: 30px;
			box-sizing: border-box;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			font-size: 14px;
		}
		
		.el-dialog{
			width: 500px
		}
		.members .member{
			display: block;
			height: auto;
		}
		.members .member .options{
			width: 100%;
			text-align: right;
		}
		
		.el-dialog{
			width: 95%
		}
		.members{
			margin-top: 0;
			}
			.members .member{
				padding-top: 10px;
			}
		.members .member .info .name{
			font-size: 14px;
			color: #1A1A1A;
			}
		.members .member .info .datetime{
			font-size: 12px;
			color: #C0C4CC;
		}
		
		.members .member .bonus{
			margin-left: 75px;
			font-size: 12px;
			color: #C0C4CC;
		}
		.members .member .bonus span{
			font-size: 14px;
			color: #ff8661;
		}
		
		.members .member .options .record{
			font-size: 14px;
			color: #409eff;
		}
		
		.div .body .el-main .breadcrumb-container{
			margin-bottom: 0;
		}
		.seller .member{
			display:block;
			height:160px;
			margin-top:10px;
		}
		.seller .member .avatar_info{
			width:100%;
		}
		.seller .member .sell_info{
			margin-top:20px;
			margin-left:10px;
			width:100%;
		}
		.seller .member .sell_option{
			margin:20px 0 20px 10px;
			width:100%;
		}
	}
</style>
