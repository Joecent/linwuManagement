<template>
	<div class="goodspage">
		<div class="addgoods">
			<div  class="addgoods_button" @click = "showaddgoodsmethod"><i class="el-icon-plus" style="margin-right:5px"></i>添加商品</div>
			<div class="search"><input placeholder="请输入商品名称" v-model='search_input'/><!-- <img src="../../../assets/images/search.png" @click='search()'> --></div>
		</div>
		<div class="goods_infos">
		<div v-for="(item,index) in goodsinfo" class="goods_info">
			<div style="display:flex;width:300px">
			<img :src="item.goods_img" class="goods_info_image">
			<div class="nameinfo">
				<div class="goods_info_name">{{item.goods_name}}</div>
				<div class="prices">
					<div class="price">￥{{item.goods_price}}</div>
					<div class="market_price">￥{{item.market_price}}</div>
				</div>
				<div class="score">库存：{{item.goods_score}}</div>
				<div class="time">上架时间：{{item.create_time}}</div>
			</div>
			</div>
			<div class="is_group">
				<div class="isgroup" v-if="item.is_group==1">已开启团购</div>
				<div class="group_price"v-if="item.is_group==1">团购价格：￥{{item.group_price}}</div>
				<div class="group_num"v-if="item.is_group==1">要求参团人数：{{item.group_num}}</div>
				<div class="notgroup" v-if="item.is_group==0">未开启团购</div>
			</div>
			<div class="editgoods">
				<div class="recommend" @click="to_set_recommend(item.goods_id)" v-if="item.is_commend==0">设为推荐</div>
				<div class="recommended" v-if="item.is_commend==1">已设为推荐，<span class="recommend" @click="to_cancle_recommend(item.goods_id)">取消</span></div>
				<div class="edit" @click="toeditgoodsinfo(item.goods_id,index)">编辑</div>
				<div class="delete" @click="todeletegoods(item.goods_id)">删除</div>
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
		<!-- 删除商品 -->
		 <el-dialog title="删除商品" class="remove" :visible.sync="is_delete">
            <div class="message">是否确定删除该商品 ？</div>
            <div class="question">
              <button class="cancle" @click="is_delete=false">取消</button>
              <button class="comfirm" @click="deletegoods()">确认</button>
            </div>
        </el-dialog>
        <!-- 设为推荐 -->
        <el-dialog title="设置推荐" class="remove" :visible.sync="show_recommend">
			<div class="message">是否确定将该商品设为推荐？</div>
			<div class="question">
				<button class="cancle" @click="show_recommend=false">取消</button>
				<button class="comfirm" @click="recommend_comfirm()">确认</button>
			</div>
        </el-dialog>
        <!-- 取消推荐 -->
        <el-dialog title="取消推荐" class="remove" :visible.sync="cancle_recommend">
			<div class="message">是否确定将该商品取消推荐？</div>
			<div class="question">
				<button class="cancle" @click="cancle_recommend=false">取消</button>
				<button class="comfirm" @click="cancle_recommend_comfirm()">确认</button>
			</div>
        </el-dialog>
		<!-- 添加商品 -->
		<!-- <el-dialog title="添加商品" :visible.sync="showaddgoods" class="addgoodstyle">
			<el-form :model="addgoodsinfo">
				<el-form-item label="商品名称"><el-input class="goods_name_input" placeholder="请输入商品名称"v-model="addgoodsinfo.name"/></el-form-item>
				<el-form-item label="商品分类">
					<el-select placeholder="请选择商品分类"v-model="addgoodsinfo.cate">
						<el-option v-for="item in cates":label ="item.cate_name" :value="item.cate_id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品图片">
					<el-upload 
					class="avatar-uploader"
			  		action="https://www.huixianfeng.net/upload_img"
			  		list-type="picture-card"
			  		:on-remove="handleRemove"
			  		:file-list="images_list"
			  		multiple
			       :on-success="uploadsuccess"
			      >
				  <!-- <div class="upload_img" v-if="imageUrl.length!=0"v-for="item in imageUrl"><img  :src="item" class="uploadedimg"></img>
				  <img src="../../assets/images/delete.png" class="delete_img"@click="delete_image($event)"></img>
				  </div> -->
			      <!-- <img v-if="imageUrl" :src="imageUrl" class="uploadedimg">  
			       <i class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>

				</el-form-item>
				<div class="price_input">
				<el-form-item label="商品售价"><el-input class="input" placeholder="请输入商品售价"v-model="addgoodsinfo.price"/></el-form-item>
				<el-form-item label="商品原价"><el-input class="input" placeholder="请输入商品原价"v-model="addgoodsinfo.market_price"/></el-form-item>
				<el-form-item label="商品库存"><el-input class="input" placeholder="请输入商品库存"v-model="addgoodsinfo.score"/></el-form-item>
				</div>
				<div class="group_info_input">
				<el-form-item label="开启团购">
				<el-switch
					v-model="addgoodsinfo.is_group"
					 active-text="是"
				  inactive-text="否">
				</el-switch></el-form-item>
				<el-form-item v-if="addgoodsinfo.is_group"label="团购价格"><el-input class="group_input" placeholder="请输入团购价格"v-model="addgoodsinfo.group_price"/></el-form-item>
				<el-form-item v-if="addgoodsinfo.is_group"label="参团人数"><el-input class="group_input" placeholder="请输入参与团购人数要求"v-model="addgoodsinfo.group_num"/></el-form-item>
				</div>
				<el-form-item label="商品描述"><el-input type="textarea"placeholder="请输入商品描述"v-model="addgoodsinfo.desc"/></el-form-item>
				<div class="buttons">
				<button class="comfirm" @click="submitgoods">确认</button>
				<button class="cancle" @click="showaddgoods=false">取消</button>
				</div>
			</el-form>
		</el-dialog>

		<!-- 编辑商品 
		<el-dialog title="编辑商品信息" :visible.sync="showeditgoods" class="addgoodstyle">
			<el-form :model="editgoodsinfo">
				<el-form-item label="商品名称"><el-input class="goods_name_input"placeholder="请输入商品名称"v-model="editgoodsinfo.goods_name"/></el-form-item>
				<el-form-item label="商品分类">
					<el-select placeholder="请选择商品分类"v-model="editgoodsinfo.cate_name">
						<el-option v-for="item in cates":label="item.cate_name" :value="item.cate_id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品图片">
					<el-upload 
					class="avatar-uploader"
			  		action="https://www.huixianfeng.net/upload_img"
			  		multiple
			  		list-type="picture-card"
			  		:file-list="images_list"
			       :on-success="uploadeditsuccess"
			      >
			      <!-- <img v-if="imageUrl" :src="imageUrl" class="uploadedimg">  
			       <i class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>

				</el-form-item>
				<div class="price_input">
				<el-form-item label="商品售价￥"><el-input class="input" placeholder="请输入商品售价"v-model="editgoodsinfo.goods_price"/></el-form-item>
				<el-form-item label="商品原价￥"><el-input class="input" placeholder="请输入商品原价"v-model="editgoodsinfo.market_price"/></el-form-item>
				<el-form-item label="商品库存"><el-input class="input" placeholder="请输入商品库存"v-model="editgoodsinfo.goods_score"/></el-form-item>
				</div>
				
				<div class="group_info_input">
				<el-form-item label="开启团购">
				<el-switch
				  v-model="editgoodsinfo.is_group"
				  active-text="是"
				  inactive-text="否">
				</el-switch></el-form-item>
				<el-form-item v-if="editgoodsinfo.is_group"label="团购价格￥"><el-input class="group_input" placeholder="请输入团购价格"v-model="editgoodsinfo.group_price"/></el-form-item>
				<el-form-item v-if="editgoodsinfo.is_group"label="参团人数"><el-input class="group_input" placeholder="请输入参与团购人数要求"v-model="editgoodsinfo.group_num"/></el-form-item>
				</div>
				<el-form-item label="商品描述"><el-input type="textarea"placeholder="请输入商品描述"v-model="editgoodsinfo.goods_desc"/></el-form-item>
				<div class="buttons">
				<button  class="comfirm" @click="submiteditgoods">确认</button>
				<button class="cancle" @click="showeditgoods=false">取消</button>
				</div>
			</el-form>
		</el-dialog> -->
	</div>
