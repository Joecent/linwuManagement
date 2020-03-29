<template>
	<!-- 餐饮页面 -->
	<div>
	<div class="goods_edit">
		<div class="title">
			<div class="base_info">编辑商品</div>
		</div>
		<el-form :model="goodsinfo" >
		<div v-show="first_step" class="first_step_frame">
				<el-form-item label="商品名称"label-width="80px"><el-input class="goods_name_input" size="medium" placeholder="最多输入20个字符" maxlength="20" show-word-limit v-model="goodsinfo.name"/></el-form-item>
				<el-form-item label="商品分类"label-width="80px">
					<el-select placeholder="请选择商品分类" style="width:50%" v-model="goodsinfo.cate" size="medium" @change="cate_change">
						<el-option v-for="item in cates":label ="item.cate_name" :value="item.cate_id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品图片"label-width="80px">
					<el-upload
					class="avatar-uploader"
			  		action="https://www.linwushop.com/api/upload_img"
			  		list-type="picture-card"
			  		:on-remove="handleRemove"
			  		:file-list="images_list"
			  		multiple
			       :on-success="uploadsuccess"
			      >
			       <i class="el-icon-plus avatar-uploader-icon" v-if="goodsinfo.goods_img==''"></i>
					<div class="upload_tips" v-if="goodsinfo.goods_img==''"> （推荐像素：200px*200px）</div>
					</el-upload>

				</el-form-item>
				<el-form-item label="商品售价"label-width="80px">
					<el-input class="input" size="medium" placeholder="请输入商品售价"v-model="goodsinfo.price">
 						<template slot="prepend">￥</template>
 					</el-input>
 				</el-form-item>
 				<el-form-item label="商品原价"label-width="80px">
					<el-input class="input" size="medium" placeholder="请输入商品原价"v-model="goodsinfo.market_price">
 						<template slot="prepend">￥</template>
 					</el-input>
 				</el-form-item>
				 <el-form-item label="商品库存"label-width="80px" v-if="spec_show==false">
				<el-input class="score_input" size="medium" placeholder="请输入库存"v-model="goodsinfo.score"/>
				</el-form-item>
		<el-form-item label="商品描述" label-width="80px">
			<el-input class="input" size="medium"placeholder="请输入商品描述（选填）"v-model="goodsinfo.goods_desc"></el-input>
		</el-form-item>
		<el-form-item label="商品参数" label-width="80px" >
          <div style="width:100%">
          <div style="display:flex;width:100%;margin-bottom:5px;" v-for="(items,index) in attrs_sel">
          <el-input placeholder="选填，如：颜色" v-model="items.attr_name" size="medium" style="width:30%"/>
          <el-input placeholder="选填，以 / 隔开，如：红色/白色" v-model="items.attr_value" size="medium"
                    style="width:70%;margin-left:20px;margin-right:20px"/>
          <img class="cancel_img" src="@/assets/images/cancel.png" @click="delete_attr(index)">
          </div>
          <div class="add_attr" @click="to_add_attr">增加参数项</div>
          </div>
        </el-form-item> 
		<el-form-item label="是否上架"label-width="80px">
			<el-switch
				v-model="goodsinfo.is_on_sale"
				active-text="是"
				inactive-text="否">
			</el-switch>
		</el-form-item>
		</div>
			</el-form>
	</div>

			<div class="buttons">
				<button class="cancle" @click="cancel_goodsinfo">返回</button>
				<!--<button class="comfirm"v-if="first_step" @click="show_second_step">下一步</button>-->
				<!--<button class="cancle" v-if="second_step" @click="show_first_step">上一步</button>-->
				<button class="comfirm" @click="submitgoods">提交</button>
			</div>
	</div>
