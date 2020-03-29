<template>
	<div class="goods_edit">
		<div class="title">
			<div class="base_info" @click="show_first_step">基本信息</div>
			<div v-bind:class="{'active_detail_info':second_step,'detail_info':!second_step}" @click="show_second_step">商品详情</div>
		</div>
		<el-form :model="goodsinfo" >
		<div v-show="first_step" class="first_step_frame">
				<el-form-item label="商品名称"label-width="80px"><el-input class="goods_name_input" size="medium" placeholder="请输入商品名称"v-model="goodsinfo.name" style="width:50%"/></el-form-item>
				<el-form-item label="商品分类"label-width="80px">
					<el-select placeholder="请选择商品分类" style="width:20%" v-model="goodsinfo.cate" size="medium" @change="cate_change">
						<el-option v-for="item in cates":label ="item.cate_name" :value="item.cate_id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品图片"label-width="80px">
					<el-upload 
					class="avatar-uploader"
			  		action="https://www.huixianfeng.net/upload_img"
			  		list-type="picture-card"
			  		:on-remove="handleRemove"
			  		:file-list="images_list"
			  		multiple
			       :on-success="uploadsuccess"
			      >
					</el-upload>
				</el-form-item>
				<div class="price_input">
				<el-form-item label="商品售价"label-width="80px">
					<el-input class="input" size="medium" placeholder="请输入售价"v-model="goodsinfo.price">
 						<template slot="prepend">￥</template>
 					</el-input>
 				</el-form-item>
				<el-form-item label="划线价">
					<el-input class="input" size="medium"placeholder="请输入原价"v-model="goodsinfo.market_price">
					<template slot="prepend">￥</template>
					</el-input>
					</el-form-item>
				</div>
				<el-form-item label="商品库存"label-width="80px">
				<el-input class="score_input" size="medium" placeholder="请输入库存"v-model="goodsinfo.score"/>
				</el-form-item>
				<div class="group_info_input">	
				<el-form-item label="开启团购"label-width="80px">
				<el-switch
					v-model="goodsinfo.is_group"
					active-text="是"
				  	inactive-text="否">
				</el-switch></el-form-item>
				<el-form-item v-if="this.goodsinfo.is_group"label="最小开团人数"><el-input class="input" placeholder="开团人数要求" size="medium" v-model="goodsinfo.group_num" style="width:90%"/></el-form-item>
				<el-form-item v-if="this.goodsinfo.is_group"label="团购价格"label-width="80px">
				<el-input class="input" size="medium" placeholder="团购价格"v-model="goodsinfo.group_price">
					<template slot="prepend">￥</template>
				</el-input>
				</el-form-item>
				</div>
				<!-- <el-form-item v-if="this.goodsinfo.is_group"label="团购价格"label-width="80px">
				<el-input class="input" size="medium" placeholder="团购价格"v-model="goodsinfo.group_price">
					<template slot="prepend">￥</template>
				</el-input>
				</el-form-item> -->
				<!-- <el-form-item v-if="this.goodsinfo.is_group"label="最小开团人数"><el-input class="input" placeholder="开团人数要求" size="medium" v-model="goodsinfo.group_num"/></el-form-item>
				</div> -->
				<div>
					<el-form-item label="商品规格" label-width="80px">
						<div  class="goods_spec">
						<div class="goods_spec_frame" v-for="(that,index) in use_specs">
						<div style="display:flex;margin-bottom:20px">
						<div class="spec_name"><img v-if="index!=0" src="@/assets/images/cancel.png">规格名：</div>
						   <el-select placeholder="选择规格项" v-model="that.name" size="medium" style="width:30%" filterable allow-create>
						<el-option v-for="item in specs" :label ="item.spec_name" :value="item.spec_id"></el-option>
					</el-select>  
						</div>
						<div style="display:flex">
						<div class="spec_name">规格值：</div>
						<div class="input_values">
						<div class="input_value" v-for="(items,indexs) in that.value">
						<el-input placeholder="输入规格值"style="width:100%;margin-bottom:10px" size="medium" v-model="items.value_item"></el-input>
						<el-upload
							v-if="index==0"
							class="spec-uploader"
			  				action="https://www.huixianfeng.net/upload_img"
			  				list-type="picture-card"
			  				:limit="1"
			  				:on-remove="handleRemove_spec"
			  				:file-list="items.img"
			       			:on-success="uploadsuccess_spec"
			     		 >
						<img v-if="items.img==''" @click="change_index(index,indexs)"src="@/assets/images/photo.png"/>
						</el-upload>
						</div>
					<div class="add_spec_value" @click="add_spec_value(index)">增加规格值</div>
					</div>
						</div>
						</div>
					<div class="create_spec" @click="to_create_spec">新规格项</div>
						</div>
					</el-form-item>
					
				</div> 
				<el-form-item :label="items.label_name"label-width="80px" v-for="(items,index) in attrs_sel">
					<el-input placeholder="参数名称" v-model="items.attr_name" size="medium" style="width:20%"/>
					<el-input placeholder="请输入参数内容" v-model="items.attr_value" size="medium" style="width:40%;margin-left:20px;margin-right:20px"/>
					<img v-if="index!=0"class="cancel_img" src="@/assets/images/cancel.png" @click="delete_attr(index)">
				</el-form-item>
				<el-form-item label=""label-width="80px">
					<div class="add_attr" @click="to_add_attr">增加参数项</div>
				</el-form-item> 
				<el-form-item label="是否推荐"label-width="80px">
					<el-switch
						v-model="goodsinfo.recommend"
						active-text="是"
						inactive-text="否">
					</el-switch>
				</el-form-item>
		<form>
		<textarea name="content" class='keditor' style="width:800px;height:400px;visibility:hidden;">KindEditor</textarea>
		</form>
			</div>	
			<div v-if="second_step" class="second_step_frame">
				 <div class="reach_text">
   			 		<editor id="editor_id" height="700px" width="100%" 
   			 		class="reach_text_editor"
					uploadJson="https://up.qbox.me"
					:extraFileUploadParams="p_data"
   			 		filePostName='file'
   			 		:afterUpload="after_upload()"
   			 		:allowImageRemote="false"
					:resizeType='1'
   			 		:afterChange="afterChange()"
   			 		:content.sync="editorText"
            		:afterBlur="afterBlur"
            		pluginsPath="vue-kindeditor/static/kindeditor/plugins/"
            		:loadStyleMode="false"
            		:filterMode="false"
            		:items="items_show"
            		@on-content-change="onContentChange">
            		</editor>

 				</div> 
 				<!-- <textarea id="content2" name="content1" style="width:700px;height:350px;visibility:hidden;" >
				</textarea> -->
 			</div>
			</el-form>
			<div class="buttons">
				<button class="cancle" v-if="first_step" @click="cancel_goodsinfo">返回</button>
				<button class="comfirm"v-if="first_step" @click="show_second_step">下一步</button>
				<button class="cancle" v-if="second_step" @click="show_first_step">上一步</button>
				<button class="comfirm" v-if="second_step==true" @click="submitedit">确认</button>
			</div>
	</div>