</template>
<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import {sel_cate,goods_add,goods_show,goods_del,goods_edit,search_goods,set_commend} from '@/utils/api'
	export default{
		data(){
			return{
				pagecount:1,
				currentPage:1,
				search_input:'',
				cates:[],
				showaddgoods:false,
				showeditgoods:false,
				editcatenum:1000,
				is_delete:false,
				goods_id:'',
				editgoodsinfo:[],
				editgoodsinfo_goods_image_pre:[],
				editgoods_id:'',
				images_list:[],
				addgoodsinfo:{
					name:"",
					cate:"",
					price:"",
					market_price:"",
					score:"",
					goods_img:[],
					desc:"",
					is_group:true,
					group_price:"",
					group_num:"",
				},
				imageUrl:[],
				goodsinfo:{
				
				},
				show_recommend:false,
				cancle_recommend:false
			}
		},
		methods:{
			handleRemove(file){
				for (var i = this.addgoodsinfo.goods_img .length - 1; i >= 0; i--) {
					if (file.response.data.img_url==this.addgoodsinfo.goods_img[i]) {
						this.addgoodsinfo.goods_img.splice(i,1)
					}
				};
			},
			to_cancle_recommend(id){
				this.cancle_recommend=true
				this.goods_id=id
			},
			cancle_recommend_comfirm(){
				set_commend({goods_id:this.goods_id,is_commend:0}).then(()=>{
					this.cancle_recommend=false
					this.$message('已取消推荐')
					this.goods_show()
				})
			},
			to_set_recommend(id){
				this.goods_id = id
				this.show_recommend = true
			},
			recommend_comfirm(){
				set_commend({goods_id:this.goods_id,is_commend:1}).then((res)=>{
					this.show_recommend = false
					this.$message('已设为推荐')
					this.goods_show()
				})
			},
			showcate(){
				sel_cate({shop_id:store.get('currentshopid')}).then((res)=>{
					this.cates = res.data
				})
			},
			search(){
				search_goods({shop_id:store.get('currentshopid'),goods_name:this.search_input}).then((res)=>{
					if (res.error_code==1003) {
						this.$message.error(res.msg)
					};
					if (res.error_code==1000) {
						this.goodsinfo = res.data
					};
				})
			},
			toeditgoodsinfo(goods_id,id){
				this.images_list=[]
				this.showeditgoods = true
				this.goodsinfo[id].is_group = this.goodsinfo[id].is_group==1 ? true:false
				this.editgoodsinfo = this.goodsinfo[id]
				this.editgoods_id = goods_id
				this.images_list.push({name:"image",url:this.editgoodsinfo.goods_img})
				 for (var i = 0; i < this.editgoodsinfo.img_url.length; i++) {
				 	this.images_list.push({name:"image"+i.toString(),url:this.editgoodsinfo.img_url[i]})
				 }
				this.editgoodsinfo_goods_image_pre=this.editgoodsinfo.img_url_pro
				this.editgoodsinfo_goods_image_pre.unshift(this.editgoodsinfo.goods_img_pro)
			},
			uploadeditsuccess(res,file){
				this.imageUrl.push(URL.createObjectURL(file.raw))
				this.editgoodsinfo_goods_image_pre.push(res.data.img_url)
				console.log(this.editgoodsinfo_goods_image_pre,'5555')
			},
			submiteditgoods(){
				goods_edit({
					goods_name:this.editgoodsinfo.goods_name, 
					goods_price:this.editgoodsinfo.goods_price, 
					market_price:this.editgoodsinfo.market_price, 
					goods_img:this.editgoodsinfo_goods_image_pre[0], 
					photo:this.editgoodsinfo_goods_image_pre.slice(1),
					goods_score:this.editgoodsinfo.goods_score, 
					goods_desc:this.editgoodsinfo.goods_desc, 
					is_group:this.editgoodsinfo.is_group?1:0, 
					group_price:this.editgoodsinfo.group_price, 
					group_num:this.editgoodsinfo.group_num, 
					cate_id:this.editgoodsinfo.cate_id,
					goods_id:this.editgoods_id
				}).then((res)=>{
					if (res.error_code==1003) {
						this.$message.error(res.msg)
					};
					if (res.error_code==1000) {
						this.$message(res.msg)
						this.showeditgoods = false
						this.goods_show()
						this.editgoodsinfo_goods_image_pre=[]
					};
				})
			},
			todeletegoods(id){
				this.is_delete=true
				this.goods_id=id
			},
			deletegoods(){
				goods_del({goods_id:this.goods_id}).then((res)=>{
					if (res.error_code==1003) {
						this.$message.error(res.msg)
					};
					if (res.error_code==1000) {
						this.$message(res.msg)
						this.is_delete=false
						this.goods_show()
					};
				})
			},
			goods_show(){
				goods_show({shop_id:store.get('currentshopid'),page:this.currentPage}).then((res)=>{
					if (res.error_code==1003) {
						this.$message.error(res.msg)
					};
					if (res.error_code==1000) {
						this.goodsinfo = res.data.goods
						this.pagecount = res.data.totalPage
					};
				})
			},
			handleCurrentChange(){
				this.goods_show()
			},
			showaddgoodsmethod(){
				this.indexnum = 0
				this.showaddgoods = true
				this.imageUrl = []
				this.images_list=[]
			},
			uploadsuccess(res,file){
				this.imageUrl.push(URL.createObjectURL(file.raw))
      			this.addgoodsinfo.goods_img.push(res.data.img_url)
      			console.log(this.addgoodsinfo.goods_img,'5555')
			},
			submitgoods(){
				var flag=true
				if (this.addgoodsinfo.name=='') {
					this.$message.error('请输入商品名称')
				}else if (this.addgoodsinfo.cate=='') {
					this.$message.error('请选择商品分类')
				}else if (this.addgoodsinfo.goods_img.length==0) {
					this.$message.error('请至少添加一张商品图片')
				}else if (this.addgoodsinfo.price=='') {
					this.$message.error('请输入商品价格')
				}else if (this.addgoodsinfo.score=='') {
					this.$message.error('请添加商品库存')
				}else{
					flag=false
				};

				if (flag==false) {
				goods_add({
					goods_name:this.addgoodsinfo.name,
					goods_price:this.addgoodsinfo.price, 
					market_price:this.addgoodsinfo.market_price,
					goods_img:this.addgoodsinfo.goods_img[0],
					goods_score:this.addgoodsinfo.score, 
					goods_desc:this.addgoodsinfo.desc, 
					is_group:this.addgoodsinfo.is_group?1:0,
					group_price:this.addgoodsinfo.group_price, 
					group_num:this.addgoodsinfo.group_num, 
					cate_id:this.addgoodsinfo.cate, 
					shop_id:store.get('currentshopid'),
					photo:this.addgoodsinfo.goods_img.slice(1)
				}).then((res)=>{
					if (res.error_code==1000) {
						this.$message('添加成功')
						this.showaddgoods=false
						this.addgoodsinfo.name=''
						this.addgoodsinfo.price=''
						this.addgoodsinfo.market_price=''
						this.addgoodsinfo.goods_img=[]
						this.addgoodsinfo.score=''
						this.addgoodsinfo.desc=''
						this.addgoodsinfo.is_group=true
						this.addgoodsinfo.group_price=''
						this.addgoodsinfo.group_num=''
						this.addgoodsinfo.cate=''
						this.goods_show()
					}else if (res.error_code==1003) {
						this.$message.error(res.msg)
						
					};
				})
				};
			},
			
		},
		created(){
			this.showcate()
			this.goods_show()
		},
	}