</template>
<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import '@/utils/jquery'
import {formatNumber} from '@/utils/formatNumber'
import {sel_cate,
		goods_add,
		add_spec,
		add_attr,
		attr_list,
		update_attr,
		del_attr,
		spec_list,
		update_spec,
		del_spec,
		getGroupAll,
		goods_pro_add,
		search_spec,
		search_attr,
		getToken,
		get_goods
		} from '@/utils/api'
	export default{
		data(){
			return{
				isTrue:true,//由规格控制是否可以提交
				//is_on_true:true,
				shop_type:store.get('shop_type'),
				shop_id:store.get('currentshopid'),
				spec_show:false,
				items_show:'',
 				p_data:{},
				goodsinfo:{
					name:'',
					cate:'',
					firstimageUrl:'',//主图
					goods_img:[],
					price:'',
					market_price:'',
					score:'',
					is_group:false,
					group_price:'',
					group_num:'2',
					goods_desc:'',//详情图片字段
					recommend:false,
					single_p_profit:'1',
					group_p_profit:'1',
					p_price:'',
					real_goods_score:'1',
					goods_score_expect:'1',
					is_on_sale:0,
					code:'',
				},
				first_step:true,
				second_step:false,
				cates:[],
				images_list:[],
				editorText:'',
				editgoods_id:'',
				toggle_specs:0,
				attrs_sel:[{
					attr_value:'',
					attr_name:''
				}],
				cate_id:'',
				attrs:[],
				token:'',
				specs:[],
				spec_index:0,
				spec_value_index:0,
				table_data: {},
				show_specs:false,
				cate_specs:'',
				add_spec_form:false,
				new_spec_name:'',
				new_spec_value:'',
				spec_id:'',
				single_goodsinfo:true,
				spec_show:false
			}
		},
		methods:{
			uploadfirst(file){//主图上传
				console.log(file)
					this.goodsinfo.firstimageUrl=file.data.img_url
			},
			handlechange(e){
					if(e.length!=0){
						getGroupAll({
							shop_id:store.get('currentshopid'),
							type:Array.from(e)
					}).then(res=>{
							if(res.status=='1'){
									this.goodsinfo.choose=res.data
							}
					})
					}else{
						this.goodsinfo.choose=''
					}
			},
			remove_logo(file){//主图删除4
					this.goodsinfo.firstimageUrl=''
			},
			handlePictureCar(file){
				this.goodsinfo.goods_desc.push(file.data.img_url)
				console.log(this.goodsinfo.goods_desc)
			},
			RemovePictureCar(file){
				console.log(file)
			},
			RemovePicturer(file){

				for(let i=0;i<this.goodsinfo.goods_desc.length;i++){
						if(this.goodsinfo.goods_desc[i]==file.response.data.img_url){
								this.goodsinfo.goods_desc.splice(i,1)
						}
				}
				console.log(this.goodsinfo.goods_desc)
			},
			after_upload(file){
			},
			get_token(){
				getToken({type:3}).then((res)=>{
			 		this.p_data={token:res.token1}
			 	});
			},
			show_cates(){
				sel_cate({shop_id:store.get('currentshopid'),goods_type : '0,1'}).then((res)=>{
					if (res.error_code==1000) {
						this.cates=res.data
					};
				})
			},
			to_show_spec(){
				if (this.cate_id=='') {
					this.$message.error('请先选择分类')
				}else{
					this.show_specs=true
				}
			},
			// show_second_step(){
			// 		if(this.isTrue){
			// 			this.first_step=true
			// 			this.second_step=false
			// 		}
			// },
			// show_first_step(){
			// 	this.first_step=true
			// 	this.second_step=false
			// },
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
			change_index(index,indexs){
				this.spec_index=index
				this.spec_value_index=indexs
			},
			cancel_goodsinfo(){
				this.$router.push('/unclewei/goods/goods')
			},
	  show_specs_method(){
	  	search_spec({cate_id: this.cate_id, shop_id: store.get('currentshopid')}).then((res) => {
          if (res.error_code == 1000) {
            this.specs = res.data
          } else if (res.error_code == 1002) {
            this.specs = []
          } else {
            this.$message.error('参数错误')
          }
        })
	  },
	  //是否显示规格编辑
	  show_spec_add(){
	  	this.spec_show=!this.spec_show
	  },
	//分类切换调用
      cate_change(id) {
        this.cate_id = id
        //this.attrs_sel = []
        this.show_specs_method()
        // if(this.cate_id) {
        //   this.search_attr_get(id)
        // }
      },
      to_add_attr() {
        this.attrs_sel.push({attr_name: '', attr_value: ''})
      },
      delete_attr(id) {
      	if (id==0) {
      		this.attrs_sel=[{
					attr_value:'',
					attr_name:''
				}]
      	}else{
        this.attrs_sel.splice(id, 1)
        }
      },
      //判断与上一次输入是否相同，相同不让添加
      del_sep(index) {
        let flag = false
        if (this.toggle_specs === 0) {
          let item = this.use_specs[0].value[index].value_item
          for (let i = 0; i < this.use_specs[0].value.length - 1; i++) {
            if (this.use_specs[0].value[i].value_item === item && item) {

              flag = true
            }
          }
          if (item == '' || flag) {
            this.use_specs[0].value.splice(index, 1)
          }
        }
        if (this.toggle_specs === 1) {
          let item = this.use_specs[1].value[index].value_item
          for (let i = 0; i < this.use_specs[1].value.length - 1; i++) {
            if (this.use_specs[1].value[i].value_item === item && item) {
              flag = true
            }
          }
          if (item == '' || flag) {
            this.use_specs[1].value.splice(index, 1)
          }
        }
      },

      afterChange() {
        this.goodsinfo.goods_desc = this.editorText
      },
      afterBlur() {
      },
      onContentChange() {
      },
      //提交商品
      submitgoods() {
				if(this.isTrue){
					var flag=true
					if (this.goodsinfo.name=='') {
						this.$message.error('请输入商品名称')
					}else if(this.shop_id=='144'&&this.goodsinfo.firstimageUrl==''){
							this.$message.error('首页图片不能为空')
					}else if(this.shop_id=='226'&&this.goodsinfo.firstimageUrl==''){
							this.$message.error('首页图片不能为空')
					}else if (this.goodsinfo.cate=='') {
						this.$message.error('请选择商品分类')
					}else if (this.goodsinfo.goods_img=='') {
						this.$message.error('请上传商品图片')
					}else if (this.goodsinfo.price=='') {
						this.$message.error('请输入商品售价')
					}else if (this.goodsinfo.market_price=='') {
						this.$message.error('请输入商品原价')
					}else if (this.spec_show==false&&this.goodsinfo.score=='') {
						this.$message.error('请输入商品库存')
					}else{
						flag=false
					}
					if (flag==false) {
					const params = {
						goods_name: this.goodsinfo.name,
						goods_img:[],
						attrs: this.attrs_sel,
						goods_times:this.goodsinfo.goods_times,
            			is_active:this.goodsinfo.is_active?'1':'0',
             			group_profit:'0',
						//group_send_type:this.goodsinfo.group_send_type.toString(),
						//group_profit:this.goodsinfo.group_p_profit,
						item: [],
						//is_group: this.goodsinfo.is_group?1:0,
						//group_num: this.goodsinfo.group_num<2?'2':this.goodsinfo.group_num,
						//group_price:this.goodsinfo.group_price,
						is_on_sale: this.goodsinfo.is_on_sale?1:0,
						is_on_spec:this.attrs_sel[0].attr_name==''?0:1,
						//is_commend: this.goodsinfo.recommend?1:0,
						goods_desc: this.goodsinfo.goods_desc,
						cate_id: this.goodsinfo.cate,
						shop_id: store.get('currentshopid'),
					}
					//数据拼装
					this.goodsinfo.goods_img.forEach((item) => {
						params['goods_img'].push(item)
					})
						//params['is_on_spec'] = 0
						let objItem={
						spec_name:'无规格',
						p_price:'0',
						goods_price:this.goodsinfo.price,
						market_price:this.goodsinfo.market_price,
						profit:[0,0,0],
						goods_score:this.goodsinfo.score,
						goods_score_expect:'0',
						single_p_profit:'0',
						group_p_profit:'0',
						item_images:{id:18,img:'0'},
						key_name:"常规:常规",
              			spec_item:18,
						}
						params['item'].push(objItem)
						goods_pro_add(params).then((res) => {
						if (res.error_code==1000) {
							this.$message.success('添加成功！')
							this.$router.push('/unclewei/goods/goods')
							}else {
								this.$message.error('对不起，添加失败！')
								this.$router.push('/unclewei/goods/goods_add')
								}
						})
					}
				}
			},
				//搜索属性
				search_attr_get(id){
					search_attr({cate_id:id,page:1,shop_id:store.get('currentshopid')}).then((res)=>{
						if (res.error_code == 1000) {
							this.attrs=res.data
						}
						// else {
						//   this.$message.error(res.msg)
						// }
					})
					},

	},
	created(){
		this.get_token()
		this.show_cates()
	}
	}
