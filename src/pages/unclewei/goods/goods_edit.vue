<template>
	<!-- 餐饮模板 -->
	<div class="goods_edit" v-else-if='shop_type==2'>
		<div class="title">
			<div class="base_info">编辑基本信息</div>
			<!--<div class="base_info_food" @click="show_first_step">编辑商品信息</div>-->
		</div>
		<el-form :model="goodsinfo" >
		<div class="first_step_frame">
				<el-form-item label="商品名称"label-width="85px"><el-input class="goods_name_input" size="medium" placeholder="最多输入20个字符" maxlength="20" show-word-limit v-model="goodsinfo.name"/></el-form-item>
				<el-form-item label="商品分类"label-width="85px">
					<el-select placeholder="请选择商品分类" style="width:50%" v-model="goodsinfo.cate" size="medium" @change="cate_change">
						<el-option v-for="item in cates":label ="item.cate_name" :value="item.cate_id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品图片"label-width="85px">
					<el-upload 
					class="avatar-uploader"
			  		action="https://www.linwushop.com/api/upload_img"
			  		list-type="picture-card"
			  		:on-remove="handleRemove"
			  		:file-list="images_list"
			  		multiple
			       :on-success="uploadsuccess"
			      >
			       <i class="el-icon-plus avatar-uploader-icon"></i>
					<div class="upload_tips"> （推荐大小200*200px）</div>
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
				<el-form-item label="商品库存"label-width="85px">
				<el-input class="score_input" size="medium" placeholder="请输入库存"v-model="goodsinfo.score"/>
				</el-form-item>
		<el-form-item label="商品描述" label-width="80px">
			<el-input class="input" size="medium"placeholder="请输入商品描述"v-model="goodsinfo.goods_desc"></el-input>
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
		<el-form-item label="是否上架"label-width="85px">
			<el-switch
				v-model="goodsinfo.is_on_sale"
				active-text="是"
				inactive-text="否">
			</el-switch>
		</el-form-item>
		<!-- 编辑规格 -->
		<!-- <el-dialog title="编辑规格" :visible.sync="show_specs" width="50%" :modal-append-to-body='false'>
			<div>
				<div class="spec_none" v-if="specs==''">此类别暂无规格选项，请添加！</div>
				 <div class="cate_spec" v-for="item in specs">
					<div class="cate_spec_table">
					 <div class="cate_name">分类名称：{{item.cate_name}}</div> 
					<div class="cate_spec_name">规格名称：{{item.spec_name}}</div>
					 <div class="cate_spec_options">
						<div class="cate_spec_delete" @click="delete_cate_spec(item.id)">删除</div>
						<div class="cate_spec_edit" @click="edit_cate_spec(item.id,item.spec_name,item.item)">编辑</div>
					</div> 
					<div class="cate_spec_value"><span class="spec_value_title">规格值：</span><div class="cate_space_items"><div class="spec_value_item" v-for="items in item.item">{{items.item}}</div></div></div>
					</div>
				</div>
				<div class="spec_add_form" v-if="add_spec_form">
					<div class="spec_input"><span class="add_spec_name_title">新规格名：</span><el-input class="new_spec_name_input" placeholder="请输入规格名" size="medium" v-model="new_spec_name"/></div>
					<div class="spec_value_input"><span class="add_spec_value_title">新规格值：</span><el-input class="new_spec_value_input" placeholder="请输入规格值，多个规格值用空格隔开" size="medium" v-model="new_spec_value"/></div>
				</div>
				<div class="add_spec" @click="to_add_spec" v-if="add_spec_form==false">添加</div>
				<div class="decide_edit_value" v-if="add_spec_form&&this.spec_id!=''">
				<div class="edit_spec" @click="edit_cate_spec_imform" >确认编辑</div>
				<div class="edit_spec_cancle" @click="edit_cate_spec_cancle" >取消编辑</div>
				</div>
				<div class="add_spec" @click="add_spec_imform" v-if="add_spec_form&&this.spec_id==''">确定</div> 
			</div>
		</el-dialog> -->
		</div>	
			</el-form>
			<div class="buttons">
				<button class="cancle"  @click="cancel_goodsinfo">返回</button>
				<button class="comfirm" @click="submitedit">提交</button>
			</div>
	</div>