</script>
<style lang="stylus" scoped>
.el-form-item__content{
	background-color:red;
}

	
.goods_infos
	background-color white
	margin-top 10px
	padding-top 10px
	font-size 15px
	.goods_info
		border-bottom 1px solid #ededed
		padding 20px 30px
		display flex
		justify-content space-between
		align-items center
		.goods_info_image
			width 80px
			height 100px
		.nameinfo
			margin-left 30px
			.goods_info_name
				color #323232
			.prices
				display flex
				height 30px
				margin-top 5px
				.price
					color #FF6C34
					weight 200
					line-height 30px
				.market_price
					color #AAAAAA
					margin-left 10px
					font-size 13px
					line-height 31px
					text-decoration line-through
			.time
				font-size 12px
				color #aaaaaa
				margin-top 8px
		.score
			color #AAAAAA
			font-size 14px
		.editgoods
			width 150px
			text-align right
			margin-right 20px
			.edit
				color #409EFF
				cursor pointer
				margin-top 15px
			.recommended
				color #aaaaaa
			.recommend
				color #409EFF
				cursor pointer
			.delete	
				color #C0C4CC
				margin-top 15px
				cursor pointer
				
		.is_group
			padding-top 20px
			width 200px
.goodspage
	background-color #f9f9f9

.addgoods
	background-color white
	padding 5px 50px 5px 20px
	display flex
	height 40px
	justify-content space-between
	.addgoods_button
		padding 5px 
		cursor pointer
		color #409EFF
	.search
		margin-top 4px
		position relative
		input
			line-height 26px
			background-color #EFEFF4
			border-radius 3px
			font-size 13px
			padding-left 15px
			width 190px
		img
			position absolute
			top 3px 
			right 5px
			width 18px
			height 18px
			cursor pointer