</script>
<style lang="stylus" scoped>
.score_info
	display flex
.goods_edit
	padding 20px 20px 80px 20px
.title
	display flex
	justify-content space-between
	margin-bottom 30px
	text-align center
	height 40px
	line-height 40px
	font-size 18px
	.base_info
		width 100%
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
	color #aaaaaa
.price_input
	display flex
	.input.el-input
		width 80%!important
.el-switch
	width 180px
	margin-top 10px
.reach_text
	width 80%
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
	width 18px
	height 18px
	margin-top 10px
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
	position relative
	.delete_value
		position absolute
		z-index 100
		left -5px
		top -5px
		img
			width 15px
			height 15px
	img
		width 20px
		height 20px
		cursor pointer
		margin-bottom 10px
.specs
	margin-bottom 5px
.goods_spec
	width 90%
.goods_spec_frame
	border 1px solid #e1e1e1
	padding 20px 30px
	margin-bottom 15px
.profit
	display flex
.delete_spec_button
	border 1px solid #ff8661
	background-color white
	color #ff8661
	width 80px
	height 30px
	text-align center
	padding 0 8px
	border-radius 4px
	cursor pointer
	margin 5px 0 10px 0
	line-height 30px
.add_spec_button
	border 1px solid #609eff
	background-color white
	color #609eff
	width 80px
	height 30px
	text-align center
	padding 0 8px
	border-radius 4px
	cursor pointer
	margin 5px 0 10px 0
	line-height 30px