</template>
<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import '@/utils/jquery'
import {formatNumber} from '@/utils/formatNumber'
import {sel_cate,
		goods_add,
		goods_edit,
		add_spec,
		add_attr,
		attr_list,
		update_attr,
		del_attr,
		spec_list,
		update_spec,
		del_spec,
		goods_pro_add,
		goods_pro_edit,
		search_spec,
		search_attr,
		getToken,
		get_goods
		} from '@/utils/api'
	export default{
		data(){
			return{
				currentPage:1,
				isTrue:true,
				count:0,
				shop_id:store.get('currentshopid'),
				shop_type:store.get('shop_type'),
				items_show:["undo", "redo", "|",
 "justifyleft", "justifycenter", "justifyright", "justifyfull", "insertorderedlist", "insertunorderedlist", "subscript", "superscript", "|", "/", "formatblock", "fontname", "fontsize", "|", "forecolor", "hilitecolor", "bold", "italic", "underline", "strikethrough",  "|", "table", "hr","image"],
 				p_data:{},
				goodsinfo:{
					name:'',
					price:'',
					group_send_type:['1','2','3'],
					goods_times:'',
					cate:'',
					scenario:[],//选择场景
					firstimg:[],
					firstimageUrl:'',//主图
					goods_img:[],
					is_active:false,
					admin_id:'',
					market_price:'',
					score:'',
					is_group:true,
					goods_desc:'',
					group_price:'',
					group_num:'',
					recommend:false,
					single_p_profit:'',
					group_p_profit:'',
					p_price:'',
					real_goods_score:'',
					goods_score_expect:'',
					link:'',
					is_on_sale:0,
					code:''
				},
				first_step:true,
				second_step:false,
				edit:false,
				cates:[],
				images_list:[],
				img_list:[],
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
				use_specs: [{name: '', value: []}],
				table_data: {},
				show_specs:false,
				cate_specs:'',
				add_spec_form:false,
				new_spec_name:'',
				new_spec_value:'',
				spec_id:'',
				spec_show:false
			}
		},
		methods:{
			uploadfirst(file){//主图上传
					this.goodsinfo.firstimageUrl=file.data.img_url
			},
			remove_logo(file){//主图删除
					this.goodsinfo.firstimageUrl=''
			},
			handlePictureCar(file){
				console.log(file)
					this.goodsinfo.goods_desc.push(file.data.img_url)
					console.log(this.goodsinfo.goods_desc)
			},
			RemovePictureCar(file){
				console.log(file)
			},
			RemovePicturer(file){
				
				 for(let i=0;i<this.goodsinfo.goods_desc.length;i++){
					if(file.url==undefined){
							if(this.goodsinfo.goods_desc[i]==file.response.data.img_url){
								this.goodsinfo.goods_desc.splice(i,1)
						}
					}else{
							if(this.goodsinfo.goods_desc[i]==file.url){
								this.goodsinfo.goods_desc.splice(i,1)
							}
					}						
				}
				console.log(this.goodsinfo.goods_desc)
			},
			handlechange(e){
					console.log(e)
			},
			handleChanges(e){
				if(this.table_data.value==undefined){
				}else{
					if(this.count!=0){
							for(let i=0;i<this.table_data.value.length;i++){
									if(this.table_data.value[i].value_item!==e){
										console.log("数组不存在该值")
										//if(this.true){//如果之前的isTrue为false,就让isTrue为false
														this.isTrue=true
												//}else{
														//this.isTrue=false
												//}
										}else{
												console.log("数组存在该值")
												this.isTrue=false//如果有相同的选项，就让isTrue为false
												console.log(this.isTrue)
												this.$message.error("不能选择相同的选项")
										}
							}						
				 		}else{
							 	this.isTrue=true
						 }
				}
					this.count=1
					this.createTableData()
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
			Laddspec(){
				this.spec_show =! this.spec_show
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
			handleRemove(file){
				if (file.response) {
					for (var i = this.goodsinfo.goods_img.length - 1; i >= 0; i--) {
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
					console.log(file)
					this.use_specs[this.spec_index].value[this.spec_value_index].img.push({name:"image_spec"+this.spec_value_index,url:res.data.img_url})   
					this.createTableData()
				}else{
					this.$message.error('上传失败')
				}
			},
			change_index(index,indexs){
				this.spec_index=index
				this.spec_value_index=indexs
			},
			handleRemove_spec(file){
				console.log(file)
				console.log(this.use_specs[0].value)
				 for (var i = this.use_specs.length - 1; i >= 0; i--) {
				 	for (var a = this.use_specs[i].value.length - 1; a >= 0; a--) {
							 try{
										if (this.use_specs[i].value[a].img[0].url==file.url) {
												this.use_specs[i].value.splice(a,1)
												this.table_data.value.splice(a,1)
										};
							 }catch(e){
									console.log("11")
							 }						
				 	};
				 };
			},
	//取消编辑
			cancel_goodsinfo(){
				this.$router.push('/unclewei/goods/goods')
			},
	//查询分类下的规格信息
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
      // del_sep(index) {
      //   let flag = false
      //   if (this.toggle_specs === 0) {
      //     let item = this.use_specs[0].value[index].value_item
      //     for (let i = 0; i < this.use_specs[0].value.length - 1; i++) {
      //       if (this.use_specs[0].value[i].value_item === item && item) {
      //         flag = true
      //       }
      //     }
      //     if (item == '' || flag) {
      //       this.use_specs[0].value.splice(index, 1)
      //     }
      //   }
      //   if (this.toggle_specs === 1) {
      //     let item = this.use_specs[1].value[index].value_item
      //     for (let i = 0; i < this.use_specs[1].value.length - 1; i++) {
      //       if (this.use_specs[1].value[i].value_item === item && item) {
      //         flag = true
      //       }
      //     }
      //     if (item == '' || flag) {
      //       this.use_specs[1].value.splice(index, 1)
      //     }
      //   }
      // },
      //创建表格数据
      createTableData() {
				if (this.toggle_specs === 0) {
          let obj= JSON.parse(JSON.stringify(this.use_specs[0]))
          this.setValueName(obj)
          this.table_data = obj
        }
        if (this.toggle_specs === 1) {
          let obj = JSON.parse(JSON.stringify({}))
          obj.name = this.use_specs[0].name + '_' + this.use_specs[1].name
          obj.value = []
          obj.specs_item=[]
          this.use_specs[0].specs_item.forEach(item=>{
            obj.specs_item.push(item)
          })
          this.use_specs[1].specs_item.forEach(item1=>{
            obj.specs_item.push(item1)
          })
          for (let i = 0; i < this.use_specs[0].value.length; i++) {
            for (let j = 0; j < this.use_specs[1].value.length; j++) {
              let obj_item = {}
              obj_item.value_item = this.use_specs[0].value[i].value_item
              obj_item.value_item_1 = this.use_specs[1].value[j].value_item
              obj_item['img'] = this.use_specs[0].value[i].img
              obj.value.push(obj_item)
            }
          }
          this.setValueName(obj)
          this.table_data = obj
        }				
      },
      setValueName(obj){
        for (let i=0;i<obj.specs_item.length;i++){
          for (let j=0;j<obj.value.length;j++){
            if (obj.value[j].value_item==obj.specs_item[i].id){
              obj.value[j].value_name=obj.specs_item[i].item
            }
            if (obj.value[j].value_item_1&&obj.value[j].value_item_1==obj.specs_item[i].id){
              obj.value[j].value_name_1=obj.specs_item[i].item
            }
          }
        }
      },
      // 选择规格项调用
      add_input_value(id) {
        if (this.toggle_specs === 0) {
          this.use_specs=[]
          this.use_specs.push({name:id,specs_item:[],value:[]}).ite
          this.specs.forEach(item=>{
            if (id==item.id) {
              this.use_specs[0].specs_item=item.item
            }
          })
        }
        if (this.toggle_specs === 1) {
          if (this.use_specs[1].name === this.use_specs[0].name) {
            this.to_del_spec()
          }
          if (this.use_specs.length==2){
            this.use_specs[1].name=id
          }
          this.specs.forEach(item=>{
            if (id==item.id) {
              this.use_specs[1].specs_item=item.item
            }
          })
        }
      },
      to_create_spec() {
        this.toggle_specs = 1
        let obj = {name: '', value: []}
        //this.use_specs.push(JSON.parse(JSON.stringify(obj)))
        this.use_specs.push(obj)
        this.use_specs[1].value.forEach(function (item) {
          item.value.push(JSON.parse(JSON.stringify(obj)))
        })
      },
      to_del_spec() {
        this.toggle_specs = 0
        this.use_specs.splice(1, 1)
      },
      to_add_spec(){
      	this.new_spec_value=''
      	this.new_spec_name=''
      	this.add_spec_form=true
      },
      delete_cate_spec(id){
      	del_spec({spec_id:id}).then((res)=>{
      		if (res.error_code==1000) {
      			this.$message.success('删除成功')
      			this.show_specs_method()
      		};
      	})
      },
      edit_cate_spec(id,name,item){
      	this.spec_id=id
      	this.add_spec_form=true
      	this.new_spec_name=name
      	this.new_spec_value=item[0].item
      	if (item.length>1) {
      	for (var i = 1;i<item.length;i++) {
      		this.new_spec_value+=" "+item[i].item
      	};
      	};
      },
      edit_cate_spec_imform(){
      	update_spec({
      		spec_name:this.new_spec_name,
      		item:this.new_spec_value,
      		sort:1,
      		cate_id:this.cate_id,
      		spec_id:this.spec_id
      	}).then((res)=>{
      		if (res.error_code==1000) {
      			this.$message.success('修改成功')
      			this.show_specs_method()
      			this.spec_id=''
      			this.add_spec_form=false
      		}else{
      			this.$message.error('修改失败')
      		}
      	})
      },
      edit_cate_spec_cancle(){
      	this.add_spec_form=false
      	this.spec_id=''
      },
      add_spec_imform(){
      	add_spec({
      		spec_name:this.new_spec_name,
      		item:this.new_spec_value,
      		shop_id:store.get('currentshopid'),
      		cate_id:this.cate_id,
      		sort:1
      	}).then((res)=>{
      		if (res.error_code==1000) {
      			this.$message.success('添加成功')
      			this.add_spec_form=false
      			this.show_specs_method()
      		}else{
      			this.$message.error('添加失败')
      		}
      	})
      },
      to_del_spec_value(index,indexs){
				console.log(index,indexs)
      	 this.use_specs[index].value.splice(indexs,1)
				 this.table_data.value.splice(indexs,1)
      },
      add_spec_value(index) {
        if (index == 0) {
          this.use_specs[index].value.push({value_item:'',img:[]})
        }
        if (index == 1) {
          this.use_specs[index].value.push({value_item:''})
        }
      },
      // afterChange() {
      //   this.goodsinfo.goods_desc = this.editorText
      // },
      afterBlur() {
      },
      onContentChange() {
      },
      //提交修改
      submitedit() {
      	var flag=true
					if (this.goodsinfo.name=='') {
						this.$message.error('请输入商品名称')
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
		  group_p_profit:this.goodsinfo.group_p_profit,
          attrs: this.attrs_sel,
          item: [],
		  goods_times:this.goodsinfo.goods_times,
		  is_active:this.goodsinfo.is_active?'1':'0',
		  group_send_type:this.goodsinfo.group_send_type.toString(),
          group_num: this.goodsinfo.group_num<2?'2':this.goodsinfo.group_num,
          goods_source: this.goodsinfo.link,
          is_on_sale: this.goodsinfo.is_on_sale?1:0,
          is_commend: this.goodsinfo.recommend?1:0,
          goods_desc: this.goodsinfo.goods_desc,
          is_group: this.goodsinfo.is_group?1:0,
          cate_id: this.goodsinfo.cate,
          goods_id: this.editgoods_id,
          qrcode:this.goodsinfo.code,
          is_on_spec:this.attrs_sel[0].attr_name==''?0:1,
          //goods_img:this.goodsinfo.goods_img
        }
        this.goodsinfo.goods_img.forEach((item) => {
          params['goods_img'].push(item)
        })
        //数据拼装
        	//params['is_on_spec'] = 0
        	let objItem={
        		spec_name:'无规格',
        		p_price:'0',
        		profit:[0,0,0],
        		goods_price:this.goodsinfo.price,
        		group_price:'0',
        		market_price:this.goodsinfo.market_price,
        		goods_score:this.goodsinfo.score,
        		goods_score_expect:'0',
        		single_p_profit:'0',
        		//group_p_profit:'0',
        		item_images:'',
        		key_name:"常规:常规",
        	}
        params['item'].push(objItem)
       
        goods_pro_edit(params).then((res) => {
        	if (res.error_code=='1000') {
        		this.$message.success('修改成功')
        		this.$router.push({path:'/unclewei/goods/goods',query:{currentPage:this.currentPage}})
        	}else{
        		//this.$message.error(res.msg)
        	};
        })
    }
        // this.$router.push('/agent/goods/goods')
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
      //得到商品信息
      get_goods_info(id){
      	get_goods({goods_id:id}).then((res)=>{
      		 	 this.edit=true
			 	 this.editgoods_id=id
				 this.spec_show=res.data.goods[0].is_on_spec==1?true:false
			 	 this.goodsinfo.name=res.data.goods[0].goods_name
				 this.goodsinfo.goods_times=res.data.goods[0].group_times				 
				 this.goodsinfo.group_send_type=res.data.goods[0].group_send_type.split(',')
				 this.goodsinfo.is_group=res.data.goods[0].is_group==1?true:false
				 this.goodsinfo.is_on_sale=res.data.goods[0].is_on_sale==1?true:false
				 this.goodsinfo.recommend=res.data.goods[0].is_commend==1?true:false
				 this.goodsinfo.cate=res.data.goods[0].cate_id
				 this.goodsinfo.is_active=res.data.goods[0].is_active=='1'?true:false
				 this.goodsinfo.group_p_profit=res.data.goods[0].group_profit
				 this.goodsinfo.admin_id=res.data.goods[0].admin_id
				 this.goodsinfo.price=res.data.products[0].goods_prices[0]
				 this.goodsinfo.market_price=res.data.products[0].market_prices[0]
				 this.goodsinfo.score=res.data.products[0].goods_scores[0]
				 this.goodsinfo.goods_img=[res.data.goods[0].goods_img]
				 this.cate_id=res.data.goods[0].cate_id
				 //this.attrs_sel = res.data.goods[0].attrs
				 // if(this.shop_id=='144'){
					// 	this.goodsinfo.scenario=res.data.type						
				 // }				 
				 this.goodsinfo.goods_desc=res.data.goods[0].goods_desc
				 this.goodsinfo.link=res.data.goods[0].goods_source
				 this.goodsinfo.code=res.data.goods[0].qrcode
				 this.goodsinfo.group_num=res.data.goods[0].group_num<2?'2':res.data.goods[0].group_num
				 this.goodsinfo.group_price=res.data.products[0].group_prices[0]
				 this.images_list.push({name:'image',url:res.data.goods[0].goods_img})
				 if (res.data.goods[0].is_on_spec==1) {
				 	this.attrs_sel=res.data.goods[0].attrs
				 };
				 //this.images_list.push({name:'image',url:res.data.goods[0].goods_img})
				 // if(this.shop_id=='144'||this.shop_id=='226'){
					// 		this.goodsinfo.firstimageUrl=res.data.goods[0].goods_img;
					// 		this.goodsinfo.firstimg.push({name:"image0".toString(),url:res.data.goods[0].goods_img})
				 // }else{
						
				 //}				 
				// if(res.data.goods[0].goods_desc.length>0&&res.data.goods[0].goods_desc[0]!=""){
				// 	for(var i=0;i<res.data.goods[0].goods_desc.length;i++){
				// 			this.img_list.push({name:'image'+i.toString(),url:res.data.goods[0].goods_desc[i]})
				// 	}
				// }
				 // if(res.data.goods[0].is_on_spec==1&&res.data.products[0].key_names[0].indexOf(" ")==-1){
				 // 	var spec_pre=''
				 // 	this.toggle_specs=0
				 // 	let item=res.data.products[0]
				 // 	let item_img=res.data.specimgs[0]
				 // 	this.add_input_value(parseInt(item.keys[0]))
				 // 	this.use_specs=[{name:parseInt(item.keys[0]),spec_item:[],value:[]}]
				 // 	search_spec({cate_id: this.cate_id, shop_id: store.get('currentshopid')}).then((res) => {
     //      			if (res.error_code == 1000) {
     //        			this.specs = res.data
     //        			res.data.forEach(function(items){
     //        				if (items.id==item.keys[0]) {
     //        					spec_pre=items
     //        				};
     //        			})
     //      			} else if (res.error_code == 1002) {
     //        			this.specs = []
     //      			} else {
     //      	  			this.$message.error('参数错误')
     //      			}
     //    			}).then(res=>{
     //    				 var value_pro=[]
				 // 	 	for (var i =0 ; i < item.key_names.length; i++) {
				 // 			value_pro.push({
				 // 			value_item:parseInt(item_img.item_ids[i]),
				 // 			img:[{name:"image_spec"+i,url:item_img.spec_imgs[i]}],
				 // 			value_name:item.key_names[i].split(":")[1],
				 // 			purchase_price:item.p_prices[i],
				 // 			price:item.goods_prices[i],
				 // 			member_price:item.group_prices[i],
				 // 			market_price:item.market_prices[i],
				 // 			sku:item.goods_scores[i],
				 // 			stock_limit:item.goods_score_expects[i],
				 // 			alone_profit:item.single_p_profits[i],
				 // 			team_profit:item.group_p_profits[i]
					// 	})
				 // 		};
     //    				this.use_specs=[{name:parseInt(item.keys[0]),specs_item:spec_pre.item,value:value_pro}]
     //    				this.table_data=this.use_specs[0]
     //    			})
				 	
				 // }else if (res.data.goods[0].is_on_spec==1&&res.data.products[0].key_names[0].indexOf(" ")!=-1){
				 // 	this.toggle_specs=1
				 // 	let item=res.data.products[0]
				 // 	let item_img=res.data.specimgs[0]
				 // 	this.use_specs=[{name:parseInt(item.keys[0].split("_")[0]),specs_item:'',value:[]},{name:parseInt(item.keys[0].split("_")[1]),specs_item:'',value:[]}]
				 // 	search_spec({cate_id: this.cate_id, shop_id: store.get('currentshopid')}).then((res) => {
     //      			if (res.error_code == 1000) {
     //        			this.specs = res.data
     //        			console.log(this.specs,'4444')
     //      			} else if (res.error_code == 1002) {
     //        			this.specs = []
     //      			} else {
     //      	  			this.$message.error('参数错误')
     //      			}
     //    			})
				 // }
				 
      			})
      			}
		},
		created(){
			this.get_token()
			this.show_cates()
			this.get_goods_info(this.$route.query.goods_id)
			this.currentPage = this.$route.query.currentPage
		},
		 computed: {
      spec_type_1: function () {
        let name1 = ''
        this.specs.forEach((val) => {
          if (val.id == this.use_specs[0].name) {
            name1 = val.spec_name
          }
        })
        return name1
      },
      spec_type_2: function () {
        let name2 = ''
        this.specs.forEach((val) => {
          if (this.use_specs[1]) {
            if (val.id == this.use_specs[1].name) {
              name2 = val.spec_name
            }
          }
        })
        return name2
      }
    }

	}
</script>
<style lang="stylus" scoped>
.score_info
	display flex
.goods_edit
	padding 20px 20px 50px 20px
	background-color white
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
	.base_info_food
		width 100%
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
.add_spec_button
	border 1px solid #609eff
	color #609eff
	display inline-block
	font-size 14px
	background-color white
	width 80px
	height 30px
	text-align center
	padding 0 8px;
	border-radius 4px
	cursor pointer
	margin 5px 0 10px 0
	line-height 30px
.delete_spec_button
	border 1px solid #ff8661
	color #ff8661
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
	width 300px
.cate_spec_name
	flex 1
.cate_spec_table
	display flex
	justify-content space-between
	padding 0 2%
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
.spec_info_title
	display flex
	justify-content space-between
	border-bottom 1px solid #e1e1e1
	height 40px
	padding 0 2%
	color #609eff
	.title
		font-size 14px
.spec_add_form
	margin-top 20px
	display flex
.spec_input
	display flex
	align-items center
.spec_value_input
	display flex
	align-items center
	flex 1
	margin-left 15px
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
	display flex
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
			margin:40px 0px 0px 80px;
	}
	.pictureCard{
		border :none;
			position:relative;
			width:400px;
	}
	.pictureCard>img{
		width:100%;
		border:none;
	}
	.pictureCard>i{
		font-size:40px;
		color:#aaa;
		position:absolute;
		top:0px;
		right:0px;
		z-index:10;
		cursor: pointer;
	}
	
	.l-add-spec{
		margin: 5px 0 5px 10px;
	}
	
	.l-add-spec span{
		display:inline-block;
		font-size:14px;
		background-color:white;
		width:80px;
		height:30px;
		text-align:center;
		padding:0 8px;
		border-radius:4px;
		cursor:pointer;
		margin:5px 0 10px 0;
		line-height:30px;
	}
	
	@media(max-width:900px ) {
	.cate_spec_table{
			display:block;
			padding:0;
	}
	.cate_name,.cate_spec_name{
		width:auto;
		padding-bottom :5px;
	}

	.spec_add_form,.spec_input,.spec_value_input{
			display :block;
	}

	.add_spec_name_title,.new_spec_name_input,.add_spec_value_title,.new_spec_value_input{
		width:100%;
display :block;
	}

	.spec_value_input{
			    margin-left: 0px;
	}

	.el-input{
			height:auto;
	}

	.spec_input,.spec_value_input{
		    margin-bottom: 8px;
	}

	.add_spec_value_title{
		    text-align: left;
	}

	
	
			.picture{
			margin-left:0px;
	}
		.el-upload--picture-card{
			background: none;
		}
		
		.upload_tips{
			padding-left: 50px;
		}
		
		.upload_tips{
			padding-left: 0;
		}
		
		.upload_tips span{
			display: none;
			
		}
		
		.div .body .el-main .breadcrumb-container{
				margin-bottom: 0;
			}
			.title{
				padding-top: 10px;
				margin-bottom: 10px;
				}
			.goods_edit{
				padding: 0;
			}
			
			.title .base_info,
			.title .detail_info,
			.title .active_detail_info
			{
				width:100%;
				text-align:center;
				display: inline-block;
				line-height: 30px;
				height: 30px;
				font-size: 14px;
    		background-color: #409eff;
    		color: #fff;
			}
			
			.buttons{
				position: static;
				width: 100%;
			}
			
			.first_step_frame{
				width: 100%;
				padding: 10px;
			}
			
			.el-form-item__label{
				font-size: 14px;
				text-align: left;	
				float: none;
				height: 24px;
				line-height: 24px;
			}
			
			.el-form-item__content{
				width: 100%;
				margin-left: 0 !important;
			}
			
			.el-upload-list--picture-card .el-upload-list__item{
				width: 48%;
				margin:0 ;
				margin-right: 4%;
			}
			
			.el-upload-list--picture-card .el-upload-list__item:nth-child(even){
				margin-right: 0;
			}
			
			.el-upload-list--picture-card{
				display: block;
			}
			
			.el-form-item__content .el-input--medium,.el-select{
				width: 100% !important;
			}
			
			.el-form-item{
				margin-bottom: 10px;
				width:90%;
			}
			.group_info_input .el-form-item{
				width:30%;
				margin-right:10px
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
	}


	@media(max-width:500px )	{
		.pictureCard{
			width:100%
		}
	}
</style>
<style>
	.radioList .el-form-item__content{
		    margin-left: 20px;
    		margin-top: 14px;
	}	
</style>