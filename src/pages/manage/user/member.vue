<template>
	<div class="members_page">
		<div  class="search_member">
	      <div class="search">
	      	<input placeholder="请输入会员姓名或手机号搜索" v-model="search_input"/>
	      	<img src="@/assets/images/search.png" @click="search_card()">
	      </div>
	    </div>

		<div class="members">
			<div class="member" v-for='item in members'>
				<div class="avatar_info">
					<div class="avatar"><img :src="item.photo"></div>
				  <div class="info">
					<div class="name">{{item.username}}</div>
					<div  class="phone">{{item.card_phone}} <i class="el-icon-edit" @click="dialogFormVisible = true"></i></div>
					<div class="datetime">加入时间：{{item.create_time}}</div>
				  </div>
				</div>
				<div class="bonus">积分：{{item.number}}    </div>
				<div class="options">
				<div class="record" @click='show_record(item.card_id)'> 消费记录</div>
				<div class="remove" @click='del_member(item.card_id)'>移除用户</div>
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

	<el-dialog title="消费记录" :visible.sync="dialogTableVisible">
	  <el-table :data="gridData">
	    <el-table-column property="create_time" label="时间" width="150"></el-table-column>
	    <el-table-column property="content" label="内容" width="200"></el-table-column>
	    <el-table-column property="number" label="数量"></el-table-column>
	  </el-table>
	</el-dialog>

	<el-dialog title="请输入新的手机号" :visible.sync="dialogFormVisible">
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

	<el-dialog title="充值金额" :visible.sync="chargeshow">
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

	<el-dialog title="消费金额" :visible.sync="consumeshow">
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

	<el-dialog title="增加积分" :visible.sync="bonusshow">
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
  			console.log(res.record)
  		})
  	},
  	search_card(){
  		search_card({name:this.search_input}).then((res)=>{
 			this.members=res.data
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
	background white
	padding 20px 30px 0
	font-size 18px
.el-pagination
	text-align right
.members_page
	background-color #f9f9f9
.search_member
	background-color white
	height 40px
	padding-left 20px
	padding-top 8px
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
	background-color white
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