.spec_none_title
	color #AAAAAA
.add_spec_items_button
	border 1px solid #609eff
	background-color white
	color #609eff
	width 120px
	height 30px
	text-align center
	padding 0 8px
	border-radius 4px
	cursor pointer
	margin 5px 0 10px 0
	line-height 30px
.cate_spec
	border-bottom 1px solid #e1e1e1
	padding 10px 0
.cate_name
	width 60%
.cate_spec_name
	width 30%
.cate_spec_table
	display flex
	justify-content space-between
	width 95%
.cate_spec_value
	display flex
.spec_value_title
	width 60px
.cate_space_items
	display flex
	flex-wrap wrap
	flex 1
.spec_value_item
	margin-left 10px
.spec_none
	text-align center
.spec_add_form
	margin 20px 0
	display flex
.spec_input
	display flex
	align-items center
.spec_value_input
	display flex
	align-items center
	margin-left 15px
	flex 1
.add_spec_imform
	cursor pointer
	border 1px solid #609eff
.add_spec_name_title
	width 70px
.add_spec_value_title
	width 22%
	text-align right
.new_spec_name_input
	width 120px
.new_spec_value_input
	width 78%
.spec_add
	margin-top 20px
.add_spec
	cursor pointer
	border 1px solid #609eff
	border-radius 5px
	padding 0 10px
	width 60px
	text-align center
	color #609eff
	margin-top 20px
.decide_edit_value
	justify-content flex-end
	display flex
	margin-top 10px
.edit_spec
	cursor pointer
	border 1px solid #609eff
	padding 0 10px
	border-radius 5px
	width 90px
	text-align center
	color #609eff
	margin-top 20px
	margin-right 30px
.edit_spec_cancle
	cursor pointer
	border 1px solid #e1e1e1
	padding 0 10px
	border-radius 5px
	width 90px
	text-align center
	color #e1e1e1
	margin-top 20px
.cate_spec_options
	display flex
	min-width 120px
	height 24px
	line-height 24px
	justify-content flex-end
.cate_spec_delete
	margin-right 10px
	border 1px solid #e1e1e1
	color #e1e1e1
	padding 0 10px
	border-radius 5px
	cursor pointer
.cate_spec_edit
	border 1px solid #409EFF
	color #409EFF
	padding 0 10px
	border-radius 5px
	cursor pointer
.table_head
	width 80px
	padding 0 5px
	border-bottom none
.table_head_long
	width 100px
.table_value_title
	width 100px
	text-align center