.el-icon-plus.avatar-uploader-icon
	margin-top 8px
	font-size 25px
.avatar-uploader

.editcates
	.el-button
		float right
		margin-right 20px
.upload_img
	position relative
.delete_img
	z-index 100
	width 12px
	height 12px
	position absolute
	top -10px
	right 3px
.uploadedimg
	width 80px
	height 110px
	margin-right 15px
.addcate
	margin-left 15px
	padding-bottom 10px
	width 100px
	color #0089e1
	cursor pointer
	.el-icon-plus
		margin-right 20px
.editcate	
	border-bottom 1px solid #ebedef
	margin-bottom 10px
	height 45px
	display flex
	justify-content space-between 
	padding-top 10px
	.edit
		display flex
		width 100px
		.el-button
			height 25px
			width 35px
			padding 0
			line-height 25px
.addgoodstyle
	width 100%
	.el-dialog
		width 80px
		.el-input
			width 80%
.sort
	width 30px
	text-align center
.catename
	margin-left 20px

.inputaddcate
	width 80%
.inputsort
	width 80%
.cancel
	float right
	margin-right 50px
	margin-top 10px
.submmit
	margin-left 50px
	margin-top 10px
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
.price_input
	display flex
	justify-content space-between
 	.input.el-input
		width 88%!important
.group_info_input
	display flex
	justify-content space-between
	.group_input.el-input
		width 88%!important
.el-form-item__content
	display flex
	padding-right 10px
.el-switch
	width 180px
	margin-top 10px
.el-textarea
	width 97%
.goods_name_input.el-input
	width 97%!important
.buttons
	margin-top 35px
	display flex
	justify-content space-between
	padding 0 20%
.block
	padding 20px 30px
	font-size 18px
.el-pagination
	text-align right
</style>