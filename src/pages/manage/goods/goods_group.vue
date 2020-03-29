<template>
	<div class="cates_page">
		<div class="addcates">
			<div  class="addcates_button" @click="showaddcate=true"><i class="el-icon-plus" style="margin-right:5px"></i>添加分类</div>
			<div class="delete_all" @click="delete_all=true">批量删除</div>
		</div>
		<div class="cates">
			<div class="cate" v-for="item in cates">
				<div class="cate_sort_name">
					<div class="sort">{{item.sort}}、</div>
					<div class="cate_name" @click="show_cate(item.cate_id)">{{item.cate_name}}</div>
				</div>
				<div class="goods_num">
					商品数：{{item.goods_num}}
				</div>
				<div class="editcates">
					<div class="edit" @click="toeditcate(item.cate_id,item.cate_name,item.sort)">编辑</div>
					<div class="delete" @click="todeletecate(item.cate_id)">删除</div>
				</div>
				<div class="delete_all_button" v-if="delete_all"></div>
			</div>
		</div>
		<!-- 添加分类 -->
	  	<el-dialog title="添加分类" :visible.sync="showaddcate" class="addcate_dialog">
	  		<el-form :model="addedcate">
	  			<el-form-item label="分类名称"><el-input placeholder="请输入新增分类名称" class="inputaddcate" v-model="addedcate.name"></el-input></el-form-item>
	  			<el-form-item label="分类排序"><el-input placeholder="请输入排序" v-model="addedcate.sort" class="inputsort"></el-input></el-form-item>
	  			<div class="options">
	  			<button class="cancle" @click="showaddcate=false">取消</button>
              	<button class="comfirm" @click="add_cate">确认</button>
              	</div>
	  		</el-form>	
	  	</el-dialog>
		<!-- 编辑分类 -->
	  	<el-dialog title="修改分类" :visible.sync="showeditcate" class="editcate_dialog">
	  		<el-form :model="editcate">
	  			<el-form-item label="分类名称"><el-input placeholder="请输入新的分类名称" class="inputaddcate" v-model="editcate.name"></el-input></el-form-item>
	  			<el-form-item label="分类排序"><el-input placeholder="请输入新的排序" v-model="editcate.sort" class="inputsort"></el-input></el-form-item>
	  			<div class="options">
	  			<button class="cancle" @click="showeditcate=false">取消</button>
              	<button class="comfirm" @click="subedit">确认</button>
              	</div>
	  		</el-form>	
	  	</el-dialog>
	  	<!-- 删除分类 -->
	  	<el-dialog title="删除商品" class="remove" :visible.sync="is_delete">
            <div class="message">删除该类别会影响该类别下商品展示，确定删除该类？</div>
            <div class="question">
              <button class="cancle" @click="is_delete=false">取消</button>
              <button class="comfirm" @click="deletecate()">确认</button>
            </div>
        </el-dialog>
	</div>
</template>

<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import {sel_cate,del_cate,add_cate,edit_cate} from '@/utils/api'
	export default{
		data(){
			return{
				showcates:false,
				cates:[],
				showaddcate:false,
				showeditcate:false,
				is_delete:false,
				cate_id:'',
				indexnum:'',
				delete_all:false,
				addedcate:{
					name:"",
					sort:'',
				},
				editcate:{
					name:'',
					sort:'',
					id:'',
				},
			}
		},
		methods:{
			todeletecate(id){
				this.cate_id=id
				this.is_delete=true
			},
			show_cate(id){
				this.$router.push({path:'/home/goods/goods',query:{cate_id:id}})
			},
			showcate(){
				sel_cate({shop_id:store.get('currentshopid')}).then((res)=>{
					this.cates = res.data
				})
			},
			deletecate(){
				del_cate({cate_id:this.cate_id}).then((res)=>{
					if (res.error_code==1003) {
						this.$message.error(res.msg)
					}
					if (res.error_code==1000) {
						this.is_delete=false
						this.showcate()
						this.$message('删除成功')
					}
				})
			},
			toeditcate(id,name,sort){
				this.editcate.name = name
				this.editcate.sort = sort
				this.editcate.id = id
				this.showeditcate=true
			},
			subedit(){
				console.log(this.editcate.id,'bbbb')
				edit_cate({cate_name:this.editcate.name,sort:this.editcate.sort,cate_id:this.editcate.id}).then((res)=>{
					if (res.error_code==1003) {
						this.$message.error(res.msg)
					}
					if (res.error_code==1000) {
						this.showeditcate=false
						this.showcate()
					};
				})
			},
			add_cate(){
				add_cate({shop_id:store.get('currentshopid'),cate_name:this.addedcate.name,sort:this.addedcate.sort}).then((res)=>{
					if(res.error_code==1003){
						this.$message.error(res.msg)
					}
					if(res.error_code==1000){
						this.showaddcate=false
						this.showcate()
						this.addedcate.name=''
						this.addedcate.sort=''
						this.$message('添加成功')
					}

				})
			},
		},
		created(){
			this.showcate()
		}
	}
</script>
<style lang="stylus" scoped>
.cate_name
	cursor pointer
.cates_page
	background-color #f9f9f9
.addcates
	background-color white
	padding 5px 20px
	display flex
	height 40px
	justify-content space-between
	.addcates_button
		padding 5px 
		cursor pointer
		color #409EFF
	.delete_all
		cursor pointer
		width 200px
		text-align center
		color #aaaaaa
		padding 5px
.cates
	margin-top 10px
	background-color white
	padding 20px 20px
	.cate
		display flex
		justify-content space-between
		align-items center
		padding 20px 0
		border-bottom 1px solid #ebedef
		.cate_sort_name
			width 200px
			display flex
			justify-content flex-start
		.goods_num
			width 100px
		.editcates
			width 200px
			text-align center
			.edit
				color #409EFF
				cursor pointer
			.delete	
				color #C0C4CC
				margin-top 15px
				cursor pointer
.remove
	width 50%
	margin-left 25%
	.question
		margin-top 20px
		display flex 
		justify-content space-between
		padding 0 15%
.cancle
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
	border 1px solid #409EFF
.addcate_dialog
	width 50%
	margin-left 25%
.editcate_dialog
	width 50%
	margin-left 25%
.options
	display flex
	justify-content space-between
	padding 0 20%
</style>