</template>
<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import '@/utils/jquery'
import {sel_cate,goods_add,goods_edit,add_spec,add_attr,attr_list,update_attr,del_attr,spec_list,update_spec,del_spec,goods_pro_add,goods_pro_edit,search_spec,getToken} from '@/utils/api'
	export default{
		data(){
			return{
				items_show:["undo", "redo", "|",
 "justifyleft", "justifycenter", "justifyright", "justifyfull", "insertorderedlist", "insertunorderedlist", "subscript", "superscript", "|", "/", "formatblock", "fontname", "fontsize", "|", "forecolor", "hilitecolor", "bold", "italic", "underline", "strikethrough",  "|", "table", "hr","image"],
 				p_data:{},
				goodsinfo:{
					name:'',
					cate:'',
					goods_img:[],
					price:'',
					market_price:'',
					score:'',
					is_group:true,
					group_price:'',
					group_num:'',
					goods_desc:'',
					recommend:false,
				},
				first_step:true,
				second_step:false,
				edit:false,
				cates:[],
				images_list:[],
				editorText:'',
				editgoods_id:'',
				attrs_sel:[{
					label_name:'商品参数',
					attr_value:'',
					attr_name:''
				}],
				cate_id:'',
				token:'',
				specs:[],
				spec_index:0,
				spec_value_index:0,
				use_specs:[{name:'',value:[{value_item:'',img:[]}]}],
			}
		},
		methods:{
			after_upload(file){
				console.log(file,'2222')
			},
			get_token(){
				getToken({type:3}).then((res)=>{
			 		this.p_data={token:res.token1}
			 	});
			},
			show_cates(){
				sel_cate({shop_id:store.get('currentshopid')}).then((res)=>{
					if (res.error_code==1000) {
						this.cates=res.data
					};
				})
			},
			show_second_step(){
				this.first_step=false
				this.second_step=true
			},
			show_first_step(){
				this.first_step=true
				this.second_step=false
			},
			handleRemove(file){
				if (file.response) {
					for (var i = this.goodsinfo.goods_img .length - 1; i >= 0; i--) {
					if (file.response.data.img_url==this.goodsinfo.goods_img[i]) {
						this.goodsinfo.goods_img.splice(i,1)
					}
				}
				}else{
				for (var i = this.goodsinfo.goods_img .length - 1; i >= 0; i--) {
					if (file.url==this.goodsinfo.goods_img[i]) {
						this.goodsinfo.goods_img.splice(i,1)
					}
				}
			}
			},
			uploadsuccess(res){
				if (res.error_code==1000) {
					this.goodsinfo.goods_img.push(res.data.img_url)
				}else{
					this.$message.error(res.msg)
				}
			},
			uploadsuccess_spec(res,file){
				if (res.error_code==1000) {
					this.use_specs[this.spec_index].value[this.spec_value_index].img.push(res.data.img_url)
					console.log(this.use_specs,'0000',file)
				}else{
					this.$message.error('上传失败')
				}
			},
			change_index(index,indexs){
				this.spec_index=index
				this.spec_value_index=indexs
			},
			handleRemove_spec(file){
				console.log(file,'222')
				 for (var i = this.use_specs.length - 1; i >= 0; i--) {
				 	for (var a = this.use_specs[i].value.length - 1; a >= 0; a--) {
				 		if (this.use_specs[i].value[a].img[0]==file.response.data.img_url) {
				 			this.use_specs[i].value.splice(a,1)
				 		};
				 	};
				 };
			},
			cancel_goodsinfo(){
				this.$router.push('/home/goods/goods')
			},
			cate_change(callback){
				this.cate_id=callback
				this.specs=[]
				search_spec({cate_id:callback,shop_id:store.get('currentshopid')}).then((res)=>{
					if (res.error_code==1000) {
						this.specs=res.data
					}else if (res.error_code==1002) {
						this.specs=[]
					}else{
						this.$message.error('参数错误')
					};
				})
			},
			to_add_attr(){
				this.attrs_sel.push({label_name:'',attr_value:'',attr_name:''})
			},
			delete_attr(id){
				this.attrs_sel.splice(id,1)
			},
			to_create_spec(){
				this.use_specs.push({name:'',value:[{value_item:''}]})
			},
			add_spec_value(index){
				this.use_specs[index].value.push({value_item:'',img:[]})
			},
			afterChange(){
				this.goodsinfo.goods_desc=this.editorText
			},
			afterBlur(){
			},
			onContentChange(){
			},
			submitedit(){
				this.$router.push('/agent/goods/goods')		
			}
		},
		created(){
			this.get_token()
			this.show_cates()
			if (this.$route.query.goods_id) {
				var goodsinfo_edit=store.get('goodsinfo')
				this.edit=true
				this.editgoods_id=goodsinfo_edit.goods_id
				this.goodsinfo.name=goodsinfo_edit.goods_name
				this.goodsinfo.price=goodsinfo_edit.goods_price
				this.goodsinfo.market_price=goodsinfo_edit.market_price
				this.goodsinfo.goods_desc=goodsinfo_edit.goods_desc
				this.goodsinfo.is_group=goodsinfo_edit.is_group==1?true:false
				this.goodsinfo.group_price=goodsinfo_edit.group_price
				this.goodsinfo.cate=goodsinfo_edit.cate_id
				this.editorText=goodsinfo_edit.goods_desc
				this.goodsinfo.score=goodsinfo_edit.goods_score
				this.goodsinfo.group_num=goodsinfo_edit.group_num
				this.images_list.push({name:'image',url:goodsinfo_edit.goods_img})
				this.goodsinfo.goods_img.push(goodsinfo_edit.goods_img)
				if (goodsinfo_edit.img_url!=[]) {
					for (var i = goodsinfo_edit.img_url.length - 1; i >= 0; i--) {
					this.goodsinfo.goods_img.push(goodsinfo_edit.img_url[i])
					this.images_list.push({name:"image"+i.toString(),url:goodsinfo_edit.img_url[i]})
				};
				};
			};
		},

	}