</style>
<style lang="stylus" scoped>
.picture{
		padding-left:80px;
}
	.pictureCard{
			width:400px;
			border:none;
	}
	.pictureCard>img{
		width:100%;
		border:none;
	}
	.lee-style1{
		width: 50%;
	}

	.lee-style3{
		width: 100%;
	}

	.lee-style5{

		display:flex;
		margin-bottom:20px
	}

	.lee-style7{

		display:flex;

	}

	.lee-style6{
		width: 30%;
	}

	.el-dialog{
		width: 800px !important;
	}

	.add_spec_name_title{
		width: 100px;
	}

	.add_spec_value_title{
		width: 100px;
	}

	.el-dialog__header{
		text-align: center;
	}

	.spec_none{
		text-align: left;
	}

	.el-select-dropdown__wrap,
	.el-scrollbar__wrap{
		max-height: none;
	}

	@media(max-width:900px ) {

	.spec_value_input{
		    margin-left: 0;
	}

	.add_spec_value_title{
			text-align:left;
			padding-top:5px;
	}
.picture{
		padding-left:0;
}

	.el-form-item__content{
		margin-left: 0 !important;
		width: 100%;
		float: none;
		display: block;
	}
	.el-input--medium{
		width: 100% !important;
	}

	.el-select{
		width: 100% !important;
	}

	.el-dialog{
		width: 90% !important;
	}

	.cate_spec_options{
		text-align: right;
		float: none;
		display: block;
	}

	.cate_spec_delete,
	.cate_spec_edit{
		display: inline-block;
	}

	.cate_spec{
		position: relative;
	}

	.cate_spec_value{
		position:initial;
	}

	.cate_spec_options{
		margin-top: 15px;
	}

	.buttons{
		width: 100%;
		left: 0;
	}

	.title{
		display: block;
		margin-bottom: 10px;
	}
	.title .base_info,
	.title .detail_info{
		display: inline-block;
		width: 100%;
	}
	.goods_edit{
		padding: 0;
		padding-top: 30px;
	}
	.first_step_frame{
		width: 100%;
		padding-bottom: 50px;
	}

	.lee-style4{
		width: 100%;
	}

	.score_input.el-input{
		width: 100% !important;
	}

	.el-form-item{
		width: 100%;
	}

	.el-form-item__label{
		width: 100%;
		float: none;
		line-height: 24px;
		height: 24px;
		padding-bottom: 10px;
	}
	.price_input{
		display: block;
	}
	.el-upload--picture-card{
		display: block;
		height: auto;
	}

	.div .body .el-main .breadcrumb-container{
		margin-bottom: 0;
	}

	.title .base_info, .title .detail_info{
		height: 30px;
		font-size: 14px;
		line-height: 30px;
	}

	.goods_edit{
		padding-top: 10px;
	}

	.first_step_frame{
		padding: 0 10px;
	}
	.el-form-item{
		margin-bottom: 10px;
	}

	.goods_spec{
		width: 100%;
	}

	.avatar-uploader-icon{
		width: 100%;
		text-align: center;
	}

	.upload_tips{
		display: block;
	}

	.spec_name{
		display: block;
		width: 80px;
		margin-right: 0;
	}

	.group_info_input .el-form-item__content{
		width: 150px;
	}

	table.spe_table{
		font-size: 12px;
		color: #555555;
		font-weight: inherit;
	}

	table.spe_table th,
	table.spe_table td,
	table.spe_table .el-input__inner{
		height: 20px;
		line-height: 20px;
		border-radius: 0;
	}

	.table_value_title{
		width: 80px;
		overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
	}

	.buttons{
		position: static;
	}

	.el-switch{
		width: 100%;
	}

	.title .active_detail_info{
		width: 49%;
		font-size: 14px;
		height: 30px;
		text-align: center;
		display: inline-block;
		line-height: 30px;
	}
	.reach_text{
		float: none;
		width: 100%;
	}

	.ke-container{
		width: 100% !important;
	}

	.ke-edit{
		height: 300px !important;
	}

	.goods_spec_frame{
		padding: 10px;
	}

	.el-select>.el-input{
		display: block;
	}
	.lee-style6{
		display: block;
		width: 100%;
	}
	.lee-style5,.lee-style7{
		display: block;
	}

	.input_values{
		width: 100%;
	}

	.input_value{
		width: 100%;
		margin-right: 0;
	}

	}

	@media(max-width:780px ) {

		.spec_add_form{
			display: block;
		}

		.spec_input,
		.spec_value_input,
		.cate_spec_table{
			width: 100%;
			display: block;
		}

		.add_spec_name_title,
		.new_spec_name_input,
		.add_spec_value_title,
		.new_spec_value_input{
			display: block;
			width: 100%;
			margin-bottom: 6px;
		}
		.profit{
				display:inline-block;
				width:100%;
				.el-form-item{
					display:flex;
					width:100%;
					.el-form-item__label{
						min-width:120px !important;
					}
					.el-form-item__content{
						width:85% !important;
					}
				}
			}
		.cate_name{
			width: 60%;
			display: inline-block;
			padding-bottom: 6px;
		}
		.cate_spec_name{
			width: 38%;
			display: inline-block;
			padding-bottom: 6px;
		}

	}

	@media(max-width:500px ){
		.pictureCard{
			width:60%
		}
	}
</style>
<style>
	.goods_edit	.el-upload{
				justify-content:center
		}
	.radioList .el-form-item__content{
		    margin-left: 20px;
    		margin-top: 14px;
	}
</style>
