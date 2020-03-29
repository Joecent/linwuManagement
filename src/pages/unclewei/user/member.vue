<template>
	<div class="members_page">
		<div  class="search_member">
	      <div class="search">
	      	<input placeholder="请输入会员微信名称" v-model="search_input"/>
	      	<img src="@/assets/images/search.png" @click="search_card()">
	      </div>
	    </div>
			<div class="lee-title1">用户列表</div>
		<div class="members">
			<div class="member" v-for='(item,index) in members' :key='index'>
				<div class="avatar_info">
					<div class="avatar"><img :src="item.photo"></div>
				  <div class="info">
							<div class="name">{{item.username}}</div>
							<div  class="phone">{{item.card_phone}} <!-- <i class="el-icon-edit" @click="dialogFormVisible = true"></i> --></div>
							<div class="datetime">加入时间：{{item.create_time}}</div>
				  </div>
				</div>
				<div class="bonus">积分：<span>{{item.number}}</span></div>
				<div class="options">
						<div class="record" @click='show_record(item.card_id)'> 消费记录</div>
						<!-- <div class="remove" @click='del_member(item.card_id)'>移除用户</div> -->
				</div>
			</div>
		    <div class="block">
            	 <el-pagination
              @current-change="handleCurrentChange"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :page-count="pagecount"
              :pager-count="5"
              :current-page.sync="currentPage">
           		 </el-pagination>
       		</div>
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

	<el-dialog title="增加积分" :visible.sync="bonusshow" :modal-append-to-body='false'>
	  <el-form :model="form">
	    <el-form-item label="增加积分" :label-width="formLabelWidth">
	      <el-input v-model="phone" auto-complete="off"></el-input>
	    </el-form-item>
	    
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="bonusshow= false">取 消</el-button>
	    <el-button type="primary" @click="bonusshow = false">确 定</el-button>
	  </div>
	</el-dialog>
	

	</div>
	

</template>
<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import { card_number,show_record,search_card,remove_card,get_shop_user} from '@/utils/api'
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
      phone:'',
      members:[],
      gridData: [],
      form:'member',
      card_id:'',
      currentPage:1,
      pagecount:1,
    }
  },
  methods:{
  	handleCurrentChange(){
  		this.card_number()
  	},
  	card_number(){
  		get_shop_user({shop_id:store.get('currentshopid'),page:this.currentPage}).then((res)=>{
  			if (res.error_code==1000) {
  				this.members=res.data.card
  				this.pagecount=res.data.totalPage
  			}else{
  				this.$message.error('发生错误！')
  			}
  		})
  	},
  	show_record(id){
  		this.dialogTableVisible = true
  		show_record({card_id:id}).then((res)=>{
  			this.gridData = res.record
  		})
  	},
  	search_card(){
  		search_card({name:this.search_input,shop_id:store.get('currentshopid')}).then((res)=>{
  			if (res.error_code==1000) {
  				this.members=res.data.result
  			}else if(res.error_code==1001){
  				this.$message.error('未查询到该用户!')
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
      
  	}
  },
  created(){
  	this.card_number()
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
			width 120px
			.record
				color #409EFF
				margin-bottom 10px
				cursor pointer
			.remove 
				color #C0C4CC
				cursor pointer 
		.bonus
			margin-left 70px
	

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
	}
</style>