</script>
<style lang="stylus" scoped>
.goods_edit
	padding 20px
.title
	display flex
	justify-content space-between
	margin-bottom 30px
	text-align center
	height 40px
	line-height 40px
	font-size 18px
	.base_info
		width 50%
		cursor pointer
		background-color #409eff
		color white
	.detail_info
		width 50%
		cursor pointer
	.active_detail_info
		width 50%
		cursor pointer
		color white
		background-color #409eff
.first_step_frame
	width 80%
	padding 0 20px
.upload_tips
	font-size 12px
	color #8c939d
.price_input
	display flex
	.input.el-input
		width 80%!important
.score_input.el-input
	width 30%!important
.el-switch
	width 180px
	margin-top 10px
.reach_text
	width 70%
	float right
.reach_text_editor
	display flex
	justify-content center
.buttons
	position fixed
	bottom 0
	left 170px
	width calc(100% - 170px)
	text-align center
	background-color #f8f0af
	height 40px
	line-height 40px
	.cancle
		margin-right 20px
		background-color white
		color #323232
		cursor pointer
		padding 5px 10px
		border-radius 4px
	.comfirm
		margin-left 20px
		background-color #409eff
		color white
		cursor pointer
		padding 5px 10px
		border-radius 3px
.avatar-uploader-icon
	font-size 28px
	color #8c939d
	line-height 40px
.add_attr
	color #409eff
	cursor pointer
	margin-right 20px
.create_attr
	color #409eff
	cursor pointer
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
.group_info_input
	display flex
.cancel_img
	width 16px
	height 16px
	margin-top 12px
	cursor pointer
.create_spec
	margin-bottom 20px
	cursor pointer 
	color #409EFF
	font-size 14px
	width 100px
.add_spec_value
	cursor pointer
	color #409EFF
	font-size 14px
.spec_name
	margin-right 20px
	color #aaaaaa
	width 60px
	display flex
	position relative
	img
		width 15px
		height 15px
		position absolute
		top 5px
		left -20px
		cursor pointer
.input_values
	display flex
	flex-wrap wrap
	width 90%
.input_value
	width 120px
	margin-right 20px
	img
		width 20px
		height 20px
		cursor pointer
		margin-bottom 10px
.specs
	margin-bottom 5px
.goods_spec
	width 90%
	border 1px solid #e1e1e1
	padding 20px 30px
</style>